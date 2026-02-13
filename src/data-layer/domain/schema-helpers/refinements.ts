/**
 * Refinement Functions
 *
 * Reusable validation logic for cross-field validation using Zod's `.refine()`.
 * These functions encapsulate common business rules that apply across multiple tables.
 *
 * **Usage**:
 * ```typescript
 * const MySchema = BaseSchema.refine(validateDepthRelationship, {
 *   message: "DepthFrom must be less than DepthTo",
 *   path: ["depthFrom"]
 * });
 * ```
 *
 * @module schema-helpers/refinements
 */

// ========================================
// DEPTH RELATIONSHIPS
// ========================================

/**
 * Validate Depth Relationship
 *
 * Ensures that DepthFrom is less than DepthTo.
 * Used in all logging tables that have depth intervals.
 *
 * **Fields required**: `depthFrom`, `depthTo`
 *
 * @example
 * ```typescript
 * const GeologyLogSchema = BaseSchema.refine(validateDepthRelationship, {
 *   message: "DepthFrom must be less than DepthTo",
 *   path: ["depthFrom"]
 * });
 * ```
 */
export function validateDepthRelationship(data: any): boolean {
	if (data.depthFrom !== undefined && data.depthTo !== undefined) {
		return data.depthFrom < data.depthTo;
	}
	return true; // Skip validation if fields are missing
}

/**
 * Validate Depth Interval Size
 *
 * Ensures that depth intervals are within acceptable range.
 *
 * **Common ranges**:
 * - Geology logs: 0.1m - 50m
 * - Survey logs: Any positive interval
 * - Core recovery: 1m - 6m (run length)
 *
 * @param minInterval Minimum allowed interval (default: 0.01m)
 * @param maxInterval Maximum allowed interval (default: 50m)
 */
export function createDepthIntervalValidator(
	minInterval: number = 0.01,
	maxInterval: number = 50,
) {
	return function validateDepthInterval(data: any): boolean {
		if (data.depthFrom !== undefined && data.depthTo !== undefined) {
			const interval = data.depthTo - data.depthFrom;
			return interval >= minInterval && interval <= maxInterval;
		}
		return true;
	};
}

/**
 * Validate No Depth Gaps
 *
 * For sequential logging, ensures continuous depth coverage.
 * This is a helper that would be used in batch validation.
 *
 * @param records Array of records with depthFrom and depthTo
 * @returns true if no gaps exist
 */
export function validateNoDepthGaps(records: Array<{ depthFrom: number, depthTo: number }>): boolean {
	if (records.length <= 1)
		return true;

	// Sort by depthFrom
	const sorted = [...records].sort((a, b) => a.depthFrom - b.depthFrom);

	// Check each adjacent pair
	for (let i = 0; i < sorted.length - 1; i++) {
		const currentEnd = sorted[i].depthTo;
		const nextStart = sorted[i + 1].depthFrom;

		// Allow small tolerance (0.01m) for floating point precision
		if (Math.abs(currentEnd - nextStart) > 0.01) {
			return false; // Gap detected
		}
	}

	return true;
}

/**
 * Validate No Depth Overlaps
 *
 * Ensures depth intervals don't overlap.
 *
 * @param records Array of records with depthFrom and depthTo
 * @returns true if no overlaps exist
 */
export function validateNoDepthOverlaps(records: Array<{ depthFrom: number, depthTo: number }>): boolean {
	if (records.length <= 1)
		return true;

	// Sort by depthFrom
	const sorted = [...records].sort((a, b) => a.depthFrom - b.depthFrom);

	// Check each adjacent pair
	for (let i = 0; i < sorted.length - 1; i++) {
		const currentEnd = sorted[i].depthTo;
		const nextStart = sorted[i + 1].depthFrom;

		if (currentEnd > nextStart) {
			return false; // Overlap detected
		}
	}

	return true;
}

// ========================================
// DATE RELATIONSHIPS
// ========================================

/**
 * Validate Date Ordering
 *
 * Ensures that a start date is before an end date.
 * Used for drilling periods, sampling periods, etc.
 *
 * **Field pairs**:
 * - startedOnDt / finishedOnDt
 * - plannedStartDt / plannedCompleteDt
 * - surveyedOnDt / completedOnDt
 *
 * @example
 * ```typescript
 * const CollarSchema = BaseSchema.refine(
 *   (data) => validateDateOrdering(data, 'startedOnDt', 'finishedOnDt'),
 *   { message: "Start date must be before finish date", path: ["startedOnDt"] }
 * );
 * ```
 */
export function validateDateOrdering(
	data: any,
	startField: string = "startedOnDt",
	endField: string = "finishedOnDt",
): boolean {
	const startDate = data[startField];
	const endDate = data[endField];

	if (startDate && endDate) {
		const start = startDate instanceof Date ? startDate : new Date(startDate);
		const end = endDate instanceof Date ? endDate : new Date(endDate);
		return start <= end;
	}

	return true; // Skip if dates are missing
}

/**
 * Validate Date Reasonableness
 *
 * Ensures dates are within reasonable mining industry range.
 *
 * **Constraints**:
 * - Not before 1980 (modern mining era)
 * - Not more than 7 days in the future (allow for planning)
 *
 * @param fieldName Name of the date field to validate
 */
export function createDateReasonablenessValidator(fieldName: string = "createdOnDt") {
	return function validateDateReasonableness(data: any): boolean {
		const dateValue = data[fieldName];

		if (!dateValue)
			return true; // Skip if missing

		const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
		const minDate = new Date("1980-01-01");
		const maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + 7); // 7 days in future

		return date >= minDate && date <= maxDate;
	};
}

/**
 * Validate Planned Dates in Future
 *
 * For planning data, ensures planned dates are in the future or recent past.
 *
 * @param fieldName Name of the planned date field
 * @param allowPastDays Number of days in past to allow (default: 30)
 */
export function createPlannedDateValidator(
	fieldName: string = "plannedStartDt",
	allowPastDays: number = 30,
) {
	return function validatePlannedDate(data: any): boolean {
		const dateValue = data[fieldName];

		if (!dateValue)
			return true;

		const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
		const minDate = new Date();
		minDate.setDate(minDate.getDate() - allowPastDays);

		return date >= minDate;
	};
}

// ========================================
// COORDINATE RELATIONSHIPS
// ========================================

/**
 * Validate Coordinate Completeness
 *
 * Ensures coordinates are all provided or all missing (not partial).
 * Used for UTM coordinates (Easting, Northing, RL) and lat/long pairs.
 *
 * **Patterns**:
 * - All three UTM coordinates or none
 * - Both lat/long or neither
 *
 * @param fields Array of field names that must be all present or all absent
 *
 * @example
 * ```typescript
 * const CollarCoordinateSchema = BaseSchema.refine(
 *   (data) => validateCoordinateCompleteness(data, ['easting', 'northing', 'rl']),
 *   { message: "All coordinates must be provided together", path: ["easting"] }
 * );
 * ```
 */
export function validateCoordinateCompleteness(data: any, fields: string[]): boolean {
	const values = fields.map(field => data[field]);
	const definedCount = values.filter(v => v !== undefined && v !== null).length;

	// Either all defined or all undefined
	return definedCount === 0 || definedCount === fields.length;
}

/**
 * Validate UTM Zone Consistency
 *
 * Ensures UTM coordinates are reasonable for the specified zone.
 * This is a basic check - detailed validation would require zone lookup.
 *
 * @param data Object with easting, northing, and optionally utmZone
 */
export function validateUTMZoneConsistency(data: any): boolean {
	const { easting, northing, utmZone } = data;

	if (!easting || !northing)
		return true;

	// Basic reasonableness checks
	const validEasting = easting >= 100000 && easting <= 900000;
	const validNorthing = northing >= 0 && northing <= 10000000;

	return validEasting && validNorthing;
}

// ========================================
// ORIENTATION RELATIONSHIPS
// ========================================

/**
 * Validate Orientation Completeness
 *
 * Ensures azimuth and dip are provided together.
 * Used for drilling orientation, structural measurements.
 *
 * @example
 * ```typescript
 * const DrillPlanSchema = BaseSchema.refine(validateOrientationCompleteness, {
 *   message: "Azimuth and Dip must be provided together",
 *   path: ["plannedAzimuth"]
 * });
 * ```
 */
export function validateOrientationCompleteness(data: any): boolean {
	const azimuthFields = ["azimuth", "plannedAzimuth", "actualAzimuth"];
	const dipFields = ["dip", "plannedDip", "actualDip"];

	// Find which fields exist
	const hasAzimuth = azimuthFields.some(f => data[f] !== undefined && data[f] !== null);
	const hasDip = dipFields.some(f => data[f] !== undefined && data[f] !== null);

	// Both or neither
	return hasAzimuth === hasDip;
}

/**
 * Validate Drilling Orientation
 *
 * Warns about unusual drilling orientations.
 *
 * **Warnings**:
 * - Dip > 0 (upward drilling is unusual)
 * - Dip > -45 (shallow holes may have issues)
 * - Azimuth variations (rapid changes suggest errors)
 *
 * @returns Object with warnings array
 */
export function validateDrillingOrientation(azimuth?: number, dip?: number): {
	valid: boolean
	warnings: string[]
} {
	const warnings: string[] = [];

	if (dip !== undefined && dip > 0) {
		warnings.push("Upward drilling (positive dip) is unusual");
	}

	if (dip !== undefined && dip > -45) {
		warnings.push("Shallow dip angles may have stability issues");
	}

	if (azimuth !== undefined && (azimuth < 0 || azimuth > 360)) {
		warnings.push("Azimuth must be between 0 and 360 degrees");
	}

	return {
		valid: warnings.length === 0,
		warnings,
	};
}

// ========================================
// PERCENTAGE RELATIONSHIPS
// ========================================

/**
 * Validate Recovery Percentage
 *
 * Ensures core recovery percentage is reasonable.
 *
 * **Typical ranges**:
 * - Good ground: 90-100%
 * - Fair ground: 70-90%
 * - Poor ground: 50-70%
 * - Very poor: <50%
 *
 * Warns if <50% (very poor recovery) or >100% (impossible).
 */
export function validateRecoveryPercentage(data: any): boolean {
	const { recovery, coreRecoveryPercent, recoveryPercent } = data;
	const value = recovery ?? coreRecoveryPercent ?? recoveryPercent;

	if (value === undefined || value === null)
		return true;

	return value >= 0 && value <= 100;
}

/**
 * Validate Sum of Percentages
 *
 * Ensures a set of percentage fields sum to 100% (or less).
 * Used for composition percentages, vein percentages, etc.
 *
 * @param fields Array of field names containing percentages
 * @param allowLessThan100 If true, sum can be less than 100
 */
export function createPercentageSumValidator(
	fields: string[],
	allowLessThan100: boolean = true,
) {
	return function validatePercentageSum(data: any): boolean {
		const values = fields
			.map(field => data[field])
			.filter(v => v !== undefined && v !== null && typeof v === "number");

		if (values.length === 0)
			return true;

		const sum = values.reduce((acc, val) => acc + val, 0);

		if (allowLessThan100) {
			return sum >= 0 && sum <= 100;
		}
		else {
			return Math.abs(sum - 100) < 0.01; // Allow small floating point error
		}
	};
}

// ========================================
// STRING RELATIONSHIPS
// ========================================

/**
 * Validate Mutually Exclusive Fields
 *
 * Ensures only one of a set of fields is populated.
 * Used when multiple options exist but only one should be selected.
 *
 * @param fields Array of field names that are mutually exclusive
 *
 * @example
 * ```typescript
 * // Only one sample type should be specified
 * const SampleSchema = BaseSchema.refine(
 *   (data) => validateMutuallyExclusiveFields(data, ['sampleType1', 'sampleType2']),
 *   { message: "Only one sample type can be specified" }
 * );
 * ```
 */
export function validateMutuallyExclusiveFields(data: any, fields: string[]): boolean {
	const populatedCount = fields.filter(
		field => data[field] !== undefined && data[field] !== null && data[field] !== "",
	).length;

	return populatedCount <= 1;
}

/**
 * Validate At Least One Field
 *
 * Ensures at least one of a set of fields is populated.
 *
 * @param fields Array of field names, at least one must be present
 */
export function validateAtLeastOneField(data: any, fields: string[]): boolean {
	return fields.some(
		field => data[field] !== undefined && data[field] !== null && data[field] !== "",
	);
}

// ========================================
// CONDITIONAL REQUIREMENTS
// ========================================

/**
 * Validate Conditional Requirement
 *
 * If field A is populated, then field B must also be populated.
 *
 * @param triggerField Field that triggers the requirement
 * @param requiredField Field that becomes required
 *
 * @example
 * ```typescript
 * // If sampleId is provided, sampleType must also be provided
 * const Schema = BaseSchema.refine(
 *   (data) => validateConditionalRequirement(data, 'sampleId', 'sampleType'),
 *   { message: "Sample type is required when sample ID is provided", path: ["sampleType"] }
 * );
 * ```
 */
export function validateConditionalRequirement(
	data: any,
	triggerField: string,
	requiredField: string,
): boolean {
	const triggerValue = data[triggerField];
	const requiredValue = data[requiredField];

	// If trigger is populated, required must also be populated
	if (triggerValue !== undefined && triggerValue !== null && triggerValue !== "") {
		return requiredValue !== undefined && requiredValue !== null && requiredValue !== "";
	}

	return true; // Trigger not populated, no requirement
}

// ========================================
// NUMERIC RELATIONSHIPS
// ========================================

/**
 * Validate Total Depth Relationships
 *
 * Ensures total depth is greater than or equal to all interval depths.
 *
 * @param data Object with totalDepth and interval depth fields
 */
export function validateTotalDepthRelationships(data: any): boolean {
	const { totalDepth, plannedTotalDepth, finalDepth, actualTotalDepth } = data;
	const total = totalDepth ?? plannedTotalDepth ?? finalDepth ?? actualTotalDepth;

	if (!total)
		return true;

	// Check against various depth fields
	const depthFields = ["depthTo", "plannedDepthTo", "finalDepthTo"];

	for (const field of depthFields) {
		const value = data[field];
		if (value !== undefined && value !== null && value > total) {
			return false; // Interval depth exceeds total
		}
	}

	return true;
}

// ========================================
// EXPORTS
// ========================================

/**
 * All refinement functions for easy import
 */
export const Refinements = {
	// Depth
	validateDepthRelationship,
	createDepthIntervalValidator,
	validateNoDepthGaps,
	validateNoDepthOverlaps,

	// Dates
	validateDateOrdering,
	createDateReasonablenessValidator,
	createPlannedDateValidator,

	// Coordinates
	validateCoordinateCompleteness,
	validateUTMZoneConsistency,

	// Orientation
	validateOrientationCompleteness,
	validateDrillingOrientation,

	// Percentages
	validateRecoveryPercentage,
	createPercentageSumValidator,

	// Strings
	validateMutuallyExclusiveFields,
	validateAtLeastOneField,

	// Conditional
	validateConditionalRequirement,

	// Numeric
	validateTotalDepthRelationships,
} as const;
