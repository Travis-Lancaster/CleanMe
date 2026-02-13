/**
 * Collar Database Schema
 * Type-safe validation for database storage operations
 *
 * This schema ensures data integrity for IndexedDB storage:
 * - Validates required fields are present
 * - Ensures field types are correct
 * - Validates formats (UUIDs, dates, etc.)
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
	DepthSchema,
	GuidSchema,
	HoleIdSchema,
	IsoDateSchema,
	PrioritySchema,
	RowStatusEnum,
	ValidationStatusEnum,
} from "./collar.schema.helpers";

// ========================================
// MAIN DATABASE SCHEMA
// ========================================

/**
 * Database Schema: Core Type Safety and Format Validation
 *
 * This schema validates data before storage in IndexedDB.
 * It focuses on type correctness and format validity.
 */
export const CollarDbSchema = z.object({
	// ========================================
	// REQUIRED FIELDS
	// ========================================

	// Identifiers
	HoleId: HoleIdSchema,
	CollarId: GuidSchema,

	// Flags
	ApprovedInd: z.boolean(),
	ModelUseInd: z.boolean(),

	HoleNm: z.string().nullable().transform(value => value ?? undefined).optional(),
	/**
	 * dataType: nvarchar
	 */
	PlannedHoleNm: z.string().nullable().transform(value => value ?? undefined).optional(),
	/**
	 * dataType: nvarchar
	 */
	ProposedHoleNm: z.string().nullable().transform(value => value ?? undefined).optional(),
	/**
	 * dataType: nvarchar
	 */
	OtherHoleNm: z.string().nullable().transform(value => value ?? undefined).optional(),

	// Foreign Keys (all required as GUIDs)
	CollarType: z.string().min(1, "Collar type is required"),
	DataSource: z.string().min(1, "Data source is required"),
	ExplorationCompany: z.string().min(1, "Exploration company is required"),
	HolePurpose: z.string().min(1, "Hole purpose is required"),
	HoleStatus: z.string().min(1, "Hole status is required"),
	HoleType: z.string().min(1, "Hole type is required"),
	LoggingEventId: z.string().min(1, "Logging event ID is required"),
	Organization: z.string().min(1, "Organization is required"),
	Phase: z.string().min(1, "Phase is required"),
	Pit: z.string().min(1, "Pit is required"),
	Project: z.string().min(1, "Project is required"),
	Prospect: z.string().min(1, "Prospect is required"),
	ResponsiblePerson: z.string().min(1, "Responsible person is required"),
	ResponsiblePerson2: z.string().min(1, "Second responsible person is required"),
	Section: z.string().min(1, "Section is required"),
	SubTarget: z.string().min(1, "Sub-target is required"),
	Target: z.string().min(1, "Target is required"),
	Tenement: z.string().min(1, "Tenement is required"),

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
	// OPTIONAL MEASUREMENT FIELDS
	// ========================================

	CasingDepth: DepthSchema.optional(),
	PreCollarDepth: DepthSchema.optional(),
	StartDepth: DepthSchema.optional(),
	TotalDepth: DepthSchema.optional(),
	WaterTableDepth: DepthSchema.optional(),
	Priority: PrioritySchema.optional(),

	// ========================================
	// OPTIONAL OPERATIONAL FIELDS
	// ========================================

	Comments: z.string().max(4000, "Comments must not exceed 4000 characters").optional(),
	HolePurposeDetail: z.string().max(500, "Hole purpose detail must not exceed 500 characters").optional(),
	OrientationTool: z.string().max(100, "Orientation tool must not exceed 100 characters").optional(),
	ParentCollarId: z.string().optional(),
	PreCollarId: z.string().optional(),
	Redox: z.string().max(100, "Redox must not exceed 100 characters").optional(),

	// ========================================
	// OPTIONAL DATE FIELDS
	// ========================================

	FinishedOnDt: IsoDateSchema.optional(),
	StartedOnDt: IsoDateSchema.optional(),
	WaterTableDepthMeasuredOnDt: IsoDateSchema.optional(),

	// ========================================
	// RELATED ENTITIES (Arrays)
	// ========================================
	// Note: These are validated separately when present
	// The business schema will enforce coordinate requirements

	collarCoordinates: z.array(z.any()).optional(),
	coreRecoveryRunLogs: z.array(z.any()).optional(),
	drillMethods: z.array(z.any()).optional(),
	fractureCountLogs: z.array(z.any()).optional(),
	geologyCombinedLogs: z.array(z.any()).optional(),
	labDispatchs: z.array(z.any()).optional(),
	magSusLogs: z.array(z.any()).optional(),
	metaDataLogs: z.array(z.any()).optional(),
	rockMechanicLogs: z.array(z.any()).optional(),
	rockQualityDesignationLogs: z.array(z.any()).optional(),
	samples: z.array(z.any()).optional(),
	sampleDispatchs: z.array(z.any()).optional(),
	sampleQcs: z.array(z.any()).optional(),
	structureLogs: z.array(z.any()).optional(),
	surveys: z.array(z.any()).optional(),
	validationErrors: z.array(z.any()).optional(),
	xrfSamples: z.array(z.any()).optional(),

	// ========================================
	// LOOKUP RELATIONS (Objects)
	// ========================================
	// Note: These are optional navigation properties
	// Not validated in DB schema as they're populated by joins

	collarType: z.any().optional(),
	explorationCompany: z.any().optional(),
	holePurpose: z.any().optional(),
	holeStatus: z.any().optional(),
	holeType: z.any().optional(),
	organization: z.any().optional(),
	phase: z.any().optional(),
	pit: z.any().optional(),
	project: z.any().optional(),
	prospect: z.any().optional(),
	responsiblePerson: z.any().optional(),
	responsiblePerson2: z.any().optional(),
	rowStatus: z.any().optional(),
	section: z.any().optional(),
	subTarget: z.any().optional(),
	target: z.any().optional(),
	tenement: z.any().optional(),
});

// ========================================
// CREATE SCHEMA (FOR INSERTS)
// ========================================

/**
 * Schema for creating new collars
 * Makes some fields optional that will be auto-generated
 */
export const CollarDbCreateSchema = CollarDbSchema.extend({
	CollarId: GuidSchema.optional(), // Can be auto-generated
	CreatedOnDt: IsoDateSchema.optional(), // Auto-generated
	CreatedBy: z.string().optional(), // Set by system
	ModifiedOnDt: IsoDateSchema.optional(), // Auto-generated
	ModifiedBy: z.string().optional(), // Set by system
	ActiveInd: z.boolean().optional().default(true),
	RowStatus: RowStatusEnum.optional().default(0), // Default to Draft
	ApprovedInd: z.boolean().optional().default(false),
});

// ========================================
// UPDATE SCHEMA (FOR UPDATES)
// ========================================

/**
 * Schema for updating existing collars
 * All fields except HoleId can be updated (made partial)
 */
export const CollarDbUpdateSchema = CollarDbSchema.partial().extend({
	// HoleId cannot be changed after creation (but is optional for updates)
	HoleId: HoleIdSchema.optional(),
	// CollarId must be present for updates
	CollarId: GuidSchema,
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
export type CollarDbInput = z.infer<typeof CollarDbSchema>;

/**
 * TypeScript type for creating collars
 */
export type CollarDbCreate = z.infer<typeof CollarDbCreateSchema>;

/**
 * TypeScript type for updating collars
 */
export type CollarDbUpdate = z.infer<typeof CollarDbUpdateSchema>;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validate collar data for database storage
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data
 * @throws ZodError if validation fails
 */
export function validateCollarDb(data: unknown): CollarDbInput {
	return CollarDbSchema.parse(data);
}

/**
 * Safe validation that returns success/error result
 * Does not throw, returns { success: true, data } or { success: false, error }
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarDb(data: unknown) {
	return CollarDbSchema.safeParse(data);
}

/**
 * Validate collar data for creation
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data for creation
 * @throws ZodError if validation fails
 */
export function validateCollarDbCreate(data: unknown): CollarDbCreate {
	return CollarDbCreateSchema.parse(data);
}

/**
 * Safe validation for collar creation
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarDbCreate(data: unknown) {
	return CollarDbCreateSchema.safeParse(data);
}

/**
 * Validate collar data for update
 * Throws ZodError if validation fails
 *
 * @param data - Unknown data to validate
 * @returns Validated collar data for update
 * @throws ZodError if validation fails
 */
export function validateCollarDbUpdate(data: unknown): CollarDbUpdate {
	return CollarDbUpdateSchema.parse(data);
}

/**
 * Safe validation for collar update
 *
 * @param data - Unknown data to validate
 * @returns SafeParseReturnType with success flag and data or error
 */
export function safeValidateCollarDbUpdate(data: unknown) {
	return CollarDbUpdateSchema.safeParse(data);
}

/**
 * Check if data matches the Collar database schema without throwing
 *
 * @param data - Data to check
 * @returns True if data is valid, false otherwise
 */
export function isValidCollarDb(data: unknown): data is CollarDbInput {
	return CollarDbSchema.safeParse(data).success;
}

/**
 * Validate a partial collar update and return only the valid fields
 * Useful for sanitizing user input before updates
 *
 * @param data - Partial collar data
 * @returns Object with valid and invalid fields
 */
export function validatePartialCollar(data: unknown): {
	valid: Partial<CollarDbInput>
	invalid: Array<{ field: string, error: string }>
} {
	const result = CollarDbUpdateSchema.safeParse(data);

	if (result.success) {
		return { valid: result.data, invalid: [] };
	}

	// Extract field-level errors
	const invalid = result.error.issues.map(err => ({
		field: err.path.join("."),
		error: err.message,
	}));

	// Try to extract valid fields by testing each field individually
	const valid: Partial<CollarDbInput> = {};
	if (data && typeof data === "object") {
		for (const [key, value] of Object.entries(data)) {
			const testResult = CollarDbSchema.shape[key as keyof typeof CollarDbSchema.shape]?.safeParse(value);
			if (testResult?.success) {
				valid[key as keyof CollarDbInput] = value as any;
			}
		}
	}

	return { valid, invalid };
}

console.log("[COLLAR-SCHEMA] 🗄️ Collar database schema loaded");
