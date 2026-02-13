/**
 * DrillPlan Business Validation
 *
 * Two-tier validation for DrillPlan table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/drill-plan/drill-plan.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateDrillPlanDb, validateDrillPlanBusiness } from './drillplan.business';
 *
 * // Database validation (always use)
 * const validData = validateDrillPlanDb(data);
 * await db.Planning_DrillPlan.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateDrillPlanBusiness(data);
 * ```
 *
 * @module extensions/drillplan
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
	DrillPlanTableInsertBaseSchema,
} from "../tables/drillplan/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * DrillPlan Database Schema (Tier 1)
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
export const DrillPlanDbSchema = DrillPlanTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	drillPlanId: GuidSchema.optional(), // Optional because it has DB default (newid())
	qCInsertionRuleId: GuidSchema.nullable().optional(),
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
	plannedStartDt: IsoDateSchema.nullable().optional(),
	plannedCompleteDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// DEPTH FIELDS (validate range)
	// ========================================
	plannedEasting: DepthSchema.nullable().optional(),
	plannedNorthing: DepthSchema.nullable().optional(),
	plannedRL: DepthSchema.nullable().optional(),
	plannedDip: DepthSchema.nullable().optional(),
	plannedAzimuth: DepthSchema.nullable().optional(),
	plannedTotalDepth: DepthSchema.nullable().optional(),
	waterTableDepth: DepthSchema.nullable().optional(),

	// ========================================
	// PRIORITY
	// ========================================
	drillPriority: PrioritySchema.optional(), // DB default: 0
	oDSPriority: PrioritySchema.optional(), // DB default: 0
	priority: PrioritySchema.nullable().optional(), // DB default: 0

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	dataSource: z.string().min(1, ErrorMessages.REQUIRED).max(255),
	project: z.string().max(100),

	// Optional lookup references
	prospect: z.string().max(30).nullable().optional(),
	target: z.string().max(100).nullable().optional(),
	subTarget: z.string().max(100).nullable().optional(),
	pit: z.string().max(30).nullable().optional(),
	phase: z.string().max(30).nullable().optional(),
	zone: z.string().max(50).nullable().optional(),
	tenement: z.string().max(50).nullable().optional(),
	holeType: z.string().max(50).nullable().optional(),
	holeStatus: z.string().max(50).nullable().optional(),
	holePurpose: z.string().max(50).nullable().optional(),
	holePurposeDetail: z.string().max(50).nullable().optional(),
	drillType: z.string().max(50).nullable().optional(),
	drillPattern: z.string().max(50).nullable().optional(),
	grid: z.string().max(50).nullable().optional(),
	drillPlanStatus: z.string().max(50).nullable().optional(),
	plannedBy: z.string().max(50).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	sitePrep: z.string().max(200).nullable().optional(),
	infillTarget: z.string().max(100).nullable().optional(),
	tWF: z.string().max(100).nullable().optional(),
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
 * DrillPlan Database Schema Type
 */
export type DrillPlanDbInput = z.input<typeof DrillPlanDbSchema>;
export type DrillPlanDbOutput = z.output<typeof DrillPlanDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * DrillPlan Business Schema (Tier 2)
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
 * - Depth relationships (plannedTotalDepth > 0, waterTableDepth < plannedTotalDepth, etc.)
 * - Date ordering (plannedStartDt < plannedCompleteDt)
 * - Coordinate completeness (all coordinates together or none)
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. If plannedTotalDepth is provided, it must be positive
 * 2. If waterTableDepth is provided, it cannot exceed plannedTotalDepth
 * 3. If both plannedStartDt and plannedCompleteDt are provided, plannedStartDt must be before plannedCompleteDt
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Coordinate completeness (all coordinates must be provided together)
 * 6. Required fields for approval
 */
export const DrillPlanBusinessSchema = DrillPlanDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Planned total depth must be positive if provided
			if (data.plannedTotalDepth !== undefined && data.plannedTotalDepth !== null) {
				return data.plannedTotalDepth > 0;
			}
			return true;
		},
		{
			message: "Planned total depth must be greater than 0",
			path: ["plannedTotalDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Water table depth cannot exceed planned total depth
			if (data.waterTableDepth !== undefined && data.waterTableDepth !== null
			  && data.plannedTotalDepth !== undefined && data.plannedTotalDepth !== null) {
				return data.waterTableDepth <= data.plannedTotalDepth;
			}
			return true;
		},
		{
			message: "Water table depth cannot exceed planned total depth",
			path: ["waterTableDepth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Planned start date must be before planned complete date
			if (data.plannedStartDt && data.plannedCompleteDt) {
				const startDate = data.plannedStartDt instanceof Date
					? data.plannedStartDt
					: new Date(data.plannedStartDt);
				const completeDate = data.plannedCompleteDt instanceof Date
					? data.plannedCompleteDt
					: new Date(data.plannedCompleteDt);

				return startDate < completeDate;
			}
			return true;
		},
		{
			message: "Planned start date must be before planned complete date",
			path: ["plannedStartDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - planned start date after 1980
			if (data.plannedStartDt) {
				const startDate = data.plannedStartDt instanceof Date
					? data.plannedStartDt
					: new Date(data.plannedStartDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return startDate >= minDate;
			}
			return true;
		},
		{
			message: "Planned start date must be after 1980 (modern mining era)",
			path: ["plannedStartDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - planned complete date after 1980
			if (data.plannedCompleteDt) {
				const completeDate = data.plannedCompleteDt instanceof Date
					? data.plannedCompleteDt
					: new Date(data.plannedCompleteDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return completeDate >= minDate;
			}
			return true;
		},
		{
			message: "Planned complete date must be after 1980 (modern mining era)",
			path: ["plannedCompleteDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - not too far in future (1 year)
			if (data.plannedStartDt) {
				const startDate = data.plannedStartDt instanceof Date
					? data.plannedStartDt
					: new Date(data.plannedStartDt);

				const maxDate = new Date();
				maxDate.setFullYear(maxDate.getFullYear() + 1); // Allow 1 year future for planning
				return startDate <= maxDate;
			}
			return true;
		},
		{
			message: "Planned start date cannot be more than 1 year in the future",
			path: ["plannedStartDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - not too far in future (1 year)
			if (data.plannedCompleteDt) {
				const completeDate = data.plannedCompleteDt instanceof Date
					? data.plannedCompleteDt
					: new Date(data.plannedCompleteDt);

				const maxDate = new Date();
				maxDate.setFullYear(maxDate.getFullYear() + 1); // Allow 1 year future for planning
				return completeDate <= maxDate;
			}
			return true;
		},
		{
			message: "Planned complete date cannot be more than 1 year in the future",
			path: ["plannedCompleteDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Coordinate completeness - all coordinates must be provided together
			const hasEasting = data.plannedEasting !== undefined && data.plannedEasting !== null;
			const hasNorthing = data.plannedNorthing !== undefined && data.plannedNorthing !== null;
			const hasRL = data.plannedRL !== undefined && data.plannedRL !== null;

			// If any coordinate is provided, all must be provided
			if (hasEasting || hasNorthing || hasRL) {
				return hasEasting && hasNorthing && hasRL;
			}
			return true;
		},
		{
			message: "All coordinates (Easting, Northing, RL) must be provided together",
			path: ["plannedEasting"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Coordinate completeness - all orientation must be provided together
			const hasAzimuth = data.plannedAzimuth !== undefined && data.plannedAzimuth !== null;
			const hasDip = data.plannedDip !== undefined && data.plannedDip !== null;

			// If any orientation is provided, both must be provided
			if (hasAzimuth || hasDip) {
				return hasAzimuth && hasDip;
			}
			return true;
		},
		{
			message: "Azimuth and Dip must be provided together",
			path: ["plannedAzimuth"],
		},
	);

/**
 * DrillPlan Business Schema Type
 */
export type DrillPlanBusinessInput = z.input<typeof DrillPlanBusinessSchema>;
export type DrillPlanBusinessOutput = z.output<typeof DrillPlanBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate DrillPlan (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data DrillPlan data to validate
 * @returns Validated and typed drill plan data
 * @throws {Error} If validation fails
 */
export const validateDrillPlanDb = createThrowingValidator(DrillPlanDbSchema, "DrillPlan");

/**
 * Safe Validate DrillPlan (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data DrillPlan data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateDrillPlanDb = createSafeValidator(DrillPlanDbSchema);

/**
 * Is Valid DrillPlan (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches DrillPlanDbSchema
 */
export const isValidDrillPlanDb = createTypeGuard(DrillPlanDbSchema);

/**
 * Validate DrillPlan (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data DrillPlan data to validate
 * @returns Validated and typed drill plan data
 * @throws {Error} If validation fails
 */
export const validateDrillPlanBusiness = createThrowingValidator(DrillPlanBusinessSchema, "DrillPlan");

/**
 * Safe Validate DrillPlan (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data DrillPlan data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateDrillPlanBusiness = createSafeValidator(DrillPlanBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve DrillPlan
 *
 * Checks if a drill plan can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have plannedTotalDepth
 * 4. Must have coordinates (Easting, Northing, RL) if any coordinate is provided
 * 5. Must have orientation (Azimuth, Dip) if any orientation is provided
 * 6. Must have plannedStartDt and plannedCompleteDt
 *
 * @param data DrillPlan data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveDrillPlan(drillPlanData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveDrillPlan(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = DrillPlanBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const drillPlan = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(drillPlan.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Drill plan must be in review status to be approved");
	}

	// Check required fields for approval
	if (!drillPlan.plannedTotalDepth || drillPlan.plannedTotalDepth <= 0) {
		errors.push("Planned total depth is required for approval and must be greater than 0");
	}

	// Check coordinates if any are provided
	const hasEasting = drillPlan.plannedEasting !== undefined && drillPlan.plannedEasting !== null;
	const hasNorthing = drillPlan.plannedNorthing !== undefined && drillPlan.plannedNorthing !== null;
	const hasRL = drillPlan.plannedRL !== undefined && drillPlan.plannedRL !== null;

	if (hasEasting || hasNorthing || hasRL) {
		if (!hasEasting || !hasNorthing || !hasRL) {
			errors.push("All coordinates (Easting, Northing, RL) must be provided together");
		}
	}

	// Check orientation if any is provided
	const hasAzimuth = drillPlan.plannedAzimuth !== undefined && drillPlan.plannedAzimuth !== null;
	const hasDip = drillPlan.plannedDip !== undefined && drillPlan.plannedDip !== null;

	if (hasAzimuth || hasDip) {
		if (!hasAzimuth || !hasDip) {
			errors.push("Azimuth and Dip must be provided together");
		}
	}

	// Check planning dates
	if (!drillPlan.plannedStartDt) {
		errors.push("Planned start date is required for approval");
	}

	if (!drillPlan.plannedCompleteDt) {
		errors.push("Planned complete date is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate DrillPlan For Review
 *
 * Checks if a drill plan is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data DrillPlan data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateDrillPlanForReview(drillPlanData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateDrillPlanForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = DrillPlanDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const drillPlan = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!drillPlan.organization) {
		errors.push("Organization is required for review");
	}

	if (!drillPlan.dataSource) {
		errors.push("Data source is required for review");
	}

	if (!drillPlan.project) {
		errors.push("Project is required for review");
	}

	if (!drillPlan.holeType) {
		errors.push("Hole type is required for review");
	}

	if (!drillPlan.holePurpose) {
		errors.push("Hole purpose is required for review");
	}

	if (!drillPlan.holePurposeDetail) {
		errors.push("Hole purpose detail is required for review");
	}

	if (!drillPlan.holeStatus) {
		errors.push("Hole status is required for review");
	}

	if (!drillPlan.holeType) {
		errors.push("Hole type is required for review");
	}

	if (!drillPlan.organization) {
		errors.push("Organization is required for review");
	}

	if (!drillPlan.project) {
		errors.push("Project is required for review");
	}

	if (!drillPlan.prospect) {
		errors.push("Prospect is required for review");
	}

	if (!drillPlan.target) {
		errors.push("Target is required for review");
	}

	if (!drillPlan.subTarget) {
		errors.push("Sub-target is required for review");
	}

	if (!drillPlan.pit) {
		errors.push("Pit is required for review");
	}

	if (!drillPlan.phase) {
		errors.push("Phase is required for review");
	}

	if (!drillPlan.zone) {
		errors.push("Zone is required for review");
	}

	if (!drillPlan.tenement) {
		errors.push("Tenement is required for review");
	}

	if (!drillPlan.drillType) {
		errors.push("Drill type is required for review");
	}

	if (!drillPlan.drillPattern) {
		errors.push("Drill pattern is required for review");
	}

	if (!drillPlan.grid) {
		errors.push("Grid is required for review");
	}

	if (!drillPlan.plannedBy) {
		errors.push("Planned by is required for review");
	}

	// Warnings (not blocking)
	if (!drillPlan.plannedTotalDepth) {
		warnings.push("Planned total depth should be provided before review");
	}

	if (!drillPlan.plannedStartDt) {
		warnings.push("Planned start date should be provided before review");
	}

	if (!drillPlan.plannedCompleteDt) {
		warnings.push("Planned complete date should be provided before review");
	}

	if (!drillPlan.plannedEasting && !drillPlan.plannedNorthing && !drillPlan.plannedRL) {
		warnings.push("Coordinates should be provided when available");
	}

	if (!drillPlan.plannedAzimuth && !drillPlan.plannedDip) {
		warnings.push("Orientation should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(drillPlan, warnings);
}

/**
 * Get DrillPlan Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data DrillPlan data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getDrillPlanValidationReport(drillPlanData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getDrillPlanValidationReport(data: unknown): {
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
	const dbResult = DrillPlanDbSchema.safeParse(data);
	const businessResult = DrillPlanBusinessSchema.safeParse(data);
	const approvalCheck = canApproveDrillPlan(data);
	const reviewCheck = validateDrillPlanForReview(data);

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
export type { DrillPlanInsertRecord } from "../tables/drillplan/schema";

/**
 * Validated DrillPlan types (after schema validation)
 */
export type ValidatedDrillPlanDb = DrillPlanDbOutput;
export type ValidatedDrillPlanBusiness = DrillPlanBusinessOutput;
