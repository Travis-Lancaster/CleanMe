/**
 * AssayBatchStatusLog Business Validation
 *
 * Two-tier validation for AssayBatchStatusLog table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayBatchStatusLogDb, validateAssayBatchStatusLogBusiness } from './assaybatchstatuslog.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayBatchStatusLogDb(data);
 * await db.assayBatchStatusLogs.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayBatchStatusLogBusiness(data);
 * ```
 *
 * @module extensions/assaybatchstatuslog
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
	BooleanSchema,
	CodeSchema,
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
	AssayBatchStatusLogTableInsertBaseSchema,
} from "../tables/assaybatchstatuslog/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayBatchStatusLog Database Schema (Tier 1)
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
export const AssayBatchStatusLogDbSchema = AssayBatchStatusLogTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayBatchStatusLogId: GuidSchema.optional(), // Optional because it has DB default (newid())

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	validated: BooleanSchema, // Required field

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	logDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	labCode: CodeSchema, // max 20 chars
	batchNo: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	batchStatus: z.string().max(50).nullable().optional(),

	// ========================================
	// COMMENTS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 1000 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50), // Required field
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayBatchStatusLog Database Schema Type
 */
export type AssayBatchStatusLogDbInput = z.input<typeof AssayBatchStatusLogDbSchema>;
export type AssayBatchStatusLogDbOutput = z.output<typeof AssayBatchStatusLogDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayBatchStatusLog Business Schema (Tier 2)
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
 * - Date ordering (log date should be reasonable)
 * - Status consistency
 * - Validation logic
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Log date should be reasonable (not too far in past/future)
 * 2. Batch status should be consistent with validation
 * 3. Comments should be provided for questionable status changes
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Comments should be provided for incomplete records
 */
export const AssayBatchStatusLogBusinessSchema = AssayBatchStatusLogDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Log date should be reasonable
			// Log date should not be too far in the past or future
			if (data.logDt) {
				const logDate = data.logDt instanceof Date
					? data.logDt
					: new Date(data.logDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning

				return logDate >= minDate && logDate <= maxDate;
			}
			return true;
		},
		{
			message: "Log date should be reasonable (after 1980, not more than 7 days in future)",
			path: ["logDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Batch status should be consistent with validation
			// If validated is true, batch status should indicate completion
			if (data.validated === true && data.batchStatus) {
				const finalStatuses = ["Completed", "Final", "Processed", "Validated"];
				return finalStatuses.some(status =>
					data?.batchStatus?.toLowerCase().includes(status.toLowerCase()),
				);
			}
			return true;
		},
		{
			message: "Batch status should indicate completion when batch is validated",
			path: ["batchStatus"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Comments should be provided for questionable status changes
			// If status is questionable, comments should be provided
			if (data.batchStatus) {
				const questionableStatuses = ["Pending", "In Review", "Questionable", "Error"];
				const isQuestionable = questionableStatuses.some(status =>
					data.batchStatus?.toLowerCase().includes(status.toLowerCase()),
				);

				if (isQuestionable) {
					return data.comments && data.comments.trim().length > 0;
				}
			}
			return true;
		},
		{
			message: "Comments should be provided for questionable batch status changes",
			path: ["comments"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - created date after 1980
			if (data.createdOnDt) {
				const createdDate = data.createdOnDt instanceof Date
					? data.createdOnDt
					: new Date(data.createdOnDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return createdDate >= minDate;
			}
			return true;
		},
		{
			message: "Created date must be after 1980 (modern mining era)",
			path: ["createdOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - created date not too far in future (7 days)
			if (data.createdOnDt) {
				const createdDate = data.createdOnDt instanceof Date
					? data.createdOnDt
					: new Date(data.createdOnDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return createdDate <= maxDate;
			}
			return true;
		},
		{
			message: "Created date cannot be more than 7 days in the future",
			path: ["createdOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Comments should be provided for incomplete records
			// If batch status is not provided, comments should explain why
			if (!data.batchStatus && !data.comments) {
				return false; // Should have explanation
			}
			return true;
		},
		{
			message: "Comments should be provided when batch status is not specified",
			path: ["comments"],
		},
	);

/**
 * AssayBatchStatusLog Business Schema Type
 */
export type AssayBatchStatusLogBusinessInput = z.input<typeof AssayBatchStatusLogBusinessSchema>;
export type AssayBatchStatusLogBusinessOutput = z.output<typeof AssayBatchStatusLogBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayBatchStatusLog (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayBatchStatusLog data to validate
 * @returns Validated and typed assay batch status log data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchStatusLogDb = createThrowingValidator(AssayBatchStatusLogDbSchema, "AssayBatchStatusLog");

/**
 * Safe Validate AssayBatchStatusLog (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayBatchStatusLog data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchStatusLogDb = createSafeValidator(AssayBatchStatusLogDbSchema);

/**
 * Is Valid AssayBatchStatusLog (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayBatchStatusLogDbSchema
 */
export const isValidAssayBatchStatusLogDb = createTypeGuard(AssayBatchStatusLogDbSchema);

/**
 * Validate AssayBatchStatusLog (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayBatchStatusLog data to validate
 * @returns Validated and typed assay batch status log data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchStatusLogBusiness = createThrowingValidator(AssayBatchStatusLogBusinessSchema, "AssayBatchStatusLog");

/**
 * Safe Validate AssayBatchStatusLog (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayBatchStatusLog data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchStatusLogBusiness = createSafeValidator(AssayBatchStatusLogBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayBatchStatusLog
 *
 * Checks if an assay batch status log can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have labCode, batchNo, validated
 * 3. Log date should be reasonable
 * 4. Batch status should be consistent with validation
 * 5. Comments should be provided for questionable changes
 *
 * @param data AssayBatchStatusLog data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayBatchStatusLog(logData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayBatchStatusLog(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayBatchStatusLogBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const log = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!log.labCode) {
		errors.push("Lab code is required for approval");
	}

	if (!log.batchNo) {
		errors.push("Batch number is required for approval");
	}

	// Check log date reasonableness
	if (log.logDt) {
		const logDate = log.logDt instanceof Date
			? log.logDt
			: new Date(log.logDt);

		const minDate = new Date("1980-01-01"); // Modern mining era
		const maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning

		if (logDate < minDate || logDate > maxDate) {
			errors.push("Log date should be reasonable (after 1980, not more than 7 days in future)");
		}
	}

	// Check batch status consistency
	if (log.validated === true && log.batchStatus) {
		const finalStatuses = ["Completed", "Final", "Processed", "Validated"];
		const hasFinalStatus = finalStatuses.some(status =>
			log.batchStatus?.toLowerCase().includes(status.toLowerCase()),
		);

		if (!hasFinalStatus) {
			errors.push("Batch status should indicate completion when batch is validated");
		}
	}

	// Check comments for questionable status
	if (log.batchStatus) {
		const questionableStatuses = ["Pending", "In Review", "Questionable", "Error"];
		const isQuestionable = questionableStatuses.some(status =>
			log.batchStatus?.toLowerCase().includes(status.toLowerCase()),
		);

		if (isQuestionable && (!log.comments || log.comments.trim().length === 0)) {
			errors.push("Comments should be provided for questionable batch status changes");
		}
	}

	// Check comments for missing status
	if (!log.batchStatus && (!log.comments || log.comments.trim().length === 0)) {
		errors.push("Comments should be provided when batch status is not specified");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayBatchStatusLog For Review
 *
 * Checks if an assay batch status log is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayBatchStatusLog data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayBatchStatusLogForReview(logData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayBatchStatusLogForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayBatchStatusLogDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const log = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!log.labCode) {
		errors.push("Lab code is required for review");
	}

	if (!log.batchNo) {
		errors.push("Batch number is required for review");
	}

	// Warnings (not blocking)
	if (!log.batchStatus) {
		warnings.push("Batch status should be specified when available");
	}

	if (!log.comments) {
		warnings.push("Comments should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(log, warnings);
}

/**
 * Get AssayBatchStatusLog Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayBatchStatusLog data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayBatchStatusLogValidationReport(logData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayBatchStatusLogValidationReport(data: unknown): {
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
	const dbResult = AssayBatchStatusLogDbSchema.safeParse(data);
	const businessResult = AssayBatchStatusLogBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayBatchStatusLog(data);
	const reviewCheck = validateAssayBatchStatusLogForReview(data);

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
export type { AssayBatchStatusLogInsertRecord } from "../tables/assaybatchstatuslog/schema";

/**
 * Validated AssayBatchStatusLog types (after schema validation)
 */
export type ValidatedAssayBatchStatusLogDb = AssayBatchStatusLogDbOutput;
export type ValidatedAssayBatchStatusLogBusiness = AssayBatchStatusLogBusinessOutput;
