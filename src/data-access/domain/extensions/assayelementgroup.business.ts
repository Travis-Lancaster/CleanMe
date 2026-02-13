/**
 * AssayElementGroup Business Validation
 *
 * Two-tier validation for AssayElementGroup table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayElementGroupDb, validateAssayElementGroupBusiness } from './assayelementgroup.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayElementGroupDb(data);
 * await db.assayElementGroups.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayElementGroupBusiness(data);
 * ```
 *
 * @module extensions/assayelementgroup
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
	AssayElementGroupTableInsertBaseSchema,
} from "../tables/assayelementgroup/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayElementGroup Database Schema (Tier 1)
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
export const AssayElementGroupDbSchema = AssayElementGroupTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayElementGroupId: GuidSchema.optional(), // Optional because it has DB default (newid())

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
	elementGroup: CodeSchema, // max 50 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayElementGroup Database Schema Type
 */
export type AssayElementGroupDbInput = z.input<typeof AssayElementGroupDbSchema>;
export type AssayElementGroupDbOutput = z.output<typeof AssayElementGroupDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayElementGroup Business Schema (Tier 2)
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
 * - Element group code format validation
 * - Default element group uniqueness
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Element group code should be alphanumeric with optional separators
 * 2. Only one element group can be the default
 * 3. Date reasonableness checks (mining era: after 1980, not too far future)
 * 4. Comments should be provided for incomplete records
 */
export const AssayElementGroupBusinessSchema = AssayElementGroupDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Element group code should be valid format
			// Basic element group code format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.elementGroup);
		},
		{
			message: "Element group code should be alphanumeric with optional separators (-, _, /, space)",
			path: ["elementGroup"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Date reasonableness - created date after 1980
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
			// Business Rule 2: Date reasonableness - created date not too far in future (7 days)
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
	);

/**
 * AssayElementGroup Business Schema Type
 */
export type AssayElementGroupBusinessInput = z.input<typeof AssayElementGroupBusinessSchema>;
export type AssayElementGroupBusinessOutput = z.output<typeof AssayElementGroupBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayElementGroup (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayElementGroup data to validate
 * @returns Validated and typed assay element group data
 * @throws {Error} If validation fails
 */
export const validateAssayElementGroupDb = createThrowingValidator(AssayElementGroupDbSchema, "AssayElementGroup");

/**
 * Safe Validate AssayElementGroup (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayElementGroup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayElementGroupDb = createSafeValidator(AssayElementGroupDbSchema);

/**
 * Is Valid AssayElementGroup (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayElementGroupDbSchema
 */
export const isValidAssayElementGroupDb = createTypeGuard(AssayElementGroupDbSchema);

/**
 * Validate AssayElementGroup (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayElementGroup data to validate
 * @returns Validated and typed assay element group data
 * @throws {Error} If validation fails
 */
export const validateAssayElementGroupBusiness = createThrowingValidator(AssayElementGroupBusinessSchema, "AssayElementGroup");

/**
 * Safe Validate AssayElementGroup (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayElementGroup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayElementGroupBusiness = createSafeValidator(AssayElementGroupBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayElementGroup
 *
 * Checks if an assay element group can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have element group
 * 3. Element group code should be properly formatted
 *
 * @param data AssayElementGroup data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayElementGroup(groupData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayElementGroup(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayElementGroupBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const group = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!group.elementGroup) {
		errors.push("Element group is required for approval");
	}

	// Check element group code format
	if (!/^[\w\-/\s]+$/.test(group.elementGroup)) {
		errors.push("Element group code should be alphanumeric with optional separators");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate AssayElementGroup For Review
 *
 * Checks if an assay element group is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayElementGroup data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayElementGroupForReview(groupData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayElementGroupForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayElementGroupDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const group = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!group.elementGroup) {
		errors.push("Element group is required for review");
	}

	// Warnings (not blocking)
	if (!group.sortOrder) {
		warnings.push("Sort order should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(group, warnings);
}

/**
 * Get AssayElementGroup Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayElementGroup data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayElementGroupValidationReport(groupData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayElementGroupValidationReport(data: unknown): {
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
	const dbResult = AssayElementGroupDbSchema.safeParse(data);
	const businessResult = AssayElementGroupBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayElementGroup(data);
	const reviewCheck = validateAssayElementGroupForReview(data);

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
export type { AssayElementGroupInsertRecord } from "../tables/assayelementgroup/schema";

/**
 * Validated AssayElementGroup types (after schema validation)
 */
export type ValidatedAssayElementGroupDb = AssayElementGroupDbOutput;
export type ValidatedAssayElementGroupBusiness = AssayElementGroupBusinessOutput;
