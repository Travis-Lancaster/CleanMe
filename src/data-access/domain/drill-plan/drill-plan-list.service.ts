/**
 * DrillPlan List Service
 * Handles fetching drill plan list data with proper type transformations
 * Service layer between UI and API
 */

import type { HoleStatusCode } from "../schema-helpers/enums";
import { HoleStatusCodes } from "../schema-helpers/enums";
import type { VwDrillPlan } from "../../api/database/data-contracts";
import type { VwDrillPlanListView } from "../tables/vwdrillplan/business.schema";
import { apiClient } from "../../api/apiClient";
import { db } from "../../db/connection";

export interface DrillPlanListFilters {
	status?: HoleStatusCode[]
	project?: string
	searchText?: string
}

export interface DrillPlanListOptions extends DrillPlanListFilters {
	page?: number
	pageSize?: number
}

export interface DrillPlanListResponse {
	data: VwDrillPlanListView[]
	total: number
	page: number
	pageSize: number
}

/**
 * DrillPlan List Service
 * Transforms between API types (PascalCase) and business types (camelCase)
 */
export class DrillPlanListService {
	/**
	 * Fetch drill plans from API with filters
	 */
	async fetchList(options: DrillPlanListOptions = {}): Promise<DrillPlanListResponse> {
		const {
			page = 1,
			pageSize = 100,
			status,
			project,
			searchText,
		} = options;

		console.log("[DrillPlanListService] Fetching list", options);

		try {
			// Build API filters (PascalCase)
			const filters: Record<string, any> = {};

			if (status && status.length > 0) {
				filters.HoleStatus = status; // API expects array of status codes
			}

			if (project) {
				filters.Project = project;
			}

			// Call API - Using VwDrillPlan endpoint (full view with all fields)
			const response = await apiClient.vwDrillPlanControllerFindAll({
				page,
				take: pageSize,
				search: searchText,
				filters: Object.keys(filters).length > 0 ? JSON.stringify(filters) : undefined,
				order: "DESC",
			});

			const apiData = response.data.data || [];
			const total = response.data.meta?.itemCount || 0;

			// Store in Dexie for offline use (don't await to avoid blocking)
			if (Array.isArray(apiData) && apiData.length > 0) {
				db.Planning_DrillPlan.bulkPut(apiData).then(async () => {
					const totalInDb = await db.Planning_DrillPlan.count();
					console.log("[DrillPlanListService] ✅ Stored in Dexie:", {
						pageStored: apiData.length,
						totalInDexie: totalInDb,
						page,
					});
				}).catch((err) => {
					console.error("[DrillPlanListService] ❌ Failed to store in Dexie:", err);
				});
			}

			console.log("[DrillPlanListService] API returned", {
				count: apiData.length,
				total,
				page,
			});

			// Transform API response (PascalCase) to business types (camelCase)
			const businessData = apiData.map((item: VwDrillPlan) => this.transformFromApi(item));

			return {
				data: businessData,
				total,
				page,
				pageSize,
			};
		}
		catch (error) {
			console.error("[DrillPlanListService] Fetch failed", error);
			throw error;
		}
	}

	/**
	 * Transform API type (PascalCase) to business type (camelCase)
	 */
	private transformFromApi(apiData: VwDrillPlan): VwDrillPlanListView {
		return {
			// IDs
			drillPlanId: apiData.DrillPlanId,
			drillHoleId: apiData.DrillHoleId,

			// Names (dual naming system)
			plannedHoleNm: apiData.PlannedHoleNm,
			holeId: apiData.HoleNm, // Note: API HoleNm → business holeId
			proposedHoleNm: apiData.ProposedHoleNm,
			otherHoleNm: apiData.OtherHoleNm,

			// Status
			holeStatus: apiData.HoleStatus,
			rowStatus: apiData.RowStatus || 0,

			// Location
			organization: apiData.Organization,
			project: apiData.Project,
			target: apiData.Target,
			prospect: apiData.Prospect,

			// Geometry
			plannedTotalDepth: apiData.PlannedTotalDepth,
			plannedDip: apiData.PlannedDip,
			plannedAzimuth: apiData.PlannedAzimuth,

			// Metadata
			plannedBy: apiData.PlannedBy,
			plannedStartDt: apiData.PlannedStartDt,
			createdOnDt: apiData.CreatedOnDt || new Date().toISOString(),
			modifiedOnDt: apiData.ModifiedOnDt,
		};
	}

	/**
	 * Get status filter values as HoleStatusCode arrays
	 * Helper to convert UI filter selections to API-compatible values
	 */
	getStatusFilters(filterType: string): HoleStatusCode[] | undefined {
		switch (filterType) {
			case "draft":
				return [HoleStatusCodes.DRAFT];
			case "planned":
				return [HoleStatusCodes.PLANNED];
			case "inprogress":
				return [HoleStatusCodes.IN_PROGRESS];
			case "completed":
				return [HoleStatusCodes.COMPLETED];
			case "exceptions":
				return [
					HoleStatusCodes.ABANDONED,
					HoleStatusCodes.CANCELLED,
					HoleStatusCodes.SUSPENDED,
					HoleStatusCodes.STOPPED,
					HoleStatusCodes.INACCESSIBLE,
				];
			case "all":
			default:
				return undefined;
		}
	}
}

// Export singleton instance
export const drillPlanListService = new DrillPlanListService();
