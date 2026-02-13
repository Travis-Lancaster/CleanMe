/**
 * Collar Business Validation
 *
 * Two-tier validation for Collar table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/collar/collar.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateCollarDb, validateCollarBusiness } from './collar.business';
 *
 * // Database validation (always use)
 * const validData = validateCollarDb(data);
 * await db.DrillHole_Collar.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateCollarBusiness(data);
 * ```
 *
 * @module extensions/collar
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
	PrioritySchema,
	RowStatusNumberEnum,
	RowStatusValues,

	ValidationStatusNumberEnum,
} from "../schema-helpers";

// Import auto-generated schema
import {
	CollarTableInsertBaseSchema,
} from "../tables/collar/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * Collar Database Schema (Tier 1)
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
export const CollarDbSchema = CollarTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	collarId: GuidSchema.optional(), // Optional because it has DB default (newid())
	parentCollarId: GuidSchema.nullable().optional(),
	loggingEventId: GuidSchema,
	supersededById: GuidSchema.nullable().optional(),

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	approvedInd: BooleanSchema.optional(), // DB default: false
	modelUseInd: BooleanSchema.optional(), // DB default: false
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
	startedOnDt: IsoDateSchema.nullable().optional(),
	finishedOnDt: IsoDateSchema.nullable().optional(),
	waterTableDepthMeasuredOnDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// DEPTH FIELDS (validate range)
	// ========================================
	casingDepth: DepthSchema.nullable().optional(),
	preCollarDepth: DepthSchema.nullable().optional(),
	startDepth: DepthSchema.nullable().optional(),
	totalDepth: DepthSchema.nullable().optional(),
	waterTableDepth: DepthSchema.nullable().optional(),

	// ========================================
	// PRIORITY
	// ========================================
	priority: PrioritySchema.nullable().optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	dataSource: z.string().min(1, ErrorMessages.REQUIRED).max(255),

	// Optional lookup references
	project: z.string().max(100).nullable().optional(),
	prospect: z.string().max(30).nullable().optional(),
	tenement: z.string().max(50).nullable().optional(),
	target: z.string().max(100).nullable().optional(),
	subTarget: z.string().max(100).nullable().optional(),
	pit: z.string().max(30).nullable().optional(),
	phase: z.string().max(30).nullable().optional(),
	section: z.string().max(50).nullable().optional(),
	holeType: z.string().max(50).nullable().optional(),
	holeStatus: z.string().max(50).nullable().optional(),
	holePurpose: z.string().max(50).nullable().optional(),
	holePurposeDetail: z.string().max(50).nullable().optional(),
	collarType: z.string().max(50).nullable().optional(),
	responsiblePerson: z.string().max(50).nullable().optional(),
	responsiblePerson2: z.string().max(50).nullable().optional(),
	explorationCompany: z.string().max(50).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	preCollarId: z.string().max(50).nullable().optional(),
	redox: z.string().max(50).nullable().optional(),
	orientationTool: z.string().max(50).nullable().optional(),
	comments: CommentsSchema.nullable().optional(), // max 4000 chars (actually -1 = max in DB)
	validationErrors: z.string().max(4000).nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)

	// ========================================
	// MIGRATION FIELDS (legacy)
	// ========================================
	migrationRv: z.any().nullable().optional(), // binary
	migrationId: z.number().int().nullable().optional(),
});

/**
 * Collar Database Schema Type
 */
export type CollarDbInput = z.input<typeof CollarDbSchema>;
export type CollarDbOutput = z.output<typeof CollarDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * Collar Business Schema (Tier 2)
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
 * - Depth relationships (start < total, casing < total, etc.)
 * - Date ordering (started < finished)
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. If totalDepth is provided, it must be positive
 * 2. If startDepth is provided, it must be less than totalDepth
 * 3. If casingDepth is provided, it cannot exceed totalDepth
 * 4. If waterTableDepth is provided, it cannot exceed totalDepth
 * 5. If preCollarDepth is provided, it must be less than totalDepth
 * 6. If both startedOnDt and finishedOnDt are provided, started must be before finished
 * 7. Date reasonableness checks (mining era: after 1980, not too far future)
 */
export const CollarBusinessSchema = CollarDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Total depth must be positive if provided
			if (data.totalDepth !== undefined && data.totalDepth !== null) {
				return data.totalDepth > 0;
			}
			return true;
		},
		{
			message: "Total depth must be greater than 0",
			path: ["totalDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Start depth must be less than total depth
			if (data.startDepth !== undefined && data.startDepth !== null
			  && data.totalDepth !== undefined && data.totalDepth !== null) {
				return data.startDepth < data.totalDepth;
			}
			return true;
		},
		{
			message: "Start depth must be less than total depth",
			path: ["startDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Casing depth cannot exceed total depth
			if (data.casingDepth !== undefined && data.casingDepth !== null
			  && data.totalDepth !== undefined && data.totalDepth !== null) {
				return data.casingDepth <= data.totalDepth;
			}
			return true;
		},
		{
			message: "Casing depth cannot exceed total depth",
			path: ["casingDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Water table depth cannot exceed total depth
			if (data.waterTableDepth !== undefined && data.waterTableDepth !== null
			  && data.totalDepth !== undefined && data.totalDepth !== null) {
				return data.waterTableDepth <= data.totalDepth;
			}
			return true;
		},
		{
			message: "Water table depth cannot exceed total depth",
			path: ["waterTableDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Pre-collar depth must be less than total depth
			if (data.preCollarDepth !== undefined && data.preCollarDepth !== null
			  && data.totalDepth !== undefined && data.totalDepth !== null) {
				return data.preCollarDepth < data.totalDepth;
			}
			return true;
		},
		{
			message: "Pre-collar depth must be less than total depth",
			path: ["preCollarDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Start date must be before finish date
			if (data.startedOnDt && data.finishedOnDt) {
				const startDate = data.startedOnDt instanceof Date
					? data.startedOnDt
					: new Date(data.startedOnDt);
				const finishDate = data.finishedOnDt instanceof Date
					? data.finishedOnDt
					: new Date(data.finishedOnDt);

				return startDate < finishDate;
			}
			return true;
		},
		{
			message: "Start date must be before finish date",
			path: ["startedOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Date reasonableness - started date after 1980
			if (data.startedOnDt) {
				const startDate = data.startedOnDt instanceof Date
					? data.startedOnDt
					: new Date(data.startedOnDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return startDate >= minDate;
			}
			return true;
		},
		{
			message: "Start date must be after 1980 (modern mining era)",
			path: ["startedOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Date reasonableness - finished date after 1980
			if (data.finishedOnDt) {
				const finishDate = data.finishedOnDt instanceof Date
					? data.finishedOnDt
					: new Date(data.finishedOnDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return finishDate >= minDate;
			}
			return true;
		},
		{
			message: "Finish date must be after 1980 (modern mining era)",
			path: ["finishedOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Date reasonableness - not too far in future (7 days)
			if (data.startedOnDt) {
				const startDate = data.startedOnDt instanceof Date
					? data.startedOnDt
					: new Date(data.startedOnDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return startDate <= maxDate;
			}
			return true;
		},
		{
			message: "Start date cannot be more than 7 days in the future",
			path: ["startedOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Date reasonableness - not too far in future (7 days)
			if (data.finishedOnDt) {
				const finishDate = data.finishedOnDt instanceof Date
					? data.finishedOnDt
					: new Date(data.finishedOnDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return finishDate <= maxDate;
			}
			return true;
		},
		{
			message: "Finish date cannot be more than 7 days in the future",
			path: ["finishedOnDt"],
		},
	);

/**
 * Collar Business Schema Type
 */
export type CollarBusinessInput = z.input<typeof CollarBusinessSchema>;
export type CollarBusinessOutput = z.output<typeof CollarBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate Collar (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data Collar data to validate
 * @returns Validated and typed collar data
 * @throws {Error} If validation fails
 */
export const validateCollarDb = createThrowingValidator(CollarDbSchema, "Collar");

/**
 * Safe Validate Collar (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data Collar data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateCollarDb = createSafeValidator(CollarDbSchema);

/**
 * Is Valid Collar (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches CollarDbSchema
 */
export const isValidCollarDb = createTypeGuard(CollarDbSchema);

/**
 * Validate Collar (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data Collar data to validate
 * @returns Validated and typed collar data
 * @throws {Error} If validation fails
 */
export const validateCollarBusiness = createThrowingValidator(CollarBusinessSchema, "Collar");

/**
 * Safe Validate Collar (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data Collar data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateCollarBusiness = createSafeValidator(CollarBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve Collar
 *
 * Checks if a collar can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have totalDepth
 * 4. Must have at least one coordinate (checked separately in CollarCoordinate table)
 * 5. Must have startedOnDt and finishedOnDt for completed holes
 *
 * @param data Collar data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveCollar(collarData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveCollar(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = CollarBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const collar = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(collar.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Collar must be in review status to be approved");
	}

	// Check required fields for approval
	if (!collar.totalDepth || collar.totalDepth <= 0) {
		errors.push("Total depth is required for approval and must be greater than 0");
	}

	// Check dates for completed holes
	if (collar.holeStatus === "Complete" || collar.holeStatus === "Completed") {
		if (!collar.startedOnDt) {
			errors.push("Start date is required for completed holes");
		}
		if (!collar.finishedOnDt) {
			errors.push("Finish date is required for completed holes");
		}
	}

	// Note: Coordinate requirement is checked separately via CollarCoordinate table
	// The business rule "exactly one coordinate" is enforced at the relationship level

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate Collar For Review
 *
 * Checks if a collar is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data Collar data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateCollarForReview(collarData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateCollarForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = CollarDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const collar = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!collar.organization) {
		errors.push("Organization is required for review");
	}

	if (!collar.dataSource) {
		errors.push("Data source is required for review");
	}

	// Warnings (not blocking)
	if (!collar.totalDepth) {
		warnings.push("Total depth should be provided before review");
	}

	if (!collar.holeType) {
		warnings.push("Hole type should be specified");
	}

	if (!collar.holePurpose) {
		warnings.push("Hole purpose should be specified");
	}

	if (!collar.startedOnDt && !collar.finishedOnDt) {
		warnings.push("Drilling dates should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(collar, warnings);
}

/**
 * Get Collar Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data Collar data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getCollarValidationReport(collarData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getCollarValidationReport(data: unknown): {
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
	const dbResult = CollarDbSchema.safeParse(data);
	const businessResult = CollarBusinessSchema.safeParse(data);
	const approvalCheck = canApproveCollar(data);
	const reviewCheck = validateCollarForReview(data);

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
export type { CollarInsertRecord } from "../tables/collar/schema";

/**
 * Validated Collar types (after schema validation)
 */
export type ValidatedCollarDb = CollarDbOutput;
export type ValidatedCollarBusiness = CollarBusinessOutput;
