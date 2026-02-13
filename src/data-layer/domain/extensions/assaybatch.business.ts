/**
 * AssayBatch Business Validation
 *
 * Two-tier validation for AssayBatch table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayBatchDb, validateAssayBatchBusiness } from './assaybatch.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayBatchDb(data);
 * await db.assayBatches.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayBatchBusiness(data);
 * ```
 *
 * @module extensions/assaybatch
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
	BooleanSchema,
	CommentsSchema,
	createErrorResult,
	createSafeValidator,
	createSuccessResult,
	createThrowingValidator,
	createTypeGuard,
	ErrorMessages,
	formatZodErrors,
	GuidSchema,
	IsoDateSchema,
} from "../schema-helpers";

// Import auto-generated schema
import {
	AssayBatchTableInsertBaseSchema,
} from "../tables/assaybatch/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayBatch Database Schema (Tier 1)
 *
 * Refines auto-generated schema with proper type validation.
 * This replaces generic `.any()` types with specific validators.
 *
 * **Use for**:
 * - All save/create/update operations
 * - CSV/Excel imports
 * - API request validation
 * - Pre-sync checks
 *
 * **Validates**:
 * - Required fields present
 * - Correct field types (UUID, ISO dates, booleans)
 * - Basic format validation
 * - String length limits
 *
 * **Does NOT validate**:
 * - Cross-field relationships
 * - Business logic
 * - Completeness for approval
 */
export const AssayBatchDbSchema = AssayBatchTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayBatchId: GuidSchema.optional(), // Optional because it has DB default (newid())

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	validated: BooleanSchema.optional(), // DB default: false

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	dispatchedDt: IsoDateSchema.nullable().optional(),
	labReceivedDt: IsoDateSchema.nullable().optional(),
	labPrelimDt: IsoDateSchema.nullable().optional(),
	labJobDt: IsoDateSchema.nullable().optional(),
	labFinalDt: IsoDateSchema.nullable().optional(),
	validatedDt: IsoDateSchema.nullable().optional(),
	mergeDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	labCode: z.string().min(1, ErrorMessages.REQUIRED).max(20),
	batchNo: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	dispatchNo: z.string().max(50).nullable().optional(),
	labSamplePrep: z.string().max(255).nullable().optional(),
	sourceFile: z.string().max(255).nullable().optional(),
	contractId: z.string().max(20).nullable().optional(),
	batchStatus: z.string().max(50), // DB default: (-1)

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	sampleCount: z.number().int().min(0).nullable().optional(),
	samplesMerged: z.number().int().min(0).nullable().optional(),
	resultsCount: z.number().int().min(0).nullable().optional(),
	resultsMerged: z.number().int().min(0).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 1000 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayBatch Database Schema Type
 */
export type AssayBatchDbInput = z.input<typeof AssayBatchDbSchema>;
export type AssayBatchDbOutput = z.output<typeof AssayBatchDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayBatch Business Schema (Tier 2)
 *
 * Extends database schema with business rules and cross-field validation.
 *
 * **Use for**:
 * - Approval workflows
 * - Review submissions
 * - Quality assurance
 * - Report generation
 *
 * **Validates** (in addition to Tier 1):
 * - Date ordering (dispatched < received < prelim < job < final)
 * - Count consistency (merged counts should not exceed total counts)
 * - Validation logic
 * - Batch status consistency
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Date ordering: dispatchedDt < labReceivedDt < labPrelimDt < labJobDt < labFinalDt
 * 2. Merged counts should not exceed total counts
 * 3. If validated is true, validatedDt should be provided
 * 4. Batch status should be consistent with dates
 * 5. Date reasonableness checks (mining era: after 1980, not too far future)
 * 6. Comments should be provided for questionable batches
 */
export const AssayBatchBusinessSchema = AssayBatchDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Date ordering - dispatchedDt < labReceivedDt
			if (data.dispatchedDt && data.labReceivedDt) {
				const dispatchedDate = data.dispatchedDt instanceof Date
					? data.dispatchedDt
					: new Date(data.dispatchedDt);
				const receivedDate = data.labReceivedDt instanceof Date
					? data.labReceivedDt
					: new Date(data.labReceivedDt);

				return dispatchedDate < receivedDate;
			}
			return true;
		},
		{
			message: "Dispatched date should be before lab received date",
			path: ["dispatchedDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: Date ordering - labReceivedDt < labPrelimDt
			if (data.labReceivedDt && data.labPrelimDt) {
				const receivedDate = data.labReceivedDt instanceof Date
					? data.labReceivedDt
					: new Date(data.labReceivedDt);
				const prelimDate = data.labPrelimDt instanceof Date
					? data.labPrelimDt
					: new Date(data.labPrelimDt);

				return receivedDate < prelimDate;
			}
			return true;
		},
		{
			message: "Lab received date should be before lab prelim date",
			path: ["labReceivedDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: Date ordering - labPrelimDt < labJobDt
			if (data.labPrelimDt && data.labJobDt) {
				const prelimDate = data.labPrelimDt instanceof Date
					? data.labPrelimDt
					: new Date(data.labPrelimDt);
				const jobDate = data.labJobDt instanceof Date
					? data.labJobDt
					: new Date(data.labJobDt);

				return prelimDate < jobDate;
			}
			return true;
		},
		{
			message: "Lab prelim date should be before lab job date",
			path: ["labPrelimDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: Date ordering - labJobDt < labFinalDt
			if (data.labJobDt && data.labFinalDt) {
				const jobDate = data.labJobDt instanceof Date
					? data.labJobDt
					: new Date(data.labJobDt);
				const finalDate = data.labFinalDt instanceof Date
					? data.labFinalDt
					: new Date(data.labFinalDt);

				return jobDate < finalDate;
			}
			return true;
		},
		{
			message: "Lab job date should be before lab final date",
			path: ["labJobDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Merged counts should not exceed total counts
			if (data.samplesMerged !== undefined && data.samplesMerged !== null
			  && data.sampleCount !== undefined && data.sampleCount !== null) {
				return data.samplesMerged <= data.sampleCount;
			}
			return true;
		},
		{
			message: "Samples merged should not exceed total sample count",
			path: ["samplesMerged"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Merged counts should not exceed total counts
			if (data.resultsMerged !== undefined && data.resultsMerged !== null
			  && data.resultsCount !== undefined && data.resultsCount !== null) {
				return data.resultsMerged <= data.resultsCount;
			}
			return true;
		},
		{
			message: "Results merged should not exceed total results count",
			path: ["resultsMerged"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: If validated is true, validatedDt should be provided
			if (data.validated === true && !data.validatedDt) {
				return false;
			}
			return true;
		},
		{
			message: "Validated date is required when batch is validated",
			path: ["validatedDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Batch status should be consistent with dates
			// If labFinalDt is provided, status should indicate completion
			if (data.labFinalDt && data.batchStatus) {
				const finalDate = data.labFinalDt instanceof Date
					? data.labFinalDt
					: new Date(data.labFinalDt);
				const currentDate = new Date();

				// If final date is in the past, batch should be completed
				if (finalDate < currentDate) {
					const completedStatuses = ["Completed", "Final", "Processed"];
					return completedStatuses.some(status =>
						data.batchStatus.toLowerCase().includes(status.toLowerCase()),
					);
				}
			}
			return true;
		},
		{
			message: "Batch status should indicate completion when lab final date is in the past",
			path: ["batchStatus"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Date reasonableness - merge date after 1980
			if (data.mergeDt) {
				const mergeDate = data.mergeDt instanceof Date
					? data.mergeDt
					: new Date(data.mergeDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return mergeDate >= minDate;
			}
			return true;
		},
		{
			message: "Merge date must be after 1980 (modern mining era)",
			path: ["mergeDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Date reasonableness - merge date not too far in future (7 days)
			if (data.mergeDt) {
				const mergeDate = data.mergeDt instanceof Date
					? data.mergeDt
					: new Date(data.mergeDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return mergeDate <= maxDate;
			}
			return true;
		},
		{
			message: "Merge date cannot be more than 7 days in the future",
			path: ["mergeDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Comments should be provided for questionable batches
			// If there are significant discrepancies, comments should be provided
			if (data.sampleCount !== undefined && data.sampleCount !== null
			  && data.samplesMerged !== undefined && data.samplesMerged !== null) {
				const discrepancy = data.sampleCount - (data.samplesMerged || 0);
				if (discrepancy > 10) { // More than 10 samples discrepancy
					return data.comments && data.comments.trim().length > 0;
				}
			}
			return true;
		},
		{
			message: "Comments should be provided when there are significant sample count discrepancies",
			path: ["comments"],
		},
	);

/**
 * AssayBatch Business Schema Type
 */
export type AssayBatchBusinessInput = z.input<typeof AssayBatchBusinessSchema>;
export type AssayBatchBusinessOutput = z.output<typeof AssayBatchBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayBatch (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayBatch data to validate
 * @returns Validated and typed assay batch data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchDb = createThrowingValidator(AssayBatchDbSchema, "AssayBatch");

/**
 * Safe Validate AssayBatch (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayBatch data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchDb = createSafeValidator(AssayBatchDbSchema);

/**
 * Is Valid AssayBatch (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayBatchDbSchema
 */
export const isValidAssayBatchDb = createTypeGuard(AssayBatchDbSchema);

/**
 * Validate AssayBatch (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayBatch data to validate
 * @returns Validated and typed assay batch data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchBusiness = createThrowingValidator(AssayBatchBusinessSchema, "AssayBatch");

/**
 * Safe Validate AssayBatch (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayBatch data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchBusiness = createSafeValidator(AssayBatchBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayBatch
 *
 * Checks if an assay batch can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have labCode and batchNo
 * 3. Must have labReceivedDt
 * 4. Must have sampleCount
 * 5. Must have batchStatus
 * 6. Should have reasonable date ordering
 *
 * @param data AssayBatch data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayBatch(batchData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayBatch(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayBatchBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const batch = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!batch.labCode) {
		errors.push("Lab code is required for approval");
	}

	if (!batch.batchNo) {
		errors.push("Batch number is required for approval");
	}

	if (!batch.labReceivedDt) {
		errors.push("Lab received date is required for approval");
	}

	if (!batch.sampleCount) {
		errors.push("Sample count is required for approval");
	}

	if (!batch.batchStatus) {
		errors.push("Batch status is required for approval");
	}

	// Check date ordering
	if (batch.dispatchedDt && batch.labReceivedDt) {
		const dispatchedDate = batch.dispatchedDt instanceof Date
			? batch.dispatchedDt
			: new Date(batch.dispatchedDt);
		const receivedDate = batch.labReceivedDt instanceof Date
			? batch.labReceivedDt
			: new Date(batch.labReceivedDt);

		if (dispatchedDate >= receivedDate) {
			errors.push("Dispatched date should be before lab received date");
		}
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayBatch For Review
 *
 * Checks if an assay batch is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayBatch data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayBatchForReview(batchData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayBatchForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayBatchDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const batch = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!batch.labCode) {
		errors.push("Lab code is required for review");
	}

	if (!batch.batchNo) {
		errors.push("Batch number is required for review");
	}

	if (!batch.sampleCount) {
		errors.push("Sample count is required for review");
	}

	if (!batch.batchStatus) {
		errors.push("Batch status is required for review");
	}

	// Warnings (not blocking)
	if (!batch.dispatchedDt) {
		warnings.push("Dispatched date should be specified when available");
	}

	if (!batch.labReceivedDt) {
		warnings.push("Lab received date should be specified when available");
	}

	if (!batch.labFinalDt) {
		warnings.push("Lab final date should be specified when available");
	}

	if (!batch.comments) {
		warnings.push("Comments should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(batch, warnings);
}

/**
 * Get AssayBatch Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayBatch data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayBatchValidationReport(batchData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayBatchValidationReport(data: unknown): {
	databaseValid: boolean
	databaseErrors: string[]
	businessValid: boolean
	businessErrors: string[]
	approvalReady: boolean
	approvalErrors: string[]
	reviewReady: boolean
	reviewErrors: string[]
	warnings: string[]
} {
	const dbResult = AssayBatchDbSchema.safeParse(data);
	const businessResult = AssayBatchBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayBatch(data);
	const reviewCheck = validateAssayBatchForReview(data);

	return {
		databaseValid: dbResult.success,
		databaseErrors: dbResult.success ? [] : [formatZodErrors(dbResult.error)],
		businessValid: businessResult.success,
		businessErrors: businessResult.success ? [] : [formatZodErrors(businessResult.error)],
		approvalReady: approvalCheck.canApprove,
		approvalErrors: approvalCheck.errors,
		reviewReady: reviewCheck.success,
		reviewErrors: reviewCheck.success ? [] : (reviewCheck.errors || []),
		warnings: reviewCheck.warnings || [],
	};
}

// ========================================
// TYPE EXPORTS
// ========================================

/**
 * Re-export auto-generated types for convenience
 */
export type { AssayBatchInsertRecord } from "../tables/assaybatch/schema";

/**
 * Validated AssayBatch types (after schema validation)
 */
export type ValidatedAssayBatchDb = AssayBatchDbOutput;
export type ValidatedAssayBatchBusiness = AssayBatchBusinessOutput;
