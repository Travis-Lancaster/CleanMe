/**
 * Validator Utilities
 *
 * Helper functions for creating and using Zod validators.
 * Provides consistent patterns for validation across all table extensions.
 *
 * @module schema-helpers/validators
 */

import type { ZodSchema } from "zod";
import { z } from "zod";

// ========================================
// VALIDATOR CREATORS
// ========================================

/**
 * Create Throwing Validator
 *
 * Wraps a Zod schema in a function that throws on validation failure.
 * Use for internal code where errors should propagate.
 *
 * @param schema Zod schema to validate against
 * @param entityName Name of entity for error messages (e.g., "Collar", "Survey")
 * @returns Function that validates data and returns typed result
 *
 * @example
 * ```typescript
 * const validateCollarDb = createThrowingValidator(CollarDbSchema, "Collar");
 *
 * try {
 *   const validated = validateCollarDb(data);
 *   // validated is fully typed
 * } catch (error) {
 *   // ZodError thrown with details
 * }
 * ```
 */
export function createThrowingValidator<T extends ZodSchema>(
	schema: T,
	entityName: string = "Entity",
) {
	return function validate(data: unknown): z.infer<T> {
		try {
			return schema.parse(data);
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				// Enhance error message
				throw new TypeError(
					`${entityName} validation failed: ${formatZodErrors(error)}`,
				);
			}
			throw error;
		}
	};
}

/**
 * Create Safe Validator
 *
 * Wraps a Zod schema in a function that returns success/error object.
 * Use for user-facing code where errors should be handled gracefully.
 *
 * @param schema Zod schema to validate against
 * @returns Function that returns SafeParseReturnType
 *
 * @example
 * ```typescript
 * const safeValidateCollarDb = createSafeValidator(CollarDbSchema);
 *
 * const result = safeValidateCollarDb(data);
 * if (result.success) {
 *   console.log(result.data); // Fully typed
 * } else {
 *   console.error(result.error); // ZodError with details
 * }
 * ```
 */
export function createSafeValidator<T extends ZodSchema>(schema: T) {
	return function safeValidate(data: unknown): ReturnType<typeof schema.safeParse> {
		return schema.safeParse(data);
	};
}

/**
 * Create Type Guard
 *
 * Creates a TypeScript type guard from a Zod schema.
 * Use for runtime type checking with TypeScript narrowing.
 *
 * @param schema Zod schema to validate against
 * @returns Type guard function
 *
 * @example
 * ```typescript
 * const isValidCollar = createTypeGuard(CollarDbSchema);
 *
 * if (isValidCollar(data)) {
 *   // TypeScript knows data matches CollarDbSchema
 *   console.log(data.collarId);
 * }
 * ```
 */
export function createTypeGuard<T extends ZodSchema>(schema: T) {
	return function isValid(data: unknown): data is z.infer<T> {
		return schema.safeParse(data).success;
	};
}

/**
 * Create Batch Validator
 *
 * Validates multiple records in a batch, collecting all errors.
 * Use for CSV imports, bulk operations, etc.
 *
 * @param schema Zod schema to validate against
 * @param entityName Name of entity for error messages
 * @returns Function that validates array of records
 *
 * @example
 * ```typescript
 * const batchValidateCollars = createBatchValidator(CollarDbSchema, "Collar");
 *
 * const result = batchValidateCollars(dataArray);
 * console.log(`${result.validCount} valid, ${result.errors.length} errors`);
 * ```
 */
export function createBatchValidator<T extends ZodSchema>(
	schema: T,
	entityName: string = "Entity",
) {
	return function batchValidate(data: unknown[]): {
		valid: Array<z.infer<T>>
		invalid: Array<{ index: number, data: unknown, errors: string[] }>
		validCount: number
		invalidCount: number
		totalCount: number
	} {
		const valid: Array<z.infer<T>> = [];
		const invalid: Array<{ index: number, data: unknown, errors: string[] }> = [];

		data.forEach((item, index) => {
			const result = schema.safeParse(item);

			if (result.success) {
				valid.push(result.data);
			}
			else {
				invalid.push({
					index,
					data: item,
					errors: formatZodErrorsToArray(result.error),
				});
			}
		});

		return {
			valid,
			invalid,
			validCount: valid.length,
			invalidCount: invalid.length,
			totalCount: data.length,
		};
	};
}

// ========================================
// ERROR FORMATTING
// ========================================

/**
 * Format Zod Errors
 *
 * Converts ZodError to human-readable string.
 *
 * @param error ZodError instance
 * @returns Formatted error string
 */
export function formatZodErrors(error: z.ZodError): string {
	return error.issues
		.map((err) => {
			const path = err.path.join(".");
			return path ? `${path}: ${err.message}` : err.message;
		})
		.join("; ");
}

/**
 * Format Zod Errors to Array
 *
 * Converts ZodError to array of error messages.
 *
 * @param error ZodError instance
 * @returns Array of error messages
 */
export function formatZodErrorsToArray(error: z.ZodError): string[] {
	return error.issues.map((err) => {
		const path = err.path.join(".");
		return path ? `${path}: ${err.message}` : err.message;
	});
}

/**
 * Format Zod Errors by Field
 *
 * Converts ZodError to object mapping field paths to error messages.
 * Useful for form validation where each field needs its own error.
 *
 * @param error ZodError instance
 * @returns Object mapping field paths to error messages
 */
export function formatZodErrorsByField(error: z.ZodError): Record<string, string[]> {
	const errorsByField: Record<string, string[]> = {};

	error.issues.forEach((err) => {
		const path = err.path.join(".");
		if (!errorsByField[path]) {
			errorsByField[path] = [];
		}
		errorsByField[path].push(err.message);
	});

	return errorsByField;
}

// ========================================
// VALIDATION RESULT HELPERS
// ========================================

/**
 * Validation Result
 *
 * Standard return type for custom validation functions.
 */
export interface ValidationResult<T = unknown> {
	success: boolean
	data?: T
	errors?: string[]
	warnings?: string[]
}

/**
 * Create Success Result
 *
 * Helper to create a successful validation result.
 *
 * @param data Validated data
 * @param warnings Optional warning messages
 * @returns ValidationResult
 */
export function createSuccessResult<T>(
	data: T,
	warnings?: string[],
): ValidationResult<T> {
	return {
		success: true,
		data,
		warnings: warnings && warnings.length > 0 ? warnings : undefined,
	};
}

/**
 * Create Error Result
 *
 * Helper to create a failed validation result.
 *
 * @param errors Error messages
 * @returns ValidationResult
 */
export function createErrorResult(errors: string[]): ValidationResult {
	return {
		success: false,
		errors,
	};
}

/**
 * Merge Validation Results
 *
 * Combines multiple validation results into one.
 * Success only if all inputs succeed.
 *
 * @param results Array of validation results
 * @returns Combined validation result
 */
export function mergeValidationResults<T>(
	results: ValidationResult<T>[],
): ValidationResult<T> {
	const allErrors: string[] = [];
	const allWarnings: string[] = [];
	let lastData: T | undefined;

	for (const result of results) {
		if (!result.success) {
			allErrors.push(...(result.errors || []));
		}
		if (result.warnings) {
			allWarnings.push(...result.warnings);
		}
		if (result.data) {
			lastData = result.data;
		}
	}

	if (allErrors.length > 0) {
		return createErrorResult(allErrors) as ValidationResult<T>;
	}

	return createSuccessResult(
		lastData!,
		allWarnings.length > 0 ? allWarnings : undefined,
	);
}

// ========================================
// PARTIAL VALIDATION
// ========================================

/**
 * Create Partial Validator
 *
 * Creates a validator that only validates provided fields.
 * Useful for update operations where only some fields are changed.
 *
 * @param schema Full Zod schema
 * @returns Function that validates partial data
 *
 * @example
 * ```typescript
 * const validateCollarPartial = createPartialValidator(CollarDbSchema);
 *
 * // Only validates the fields provided
 * const result = validateCollarPartial({ holeId: "DDH-001" });
 * ```
 */
export function createPartialValidator<T extends z.ZodObject<any>>(schema: T) {
	const partialSchema = schema.partial();

	return function validatePartial(data: unknown): z.infer<typeof partialSchema> {
		return partialSchema.parse(data);
	};
}

/**
 * Create Partial Safe Validator
 *
 * Safe version of partial validator.
 *
 * @param schema Full Zod schema
 * @returns Function that safely validates partial data
 */
export function createPartialSafeValidator<T extends z.ZodObject<any>>(schema: T) {
	const partialSchema = schema.partial();

	return function safeValidatePartial(data: unknown): ReturnType<typeof partialSchema.safeParse> {
		return partialSchema.safeParse(data);
	};
}

// ========================================
// FIELD VALIDATION
// ========================================

/**
 * Validate Single Field
 *
 * Validates a single field value against a schema.
 * Useful for real-time form validation.
 *
 * @param schema Schema that contains the field
 * @param fieldName Name of the field to validate
 * @param value Value to validate
 * @returns Validation result for the field
 *
 * @example
 * ```typescript
 * const result = validateSingleField(CollarDbSchema, 'holeId', 'DDH-001');
 * if (!result.success) {
 *   console.error(result.errors);
 * }
 * ```
 */
export function validateSingleField<T extends ZodSchema>(
	schema: T,
	fieldName: string,
	value: unknown,
): ValidationResult {
	const result = schema.safeParse({ [fieldName]: value });

	if (result.success) {
		return createSuccessResult(result.data);
	}

	// Filter errors for this field only
	const fieldErrors = result.error.issues
		.filter(err => err.path[0] === fieldName)
		.map(err => err.message);

	if (fieldErrors.length === 0) {
		// No errors for this specific field, might be valid
		return createSuccessResult(value);
	}

	return createErrorResult(fieldErrors);
}

// ========================================
// ASYNC VALIDATION
// ========================================

/**
 * Create Async Validator
 *
 * Wraps an async validation function (e.g., for FK checks).
 *
 * @param validator Async function that validates data
 * @param entityName Name of entity for error messages
 * @returns Async validator function
 *
 * @example
 * ```typescript
 * const validateCollarFKs = createAsyncValidator(
 *   async (data) => {
 *     // Check if project exists in DB
 *     const projectExists = await db.projects.get(data.projectId);
 *     if (!projectExists) throw new Error("Invalid project ID");
 *     return data;
 *   },
 *   "Collar"
 * );
 *
 * await validateCollarFKs(collarData);
 * ```
 */
export function createAsyncValidator<T>(
	validator: (data: T) => Promise<T>,
	entityName: string = "Entity",
) {
	return async function validateAsync(data: T): Promise<ValidationResult<T>> {
		try {
			const validated = await validator(data);
			return createSuccessResult(validated);
		}
		catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			return createErrorResult([`${entityName} async validation failed: ${message}`]) as ValidationResult<T>;
		}
	};
}

// ========================================
// EXPORTS
// ========================================

/**
 * All validator utilities for easy import
 */
export const Validators = {
	createThrowingValidator,
	createSafeValidator,
	createTypeGuard,
	createBatchValidator,
	createPartialValidator,
	createPartialSafeValidator,
	createAsyncValidator,

	formatZodErrors,
	formatZodErrorsToArray,
	formatZodErrorsByField,

	createSuccessResult,
	createErrorResult,
	mergeValidationResults,

	validateSingleField,
} as const;
