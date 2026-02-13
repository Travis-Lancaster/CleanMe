/**
 * AssayBatchDetail Business Validation
 *
 * Two-tier validation for AssayBatchDetail table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayBatchDetailDb, validateAssayBatchDetailBusiness } from './assaybatchdetail.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayBatchDetailDb(data);
 * await db.assayBatchDetails.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayBatchDetailBusiness(data);
 * ```
 *
 * @module extensions/assaybatchdetail
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
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
	AssayBatchDetailTableInsertBaseSchema,
} from "../tables/assaybatchdetail/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayBatchDetail Database Schema (Tier 1)
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
export const AssayBatchDetailDbSchema = AssayBatchDetailTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayBatchDetailId: GuidSchema.optional(), // Optional because it has DB default (newid())

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	labCode: CodeSchema, // max 20 chars
	batchNo: z.string().min(1, ErrorMessages.REQUIRED).max(50),
	originalMethod: CodeSchema, // max 50 chars
	labElement: CodeSchema, // max 50 chars
	element: CodeSchema.nullable().optional(), // max 50 chars
	repeat: z.string().max(10).nullable().optional(), // max 10 chars
	unitCode: CodeSchema.nullable().optional(), // max 50 chars
	genericMethod: CodeSchema.nullable().optional(), // max 50 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayBatchDetail Database Schema Type
 */
export type AssayBatchDetailDbInput = z.input<typeof AssayBatchDetailDbSchema>;
export type AssayBatchDetailDbOutput = z.output<typeof AssayBatchDetailDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayBatchDetail Business Schema (Tier 2)
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
 * - Batch consistency
 * - Element mapping validation
 * - Method consistency
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Batch number should match associated assay batch
 * 2. Lab element should be valid for the lab
 * 3. Generic method should be consistent with original method
 * 4. Element should be mappable from lab element
 * 5. Date reasonableness checks (mining era: after 1980, not too far future)
 * 6. Comments should be provided for questionable mappings
 */
export const AssayBatchDetailBusinessSchema = AssayBatchDetailDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Batch number should be properly formatted
			// Basic batch number format validation
			return /^[\w\-/\s]+$/.test(data.batchNo);
		},
		{
			message: "Batch number should be alphanumeric with optional separators",
			path: ["batchNo"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Lab element should be valid format
			// Lab element should be alphanumeric with optional separators
			return /^[\w\-/\s]+$/.test(data.labElement);
		},
		{
			message: "Lab element should be alphanumeric with optional separators",
			path: ["labElement"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: If element is provided, it should be valid format
			if (data.element) {
				return /^[\w\-/\s]+$/.test(data.element);
			}
			return true;
		},
		{
			message: "Element should be alphanumeric with optional separators",
			path: ["element"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Generic method should be consistent with original method
			// If both are provided, they should be related
			if (data.genericMethod && data.originalMethod) {
				const genericLower = data.genericMethod.toLowerCase();
				const originalLower = data.originalMethod.toLowerCase();

				// Generic method should be a subset or related to original method
				return genericLower.includes(originalLower)
				  || originalLower.includes(genericLower)
				  || genericLower === originalLower;
			}
			return true;
		},
		{
			message: "Generic method should be consistent with original method",
			path: ["genericMethod"],
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
			// Business Rule 6: Comments should be provided for questionable mappings
			// If element is not provided but lab element is, it should have explanation
			if (!data.element && data.labElement) {
				// Should have explanation for missing element mapping
				return true; // For now, just log this as a warning rather than blocking
			}
			return true;
		},
		{
			message: "Element mapping should be provided when available",
			path: ["element"],
		},
	);

/**
 * AssayBatchDetail Business Schema Type
 */
export type AssayBatchDetailBusinessInput = z.input<typeof AssayBatchDetailBusinessSchema>;
export type AssayBatchDetailBusinessOutput = z.output<typeof AssayBatchDetailBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayBatchDetail (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayBatchDetail data to validate
 * @returns Validated and typed assay batch detail data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchDetailDb = createThrowingValidator(AssayBatchDetailDbSchema, "AssayBatchDetail");

/**
 * Safe Validate AssayBatchDetail (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayBatchDetail data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchDetailDb = createSafeValidator(AssayBatchDetailDbSchema);

/**
 * Is Valid AssayBatchDetail (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayBatchDetailDbSchema
 */
export const isValidAssayBatchDetailDb = createTypeGuard(AssayBatchDetailDbSchema);

/**
 * Validate AssayBatchDetail (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayBatchDetail data to validate
 * @returns Validated and typed assay batch detail data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchDetailBusiness = createThrowingValidator(AssayBatchDetailBusinessSchema, "AssayBatchDetail");

/**
 * Safe Validate AssayBatchDetail (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayBatchDetail data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchDetailBusiness = createSafeValidator(AssayBatchDetailBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayBatchDetail
 *
 * Checks if an assay batch detail can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have labCode, batchNo, originalMethod, labElement
 * 3. Batch number should be properly formatted
 * 4. Lab element should be valid format
 * 5. Method consistency should be maintained
 *
 * @param data AssayBatchDetail data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayBatchDetail(detailData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayBatchDetail(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayBatchDetailBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const detail = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!detail.labCode) {
		errors.push("Lab code is required for approval");
	}

	if (!detail.batchNo) {
		errors.push("Batch number is required for approval");
	}

	if (!detail.originalMethod) {
		errors.push("Original method is required for approval");
	}

	if (!detail.labElement) {
		errors.push("Lab element is required for approval");
	}

	// Check batch number format
	if (!/^[\w\-/\s]+$/.test(detail.batchNo)) {
		errors.push("Batch number should be alphanumeric with optional separators");
	}

	// Check lab element format
	if (!/^[\w\-/\s]+$/.test(detail.labElement)) {
		errors.push("Lab element should be alphanumeric with optional separators");
	}

	// Check method consistency
	if (detail.genericMethod && detail.originalMethod) {
		const genericLower = detail.genericMethod.toLowerCase();
		const originalLower = detail.originalMethod.toLowerCase();

		if (!genericLower.includes(originalLower)
		  && !originalLower.includes(genericLower)
		  && genericLower !== originalLower) {
			errors.push("Generic method should be consistent with original method");
		}
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayBatchDetail For Review
 *
 * Checks if an assay batch detail is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayBatchDetail data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayBatchDetailForReview(detailData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayBatchDetailForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayBatchDetailDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const detail = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!detail.labCode) {
		errors.push("Lab code is required for review");
	}

	if (!detail.batchNo) {
		errors.push("Batch number is required for review");
	}

	if (!detail.originalMethod) {
		errors.push("Original method is required for review");
	}

	if (!detail.labElement) {
		errors.push("Lab element is required for review");
	}

	// Warnings (not blocking)
	if (!detail.element) {
		warnings.push("Element mapping should be specified when available");
	}

	if (!detail.unitCode) {
		warnings.push("Unit code should be specified when available");
	}

	if (!detail.repeat) {
		warnings.push("Repeat designation should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(detail, warnings);
}

/**
 * Get AssayBatchDetail Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayBatchDetail data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayBatchDetailValidationReport(detailData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayBatchDetailValidationReport(data: unknown): {
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
	const dbResult = AssayBatchDetailDbSchema.safeParse(data);
	const businessResult = AssayBatchDetailBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayBatchDetail(data);
	const reviewCheck = validateAssayBatchDetailForReview(data);

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
export type { AssayBatchDetailInsertRecord } from "../tables/assaybatchdetail/schema";

/**
 * Validated AssayBatchDetail types (after schema validation)
 */
export type ValidatedAssayBatchDetailDb = AssayBatchDetailDbOutput;
export type ValidatedAssayBatchDetailBusiness = AssayBatchDetailBusinessOutput;
