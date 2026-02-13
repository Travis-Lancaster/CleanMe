/**
 * GeologyCombinedLog Business Validation
 *
 * Two-tier validation for GeologyCombinedLog table:
 * - Tier 1: Database schema with type refinements
 * - Tier 2: Business rules and cross-field validation
 *
 * **Migrated from**: `src/data/domain/geology/geologyLog.repo.ts`
 * **Preserves**: All existing business rules and approval logic
 *
 * **Usage**:
 * ```typescript
 * import { validateGeologyCombinedLogDb, validateGeologyCombinedLogBusiness } from './geologycombinedlog.business';
 *
 * // Database validation (always use)
 * const validData = validateGeologyCombinedLogDb(data);
 * await db.geologyCombinedLogs.put(validData);
 *
 * // Business validation (for approval)
 * const approvalReady = validateGeologyCombinedLogBusiness(data);
 * ```
 *
 * @module extensions/geologycombinedlog
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
 * GeologyCombinedLog Database Schema (Tier 1)
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
export const GeologyCombinedLogDbSchema = GeologyCombinedLogTableInsertBaseSchema.extend({
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
	vein1ThicknessCm: DepthSchema.nullable().optional(),
	vein2ThicknessCm: DepthSchema.nullable().optional(),
	vein3ThicknessCm: DepthSchema.nullable().optional(),
	vein4ThicknessCm: DepthSchema.nullable().optional(),
	vein5ThicknessCm: DepthSchema.nullable().optional(),
	vein6ThicknessCm: DepthSchema.nullable().optional(),
	msvnThicknessCm: DepthSchema.nullable().optional(),

	// ========================================
	// PERCENTAGE FIELDS
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
	qC: z.number().min(0).max(100).nullable().optional(),
	pQC: z.number().min(0).max(100).nullable().optional(),
	qPC: z.number().min(0).max(100).nullable().optional(),
	bQP: z.number().min(0).max(100).nullable().optional(),
	qT: z.number().min(0).max(100).nullable().optional(),

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
	// OPTIONAL TEXT FIELDS
	// ========================================
	comments: CommentsSchema.nullable().optional(), // max 4000 chars (actually -1 = max in DB)
	validationErrors: z.string().max(4000).nullable().optional(),
	jsonData: z.string().max(-1).nullable().optional(),

	// ========================================
	// AUDIT FIELDS
	// ========================================
	createdBy: z.string().max(50).optional(), // DB default: session_context or suser_sname
	modifiedBy: z.string().max(50).nullable().optional(),
	rv: z.date(), // timestamp (rowversion for optimistic locking)

	// ========================================
	// MIGRATION FIELDS (legacy)
	// ========================================
	migrationRv: z.any().nullable().optional(), // binary
	migrationID: z.number().int().nullable().optional(),
});

/**
 * GeologyCombinedLog Database Schema Type
 */
export type GeologyCombinedLogDbInput = z.input<typeof GeologyCombinedLogDbSchema>;
export type GeologyCombinedLogDbOutput = z.output<typeof GeologyCombinedLogDbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

/**
 * GeologyCombinedLog Business Schema (Tier 2)
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
 * - Depth relationships (depthFrom < depthTo, midpoint calculation)
 * - Percentage validation (vein percentages, QC values)
 * - Vein thickness consistency
 * - Completeness for different workflows
 *
 * **Business Rules** (from original manual schema):
 * 1. DepthFrom must be less than DepthTo
 * 2. Midpoint should be calculated as (depthFrom + depthTo) / 2
 * 3. IntervalLength should be calculated as depthTo - depthFrom
 * 4. Vein percentages should sum to reasonable values
 * 5. Vein thickness should be consistent with interval length
 * 6. QC values should be within expected ranges
 * 7. Date reasonableness checks
 */
export const GeologyCombinedLogBusinessSchema = GeologyCombinedLogDbSchema
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
			// Business Rule 2: Midpoint should be calculated as (depthFrom + depthTo) / 2
			if (data.midpoint !== undefined && data.midpoint !== null) {
				const expectedMidpoint = (data.depthFrom + data.depthTo) / 2;
				return Math.abs(data.midpoint - expectedMidpoint) < 0.01; // Allow small floating point errors
			}
			return true;
		},
		{
			message: "Midpoint should be calculated as (depthFrom + depthTo) / 2",
			path: ["midpoint"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 3: IntervalLength should be calculated as depthTo - depthFrom
			if (data.intervalLength !== undefined && data.intervalLength !== null) {
				const expectedIntervalLength = data.depthTo - data.depthFrom;
				return Math.abs(data.intervalLength - expectedIntervalLength) < 0.01; // Allow small floating point errors
			}
			return true;
		},
		{
			message: "IntervalLength should be calculated as depthTo - depthFrom",
			path: ["intervalLength"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 4: Vein percentages should sum to reasonable values
			const veinPcts = [
				data.vein1Pct,
				data.vein2Pct,
				data.vein3Pct,
				data.vein4Pct,
				data.vein5Pct,
				data.vein6Pct,
				data.msvnPct,
				data.otherPct,
			].filter(pct => pct !== undefined && pct !== null);

			if (veinPcts.length > 0) {
				const sum = veinPcts.reduce((acc, pct) => acc + pct, 0);
				return sum <= 100; // Total vein percentages should not exceed 100%
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
			// Business Rule 5: Vein thickness should be consistent with interval length
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

			if (veinThicknesses.length > 0) {
				const totalThickness = veinThicknesses.reduce((acc, thickness) => acc + thickness, 0);
				// Allow some tolerance for measurement errors
				return totalThickness <= (intervalLength * 100) + 5; // Convert meters to cm with 5cm tolerance
			}
			return true;
		},
		{
			message: "Total vein thickness should not exceed interval length",
			path: ["vein1ThicknessCm"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 6: QC values should be within expected ranges
			const qcValues = [data.qC, data.pQC, data.qPC, data.bQP, data.qT].filter(qc => qc !== undefined && qc !== null);

			if (qcValues.length > 0) {
				// QC values should generally be between 0 and 100
				return qcValues.every(qc => qc >= 0 && qc <= 100);
			}
			return true;
		},
		{
			message: "QC values should be between 0 and 100",
			path: ["qC"],
		},
	)
	.refine(
		(data) => {
			// Business Rule 7: Date reasonableness - logged date after 1980
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
			// Business Rule 7: Date reasonableness - not too far in future (7 days)
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
	);

/**
 * GeologyCombinedLog Business Schema Type
 */
export type GeologyCombinedLogBusinessInput = z.input<typeof GeologyCombinedLogBusinessSchema>;
export type GeologyCombinedLogBusinessOutput = z.output<typeof GeologyCombinedLogBusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

/**
 * Validate GeologyCombinedLog (Database Schema)
 *
 * Throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param data GeologyCombinedLog data to validate
 * @returns Validated and typed geology combined log data
 * @throws {Error} If validation fails
 */
export const validateGeologyCombinedLogDb = createThrowingValidator(GeologyCombinedLogDbSchema, "GeologyCombinedLog");

/**
 * Safe Validate GeologyCombinedLog (Database Schema)
 *
 * Returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param data GeologyCombinedLog data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateGeologyCombinedLogDb = createSafeValidator(GeologyCombinedLogDbSchema);

/**
 * Is Valid GeologyCombinedLog (Database Schema)
 *
 * TypeScript type guard.
 *
 * @param data Data to check
 * @returns true if data matches GeologyCombinedLogDbSchema
 */
export const isValidGeologyCombinedLogDb = createTypeGuard(GeologyCombinedLogDbSchema);

/**
 * Validate GeologyCombinedLog (Business Schema)
 *
 * Throws on validation failure.
 * Use for approval workflows and quality checks.
 *
 * @param data GeologyCombinedLog data to validate
 * @returns Validated and typed geology combined log data
 * @throws {Error} If validation fails
 */
export const validateGeologyCombinedLogBusiness = createThrowingValidator(GeologyCombinedLogBusinessSchema, "GeologyCombinedLog");

/**
 * Safe Validate GeologyCombinedLog (Business Schema)
 *
 * Returns success/error object.
 *
 * @param data GeologyCombinedLog data to validate
 * @returns SafeParseReturnType with success/error
 */
export const safeValidateGeologyCombinedLogBusiness = createSafeValidator(GeologyCombinedLogBusinessSchema);

// ========================================
// APPROVAL HELPERS
// ========================================

/**
 * Can Approve GeologyCombinedLog
 *
 * Checks if a geology combined log can be approved based on:
 * - Business validation passes
 * - Status allows approval (In Review)
 * - Required fields for approval are present
 *
 * **Approval Requirements** (from original schema):
 * 1. Must pass all business validation
 * 2. Must be in Review status (rowStatus = 1)
 * 3. Must have collarId and loggingEventId
 * 4. Must have depthFrom and depthTo
 * 5. Must have loggedDt
 * 6. Must have organization
 *
 * @param data GeologyCombinedLog data to check
 * @returns Object with canApprove flag and error messages
 *
 * @example
 * ```typescript
 * const { canApprove, errors } = canApproveGeologyCombinedLog(geologyData);
 * if (!canApprove) {
 *   console.error("Cannot approve:", errors);
 * }
 * ```
 */
export function canApproveGeologyCombinedLog(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// First validate business schema
	const businessResult = GeologyCombinedLogBusinessSchema.safeParse(data);

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
		errors.push("Geology combined log must be in review status to be approved");
	}

	// Check required fields for approval
	if (!geology.collarId) {
		errors.push("Collar ID is required for approval");
	}

	if (!geology.loggingEventId) {
		errors.push("Logging event ID is required for approval");
	}

	if (!geology.depthFrom || !geology.depthTo) {
		errors.push("Depth from and depth to are required for approval");
	}

	if (!geology.loggedDt) {
		errors.push("Logged date is required for approval");
	}

	if (!geology.organization) {
		errors.push("Organization is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors,
	};
}

/**
 * Validate GeologyCombinedLog For Review
 *
 * Checks if a geology combined log is ready to be submitted for review.
 * Less strict than approval but ensures minimum data quality.
 *
 * @param data GeologyCombinedLog data to check
 * @returns ValidationResult with success/errors
 *
 * @example
 * ```typescript
 * const result = validateGeologyCombinedLogForReview(geologyData);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 * ```
 */
export function validateGeologyCombinedLogForReview(data: unknown): ValidationResult {
	// Validate database schema first
	const dbResult = GeologyCombinedLogDbSchema.safeParse(data);

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

	if (!geology.loggedDt) {
		errors.push("Logged date is required for review");
	}

	// Warnings (not blocking)
	if (!geology.lithology) {
		warnings.push("Lithology should be specified when available");
	}

	if (!geology.grainSize) {
		warnings.push("Grain size should be specified when available");
	}

	if (!geology.structure) {
		warnings.push("Structure should be specified when available");
	}

	if (!geology.texture) {
		warnings.push("Texture should be specified when available");
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
 * Get GeologyCombinedLog Validation Report
 *
 * Comprehensive validation report showing status of all validation tiers.
 * Useful for debugging and quality assurance.
 *
 * @param data GeologyCombinedLog data to validate
 * @returns Detailed validation report
 *
 * @example
 * ```typescript
 * const report = getGeologyCombinedLogValidationReport(geologyData);
 * console.log(`Database valid: ${report.databaseValid}`);
 * console.log(`Business valid: ${report.businessValid}`);
 * console.log(`Approval ready: ${report.approvalReady}`);
 * ```
 */
export function getGeologyCombinedLogValidationReport(data: unknown): {
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
	const dbResult = GeologyCombinedLogDbSchema.safeParse(data);
	const businessResult = GeologyCombinedLogBusinessSchema.safeParse(data);
	const approvalCheck = canApproveGeologyCombinedLog(data);
	const reviewCheck = validateGeologyCombinedLogForReview(data);

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
 * Validated GeologyCombinedLog types (after schema validation)
 */
export type ValidatedGeologyCombinedLogDb = GeologyCombinedLogDbOutput;
export type ValidatedGeologyCombinedLogBusiness = GeologyCombinedLogBusinessOutput;
