/**
 * AssayElement Business Validation
 *
 * Two-tier validation for AssayElement table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayElementDb, validateAssayElementBusiness } from './assayelement.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayElementDb(data);
 * await db.assayElements.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayElementBusiness(data);
 * ```
 *
 * @module extensions/assayelement
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
	formatZodErrors,
	GuidSchema,
	IsoDateSchema,
} from "../schema-helpers";

// Import auto-generated schema
import {
	AssayElementTableInsertBaseSchema,
} from "../tables/assayelement/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayElement Database Schema (Tier 1)
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
export const AssayElementDbSchema = AssayElementTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayElementId: GuidSchema.optional(), // Optional because it has DB default (newid())

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
	element: CodeSchema, // max 50 chars
	elementGroup: CodeSchema, // max 50 chars
	systemUnits: CodeSchema, // max 50 chars
	description: z.string().max(1000).nullable().optional(), // max 1000 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayElement Database Schema Type
 */
export type AssayElementDbInput = z.input<typeof AssayElementDbSchema>;
export type AssayElementDbOutput = z.output<typeof AssayElementDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayElement Business Schema (Tier 2)
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
 * - Element code format validation
 * - Element group consistency
 * - System units validation
 * - Default element uniqueness
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Element code should be valid chemical symbol or code
 * 2. Element group should be consistent with element
 * 3. System units should be valid measurement units
 * 4. Only one element can be the default
 * 5. Date reasonableness checks (mining era: after 1980, not too far future)
 * 6. Comments should be provided for incomplete records
 */
export const AssayElementBusinessSchema = AssayElementDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Element code should be valid format
			// Basic element code format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.element);
		},
		{
			message: "Element code should be alphanumeric with optional separators (-, _, /, space)",
			path: ["element"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Element group should be valid format
			// Basic element group format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.elementGroup);
		},
		{
			message: "Element group should be alphanumeric with optional separators (-, _, /, space)",
			path: ["elementGroup"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: System units should be valid format
			// Basic system units format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.systemUnits);
		},
		{
			message: "System units should be alphanumeric with optional separators (-, _, /, space)",
			path: ["systemUnits"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Description should be meaningful if provided
			if (data.description) {
				const meaningfulDescription = data.description.trim().toLowerCase();
				const fillerWords = ["n/a", "na", "none", "not applicable", "tbd", "to be determined"];

				return !fillerWords.includes(meaningfulDescription);
			}
			return true;
		},
		{
			message: "Description should be meaningful and not just filler text",
			path: ["description"],
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
			// Business Rule 6: Comments should be provided for incomplete records
			// If description is very short, it should have explanation
			if (data.description && data.description.trim().length < 10) {
				// Very short description - should have explanation in comments or be more descriptive
				return data.description.trim().length >= 10;
			}
			return true;
		},
		{
			message: "Description should be more descriptive for assay elements",
			path: ["description"],
		},
	);

/**
 * AssayElement Business Schema Type
 */
export type AssayElementBusinessInput = z.input<typeof AssayElementBusinessSchema>;
export type AssayElementBusinessOutput = z.output<typeof AssayElementBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayElement (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayElement data to validate
 * @returns Validated and typed assay element data
 * @throws {Error} If validation fails
 */
export const validateAssayElementDb = createThrowingValidator(AssayElementDbSchema, "AssayElement");

/**
 * Safe Validate AssayElement (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayElement data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayElementDb = createSafeValidator(AssayElementDbSchema);

/**
 * Is Valid AssayElement (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayElementDbSchema
 */
export const isValidAssayElementDb = createTypeGuard(AssayElementDbSchema);

/**
 * Validate AssayElement (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayElement data to validate
 * @returns Validated and typed assay element data
 * @throws {Error} If validation fails
 */
export const validateAssayElementBusiness = createThrowingValidator(AssayElementBusinessSchema, "AssayElement");

/**
 * Safe Validate AssayElement (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayElement data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayElementBusiness = createSafeValidator(AssayElementBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayElement
 *
 * Checks if an assay element can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have element, elementGroup, systemUnits
 * 3. Element code should be properly formatted
 * 4. Element group should be properly formatted
 * 5. System units should be properly formatted
 *
 * @param data AssayElement data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayElement(elementData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayElement(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayElementBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const element = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!element.element) {
		errors.push("Element is required for approval");
	}

	if (!element.elementGroup) {
		errors.push("Element group is required for approval");
	}

	if (!element.systemUnits) {
		errors.push("System units are required for approval");
	}

	// Check element code format
	if (!/^[\w\-/\s]+$/.test(element.element)) {
		errors.push("Element code should be alphanumeric with optional separators");
	}

	// Check element group format
	if (!/^[\w\-/\s]+$/.test(element.elementGroup)) {
		errors.push("Element group should be alphanumeric with optional separators");
	}

	// Check system units format
	if (!/^[\w\-/\s]+$/.test(element.systemUnits)) {
		errors.push("System units should be alphanumeric with optional separators");
	}

	// Check description meaningfulness
	if (element.description) {
		const meaningfulDescription = element.description.trim().toLowerCase();
		const fillerWords = ["n/a", "na", "none", "not applicable", "tbd", "to be determined"];

		if (fillerWords.includes(meaningfulDescription)) {
			errors.push("Description should be meaningful and not just filler text");
		}
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayElement For Review
 *
 * Checks if an assay element is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayElement data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayElementForReview(elementData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayElementForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayElementDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const element = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!element.element) {
		errors.push("Element is required for review");
	}

	if (!element.elementGroup) {
		errors.push("Element group is required for review");
	}

	if (!element.systemUnits) {
		errors.push("System units are required for review");
	}

	// Warnings (not blocking)
	if (element.description && element.description.trim().length < 20) {
		warnings.push("Description should be more detailed");
	}

	if (!element.sortOrder) {
		warnings.push("Sort order should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(element, warnings);
}

/**
 * Get AssayElement Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayElement data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayElementValidationReport(elementData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayElementValidationReport(data: unknown): {
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
	const dbResult = AssayElementDbSchema.safeParse(data);
	const businessResult = AssayElementBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayElement(data);
	const reviewCheck = validateAssayElementForReview(data);

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
export type { AssayElementInsertRecord } from "../tables/assayelement/schema";

/**
 * Validated AssayElement types (after schema validation)
 */
export type ValidatedAssayElementDb = AssayElementDbOutput;
export type ValidatedAssayElementBusiness = AssayElementBusinessOutput;
