/**
 * RigSetup Business Validation
 *
 * Two-tier validation for RigSetup table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/drill-plan/drill-plan.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateRigSetupDb, validateRigSetupBusiness } from './rigsetup.business';
 *
 * // Database validation (always use)
 * const validData = validateRigSetupDb(data);
 * await db.rigSetups.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateRigSetupBusiness(data);
 * ```
 *
 * @module extensions/rigsetup
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
	RigSetupTableInsertBaseSchema,
} from "../tables/rigsetup/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * RigSetup Database Schema (Tier 1)
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
export const RigSetupDbSchema = RigSetupTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	rigSetupId: GuidSchema.optional(), // Optional because it has DB default (newid())
	drillPlanId: GuidSchema.nullable().optional(),
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
	padInspectionSignatureDt: IsoDateSchema.nullable().optional(),
	drillingSignatureDt: IsoDateSchema.nullable().optional(),
	finalGeologistSignatureDt: IsoDateSchema.nullable().optional(),
	finalSetupDrillSupervisorSignatureDt: IsoDateSchema.nullable().optional(),
	finalSetupSignatureDt: IsoDateSchema.nullable().optional(),
	downHoleSurveyDrillerSignatureDt: IsoDateSchema.nullable().optional(),
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// ANGLE FIELDS (validate range)
	// ========================================
	finalMagAzimuth: z.number().min(0).max(360).nullable().optional(),
	finalInclination: z.number().min(-90).max(90).nullable().optional(),
	rigAlignmentToolMagAzi: z.number().min(0).max(360).nullable().optional(),
	rigAlignmentToolDip: z.number().min(-90).max(90).nullable().optional(),
	surveyMagAzi: z.number().min(0).max(360).nullable().optional(),
	surveyDip: z.number().min(-90).max(90).nullable().optional(),
	surveyDepth: DepthSchema.nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),
	dataSource: z.string().min(1, ErrorMessages.REQUIRED).max(255),

	// Optional lookup references
	padInspectionCompletedBy: z.string().max(50).nullable().optional(),
	drillingCompany: z.string().max(50).nullable().optional(),
	drillSupervisor: z.string().max(50).nullable().optional(),
	finalGeologist: z.string().max(50).nullable().optional(),
	finalSetupDrillSupervisor: z.string().max(50).nullable().optional(),
	finalSetupApprovedBy: z.string().max(50).nullable().optional(),
	downHoleSurveyDrillingContractor: z.string().max(50).nullable().optional(),
	downHoleSurveyRigNo: z.string().max(50).nullable().optional(),
	surveyReference: z.string().max(50).nullable().optional(),
	downHoleSurveyDriller: z.string().max(50).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	padInspectionSignature: z.string().max(-1).nullable().optional(),
	drillingSignature: z.string().max(-1).nullable().optional(),
	finalGeologistSignature: z.string().max(-1).nullable().optional(),
	finalSetupDrillSupervisorSignature: z.string().max(-1).nullable().optional(),
	finalSetupSignature: z.string().max(-1).nullable().optional(),
	downHoleSurveyDrillerSignature: z.string().max(-1).nullable().optional(),
	comments: CommentsSchema.nullable().optional(), // max 4000 chars (actually -1 = max in DB)
	validationErrors: z.string().max(-1).nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * RigSetup Database Schema Type
 */
export type RigSetupDbInput = z.input<typeof RigSetupDbSchema>;
export type RigSetupDbOutput = z.output<typeof RigSetupDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * RigSetup Business Schema (Tier 2)
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
 * - Signature date consistency
 * - Angle validation (azimuth 0-360, dip -90 to 90)
 * - Drill plan relationship
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. If signature is provided, signature date should also be provided
 * 2. Azimuth values should be between 0 and 360 degrees
 * 3. Dip values should be between -90 and 90 degrees
 * 4. Date reasonableness checks (mining era: after 1980, not too far future)
 * 5. Drill plan relationship validation
 * 6. Comments should be provided for incomplete records
 */
export const RigSetupBusinessSchema = RigSetupDbSchema
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.padInspectionSignature && !data.padInspectionSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Pad inspection signature date is required when signature is provided",
			path: ["padInspectionSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.drillingSignature && !data.drillingSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Drilling signature date is required when signature is provided",
			path: ["drillingSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.finalGeologistSignature && !data.finalGeologistSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Final geologist signature date is required when signature is provided",
			path: ["finalGeologistSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.finalSetupDrillSupervisorSignature && !data.finalSetupDrillSupervisorSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Final setup drill supervisor signature date is required when signature is provided",
			path: ["finalSetupDrillSupervisorSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.finalSetupSignature && !data.finalSetupSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Final setup signature date is required when signature is provided",
			path: ["finalSetupSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 1: If signature is provided, signature date should also be provided
			if (data.downHoleSurveyDrillerSignature && !data.downHoleSurveyDrillerSignatureDt) {
				return false;
			}
			return true;
		},
		{
			message: "Down hole survey driller signature date is required when signature is provided",
			path: ["downHoleSurveyDrillerSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Azimuth values should be between 0 and 360 degrees
			if (data.finalMagAzimuth !== undefined && data.finalMagAzimuth !== null) {
				return data.finalMagAzimuth >= 0 && data.finalMagAzimuth <= 360;
			}
			return true;
		},
		{
			message: "Final magnetic azimuth must be between 0 and 360 degrees",
			path: ["finalMagAzimuth"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Azimuth values should be between 0 and 360 degrees
			if (data.rigAlignmentToolMagAzi !== undefined && data.rigAlignmentToolMagAzi !== null) {
				return data.rigAlignmentToolMagAzi >= 0 && data.rigAlignmentToolMagAzi <= 360;
			}
			return true;
		},
		{
			message: "Rig alignment tool magnetic azimuth must be between 0 and 360 degrees",
			path: ["rigAlignmentToolMagAzi"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: Azimuth values should be between 0 and 360 degrees
			if (data.surveyMagAzi !== undefined && data.surveyMagAzi !== null) {
				return data.surveyMagAzi >= 0 && data.surveyMagAzi <= 360;
			}
			return true;
		},
		{
			message: "Survey magnetic azimuth must be between 0 and 360 degrees",
			path: ["surveyMagAzi"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Dip values should be between -90 and 90 degrees
			if (data.finalInclination !== undefined && data.finalInclination !== null) {
				return data.finalInclination >= -90 && data.finalInclination <= 90;
			}
			return true;
		},
		{
			message: "Final inclination must be between -90 and 90 degrees",
			path: ["finalInclination"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Dip values should be between -90 and 90 degrees
			if (data.rigAlignmentToolDip !== undefined && data.rigAlignmentToolDip !== null) {
				return data.rigAlignmentToolDip >= -90 && data.rigAlignmentToolDip <= 90;
			}
			return true;
		},
		{
			message: "Rig alignment tool dip must be between -90 and 90 degrees",
			path: ["rigAlignmentToolDip"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: Dip values should be between -90 and 90 degrees
			if (data.surveyDip !== undefined && data.surveyDip !== null) {
				return data.surveyDip >= -90 && data.surveyDip <= 90;
			}
			return true;
		},
		{
			message: "Survey dip must be between -90 and 90 degrees",
			path: ["surveyDip"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - signature dates after 1980
			const dates = [
				data.padInspectionSignatureDt,
				data.drillingSignatureDt,
				data.finalGeologistSignatureDt,
				data.finalSetupDrillSupervisorSignatureDt,
				data.finalSetupSignatureDt,
				data.downHoleSurveyDrillerSignatureDt,
			].filter(date => date !== undefined && date !== null);

			return dates.every((date) => {
				const signatureDate = date instanceof Date ? date : new Date(date);
				const minDate = new Date("1980-01-01"); // Modern mining era
				return signatureDate >= minDate;
			});
		},
		{
			message: "Signature dates must be after 1980 (modern mining era)",
			path: ["padInspectionSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Date reasonableness - signature dates not too far in future (7 days)
			const dates = [
				data.padInspectionSignatureDt,
				data.drillingSignatureDt,
				data.finalGeologistSignatureDt,
				data.finalSetupDrillSupervisorSignatureDt,
				data.finalSetupSignatureDt,
				data.downHoleSurveyDrillerSignatureDt,
			].filter(date => date !== undefined && date !== null);

			return dates.every((date) => {
				const signatureDate = date instanceof Date ? date : new Date(date);
				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return signatureDate <= maxDate;
			});
		},
		{
			message: "Signature dates cannot be more than 7 days in the future",
			path: ["padInspectionSignatureDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Drill plan relationship validation
			// If drill plan ID is provided, it should be a valid UUID
			if (data.drillPlanId) {
				return true; // UUID validation is already handled by GuidSchema
			}
			return true;
		},
		{
			message: "Drill plan ID must be a valid UUID if provided",
			path: ["drillPlanId"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Comments should be provided for incomplete records
			const hasSignatures = data.padInspectionSignature
			  || data.drillingSignature
			  || data.finalGeologistSignature
			  || data.finalSetupDrillSupervisorSignature
			  || data.finalSetupSignature
			  || data.downHoleSurveyDrillerSignature;

			if (!hasSignatures && !data.comments) {
				return false;
			}
			return true;
		},
		{
			message: "Comments should be provided when no signatures are present",
			path: ["comments"],
		},
	);

/**
 * RigSetup Business Schema Type
 */
export type RigSetupBusinessInput = z.input<typeof RigSetupBusinessSchema>;
export type RigSetupBusinessOutput = z.output<typeof RigSetupBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate RigSetup (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data RigSetup data to validate
 * @returns Validated and typed rig setup data
 * @throws {Error} If validation fails
 */
export const validateRigSetupDb = createThrowingValidator(RigSetupDbSchema, "RigSetup");

/**
 * Safe Validate RigSetup (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data RigSetup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateRigSetupDb = createSafeValidator(RigSetupDbSchema);

/**
 * Is Valid RigSetup (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches RigSetupDbSchema
 */
export const isValidRigSetupDb = createTypeGuard(RigSetupDbSchema);

/**
 * Validate RigSetup (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data RigSetup data to validate
 * @returns Validated and typed rig setup data
 * @throws {Error} If validation fails
 */
export const validateRigSetupBusiness = createThrowingValidator(RigSetupBusinessSchema, "RigSetup");

/**
 * Safe Validate RigSetup (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data RigSetup data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateRigSetupBusiness = createSafeValidator(RigSetupBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve RigSetup
 *
 * Checks if a rig setup can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have organization and dataSource
 * 4. Must have at least one signature with corresponding date
 * 5. Must have valid angle measurements if provided
 *
 * @param data RigSetup data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveRigSetup(rigData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveRigSetup(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = RigSetupBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const rigSetup = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(rigSetup.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Rig setup must be in review status to be approved");
	}

	// Check required fields for approval
	if (!rigSetup.organization) {
		errors.push("Organization is required for approval");
	}

	if (!rigSetup.dataSource) {
		errors.push("Data source is required for approval");
	}

	// Check that at least one signature is provided with corresponding date
	const hasValidSignature
		= (rigSetup.padInspectionSignature && rigSetup.padInspectionSignatureDt)
		  || (rigSetup.drillingSignature && rigSetup.drillingSignatureDt)
		  || (rigSetup.finalGeologistSignature && rigSetup.finalGeologistSignatureDt)
		  || (rigSetup.finalSetupDrillSupervisorSignature && rigSetup.finalSetupDrillSupervisorSignatureDt)
		  || (rigSetup.finalSetupSignature && rigSetup.finalSetupSignatureDt)
		  || (rigSetup.downHoleSurveyDrillerSignature && rigSetup.downHoleSurveyDrillerSignatureDt);

	if (!hasValidSignature) {
		errors.push("At least one signature with corresponding date is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate RigSetup For Review
 *
 * Checks if a rig setup is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data RigSetup data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateRigSetupForReview(rigData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateRigSetupForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = RigSetupDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const rigSetup = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!rigSetup.organization) {
		errors.push("Organization is required for review");
	}

	if (!rigSetup.dataSource) {
		errors.push("Data source is required for review");
	}

	// Warnings (not blocking)
	if (!rigSetup.drillPlanId) {
		warnings.push("Drill plan ID should be specified when available");
	}

	if (!rigSetup.drillingCompany) {
		warnings.push("Drilling company should be specified when available");
	}

	if (!rigSetup.drillSupervisor) {
		warnings.push("Drill supervisor should be specified when available");
	}

	if (!rigSetup.finalGeologist) {
		warnings.push("Final geologist should be specified when available");
	}

	if (!rigSetup.comments) {
		warnings.push("Comments should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(rigSetup, warnings);
}

/**
 * Get RigSetup Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data RigSetup data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getRigSetupValidationReport(rigData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getRigSetupValidationReport(data: unknown): {
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
	const dbResult = RigSetupDbSchema.safeParse(data);
	const businessResult = RigSetupBusinessSchema.safeParse(data);
	const approvalCheck = canApproveRigSetup(data);
	const reviewCheck = validateRigSetupForReview(data);

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
export type { RigSetupInsertRecord } from "../tables/rigsetup/schema";

/**
 * Validated RigSetup types (after schema validation)
 */
export type ValidatedRigSetupDb = RigSetupDbOutput;
export type ValidatedRigSetupBusiness = RigSetupBusinessOutput;
