/**
 * RowStatus Helper Utilities
 *
 * Provides type-safe utilities for working with RowStatus values across
 * different type representations in the codebase.
 *
 * **Problem**: The auto-generated data-contracts.ts has a conflict where
 * `VwCollar.RowStatus` references the RowStatus interface (table entity)
 * instead of the numeric enum value. This creates type mismatches.
 *
 * **Solution**: These utilities safely extract numeric RowStatus values
 * from either representation (interface or number).
 *
 * @module schema-helpers/row-status-helpers
 */

import type { RowStatusEnum } from "./enums";

/**
 * Type guard to check if a value is a RowStatus table interface
 * (with Code property) vs a direct numeric value
 *
 * @param value - Value to check
 * @returns True if value is the RowStatus interface
 *
 * @example
 * ```typescript
 * if (isRowStatusInterface(status)) {
 *   console.log(status.Code); // Safe to access Code
 * }
 * ```
 */
export function isRowStatusInterface(value: any): value is { Code: number } {
	return value != null && typeof value === "object" && "Code" in value && typeof value.Code === "number";
}

/**
 * Extract numeric RowStatus value from mixed types
 *
 * Handles both:
 * - RowStatus interface (from auto-generated types) - extracts .Code
 * - Direct numeric value (RowStatusEnum or number) - returns as-is
 *
 * @param status - RowStatus value in any representation
 * @returns Numeric status value (0-255) or undefined
 *
 * @example
 * ```typescript
 * // Works with interface
 * const value1 = getRowStatusValue({ Code: 0, Description: 'Draft', ... });
 * // Returns: 0
 *
 * // Works with direct number
 * const value2 = getRowStatusValue(RowStatusEnum.DRAFT);
 * // Returns: 0
 *
 * // Works with undefined
 * const value3 = getRowStatusValue(undefined);
 * // Returns: undefined
 * ```
 */
export function getRowStatusValue(
	status: number | RowStatusEnum | { Code: number } | undefined | null,
): number | undefined {
	if (status === undefined || status === null) {
		return undefined;
	}

	// If it's the RowStatus interface, extract Code property
	if (isRowStatusInterface(status)) {
		return status.Code;
	}

	// Otherwise it's already a number (enum or direct value)
	return status as number;
}

/**
 * Safely get RowStatus value with a default fallback
 *
 * @param status - RowStatus value in any representation
 * @param defaultValue - Value to return if status is undefined/null
 * @returns Numeric status value or default
 *
 * @example
 * ```typescript
 * const status = getRowStatusValueOr(collar?.RowStatus, RowStatusEnum.DRAFT);
 * // Returns the status value or DRAFT (0) if undefined
 * ```
 */
export function getRowStatusValueOr(
	status: number | RowStatusEnum | { Code: number } | undefined | null,
	defaultValue: number,
): number {
	return getRowStatusValue(status) ?? defaultValue;
}

/**
 * Check if a status value matches a specific RowStatusEnum
 * Handles mixed type representations safely
 *
 * @param status - Status value to check
 * @param targetStatus - RowStatusEnum to compare against
 * @returns True if status matches target
 *
 * @example
 * ```typescript
 * if (isRowStatus(collar.RowStatus, RowStatusEnum.DRAFT)) {
 *   // Status is Draft
 * }
 * ```
 */
export function isRowStatus(
	status: number | RowStatusEnum | { Code: number } | undefined | null,
	targetStatus: RowStatusEnum,
): boolean {
	const value = getRowStatusValue(status);
	return value === targetStatus;
}

/**
 * Check if a status value is one of multiple allowed values
 *
 * @param status - Status value to check
 * @param allowedStatuses - Array of allowed RowStatusEnum values
 * @returns True if status is in the allowed list
 *
 * @example
 * ```typescript
 * const canEdit = isRowStatusOneOf(collar.RowStatus, [
 *   RowStatusEnum.DRAFT,
 *   RowStatusEnum.REJECTED
 * ]);
 * ```
 */
export function isRowStatusOneOf(
	status: number | RowStatusEnum | { Code: number } | undefined | null,
	allowedStatuses: RowStatusEnum[],
): boolean {
	const value = getRowStatusValue(status);
	return value !== undefined && allowedStatuses.includes(value);
}
