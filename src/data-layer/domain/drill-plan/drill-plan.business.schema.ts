/**
 * DrillPlan Business Schema
 * Geological industry standards and business rule validation
 *
 * This schema enforces:
 * - All database validations (extends DrillPlanDbSchema)
 * - Cross-field depth relationships
 * - Date logical ordering
 * - Coordinate completeness requirements
 * - Orientation completeness requirements
 * - Status transition rules
 * - Completeness for business operations
 * - Geological industry standards
 *
 * Use this schema for:
 * - Approval workflows
 * - Review submissions
 * - Quality assurance checks
 * - Report generation
 * - Business validation (not all saves)
 */

import type { z } from "zod";
import type { RowStatus } from "./drill-plan.schema.helpers";
import { DrillPlanDbSchema } from "./drill-plan.db.schema";
import {
	ErrorMessages,
	hasCompleteCoordinates,
	isValidStatusTransition,

	RowStatusNames,
	validateDrillingOrientation,
} from "./drill-plan.schema.helpers";

// ========================================
// BUSINESS VALIDATION SCHEMA
// ========================================

/**
 * Business Schema: Geological Industry Standards and Business Rules
 *
 * Extends the database schema with cross-field validations and business logic.
 * This schema ensures data meets geological industry standards and business requirements.
 */
export const DrillPlanBusinessSchema = DrillPlanDbSchema
	// ========================================
	// COORDINATE COMPLETENESS VALIDATION
	// ========================================
	.refine(
		data => hasCompleteCoordinates(data),
		{
			message: ErrorMessages.COORDINATES_INCOMPLETE,
			path: ["PlannedEasting"],
		},
	)

	// ========================================
	// ORIENTATION COMPLETENESS VALIDATION
	// ========================================
	.refine(
		(data) => {
			// If one is present, both should be present
			const hasAzimuth = data.PlannedAzimuth !== undefined;
			const hasDip = data.PlannedDip !== undefined;
			return hasAzimuth === hasDip;
		},
		{
			message: "If providing orientation, both azimuth and dip must be specified",
			path: ["PlannedAzimuth"],
		},
	)

	// ========================================
	// DEPTH RELATIONSHIP VALIDATIONS
	// ========================================
	.refine(
		(data) => {
			// Water table depth cannot exceed planned total depth
			if (data.WaterTableDepth !== undefined && data.PlannedTotalDepth !== undefined) {
				return data.WaterTableDepth <= data.PlannedTotalDepth;
			}
			return true;
		},
		{
			message: ErrorMessages.DEPTH_WATER_LESS_THAN_TOTAL,
			path: ["WaterTableDepth"],
		},
	)
	.refine(
		(data) => {
			// Planned total depth should be positive if specified
			if (data.PlannedTotalDepth !== undefined) {
				return data.PlannedTotalDepth > 0;
			}
			return true;
		},
		{
			message: ErrorMessages.DEPTH_TOTAL_POSITIVE,
			path: ["PlannedTotalDepth"],
		},
	)

	// ========================================
	// DATE RELATIONSHIP VALIDATIONS
	// ========================================
	.refine(
		(data) => {
			// Planned start date must be before planned complete date
			if (data.PlannedStartDt && data.PlannedCompleteDt) {
				return new Date(data.PlannedStartDt) < new Date(data.PlannedCompleteDt);
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_START_BEFORE_COMPLETE,
			path: ["PlannedCompleteDt"],
		},
	)
	.refine(
		(data) => {
			// Planned start date should be within reasonable future (not more than 2 years)
			if (data.PlannedStartDt) {
				const startDate = new Date(data.PlannedStartDt);
				const maxDate = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000); // +2 years
				return startDate <= maxDate;
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_REASONABLE_FUTURE,
			path: ["PlannedStartDt"],
		},
	)
	.refine(
		(data) => {
			// Planned start date should be within reasonable mining era (after 1980)
			if (data.PlannedStartDt) {
				const startDate = new Date(data.PlannedStartDt);
				return startDate >= new Date("1980-01-01");
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_MINING_ERA,
			path: ["PlannedStartDt"],
		},
	)

	// ========================================
	// GEOLOGICAL ORIENTATION VALIDATION
	// ========================================
	.refine(
		(data) => {
			// Check if dip is in typical exploration drilling range
			if (data.PlannedDip !== undefined) {
				// Allow all valid dips, but flag unusual ones via warnings
				// This is informational - actual constraint is in helpers
				return data.PlannedDip >= -90 && data.PlannedDip <= 90;
			}
			return true;
		},
		{
			message: ErrorMessages.DIP_RANGE,
			path: ["PlannedDip"],
		},
	)
	.refine(
		(data) => {
			// Azimuth should be normalized to 0-360
			if (data.PlannedAzimuth !== undefined) {
				return data.PlannedAzimuth >= 0 && data.PlannedAzimuth <= 360;
			}
			return true;
		},
		{
			message: ErrorMessages.AZIMUTH_RANGE,
			path: ["PlannedAzimuth"],
		},
	);

// ========================================
// APPROVAL SCHEMA
// ========================================

/**
 * Approval Schema: Strict validation for drill plan approval
 *
 * Ensures drill plan has all required data before being approved.
 * Must pass all business validations plus additional completeness checks.
 */
export const DrillPlanApprovalSchema = DrillPlanBusinessSchema
	.refine(
		data => data.PlannedTotalDepth !== undefined && data.PlannedTotalDepth > 0,
		{
			message: ErrorMessages.APPROVAL_MISSING_DEPTH,
			path: ["PlannedTotalDepth"],
		},
	)
	.refine(
		data => data.PlannedStartDt !== undefined,
		{
			message: ErrorMessages.APPROVAL_MISSING_DATES,
			path: ["PlannedStartDt"],
		},
	)
	.refine(
		data => data.PlannedCompleteDt !== undefined,
		{
			message: ErrorMessages.APPROVAL_MISSING_DATES,
			path: ["PlannedCompleteDt"],
		},
	)
	.refine(
		(data) => {
			// Coordinates must be complete
			return data.PlannedEasting !== undefined
			  && data.PlannedNorthing !== undefined
			  && data.PlannedRL !== undefined;
		},
		{
			message: ErrorMessages.APPROVAL_MISSING_COORDINATES,
			path: ["PlannedEasting"],
		},
	)
	.refine(
		(data) => {
			// Orientation must be complete
			return data.PlannedAzimuth !== undefined && data.PlannedDip !== undefined;
		},
		{
			message: ErrorMessages.APPROVAL_MISSING_ORIENTATION,
			path: ["PlannedAzimuth"],
		},
	)
	.refine(
		data => data.RowStatus === 1 || data.RowStatus === 2,
		{
			message: ErrorMessages.APPROVAL_INVALID_STATUS,
			path: ["RowStatus"],
		},
	);

// ========================================
// REVIEW SUBMISSION SCHEMA
// ========================================

/**
 * Review Submission Schema: Validation before submitting for review
 *
 * Ensures drill plan has minimum required data before review submission.
 * Less strict than approval, but still enforces key requirements.
 */
export const DrillPlanReviewSchema = DrillPlanBusinessSchema
	.refine(
		data => data.PlannedTotalDepth !== undefined,
		{
			message: ErrorMessages.REVIEW_MISSING_DEPTH,
			path: ["PlannedTotalDepth"],
		},
	)
	.refine(
		(data) => {
			// Coordinates should be present for review
			return data.PlannedEasting !== undefined
			  && data.PlannedNorthing !== undefined
			  && data.PlannedRL !== undefined;
		},
		{
			message: ErrorMessages.REVIEW_MISSING_COORDINATES,
			path: ["PlannedEasting"],
		},
	)
	.refine(
		data => data.RowStatus === 0 || data.RowStatus === 3,
		{
			message: ErrorMessages.REVIEW_INVALID_STATUS,
			path: ["RowStatus"],
		},
	);

// ========================================
// TYPE EXPORTS
// ========================================

/**
 * TypeScript type inferred from the business schema
 */
export type DrillPlanBusinessInput = z.infer<typeof DrillPlanBusinessSchema>;

/**
 * TypeScript type for drill plan approval
 */
export type DrillPlanApprovalInput = z.infer<typeof DrillPlanApprovalSchema>;

/**
 * TypeScript type for review submission
 */
export type DrillPlanReviewInput = z.infer<typeof DrillPlanReviewSchema>;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validate drill plan against business rules
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data
 * @throws ZodError if validation fails
 */
export function validateDrillPlanBusiness(data: unknown): DrillPlanBusinessInput {
	return DrillPlanBusinessSchema.parse(data);
}

/**
 * Safe business validation that returns success/error result
 * Does not throw
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanBusiness(data: unknown) {
	return DrillPlanBusinessSchema.safeParse(data);
}

/**
 * Validate drill plan for approval
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data for approval
 * @throws ZodError if validation fails
 */
export function validateDrillPlanForApproval(data: unknown): DrillPlanApprovalInput {
	return DrillPlanApprovalSchema.parse(data);
}

/**
 * Safe validation for drill plan approval
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanForApproval(data: unknown) {
	return DrillPlanApprovalSchema.safeParse(data);
}

/**
 * Validate drill plan for review submission
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data for review
 * @throws ZodError if validation fails
 */
export function validateDrillPlanForReview(data: unknown): DrillPlanReviewInput {
	return DrillPlanReviewSchema.parse(data);
}

/**
 * Safe validation for review submission
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanForReview(data: unknown) {
	return DrillPlanReviewSchema.safeParse(data);
}

/**
 * Check if drill plan can be approved (returns detailed errors)
 * Non-throwing version that provides actionable feedback
 *
 * @param data - DrillPlan data to check
 * @returns Object with canApprove flag and array of error messages
 */
export function canApproveDrillPlan(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	const result = DrillPlanApprovalSchema.safeParse(data);

	if (result.success) {
		return { canApprove: true, errors: [] };
	}

	return {
		canApprove: false,
		errors: result.error.issues.map((err) => {
			const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
			return `${path}${err.message}`;
		}),
	};
}

/**
 * Check if drill plan can be submitted for review (returns detailed errors)
 * Non-throwing version that provides actionable feedback
 *
 * @param data - DrillPlan data to check
 * @returns Object with canSubmit flag and array of error messages
 */
export function canSubmitForReview(data: unknown): {
	canSubmit: boolean
	errors: string[]
} {
	const result = DrillPlanReviewSchema.safeParse(data);

	if (result.success) {
		return { canSubmit: true, errors: [] };
	}

	return {
		canSubmit: false,
		errors: result.error.issues.map((err) => {
			const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
			return `${path}${err.message}`;
		}),
	};
}

/**
 * Validate a status transition for a drill plan
 *
 * @param drillPlan - DrillPlan with current status
 * @param newStatus - New status to transition to
 * @returns Object with valid flag and optional error message
 */
export function validateStatusTransition(
	drillPlan: { RowStatus?: number },
	newStatus: number,
): { valid: boolean, error?: string } {
	const currentStatus = drillPlan.RowStatus as RowStatus | undefined;
	const targetStatus = newStatus as RowStatus;

	if (!isValidStatusTransition(currentStatus, targetStatus)) {
		const currentName = currentStatus !== undefined ? RowStatusNames[currentStatus] : "New";
		const newName = RowStatusNames[targetStatus] ?? "Unknown";

		return {
			valid: false,
			error: `Invalid status transition from '${currentName}' to '${newName}'`,
		};
	}

	return { valid: true };
}

/**
 * Get comprehensive validation report for a drill plan
 * Includes database validation, business validation, and approval checks
 *
 * @param data - DrillPlan data to validate
 * @returns Validation report with multiple validation levels
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
	// Import database schema validation
	const { safeValidateDrillPlanDb } = require("./drill-plan.db.schema");

	const dbResult = safeValidateDrillPlanDb(data);
	const businessResult = safeValidateDrillPlanBusiness(data);
	const approvalCheck = canApproveDrillPlan(data);
	const reviewCheck = canSubmitForReview(data);

	// Collect geological warnings
	const warnings: string[] = [];
	if (data && typeof data === "object") {
		const plan = data as any;
		const orientationCheck = validateDrillingOrientation(plan.PlannedAzimuth, plan.PlannedDip);
		warnings.push(...orientationCheck.warnings);
	}

	return {
		databaseValid: dbResult.success,
		databaseErrors: dbResult.success ? [] : dbResult.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
		businessValid: businessResult.success,
		businessErrors: businessResult.success ? [] : businessResult.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
		approvalReady: approvalCheck.canApprove,
		approvalErrors: approvalCheck.errors,
		reviewReady: reviewCheck.canSubmit,
		reviewErrors: reviewCheck.errors,
		warnings,
	};
}

/**
 * Validate depth relationships specifically
 * Useful for providing focused feedback on depth issues
 *
 * @param depths - Object with depth values
 * @returns Array of depth validation errors (empty if valid)
 */
export function validateDepthRelationships(depths: {
	PlannedTotalDepth?: number
	WaterTableDepth?: number
}): string[] {
	const errors: string[] = [];

	if (depths.PlannedTotalDepth !== undefined) {
		if (depths.PlannedTotalDepth <= 0) {
			errors.push(ErrorMessages.DEPTH_TOTAL_POSITIVE);
		}
	}

	if (depths.WaterTableDepth !== undefined && depths.PlannedTotalDepth !== undefined) {
		if (depths.WaterTableDepth > depths.PlannedTotalDepth) {
			errors.push(ErrorMessages.DEPTH_WATER_LESS_THAN_TOTAL);
		}
	}

	return errors;
}

/**
 * Validate date relationships specifically
 * Useful for providing focused feedback on date issues
 *
 * @param dates - Object with date values
 * @returns Array of date validation errors (empty if valid)
 */
export function validateDateRelationships(dates: {
	PlannedStartDt?: string
	PlannedCompleteDt?: string
}): string[] {
	const errors: string[] = [];

	if (dates.PlannedStartDt && dates.PlannedCompleteDt) {
		if (new Date(dates.PlannedStartDt) >= new Date(dates.PlannedCompleteDt)) {
			errors.push(ErrorMessages.DATE_START_BEFORE_COMPLETE);
		}
	}

	if (dates.PlannedStartDt) {
		const startDate = new Date(dates.PlannedStartDt);
		if (startDate < new Date("1980-01-01")) {
			errors.push(ErrorMessages.DATE_MINING_ERA);
		}

		const maxDate = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000);
		if (startDate > maxDate) {
			errors.push(ErrorMessages.DATE_REASONABLE_FUTURE);
		}
	}

	return errors;
}

/**
 * Validate coordinate completeness
 * All three coordinates (Easting, Northing, RL) should be present together
 *
 * @param coordinates - Object with coordinate values
 * @returns Array of coordinate validation errors (empty if valid)
 */
export function validateCoordinateCompleteness(coordinates: {
	PlannedEasting?: number
	PlannedNorthing?: number
	PlannedRL?: number
}): string[] {
	const errors: string[] = [];

	if (!hasCompleteCoordinates(coordinates)) {
		errors.push(ErrorMessages.COORDINATES_INCOMPLETE);
	}

	return errors;
}

/**
 * Validate orientation completeness
 * Both azimuth and dip should be present together
 *
 * @param orientation - Object with orientation values
 * @returns Array of orientation validation errors (empty if valid)
 */
export function validateOrientationCompleteness(orientation: {
	PlannedAzimuth?: number
	PlannedDip?: number
}): string[] {
	const errors: string[] = [];

	const hasAzimuth = orientation.PlannedAzimuth !== undefined;
	const hasDip = orientation.PlannedDip !== undefined;

	if (hasAzimuth !== hasDip) {
		errors.push("If providing orientation, both azimuth and dip must be specified");
	}

	return errors;
}

/**
 * Get geological warnings for drill plan orientation
 * Non-critical issues that should be reviewed but don't block operations
 *
 * @param drillPlan - DrillPlan data
 * @returns Array of warning messages
 */
export function getGeologicalWarnings(drillPlan: {
	PlannedAzimuth?: number
	PlannedDip?: number
}): string[] {
	const orientationCheck = validateDrillingOrientation(
		drillPlan.PlannedAzimuth,
		drillPlan.PlannedDip,
	);

	return orientationCheck.warnings;
}

console.log("[DRILL-PLAN-SCHEMA] 📊 DrillPlan business schema loaded");
