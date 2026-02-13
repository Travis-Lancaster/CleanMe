/**
 * Primitive Schema Validators
 *
 * Reusable Zod schemas that upgrade generic `.any()` types from auto-generated schemas
 * to properly typed and validated fields.
 *
 * These primitives are used across all table extensions to ensure:
 * - Type safety (UUID format, ISO dates, etc.)
 * - Consistent validation rules
 * - Clear error messages
 * - DRY principle
 *
 * @module schema-helpers/primitives
 */

import { z } from "zod";

// ========================================
// GUID / UUID SCHEMA
// ========================================

/**
 * UUID/GUID Schema
 *
 * Validates that a string is a valid UUID format (with or without dashes).
 * Replaces generic `.any()` for GUID fields in auto-generated schemas.
 *
 * **Formats accepted**:
 * - With dashes: `550e8400-e29b-41d4-a716-446655440000`
 * - Without dashes: `550e8400e29b41d4a716446655440000`
 *
 * **Usage**:
 * ```typescript
 * const CollarDbSchema = CollarTableInsertBaseSchema.extend({
 *   CollarId: GuidSchema,
 *   ProjectId: GuidSchema,
 * });
 * ```
 */
export const GuidSchema = z
	.string()
	.regex(
		/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i,
		"Must be a valid UUID/GUID format",
	)
	.describe("UUID/GUID identifier");

/**
 * Optional GUID Schema
 * For nullable GUID fields
 */
export const GuidSchemaOptional = GuidSchema.optional();

/**
 * Nullable GUID Schema
 * For fields that can be null
 */
export const GuidSchemaNullable = GuidSchema.nullable();

// ========================================
// DATE SCHEMA
// ========================================

/**
 * ISO Date Schema
 *
 * Validates that a date is in ISO 8601 format and is a valid date.
 * Replaces generic `.any()` for date fields in auto-generated schemas.
 *
 * **Formats accepted**:
 * - ISO 8601 with timezone: `2024-01-15T10:30:00.000Z`
 * - ISO 8601 with offset: `2024-01-15T10:30:00+00:00`
 * - Date object is automatically coerced
 *
 * **Usage**:
 * ```typescript
 * const CollarDbSchema = CollarTableInsertBaseSchema.extend({
 *   CreatedOnDt: IsoDateSchema,
 *   StartedOnDt: IsoDateSchema.optional(),
 * });
 * ```
 */
export const IsoDateSchema = z.coerce
	.date()
	.describe("ISO 8601 date/time");

/**
 * Optional ISO Date Schema
 */
export const IsoDateSchemaOptional = IsoDateSchema.optional();

/**
 * Nullable ISO Date Schema
 */
export const IsoDateSchemaNullable = IsoDateSchema.nullable();

// ========================================
// DEPTH SCHEMA
// ========================================

/**
 * Depth Schema
 *
 * Validates depth measurements in meters.
 * Used for drilling depth fields (DepthFrom, DepthTo, TotalDepth, etc.)
 *
 * **Constraints**:
 * - Minimum: 0 meters (surface)
 * - Maximum: 3500 meters (typical maximum drilling depth)
 * - Must be a number
 *
 * **Usage**:
 * ```typescript
 * const GeologyLogDbSchema = GeologyLogTableInsertBaseSchema.extend({
 *   DepthFrom: DepthSchema,
 *   DepthTo: DepthSchema,
 * });
 * ```
 */
export const DepthSchema = z
	.number()
	.min(0, "Depth cannot be negative")
	.max(3500, "Depth cannot exceed 3500 meters")
	.describe("Depth in meters (0-3500m)");

/**
 * Optional Depth Schema
 */
export const DepthSchemaOptional = DepthSchema.optional();

/**
 * Nullable Depth Schema
 */
export const DepthSchemaNullable = DepthSchema.nullable();

// ========================================
// COORDINATE SCHEMA
// ========================================

/**
 * Latitude Schema
 *
 * Validates latitude coordinates in decimal degrees.
 *
 * **Constraints**:
 * - Minimum: -90° (South Pole)
 * - Maximum: 90° (North Pole)
 */
export const LatitudeSchema = z
	.number()
	.min(-90, "Latitude must be between -90 and 90")
	.max(90, "Latitude must be between -90 and 90")
	.describe("Latitude in decimal degrees (-90 to 90)");

/**
 * Longitude Schema
 *
 * Validates longitude coordinates in decimal degrees.
 *
 * **Constraints**:
 * - Minimum: -180° (Western hemisphere)
 * - Maximum: 180° (Eastern hemisphere)
 */
export const LongitudeSchema = z
	.number()
	.min(-180, "Longitude must be between -180 and 180")
	.max(180, "Longitude must be between -180 and 180")
	.describe("Longitude in decimal degrees (-180 to 180)");

/**
 * Easting Schema (UTM)
 *
 * Validates easting coordinates in UTM projection.
 * Typical range for valid easting values.
 */
export const EastingSchema = z
	.number()
	.min(0, "Easting must be positive")
	.max(1000000, "Easting exceeds typical UTM range")
	.describe("Easting coordinate in UTM projection");

/**
 * Northing Schema (UTM)
 *
 * Validates northing coordinates in UTM projection.
 * Typical range for valid northing values.
 */
export const NorthingSchema = z
	.number()
	.min(0, "Northing must be positive")
	.max(10000000, "Northing exceeds typical UTM range")
	.describe("Northing coordinate in UTM projection");

/**
 * RL (Reduced Level) Schema
 *
 * Validates reduced level (elevation) in meters.
 * Typical range from below sea level to mountain heights.
 */
export const RLSchema = z
	.number()
	.min(-500, "RL below typical range")
	.max(9000, "RL above typical range")
	.describe("Reduced Level (elevation) in meters");

// ========================================
// ANGLE SCHEMA
// ========================================

/**
 * Azimuth Schema
 *
 * Validates azimuth angles in degrees.
 * Used for drilling orientation and structural measurements.
 *
 * **Constraints**:
 * - Minimum: 0° (North)
 * - Maximum: 360° (Full circle back to North)
 */
export const AzimuthSchema = z
	.number()
	.min(0, "Azimuth must be between 0 and 360 degrees")
	.max(360, "Azimuth must be between 0 and 360 degrees")
	.describe("Azimuth in degrees (0-360)");

/**
 * Dip Schema
 *
 * Validates dip angles in degrees.
 * Used for drilling orientation and structural measurements.
 *
 * **Constraints**:
 * - Minimum: -90° (vertical down)
 * - Maximum: 90° (vertical up)
 *
 * **Common values**:
 * - 0°: Horizontal
 * - -90°: Vertical downhole
 * - 45°: 45-degree incline
 */
export const DipSchema = z
	.number()
	.min(-90, "Dip must be between -90 and 90 degrees")
	.max(90, "Dip must be between -90 and 90 degrees")
	.describe("Dip in degrees (-90 to 90)");

/**
 * Plunge Schema (same as Dip, different terminology)
 */
export const PlungeSchema = DipSchema.describe("Plunge in degrees (-90 to 90)");

// ========================================
// PRIORITY SCHEMA
// ========================================

/**
 * Priority Schema
 *
 * Validates priority levels for tasks, drill plans, etc.
 *
 * **Constraints**:
 * - Minimum: 1 (Highest priority)
 * - Maximum: 10 (Lowest priority)
 */
export const PrioritySchema = z
	.number()
	.int()
	.min(1, "Priority must be between 1 and 10")
	.max(10, "Priority must be between 1 and 10")
	.describe("Priority level (1=highest, 10=lowest)");

/**
 * ODS Priority Schema (extended range)
 *
 * ODS (Operations Data Store) uses extended priority range.
 */
export const ODSPrioritySchema = z
	.number()
	.int()
	.min(1, "ODS Priority must be between 1 and 100")
	.max(100, "ODS Priority must be between 1 and 100")
	.describe("ODS Priority level (1=highest, 100=lowest)");

// ========================================
// PERCENTAGE SCHEMA
// ========================================

/**
 * Percentage Schema
 *
 * Validates percentage values.
 * Used for recovery percentages, quality metrics, etc.
 *
 * **Constraints**:
 * - Minimum: 0%
 * - Maximum: 100%
 */
export const PercentageSchema = z
	.number()
	.min(0, "Percentage cannot be negative")
	.max(100, "Percentage cannot exceed 100")
	.describe("Percentage (0-100)");

/**
 * Optional Percentage Schema
 */
export const PercentageSchemaOptional = PercentageSchema.optional();

// ========================================
// BOOLEAN SCHEMA
// ========================================

/**
 * Boolean Schema
 *
 * Properly typed boolean to replace `.any()` for boolean fields.
 * Coerces common boolean representations.
 *
 * **Accepted values**:
 * - true, false (boolean)
 * - 1, 0 (number)
 * - "true", "false", "1", "0" (string, case-insensitive)
 */
export const BooleanSchema = z.coerce
	.boolean()
	.describe("Boolean value");

/**
 * Optional Boolean Schema
 */
export const BooleanSchemaOptional = BooleanSchema.optional();

// ========================================
// STRING SCHEMAS
// ========================================

/**
 * Hole ID Schema
 *
 * Validates drill hole naming conventions.
 *
 * **Format**: Alphanumeric with common separators
 * - Example: "DDH-001", "RC-2024-123", "WGD123"
 *
 * **Constraints**:
 * - Minimum length: 3 characters
 * - Maximum length: 50 characters
 * - Alphanumeric plus dash/underscore
 */
export const HoleIdSchema = z
	.string()
	.min(3, "Hole ID must be at least 3 characters")
	.max(50, "Hole ID cannot exceed 50 characters")
	.regex(
		/^[A-Z0-9][\w-]*$/i,
		"Hole ID must contain only alphanumeric characters, dashes, or underscores",
	)
	.describe("Drill hole identifier");

/**
 * Code Schema (for lookup tables)
 *
 * Generic schema for code fields in lookup tables.
 *
 * **Constraints**:
 * - Minimum length: 1 character
 * - Maximum length: 50 characters
 * - Non-empty string
 */
export const CodeSchema = z
	.string()
	.min(1, "Code cannot be empty")
	.max(50, "Code cannot exceed 50 characters")
	.describe("Code value");

/**
 * Description Schema
 *
 * Generic schema for description fields.
 *
 * **Constraints**:
 * - Minimum length: 1 character
 * - Maximum length: 1000 characters
 */
export const DescriptionSchema = z
	.string()
	.min(1, "Description cannot be empty")
	.max(1000, "Description cannot exceed 1000 characters")
	.describe("Description text");

/**
 * Comments Schema
 *
 * Schema for comment fields with extended length.
 *
 * **Constraints**:
 * - Maximum length: 4000 characters
 */
export const CommentsSchema = z
	.string()
	.max(4000, "Comments cannot exceed 4000 characters")
	.describe("Comments text");

/**
 * Optional Comments Schema
 */
export const CommentsSchemaOptional = CommentsSchema.optional();

/**
 * Nullable Comments Schema
 */
export const CommentsSchemaNullable = CommentsSchema.nullable();

// ========================================
// COMPOSITE TYPES
// ========================================

/**
 * Coordinate Pair Schema
 *
 * Validates a coordinate pair (lat/long or easting/northing).
 * Used for location validation.
 */
export const CoordinatePairSchema = z.object({
	latitude: LatitudeSchema,
	longitude: LongitudeSchema,
}).describe("Coordinate pair (lat/long)");

/**
 * UTM Coordinate Schema
 *
 * Validates UTM coordinates (easting/northing/RL).
 */
export const UTMCoordinateSchema = z.object({
	easting: EastingSchema,
	northing: NorthingSchema,
	rl: RLSchema,
}).describe("UTM coordinate (easting/northing/RL)");

/**
 * Depth Interval Schema
 *
 * Validates a depth interval (from/to).
 * Note: This does NOT validate that from < to (use refinement for that).
 */
export const DepthIntervalSchema = z.object({
	depthFrom: DepthSchema,
	depthTo: DepthSchema,
}).describe("Depth interval (from/to)");

/**
 * Orientation Schema
 *
 * Validates orientation (azimuth + dip).
 */
export const OrientationSchema = z.object({
	azimuth: AzimuthSchema,
	dip: DipSchema,
}).describe("Orientation (azimuth/dip)");

// ========================================
// TYPE EXPORTS
// ========================================

export type Guid = z.infer<typeof GuidSchema>;
export type IsoDate = z.infer<typeof IsoDateSchema>;
export type Depth = z.infer<typeof DepthSchema>;
export type Latitude = z.infer<typeof LatitudeSchema>;
export type Longitude = z.infer<typeof LongitudeSchema>;
export type Easting = z.infer<typeof EastingSchema>;
export type Northing = z.infer<typeof NorthingSchema>;
export type RL = z.infer<typeof RLSchema>;
export type Azimuth = z.infer<typeof AzimuthSchema>;
export type Dip = z.infer<typeof DipSchema>;
export type Priority = z.infer<typeof PrioritySchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type HoleId = z.infer<typeof HoleIdSchema>;
export type Code = z.infer<typeof CodeSchema>;
export type Description = z.infer<typeof DescriptionSchema>;
export type Comments = z.infer<typeof CommentsSchema>;
export type CoordinatePair = z.infer<typeof CoordinatePairSchema>;
export type UTMCoordinate = z.infer<typeof UTMCoordinateSchema>;
export type DepthInterval = z.infer<typeof DepthIntervalSchema>;
export type Orientation = z.infer<typeof OrientationSchema>;
