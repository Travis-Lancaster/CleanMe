/**
 * DrillPlan Schema Helpers
 * Reusable validation schemas and utilities for DrillPlan entity validation
 *
 * This module provides:
 * - Geological measurement validation primitives (azimuth, dip, coordinates)
 * - Common validation schemas (GUIDs, dates, depths, priorities)
 * - Enum schemas for validation and row status
 * - Utility functions for business logic
 * - Error message constants specific to drill planning
 */

import { RowStatusLabels } from "../schema-helpers";
// import { RowStatusLabels } from "#src/data/domain/schema-helpers/enums.js";
import { z } from "zod";

// ========================================
// PRIMITIVE VALIDATION SCHEMAS
// ========================================

/**
 * GUID/UUID validation
 */
export const GuidSchema = z.string().uuid("Must be a valid UUID");

/**
 * ISO 8601 datetime validation
 */
export const IsoDateSchema = z
	.string()
	.datetime("Must be a valid ISO 8601 datetime");

/**
 * Depth in meters - reasonable exploration drilling range
 * Range: 0-3500m (typical exploration: 50-2000m, deep exploration: up to 3500m)
 */
export const DepthSchema = z
	.number()
	.min(0, "Depth cannot be negative")
	.max(3500, "Depth exceeds maximum of 3500m");

/**
 * Drilling priority level (1=Highest, 10=Lowest)
 * Used by both Priority and DrillPriority fields
 */
export const PrioritySchema = z
	.number()
	.int("Priority must be an integer")
	.min(1, "Priority must be at least 1")
	.max(10, "Priority must not exceed 10");

/**
 * ODS Priority level (1=Highest, 100=Lowest)
 * Operational Drilling System priority - wider range for scheduling
 */
export const ODSPrioritySchema = z
	.number()
	.int("ODS Priority must be an integer")
	.min(1, "ODS Priority must be at least 1")
	.max(100, "ODS Priority must not exceed 100");

// ========================================
// GEOLOGICAL MEASUREMENT SCHEMAS
// ========================================

/**
 * Azimuth in degrees (0-360)
 * 0° = North, 90° = East, 180° = South, 270° = West
 * Geological convention: measured clockwise from North
 */
export const AzimuthSchema = z
	.number()
	.min(0, "Azimuth must be between 0° and 360°")
	.max(360, "Azimuth must be between 0° and 360°");

/**
 * Dip in degrees (-90 to 90)
 * Positive = downdip (downward), Negative = updip (upward)
 * 0° = horizontal, 90° = vertical down, -90° = vertical up
 * Industry standard: most exploration holes are -45° to -90° (drilling down)
 */
export const DipSchema = z
	.number()
	.min(-90, "Dip must be between -90° and 90°")
	.max(90, "Dip must be between -90° and 90°");

/**
 * Easting coordinate (meters)
 * Reasonable range for most mining projects: -1,000,000 to 10,000,000m
 * Covers all global UTM zones
 */
export const EastingSchema = z
	.number()
	.min(-1_000_000, "Easting is outside reasonable range")
	.max(10_000_000, "Easting is outside reasonable range");

/**
 * Northing coordinate (meters)
 * Reasonable range for most mining projects: -10,000,000 to 10,000,000m
 * Covers all global latitudes in UTM
 */
export const NorthingSchema = z
	.number()
	.min(-10_000_000, "Northing is outside reasonable range")
	.max(10_000_000, "Northing is outside reasonable range");

/**
 * RL (Reduced Level) / Elevation in meters
 * Reasonable range: -500m (below sea level) to 6000m (high altitude)
 * Covers Dead Sea (-430m) to highest mines (~5500m)
 */
export const RLSchema = z
	.number()
	.min(-500, "RL is outside reasonable range (min: -500m)")
	.max(6000, "RL is outside reasonable range (max: 6000m)");

// ========================================
// ENUM SCHEMAS
// ========================================

/**
 * Validation Status Enum
 * - 0: Valid (passes all checks)
 * - 1: Warning (minor issues, acceptable)
 * - 2: Error (critical issues, must fix)
 */
export const ValidationStatusEnum = z.union([
	z.literal(0),
	z.literal(1),
	z.literal(2),
]);

export type ValidationStatus = z.infer<typeof ValidationStatusEnum>;

/**
 * Row Status Enum (Zod validator)
 * - 0: Draft (being created/edited)
 * - 1: In Review (submitted for approval)
 * - 2: Approved (validated and locked)
 * - 3: Rejected (failed review)
 * - 4: Superseded (replaced by newer version)
 */
export const RowStatusEnum = z.union([
	z.literal(0),
	z.literal(1),
	z.literal(2),
	z.literal(3),
	z.literal(4),
]);

export type RowStatus = z.infer<typeof RowStatusEnum>;

/**
 * Human-readable status names for UI display
 * Re-exported from canonical source
 */
export const RowStatusNames = RowStatusLabels;

/**
 * Status descriptions for tooltips/help text
 */
export const RowStatusDescriptions: Record<RowStatus, string> = {
	0: "Draft - Can be edited freely",
	1: "In Review - Read-only, pending approval",
	2: "Approved - Locked, ready for drilling",
	3: "Rejected - Needs corrections",
	4: "Superseded - Replaced by newer plan",
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Check if a status transition is valid according to business rules
 *
 * Valid transitions:
 * - Draft (0) → In Review (1), Rejected (3)
 * - In Review (1) → Draft (0), Approved (2), Rejected (3)
 * - Approved (2) → Superseded (4) only
 * - Rejected (3) → Draft (0) for rework
 * - Superseded (4) → No transitions (terminal state)
 */
export function isValidStatusTransition(
	from: RowStatus | undefined,
	to: RowStatus,
): boolean {
	// New records can start at any status except Superseded
	if (from === undefined) {
		return to !== 4;
	}

	const validTransitions: Record<RowStatus, RowStatus[]> = {
		0: [1, 3], // Draft → In Review or Rejected
		1: [0, 2, 3], // In Review → Draft, Approved, or Rejected
		2: [4], // Approved → Superseded only
		3: [0], // Rejected → Draft (rework)
		4: [], // Superseded → No transitions (terminal state)
	};

	return validTransitions[from]?.includes(to) ?? false;
}

/**
 * Get valid next statuses for a given current status
 */
export function getValidNextStatuses(currentStatus: RowStatus | undefined): RowStatus[] {
	if (currentStatus === undefined) {
		return [0, 1, 2, 3]; // New records can be Draft, In Review, Approved, or Rejected (not Superseded)
	}

	const validTransitions: Record<RowStatus, RowStatus[]> = {
		0: [1, 3], // Draft → In Review or Rejected
		1: [0, 2, 3], // In Review → Draft, Approved, or Rejected
		2: [4], // Approved → Superseded only
		3: [0], // Rejected → Draft (rework)
		4: [], // Superseded → No transitions (terminal state)
	};

	return validTransitions[currentStatus] ?? [];
}

/**
 * Validate date is within reasonable mining era (after 1980)
 */
export const MiningEraDate = IsoDateSchema.refine(
	(date) => {
		const d = new Date(date);
		const minDate = new Date("1980-01-01");
		return d >= minDate;
	},
	{ message: "Date must be after 1980 (modern mining era)" },
);

/**
 * Validate date is not too far in future (within 2 years)
 * Allows for long-term drilling planning
 */
export const ReasonableFutureDate = IsoDateSchema.refine(
	(date) => {
		const d = new Date(date);
		const maxDate = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000); // +2 years
		return d <= maxDate;
	},
	{ message: "Date cannot be more than 2 years in the future" },
);

/**
 * Validate azimuth is within standard range
 * Optionally normalize 360° to 0°
 */
export function normalizeAzimuth(azimuth: number): number {
	// Normalize to 0-360 range
	const normalized = ((azimuth % 360) + 360) % 360;
	return normalized;
}

/**
 * Validate dip is appropriate for drilling
 * Most exploration drilling is downdip (-45° to -90°)
 */
export function isTypicalDrillingDip(dip: number): boolean {
	return dip >= -90 && dip <= -30; // Typical drilling range
}

/**
 * Check if planned coordinates are complete
 * All three (Easting, Northing, RL) should be present together
 */
export function hasCompleteCoordinates(plan: {
	PlannedEasting?: number
	PlannedNorthing?: number
	PlannedRL?: number
}): boolean {
	const hasEasting = plan.PlannedEasting !== undefined;
	const hasNorthing = plan.PlannedNorthing !== undefined;
	const hasRL = plan.PlannedRL !== undefined;

	// Either all present or all absent
	return (hasEasting && hasNorthing && hasRL) || (!hasEasting && !hasNorthing && !hasRL);
}

// ========================================
// ERROR MESSAGE CONSTANTS
// ========================================

/**
 * Centralized error messages for consistent user feedback
 */
export const ErrorMessages = {
	// Required fields
	DRILL_PLAN_ID_REQUIRED: "Drill Plan ID is required",
	DATA_SOURCE_REQUIRED: "Data source is required",

	// Geological measurements
	AZIMUTH_RANGE: "Azimuth must be between 0° and 360°",
	DIP_RANGE: "Dip must be between -90° and 90°",
	DIP_TYPICAL_WARNING: "Dip is outside typical drilling range (-90° to -30°). Verify this is intentional.",

	// Coordinates
	COORDINATES_INCOMPLETE: "If providing coordinates, all three (Easting, Northing, RL) must be specified",
	EASTING_RANGE: "Easting is outside reasonable range",
	NORTHING_RANGE: "Northing is outside reasonable range",
	RL_RANGE: "RL/Elevation is outside reasonable range",

	// Depth validations
	DEPTH_TOTAL_POSITIVE: "Planned total depth must be greater than 0",
	DEPTH_WATER_LESS_THAN_TOTAL: "Water table depth cannot exceed planned total depth",
	DEPTH_TOTAL_REQUIRED: "Planned total depth is required for approved drill plans",

	// Date validations
	DATE_START_BEFORE_COMPLETE: "Planned start date must be before planned complete date",
	DATE_MINING_ERA: "Date must be after 1980 (modern mining era)",
	DATE_REASONABLE_FUTURE: "Date cannot be more than 2 years in the future",

	// Priority validations
	PRIORITY_RANGE: "Priority must be between 1 (highest) and 10 (lowest)",
	DRILL_PRIORITY_REQUIRED: "Drill priority is required",
	ODS_PRIORITY_RANGE: "ODS Priority must be between 1 and 100",
	ODS_PRIORITY_REQUIRED: "ODS priority is required",

	// Status validations
	STATUS_INVALID_TRANSITION: "Invalid status transition",
	STATUS_APPROVED_REQUIRES_REVIEW: "Cannot approve without review",
	STATUS_TERMINAL_STATE: "Cannot transition from Superseded status",

	// Business validations
	APPROVAL_INCOMPLETE_DATA: "Cannot approve drill plan with incomplete data",
	APPROVAL_MISSING_DEPTH: "Cannot approve drill plan without planned total depth",
	APPROVAL_MISSING_DATES: "Cannot approve drill plan without planned start and complete dates",
	APPROVAL_MISSING_COORDINATES: "Cannot approve drill plan without planned coordinates",
	APPROVAL_MISSING_ORIENTATION: "Cannot approve drill plan without planned azimuth and dip",
	APPROVAL_INVALID_STATUS: "Drill plan must be in 'In Review' or 'Approved' status",

	// Review validations
	REVIEW_MISSING_DEPTH: "Planned total depth is required for review submission",
	REVIEW_MISSING_COORDINATES: "Planned coordinates are required for review submission",
	REVIEW_INVALID_STATUS: "Only Draft or Rejected drill plans can be submitted for review",

	// Foreign key validations
	FK_DRILL_PATTERN_REQUIRED: "Drill pattern is required",
	FK_DRILL_TYPE_REQUIRED: "Drill type is required",
	FK_GRID_REQUIRED: "Grid/coordinate system is required",
	FK_TARGET_REQUIRED: "Target is required",
	FK_PLANNED_BY_REQUIRED: "Planned by (person) is required",
};

// ========================================
// TYPE GUARDS
// ========================================

/**
 * Check if a value is a valid RowStatus
 */
export function isRowStatus(value: unknown): value is RowStatus {
	return typeof value === "number" && [0, 1, 2, 3, 4].includes(value);
}

/**
 * Check if a value is a valid ValidationStatus
 */
export function isValidationStatus(value: unknown): value is ValidationStatus {
	return typeof value === "number" && [0, 1, 2].includes(value);
}

/**
 * Check if a drill plan is in a terminal state (cannot be edited)
 */
export function isTerminalStatus(status: RowStatus | undefined): boolean {
	return status === 2 || status === 4; // Approved or Superseded
}

/**
 * Check if a drill plan can be edited
 */
export function isEditable(status: RowStatus | undefined): boolean {
	return status === undefined || status === 0 || status === 3; // New, Draft, or Rejected
}

// ========================================
// VALIDATION HELPERS
// ========================================

/**
 * Format validation errors for display
 */
export function formatValidationErrors(error: z.ZodError): string[] {
	return error.issues.map((err) => {
		const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
		return `${path}${err.message}`;
	});
}

/**
 * Get a summary of validation errors grouped by field
 */
export function groupValidationErrors(error: z.ZodError): Record<string, string[]> {
	const grouped: Record<string, string[]> = {};

	for (const err of error.issues) {
		const field = err.path.length > 0 ? err.path.join(".") : "_general";
		if (!grouped[field]) {
			grouped[field] = [];
		}
		grouped[field].push(err.message);
	}

	return grouped;
}

/**
 * Calculate expected hole orientation quality
 * Returns warning if orientation seems unusual for exploration drilling
 */
export function validateDrillingOrientation(azimuth?: number, dip?: number): {
	isTypical: boolean
	warnings: string[]
} {
	const warnings: string[] = [];

	if (dip !== undefined) {
		// Check if dip is in typical drilling range
		if (!isTypicalDrillingDip(dip)) {
			if (dip > 0) {
				warnings.push("Positive dip (upward drilling) is unusual. Verify this is intentional.");
			}
			else if (dip > -30) {
				warnings.push("Shallow dip (<30°) may have poor target intersection. Consider steeper angle.");
			}
		}
	}

	// Azimuth warnings are less common but can check for special cases
	if (azimuth !== undefined) {
		// Most projects have preferred drilling directions based on geology
		// This would be project-specific, but we can note if azimuth seems odd
		if (azimuth === 0 || azimuth === 360) {
			warnings.push("Drilling due North - verify this aligns with geological targets.");
		}
	}

	return {
		isTypical: warnings.length === 0,
		warnings,
	};
}

console.log("[DRILL-PLAN-SCHEMA] 🏗️ DrillPlan schema helpers loaded");
