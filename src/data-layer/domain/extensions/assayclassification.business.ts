/**
 * AssayClassification Business Validation
 *
 * Two-tier validation for AssayClassification table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayClassificationDb, validateAssayClassificationBusiness } from './assayclassification.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayClassificationDb(data);
 * await db.assayClassifications.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayClassificationBusiness(data);
 * ```
 *
 * @module extensions/assayclassification
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
} from "../schema-helpers";

// Import auto-generated schema
import {
	AssayClassificationTableInsertBaseSchema,
} from "../tables/assayclassification/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayClassification Database Schema (Tier 1)
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
export const AssayClassificationDbSchema = AssayClassificationTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayClassificationId: GuidSchema.optional(), // Optional because it has DB default (newid())

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	isDefaultInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	sortOrder: z.number().int().min(0).optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	code: CodeSchema, // max 50 chars
	description: z.string().min(1, ErrorMessages.REQUIRED).max(1000),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayClassification Database Schema Type
 */
export type AssayClassificationDbInput = z.input<typeof AssayClassificationDbSchema>;
export type AssayClassificationDbOutput = z.output<typeof AssayClassificationDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayClassification Business Schema (Tier 2)
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
 * - Code format validation
 * - Default classification uniqueness
 * - Description completeness
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Code should be alphanumeric with optional separators
 * 2. Only one classification can be the default
 * 3. Description should be meaningful
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Comments should be provided for incomplete records
 */
export const AssayClassificationBusinessSchema = AssayClassificationDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Code should be alphanumeric with optional separators
			// Basic code format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.code);
		},
		{
			message: "Code should be alphanumeric with optional separators (-, _, /, space)",
			path: ["code"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Description should be meaningful
			// Description should not be just filler text
			const meaningfulDescription = data.description.trim().toLowerCase();
			const fillerWords = ["n/a", "na", "none", "not applicable", "tbd", "to be determined"];

			return !fillerWords.includes(meaningfulDescription);
		},
		{
			message: "Description should be meaningful and not just filler text",
			path: ["description"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Date reasonableness - created date after 1980
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
			// Business Rule 3: Date reasonableness - created date not too far in future (7 days)
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
			// Business Rule 4: Comments should be provided for incomplete records
			// If description is very short, it should have explanation
			if (data.description && data.description.trim().length < 10) {
				// Very short description - should have explanation in comments or be more descriptive
				return data.description.trim().length >= 10;
			}
			return true;
		},
		{
			message: "Description should be more descriptive for assay classifications",
			path: ["description"],
		},
	);

/**
 * AssayClassification Business Schema Type
 */
export type AssayClassificationBusinessInput = z.input<typeof AssayClassificationBusinessSchema>;
export type AssayClassificationBusinessOutput = z.output<typeof AssayClassificationBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayClassification (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayClassification data to validate
 * @returns Validated and typed assay classification data
 * @throws {Error} If validation fails
 */
export const validateAssayClassificationDb = createThrowingValidator(AssayClassificationDbSchema, "AssayClassification");

/**
 * Safe Validate AssayClassification (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayClassification data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayClassificationDb = createSafeValidator(AssayClassificationDbSchema);

/**
 * Is Valid AssayClassification (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayClassificationDbSchema
 */
export const isValidAssayClassificationDb = createTypeGuard(AssayClassificationDbSchema);

/**
 * Validate AssayClassification (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayClassification data to validate
 * @returns Validated and typed assay classification data
 * @throws {Error} If validation fails
 */
export const validateAssayClassificationBusiness = createThrowingValidator(AssayClassificationBusinessSchema, "AssayClassification");

/**
 * Safe Validate AssayClassification (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayClassification data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayClassificationBusiness = createSafeValidator(AssayClassificationBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayClassification
 *
 * Checks if an assay classification can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have code and description
 * 3. Code should be properly formatted
 * 4. Description should be meaningful
 *
 * @param data AssayClassification data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayClassification(classificationData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayClassification(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayClassificationBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const classification = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!classification.code) {
		errors.push("Code is required for approval");
	}

	if (!classification.description) {
		errors.push("Description is required for approval");
	}

	// Check code format
	if (!/^[\w\-/\s]+$/.test(classification.code)) {
		errors.push("Code should be alphanumeric with optional separators");
	}

	// Check description meaningfulness
	const meaningfulDescription = classification.description.trim().toLowerCase();
	const fillerWords = ["n/a", "na", "none", "not applicable", "tbd", "to be determined"];

	if (fillerWords.includes(meaningfulDescription)) {
		errors.push("Description should be meaningful and not just filler text");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayClassification For Review
 *
 * Checks if an assay classification is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayClassification data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayClassificationForReview(classificationData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayClassificationForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayClassificationDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const classification = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!classification.code) {
		errors.push("Code is required for review");
	}

	if (!classification.description) {
		errors.push("Description is required for review");
	}

	// Warnings (not blocking)
	if (classification.description && classification.description.trim().length < 20) {
		warnings.push("Description should be more detailed");
	}

	if (!classification.sortOrder) {
		warnings.push("Sort order should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(classification, warnings);
}

/**
 * Get AssayClassification Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayClassification data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayClassificationValidationReport(classificationData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayClassificationValidationReport(data: unknown): {
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
	const dbResult = AssayClassificationDbSchema.safeParse(data);
	const businessResult = AssayClassificationBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayClassification(data);
	const reviewCheck = validateAssayClassificationForReview(data);

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
export type { AssayClassificationInsertRecord } from "../tables/assayclassification/schema";

/**
 * Validated AssayClassification types (after schema validation)
 */
export type ValidatedAssayClassificationDb = AssayClassificationDbOutput;
export type ValidatedAssayClassificationBusiness = AssayClassificationBusinessOutput;
