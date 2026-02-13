/**
 * Collar Business Schema
 * Geological industry standards and business rule validation
 *
 * This schema enforces:
 * - All database validations (extends CollarDbSchema)
 * - Cross-field depth relationships
 * - Date logical ordering
 * - Coordinate requirements (exactly 1)
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
import type { RowStatusEnum } from "../schema-helpers";
import type { RowStatus } from "./collar.schema.helpers";
import { CollarDbSchema } from "./collar.db.schema";
// import { CollarDbSchema } from './collar.db.schema';
import {
	ErrorMessages,
	isValidStatusTransition,

	RowStatusNames,
} from "./collar.schema.helpers";

// ========================================
// BUSINESS VALIDATION SCHEMA
// ========================================

/**
 * Business Schema: Geological Industry Standards and Business Rules
 *
 * Extends the database schema with cross-field validations and business logic.
 * This schema ensures data meets geological industry standards and business requirements.
 */
export const CollarBusinessSchema = CollarDbSchema
	// ========================================
	// DEPTH RELATIONSHIP VALIDATIONS
	// ========================================
	.refine(
		(data: z.infer<typeof CollarDbSchema>) => {
			// If both StartDepth and TotalDepth exist, Start must be less than Total
			if (data.StartDepth !== undefined && data.TotalDepth !== undefined) {
				return data.StartDepth < data.TotalDepth;
			}
			return true; // Skip if either is missing
		},
		{
			message: ErrorMessages.DEPTH_START_LESS_THAN_TOTAL,
			path: ["StartDepth"],
		},
	)
	.refine(
		(data: z.infer<typeof CollarDbSchema>) => {
			// Casing depth cannot exceed total depth
			if (data.CasingDepth !== undefined && data.TotalDepth !== undefined) {
				return data.CasingDepth <= data.TotalDepth;
			}
			return true;
		},
		{
			message: ErrorMessages.DEPTH_CASING_LESS_THAN_TOTAL,
			path: ["CasingDepth"],
		},
	)
	.refine(
		(data: any) => {
			// Water table depth cannot exceed total depth
			if (data.WaterTableDepth !== undefined && data.TotalDepth !== undefined) {
				return data.WaterTableDepth <= data.TotalDepth;
			}
			return true;
		},
		{
			message: ErrorMessages.DEPTH_WATER_LESS_THAN_TOTAL,
			path: ["WaterTableDepth"],
		},
	)
	.refine(
		(data: any) => {
			// Pre-collar depth must be less than total depth
			if (data.PreCollarDepth !== undefined && data.TotalDepth !== undefined) {
				return data.PreCollarDepth < data.TotalDepth;
			}
			return true;
		},
		{
			message: ErrorMessages.DEPTH_PRECOLLAR_LESS_THAN_TOTAL,
			path: ["PreCollarDepth"],
		},
	)

	// ========================================
	// DATE RELATIONSHIP VALIDATIONS
	// ========================================
	.refine(
		(data: any) => {
			// Start date must be before finish date
			if (data.StartedOnDt && data.FinishedOnDt) {
				return new Date(data.StartedOnDt) < new Date(data.FinishedOnDt);
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_START_BEFORE_FINISH,
			path: ["FinishedOnDt"],
		},
	)
	.refine(
		(data: any) => {
			// Created date should be before or equal to modified date
			if (data.CreatedOnDt && data.ModifiedOnDt) {
				return new Date(data.CreatedOnDt) <= new Date(data.ModifiedOnDt);
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_CREATED_BEFORE_MODIFIED,
			path: ["ModifiedOnDt"],
		},
	)
	.refine(
		(data: any) => {
			// Start date should be within reasonable mining era (after 1980)
			if (data.StartedOnDt) {
				const d = new Date(data.StartedOnDt);
				return d >= new Date("1980-01-01");
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_MINING_ERA,
			path: ["StartedOnDt"],
		},
	)
	.refine(
		(data: any) => {
			// Finish date should not be too far in future (allow scheduling)
			if (data.FinishedOnDt) {
				const d = new Date(data.FinishedOnDt);
				const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
				return d <= maxDate;
			}
			return true;
		},
		{
			message: ErrorMessages.DATE_REASONABLE_FUTURE,
			path: ["FinishedOnDt"],
		},
	)

	// ========================================
	// COORDINATE VALIDATION
	// ========================================
	.refine(
		(data: any) => {
			// Collar must have exactly 1 coordinate
			return data.collarCoordinates && data.collarCoordinates.length === 1;
		},
		{
			message: ErrorMessages.COORDINATES_EXACTLY_ONE,
			path: ["collarCoordinates"],
		},
	);

// ========================================
// APPROVAL SCHEMA
// ========================================

/**
 * Approval Schema: Strict validation for collar approval
 *
 * Ensures collar has all required data before being approved.
 * Must pass all business validations plus additional completeness checks.
 */
export const CollarApprovalSchema = CollarBusinessSchema
	.refine(
		(data: any) => data.TotalDepth !== undefined && data.TotalDepth > 0,
		{
			message: ErrorMessages.APPROVAL_MISSING_DEPTH,
			path: ["TotalDepth"],
		},
	)
	.refine(
		(data: any) => data.StartedOnDt !== undefined,
		{
			message: ErrorMessages.APPROVAL_MISSING_DATES,
			path: ["StartedOnDt"],
		},
	)
	.refine(
		(data: any) => data.FinishedOnDt !== undefined,
		{
			message: ErrorMessages.APPROVAL_MISSING_DATES,
			path: ["FinishedOnDt"],
		},
	)
	.refine(
		(data: any) => data.RowStatus === 1 || data.RowStatus === 2,
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
 * Ensures collar has minimum required data before review submission.
 * Less strict than approval, but still enforces key requirements.
 */
export const CollarReviewSchema = CollarBusinessSchema
	.refine(
		(data: any) => data.TotalDepth !== undefined,
		{
			message: ErrorMessages.REVIEW_MISSING_DEPTH,
			path: ["TotalDepth"],
		},
	)
	.refine(
		(data: any) => data.RowStatus === 0 || data.RowStatus === 3,
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
export type CollarBusinessInput = z.infer<typeof CollarBusinessSchema>;

/**
 * TypeScript type for collar approval
 */
export type CollarApprovalInput = z.infer<typeof CollarApprovalSchema>;

/**
 * TypeScript type for review submission
 */
export type CollarReviewInput = z.infer<typeof CollarReviewSchema>;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validate collar against business rules
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data
 * @throws ZodError if validation fails
 */
export function validateCollarBusiness(data: unknown): CollarBusinessInput {
	return CollarBusinessSchema.parse(data);
}

/**
 * Safe business validation that returns success/error result
 * Does not throw
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarBusiness(data: unknown) {
	return CollarBusinessSchema.safeParse(data);
}

/**
 * Validate collar for approval
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data for approval
 * @throws ZodError if validation fails
 */
export function validateCollarForApproval(data: unknown): CollarApprovalInput {
	return CollarApprovalSchema.parse(data);
}

/**
 * Safe validation for collar approval
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarForApproval(data: unknown) {
	return CollarApprovalSchema.safeParse(data);
}

/**
 * Validate collar for review submission
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data for review
 * @throws ZodError if validation fails
 */
export function validateCollarForReview(data: unknown): CollarReviewInput {
	return CollarReviewSchema.parse(data);
}

/**
 * Safe validation for review submission
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarForReview(data: unknown) {
	return CollarReviewSchema.safeParse(data);
}

/**
 * Check if collar can be approved (returns detailed errors)
 * Non-throwing version that provides actionable feedback
 *
 * @param data - Collar data to check
 * @returns Object with canApprove flag and array of error messages
 */
export function canApproveCollar(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	const result = CollarApprovalSchema.safeParse(data);

	if (result.success) {
		return { canApprove: true, errors: [] };
	}

	return {
		canApprove: false,
		errors: result.error.issues.map((err: { path: any[], message: any }) => {
			const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
			return `${path}${err.message}`;
		}),
	};
}

/**
 * Check if collar can be submitted for review (returns detailed errors)
 * Non-throwing version that provides actionable feedback
 *
 * @param data - Collar data to check
 * @returns Object with canSubmit flag and array of error messages
 */
export function canSubmitForReview(data: unknown): {
	canSubmit: boolean
	errors: string[]
} {
	const result = CollarReviewSchema.safeParse(data);

	if (result.success) {
		return { canSubmit: true, errors: [] };
	}

	return {
		canSubmit: false,
		errors: result.error.issues.map((err: { path: any[], message: any }) => {
			const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
			return `${path}${err.message}`;
		}),
	};
}

/**
 * Validate a status transition for a collar
 *
 * @param collar - Collar with current status
 * @param newStatus - New status to transition to
 * @returns Object with valid flag and optional error message
 */
export function validateStatusTransition(
	collar: { RowStatus?: any },
	newStatus: RowStatusEnum,
): { valid: boolean, error?: string } {
	const currentStatus = collar.RowStatus as RowStatus | undefined;
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
 * Get comprehensive validation report for a collar
 * Includes database validation, business validation, and approval checks
 *
 * @param data - Collar data to validate
 * @returns Validation report with multiple validation levels
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
} {
	// Import database schema validation
	const { safeValidateCollarDb } = require("./collar.db.schema");

	const dbResult = safeValidateCollarDb(data);
	const businessResult = safeValidateCollarBusiness(data);
	const approvalCheck = canApproveCollar(data);
	const reviewCheck = canSubmitForReview(data);

	return {
		databaseValid: dbResult.success,
		databaseErrors: dbResult.success ? [] : dbResult.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
		businessValid: businessResult.success,
		businessErrors: businessResult.success ? [] : businessResult.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
		approvalReady: approvalCheck.canApprove,
		approvalErrors: approvalCheck.errors,
		reviewReady: reviewCheck.canSubmit,
		reviewErrors: reviewCheck.errors,
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
	StartDepth?: number
	TotalDepth?: number
	CasingDepth?: number
	WaterTableDepth?: number
	PreCollarDepth?: number
}): string[] {
	const errors: string[] = [];

	if (depths.StartDepth !== undefined && depths.TotalDepth !== undefined) {
		if (depths.StartDepth >= depths.TotalDepth) {
			errors.push(ErrorMessages.DEPTH_START_LESS_THAN_TOTAL);
		}
	}

	if (depths.CasingDepth !== undefined && depths.TotalDepth !== undefined) {
		if (depths.CasingDepth > depths.TotalDepth) {
			errors.push(ErrorMessages.DEPTH_CASING_LESS_THAN_TOTAL);
		}
	}

	if (depths.WaterTableDepth !== undefined && depths.TotalDepth !== undefined) {
		if (depths.WaterTableDepth > depths.TotalDepth) {
			errors.push(ErrorMessages.DEPTH_WATER_LESS_THAN_TOTAL);
		}
	}

	if (depths.PreCollarDepth !== undefined && depths.TotalDepth !== undefined) {
		if (depths.PreCollarDepth >= depths.TotalDepth) {
			errors.push(ErrorMessages.DEPTH_PRECOLLAR_LESS_THAN_TOTAL);
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
	StartedOnDt?: string
	FinishedOnDt?: string
	CreatedOnDt?: string
	ModifiedOnDt?: string
}): string[] {
	const errors: string[] = [];

	if (dates.StartedOnDt && dates.FinishedOnDt) {
		if (new Date(dates.StartedOnDt) >= new Date(dates.FinishedOnDt)) {
			errors.push(ErrorMessages.DATE_START_BEFORE_FINISH);
		}
	}

	if (dates.CreatedOnDt && dates.ModifiedOnDt) {
		if (new Date(dates.CreatedOnDt) > new Date(dates.ModifiedOnDt)) {
			errors.push(ErrorMessages.DATE_CREATED_BEFORE_MODIFIED);
		}
	}

	if (dates.StartedOnDt) {
		const startDate = new Date(dates.StartedOnDt);
		if (startDate < new Date("1980-01-01")) {
			errors.push(ErrorMessages.DATE_MINING_ERA);
		}
	}

	if (dates.FinishedOnDt) {
		const finishDate = new Date(dates.FinishedOnDt);
		const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		if (finishDate > maxDate) {
			errors.push(ErrorMessages.DATE_REASONABLE_FUTURE);
		}
	}

	return errors;
}

console.log("[COLLAR-SCHEMA] 📊 Collar business schema loaded");
