/**
 * DrillHole Type Definitions
 *
 * Core types and interfaces for the DrillHole aggregate root pattern.
 * Each section implements these contracts for consistency and reusability.
 */

import type { ValueType } from "#node_modules/motion/dist/react";
import { RowStatus } from "#src/features/shared/domain/row-status";

// ============================================================================
// RowStatus Enums and State Machine
// ============================================================================

export {
	RowStatus,
	RowStatusTransitions,
	canTransition,
	getAvailableTransitions,
	toRowStatus as convertApiRowStatus,
	getRowStatusDisplay,
} from "#src/features/shared/domain/row-status";

// ============================================================================
// Standard Row Metadata
// ============================================================================

/**
 * Standard metadata fields included in all drillhole data rows.
 * These fields track row lifecycle, validation, versioning, and audit trail.
 */
export interface StandardRowMetadata {
	/** Controls whether the row is included in reports and exports */
	ReportIncludeInd: boolean

	/** Validation status: 0=Unknown, 1=Passed, 2=Failed */
	ValidationStatus: 0 | 1 | 2

	/** Serialized Zod validation issues, null if no errors */
	ValidationErrors: string | null

	/** Current lifecycle status of the row */
	RowStatus: RowStatus

	/** UUID of the row that supersedes this one, null if not superseded */
	SupersededById: string | null

	/** Soft delete flag - false indicates the row is deleted but retained */
	ActiveInd: boolean

	/** Timestamp when the row was created */
	CreatedOnDt: Date

	/** User identifier who created the row */
	CreatedBy: string

	/** Timestamp when the row was last modified */
	ModifiedOnDt: Date

	/** User identifier who last modified the row */
	ModifiedBy: string

	/** Row version for optimistic concurrency control */
	rv: string
}

/**
 * Creates default metadata for a new row.
 * Sets sensible defaults for all required fields.
 *
 * @param createdBy - User identifier creating the row
 * @returns StandardRowMetadata with default values
 */
export function createEmptyMetadata(createdBy: string = "system"): StandardRowMetadata {
	const now = new Date();
	return {
		ReportIncludeInd: true,
		ValidationStatus: 0, // Unknown
		ValidationErrors: null,
		RowStatus: RowStatus.Draft,
		SupersededById: null,
		ActiveInd: true,
		CreatedOnDt: now,
		CreatedBy: createdBy,
		ModifiedOnDt: now,
		ModifiedBy: createdBy,
		rv: "1", // Initial row version
	};
}

/**
 * Validates that metadata object has all required fields with correct types.
 * Checks for presence and basic type correctness of metadata fields.
 *
 * @param metadata - Partial metadata object to validate
 * @returns true if metadata is valid, false otherwise
 */
export function isMetadataValid(metadata: Partial<StandardRowMetadata>): boolean {
	if (!metadata)
		return false;

	// Check required boolean fields
	if (typeof metadata.ReportIncludeInd !== "boolean")
		return false;
	if (typeof metadata.ActiveInd !== "boolean")
		return false;

	// Check ValidationStatus is valid
	if (metadata.ValidationStatus !== 0
		&& metadata.ValidationStatus !== 1
		&& metadata.ValidationStatus !== 2) {
		return false;
	}

	// Check ValidationErrors is string or null
	if (metadata.ValidationErrors !== null
		&& typeof metadata.ValidationErrors !== "string") {
		return false;
	}

	// Check RowStatus is valid enum value
	if (typeof metadata.RowStatus !== "number"
		|| ![0, 1, 2, 3, 4, 99, 255].includes(metadata.RowStatus)) {
		return false;
	}

	// Check SupersededById is string or null
	if (metadata.SupersededById !== null
		&& typeof metadata.SupersededById !== "string") {
		return false;
	}

	// Check date fields are Date objects
	if (!(metadata.CreatedOnDt instanceof Date))
		return false;
	if (!(metadata.ModifiedOnDt instanceof Date))
		return false;

	// Check user fields are strings
	if (typeof metadata.CreatedBy !== "string")
		return false;
	if (typeof metadata.ModifiedBy !== "string")
		return false;

	// Check row version is string
	if (typeof metadata.rv !== "string")
		return false;

	return true;
}

// ============================================================================
// Section Contract Interface
// ============================================================================

/**
 * Generic section interface that all DrillHole sections must implement.
 * Provides consistent API for data management, validation, and state.
 *
 * @template TData - The data type for this section
 * @template TValidation - The validation result type
 */
export interface DrillHoleSection<TData = any, TValidation = any> {
	/** Unique identifier for this section */
	sectionKey: string

	/** Current data for this section */
	data: TData

	/** Current validation state */
	validation: TValidation | null

	/** Current row status */
	rowStatus: RowStatus

	/** Tracks if section has unsaved changes */
	isDirty: boolean

	/** Tracks if section cache is stale (server has newer version) */
	isStale: boolean

	/** Row version for optimistic locking */
	rowVersion?: string

	/**
	 * Optional metadata for this section.
	 * Includes validation status, audit fields, and lifecycle tracking.
	 * Partial allows sections to only store relevant metadata fields.
	 */
	metadata?: Partial<StandardRowMetadata>

	// Data management
	getData: () => TData
	setData: (data: Partial<TData>) => void
	resetData: () => void

	// Status management
	getRowStatus: () => RowStatus
	setRowStatus: (status: RowStatus) => boolean

	// Validation
	validate: () => TValidation
	getValidationErrors: () => string[]
	isValid: () => boolean

	// State queries
	isEditable: () => boolean
	hasUnsavedChanges: () => boolean

	/**
	 * Get synchronization status.
	 * Returns sync status string (e.g., 'Synced', 'Pending', 'Error').
	 * Optional - not all sections implement sync tracking.
	 */
	getSyncStatus?: () => string

	// Metadata management
	/**
	 * Get current metadata for this section.
	 * Returns empty object if no metadata is set.
	 */
	getMetadata: () => Partial<StandardRowMetadata>

	/**
	 * Update metadata fields for this section.
	 * Merges provided metadata with existing metadata.
	 * @param metadata - Partial metadata to merge
	 */
	updateMetadata: (metadata: Partial<StandardRowMetadata>) => void

	// Dependencies (for cross-section updates)
	getDependencies: () => string[]
}

// ============================================================================
// Validation Result Types
// ============================================================================

/**
 * Standard validation error structure
 */
export interface ValidationError {
	field: string
	message: string
	code?: string
}

/**
 * Generic validation result
 */
export interface ValidationResult {
	isValid: boolean
	errors: ValidationError[]
	warnings?: ValidationError[]
}

// ============================================================================
// Section Keys (Enum for type safety)
// ============================================================================

export enum SectionKey {
	DrillPlan = "drillplan",
	Collar = "collar",
	CollarCoordinates = "collarcoordinates",
	RigSetup = "RigSetup",
	DrillMethod = "drillmethod",
	Survey = "survey",
	QuickLog = "quicklog",
	Logging = "logging",
	GeoCombinedLog = "geocombined",
	Sample = "sample",
	Dispatch = "dispatch",
	Qaqc = "qaqc",
	CycloneCleaning = "cyclonecleaning",
	ShearLog = "shearlog",
	StructureLog = "structurelog",
	CoreRecoveryRunLog = "corerecoveryrunlog",
	FractureCountLog = "fracturecountlog",
	MagSusLog = "magsuslog",
	RockMechanicLog = "rockmechaniclog",
	RockQualityDesignationLog = "rockqualitydesignationlog",
	SpecificGravityPtLog = "specificgravityptlog",
}

// ============================================================================
// Action Types
// ============================================================================

export type SectionAction
	= | "save"
	| "submit"
	| "reject"
	| "review"
	| "approve";

/**
 * Action result returned from section operations
 */
export interface ActionResult {
	success: boolean
	message?: string
	errors?: ValidationError[]
}

// ============================================================================
// Dexie Storage Types
// ============================================================================

/**
 * Section data as stored in Dexie
 */
export interface DrillHoleSectionData {
	id: string
	drillHoleId: string
	sectionKey: string
	data: any
	rowStatus: RowStatus
	rowVersion: string
	isDirty: boolean
	lastModified: Date
	createdAt: Date
	createdBy: string
	modifiedBy?: string
}

/**
 * Validation results as stored in Dexie
 */
export interface SectionValidationData {
	id: string
	drillHoleId: string
	sectionKey: string
	validationResult: ValidationResult
	timestamp: Date
}

/**
 * Outbox item for offline sync
 */
export interface SectionOutboxItem {
	id?: number
	drillHoleId: string
	sectionKey: string
	operation: "upsert"
	payload: any
	validationResults: ValidationResult
	rowVersion?: string
	timestamp: Date
	retryCount: number
	maxRetries: number
	nextRetryAt: Date
	error?: string
}

// ============================================================================
// Visual Indicator Types
// ============================================================================

export type SectionStatus
	= | "valid" // ✓ green - complete and valid
	| "invalid" // ! orange - has validation errors
	| "draft" // ○ gray - not started or in draft
	| "dirty" // * blue - has unsaved changes
	| "locked"; // 🔒 - approved, read-only

/**
 * Get visual status for a section
 */
export function getSectionStatus(section: DrillHoleSection): SectionStatus {
	if (section.rowStatus === RowStatus.Approved) {
		return "locked";
	}
	if (section.isDirty) {
		return "dirty";
	}
	if (!section.isValid()) {
		return "invalid";
	}
	if (section.rowStatus === RowStatus.Complete || section.rowStatus === RowStatus.Reviewed) {
		return "valid";
	}
	return "draft";
}

// ============================================================================
// Dispatch Data Types
// ============================================================================

/**
 * Lab Dispatch Data
 *
 * Represents a batch of samples dispatched to a laboratory for analysis.
 * Tracks dispatch details, sample manifest, analysis requests, and status.
 */
export interface LabDispatchData extends StandardRowMetadata {
	ProjectNm: ValueType
	RushInd: boolean | undefined
	PulpReturnAllInd: boolean | undefined
	PulpReturnAnomalousInd: boolean | undefined
	PulpReturnNoneInd: boolean | undefined
	RejectReturnAllInd: boolean | undefined
	RejectReturnAnomalousInd: boolean | undefined
	RejectReturnNoneInd: boolean | undefined
	ReturnAddress: string | number | bigint | readonly string[] | undefined
	CopyToAddress: string | number | bigint | readonly string[] | undefined
	InvoiceToAddress: string | number | bigint | readonly string[] | undefined
	AuthorizedSignature: ValueType
	FaxNotificationInd: boolean | undefined
	// Primary Key
	/** Unique identifier for this lab dispatch */
	LabDispatchId: string

	// Business Key
	/** Generated dispatch number (e.g., FEK_2025_0192) */
	DispatchNumber: string

	// Organization/Security
	/** Organization code for security filtering */
	Organization: string

	// Drill Hole Context (denormalized)
	/** Foreign key to Collar table */
	CollarId: string
	/** Hole name from drill plan */
	HoleNm: string
	/** Project name */
	Project?: string

	// Laboratory Details
	/** Laboratory code (foreign key to lookup) */
	LabCode: string
	/** Client code at laboratory */
	ClientCode?: string

	// Dispatch Details
	/** Date samples were dispatched (ISO date string) */
	DispatchedDt: string
	/** Person who submitted the dispatch */
	SubmittedBy: string
	/** Courier or shipping company name */
	CourierName?: string
	/** Waybill or tracking number */
	WaybillNo?: string
	/** Laboratory work order number */
	WorkorderNo?: string
	/** Quote number from laboratory */
	QuoteNo?: string
	/** Purchase order number */
	OrderNo?: string

	// Sample Type Categories
	/** Rock samples included */
	SampleTypeRock: boolean
	/** Sediment samples included */
	SampleTypeSediment: boolean
	/** Drill core samples included */
	SampleTypeDrillCore: boolean
	/** Soil samples included */
	SampleTypeSoil: boolean
	/** Percussion/RC samples included */
	SampleTypePercussion: boolean
	/** Other sample type description */
	SampleTypeOther?: string

	// Analysis Requested
	/** Elements or analysis methods requested (e.g., "Fire Assay, GC") */
	ElementsOrMethods?: string

	// Special Instructions
	/** Special instructions for laboratory */
	SpecialInstructions?: string
	/** Priority level (Normal, High, Priority 2) */
	Priority?: string

	// Pulp Instructions
	/** Return pulps to client */
	PulpReturnInd: boolean
	/** Return pulps after 90 days */
	PulpReturnAfter90Days: boolean
	/** Discard pulps after 90 days */
	PulpDiscardAfter90Days: boolean
	/** Client pays for pulp storage after 90 days */
	PulpPaidStorageAfter90Days: boolean

	// Reject Instructions
	/** Return rejects to client */
	RejectReturnInd: boolean
	/** Return rejects after 90 days */
	RejectReturnAfter90Days: boolean
	/** Discard rejects after 90 days */
	RejectDiscardAfter90Days: boolean
	/** Client pays for reject storage after 90 days */
	RejectPaidStorageAfter90Days: boolean

	// Return Address
	/** Return address line 1 */
	ReturnAddressLine1?: string
	/** Return address line 2 */
	ReturnAddressLine2?: string
	/** Return address line 3 */
	ReturnAddressLine3?: string

	// Copy To
	/** Name for copy of results */
	CopyToName?: string
	/** Copy to address line 1 */
	CopyToAddressLine1?: string
	/** Copy to address line 2 */
	CopyToAddressLine2?: string

	// Invoice To
	/** Name for invoice */
	InvoiceToName?: string
	/** Invoice address line 1 */
	InvoiceToAddressLine1?: string
	/** Invoice address line 2 */
	InvoiceToAddressLine2?: string

	// Authorized By
	/** Name of person authorizing dispatch */
	AuthorizedByName: string
	/** Digital signature or signature image path */
	AuthorizedBySignature?: string

	// Certificate Preferences
	/** Request certificate of analysis */
	CertificateInd: boolean
	/** Email address for certificate delivery */
	CertificateEmail?: string
	/** Fax number for certificate delivery */
	CertificateFax?: string

	// Web/Email Notifications
	/** Enable web notifications */
	WebNotificationInd: boolean
	/** Enable email notifications */
	EmailNotificationInd: boolean
	/** Email address for notifications */
	EmailAddress?: string
	/** Fax number for notifications */
	FaxNumber?: string

	// Summary Fields
	/** Total number of samples in dispatch */
	TotalSampleCount: number
	/** Total weight of samples (kg) */
	TotalWeight?: number

	// Lab Tracking
	/** Date laboratory received samples */
	LabReceivedDt?: string
	/** Person at lab who received samples */
	LabReceivedBy?: string
	/** Date received (alternate field) */
	DateReceived?: string

	// Status
	/** Current dispatch status (Draft, Submitted, InTransit, Received, Processing, Complete) */
	DispatchStatus: string

	// Child Items
	/** Array of samples included in this dispatch */
	samples?: SampleDispatchData[]
}

/**
 * Sample Dispatch Data
 *
 * Represents a single sample within a lab dispatch batch.
 * Links a Sample to a LabDispatch with dispatch-specific metadata.
 */
export interface SampleDispatchData extends StandardRowMetadata {
	// Primary Key
	/** Unique identifier for this sample dispatch record */
	SampleDispatchId: string

	// Foreign Keys
	/** Foreign key to Sample table */
	SampleId: string
	/** Foreign key to LabDispatch table */
	LabDispatchId: string
	/** Foreign key to Collar table (denormalized) */
	CollarId: string
	/** Organization code (denormalized) */
	Organization: string

	// Sample Information (denormalized for form generation)
	/** Sample identifier/name */
	SampleNm: string
	/** Sample depth from (meters) */
	DepthFrom: number
	/** Sample depth to (meters) */
	DepthTo: number
	/** Sample weight (kg) */
	SampleWeight?: number
	/** Sample type code */
	SampleType?: string

	// Dispatch Details
	/** Order of sample in dispatch manifest */
	DispatchSequence: number
	/** Elements or method codes for this specific sample */
	ElementsOrMethodCodes?: string
	/** Rush processing requested */
	RushInd: boolean

	// Status Tracking
	/** Individual sample dispatch status (Pending, Dispatched, Received, Analyzed) */
	DispatchStatus: string
}
