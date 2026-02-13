/**
 * DrillPlan Domain Module
 * Exports all validation schemas and utilities for DrillPlan entity
 *
 * This module provides comprehensive validation for drill plan data:
 * - Database schema validation (type safety, format validation)
 * - Business rule validation (geological standards, cross-field logic)
 * - Foreign key validation (lookup table integrity)
 * - Utility functions (status transitions, validation reports)
 */

// ========================================
// HELPER UTILITIES
// ========================================

export {
	fetchAllDrillPlanLocal,
	// SSRM adapter functions
	fetchDrillPlanSSRM,
} from "./drill-plan-ssrm.service";

// ========================================
// DATABASE VALIDATION
// ========================================

export {
	// Helper functions
	canApproveDrillPlan,
	canSubmitForReview,
	type DrillPlanApprovalInput,

	DrillPlanApprovalSchema,
	// Types
	type DrillPlanBusinessInput,
	// Schemas
	DrillPlanBusinessSchema,

	type DrillPlanReviewInput,
	DrillPlanReviewSchema,
	getDrillPlanValidationReport,
	getGeologicalWarnings,
	safeValidateDrillPlanBusiness,
	safeValidateDrillPlanForApproval,

	safeValidateDrillPlanForReview,
	validateCoordinateCompleteness,
	validateDateRelationships,
	validateDepthRelationships,
	// Validation functions
	validateDrillPlanBusiness,
	validateDrillPlanForApproval,
	validateDrillPlanForReview,
	validateOrientationCompleteness,
	validateStatusTransition,
} from "./drill-plan.business.schema";

// ========================================
// BUSINESS VALIDATION
// ========================================

export {
	type DrillPlanDbCreate,
	DrillPlanDbCreateSchema,
	// Types
	type DrillPlanDbInput,

	// Schemas
	DrillPlanDbSchema,
	type DrillPlanDbUpdate,
	DrillPlanDbUpdateSchema,

	isValidDrillPlanDb,
	safeValidateDrillPlanDb,
	safeValidateDrillPlanDbCreate,
	safeValidateDrillPlanDbUpdate,
	// Validation functions
	validateDrillPlanDb,
	validateDrillPlanDbCreate,
	validateDrillPlanDbUpdate,
	validatePartialDrillPlan,
} from "./drill-plan.db.schema";

// ========================================
// FOREIGN KEY VALIDATION
// ========================================

export {
	batchValidateForeignKeys,
	disableFKValidation,

	enableFKValidation,
	enableTableValidation,
	// Configuration
	FKValidationConfig,
	// Types
	type ForeignKeyError,
	type ForeignKeyValidationResult,

	formatForeignKeyErrors,
	// Helper functions
	getInvalidForeignKeys,

	isForeignKeyValid,
	validateCriticalForeignKeys,
	// Validation functions
	validateDrillPlanForeignKeys,
	validateSpecificForeignKeys,
} from "./drill-plan.fk.validation";

// ========================================
// DRILL PLAN SERVICE
// ========================================

export {
	AzimuthSchema,
	DepthSchema,
	DipSchema,
	EastingSchema,
	ErrorMessages,
	formatValidationErrors,
	getValidNextStatuses,
	groupValidationErrors,
	// Validation schemas
	GuidSchema,
	hasCompleteCoordinates,
	isEditable,
	IsoDateSchema,
	isRowStatus,
	isTerminalStatus,

	isTypicalDrillingDip,
	isValidationStatus,

	// Utility functions
	isValidStatusTransition,
	MiningEraDate,
	normalizeAzimuth,

	NorthingSchema,
	ODSPrioritySchema,
	PrioritySchema,
	ReasonableFutureDate,
	RLSchema,
	type RowStatus,
	RowStatusDescriptions,
	RowStatusEnum,
	// Constants
	RowStatusNames,
	validateDrillingOrientation,
	// Types
	type ValidationStatus,
	ValidationStatusEnum,
} from "./drill-plan.schema.helpers";

// ========================================
// SSRM SERVICE (ADAPTER)
// ========================================

export {
	// Service class
	drillPlanService,

	// Service methods (for direct use if needed)
	type FetchDrillPlansOptions,

	// SSRM support
	type SSRMRequestWithExternal,
	type SSRMResponse,
} from "./drill-plan.service";

// ========================================
// CONVENIENCE EXPORTS
// ========================================

/**
 * Quick validation helper for common use case
 * Validates against database schema (for saves)
 *
 * @example
 * ```typescript
 * import { validateForSave } from './drill-plan';
 *
 * const result = validateForSave(drillPlanData);
 * if (result.success) {
 *   await db.Planning_DrillPlan.put(result.data);
 * }
 * ```
 */
export function validateForSave(data: unknown) {
	const { safeValidateDrillPlanDb } = require("./drill-plan.db.schema");
	return safeValidateDrillPlanDb(data);
}

/**
 * Quick validation helper for approval workflow
 * Validates against approval schema (stricter)
 *
 * @example
 * ```typescript
 * import { validateForApproval } from './drill-plan';
 *
 * const result = validateForApproval(drillPlanData);
 * if (result.success) {
 *   // Proceed with approval
 * }
 * ```
 */
export function validateForApproval(data: unknown) {
	const { safeValidateDrillPlanForApproval } = require("./drill-plan.business.schema");
	return safeValidateDrillPlanForApproval(data);
}

/**
 * Quick validation helper for review submission
 * Validates against review schema
 *
 * @example
 * ```typescript
 * import { validateForReview } from './drill-plan';
 *
 * const result = validateForReview(drillPlanData);
 * if (result.success) {
 *   // Submit for review
 * }
 * ```
 */
export function validateForReview(data: unknown) {
	const { safeValidateDrillPlanForReview } = require("./drill-plan.business.schema");
	return safeValidateDrillPlanForReview(data);
}

console.log("[DRILL-PLAN] 📦 DrillPlan domain module loaded");
