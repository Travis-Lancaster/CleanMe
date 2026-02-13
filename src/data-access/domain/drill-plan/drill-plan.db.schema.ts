/**
 * DrillPlan Database Schema
 * Type-safe validation for database storage operations
 *
 * This schema ensures data integrity for IndexedDB storage:
 * - Validates required fields are present
 * - Ensures field types are correct
 * - Validates formats (UUIDs, dates, coordinates)
 * - Enforces basic range constraints
 *
 * Does NOT validate:
 * - Cross-field business logic
 * - Geological industry standards
 * - Completeness for approval
 * - Complex relationships
 *
 * Use this schema for:
 * - Every save/create/update operation
 * - Import validation
 * - API request validation
 * - Pre-sync checks
 */

import { z } from "zod";
import {
	AzimuthSchema,
	DepthSchema,
	DipSchema,
	EastingSchema,
	ErrorMessages,
	GuidSchema,
	IsoDateSchema,
	NorthingSchema,
	ODSPrioritySchema,
	PrioritySchema,
	RLSchema,
	RowStatusEnum,
	ValidationStatusEnum,
} from "./drill-plan.schema.helpers";

// ========================================
// MAIN DATABASE SCHEMA
// ========================================

/**
 * Database Schema: Core Type Safety and Format Validation
 *
 * This schema validates data before storage in IndexedDB.
 * It focuses on type correctness and format validity.
 */
export const DrillPlanDbSchema = z.object({
	// ========================================
	// REQUIRED IDENTIFIERS
	// ========================================

	DrillPlanId: GuidSchema,
	DataSource: z.string().min(1, ErrorMessages.DATA_SOURCE_REQUIRED),

	// ========================================
	// REQUIRED PRIORITY FIELDS
	// ========================================

	DrillPriority: PrioritySchema,
	ODSPriority: ODSPrioritySchema,

	// ========================================
	// REQUIRED FOREIGN KEYS (as GUIDs)
	// ========================================

	DrillPattern: z.string().min(1, ErrorMessages.FK_DRILL_PATTERN_REQUIRED),
	DrillType: z.string().min(1, ErrorMessages.FK_DRILL_TYPE_REQUIRED),
	Grid: z.string().min(1, ErrorMessages.FK_GRID_REQUIRED),
	HolePurpose: z.string().min(1, "Hole purpose is required"),
	HolePurposeDetail: z.string().min(1, "Hole purpose detail is required"),
	HoleStatus: z.string().min(1, "Hole status is required"),
	HoleType: z.string().min(1, "Hole type is required"),
	Organization: z.string().min(1, "Organization is required"),
	Phase: z.string().min(1, "Phase is required"),
	Pit: z.string().min(1, "Pit is required"),
	PlannedBy: z.string().min(1, ErrorMessages.FK_PLANNED_BY_REQUIRED),
	Project: z.string().min(1, "Project is required"),
	Prospect: z.string().min(1, "Prospect is required"),
	SubTarget: z.string().min(1, "Sub-target is required"),
	Target: z.string().min(1, ErrorMessages.FK_TARGET_REQUIRED),
	Tenement: z.string().min(1, "Tenement is required"),
	Zone: z.string().min(1, "Zone is required"),

	// ========================================
	// OPTIONAL METADATA FIELDS
	// ========================================

	ReportIncludeInd: z.boolean().optional(),
	ValidationStatus: ValidationStatusEnum.optional(),
	ValidationErrors: z.string().nullable().optional(),
	RowStatus: RowStatusEnum.optional(),
	SupersededById: z.string().optional(),
	ActiveInd: z.boolean().optional(),
	rv: z.string().optional(), // Row version for optimistic locking

	CreatedOnDt: IsoDateSchema.optional(),
	CreatedBy: z.string().optional(),
	ModifiedOnDt: IsoDateSchema.optional(),
	ModifiedBy: z.string().optional(),

	// ========================================
	// OPTIONAL PLANNING FIELDS
	// ========================================

	InfillTarget: z.string().max(100, "Infill target must not exceed 100 characters").optional(),
	Priority: PrioritySchema.optional(),
	QCInsertionRuleId: z.string().optional(),
	SitePrep: z.string().max(200, "Site prep must not exceed 200 characters").optional(),
	TWF: z.string().max(100, "TWF must not exceed 100 characters").optional(),

	// ========================================
	// PLANNED MEASUREMENTS - COORDINATES
	// ========================================

	PlannedEasting: EastingSchema.optional(),
	PlannedNorthing: NorthingSchema.optional(),
	PlannedRL: RLSchema.optional(),

	// ========================================
	// PLANNED MEASUREMENTS - ORIENTATION
	// ========================================

	PlannedAzimuth: AzimuthSchema.optional(),
	PlannedDip: DipSchema.optional(),

	// ========================================
	// PLANNED MEASUREMENTS - DEPTHS
	// ========================================

	PlannedTotalDepth: DepthSchema.optional(),
	WaterTableDepth: DepthSchema.optional(),

	// ========================================
	// PLANNED DATE FIELDS
	// ========================================

	PlannedStartDt: IsoDateSchema.optional(),
	PlannedCompleteDt: IsoDateSchema.optional(),

	// ========================================
	// RELATED ENTITIES (Arrays)
	// ========================================
	// Note: These are validated separately when present
	// The business schema will enforce requirements as needed

	drillPlanStatusHistorys: z.array(z.any()).optional(),
	rigSetups: z.array(z.any()).optional(),

	// ========================================
	// LOOKUP RELATIONS (Objects)
	// ========================================
	// Note: These are optional navigation properties
	// Not validated in DB schema as they're populated by joins

	drillPattern: z.any().optional(),
	drillPlanStatus: z.any().optional(),
	drillType: z.any().optional(),
	gr: z.any().optional(),
	holePurpose: z.any().optional(),
	holePurposeDetail: z.any().optional(),
	holeStatus: z.any().optional(),
	holeType: z.any().optional(),
	organization: z.any().optional(),
	phase: z.any().optional(),
	pit: z.any().optional(),
	plannedBy: z.any().optional(),
	project: z.any().optional(),
	prospect: z.any().optional(),
	subTarget: z.any().optional(),
	target: z.any().optional(),
	tenement: z.any().optional(),
	zone: z.any().optional(),
});

// ========================================
// CREATE SCHEMA (FOR INSERTS)
// ========================================

/**
 * Schema for creating new drill plans
 * Makes some fields optional that will be auto-generated
 */
export const DrillPlanDbCreateSchema = DrillPlanDbSchema.extend({
	DrillPlanId: GuidSchema.optional(), // Can be auto-generated
	CreatedOnDt: IsoDateSchema.optional(), // Auto-generated
	CreatedBy: z.string().optional(), // Set by system
	ModifiedOnDt: IsoDateSchema.optional(), // Auto-generated
	ModifiedBy: z.string().optional(), // Set by system
	ActiveInd: z.boolean().optional().default(true),
	RowStatus: RowStatusEnum.optional().default(0), // Default to Draft
	ReportIncludeInd: z.boolean().optional().default(true),
});

// ========================================
// UPDATE SCHEMA (FOR UPDATES)
// ========================================

/**
 * Schema for updating existing drill plans
 * All fields except DrillPlanId can be updated (made partial)
 */
export const DrillPlanDbUpdateSchema = DrillPlanDbSchema.partial().extend({
	// DrillPlanId must be present for updates
	DrillPlanId: GuidSchema,
	// Modified metadata should be updated
	ModifiedOnDt: IsoDateSchema.optional(),
	ModifiedBy: z.string().optional(),
});

// ========================================
// TYPE EXPORTS
// ========================================

/**
 * TypeScript type inferred from the database schema
 */
export type DrillPlanDbInput = z.infer<typeof DrillPlanDbSchema>;

/**
 * TypeScript type for creating drill plans
 */
export type DrillPlanDbCreate = z.infer<typeof DrillPlanDbCreateSchema>;

/**
 * TypeScript type for updating drill plans
 */
export type DrillPlanDbUpdate = z.infer<typeof DrillPlanDbUpdateSchema>;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validate drill plan data for database storage
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data
 * @throws ZodError if validation fails
 */
export function validateDrillPlanDb(data: unknown): DrillPlanDbInput {
	return DrillPlanDbSchema.parse(data);
}

/**
 * Safe validation that returns success/error result
 * Does not throw, returns { success: true, data } or { success: false, error }
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanDb(data: unknown) {
	return DrillPlanDbSchema.safeParse(data);
}

/**
 * Validate drill plan data for creation
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data for creation
 * @throws ZodError if validation fails
 */
export function validateDrillPlanDbCreate(data: unknown): DrillPlanDbCreate {
	return DrillPlanDbCreateSchema.parse(data);
}

/**
 * Safe validation for drill plan creation
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanDbCreate(data: unknown) {
	return DrillPlanDbCreateSchema.safeParse(data);
}

/**
 * Validate drill plan data for update
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated drill plan data for update
 * @throws ZodError if validation fails
 */
export function validateDrillPlanDbUpdate(data: unknown): DrillPlanDbUpdate {
	return DrillPlanDbUpdateSchema.parse(data);
}

/**
 * Safe validation for drill plan update
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateDrillPlanDbUpdate(data: unknown) {
	return DrillPlanDbUpdateSchema.safeParse(data);
}

/**
 * Check if data matches the DrillPlan database schema without throwing
 *
 * @param data - Data to check
 * @returns True if data is valid, false otherwise
 */
export function isValidDrillPlanDb(data: unknown): data is DrillPlanDbInput {
	return DrillPlanDbSchema.safeParse(data).success;
}

/**
 * Validate a partial drill plan update and return only the valid fields
 * Useful for sanitizing user input before updates
 *
 * @param data - Partial drill plan data
 * @returns Object with valid and invalid fields
 */
export function validatePartialDrillPlan(data: unknown): {
	valid: Partial<DrillPlanDbInput>
	invalid: Array<{ field: string, error: string }>
} {
	const result = DrillPlanDbUpdateSchema.safeParse(data);

	if (result.success) {
		return { valid: result.data, invalid: [] };
	}

	// Extract field-level errors
	const invalid = result.error.issues.map(err => ({
		field: err.path.join("."),
		error: err.message,
	}));

	// Try to extract valid fields by testing each field individually
	const valid: Partial<DrillPlanDbInput> = {};
	if (data && typeof data === "object") {
		for (const [key, value] of Object.entries(data)) {
			const testResult = DrillPlanDbSchema.shape[key as keyof typeof DrillPlanDbSchema.shape]?.safeParse(value);
			if (testResult?.success) {
				valid[key as keyof DrillPlanDbInput] = value as any;
			}
		}
	}

	return { valid, invalid };
}

console.log("[DRILL-PLAN-SCHEMA] 🗄️ DrillPlan database schema loaded");
