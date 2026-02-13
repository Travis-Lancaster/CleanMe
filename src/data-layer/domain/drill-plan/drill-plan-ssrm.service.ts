/**
 * DrillPlan SSRM Service
 *
 * Thin adapter for AG Grid Server-Side Row Model (SSRM) integration.
 * Delegates actual data fetching to DrillPlanService for unified offline-first behavior.
 *
 * This service encapsulates:
 * - SSRM request/response mapping (re-exported from service)
 * - Delegation to unified DrillPlanService
 * - Offline fallback to Dexie
 */

import type { VwDrillPlan } from "../../api/database/data-contracts";
import type { SSRMRequestWithExternal, SSRMResponse } from "./drill-plan.service";
import { db } from "../../db/connection";
import { drillPlanService } from "./drill-plan.service";

/**
 * Fetch drill plans with SSRM parameters
 *
 * Delegates to DrillPlanService.fetchSSRM() which handles:
 * - SSRM request mapping
 * - API-first fetching with Dexie caching
 * - Offline fallback
 *
 * @param request - SSRM request with external filters
 * @returns Paginated drill plans response
 */
export async function fetchDrillPlanSSRM(
	request: SSRMRequestWithExternal,
): Promise<SSRMResponse<VwDrillPlan>> {
	return drillPlanService.fetchSSRM(request);
}

/**
 * Fetch all drill plans from Dexie for offline mode
 *
 * Loads all data from IndexedDB for client-side operations.
 * Used as fallback when API is unavailable.
 *
 * @returns Array of all drill plans from Dexie
 */
export async function fetchAllDrillPlanLocal(): Promise<VwDrillPlan[]> {
	console.log("[DrillPlan SSRM Service] Fetching all data from Dexie (offline mode)...");

	try {
		// Read from Dexie instead of API
		const data = await db.Planning_DrillPlan.toArray();

		console.log("[DrillPlan SSRM Service] Local data loaded from Dexie:", {
			count: data.length,
		});

		return data;
	}
	catch (error) {
		console.error("[DrillPlan SSRM Service] Failed to fetch from Dexie:", error);
		throw error;
	}
}

// Re-export types for backward compatibility
export type { SSRMRequestWithExternal, SSRMResponse };

console.log("[DRILL-PLAN-SSRM-SERVICE] 🔧 DrillPlan SSRM service loaded (thin wrapper)");
