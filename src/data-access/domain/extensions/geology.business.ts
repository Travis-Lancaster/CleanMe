/**
 * Geology Business Validation
 *
 * Two-tier validation for GeologyCombinedLog table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/geology/geology.db.schema.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateGeologyDb, validateGeologyBusiness } from './geology.business';
 *
 * // Database validation (always use)
 * const validData = validateGeologyDb(data);
 * await db.geologyCombinedLogs.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateGeologyBusiness(data);
 * ```
 *
 * @module extensions/geology
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
	GeologyCombinedLogTableInsertBaseSchema,
} from "../tables/geologycombinedlog/schema";

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

/**
 * Geology Database Schema (Tier 1)
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
export const GeologyDbSchema = GeologyCombinedLogTableInsertBaseSchema.extend({
	// ========================================
	// IDENTIFIERS (upgrade .any() to UUID)
	// ========================================
	geologyCombinedLogId: GuidSchema.optional(), // Optional because it has DB default (newid())
	collarId: GuidSchema,
	loggingEventId: GuidSchema,
	supersededById: GuidSchema.nullable().optional(),

	// ========================================
	// FLAGS (upgrade .any() to boolean)
	// ========================================
	quickLogInd: BooleanSchema.optional(), // DB default: false
	activeInd: BooleanSchema.optional(), // DB default: true
	vG: BooleanSchema.nullable().optional(),

	// ========================================
	// STATUS (validate enum values)
	// ========================================
	rowStatus: RowStatusNumberEnum.optional(), // DB default: 0 (Draft)
	validationStatus: ValidationStatusNumberEnum.optional(), // DB default: 0 (Valid)

	// ========================================
	// DATES (upgrade .any() to ISO dates)
	// ========================================
	loggedDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	createdOnDt: IsoDateSchema.optional(), // DB default: sysdatetimeoffset()
	modifiedOnDt: IsoDateSchema.nullable().optional(),

	// ========================================
	// DEPTH FIELDS (validate range)
	// ========================================
	depthFrom: DepthSchema,
	depthTo: DepthSchema,
	midpoint: DepthSchema.nullable().optional(),
	intervalLength: DepthSchema.nullable().optional(),

	// ========================================
	// PERCENTAGE FIELDS (validate range 0-100)
	// ========================================
	veinPct: z.number().min(0).max(100).nullable().optional(),
	vein1Pct: z.number().min(0).max(100).nullable().optional(),
	vein2Pct: z.number().min(0).max(100).nullable().optional(),
	vein3Pct: z.number().min(0).max(100).nullable().optional(),
	vein4Pct: z.number().min(0).max(100).nullable().optional(),
	vein5Pct: z.number().min(0).max(100).nullable().optional(),
	vein6Pct: z.number().min(0).max(100).nullable().optional(),
	msvnPct: z.number().min(0).max(100).nullable().optional(),
	otherPct: z.number().min(0).max(100).nullable().optional(),

	// ========================================
	// THICKNESS FIELDS (validate range)
	// ========================================
	vein1ThicknessCm: z.number().min(0).nullable().optional(),
	vein2ThicknessCm: z.number().min(0).nullable().optional(),
	vein3ThicknessCm: z.number().min(0).nullable().optional(),
	vein4ThicknessCm: z.number().min(0).nullable().optional(),
	vein5ThicknessCm: z.number().min(0).nullable().optional(),
	vein6ThicknessCm: z.number().min(0).nullable().optional(),
	msvnThicknessCm: z.number().min(0).nullable().optional(),

	// ========================================
	// LOOKUP REFERENCES (string codes)
	// ========================================
	organization: z.string().min(1, ErrorMessages.REQUIRED).max(30),

	// Optional lookup references
	weathering: z.string().max(50).nullable().optional(),
	colour: z.string().max(50).nullable().optional(),
	grainSize: z.string().max(50).nullable().optional(),
	structure: z.string().max(50).nullable().optional(),
	texture: z.string().max(50).nullable().optional(),
	contactRelation: z.string().max(50).nullable().optional(),
	clastDistribution: z.string().max(50).nullable().optional(),
	clastComp: z.string().max(50).nullable().optional(),
	matrixComp: z.string().max(50).nullable().optional(),
	lithology: z.string().max(50).nullable().optional(),
	cOMPGRP: z.string().max(50).nullable().optional(),
	cOMPGRPLookup: z.string().max(50).nullable().optional(),
	protolith: z.string().max(50).nullable().optional(),
	matrixCompSecondary: z.string().max(50).nullable().optional(),
	gLVC3TSource: z.string().max(50).nullable().optional(),
	contactTag: z.string().max(50).nullable().optional(),
	lithoSuperGr: z.string().max(50).nullable().optional(),
	veinMode: z.string().max(50).nullable().optional(),
	veinMin: z.string().max(50).nullable().optional(),
	veinText: z.string().max(50).nullable().optional(),
	typeMsvn: z.string().max(50).nullable().optional(),
	poMud: z.string().max(50).nullable().optional(),
	altAlbite: z.string().max(50).nullable().optional(),
	altBiotite: z.string().max(50).nullable().optional(),
	altCarbonate: z.string().max(50).nullable().optional(),
	altChlorite: z.string().max(50).nullable().optional(),
	altEpidote: z.string().max(50).nullable().optional(),
	altHematite: z.string().max(50).nullable().optional(),
	altLimonite: z.string().max(50).nullable().optional(),
	altMagnetite: z.string().max(50).nullable().optional(),
	altPyrite: z.string().max(50).nullable().optional(),
	altSericite: z.string().max(50).nullable().optional(),
	altSilica: z.string().max(50).nullable().optional(),
	mag: z.string().max(50).nullable().optional(),
	cD: z.string().max(50).nullable().optional(),
	cF: z.string().max(50).nullable().optional(),
	aC: z.string().max(50).nullable().optional(),
	sC: z.string().max(50).nullable().optional(),
	cA: z.string().max(50).nullable().optional(),
	sI: z.string().max(50).nullable().optional(),
	tUR: z.string().max(50).nullable().optional(),
	sE: z.string().max(50).nullable().optional(),
	gR: z.string().max(50).nullable().optional(),
	q: z.string().max(50).nullable().optional(),
	py: z.string().max(50).nullable().optional(),
	pyMode1: z.string().max(50).nullable().optional(),
	pyMode2: z.string().max(50).nullable().optional(),
	pyGr: z.string().max(50).nullable().optional(),
	pyMode: z.string().max(50).nullable().optional(),
	cp: z.string().max(50).nullable().optional(),
	po: z.string().max(50).nullable().optional(),
	aPY: z.string().max(50).nullable().optional(),
	other: z.string().max(50).nullable().optional(),

	// ========================================
	// NUMERIC FIELDS (validate range)
	// ========================================
	gLVC: z.number().int().min(0).max(999).nullable().optional(),
	minPot: z.number().int().min(0).max(999).nullable().optional(),
	qC: z.number().min(0).max(100).nullable().optional(),
	pQC: z.number().min(0).max(100).nullable().optional(),
	qPC: z.number().min(0).max(100).nullable().optional(),
	bQP: z.number().min(0).max(100).nullable().optional(),
	qT: z.number().min(0).max(100).nullable().optional(),

	// ========================================
	// OPTIONAL TEXT FIELDS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 4000 chars (actually -1 = max in DB)
	validationErrors: z.string().max(4000).nullable().optional(),
	jsonData: z.string().max(-1).nullable().optional(),

	// ========================================
	// MIGRATION FIELDS
	// ========================================
	migrationRv: z.any().nullable().optional(), // varbinary
	migrationID: z.number().int().nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)
});

/**
 * Geology Database Schema Type
 */
export type GeologyDbInput = z.input<typeof GeologyDbSchema>;
export type GeologyDbOutput = z.output<typeof GeologyDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * Geology Business Schema (Tier 2)
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
 * - Depth relationships (depthFrom < depthTo)
 * - Percentage consistency (vein percentages should sum to reasonable values)
 * - Thickness consistency (vein thickness should be reasonable)
 * - Date reasonableness checks
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. DepthFrom must be less than DepthTo
 * 2. If midpoint is provided, it should be between depthFrom and depthTo
 * 3. If intervalLength is provided, it should equal depthTo - depthFrom
 * 4. Vein percentages should be consistent (sum should not exceed 100%)
 * 5. Vein thickness should be reasonable (not exceed interval length)
 * 6. Date reasonableness checks (mining era: after 1980, not too far future)
 * 7. Comments should be provided for incomplete records
 */
export const GeologyBusinessSchema = GeologyDbSchema
	.refine(
		(data) => {
			// Business Rule 1: DepthFrom must be less than DepthTo
			return data.depthFrom < data.depthTo;
		},
		{
			message: "DepthFrom must be less than DepthTo",
			path: ["depthFrom"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 2: If midpoint is provided, it should be between depthFrom and depthTo
			if (data.midpoint !== undefined && data.midpoint !== null) {
				return data.midpoint >= data.depthFrom && data.midpoint <= data.depthTo;
			}
			return true;
		},
		{
			message: "Midpoint must be between depthFrom and depthTo",
			path: ["midpoint"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: If intervalLength is provided, it should equal depthTo - depthFrom
			if (data.intervalLength !== undefined && data.intervalLength !== null) {
				const expectedLength = data.depthTo - data.depthFrom;
				return Math.abs(data.intervalLength - expectedLength) < 0.01; // Allow small floating point errors
			}
			return true;
		},
		{
			message: "Interval length should equal depthTo - depthFrom",
			path: ["intervalLength"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Vein percentages should be consistent (sum should not exceed 100%)
			const veinPercents = [
				data.vein1Pct,
				data.vein2Pct,
				data.vein3Pct,
				data.vein4Pct,
				data.vein5Pct,
				data.vein6Pct,
				data.msvnPct,
			].filter(pct => pct !== undefined && pct !== null);

			if (veinPercents.length > 0) {
				const total = veinPercents.reduce((sum, pct) => sum + pct, 0);
				return total <= 100;
			}
			return true;
		},
		{
			message: "Total vein percentages should not exceed 100%",
			path: ["vein1Pct"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 5: Vein thickness should be reasonable (not exceed interval length)
			const intervalLength = data.intervalLength || (data.depthTo - data.depthFrom);
			const veinThicknesses = [
				data.vein1ThicknessCm,
				data.vein2ThicknessCm,
				data.vein3ThicknessCm,
				data.vein4ThicknessCm,
				data.vein5ThicknessCm,
				data.vein6ThicknessCm,
				data.msvnThicknessCm,
			].filter(thickness => thickness !== undefined && thickness !== null);

			return veinThicknesses.every(thickness => thickness <= intervalLength);
		},
		{
			message: "Vein thickness should not exceed interval length",
			path: ["vein1ThicknessCm"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Date reasonableness - logged date after 1980
			if (data.loggedDt) {
				const loggedDate = data.loggedDt instanceof Date
					? data.loggedDt
					: new Date(data.loggedDt);

				const minDate = new Date("1980-01-01"); // Modern mining era
				return loggedDate >= minDate;
			}
			return true;
		},
		{
			message: "Logged date must be after 1980 (modern mining era)",
			path: ["loggedDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: Date reasonableness - logged date not too far in future (7 days)
			if (data.loggedDt) {
				const loggedDate = data.loggedDt instanceof Date
					? data.loggedDt
					: new Date(data.loggedDt);

				const maxDate = new Date();
				maxDate.setDate(maxDate.getDate() + 7); // Allow 7 days future for planning
				return loggedDate <= maxDate;
			}
			return true;
		},
		{
			message: "Logged date cannot be more than 7 days in the future",
			path: ["loggedDt"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Comments should be provided for incomplete records
			const hasGeologyData = data.lithology
			  || data.weathering
			  || data.colour
			  || data.grainSize
			  || data.structure
			  || data.texture;

			if (!hasGeologyData && !data.comments) {
				return false;
			}
			return true;
		},
		{
			message: "Comments should be provided when no geology data is present",
			path: ["comments"],
		},
	);

/**
 * Geology Business Schema Type
 */
export type GeologyBusinessInput = z.input<typeof GeologyBusinessSchema>;
export type GeologyBusinessOutput = z.output<typeof GeologyBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate Geology (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data Geology data to validate
 * @returns Validated and typed geology data
 * @throws {Error} If validation fails
 */
export const validateGeologyDb = createThrowingValidator(GeologyDbSchema, "Geology");

/**
 * Safe Validate Geology (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data Geology data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateGeologyDb = createSafeValidator(GeologyDbSchema);

/**
 * Is Valid Geology (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches GeologyDbSchema
 */
export const isValidGeologyDb = createTypeGuard(GeologyDbSchema);

/**
 * Validate Geology (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data Geology data to validate
 * @returns Validated and typed geology data
 * @throws {Error} If validation fails
 */
export const validateGeologyBusiness = createThrowingValidator(GeologyBusinessSchema, "Geology");

/**
 * Safe Validate Geology (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data Geology data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateGeologyBusiness = createSafeValidator(GeologyBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve Geology
 *
 * Checks if a geology record can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have collarId and loggingEventId
 * 4. Must have organization
 * 5. Must have depthFrom and depthTo
 * 6. Must have at least some geology data or comments
 *
 * @param data Geology data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveGeology(geologyData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveGeology(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = GeologyBusinessSchema.safeParse(data);

	if (!businessResult.success) {
		return {
			canApprove: false,
			errors: [formatZodErrors(businessResult.error)],
		};
	}

	const geology = businessResult.data;
	const errors: string[] = [];

	// Check status allows approval
	if (!canApproveStatus(geology.rowStatus || RowStatusValues.DRAFT)) {
		errors.push("Geology record must be in review status to be approved");
	}

	// Check required fields for approval
	if (!geology.collarId) {
		errors.push("Collar ID is required for approval");
	}

	if (!geology.loggingEventId) {
		errors.push("Logging event ID is required for approval");
	}

	if (!geology.organization) {
		errors.push("Organization is required for approval");
	}

	if (!geology.depthFrom || !geology.depthTo) {
		errors.push("Depth from and depth to are required for approval");
	}

	// Check that at least some geology data is provided
	const hasGeologyData = geology.lithology
	  || geology.weathering
	  || geology.colour
	  || geology.grainSize
	  || geology.structure
	  || geology.texture
	  || geology.comments;

	if (!hasGeologyData) {
		errors.push("At least some geology data or comments are required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate Geology For Review
 *
 * Checks if a geology record is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data Geology data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateGeologyForReview(geologyData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateGeologyForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = GeologyDbSchema.safeParse(data);

	if (!dbResult.success) {
		return createErrorResult([formatZodErrors(dbResult.error)]);
	}

	const geology = dbResult.data;
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check minimum required fields for review
	if (!geology.organization) {
		errors.push("Organization is required for review");
	}

	if (!geology.collarId) {
		errors.push("Collar ID is required for review");
	}

	if (!geology.loggingEventId) {
		errors.push("Logging event ID is required for review");
	}

	if (!geology.depthFrom) {
		errors.push("Depth from is required for review");
	}

	if (!geology.depthTo) {
		errors.push("Depth to is required for review");
	}

	// Warnings (not blocking)
	if (!geology.lithology) {
		warnings.push("Lithology should be specified when available");
	}

	if (!geology.weathering) {
		warnings.push("Weathering should be specified when available");
	}

	if (!geology.colour) {
		warnings.push("Colour should be specified when available");
	}

	if (!geology.comments) {
		warnings.push("Comments should be provided when available");
	}

	if (errors.length > 0) {
		return createErrorResult(errors);
	}

	return createSuccessResult(geology, warnings);
}

/**
 * Get Geology Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data Geology data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getGeologyValidationReport(geologyData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getGeologyValidationReport(data: unknown): {
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
	const dbResult = GeologyDbSchema.safeParse(data);
	const businessResult = GeologyBusinessSchema.safeParse(data);
	const approvalCheck = canApproveGeology(data);
	const reviewCheck = validateGeologyForReview(data);

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
export type { GeologyCombinedLogInsertRecord } from "../tables/geologycombinedlog/schema";

/**
 * Validated Geology types (after schema validation)
 */
export type ValidatedGeologyDb = GeologyDbOutput;
export type ValidatedGeologyBusiness = GeologyBusinessOutput;
