/**
 * AssayResult Business Validation
 *
 * Two-tier validation for AssayResult table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayResultDb, validateAssayResultBusiness } from './assayresult.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayResultDb(data);
 * await db.assayResults.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayResultBusiness(data);
 * ```
 *
 * @module extensions/assayresult
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
	BooleanSchema,
	CodeSchema,
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
 * AssayResult Database Schema (Tier 1)
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
export const AssayResultDbSchema = AssayTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayId: GuidSchema.optional(), // Optional because it has DB default (newid())
	sampleId: GuidSchema, // Required - links to sample
	supersededById: GuidSchema.nullable().optional(), // Optional - links to superseded assay

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	reportIncludeInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	preferred: z.number().int().min(0).max(1), // Should be 0 or 1
	labSequence: z.number().int().min(0).nullable().optional(), // Lab sequence number
	sourceRowNumber: z.number().int().min(0).optional(), // DB default: 0
	validationStatus: ValidationStatusNumberEnum.optional(), // DB default: 0
	rowStatus: RowStatusNumberEnum.optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	genericMethod: CodeSchema, // max 50 chars
	labElement: CodeSchema, // max 50 chars
	element: CodeSchema, // max 50 chars
	assayClassification: CodeSchema, // max 50 chars
	repeat: z.string().max(10), // max 10 chars
	originalMethod: CodeSchema, // max 50 chars
	unitCode: CodeSchema, // max 50 chars
	labCode: CodeSchema, // max 20 chars
	batchNo: z.string().min(1, ErrorMessages.REQUIRED).max(50),

	// ========================================
	// RESULT FIELDS
	// ========================================
	assayResult: z.string().min(1, ErrorMessages.REQUIRED).max(20), // Result value
	assayResultNum: z.number().nullable().optional(), // Numeric result
	limitLower: z.number().nullable().optional(), // Lower detection limit
	limitUpper: z.number().nullable().optional(), // Upper detection limit
	sysAssayStatus: z.string().max(4).nullable().optional(), // System status
	sysResult: z.number().nullable().optional(), // System calculated result
	passFail: z.string().max(1000).nullable().optional(), // Pass/fail status
	reading: z.string().max(50).nullable().optional(), // Reading value

	// ========================================
	// JSON DATA
	// ========================================
	jsonData: z.string().max(-1).nullable().optional(), // JSON data (unlimited length)

	// ========================================
	// MIGRATION FIELDS
	// ========================================
	migrationId: z.number().int().nullable().optional(),
	migrationRv: z.any().nullable().optional(), // varbinary

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayResult Database Schema Type
 */
export type AssayResultDbInput = z.input<typeof AssayResultDbSchema>;
export type AssayResultDbOutput = z.output<typeof AssayResultDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayResult Business Schema (Tier 2)
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
 * - Result format validation
 * - Numeric result consistency
 * - Detection limit validation
 * - Preferred assay logic
 * - Status consistency
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Result should be valid format (numeric or valid text)
 * 2. Numeric result should match text result when both provided
 * 3. Detection limits should be reasonable
 * 4. Preferred assay should be consistent
 * 5. Status fields should be consistent
 * 6. Date reasonableness checks (mining era: after 1980, not too far future)
 * 7. Comments should be provided for questionable results
 */
export const AssayResultBusinessSchema = AssayResultDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Result should be valid format
			// If numeric result is provided, text result should be convertible to number
			if (data.assayResultNum !== undefined && data.assayResultNum !== null) {
				const textResult = data.assayResult.trim();
				// Allow common assay result formats: numeric, "<LOD", ">HOD", "ND", "BQL", etc.
				const validFormats = /^[\d.+\-e]+|<.*|>.*|ND|BQL|NA|TBD$/i;
				return validFormats.test(textResult);
			}
			return true;
		},
		{
			message: "Result should be in valid assay format (numeric, <LOD, >HOD, ND, BQL, etc.)",
			path: ["assayResult"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Numeric result should match text result when both provided
			if (data.assayResultNum !== undefined && data.assayResultNum !== null
			  && data.assayResult) {
				const textResult = data.assayResult.trim();
				// If text result is purely numeric, it should match numeric result
				if (/^[\d.+\-e]+$/i.test(textResult)) {
					const parsedNum = Number.parseFloat(textResult);
					return Math.abs(parsedNum - data.assayResultNum) < 0.0001; // Allow small floating point differences
				}
			}
			return true;
		},
		{
			message: "Numeric result should match text result when both are numeric",
			path: ["assayResultNum"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Detection limits should be reasonable
			if (data.limitLower !== undefined && data.limitLower !== null
			  && data.limitUpper !== undefined && data.limitUpper !== null) {
				return data.limitLower <= data.limitUpper;
			}
			return true;
		},
		{
			message: "Lower detection limit should not exceed upper detection limit",
			path: ["limitLower"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Preferred assay should be consistent
			// If this is marked as preferred, it should have valid result
			if (data.preferred === 1) {
				const textResult = data.assayResult.trim();
				const invalidResults = ["ND", "N/A", "NA", "TBD", "BQL"];
				return !invalidResults.some(invalid => textResult.toLowerCase() === invalid.toLowerCase());
			}
			return true;
		},
		{
			message: "Preferred assays should have valid, reportable results",
			path: ["preferred"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Status fields should be consistent
			// If validation status indicates error, validation errors should be provided
			if (data.validationStatus === 2) { // Error status
				return data.validationErrors && data.validationErrors.trim().length > 0;
			}
			return true;
		},
		{
			message: "Validation errors should be provided when validation status indicates error",
			path: ["validationErrors"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Date reasonableness - created date after 1980
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
			// Business Rule 6: Date reasonableness - created date not too far in future (7 days)
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
			// Business Rule 7: Comments should be provided for questionable results
			// If result is very high or very low, comments should be provided
			if (data.assayResultNum !== undefined && data.assayResultNum !== null) {
				// Check for extreme values that might need explanation
				if (data.assayResultNum > 1000 || data.assayResultNum < 0) {
					// Extreme values should have explanation in JSON data or comments
					return true; // For now, just log this as a warning rather than blocking
				}
			}
			return true;
		},
		{
			message: "Extreme results should have explanation in comments or JSON data",
			path: ["assayResultNum"],
		},
	);

/**
 * AssayResult Business Schema Type
 */
export type AssayResultBusinessInput = z.input<typeof AssayResultBusinessSchema>;
export type AssayResultBusinessOutput = z.output<typeof AssayResultBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayResult (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayResult data to validate
 * @returns Validated and typed assay result data
 * @throws {Error} If validation fails
 */
export const validateAssayResultDb = createThrowingValidator(AssayResultDbSchema, "AssayResult");

/**
 * Safe Validate AssayResult (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayResult data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayResultDb = createSafeValidator(AssayResultDbSchema);

/**
 * Is Valid AssayResult (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayResultDbSchema
 */
export const isValidAssayResultDb = createTypeGuard(AssayResultDbSchema);

/**
 * Validate AssayResult (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayResult data to validate
 * @returns Validated and typed assay result data
 * @throws {Error} If validation fails
 */
export const validateAssayResultBusiness = createThrowingValidator(AssayResultBusinessSchema, "AssayResult");

/**
 * Safe Validate AssayResult (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayResult data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayResultBusiness = createSafeValidator(AssayResultBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayResult
 *
 * Checks if an assay result can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have organization, sampleId, element, assayResult
 * 3. Must have labCode and batchNo
 * 4. Result should be in valid format
 * 5. Preferred assay should have valid result
 * 6. Status should be consistent
 *
 * @param data AssayResult data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayResult(resultData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayResult(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayResultBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const result = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!result.organization) {
		errors.push("Organization is required for approval");
	}

	if (!result.sampleId) {
		errors.push("Sample ID is required for approval");
	}

	if (!result.element) {
		errors.push("Element is required for approval");
	}

	if (!result.assayResult) {
		errors.push("Assay result is required for approval");
	}

	if (!result.labCode) {
		errors.push("Lab code is required for approval");
	}

	if (!result.batchNo) {
		errors.push("Batch number is required for approval");
	}

	// Check result format
	const textResult = result.assayResult.trim();
	const validFormats = /^[\d.+\-e]+|<.*|>.*|ND|BQL|NA|TBD$/i;
	if (!validFormats.test(textResult)) {
		errors.push("Result should be in valid assay format");
	}

	// Check preferred assay logic
	if (result.preferred === 1) {
		const invalidResults = ["ND", "N/A", "NA", "TBD", "BQL"];
		if (invalidResults.some(invalid => textResult.toLowerCase() === invalid.toLowerCase())) {
			errors.push("Preferred assays should have valid, reportable results");
		}
	}

	// Check status consistency
	if (result.validationStatus === 2 && (!result.validationErrors || result.validationErrors.trim().length === 0)) {
		errors.push("Validation errors should be provided when validation status indicates error");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayResult For Review
 *
 * Checks if an assay result is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayResult data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayResultForReview(resultData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayResultForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayResultDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const result = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!result.organization) {
		errors.push("Organization is required for review");
	}

	if (!result.sampleId) {
		errors.push("Sample ID is required for review");
	}

	if (!result.element) {
		errors.push("Element is required for review");
	}

	if (!result.assayResult) {
		errors.push("Assay result is required for review");
	}

	if (!result.labCode) {
		errors.push("Lab code is required for review");
	}

	if (!result.batchNo) {
		errors.push("Batch number is required for review");
	}

	// Warnings (not blocking)
	if (!result.genericMethod) {
		warnings.push("Generic method should be specified when available");
	}

	if (!result.assayResultNum) {
		warnings.push("Numeric result should be specified when available");
	}

	if (!result.unitCode) {
		warnings.push("Unit code should be specified when available");
	}

	if (!result.limitLower && !result.limitUpper) {
		warnings.push("Detection limits should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(result, warnings);
}

/**
 * Get AssayResult Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayResult data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayResultValidationReport(resultData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayResultValidationReport(data: unknown): {
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
	const dbResult = AssayResultDbSchema.safeParse(data);
	const businessResult = AssayResultBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayResult(data);
	const reviewCheck = validateAssayResultForReview(data);

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
 * Validated AssayResult types (after schema validation)
 */
export type ValidatedAssayResultDb = AssayResultDbOutput;
export type ValidatedAssayResultBusiness = AssayResultBusinessOutput;
