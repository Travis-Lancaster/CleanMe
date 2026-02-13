/**
 * Lookup Table Type Definitions
 *
 * Defines TypeScript interfaces for all lookup and classification tables.
 * These tables are populated from the API's lookup-table endpoint and
 * stored in IndexedDB for offline access.
 *
 * Architecture:
 * - LookupOption: Standard dropdown option format (value/label)
 * - LookupTableConfig: Configuration for mapping table columns
 * - LookupMetadata: Version tracking for lookup data
 */

/**
 * Generic lookup option for dropdowns and selects
 * Used consistently across all lookup tables
 */
export interface LookupOption2<T = string | number> {
	value: T
	label: string
	sortOrder?: number
	isDefault?: boolean
	extra?: Record<string, any> // Additional fields for filtering/display
}
export interface LookupOption<T = string | number> {
	value: string
	label: string
	sortOrder?: number
	isDefault?: boolean
	extra?: Record<string, any> // Additional fields for filtering/display
}



/**
 * Configuration for mapping database table columns to lookup options
 * Handles different column naming patterns across tables
 */
export interface LookupTableConfig {
	tableName: string
	valueField: string // Field to use as value (e.g., 'Code', 'UnitCode', 'Organization')
	labelField: string | string[] // Field(s) to use as label (e.g., 'Description', ['FirstName', 'LastName'])
	sortField?: string // Field for sorting (e.g., 'SortOrder')
	defaultField?: string // Field indicating default value (e.g., 'IsDefaultInd')
	filterFields?: string[] // Additional fields available for filtering
	displayFormat?: (record: any) => string // Custom display formatter
}

/**
 * Lookup metadata for version tracking
 * Stores sequence numbers and timestamps for incremental updates
 */
export interface LookupMetadata {
	id?: number
	key: string
	value: string | number
}

/**
 * Lookup cache entry with metadata
 */
export interface LookupCacheEntry {
	tableName: string
	data: LookupOption[]
	timestamp: number
	count: number
}

/**
 * Result of a lookup operation
 */
export interface LookupResult {
	success: boolean
	data: LookupOption[]
	error?: string
	count: number
}

/**
 * Type guard to check if a value is a valid lookup option
 */
export function isValidLookupOption(value: unknown): value is LookupOption {
	if (typeof value !== "object" || value === null)
		return false;
	const option = value as any;
	return (
		(typeof option.value === "string" || typeof option.value === "number")
		&& typeof option.label === "string"
	);
}

/**
 * Type guard for lookup table config
 */
export function isValidLookupTableConfig(value: unknown): value is LookupTableConfig {
	if (typeof value !== "object" || value === null)
		return false;
	const config = value as any;
	return (
		typeof config.tableName === "string"
		&& typeof config.valueField === "string"
		&& (typeof config.labelField === "string" || Array.isArray(config.labelField))
	);
}
