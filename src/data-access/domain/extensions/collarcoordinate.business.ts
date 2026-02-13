/**
 * CollarCoordinate Business Validation
 *
 * Two-tier validation for CollarCoordinate table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/collar/collar.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateCollarCoordinateDb, validateCollarCoordinateBusiness } from './collarcoordinate.business';
 *
 * // Database validation (always use)
 * const validData = validateCollarCoordinateDb(data);
 * await db.collarCoordinates.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateCollarCoordinateBusiness(data);
 * ```
 *
 * @module extensions/collarcoordinate
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
	CollarCoordinateTableInsertBaseSchema,
} from "../tables/collarcoordinate/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * CollarCoordinate Database Schema (Tier 1)
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
export const CollarCoordinateDbSchema = CollarCoordinateTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	collarCoordinateId: GuidSchema.optional(), // Optional because it has DB default (newid())
	collarId: GuidSchema,
	supersededById: GuidSchema.nullable().optional(),

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	isDeleted: BooleanSchema.nullable().optional(),
	validated: BooleanSchema.nullable().optional(),
	reportIncludeInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true

	// ========================================
	// STATUS (validate enum values)
	// ========================================
	rowStatus: RowStatusNumberEnum.optional(), // DB default: 0 (Draft)
	validationStatus: ValidationStatusNumberEnum.optional(), // DB default: 0 (Valid)
	validatedStatus: z.number().int(), // Required field

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	surveyOnDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// COORDINATE FIELDS (validate range)
	// ========================================
	east: DepthSchema.nullable().optional(),
	north: DepthSchema.nullable().optional(),
	rL: DepthSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	dataSource: z.string().min(1, ErrorMessages.REQUIRED).max(255),
	surveyMethod: z.string().max(50),

	// Optional lookup references
	grid: z.string().max(50).nullable().optional(),
	rLSource: z.string().max(50).nullable().optional(),
	surveyBy: z.string().max(50).nullable().optional(),
	surveyCompany: z.string().max(50).nullable().optional(),
	instrument: z.string().max(50).nullable().optional(),
	priorityStatus: z.string().max(50).optional(), // DB default: 'Archived'

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 1000 chars
	validationErrors: z.string().max(4000).nullable().optional(),

	// ========================================
	// GEOGRAPHY FIELDS
	// ========================================
	geoPointWGS: z.any().nullable().optional(), // geography type
	geoPoint: z.any().nullable().optional(), // geometry type

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
	migrationID: z.number().int().nullable().optional(),
});

/**
 * CollarCoordinate Database Schema Type
 */
export type CollarCoordinateDbInput = z.input<typeof CollarCoordinateDbSchema>;
export type CollarCoordinateDbOutput = z.output<typeof CollarCoordinateDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * CollarCoordinate Business Schema (Tier 2)
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
 * - Coordinate completeness (all coordinates together or none)
 * - Priority status consistency
 * - Survey method validation
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. If any coordinate (East, North, RL) is provided, all must be provided
 * 2. Priority status must be valid (Archived, Active, etc.)
 * 3. Survey method must be specified
 * 4. Survey date should be reasonable (after 1980, not too far future)
 * 5. Validated status should be consistent with validation fields
 * 6. Comments should be provided for coordinates with issues
 */
export const CollarCoordinateBusinessSchema = CollarCoordinateDbSchema
	.refine(
		(data) => {
			// Business Rule 1: Coordinate completeness - all coordinates must be provided together
			const hasEast = data.east !== undefined && data.east !== null;
			const hasNorth = data.north !== undefined && data.north !== null;
			const hasRL = data.rL !== undefined && data.rL !== null;

			// If any coordinate is provided, all must be provided
			if (hasEast || hasNorth || hasRL) {
				return hasEast && hasNorth && hasRL;
			}
			return true;
		},
		{
			message: "All coordinates (East, North, RL) must be provided together",
			path: ["east"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Priority status must be valid
			const validStatuses = ["Archived", "Active", "Primary", "Secondary", "Tertiary"];
			if (data.priorityStatus) {
				return validStatuses.includes(data.priorityStatus);
			}
			return true;
		},
		{
			message: "Priority status must be one of: Archived, Active, Primary, Secondary, Tertiary",
			path: ["priorityStatus"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Survey method must be specified
			return data.surveyMethod && data.surveyMethod.trim().length > 0;
		},
		{
			message: "Survey method is required",
			path: ["surveyMethod"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Survey date should be reasonable - after 1980
			if (data.surveyOnDt) {
				const surveyDate = data.surveyOnDt instanceof Date
					? data.surveyOnDt
					: new Date(data.surveyOnDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return surveyDate >= minDate;
			}
			return true;
		},
		{
			message: "Survey date must be after 1980 (modern mining era)",
			path: ["surveyOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Survey date should be reasonable - not too far in future (7 days)
			if (data.surveyOnDt) {
				const surveyDate = data.surveyOnDt instanceof Date
					? data.surveyOnDt
					: new Date(data.surveyOnDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return surveyDate <= maxDate;
			}
			return true;
		},
		{
			message: "Survey date cannot be more than 7 days in the future",
			path: ["surveyOnDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Validated status should be consistent with validation fields
			if (data.validated !== undefined && data.validated !== null) {
				// If validated is true, validatedStatus should indicate validation passed
				if (data.validated === true) {
					return data.validatedStatus === 1; // Assuming 1 = Validated
				}
				// If validated is false, validatedStatus should indicate validation failed
				if (data.validated === false) {
					return data.validatedStatus === 0; // Assuming 0 = Not Validated
				}
			}
			return true;
		},
		{
			message: "Validated status should be consistent with validation fields",
			path: ["validated"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Comments should be provided for coordinates with issues
			if (data.validationStatus === 1 && data.validationErrors) {
				return data.comments && data.comments.trim().length > 0;
			}
			return true;
		},
		{
			message: "Comments should be provided when there are validation errors",
			path: ["comments"],
		},
	);

/**
 * CollarCoordinate Business Schema Type
 */
export type CollarCoordinateBusinessInput = z.input<typeof CollarCoordinateBusinessSchema>;
export type CollarCoordinateBusinessOutput = z.output<typeof CollarCoordinateBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate CollarCoordinate (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data CollarCoordinate data to validate
 * @returns Validated and typed collar coordinate data
 * @throws {Error} If validation fails
 */
export const validateCollarCoordinateDb = createThrowingValidator(CollarCoordinateDbSchema, "CollarCoordinate");

/**
 * Safe Validate CollarCoordinate (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data CollarCoordinate data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateCollarCoordinateDb = createSafeValidator(CollarCoordinateDbSchema);

/**
 * Is Valid CollarCoordinate (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches CollarCoordinateDbSchema
 */
export const isValidCollarCoordinateDb = createTypeGuard(CollarCoordinateDbSchema);

/**
 * Validate CollarCoordinate (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data CollarCoordinate data to validate
 * @returns Validated and typed collar coordinate data
 * @throws {Error} If validation fails
 */
export const validateCollarCoordinateBusiness = createThrowingValidator(CollarCoordinateBusinessSchema, "CollarCoordinate");

/**
 * Safe Validate CollarCoordinate (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data CollarCoordinate data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateCollarCoordinateBusiness = createSafeValidator(CollarCoordinateBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve CollarCoordinate
 *
 * Checks if a collar coordinate can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have collarId
 * 4. Must have surveyMethod
 * 5. Must have coordinates (East, North, RL) if any coordinate is provided
 * 6. Must have organization and dataSource
 *
 * @param data CollarCoordinate data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveCollarCoordinate(coordinateData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveCollarCoordinate(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = CollarCoordinateBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const coordinate = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(coordinate.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Collar coordinate must be in review status to be approved");
	}

	// Check required fields for approval
	if (!coordinate.collarId) {
		errors.push("Collar ID is required for approval");
	}

	if (!coordinate.surveyMethod) {
		errors.push("Survey method is required for approval");
	}

	if (!coordinate.organization) {
		errors.push("Organization is required for approval");
	}

	if (!coordinate.dataSource) {
		errors.push("Data source is required for approval");
	}

	// Check coordinate completeness
	const hasEast = coordinate.east !== undefined && coordinate.east !== null;
	const hasNorth = coordinate.north !== undefined && coordinate.north !== null;
	const hasRL = coordinate.rL !== undefined && coordinate.rL !== null;

	if (hasEast || hasNorth || hasRL) {
		if (!hasEast || !hasNorth || !hasRL) {
			errors.push("All coordinates (East, North, RL) must be provided together");
		}
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate CollarCoordinate For Review
 *
 * Checks if a collar coordinate is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data CollarCoordinate data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateCollarCoordinateForReview(coordinateData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateCollarCoordinateForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = CollarCoordinateDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const coordinate = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!coordinate.organization) {
		errors.push("Organization is required for review");
	}

	if (!coordinate.dataSource) {
		errors.push("Data source is required for review");
	}

	if (!coordinate.collarId) {
		errors.push("Collar ID is required for review");
	}

	if (!coordinate.surveyMethod) {
		errors.push("Survey method is required for review");
	}

	// Warnings (not blocking)
	if (!coordinate.east && !coordinate.north && !coordinate.rL) {
		warnings.push("Coordinates should be provided when available");
	}

	if (!coordinate.surveyOnDt) {
		warnings.push("Survey date should be provided when available");
	}

	if (!coordinate.surveyBy) {
		warnings.push("Survey by should be specified when available");
	}

	if (!coordinate.comments) {
		warnings.push("Comments should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(coordinate, warnings);
}

/**
 * Get CollarCoordinate Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data CollarCoordinate data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getCollarCoordinateValidationReport(coordinateData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getCollarCoordinateValidationReport(data: unknown): {
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
	const dbResult = CollarCoordinateDbSchema.safeParse(data);
	const businessResult = CollarCoordinateBusinessSchema.safeParse(data);
	const approvalCheck = canApproveCollarCoordinate(data);
	const reviewCheck = validateCollarCoordinateForReview(data);

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
export type { CollarCoordinateInsertRecord } from "../tables/collarcoordinate/schema";

/**
 * Validated CollarCoordinate types (after schema validation)
 */
export type ValidatedCollarCoordinateDb = CollarCoordinateDbOutput;
export type ValidatedCollarCoordinateBusiness = CollarCoordinateBusinessOutput;
