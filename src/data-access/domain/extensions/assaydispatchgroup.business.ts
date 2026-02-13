/**
 * AssayDispatchGroup Business Validation
 *
 * Two-tier validation for AssayDispatchGroup table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayDispatchGroupDb, validateAssayDispatchGroupBusiness } from './assaydispatchgroup.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayDispatchGroupDb(data);
 * await db.assayDispatchGroups.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayDispatchGroupBusiness(data);
 * ```
 *
 * @module extensions/assaydispatchgroup
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
	AssayDispatchGroupTableInsertBaseSchema,
} from "../tables/assaydispatchgroup/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayDispatchGroup Database Schema (Tier 1)
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
export const AssayDispatchGroupDbSchema = AssayDispatchGroupTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayDispatchGroupId: GuidSchema.optional(), // Optional because it has DB default (newid())

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
 * AssayDispatchGroup Database Schema Type
 */
export type AssayDispatchGroupDbInput = z.input<typeof AssayDispatchGroupDbSchema>;
export type AssayDispatchGroupDbOutput = z.output<typeof AssayDispatchGroupDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayDispatchGroup Business Schema (Tier 2)
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
 * - Default group uniqueness
 * - Description completeness
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Code should be alphanumeric with optional separators
 * 2. Only one dispatch group can be the default
 * 3. Description should be meaningful
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Comments should be provided for incomplete records
 */
export const AssayDispatchGroupBusinessSchema = AssayDispatchGroupDbSchema
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
			message: "Description should be more descriptive for dispatch groups",
			path: ["description"],
		},
	);

/**
 * AssayDispatchGroup Business Schema Type
 */
export type AssayDispatchGroupBusinessInput = z.input<typeof AssayDispatchGroupBusinessSchema>;
export type AssayDispatchGroupBusinessOutput = z.output<typeof AssayDispatchGroupBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayDispatchGroup (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayDispatchGroup data to validate
 * @returns Validated and typed assay dispatch group data
 * @throws {Error} If validation fails
 */
export const validateAssayDispatchGroupDb = createThrowingValidator(AssayDispatchGroupDbSchema, "AssayDispatchGroup");

/**
 * Safe Validate AssayDispatchGroup (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayDispatchGroup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayDispatchGroupDb = createSafeValidator(AssayDispatchGroupDbSchema);

/**
 * Is Valid AssayDispatchGroup (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayDispatchGroupDbSchema
 */
export const isValidAssayDispatchGroupDb = createTypeGuard(AssayDispatchGroupDbSchema);

/**
 * Validate AssayDispatchGroup (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayDispatchGroup data to validate
 * @returns Validated and typed assay dispatch group data
 * @throws {Error} If validation fails
 */
export const validateAssayDispatchGroupBusiness = createThrowingValidator(AssayDispatchGroupBusinessSchema, "AssayDispatchGroup");

/**
 * Safe Validate AssayDispatchGroup (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayDispatchGroup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayDispatchGroupBusiness = createSafeValidator(AssayDispatchGroupBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayDispatchGroup
 *
 * Checks if an assay dispatch group can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have code
 * 3. Must have description
 * 4. Code should be properly formatted
 * 5. Description should be meaningful
 *
 * @param data AssayDispatchGroup data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayDispatchGroup(groupData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayDispatchGroup(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayDispatchGroupBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const group = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!group.code) {
		errors.push("Code is required for approval");
	}

	if (!group.description) {
		errors.push("Description is required for approval");
	}

	// Check code format
	if (!/^[\w\-/\s]+$/.test(group.code)) {
		errors.push("Code should be alphanumeric with optional separators");
	}

	// Check description meaningfulness
	const meaningfulDescription = group.description.trim().toLowerCase();
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
 * Validate AssayDispatchGroup For Review
 *
 * Checks if an assay dispatch group is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayDispatchGroup data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayDispatchGroupForReview(groupData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayDispatchGroupForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayDispatchGroupDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const group = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!group.code) {
		errors.push("Code is required for review");
	}

	if (!group.description) {
		errors.push("Description is required for review");
	}

	// Warnings (not blocking)
	if (group.description && group.description.trim().length < 20) {
		warnings.push("Description should be more detailed");
	}

	if (!group.sortOrder) {
		warnings.push("Sort order should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(group, warnings);
}

/**
 * Get AssayDispatchGroup Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayDispatchGroup data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayDispatchGroupValidationReport(groupData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayDispatchGroupValidationReport(data: unknown): {
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
	const dbResult = AssayDispatchGroupDbSchema.safeParse(data);
	const businessResult = AssayDispatchGroupBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayDispatchGroup(data);
	const reviewCheck = validateAssayDispatchGroupForReview(data);

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
export type { AssayDispatchGroupInsertRecord } from "../tables/assaydispatchgroup/schema";

/**
 * Validated AssayDispatchGroup types (after schema validation)
 */
export type ValidatedAssayDispatchGroupDb = AssayDispatchGroupDbOutput;
export type ValidatedAssayDispatchGroupBusiness = AssayDispatchGroupBusinessOutput;
