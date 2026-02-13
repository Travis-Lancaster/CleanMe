/**
 * RigSetup Database Schema - Tier 1 Validation (BLOCKING)
 *
 * Enforces database constraints and type safety
 * Fails fast - blocks save if validation fails
 *
 * Location: src/data/domain/rig-setup/rig-setup.db.schema.ts
 */

import { z } from "zod";
import { GuidSchema, IsoDateSchema } from "../schema-helpers/index.js";

// ============================================
// MAIN DATABASE SCHEMA
// ============================================
export const RigSetupDbSchema = z.object({
	// Primary Keys
	RigSetupId: GuidSchema,
	DrillPlanId: GuidSchema.optional(),
	Organization: z.string().min(1, "Organization is required"),

	// Pad Inspection Section
	DrillingCompany: z.string().nullable(),
	PadInspectionCompletedBy: z.string().nullable(),
	DrillSupervisor: z.string().nullable(),
	PadInspectionSignature: z.string().nullable(),
	PadInspectionSignatureDt: IsoDateSchema.nullable(),
	DrillingSignature: z.string().nullable(),
	DrillingSignatureDt: IsoDateSchema.nullable(),

	// Final Setup Section
	FinalMagAzimuth: z.number()
		.min(0, "Azimuth must be >= 0")
		.max(360, "Azimuth must be <= 360")
		.nullable(),
	FinalInclination: z.number()
		.min(-90, "Inclination must be >= -90")
		.max(90, "Inclination must be <= 90")
		.nullable(),
	FinalGeologist: z.string().nullable(),
	FinalGeologistSignature: z.string().nullable(),
	FinalGeologistSignatureDt: IsoDateSchema.nullable(),
	FinalSetupApprovedBy: z.string().nullable(),
	FinalSetupSignature: z.string().nullable(),
	FinalSetupSignatureDt: IsoDateSchema.nullable(),
	FinalSetupDrillSupervisor: z.string().nullable(),
	FinalSetupDrillSupervisorSignature: z.string().nullable(),
	FinalSetupDrillSupervisorSignatureDt: IsoDateSchema.nullable(),

	// Down Hole Survey Section
	DownHoleSurveyDrillingContractor: z.string().nullable(),
	DownHoleSurveyDriller: z.string().nullable(),
	DownHoleSurveyRigNo: z.string().nullable(),
	DownHoleSurveyDrillerSignature: z.string().nullable(),
	DownHoleSurveyDrillerSignatureDt: IsoDateSchema.nullable(),

	// Comments
	Comments: z.string()
		.max(4000, "Comments max 4000 characters")
		.nullable(),

	// Standard Metadata
	CreatedOnDt: IsoDateSchema,
	CreatedBy: z.string().optional(),
	ModifiedOnDt: IsoDateSchema.optional(),
	ModifiedBy: z.string().optional(),
	RowStatus: z.number().default(0),
	ActiveInd: z.boolean().default(true),
	rv: z.number().optional(),
});

// ============================================
// CREATE SCHEMA (with defaults)
// ============================================
export const RigSetupDbCreateSchema = RigSetupDbSchema.extend({
	RigSetupId: GuidSchema.default(() => crypto.randomUUID()),
	CreatedOnDt: IsoDateSchema.default(() => new Date()),
	ActiveInd: z.boolean().default(true),
	RowStatus: z.number().default(0),
});

// ============================================
// UPDATE SCHEMA (partial)
// ============================================
export const RigSetupDbUpdateSchema = RigSetupDbSchema.partial().extend({
	RigSetupId: GuidSchema, // ID always required
	ModifiedOnDt: IsoDateSchema.default(() => new Date()),
});

// ============================================
// TYPE EXPORTS
// ============================================
export type RigSetupDb = z.infer<typeof RigSetupDbSchema>;
export type RigSetupDbCreate = z.infer<typeof RigSetupDbCreateSchema>;
export type RigSetupDbUpdate = z.infer<typeof RigSetupDbUpdateSchema>;

// ============================================
// VALIDATORS
// ============================================
export function validateRigSetupDb(data: unknown): RigSetupDb {
	return RigSetupDbSchema.parse(data);
}

export function safeValidateRigSetupDb(data: unknown) {
	return RigSetupDbSchema.safeParse(data);
}

export function isValidRigSetupDb(data: unknown): data is RigSetupDb {
	return RigSetupDbSchema.safeParse(data).success;
}
