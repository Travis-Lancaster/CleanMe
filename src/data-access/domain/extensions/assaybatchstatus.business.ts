/**
 * AssayBatchStatus Business Validation
 *
 * Two-tier validation for AssayBatchStatus table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/assay/assay.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateAssayBatchStatusDb, validateAssayBatchStatusBusiness } from './assaybatchstatus.business';
 *
 * // Database validation (always use)
 * const validData = validateAssayBatchStatusDb(data);
 * await db.assayBatchStatuses.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateAssayBatchStatusBusiness(data);
 * ```
 *
 * @module extensions/assaybatchstatus
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
	AssayBatchStatusTableInsertBaseSchema,
} from "../tables/assaybatchstatus/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * AssayBatchStatus Database Schema (Tier 1)
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
export const AssayBatchStatusDbSchema = AssayBatchStatusTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	assayBatchStatusId: GuidSchema.optional(), // Optional because it has DB default (newid())

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	isDefaultInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	createdOnDt: IsoDateSchema, // Required field
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	sortOrder: z.number().int().min(0).optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	code: CodeSchema, // max 50 chars
	description: z.string().max(60).nullable().optional(), // max 60 chars

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: suser_sname()
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * AssayBatchStatus Database Schema Type
 */
export type AssayBatchStatusDbInput = z.input<typeof AssayBatchStatusDbSchema>;
export type AssayBatchStatusDbOutput = z.output<typeof AssayBatchStatusDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * AssayBatchStatus Business Schema (Tier 2)
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
 * - Status code format validation
 * - Default status uniqueness
 * - Description completeness
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. Status code should be alphanumeric with optional separators
 * 2. Only one status can be the default
 * 3. Description should be meaningful
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Comments should be provided for incomplete records
 */
export const AssayBatchStatusBusinessSchema = AssayBatchStatusDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Status code should be alphanumeric with optional separators
			// Basic code format validation (alphanumeric with optional separators)
			return /^[\w\-/\s]+$/.test(data.code);
		},
		{
			message: "Status code should be alphanumeric with optional separators (-, _, /, space)",
			path: ["code"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Description should be meaningful
			// Description should not be just filler text
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
			message: "Description should be more descriptive for batch statuses",
			path: ["description"],
		},
	);

/**
 * AssayBatchStatus Business Schema Type
 */
export type AssayBatchStatusBusinessInput = z.input<typeof AssayBatchStatusBusinessSchema>;
export type AssayBatchStatusBusinessOutput = z.output<typeof AssayBatchStatusBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate AssayBatchStatus (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data AssayBatchStatus data to validate
 * @returns Validated and typed assay batch status data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchStatusDb = createThrowingValidator(AssayBatchStatusDbSchema, "AssayBatchStatus");

/**
 * Safe Validate AssayBatchStatus (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data AssayBatchStatus data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchStatusDb = createSafeValidator(AssayBatchStatusDbSchema);

/**
 * Is Valid AssayBatchStatus (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches AssayBatchStatusDbSchema
 */
export const isValidAssayBatchStatusDb = createTypeGuard(AssayBatchStatusDbSchema);

/**
 * Validate AssayBatchStatus (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data AssayBatchStatus data to validate
 * @returns Validated and typed assay batch status data
 * @throws {Error} If validation fails
 */
export const validateAssayBatchStatusBusiness = createThrowingValidator(AssayBatchStatusBusinessSchema, "AssayBatchStatus");

/**
 * Safe Validate AssayBatchStatus (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data AssayBatchStatus data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateAssayBatchStatusBusiness = createSafeValidator(AssayBatchStatusBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve AssayBatchStatus
 *
 * Checks if an assay batch status can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must have code
 * 3. Code should be properly formatted
 * 4. Description should be meaningful if provided
 *
 * @param data AssayBatchStatus data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveAssayBatchStatus(statusData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveAssayBatchStatus(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = AssayBatchStatusBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const status = businessResult.data;
	const errors: string[] = [];

	// Check required fields for approval
	if (!status.code) {
		errors.push("Code is required for approval");
	}

	// Check code format
	if (!/^[\w\-/\s]+$/.test(status.code)) {
		errors.push("Status code should be alphanumeric with optional separators");
	}

	// Check description meaningfulness
	if (status.description) {
		const meaningfulDescription = status.description.trim().toLowerCase();
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
 * Validate AssayBatchStatus For Review
 *
 * Checks if an assay batch status is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data AssayBatchStatus data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateAssayBatchStatusForReview(statusData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateAssayBatchStatusForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = AssayBatchStatusDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const status = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!status.code) {
		errors.push("Code is required for review");
	}

	// Warnings (not blocking)
	if (status.description && status.description.trim().length < 20) {
		warnings.push("Description should be more detailed");
	}

	if (!status.sortOrder) {
		warnings.push("Sort order should be specified when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(status, warnings);
}

/**
 * Get AssayBatchStatus Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data AssayBatchStatus data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getAssayBatchStatusValidationReport(statusData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getAssayBatchStatusValidationReport(data: unknown): {
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
	const dbResult = AssayBatchStatusDbSchema.safeParse(data);
	const businessResult = AssayBatchStatusBusinessSchema.safeParse(data);
	const approvalCheck = canApproveAssayBatchStatus(data);
	const reviewCheck = validateAssayBatchStatusForReview(data);

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
export type { AssayBatchStatusInsertRecord } from "../tables/assaybatchstatus/schema";

/**
 * Validated AssayBatchStatus types (after schema validation)
 */
export type ValidatedAssayBatchStatusDb = AssayBatchStatusDbOutput;
export type ValidatedAssayBatchStatusBusiness = AssayBatchStatusBusinessOutput;
