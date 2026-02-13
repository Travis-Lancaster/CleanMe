/**
 * Collar Foreign Key Validation
 * Validates that foreign keys reference existing records in lookup tables
 *
 * This module provides async validation for foreign key integrity.
 * Use when you have lookup tables in IndexedDB and need to verify references.
 */

// import type { VwCollar } from "#src/data/api/database/data-contracts.js";
import { VwCollar } from "#src/data-layer/api/database/data-contracts.js";
import { db } from "../../db/connection";

// ========================================
// TYPES
// ========================================

export interface ForeignKeyError {
	field: string
	value: string
	message: string
}

export interface ForeignKeyValidationResult {
	isValid: boolean
	errors: ForeignKeyError[]
}

// ========================================
// LOOKUP TABLE CHECKERS
// ========================================

/**
 * Check if a record exists in a specific table
 * Generic helper for any lookup table
 */
async function checkTableExists(
	tableName: string,
	field: string,
	value: string,
): Promise<boolean> {
	try {
		// Access the table dynamically
		const table = (db as any)[tableName];
		if (!table) {
			console.warn(`[FK-VALIDATION] Table ${tableName} not found in database`);
			return true; // Don't fail if table doesn't exist yet
		}

		// Try to find the record
		const record = await table.get(value);
		return !!record;
	}
	catch (error) {
		console.error(`[FK-VALIDATION] Error checking ${tableName}:`, error);
		return true; // Don't fail on errors, just log
	}
}

/**
 * Validate a single foreign key
 */
async function validateForeignKey(
	tableName: string,
	fieldName: string,
	value: string | undefined,
): Promise<ForeignKeyError | null> {
	if (!value) {
		return null; // Skip if value is not provided
	}

	const exists = await checkTableExists(tableName, fieldName, value);

	if (!exists) {
		return {
			field: fieldName,
			value,
			message: `${fieldName} references non-existent record: ${value}`,
		};
	}

	return null;
}

// ========================================
// COLLAR FOREIGN KEY VALIDATION
// ========================================

/**
 * Validate all foreign keys in a collar
 * Checks that all lookup table references exist
 *
 * @param collar - Collar to validate
 * @returns Validation result with any FK errors
 *
 * @example
 * ```typescript
 * const result = await validateCollarForeignKeys(collar);
 * if (!result.isValid) {
 *   console.error('Invalid foreign keys:', result.errors);
 * }
 * ```
 */
export async function validateCollarForeignKeys(
	collar: Partial<VwCollar>,
): Promise<ForeignKeyValidationResult> {
	const errors: ForeignKeyError[] = [];

	// Define FK mappings: field -> table name
	// Note: Table names should match your Dexie schema
	const foreignKeyMappings: Array<{
		field: keyof VwCollar
		table: string
		displayName: string
	}> = [
			// Add mappings as lookup tables are added to IndexedDB
			// Example format:
			// { field: 'CollarType', table: 'collarTypes', displayName: 'Collar Type' },
			// { field: 'ExplorationCompany', table: 'companies', displayName: 'Exploration Company' },
			// { field: 'HolePurpose', table: 'holePurposes', displayName: 'Hole Purpose' },
			// { field: 'HoleStatus', table: 'holeStatuses', displayName: 'Hole Status' },
			// { field: 'HoleType', table: 'holeTypes', displayName: 'Hole Type' },
			// { field: 'Organization', table: 'organizations', displayName: 'Organization' },
			// { field: 'Phase', table: 'phases', displayName: 'Phase' },
			// { field: 'Pit', table: 'pits', displayName: 'Pit' },
			// { field: 'Project', table: 'projects', displayName: 'Project' },
			// { field: 'Prospect', table: 'prospects', displayName: 'Prospect' },
			// { field: 'ResponsiblePerson', table: 'persons', displayName: 'Responsible Person' },
			// { field: 'ResponsiblePerson2', table: 'persons', displayName: 'Responsible Person 2' },
			// { field: 'Section', table: 'sections', displayName: 'Section' },
			// { field: 'SubTarget', table: 'subTargets', displayName: 'Sub Target' },
			// { field: 'Target', table: 'targets', displayName: 'Target' },
			// { field: 'Tenement', table: 'tenements', displayName: 'Tenement' },
		];

	// Validate each foreign key
	const validationPromises = foreignKeyMappings.map(async ({ field, table, displayName }) => {
		const value = collar[field] as string | undefined;
		const error = await validateForeignKey(table, displayName, value);
		if (error) {
			errors.push(error);
		}
	});

	await Promise.all(validationPromises);

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Validate specific foreign keys only
 * More efficient when you only need to check a subset
 *
 * @param collar - Collar to validate
 * @param fields - Specific fields to validate
 * @returns Validation result
 *
 * @example
 * ```typescript
 * const result = await validateSpecificForeignKeys(collar, ['Project', 'Phase']);
 * ```
 */
export async function validateSpecificForeignKeys(
	collar: Partial<VwCollar>,
	fields: Array<keyof VwCollar>,
): Promise<ForeignKeyValidationResult> {
	const errors: ForeignKeyError[] = [];

	// Mapping of fields to their lookup tables
	const tableMap: Partial<Record<keyof VwCollar, { table: string, displayName: string }>> = {
		// Add mappings as tables are implemented
		// Example:
		// CollarType: { table: 'collarTypes', displayName: 'Collar Type' },
		// Project: { table: 'projects', displayName: 'Project' },
	};

	// Validate each requested field
	for (const field of fields) {
		const mapping = tableMap[field];
		if (!mapping) {
			console.warn(`[FK-VALIDATION] No table mapping for field: ${field}`);
			continue;
		}

		const value = collar[field] as string | undefined;
		const error = await validateForeignKey(mapping.table, mapping.displayName, value);
		if (error) {
			errors.push(error);
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Check if a specific foreign key is valid
 * Quick check for a single FK
 *
 * @param tableName - Name of the lookup table
 * @param value - FK value to check
 * @returns True if exists, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = await isForeignKeyValid('projects', projectId);
 * ```
 */
export async function isForeignKeyValid(
	tableName: string,
	value: string,
): Promise<boolean> {
	return await checkTableExists(tableName, tableName, value);
}

/**
 * Batch validate multiple foreign keys of the same type
 * More efficient than individual checks
 *
 * @param tableName - Lookup table name
 * @param values - Array of FK values to check
 * @returns Map of value -> exists
 *
 * @example
 * ```typescript
 * const results = await batchValidateForeignKeys('projects', [id1, id2, id3]);
 * results.get(id1); // true or false
 * ```
 */
export async function batchValidateForeignKeys(
	tableName: string,
	values: string[],
): Promise<Map<string, boolean>> {
	const results = new Map<string, boolean>();

	try {
		const table = (db as any)[tableName];
		if (!table) {
			console.warn(`[FK-VALIDATION] Table ${tableName} not found`);
			// Return all as valid if table doesn't exist
			values.forEach(v => results.set(v, true));
			return results;
		}

		// Batch fetch all records
		const records = await table.bulkGet(values);

		// Map results
		values.forEach((value, index) => {
			results.set(value, !!records[index]);
		});
	}
	catch (error) {
		console.error("[FK-VALIDATION] Error in batch validation:", error);
		// On error, mark all as valid to not block operations
		values.forEach(v => results.set(v, true));
	}

	return results;
}

// ========================================
// INTEGRATION HELPERS
// ========================================

/**
 * Get list of invalid foreign keys from a validation result
 * Useful for displaying errors to users
 */
export function getInvalidForeignKeys(result: ForeignKeyValidationResult): string[] {
	return result.errors.map(err => err.field);
}

/**
 * Format FK errors for display
 */
export function formatForeignKeyErrors(result: ForeignKeyValidationResult): string[] {
	return result.errors.map(err => err.message);
}

/**
 * Configuration for enabling/disabling FK validation
 * Set to true once lookup tables are loaded in IndexedDB
 */
export const FKValidationConfig = {
	enabled: false, // Set to true when lookup tables are ready
	tables: {
		// Enable per table as they're added to IndexedDB
		collarTypes: false,
		companies: false,
		holePurposes: false,
		holeStatuses: false,
		holeTypes: false,
		organizations: false,
		phases: false,
		pits: false,
		projects: false,
		prospects: false,
		persons: false,
		sections: false,
		subTargets: false,
		targets: false,
		tenements: false,
	},
};

/**
 * Enable FK validation globally
 */
export function enableFKValidation() {
	FKValidationConfig.enabled = true;
	console.log("[FK-VALIDATION] ✅ Foreign key validation enabled");
}

/**
 * Disable FK validation globally
 */
export function disableFKValidation() {
	FKValidationConfig.enabled = false;
	console.log("[FK-VALIDATION] ❌ Foreign key validation disabled");
}

/**
 * Enable FK validation for specific table
 */
export function enableTableValidation(tableName: keyof typeof FKValidationConfig.tables) {
	FKValidationConfig.tables[tableName] = true;
	console.log(`[FK-VALIDATION] ✅ Validation enabled for ${tableName}`);
}

console.log("[FK-VALIDATION] 🔗 Foreign key validation module loaded");
