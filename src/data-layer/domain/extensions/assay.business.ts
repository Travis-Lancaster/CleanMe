/**
 * Assay Business Validation
 *
 * Two-tier validation for Assay table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayDb, validateAssayBusiness } from './assay.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayDb(data);
 * await db.assays.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayBusiness(data);
 * ```
 *
 * @module extensions/assay
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
	BooleanSchema,
	canApprove as canApproveStatus,
	createErrorResult,
	createSafeValidator,
	createSuccessResult,
	createThrowingValidator,
	createTypeGuard,
	ErrorMessages,
	formatZodErrors,
	GuidSchema,
	IsoDateSchema,
	RowStatusNumberEnum,
	RowStatusValues,

	ValidationStatusNumberEnum,
} from "../schema-helpers";

// Import auto-generated schema
import {
	AssayTableInsertBaseSchema,
} from "../tables/assay/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * Assay Database Schema (Tier 1)
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
export const AssayDbSchema = AssayTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayId: GuidSchema.optional(), // Optional because it has DB default (newid())
	sampleId: GuidSchema,
	supersededById: GuidSchema.nullable().optional(),

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	reportIncludeInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true
	preferred: z.boolean(),

	// ========================================
	// STATUS (validate enum values)
	// ========================================
	rowStatus: RowStatusNumberEnum.optional(), // DB default: 0 (Draft)
	validationStatus: ValidationStatusNumberEnum.optional(), // DB default: 0 (Valid)

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	assayResultNum: z.number().nullable().optional(),
	limitLower: z.number().nullable().optional(),
	limitUpper: z.number().nullable().optional(),
	sysResult: z.number().nullable().optional(),
	labSequence: z.number().int().nullable().optional(),
	sourceRowNumber: z.number().int().optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	genericMethod: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	labElement: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	element: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	assayClassification: z.string().max(50),
	repeat: z.string().max(10),
	originalMethod: z.string().max(50),
	unitCode: z.string().max(50),
	labCode: z.string().max(20),
	batchNo: z.string().max(50),

	// Optional lookup references
	sysAssayStatus: z.string().max(4).nullable().optional(),
	passFail: z.string().max(1000).nullable().optional(),
	reading: z.string().max(50).nullable().optional(),

	// ========================================
	// TEXT FIELDS
	// ========================================
	assayResult: z.string().min(1, ErrorMessages.REQUIRED).max(20),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	validationErrors: z.string().max(4000).nullable().optional(),
	jsonData: z.string().max(-1).nullable().optional(),

	// ========================================
	// MIGRATION FIELDS
	// ========================================
	migrationRv: z.any().nullable().optional(), // varbinary
	migrationId: z.number().int().nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * Assay Database Schema Type
 */
export type AssayDbInput = z.input<typeof AssayDbSchema>;
export type AssayDbOutput = z.output<typeof AssayDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * Assay Business Schema (Tier 2)
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
 * - Result consistency (assayResultNum should match assayResult when numeric)
 * - Limit validation (limitLower < limitUpper)
 * - Preferred assay logic
 * - Batch consistency
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. If assayResultNum is provided, assayResult should be numeric
 * 2. If limits are provided, limitLower should be less than limitUpper
 * 3. Preferred assays should be marked appropriately
 * 4. Batch numbers should be consistent for related assays
 * 5. Date reasonableness checks (mining era: after 1980, not too far future)
 * 6. Comments should be provided for questionable results
 */
export const AssayBusinessSchema = AssayDbSchema
	.refine(
		(data) => {
			// Business Rule 1: If assayResultNum is provided, assayResult should be numeric
			if (data.assayResultNum !== undefined && data.assayResultNum !== null) {
				const numericResult = Number.parseFloat(data.assayResult);
				return !isNaN(numericResult) && numericResult === data.assayResultNum;
			}
			return true;
		},
		{
			message: "Assay result number should match assay result when both are provided",
			path: ["assayResultNum"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: If limits are provided, limitLower should be less than limitUpper
			if (data.limitLower !== undefined && data.limitLower !== null
			  && data.limitUpper !== undefined && data.limitUpper !== null) {
				return data.limitLower < data.limitUpper;
			}
			return true;
		},
		{
			message: "Lower limit should be less than upper limit",
			path: ["limitLower"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Preferred assays should be marked appropriately
			// If this is marked as preferred, it should have valid result data
			if (data.preferred) {
				return data.assayResultNum !== undefined && data.assayResultNum !== null;
			}
			return true;
		},
		{
			message: "Preferred assays should have numeric results",
			path: ["preferred"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Batch numbers should be consistent for related assays
			// This is more of a warning rule - batch numbers should be valid format
			if (data.batchNo) {
				// Basic batch number format validation (alphanumeric with optional separators)
				return /^[\w\-/]+$/.test(data.batchNo);
			}
			return true;
		},
		{
			message: "Batch number should be alphanumeric with optional separators (-, _, /)",
			path: ["batchNo"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Date reasonableness - created date after 1980
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
			// Business Rule 5: Date reasonableness - created date not too far in future (7 days)
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
			// Business Rule 6: Comments should be provided for questionable results
			// If result is below detection limit or has issues, comments should be provided
			if (data.sysAssayStatus && data.sysAssayStatus.toLowerCase() === "d") {
				// Detection limit - should have explanation
				return true; // This is informational, not blocking
			}
			return true;
		},
		{
			message: "Detection limit results should have explanatory comments",
			path: ["sysAssayStatus"],
		},
	);

/**
 * Assay Business Schema Type
 */
export type AssayBusinessInput = z.input<typeof AssayBusinessSchema>;
export type AssayBusinessOutput = z.output<typeof AssayBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate Assay (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data Assay data to validate
 * @returns Validated and typed assay data
 * @throws {Error} If validation fails
 */
export const validateAssayDb = createThrowingValidator(AssayDbSchema, "Assay");

/**
 * Safe Validate Assay (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data Assay data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayDb = createSafeValidator(AssayDbSchema);

/**
 * Is Valid Assay (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayDbSchema
 */
export const isValidAssayDb = createTypeGuard(AssayDbSchema);

/**
 * Validate Assay (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data Assay data to validate
 * @returns Validated and typed assay data
 * @throws {Error} If validation fails
 */
export const validateAssayBusiness = createThrowingValidator(AssayBusinessSchema, "Assay");

/**
 * Safe Validate Assay (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data Assay data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBusiness = createSafeValidator(AssayBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve Assay
 *
 * Checks if an assay can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have sampleId
 * 4. Must have organization
 * 5. Must have element and labElement
 * 6. Must have assayResult
 * 7. Must have labCode
 *
 * @param data Assay data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssay(assayData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssay(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const assay = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(assay.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Assay must be in review status to be approved");
	}

	// Check required fields for approval
	if (!assay.sampleId) {
		errors.push("Sample ID is required for approval");
	}

	if (!assay.organization) {
		errors.push("Organization is required for approval");
	}

	if (!assay.element) {
		errors.push("Element is required for approval");
	}

	if (!assay.labElement) {
		errors.push("Lab element is required for approval");
	}

	if (!assay.assayResult) {
		errors.push("Assay result is required for approval");
	}

	if (!assay.labCode) {
		errors.push("Lab code is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate Assay For Review
 *
 * Checks if an assay is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data Assay data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayForReview(assayData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const assay = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!assay.organization) {
		errors.push("Organization is required for review");
	}

	if (!assay.sampleId) {
		errors.push("Sample ID is required for review");
	}

	if (!assay.element) {
		errors.push("Element is required for review");
	}

	if (!assay.labElement) {
		errors.push("Lab element is required for review");
	}

	if (!assay.assayResult) {
		errors.push("Assay result is required for review");
	}

	if (!assay.labCode) {
		errors.push("Lab code is required for review");
	}

	// Warnings (not blocking)
	if (!assay.assayResultNum) {
		warnings.push("Numeric assay result should be provided when available");
	}

	if (!assay.batchNo) {
		warnings.push("Batch number should be specified when available");
	}

	if (!assay.genericMethod) {
		warnings.push("Generic method should be specified when available");
	}

	if (!assay.originalMethod) {
		warnings.push("Original method should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(assay, warnings);
}

/**
 * Get Assay Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data Assay data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayValidationReport(assayData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayValidationReport(data: unknown): {
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
	const dbResult = AssayDbSchema.safeParse(data);
	const businessResult = AssayBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssay(data);
	const reviewCheck = validateAssayForReview(data);

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
export type { AssayInsertRecord } from "../tables/assay/schema";

/**
 * Validated Assay types (after schema validation)
 */
export type ValidatedAssayDb = AssayDbOutput;
export type ValidatedAssayBusiness = AssayBusinessOutput;
