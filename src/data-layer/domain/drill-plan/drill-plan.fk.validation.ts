/**
 * DrillPlan Foreign Key Validation
 * Validates that foreign keys reference existing records in lookup tables
 *
 * This module provides async validation for foreign key integrity.
 * Use when you have lookup tables in IndexedDB and need to verify references.
 */

import type { DrillPlan } from "../../api/database/data-contracts";
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
// DRILL PLAN FOREIGN KEY VALIDATION
// ========================================

/**
 * Validate all foreign keys in a drill plan
 * Checks that all lookup table references exist
 *
 * @param drillPlan - DrillPlan to validate
 * @returns Validation result with any FK errors
 *
 * @example
 * ```typescript
 * const result = await validateDrillPlanForeignKeys(drillPlan);
 * if (!result.isValid) {
 *   console.error('Invalid foreign keys:', result.errors);
 * }
 * ```
 */
export async function validateDrillPlanForeignKeys(
	drillPlan: Partial<DrillPlan>,
): Promise<ForeignKeyValidationResult> {
	const errors: ForeignKeyError[] = [];

	// Define FK mappings: field -> table name
	// Note: Table names should match your Dexie schema
	const foreignKeyMappings: Array<{
		field: keyof DrillPlan
		table: string
		displayName: string
	}> = [
			// Core drill plan references
			{ field: "DrillPattern", table: "drillPatterns", displayName: "Drill Pattern" },
			{ field: "DrillType", table: "drillTypes", displayName: "Drill Type" },
			{ field: "Grid", table: "grids", displayName: "Grid/Coordinate System" },
			{ field: "Target", table: "targets", displayName: "Target" },
			{ field: "SubTarget", table: "subTargets", displayName: "Sub Target" },
			{ field: "PlannedBy", table: "persons", displayName: "Planned By" },

			// Project/organizational references
			{ field: "Organization", table: "organizations", displayName: "Organization" },
			{ field: "Project", table: "projects", displayName: "Project" },
			{ field: "Phase", table: "phases", displayName: "Phase" },
			{ field: "Prospect", table: "prospects", displayName: "Prospect" },
			{ field: "Tenement", table: "tenements", displayName: "Tenement" },
			{ field: "Zone", table: "zones", displayName: "Zone" },

			// Hole classification references
			{ field: "HolePurpose", table: "holePurposes", displayName: "Hole Purpose" },
			{ field: "HolePurposeDetail", table: "holePurposeDetails", displayName: "Hole Purpose Detail" },
			// { field: "HoleStatus", table: "holeStatuses", displayName: "Hole Status" },
			{ field: "HoleType", table: "holeTypes", displayName: "Hole Type" },

			// Site references
			{ field: "Pit", table: "pits", displayName: "Pit" },

			// Optional references
			// { field: "HoleStatus", table: "drillPlanStatuses", displayName: "Drill Plan Status" },
			{ field: "QCInsertionRuleId", table: "qcInsertionRules", displayName: "QC Insertion Rule" },
		];

	// Validate each foreign key
	const validationPromises = foreignKeyMappings.map(async ({ field, table, displayName }) => {
		const value = drillPlan[field] as string | undefined;
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
 * @param drillPlan - DrillPlan to validate
 * @param fields - Specific fields to validate
 * @returns Validation result
 *
 * @example
 * ```typescript
 * const result = await validateSpecificForeignKeys(drillPlan, ['Target', 'DrillType']);
 * ```
 */
export async function validateSpecificForeignKeys(
	drillPlan: Partial<DrillPlan>,
	fields: Array<keyof DrillPlan>,
): Promise<ForeignKeyValidationResult> {
	const errors: ForeignKeyError[] = [];

	// Mapping of fields to their lookup tables
	const tableMap: Partial<Record<keyof DrillPlan, { table: string, displayName: string }>> = {
		DrillPattern: { table: "drillPatterns", displayName: "Drill Pattern" },
		DrillType: { table: "drillTypes", displayName: "Drill Type" },
		Grid: { table: "grids", displayName: "Grid/Coordinate System" },
		Target: { table: "targets", displayName: "Target" },
		SubTarget: { table: "subTargets", displayName: "Sub Target" },
		PlannedBy: { table: "persons", displayName: "Planned By" },
		Organization: { table: "organizations", displayName: "Organization" },
		Project: { table: "projects", displayName: "Project" },
		Phase: { table: "phases", displayName: "Phase" },
		Prospect: { table: "prospects", displayName: "Prospect" },
		Tenement: { table: "tenements", displayName: "Tenement" },
		Zone: { table: "zones", displayName: "Zone" },
		HolePurpose: { table: "holePurposes", displayName: "Hole Purpose" },
		HolePurposeDetail: { table: "holePurposeDetails", displayName: "Hole Purpose Detail" },
		// HoleStatus: { table: "holeStatuses", displayName: "Hole Status" },
		HoleType: { table: "holeTypes", displayName: "Hole Type" },
		Pit: { table: "pits", displayName: "Pit" },
		QCInsertionRuleId: { table: "qcInsertionRules", displayName: "QC Insertion Rule" },
	};

	// Validate each requested field
	for (const field of fields) {
		const mapping = tableMap[field];
		if (!mapping) {
			console.warn(`[FK-VALIDATION] No table mapping for field: ${field}`);
			continue;
		}

		const value = drillPlan[field] as string | undefined;
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
 * const isValid = await isForeignKeyValid('targets', targetId);
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
 * const results = await batchValidateForeignKeys('targets', [id1, id2, id3]);
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
		drillPatterns: false,
		drillTypes: false,
		grids: false,
		targets: false,
		subTargets: false,
		persons: false,
		organizations: false,
		projects: false,
		phases: false,
		prospects: false,
		tenements: false,
		zones: false,
		holePurposes: false,
		holePurposeDetails: false,
		holeStatuses: false,
		holeTypes: false,
		pits: false,
		drillPlanStatuses: false,
		qcInsertionRules: false,
	},
};

/**
 * Enable FK validation globally
 */
export function enableFKValidation() {
	FKValidationConfig.enabled = true;
	console.log("[FK-VALIDATION] ✅ Foreign key validation enabled for DrillPlan");
}

/**
 * Disable FK validation globally
 */
export function disableFKValidation() {
	FKValidationConfig.enabled = false;
	console.log("[FK-VALIDATION] ❌ Foreign key validation disabled for DrillPlan");
}

/**
 * Enable FK validation for specific table
 */
export function enableTableValidation(tableName: keyof typeof FKValidationConfig.tables) {
	FKValidationConfig.tables[tableName] = true;
	console.log(`[FK-VALIDATION] ✅ Validation enabled for ${tableName}`);
}

/**
 * Validate only required/critical foreign keys
 * Use this for faster validation when time is critical
 *
 * @param drillPlan - DrillPlan to validate
 * @returns Validation result
 */
export async function validateCriticalForeignKeys(
	drillPlan: Partial<DrillPlan>,
): Promise<ForeignKeyValidationResult> {
	// Only validate the most critical FKs that must exist
	const criticalFields: Array<keyof DrillPlan> = [
		"DrillType",
		"Target",
		"PlannedBy",
		"Organization",
		"Project",
	];

	return await validateSpecificForeignKeys(drillPlan, criticalFields);
}

console.log("[FK-VALIDATION] 🔗 DrillPlan foreign key validation module loaded");
