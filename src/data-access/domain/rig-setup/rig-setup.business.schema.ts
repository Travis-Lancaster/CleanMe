/**
 * RigSetup Business Schema - Tier 2 Validation (NON-BLOCKING)
 *
 * Enforces business rules and best practices
 * Saves with warnings - doesn't block user
 *
 * Location: src/data/domain/rig-setup/rig-setup.business.schema.ts
 */

import { z } from "zod";
import { RigSetupDbSchema } from "./rig-setup.db.schema.js";

// ============================================
// BUSINESS VALIDATION SCHEMA
// ============================================
export const RigSetupBusinessSchema = RigSetupDbSchema.extend({
	// Business Rule 1: Azimuth should be reasonable
	FinalMagAzimuth: z.number()
		.refine(
			val => val == null || (val >= 0 && val <= 360),
			"Azimuth outside standard range (0-360°)",
		)
		.nullable(),

	// Business Rule 2: Inclination should be within drilling range
	FinalInclination: z.number()
		.refine(
			val => val == null || (val >= -90 && val <= 0),
			"Inclination unusual - most holes are downward (-90 to 0°)",
		)
		.nullable(),
})
	// Cross-field validation: Pad inspection signature requires completed by
	.refine(
		(data) => {
			if (data.PadInspectionSignature && !data.PadInspectionCompletedBy) {
				return false;
			}
			return true;
		},
		{
			message: "Pad inspection signature requires 'Completed By' person",
			path: ["PadInspectionCompletedBy"],
		},
	)
	// Cross-field validation: Final setup signature requires approved by
	.refine(
		(data) => {
			if (data.FinalSetupSignature && !data.FinalSetupApprovedBy) {
				return false;
			}
			return true;
		},
		{
			message: "Final setup signature requires 'Approved By' person",
			path: ["FinalSetupApprovedBy"],
		},
	)
	// Cross-field validation: Down hole survey signature requires driller
	.refine(
		(data) => {
			if (data.DownHoleSurveyDrillerSignature && !data.DownHoleSurveyDriller) {
				return false;
			}
			return true;
		},
		{
			message: "Down hole survey signature requires 'Driller' person",
			path: ["DownHoleSurveyDriller"],
		},
	);

// ============================================
// TYPE EXPORTS
// ============================================
export type RigSetupBusiness = z.infer<typeof RigSetupBusinessSchema>;

// ============================================
// VALIDATORS
// ============================================
export function validateRigSetupBusiness(data: unknown): RigSetupBusiness {
	return RigSetupBusinessSchema.parse(data);
}

export function safeValidateRigSetupBusiness(data: unknown) {
	return RigSetupBusinessSchema.safeParse(data);
}

// ============================================
// SUBMISSION CHECKS
// ============================================
export function canSubmitForReview(data: unknown): {
	canSubmit: boolean
	errors: string[]
} {
	const result = safeValidateRigSetupBusiness(data);

	if (result.success) {
		return { canSubmit: true, errors: [] };
	}

	return {
		canSubmit: false,
		errors: result.error.issues.map(issue =>
			`${issue.path.join(".")}: ${issue.message}`,
		),
	};
}

export function canApproveRigSetup(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	const reviewCheck = canSubmitForReview(data);

	if (!reviewCheck.canSubmit) {
		return {
			canApprove: false,
			errors: reviewCheck.errors,
		};
	}

	// Additional approval checks
	const typed = data as RigSetupBusiness;
	const errors: string[] = [];

	if (!typed.FinalSetupApprovedBy) {
		errors.push("Final setup approved by person required for approval");
	}

	if (!typed.FinalGeologist) {
		errors.push("Final geologist required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

// ============================================
// VALIDATION REPORT
// ============================================
export function getRigSetupValidationReport(data: unknown) {
	const { safeValidateRigSetupDb } = require("./rig-setup.db.schema.js");

	const dbResult = safeValidateRigSetupDb(data);
	const businessResult = safeValidateRigSetupBusiness(data);
	const approvalCheck = canApproveRigSetup(data);
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
