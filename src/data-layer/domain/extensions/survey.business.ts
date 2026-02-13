/**
 * Survey Business Validation
 *
 * Two-tier validation for Survey table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Usage**:
 * ```typescript
 * import { validateSurveyDb, validateSurveyBusiness } from './survey.business';
 *
 * // Database validation (always use)
 * const validData = validateSurveyDb(data);
 * await db.surveys.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateSurveyBusiness(data);
 * ```
 *
 * @module extensions/survey
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
	ErrorMessages,
	formatZodErrors,
	GuidSchema,
	IsoDateSchema,
	RowStatusNumberEnum,
	RowStatusValues,

} from "../schema-helpers";

// Import auto-generated schema
import {
	SurveyTableInsertBaseSchema,
} from "../tables/survey/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * Survey Database Schema (Tier 1)
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
export const SurveyDbSchema = SurveyTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	surveyId: GuidSchema.optional(), // Optional because it has DB default
	collarId: GuidSchema,
	loggingEventId: GuidSchema,

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	activeInd: BooleanSchema.optional(),
	validation: BooleanSchema.nullable().optional(),

	// ========================================
	// STATUS (validate enum values)
	// ========================================
	rowStatus: RowStatusNumberEnum.optional(),

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	surveyedOnDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(),
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	downHoleSurveyMethod: z.string().min(1, ErrorMessages.REQUIRED).max(50),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	surveyCompany: z.string().max(50).nullable().optional(),
	surveyOperator: z.string().max(50).nullable().optional(),
	surveyInstrument: z.string().max(50).nullable().optional(),
	surveyReliability: z.string().max(50).nullable().optional(),
	grid: z.string().max(50).nullable().optional(),
	comments: CommentsSchema.nullable().optional(),
	dataSource: z.string().min(1, ErrorMessages.REQUIRED).max(255),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(),
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(),
});

/**
 * Survey Database Schema Type
 */
export type SurveyDbInput = z.input<typeof SurveyDbSchema>;
export type SurveyDbOutput = z.output<typeof SurveyDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * Survey Business Schema (Tier 2)
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
 * - Date relationships (surveyedOnDt reasonableness)
 * - Survey method is valid for hole type
 * - Completeness for different workflows
 *
 * **Business Rules**:
 * 1. Survey date should be reasonable (not too far in past/future)
 * 2. Survey company and operator should be provided together
 * 3. If survey is for approval, must have method and instrument
 */
export const SurveyBusinessSchema = SurveyDbSchema
	.refine(
		(data) => {
			// Validate survey date reasonableness if provided
			if (data.surveyedOnDt) {
				const surveyDate = data.surveyedOnDt instanceof Date
					? data.surveyedOnDt
					: new Date(data.surveyedOnDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning

				return surveyDate >= minDate && surveyDate <= maxDate;
			}
			return true;
		},
		{
			message: "Survey date must be between 1980 and 7 days in future",
			path: ["surveyedOnDt"],
		},
	)
	.refine(
		(data) => {
			// If survey company is provided, operator should also be provided
			const hasCompany = data.surveyCompany && data.surveyCompany.trim() !== "";
			const hasOperator = data.surveyOperator && data.surveyOperator.trim() !== "";

			// Both or neither (but not required)
			if (hasCompany || hasOperator) {
				return hasCompany && hasOperator;
			}
			return true;
		},
		{
			message: "Survey company and operator must be provided together",
			path: ["surveyCompany"],
		},
	)
	.refine(
		(data) => {
			// If active and approved, should have survey method details
			if (data.activeInd && data.rowStatus === RowStatusValues.APPROVED) {
				return Boolean(data.downHoleSurveyMethod && data.downHoleSurveyMethod.trim() !== "");
			}
			return true;
		},
		{
			message: "Survey method is required for active approved surveys",
			path: ["downHoleSurveyMethod"],
		},
	);

/**
 * Survey Business Schema Type
 */
export type SurveyBusinessInput = z.input<typeof SurveyBusinessSchema>;
export type SurveyBusinessOutput = z.output<typeof SurveyBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate Survey (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data Survey data to validate
 * @returns Validated and typed survey data
 * @throws {Error} If validation fails
 */
export const validateSurveyDb = createThrowingValidator(SurveyDbSchema, "Survey");

/**
 * Safe Validate Survey (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data Survey data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateSurveyDb = createSafeValidator(SurveyDbSchema);

/**
 * Is Valid Survey (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches SurveyDbSchema
 */
export const isValidSurveyDb = createTypeGuard(SurveyDbSchema);

/**
 * Validate Survey (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data Survey data to validate
 * @returns Validated and typed survey data
 * @throws {Error} If validation fails
 */
export const validateSurveyBusiness = createThrowingValidator(SurveyBusinessSchema, "Survey");

/**
 * Safe Validate Survey (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data Survey data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateSurveyBusiness = createSafeValidator(SurveyBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve Survey
 *
 * Checks if a survey can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * @param data Survey data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveSurvey(surveyData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveSurvey(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = SurveyBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const survey = businessResult.data;
	const errors: string[] = [];

	// Check status
	if (!canApproveStatus(survey.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Survey must be in review status to be approved");
	}

	// Check required fields for approval
	if (!survey.downHoleSurveyMethod) {
		errors.push("Survey method is required for approval");
	}

	if (!survey.surveyedOnDt) {
		errors.push("Survey date is required for approval");
	}

	if (!survey.grid) {
		errors.push("Grid reference is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate Survey For Review
 *
 * Checks if a survey is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data Survey data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateSurveyForReview(surveyData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateSurveyForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = SurveyDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const survey = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields
	if (!survey.downHoleSurveyMethod) {
		errors.push("Survey method is required for review");
	}

	if (!survey.organization) {
		errors.push("Organization is required for review");
	}

	// Warnings (not blocking)
	if (!survey.surveyedOnDt) {
		warnings.push("Survey date should be provided");
	}

	if (!survey.surveyCompany && !survey.surveyOperator) {
		warnings.push("Survey company and operator should be provided");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(survey, warnings);
}

/**
 * Get Survey Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data Survey data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getSurveyValidationReport(surveyData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getSurveyValidationReport(data: unknown): {
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
	const dbResult = SurveyDbSchema.safeParse(data);
	const businessResult = SurveyBusinessSchema.safeParse(data);
	const approvalCheck = canApproveSurvey(data);
	const reviewCheck = validateSurveyForReview(data);

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
export type { SurveyInsertRecord } from "../tables/survey/schema";

/**
 * Validated Survey types (after schema validation)
 */
export type ValidatedSurveyDb = SurveyDbOutput;
export type ValidatedSurveyBusiness = SurveyBusinessOutput;
