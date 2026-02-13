/**
 * Collar Schema Helpers
 * Reusable validation schemas and utilities for Collar entity validation
 *
 * This module provides:
 * - Common validation primitives (GUIDs, dates, depths)
 * - Enum schemas for validation and row status
 * - Utility functions for business logic
 * - Error message constants
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
 * Hole ID with mining industry naming convention
 * Format: Uppercase alphanumeric with optional hyphens
 * Examples: FEB23-001, MAL-RC-123, OTJ-DD-045
 */
export const HoleIdSchema = z
	.string()
	.min(2, "Hole ID must be at least 2 characters")
	.max(20, "Hole ID must not exceed 20 characters")
	.regex(
		/^[A-Z0-9]{2,20}(-[A-Z0-9]{2,10})*$/,
		"Hole ID must be uppercase alphanumeric with optional hyphens (e.g., FEB23-001)",
	);

/**
 * ISO 8601 datetime validation
 */
export const IsoDateSchema = z
	.string()
	.datetime("Must be a valid ISO 8601 datetime");

/**
 * Depth in meters - reasonable exploration drilling range
 * Range: 0-3500m (typical exploration: 50-2000m)
 */
export const DepthSchema = z
	.number()
	.min(0, "Depth cannot be negative")
	.max(3500, "Depth exceeds maximum of 3500m");

/**
 * Drilling priority level (1=Highest, 10=Lowest)
 */
export const PrioritySchema = z
	.number()
	.int("Priority must be an integer")
	.min(1, "Priority must be at least 1")
	.max(10, "Priority must not exceed 10");

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
	2: "Approved - Locked, approved for use",
	3: "Rejected - Needs corrections",
	4: "Superseded - Replaced by newer version",
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
 * Validate date is not too far in future (within 7 days)
 * Allows for scheduling but prevents unrealistic future dates
 */
export const ReasonableFutureDate = IsoDateSchema.refine(
	(date) => {
		const d = new Date(date);
		const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 days
		return d <= maxDate;
	},
	{ message: "Date cannot be more than 7 days in the future" },
);

// ========================================
// ERROR MESSAGE CONSTANTS
// ========================================

/**
 * Centralized error messages for consistent user feedback
 */
export const ErrorMessages = {
	// Required fields
	HOLE_ID_REQUIRED: "Hole ID is required",
	COLLAR_ID_REQUIRED: "Collar ID is required",
	TOTAL_DEPTH_REQUIRED: "Total depth is required for approved collars",
	COORDINATES_REQUIRED: "At least one coordinate is required",
	COORDINATES_EXACTLY_ONE: "Exactly one coordinate is required",

	// Depth validations
	DEPTH_START_LESS_THAN_TOTAL: "Start depth must be less than total depth",
	DEPTH_CASING_LESS_THAN_TOTAL: "Casing depth cannot exceed total depth",
	DEPTH_WATER_LESS_THAN_TOTAL: "Water table depth cannot exceed total depth",
	DEPTH_PRECOLLAR_LESS_THAN_TOTAL: "Pre-collar depth must be less than total depth",
	DEPTH_TOTAL_POSITIVE: "Total depth must be greater than 0",

	// Date validations
	DATE_START_BEFORE_FINISH: "Start date must be before finish date",
	DATE_CREATED_BEFORE_MODIFIED: "Created date must be before or equal to modified date",
	DATE_MINING_ERA: "Date must be after 1980 (modern mining era)",
	DATE_REASONABLE_FUTURE: "Date cannot be more than 7 days in the future",

	// Status validations
	STATUS_INVALID_TRANSITION: "Invalid status transition",
	STATUS_APPROVED_REQUIRES_REVIEW: "Cannot approve without review",
	STATUS_TERMINAL_STATE: "Cannot transition from Superseded status",

	// Business validations
	APPROVAL_INCOMPLETE_DATA: "Cannot approve collar with incomplete data",
	APPROVAL_MISSING_DEPTH: "Cannot approve collar without total depth",
	APPROVAL_MISSING_DATES: "Cannot approve collar without start and finish dates",
	APPROVAL_INVALID_STATUS: "Collar must be in 'In Review' or 'Approved' status",

	// Review validations
	REVIEW_MISSING_DEPTH: "Total depth is required for review submission",
	REVIEW_INVALID_STATUS: "Only Draft or Rejected collars can be submitted for review",
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
 * Check if a collar is in a terminal state (cannot be edited)
 */
export function isTerminalStatus(status: RowStatus | undefined): boolean {
	return status === 2 || status === 4; // Approved or Superseded
}

/**
 * Check if a collar can be edited
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

console.log("[COLLAR-SCHEMA] 🏗️ Collar schema helpers loaded");
