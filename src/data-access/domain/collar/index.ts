/**
 * Collar Domain Module
 *
 * Exports repository, service, validation schemas, and React hooks for the Collar entity.
 * Use this as the main entry point for collar-related operations.
 *
 * @example
 * ```typescript
 * // Service layer (recommended for UI components)
 * import { collarService } from '@/data/domain/collar';
 *
 * // Repository with validation
 * import { collarRepo } from '@/data/domain/collar';
 *
 * // Validation schemas
 * import { validateCollarDb, canApproveCollar } from '@/data/domain/collar';
 *
 * // React hooks
 * import { useCollarForm, useCollarValidationState } from '@/data/domain/collar';
 * ```
 */

// Domain Types (use these in your application)
// export type { Collar, CollarCoordinate } from './collar.types.ts.tmp';
// export { isCollar, isCollarCoordinate } from './collar.types.ts.tmp';

// Business Validation
export {
	// Helper Functions
	canApproveCollar,
	canSubmitForReview,
	type CollarApprovalInput,

	CollarApprovalSchema,
	// Types
	type CollarBusinessInput,
	// Schemas
	CollarBusinessSchema,

	type CollarReviewInput,
	CollarReviewSchema,
	getCollarValidationReport,
	safeValidateCollarBusiness,
	safeValidateCollarForApproval,
	safeValidateCollarForReview,

	// Validation Functions
	validateCollarBusiness,
	validateCollarForApproval,
	validateCollarForReview,
	validateDateRelationships,
	validateDepthRelationships,
	validateStatusTransition,
} from "./collar.business.schema"

// Database Validation
export {
	type CollarDbCreate,
	CollarDbCreateSchema,
	// Types
	type CollarDbInput,

	// Schemas
	CollarDbSchema,
	type CollarDbUpdate,
	CollarDbUpdateSchema,

	isValidCollarDb,
	safeValidateCollarDb,
	safeValidateCollarDbCreate,
	safeValidateCollarDbUpdate,
	// Validation Functions
	validateCollarDb,
	validateCollarDbCreate,
	validateCollarDbUpdate,
	validatePartialCollar,
} from "./collar.db.schema";

// Foreign Key Validation
export {
	batchValidateForeignKeys,
	disableFKValidation,
	enableFKValidation,
	enableTableValidation,
	FKValidationConfig,
	type ForeignKeyError,
	type ForeignKeyValidationResult,
	formatForeignKeyErrors,
	getInvalidForeignKeys,
	isForeignKeyValid,
	validateCollarForeignKeys,
	validateSpecificForeignKeys,
} from "./collar.fk.validation";

// React Hooks
// export {
// 	useCollarForm,
// 	useCollarValidationState,
// 	useCollarStatus,
// 	useDepthValidation,
// 	useDateValidation,
// 	useCollarWorkflow,
// 	type FieldError,
// 	type ValidationState,
// 	type CollarFormState,
// } from './useCollarValidation';

// Type Mappers (for converting between API and domain types)
export {
	extractRowStatus,
	// apiToDomain,
	// domainToApi,
	// partialDomainToApi,
	normalizeValidationErrors,
} from "./collar.mappers";

// Repository
export { collarRepo, CollarRepository } from "./collar.repo";

// Schema Helpers
export {
	DepthSchema,
	ErrorMessages,
	// Error Formatting
	formatValidationErrors,
	getValidNextStatuses,
	groupValidationErrors,

	// Primitive Schemas
	GuidSchema,
	HoleIdSchema,

	isEditable,
	IsoDateSchema,

	// Type Guards
	isRowStatus,
	isTerminalStatus,
	isValidationStatus,

	// Utility Functions
	isValidStatusTransition,
	MiningEraDate,
	PrioritySchema,
	ReasonableFutureDate,

	type RowStatus,
	RowStatusDescriptions,
	RowStatusEnum,
	// Constants
	RowStatusNames,

	// Types
	type ValidationStatus,
	// Enum Schemas
	ValidationStatusEnum,
} from "./collar.schema.helpers";

// Service Layer (Business Logic)
export { collarService } from "./collar.service";

// Note: We no longer export VwCollar from API contracts
// Use the domain Collar type exported above instead
