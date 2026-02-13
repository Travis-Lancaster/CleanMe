/**
 * VwDrillPlan Business Schema
 * Extends auto-generated table schema with enum validation and business rules
 *
 * This is what UI components should use - NOT the API contract types
 */

import type { z } from "zod";

import { RowStatusNumberEnum, ValidationStatusNumberEnum } from "../../schema-helpers/enums";
import { VwDrillPlanTableSchema } from "./schema";

/**
 * Business schema for reading VwDrillPlan records
 * Adds enum validation on top of table schema
 */
export const VwDrillPlanBusinessReadSchema = VwDrillPlanTableSchema.refine(
	(data) => {
		// Validate enums on the transformed output
		const rowStatusResult = RowStatusNumberEnum.safeParse(data.rowStatus);
		const validationStatusResult = ValidationStatusNumberEnum.safeParse(data.validationStatus);
		return rowStatusResult.success && validationStatusResult.success;
	},
	{
		message: "Invalid rowStatus or validationStatus enum value",
	},
);

/**
 * Business type for VwDrillPlan
 * Use this in UI components and services
 */
export type VwDrillPlanBusiness = z.infer<typeof VwDrillPlanBusinessReadSchema>;

/**
 * Minimal view type for list displays
 * Includes only fields needed for grid display
 */
export interface VwDrillPlanListView {
	// IDs
	drillPlanId: string
	drillHoleId?: string

	// Names (dual naming system)
	plannedHoleNm?: string
	holeId?: string
	proposedHoleNm?: string
	otherHoleNm?: string

	// Status
	holeStatus?: string // Will be HoleStatusCode
	rowStatus: number

	// Location
	organization: string
	project: string
	target?: string
	prospect?: string

	// Geometry
	plannedTotalDepth?: number
	plannedDip?: number
	plannedAzimuth?: number

	// Metadata
	plannedBy?: string
	plannedStartDt?: string
	createdOnDt: string
	modifiedOnDt?: string
}

/**
 * Transform VwDrillPlanBusiness to ListView
 * Extracts only fields needed for list display
 */
export function toListView(business: VwDrillPlanBusiness): VwDrillPlanListView {
	return {
		drillPlanId: business.drillPlanId,
		drillHoleId: business.drillHoleId,
		plannedHoleNm: business.plannedHoleNm,
		holeId: business.holeNm, // Note: holeNm maps to holeId for consistency
		proposedHoleNm: business.proposedHoleNm,
		otherHoleNm: business.otherHoleNm,
		holeStatus: business.holeStatus,
		rowStatus: business.rowStatus,
		organization: business.organization,
		project: business.project,
		target: business.target,
		prospect: business.prospect,
		plannedTotalDepth: business.plannedTotalDepth,
		plannedDip: business.plannedDip,
		plannedAzimuth: business.plannedAzimuth,
		plannedBy: business.plannedBy,
		plannedStartDt: business.plannedStartDt,
		createdOnDt: business.createdOnDt,
		modifiedOnDt: business.modifiedOnDt,
	};
}
