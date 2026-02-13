/**
 * DrillMethod Business Validation
 *
 * Two-tier validation for DrillMethod table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/collar/collar.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateDrillMethodDb, validateDrillMethodBusiness } from './drillmethod.business';
 *
 * // Database validation (always use)
 * const validData = validateDrillMethodDb(data);
 * await db.drillMethods.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateDrillMethodBusiness(data);
 * ```
 *
 * @module extensions/drillmethod
 */

import type { ValidationResult } from "../schema-helpers";

import { z } from "zod";
// Import schema helpers
import {
	BooleanSchema,
	canApprove as canApproveStatus,
	CommentsSchema,
	createErrorResult,
	createSafeValidator,
	createSuccessResult,
	createThrowingValidator,
	createTypeGuard,
	DepthSchema,
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
	DrillMethodTableInsertBaseSchema,
} from "../tables/drillmethod/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * DrillMethod Database Schema (Tier 1)
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
export const DrillMethodDbSchema = DrillMethodTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	drillMethodId: GuidSchema.optional(), // Optional because it has DB default (newid())
	collarId: GuidSchema,
	supersededById: GuidSchema.nullable().optional(),

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	reportIncludeInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true

	// ========================================
	// STATUS (validate enum values)
	// ========================================
	rowStatus: RowStatusNumberEnum.optional(), // DB default: 0 (Draft)
	validationStatus: ValidationStatusNumberEnum.optional(), // DB default: 0 (Valid)

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	startDt: IsoDateSchema.nullable().optional(),
	endDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// DEPTH FIELDS (validate range)
	// ========================================
	depthFrom: DepthSchema,
	depthTo: DepthSchema,

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),

	// Optional lookup references
	driller1: z.string().max(50).nullable().optional(),
	driller2: z.string().max(50).nullable().optional(),
	drillType: z.string().max(50).nullable().optional(),
	drillSize: z.string().max(50).nullable().optional(),
	drillRigType: z.string().max(50).nullable().optional(),
	drillCompany: z.string().max(50).nullable().optional(),
	sampleType: z.string().max(50).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 1000 chars
	validationErrors: z.string().max(4000).nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * DrillMethod Database Schema Type
 */
export type DrillMethodDbInput = z.input<typeof DrillMethodDbSchema>;
export type DrillMethodDbOutput = z.output<typeof DrillMethodDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * DrillMethod Business Schema (Tier 2)
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
 * - Depth relationships (depthFrom < depthTo)
 * - Date ordering (startDt < endDt)
 * - Driller information consistency
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. DepthFrom must be less than DepthTo
 * 2. If both startDt and endDt are provided, startDt must be before endDt
 * 3. Driller information should be consistent
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Drill type and size should be specified when available
 * 6. Comments should be provided for incomplete records
 */
export const DrillMethodBusinessSchema = DrillMethodDbSchema
	.refine(
		(data) => {
			// Business Rule 1: DepthFrom must be less than DepthTo
			return data.depthFrom < data.depthTo;
		},
		{
			message: "DepthFrom must be less than DepthTo",
			path: ["depthFrom"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: If both startDt and endDt are provided, startDt must be before endDt
			if (data.startDt && data.endDt) {
				const startDate = data.startDt instanceof Date
					? data.startDt
					: new Date(data.startDt);
				const endDate = data.endDt instanceof Date
					? data.endDt
					: new Date(data.endDt);

				return startDate < endDate;
			}
			return true;
		},
		{
			message: "Start date must be before end date",
			path: ["startDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Driller information should be consistent
			// If driller1 is provided, it should be a valid name
			if (data.driller1) {
				return data.driller1.trim().length > 0;
			}
			return true;
		},
		{
			message: "Driller 1 name must be provided if specified",
			path: ["driller1"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - start date after 1980
			if (data.startDt) {
				const startDate = data.startDt instanceof Date
					? data.startDt
					: new Date(data.startDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return startDate >= minDate;
			}
			return true;
		},
		{
			message: "Start date must be after 1980 (modern mining era)",
			path: ["startDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - end date after 1980
			if (data.endDt) {
				const endDate = data.endDt instanceof Date
					? data.endDt
					: new Date(data.endDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return endDate >= minDate;
			}
			return true;
		},
		{
			message: "End date must be after 1980 (modern mining era)",
			path: ["endDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - not too far in future (7 days)
			if (data.startDt) {
				const startDate = data.startDt instanceof Date
					? data.startDt
					: new Date(data.startDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return startDate <= maxDate;
			}
			return true;
		},
		{
			message: "Start date cannot be more than 7 days in the future",
			path: ["startDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - not too far in future (7 days)
			if (data.endDt) {
				const endDate = data.endDt instanceof Date
					? data.endDt
					: new Date(data.endDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return endDate <= maxDate;
			}
			return true;
		},
		{
			message: "End date cannot be more than 7 days in the future",
			path: ["endDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Drill type and size should be specified when available
			// This is a warning rule, not a blocking validation
			return true;
		},
		{
			message: "Drill type and size should be specified when available",
			path: ["drillType"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Comments should be provided for incomplete records
			if (!data.drillType && !data.drillSize && !data.drillCompany) {
				return data.comments && data.comments.trim().length > 0;
			}
			return true;
		},
		{
			message: "Comments should be provided when drill method information is incomplete",
			path: ["comments"],
		},
	);

/**
 * DrillMethod Business Schema Type
 */
export type DrillMethodBusinessInput = z.input<typeof DrillMethodBusinessSchema>;
export type DrillMethodBusinessOutput = z.output<typeof DrillMethodBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate DrillMethod (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data DrillMethod data to validate
 * @returns Validated and typed drill method data
 * @throws {Error} If validation fails
 */
export const validateDrillMethodDb = createThrowingValidator(DrillMethodDbSchema, "DrillMethod");

/**
 * Safe Validate DrillMethod (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data DrillMethod data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateDrillMethodDb = createSafeValidator(DrillMethodDbSchema);

/**
 * Is Valid DrillMethod (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches DrillMethodDbSchema
 */
export const isValidDrillMethodDb = createTypeGuard(DrillMethodDbSchema);

/**
 * Validate DrillMethod (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data DrillMethod data to validate
 * @returns Validated and typed drill method data
 * @throws {Error} If validation fails
 */
export const validateDrillMethodBusiness = createThrowingValidator(DrillMethodBusinessSchema, "DrillMethod");

/**
 * Safe Validate DrillMethod (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data DrillMethod data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateDrillMethodBusiness = createSafeValidator(DrillMethodBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve DrillMethod
 *
 * Checks if a drill method can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have collarId
 * 4. Must have depthFrom and depthTo
 * 5. Must have organization
 * 6. Must have drillType or drillSize or drillCompany
 *
 * @param data DrillMethod data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveDrillMethod(methodData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveDrillMethod(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = DrillMethodBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const method = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(method.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Drill method must be in review status to be approved");
	}

	// Check required fields for approval
	if (!method.collarId) {
		errors.push("Collar ID is required for approval");
	}

	if (!method.depthFrom || !method.depthTo) {
		errors.push("Depth from and depth to are required for approval");
	}

	if (!method.organization) {
		errors.push("Organization is required for approval");
	}

	// Check that at least one drill method field is provided
	if (!method.drillType && !method.drillSize && !method.drillCompany) {
		errors.push("At least one drill method field (type, size, or company) is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate DrillMethod For Review
 *
 * Checks if a drill method is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data DrillMethod data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateDrillMethodForReview(methodData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateDrillMethodForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = DrillMethodDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const method = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!method.organization) {
		errors.push("Organization is required for review");
	}

	if (!method.collarId) {
		errors.push("Collar ID is required for review");
	}

	if (!method.depthFrom) {
		errors.push("Depth from is required for review");
	}

	if (!method.depthTo) {
		errors.push("Depth to is required for review");
	}

	// Warnings (not blocking)
	if (!method.drillType) {
		warnings.push("Drill type should be specified when available");
	}

	if (!method.drillSize) {
		warnings.push("Drill size should be specified when available");
	}

	if (!method.drillCompany) {
		warnings.push("Drill company should be specified when available");
	}

	if (!method.driller1) {
		warnings.push("Driller 1 should be specified when available");
	}

	if (!method.comments) {
		warnings.push("Comments should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(method, warnings);
}

/**
 * Get DrillMethod Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data DrillMethod data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getDrillMethodValidationReport(methodData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getDrillMethodValidationReport(data: unknown): {
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
	const dbResult = DrillMethodDbSchema.safeParse(data);
	const businessResult = DrillMethodBusinessSchema.safeParse(data);
	const approvalCheck = canApproveDrillMethod(data);
	const reviewCheck = validateDrillMethodForReview(data);

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
export type { DrillMethodInsertRecord } from "../tables/drillmethod/schema";

/**
 * Validated DrillMethod types (after schema validation)
 */
export type ValidatedDrillMethodDb = DrillMethodDbOutput;
export type ValidatedDrillMethodBusiness = DrillMethodBusinessOutput;
