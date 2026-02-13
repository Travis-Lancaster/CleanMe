/**
 * Schema Helpers Module
 *
 * Reusable validation primitives, enums, refinements, and utilities
 * for building two-tier validation schemas on top of auto-generated tables.
 *
 * **Architecture**:
 * ```
 * Auto-Generated Table Schemas (Tier 1 Base)
 *           ↓
 * Schema Helpers (Type Refinements)
 *           ↓
 * Business Extensions (Tier 2)
 * ```
 *
 * **Usage**:
 * ```typescript
 * import {
 *   GuidSchema,
 *   IsoDateSchema,
 *   DepthSchema,
 *   validateDepthRelationship,
 *   createThrowingValidator
 * } from '@/data/domain/schema-helpers';
 *
 * import { SurveyTableInsertBaseSchema } from '@/data/domain/tables/survey/schema';
 *
 * // Tier 1: Refine auto-generated schema
 * const SurveyDbSchema = SurveyTableInsertBaseSchema.extend({
 *   surveyId: GuidSchema,
 *   collarId: GuidSchema,
 *   surveyedOnDt: IsoDateSchema.optional(),
 * });
 *
 * // Tier 2: Add business rules
 * const SurveyBusinessSchema = SurveyDbSchema.refine(
 *   validateDepthRelationship,
 *   { message: "DepthFrom must be less than DepthTo" }
 * );
 *
 * // Create validators
 * export const validateSurveyDb = createThrowingValidator(SurveyDbSchema, "Survey");
 * export const validateSurveyBusiness = createThrowingValidator(SurveyBusinessSchema, "Survey");
 * ```
 *
 * @module schema-helpers
 * @see {@link primitives} for base schemas (GuidSchema, DateSchema, etc.)
 * @see {@link enums} for status and flag enums
 * @see {@link refinements} for cross-field validation functions
 * @see {@link validators} for validation utilities
 */

// ========================================
// PRIMITIVES
// ========================================

export {
	type ActiveInd,
	// Boolean Flags
	ActiveIndEnum,
	type ApprovalStatus,
	// Approval Status
	ApprovalStatusEnum,
	ApprovalStatusLabels,
	ApprovalStatusNumberEnum,

	ApprovalStatusValues,
	ApprovedIndEnum,
	canApprove,
	canSubmitForReview,
	type DataSourceType,

	DataSourceTypes,
	type DrillPlanStatusCode,
	DrillPlanStatusCodes,
	EnumLabels,
	// Collections
	EnumSchemas,

	EnumValues,
	getValidNextStatuses,
	type HoleStatusCode,
	// Status Codes
	HoleStatusCodes,
	IsDefaultIndEnum,
	isEditable,

	isFinal,
	// Status Helpers
	isValidStatusTransition,
	ModelUseIndEnum,
	ReportIncludeIndEnum,
	type RowStatus,
	// Row Status
	RowStatusEnum,
	RowStatusEnumValidator,
	RowStatusLabels,

	RowStatusNumberEnum,
	RowStatusValues,
	type SampleQCType,
	SampleQCTypes,
	type ValidationStatus,
	// Validation Status
	ValidationStatusEnum,

	ValidationStatusLabels,
	ValidationStatusNumberEnum,
	ValidationStatusValues,
} from "./enums";

// ========================================
// ENUMS
// ========================================

export {
	type Azimuth,
	// Angles
	AzimuthSchema,
	// Boolean
	BooleanSchema,

	BooleanSchemaOptional,
	type Code,
	CodeSchema,

	type Comments,
	CommentsSchema,
	CommentsSchemaNullable,

	CommentsSchemaOptional,
	type CoordinatePair,
	// Composite Types
	CoordinatePairSchema,
	type Depth,
	type DepthInterval,

	DepthIntervalSchema,
	// Depth
	DepthSchema,
	DepthSchemaNullable,

	DepthSchemaOptional,
	type Description,

	DescriptionSchema,
	type Dip,

	DipSchema,
	type Easting,

	EastingSchema,
	// Type exports
	type Guid,
	// GUID/UUID
	GuidSchema,
	GuidSchemaNullable,
	GuidSchemaOptional,
	type HoleId,

	// Strings
	HoleIdSchema,
	type IsoDate,
	// Dates
	IsoDateSchema,
	IsoDateSchemaNullable,

	IsoDateSchemaOptional,
	type Latitude,
	// Coordinates
	LatitudeSchema,
	type Longitude,
	LongitudeSchema,
	type Northing,
	NorthingSchema,
	ODSPrioritySchema,
	type Orientation,
	OrientationSchema,
	type Percentage,
	// Percentage
	PercentageSchema,
	PercentageSchemaOptional,
	PlungeSchema,
	type Priority,
	// Priority
	PrioritySchema,
	type RL,
	RLSchema,
	type UTMCoordinate,
	UTMCoordinateSchema,
} from "./primitives";

// ========================================
// ROW STATUS HELPERS
// ========================================

export {
	createDateReasonablenessValidator,
	createDepthIntervalValidator,
	createPercentageSumValidator,
	createPlannedDateValidator,

	// Collection
	Refinements,
	validateAtLeastOneField,
	// Conditional
	validateConditionalRequirement,

	// Coordinates
	validateCoordinateCompleteness,
	// Dates
	validateDateOrdering,

	// Depth
	validateDepthRelationship,
	validateDrillingOrientation,

	// Strings
	validateMutuallyExclusiveFields,
	validateNoDepthGaps,

	validateNoDepthOverlaps,
	// Orientation
	validateOrientationCompleteness,

	// Percentages
	validateRecoveryPercentage,

	// Numeric
	validateTotalDepthRelationships,

	validateUTMZoneConsistency,
} from "./refinements";

// ========================================
// REFINEMENTS
// ========================================

export {
	// Value Extraction
	getRowStatusValue,

	getRowStatusValueOr,
	// Status Checks
	isRowStatus,

	// Type Guards
	isRowStatusInterface,
	isRowStatusOneOf,
} from "./row-status-helpers";

// ========================================
// VALIDATORS
// ========================================

export {
	createAsyncValidator,
	createBatchValidator,
	createErrorResult,
	createPartialSafeValidator,
	createPartialValidator,
	createSafeValidator,
	createSuccessResult,

	// Validator Creators
	createThrowingValidator,
	createTypeGuard,
	// Error Formatting
	formatZodErrors,

	formatZodErrorsByField,
	formatZodErrorsToArray,
	mergeValidationResults,
	// Field Validation
	validateSingleField,

	// Result Helpers
	type ValidationResult,

	// Collection
	Validators,
} from "./validators";

// ========================================
// RE-EXPORTS
// ========================================

/**
 * Re-export Zod for convenience
 */
export { z, type ZodError, type ZodSchema } from "zod";

// ========================================
// ERROR MESSAGES
// ========================================

/**
 * Standard error message constants
 *
 * Use these for consistent error messaging across all validations.
 */
export const ErrorMessages = {
	// Required fields
	REQUIRED: "This field is required",
	REQUIRED_FOR_APPROVAL: "This field is required for approval",

	// GUID/UUID
	INVALID_GUID: "Must be a valid UUID/GUID format",

	// Dates
	INVALID_DATE: "Must be a valid date",
	DATE_TOO_OLD: "Date is before minimum allowed date (1980)",
	DATE_TOO_FUTURE: "Date is too far in the future",
	START_AFTER_END: "Start date must be before end date",

	// Depth
	INVALID_DEPTH: "Depth must be a number",
	DEPTH_NEGATIVE: "Depth cannot be negative",
	DEPTH_TOO_DEEP: "Depth exceeds maximum (3500m)",
	DEPTH_FROM_GREATER: "DepthFrom must be less than DepthTo",
	DEPTH_GAP: "Gap detected in depth intervals",
	DEPTH_OVERLAP: "Overlap detected in depth intervals",

	// Coordinates
	INVALID_COORDINATE: "Invalid coordinate value",
	INCOMPLETE_COORDINATES: "All coordinates must be provided together",

	// Orientation
	INVALID_AZIMUTH: "Azimuth must be between 0 and 360 degrees",
	INVALID_DIP: "Dip must be between -90 and 90 degrees",
	INCOMPLETE_ORIENTATION: "Azimuth and Dip must be provided together",

	// Percentage
	INVALID_PERCENTAGE: "Must be between 0 and 100",
	PERCENTAGE_SUM_INVALID: "Percentages must sum to 100",

	// Status
	INVALID_STATUS_TRANSITION: "Invalid status transition",
	CANNOT_EDIT_APPROVED: "Cannot edit approved records",
	CANNOT_APPROVE_DRAFT: "Cannot approve draft records",

	// Business Rules
	INVALID_RELATIONSHIP: "Invalid relationship between fields",
	MUTUALLY_EXCLUSIVE: "Only one of these fields can be populated",
	AT_LEAST_ONE_REQUIRED: "At least one of these fields must be populated",
	CONDITIONAL_REQUIRED: "This field is required when another field is populated",
} as const;

// ========================================
// VERSION
// ========================================

/**
 * Schema Helpers Version
 */
export const SCHEMA_HELPERS_VERSION = "1.0.0";
