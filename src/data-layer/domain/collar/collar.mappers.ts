/**
 * Collar Mappers
 *
 * Convert between API contracts and domain types.
 *
 * These mappers handle the impedance mismatch between:
 * - Auto-generated API contracts (VwCollar)
 * - Domain-specific types (Collar)
 *
 * Key transformations:
 * - RowStatus: interface reference -> number enum
 * - ValidationErrors: null handling -> undefined
 * - collarCoordinates: added for business validation
 */

// import type { Collar, CollarCoordinate } from './collar.types.ts.tmp';

// import type { CollarCoordinate, VwCollar } from "#src/data/api/database/data-contracts.js";

import { CollarCoordinate, VwCollar } from "#src/data-layer/api/database/data-contracts.js";

import type { RowStatusEnum } from "../schema-helpers/enums";

/**
 * Map API VwCollar to Domain Collar
 *
 * Handles:
 * - RowStatus: Converts from interface reference to number
 * - ValidationErrors: Converts null to undefined
 * - collarCoordinates: Adds coordinate array if provided
 *
 * @param apiCollar - Collar from API/database
 * @param coordinates - Optional coordinates to attach
 * @returns Domain Collar type
 */
export function apiToDomain(apiCollar: VwCollar, coordinates?: CollarCoordinate[]): VwCollar {
	// Handle RowStatus conversion
	// API type shows RowStatus as the interface, but at runtime it's a number
	// We need to handle both cases safely
	let rowStatus: RowStatusEnum | undefined;

	if (apiCollar.RowStatus !== undefined && apiCollar.RowStatus !== null) {
		if (typeof apiCollar.RowStatus === "number") {
			// Already a number, use directly
			rowStatus = apiCollar.RowStatus as RowStatusEnum;
		}
		else if (typeof apiCollar.RowStatus === "object" && "Code" in apiCollar.RowStatus) {
			// It's the RowStatus interface, extract Code property
			rowStatus = (apiCollar.RowStatus as any).Code as RowStatusEnum;
		}
	}

	return {
		...apiCollar,
		// Override RowStatus with number enum
		RowStatus: rowStatus,
		// Convert null to undefined for ValidationErrors
		ValidationErrors: apiCollar.ValidationErrors ?? undefined,
		// Add coordinates if provided
		collarCoordinates: coordinates,
	} as VwCollar;
}

// /**
//  * Map Domain Collar to API VwCollar
//  *
//  * Handles:
//  * - RowStatus: Keeps as number (API accepts this at runtime)
//  * - collarCoordinates: Removes domain-specific property
//  *
//  * @param collar - Domain Collar
//  * @returns API-compatible VwCollar
//  */
// export function domainToApi(collar: VwCollar): Partial<VwCollar> {
// 	const { collarCoordinates, ...apiFields } = collar;

// 	return {
// 		...apiFields,
// 		// RowStatus as number works at runtime despite type mismatch
// 		RowStatus: collar.RowStatus as any,
// 	};
// }

// /**
//  * Map Partial Domain Collar to API update
//  *
//  * Used for update operations where only some fields are provided.
//  *
//  * @param changes - Partial domain Collar changes
//  * @returns API-compatible partial VwCollar
//  */
// export function partialDomainToApi(
// 	changes: Partial<VwCollar>
// ): Partial<VwCollar> {
// 	const { collarCoordinates, ...apiFields } = changes;

// 	return {
// 		...apiFields,
// 		// RowStatus as number works at runtime despite type mismatch
// 		RowStatus: changes.RowStatus as any,
// 	};
// }

/**
 * Convert ValidationErrors from null to undefined
 *
 * Helper for handling API responses that may include null.
 *
 * @param errors - Validation errors (may be null)
 * @returns Validation errors (never null)
 */
export function normalizeValidationErrors(errors: string | null | undefined): string | undefined {
	return errors ?? undefined;
}

/**
 * Extract RowStatus as number from various formats
 *
 * Helper for safely extracting RowStatus value.
 *
 * @param rowStatus - RowStatus in any format
 * @returns RowStatus as number or undefined
 */
export function extractRowStatus(rowStatus: any): RowStatusEnum | undefined {
	if (rowStatus === undefined || rowStatus === null) {
		return undefined;
	}

	if (typeof rowStatus === "number") {
		return rowStatus as RowStatusEnum;
	}

	if (typeof rowStatus === "object" && "Code" in rowStatus) {
		return rowStatus.Code as RowStatusEnum;
	}

	return undefined;
}
