/**
 * Enum Schema Validators
 *
 * Defines enumerated values for status fields, flags, and other categorical data.
 * These enums provide type-safe validation and clear documentation of allowed values.
 *
 * @module schema-helpers/enums
 */

import { z } from "zod";

// ========================================
// ROW STATUS
// ========================================

/**
 * Row Status Enum
 *
 * Represents the workflow status of a record.
 * Used across all tables that support status-based workflows.
 *
 * **Values**:
 * - `0`: Draft - Initial creation, being edited
 * - `1`: Completed - Ready for review by senior geologist
 * - `2`: Reviewed - Reviewed by senior geologist
 * - `3`: Approved - Reviewed and approved for use
 * - `4`: Superseded - Replaced by newer version
 * - `99`: Imported - Data imported from external source
 * - `255`: Rejected - Reviewed and rejected, requires fixes
 *
 * **Typical Workflow**:
 * ```
 * Draft (0) → Completed (1) → Reviewed (2) → Approved (3)
 *                                          ↘ Rejected (255) → Draft (0)
 * Approved (3) → Superseded (4) [when new version created]
 * Imported (99) → Draft (0) or Completed (1)
 * ```
 */
export const RowStatusEnumValidator = z.enum(["0", "1", "2", "3", "4"]).transform(val => Number.parseInt(val, 10));

/**
 * Row Status as number (for type inference)
 */
export const RowStatusNumberEnum = z.number().int().min(0).max(4);

/**
 * RowStatusEnum - The canonical enum for row status values
 * Use this for type-safe status handling across the application
 */
export enum RowStatusEnum {
	DRAFT = 0,
	COMPLETED = 1,
	REVIEWED = 2,
	APPROVED = 3,
	SUPERSEDED = 4,
	IMPORTED = 99,
	REJECTED = 255,
}

/**
 * Row Status Type
 */
export type RowStatus = z.infer<typeof RowStatusNumberEnum>;

/**
 * Row Status Constants
 */
export const RowStatusValues = {
	DRAFT: 0,
	COMPLETED: 1,
	REVIEWED: 2,
	APPROVED: 3,
	SUPERSEDED: 4,
	IMPORTED: 99,
	REJECTED: 255,
} as const;

/**
 * Row Status Labels (for UI display)
 */
export const RowStatusLabels: Record<number, string> = {
	[RowStatusValues.DRAFT]: "Draft",
	[RowStatusValues.COMPLETED]: "Completed",
	[RowStatusValues.REVIEWED]: "Reviewed",
	[RowStatusValues.APPROVED]: "Approved",
	[RowStatusValues.SUPERSEDED]: "Superseded",
	[RowStatusValues.IMPORTED]: "Imported",
	[RowStatusValues.REJECTED]: "Rejected",
};

// ========================================
// VALIDATION STATUS
// ========================================

/**
 * Validation Status Enum
 *
 * Indicates the validation state of a record.
 *
 * **Values**:
 * - `0`: Valid - Passes all validation checks
 * - `1`: Warning - Has warnings but can be saved
 * - `2`: Error - Has errors, cannot be approved
 *
 * **Usage**:
 * - Valid (0): Ready for approval
 * - Warning (1): Can save but review warnings
 * - Error (2): Must fix errors before approval
 */
export const ValidationStatusEnum = z.enum(["0", "1", "2"]).transform(val => Number.parseInt(val, 10));

/**
 * Validation Status as number
 */
export const ValidationStatusNumberEnum = z.number().int().min(0).max(2);

/**
 * Validation Status Type
 */
export type ValidationStatus = z.infer<typeof ValidationStatusNumberEnum>;

/**
 * Validation Status Constants
 */
export const ValidationStatusValues = {
	VALID: 0,
	WARNING: 1,
	ERROR: 2,
} as const;

/**
 * Validation Status Labels
 */
export const ValidationStatusLabels: Record<number, string> = {
	[ValidationStatusValues.VALID]: "Valid",
	[ValidationStatusValues.WARNING]: "Warning",
	[ValidationStatusValues.ERROR]: "Error",
};

// ========================================
// APPROVAL STATUS
// ========================================

/**
 * Approval Status Enum
 *
 * Represents the approval state for critical records.
 * Similar to RowStatus but focused on approval workflow.
 *
 * **Values**:
 * - `0`: Not Submitted - Not yet submitted for approval
 * - `1`: Pending Approval - Waiting for approval
 * - `2`: Approved - Approved by authorized person
 * - `3`: Rejected - Rejected, needs revision
 */
export const ApprovalStatusEnum = z.enum(["0", "1", "2", "3"]).transform(val => Number.parseInt(val, 10));

/**
 * Approval Status as number
 */
export const ApprovalStatusNumberEnum = z.number().int().min(0).max(3);

/**
 * Approval Status Type
 */
export type ApprovalStatus = z.infer<typeof ApprovalStatusNumberEnum>;

/**
 * Approval Status Constants
 */
export const ApprovalStatusValues = {
	NOT_SUBMITTED: 0,
	PENDING: 1,
	APPROVED: 2,
	REJECTED: 3,
} as const;

/**
 * Approval Status Labels
 */
export const ApprovalStatusLabels: Record<number, string> = {
	[ApprovalStatusValues.NOT_SUBMITTED]: "Not Submitted",
	[ApprovalStatusValues.PENDING]: "Pending Approval",
	[ApprovalStatusValues.APPROVED]: "Approved",
	[ApprovalStatusValues.REJECTED]: "Rejected",
};

// ========================================
// ACTIVE INDICATOR
// ========================================

/**
 * Active Indicator Enum
 *
 * Boolean flag indicating if a record is active.
 *
 * **Values**:
 * - `true` (1): Active - Record is in use
 * - `false` (0): Inactive - Record is archived/deleted
 *
 * **Usage**:
 * - Use for soft delete functionality
 * - Filter inactive records from UI
 * - Maintain referential integrity
 */
export const ActiveIndEnum = z.boolean();

/**
 * Active Indicator Type
 */
export type ActiveInd = z.infer<typeof ActiveIndEnum>;

// ========================================
// BOOLEAN FLAGS
// ========================================

/**
 * Report Include Indicator
 *
 * Indicates if a record should be included in reports.
 */
export const ReportIncludeIndEnum = z.boolean();

/**
 * Model Use Indicator
 *
 * Indicates if data should be used in geological models.
 */
export const ModelUseIndEnum = z.boolean();

/**
 * Approved Indicator
 *
 * Boolean approval flag (simple approval, not workflow-based).
 */
export const ApprovedIndEnum = z.boolean();

/**
 * Default Indicator
 *
 * Marks a record as the default choice in a lookup table.
 */
export const IsDefaultIndEnum = z.boolean();

// ========================================
// HOLE STATUS (Specific to Collar)
// ========================================

/**
 * Hole Status Enum Values
 *
 * Common hole status codes used in the industry.
 * These should match the HoleStatus lookup table.
 */
export const HoleStatusCodes = {
	DRAFT: "DRAFT",
	PLANNED: "PLANNED",
	IN_PROGRESS: "IN_PROGRESS",
	COMPLETED: "COMPLETED",
	ABANDONED: "ABANDONED",
	SUSPENDED: "SUSPENDED",
	STOPPED: "STOPPED",
	ON_HOLD: "ON_HOLD",
	CANCELLED: "CANCELLED",
	INACCESSIBLE: "INACCESSIBLE",
} as const;

/**
 * Hole Status Type
 */
export type HoleStatusCode = typeof HoleStatusCodes[keyof typeof HoleStatusCodes];

// ========================================
// DRILL PLAN STATUS
// ========================================

/**
 * Drill Plan Status Enum Values
 *
 * Status codes for drill plan workflow.
 */
export const DrillPlanStatusCodes = {
	DRAFT: "DRAFT",
	SUBMITTED: "SUBMITTED",
	APPROVED: "APPROVED",
	IN_PROGRESS: "IN_PROGRESS",
	COMPLETED: "COMPLETED",
	CANCELLED: "CANCELLED",
} as const;

/**
 * Drill Plan Status Type
 */
export type DrillPlanStatusCode = typeof DrillPlanStatusCodes[keyof typeof DrillPlanStatusCodes];

// ========================================
// SAMPLE QC TYPE
// ========================================

/**
 * Sample QC Type Enum
 *
 * Types of QC samples used in assay quality control.
 */
export const SampleQCTypes = {
	BLANK: "BLANK",
	STANDARD: "STANDARD",
	DUPLICATE: "DUPLICATE",
	FIELD_DUPLICATE: "FIELD_DUPLICATE",
	PREP_DUPLICATE: "PREP_DUPLICATE",
	PULP_DUPLICATE: "PULP_DUPLICATE",
} as const;

/**
 * Sample QC Type
 */
export type SampleQCType = typeof SampleQCTypes[keyof typeof SampleQCTypes];

// ========================================
// DATA SOURCE
// ========================================

/**
 * Data Source Enum
 *
 * Indicates the source/origin of data.
 */
export const DataSourceTypes = {
	FIELD: "FIELD",
	IMPORT: "IMPORT",
	LEGACY: "LEGACY",
	MANUAL: "MANUAL",
	AUTO: "AUTO",
	SYNC: "SYNC",
} as const;

/**
 * Data Source Type
 */
export type DataSourceType = typeof DataSourceTypes[keyof typeof DataSourceTypes];

// ========================================
// VALIDATION HELPERS
// ========================================

/**
 * Status Transition Validator
 *
 * Validates that a status transition is allowed.
 *
 * **Allowed transitions for RowStatus**:
 * - Draft (0) → Completed (1)
 * - Completed (1) → Reviewed (2), Rejected (255), or back to Draft (0)
 * - Reviewed (2) → Approved (3), Rejected (255), or back to Draft (0)
 * - Approved (3) → Superseded (4)
 * - Rejected (255) → Draft (0)
 * - Imported (99) → Draft (0) or Completed (1)
 * - Superseded (4) → No transitions allowed
 *
 * @param from Current status
 * @param to New status
 * @returns true if transition is allowed
 */
export function isValidStatusTransition(from: RowStatus, to: RowStatus): boolean {
	const validTransitions: Record<RowStatus, RowStatus[]> = {
		[RowStatusValues.DRAFT]: [RowStatusValues.COMPLETED],
		[RowStatusValues.COMPLETED]: [RowStatusValues.DRAFT, RowStatusValues.REVIEWED, RowStatusValues.REJECTED],
		[RowStatusValues.REVIEWED]: [RowStatusValues.DRAFT, RowStatusValues.APPROVED, RowStatusValues.REJECTED],
		[RowStatusValues.APPROVED]: [RowStatusValues.SUPERSEDED],
		[RowStatusValues.REJECTED]: [RowStatusValues.DRAFT],
		[RowStatusValues.SUPERSEDED]: [], // No transitions from superseded
		[RowStatusValues.IMPORTED]: [RowStatusValues.DRAFT, RowStatusValues.COMPLETED],
	};

	return validTransitions[from]?.includes(to) ?? false;
}

/**
 * Get Valid Next Statuses
 *
 * Returns the list of valid next statuses from a given status.
 *
 * @param current Current status
 * @returns Array of valid next statuses
 */
export function getValidNextStatuses(current: RowStatus): RowStatus[] {
	const validTransitions: Record<RowStatus, RowStatus[]> = {
		[RowStatusValues.DRAFT]: [RowStatusValues.COMPLETED],
		[RowStatusValues.COMPLETED]: [RowStatusValues.DRAFT, RowStatusValues.REVIEWED, RowStatusValues.REJECTED],
		[RowStatusValues.REVIEWED]: [RowStatusValues.DRAFT, RowStatusValues.APPROVED, RowStatusValues.REJECTED],
		[RowStatusValues.APPROVED]: [RowStatusValues.SUPERSEDED],
		[RowStatusValues.REJECTED]: [RowStatusValues.DRAFT],
		[RowStatusValues.SUPERSEDED]: [],
		[RowStatusValues.IMPORTED]: [RowStatusValues.DRAFT, RowStatusValues.COMPLETED],
	};

	return validTransitions[current] ?? [];
}

/**
 * Can Submit for Review
 *
 * Checks if a record can be submitted for review based on status.
 *
 * @param status Current row status
 * @returns true if can submit for review
 */
export function canSubmitForReview(status: RowStatus): boolean {
	return status === RowStatusValues.DRAFT || status === RowStatusValues.COMPLETED || status === RowStatusValues.REJECTED;
}

/**
 * Can Approve
 *
 * Checks if a record can be approved based on status.
 *
 * @param status Current row status
 * @returns true if can approve
 */
export function canApprove(status: RowStatus): boolean {
	return status === RowStatusValues.REVIEWED;
}

/**
 * Is Editable
 *
 * Checks if a record can be edited based on status.
 *
 * @param status Current row status
 * @returns true if editable
 */
export function isEditable(status: RowStatus): boolean {
	return status === RowStatusValues.DRAFT || status === RowStatusValues.REJECTED;
}

/**
 * Is Final
 *
 * Checks if a record is in a final state (cannot be edited).
 *
 * @param status Current row status
 * @returns true if final
 */
export function isFinal(status: RowStatus): boolean {
	return status === RowStatusValues.APPROVED || status === RowStatusValues.SUPERSEDED;
}

// ========================================
// EXPORTS
// ========================================

/**
 * All enum schemas for easy import
 */
export const EnumSchemas = {
	RowStatus: RowStatusNumberEnum,
	RowStatusValidator: RowStatusEnumValidator,
	ValidationStatus: ValidationStatusNumberEnum,
	ApprovalStatus: ApprovalStatusNumberEnum,
	ActiveInd: ActiveIndEnum,
	ReportIncludeInd: ReportIncludeIndEnum,
	ModelUseInd: ModelUseIndEnum,
	ApprovedInd: ApprovedIndEnum,
	IsDefaultInd: IsDefaultIndEnum,
} as const;

/**
 * All enum constants for easy import
 */
export const EnumValues = {
	RowStatus: RowStatusValues,
	ValidationStatus: ValidationStatusValues,
	ApprovalStatus: ApprovalStatusValues,
	HoleStatus: HoleStatusCodes,
	DrillPlanStatus: DrillPlanStatusCodes,
	SampleQCTypes,
	DataSourceTypes,
} as const;

/**
 * All enum labels for easy import
 */
export const EnumLabels = {
	RowStatus: RowStatusLabels,
	ValidationStatus: ValidationStatusLabels,
	ApprovalStatus: ApprovalStatusLabels,
} as const;
