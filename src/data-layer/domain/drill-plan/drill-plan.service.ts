/**
 * DrillPlan Service - Cache-Aside Pattern
 *
 * Handles fetching from API and caching in Dexie with cache-aside pattern.
 * Business logic layer between UI and repository.
 *
 * WHY CACHE-ASIDE:
 * - With dexie-syncable, local cache is continuously synchronized with server
 * - Cache is always current (background sync every N seconds)
 * - Checking cache first provides instant rendering (50ms vs 500ms API call)
 * - useLiveQuery in components auto-refreshes when sync updates cache
 * - Works offline (fallback to cached data)
 *
 * PATTERNS IMPLEMENTED:
 * - SSRM (fetchSSRM): Cache-first for paginated lists
 * - Single record (fetchById): Cache-first for detail views
 * - Bulk operations (refreshAll): Full cache refresh
 *
 * CACHE FRESHNESS:
 * - Dexie-syncable runs continuously in background
 * - When server data changes, sync updates local cache
 * - useLiveQuery detects cache changes and triggers UI refresh
 * - No manual refresh needed - data stays current automatically
 *
 * @see plans/cache-aside-ssrm-with-sync-final.md
 */

import Dexie from "dexie";
import type { VwDrillPlan } from "../../api/database/data-contracts";
import { apiClient } from "../../api/apiClient";
import { db } from "../../db/connection";
import { drillPlanRepo } from "./drill-plan.repo";

export interface FetchDrillPlansOptions {
	page?: number
	pageSize?: number
	status?: string[]
	project?: string
	searchText?: string
	forceRefresh?: boolean
}

/**
 * SSRM Request structure with external filters
 */
export interface SSRMRequestWithExternal {
	startRow: number
	endRow: number
	sortModel?: { colId: string, sort: "asc" | "desc" }[]
	filterModel?: Record<string, any>
	quickFilterText?: string
	statusFilters?: string[]
}

/**
 * SSRM Response structure
 */
export interface SSRMResponse<T> {
	data: T[]
	totalCount: number
	page: number
	take: number
}

/**
 * Convert SSRM sort model to API format
 *
 * @param sortModel - AG Grid sort model
 * @returns JSON string of sort configuration
 */
function mapSortModel(sortModel: { colId: string, sort: "asc" | "desc" }[]): string {
	if (!sortModel || sortModel.length === 0) {
		return "[]";
	}

	const sorts = sortModel.map(sort => ({
		field: sort.colId,
		direction: sort.sort.toUpperCase(), // 'ASC' or 'DESC'
	}));

	return JSON.stringify(sorts);
}

/**
 * Map AG Grid filter types to backend operators
 */
function mapFilterOperator(agGridType: string): string {
	const operatorMap: Record<string, string> = {
		equals: "eq",
		notEqual: "neq",
		contains: "like",
		notContains: "nlike",
		startsWith: "sw",
		endsWith: "ew",
		lessThan: "lt",
		lessThanOrEqual: "lte",
		greaterThan: "gt",
		greaterThanOrEqual: "gte",
		in: "in",
		inRange: "between",
	};

	return operatorMap[agGridType] || "eq";
}

/**
 * Convert SSRM filter model to API format
 *
 * @param filterModel - AG Grid filter model
 * @returns JSON string of filter configuration
 */
function mapFilterModel(filterModel: Record<string, any>): string {
	if (!filterModel || Object.keys(filterModel).length === 0) {
		return JSON.stringify({ filters: [] });
	}

	const filters = Object.entries(filterModel).map(([field, filter]) => {
		// Handle different filter types
		let operator = "eq";
		let value = filter.filter || filter.value;

		if (filter.type) {
			operator = mapFilterOperator(filter.type);
		}

		// Handle combined filters (multiple conditions with AND/OR)
		if (filter.operator && filter.conditions) {
			// For now, just use the first condition
			// TODO: Support complex AND/OR conditions
			const firstCondition = filter.conditions[0];
			operator = mapFilterOperator(firstCondition.type);
			value = firstCondition.filter || firstCondition.value;
		}

		return {
			field,
			op: operator,
			value,
		};
	});

	// Wrap in filters object as expected by backend
	return JSON.stringify({ filters });
}

export class DrillPlanService {
	/**
	 * Fetch drill plans with SSRM parameters (Cache-Aside Pattern)
	 *
	 * CACHE-ASIDE IMPLEMENTATION:
	 * 1. Check Dexie cache first for instant rendering
	 * 2. If cache has data → return from cache (50ms, 10x faster than API)
	 * 3. If cache empty → fetch from API and cache results
	 * 4. On API error → fallback to all cached data
	 *
	 * WHY THIS WORKS:
	 * - Dexie-syncable keeps cache current via background sync
	 * - useLiveQuery in DrillPlanListView detects cache changes
	 * - Grid auto-refreshes when sync updates local data
	 * - Users get instant rendering + always-fresh data
	 *
	 * @param request - SSRM request with external filters
	 * @returns Paginated drill plans response
	 */
	async fetchSSRM(request: SSRMRequestWithExternal): Promise<SSRMResponse<VwDrillPlan>> {
		// Calculate page number from startRow/endRow
		const pageSize = request.endRow - request.startRow;
		const page = Math.floor(request.startRow / pageSize) + 1;

		console.log("[DrillPlanService] 🔍 fetchSSRM with cache-aside pattern:", {
			page,
			pageSize,
			search: request.quickFilterText,
			statusFilters: request.statusFilters,
			sorts: request.sortModel,
			filters: request.filterModel,
		});

		try {
			// ============================================
			// STEP 1: CHECK CACHE FIRST (Cache-Aside Pattern)
			// ============================================
			const cachedCount = await db.Planning_DrillPlan.count();

			if (cachedCount > 0) {
				console.log("[DrillPlanService] ✅ Cache HIT - returning cached data", {
					cachedCount,
					willUseDexie: true,
				});

				// Build Dexie query from SSRM request
				let query = db.Planning_DrillPlan.toCollection();

				// Apply status filters
				if (request.statusFilters && request.statusFilters.length > 0) {
					query = query.filter((item) => {
						return !!request.statusFilters!.includes(item.HoleStatus || "");
					});
				}

				// Apply search text (client-side filtering)
				if (request.quickFilterText) {
					const searchLower = request.quickFilterText.toLowerCase();
					query = query.filter((item) => {
						return !!(
							item.PlannedHoleNm?.toLowerCase().includes(searchLower)
							|| item.ProposedHoleNm?.toLowerCase().includes(searchLower)
							|| item.HoleNm?.toLowerCase().includes(searchLower)
							|| item.Project?.toLowerCase().includes(searchLower)
							|| item.Target?.toLowerCase().includes(searchLower)
						);
					});
				}

				// Get total count before pagination
				const totalCount = await query.count();

				// Apply sorting (must fetch all and sort in-memory for non-indexed fields)
				if (request.sortModel && request.sortModel.length > 0) {
					const sortField = request.sortModel[0].colId as keyof VwDrillPlan;
					const sortDir = request.sortModel[0].sort;

					const allMatching = await query.toArray();

					allMatching.sort((a, b) => {
						const aVal = a[sortField];
						const bVal = b[sortField];

						if (aVal === bVal)
							return 0;
						if (aVal == null)
							return 1;
						if (bVal == null)
							return -1;

						const comparison = aVal < bVal ? -1 : 1;
						return sortDir === "asc" ? comparison : -comparison;
					});

					// Return requested page
					const pageData = allMatching.slice(request.startRow, request.endRow);

					console.log("[DrillPlanService] ✅ Returning sorted page from cache:", {
						pageSize: pageData.length,
						totalCount,
						page,
					});

					return {
						data: pageData,
						totalCount,
						page,
						take: pageSize,
					};
				}

				// No sorting - simple pagination
				const pageData = await query
					.offset(request.startRow)
					.limit(pageSize)
					.toArray();

				console.log("[DrillPlanService] ✅ Returning page from cache:", {
					pageSize: pageData.length,
					totalCount,
					page,
				});

				return {
					data: pageData,
					totalCount,
					page,
					take: pageSize,
				};
			}

			// ============================================
			// STEP 2: CACHE MISS - Fetch from API
			// ============================================
			console.log("[DrillPlanService] ⚠️ Cache MISS - fetching from API (first load)");

			// Build API query parameters
			const queryParams: any = {
				page,
				take: pageSize,
			};

			// Add search if provided
			if (request.quickFilterText) {
				queryParams.search = request.quickFilterText;
			}

			// Add sorting if provided
			if (request.sortModel && request.sortModel.length > 0) {
				queryParams.sorts = mapSortModel(request.sortModel);
			}

			// Build filters array combining column filters and status filters
			const allFilters: any[] = [];

			// Add column filters if provided
			if (request.filterModel && Object.keys(request.filterModel).length > 0) {
				const filterModelStr = mapFilterModel(request.filterModel);
				const parsed = JSON.parse(filterModelStr);
				allFilters.push(...parsed.filters);
			}

			// Add status filters from chips if provided
			if (request.statusFilters && request.statusFilters.length > 0) {
				allFilters.push({
					field: "HoleStatus",
					op: "in",
					value: request.statusFilters,
				});
			}

			// Set filters parameter with proper format
			if (allFilters.length > 0) {
				queryParams.filters = JSON.stringify({ filters: allFilters });
			}

			// Call API
			const response = await apiClient.vwDrillPlanControllerFindAll(queryParams);

			// Extract data and metadata from response
			const responseData = response.data as any;
			const data = responseData?.data || response.data || [];
			const meta = responseData?.meta;
			const totalCount = meta?.itemCount || meta?.totalCount || data.length;

			// ============================================
			// STEP 3: SAVE TO CACHE
			// ============================================
			if (Array.isArray(data) && data.length > 0) {
				await Dexie.ignoreTransaction(async () => {
					await db.Planning_DrillPlan.bulkPut(data);
					const totalInDb = await db.Planning_DrillPlan.count();
					console.log("[DrillPlanService] ✅ Cached fresh data from API:", {
						recordsCached: data.length,
						totalInDexie: totalInDb,
						page,
					});
				});
			}

			console.log("[DrillPlanService] ✅ Returning fresh data from API:", {
				dataLength: data.length,
				totalCount,
				page,
			});

			return {
				data: Array.isArray(data) ? data : [],
				totalCount,
				page: meta?.page || page,
				take: meta?.take || pageSize,
			};
		}
		catch (error: any) {
			console.error("[DrillPlanService] ❌ API failed, falling back to cached data:", error);

			// ============================================
			// STEP 4: OFFLINE FALLBACK
			// ============================================
			try {
				const allCached = await db.Planning_DrillPlan.toArray();

				console.warn("[DrillPlanService] 📴 Using offline fallback (all cached data):", {
					cachedCount: allCached.length,
				});

				return {
					data: allCached,
					totalCount: allCached.length,
					page,
					take: pageSize,
				};
			}
			catch (dexieError) {
				console.error("[DrillPlanService] ❌ Fallback also failed:", dexieError);
				return {
					data: [],
					totalCount: 0,
					page,
					take: pageSize,
				};
			}
		}
	}

	/**
	 * Fetch drill plans from API and cache in Dexie
	 * Returns cached data if available, fetches from API if not
	 */
	async fetchAndCache(options: FetchDrillPlansOptions = {}): Promise<{
		data: VwDrillPlan[]
		total: number
		source: "cache" | "api"
	}> {
		const {
			page = 1,
			pageSize = 100,
			status,
			project,
			searchText,
			forceRefresh = false,
		} = options;

		console.log("[DrillPlanService] fetchAndCache", options);

		// Check if we should use cache
		if (!forceRefresh) {
			const cachedCount = await drillPlanRepo.count();

			if (cachedCount > 0) {
				console.log("[DrillPlanService] Using cached data", { cachedCount });

				const cached = await drillPlanRepo.getPaginated({
					page,
					pageSize,
					status,
					project,
					searchText,
				});

				return {
					...cached,
					source: "cache",
				};
			}
		}

		// Fetch from API
		console.log("[DrillPlanService] Fetching from API...");

		try {
			// Build API filters
			const filters: any = {};

			if (status && status.length > 0) {
				filters.HoleStatus = status;
			}

			if (project) {
				filters.Project = project;
			}

			const response = await apiClient.vwDrillPlanControllerFindAll({
				page,
				take: pageSize,
				search: searchText,
				filters: Object.keys(filters).length > 0 ? JSON.stringify(filters) : undefined,
				order: "DESC",
			});

			const plans = response.data.data || [];
			const total = response.data.meta?.itemCount || plans.length;

			console.log("[DrillPlanService] API returned", { count: plans.length, total });

			// Cache in Dexie
			if (plans.length > 0) {
				console.log("[DrillPlanService] Caching in Dexie...");
				await drillPlanRepo.bulkSave(plans);
			}

			return {
				data: plans,
				total,
				source: "api",
			};
		}
		catch (error: any) {
			console.error("[DrillPlanService] API fetch failed", error);

			// Fallback to cache on network error
			const cached = await drillPlanRepo.getPaginated({
				page,
				pageSize,
				status,
				project,
				searchText,
			});

			return {
				...cached,
				source: "cache",
			};
		}
	}

	/**
	 * Fetch drill plan by ID from API
	 *
	 * Low-level method for direct API access.
	 * Prefer fetchById() which implements cache-aside pattern.
	 *
	 * @param id - DrillPlan GUID
	 * @returns Fresh drill plan data from server
	 * @throws Error if API call fails
	 */
	async fetchByIdFromApi(id: string): Promise<VwDrillPlan> {
		console.log("[DrillPlanService] 🌐 Fetching from API", { id });

		try {
			const response = await apiClient.vwDrillPlanControllerFindOne(id);
			console.log("[DrillPlanService] ✅ Fetched from API", { id });
			return response.data;
		}
		catch (error: any) {
			console.error("[DrillPlanService] ❌ API fetch failed", { id, error });
			throw error;
		}
	}

	/**
	 * Fetch drill plan by ID (Cache-Aside Pattern)
	 *
	 * CACHE-ASIDE IMPLEMENTATION:
	 * 1. Check Dexie cache first
	 * 2. If cache hit → return cached data (instant)
	 * 3. If cache miss → fetch from API
	 * 4. Save to Dexie (dexie-syncable will auto-sync if changed)
	 * 5. Return fresh data
	 *
	 * ERROR HANDLING:
	 * - If API fails but cache exists → return stale cache (offline fallback)
	 * - If API fails and no cache → throw error
	 *
	 * WHY THIS WORKS:
	 * - Dexie-syncable keeps cache current via background sync
	 * - Cache hit provides instant rendering (50ms vs 500ms)
	 * - useLiveQuery in DrillPlanFormView detects cache changes
	 * - Form auto-updates when sync updates local data
	 *
	 * @param id - DrillPlan GUID
	 * @returns Drill plan data (cached or fresh)
	 */
	async fetchById(id: string): Promise<VwDrillPlan | undefined> {
		console.log("[DrillPlanService] 🔍 Fetching drill plan", { id });

		try {
			// ============================================
			// STEP 1: CHECK CACHE FIRST (Cache-Aside Pattern)
			// ============================================
			console.log("[DrillPlanService] 🔍 Checking Dexie cache...", { id });
			const cached = await drillPlanRepo.getById(id);

			if (cached) {
				console.log("[DrillPlanService] ✅ Cache HIT - returning cached data", {
					id,
					cachedKeys: Object.keys(cached).length,
				});
				return cached;
			}

			// ============================================
			// STEP 2: CACHE MISS - Fetch from API
			// ============================================
			console.log("[DrillPlanService] ⚠️ Cache MISS - fetching from API", { id });
			const fresh = await this.fetchByIdFromApi(id);
			console.log("[DrillPlanService] ✅ API returned data", {
				id,
				freshKeys: Object.keys(fresh).length,
			});

			// ============================================
			// STEP 3: SAVE TO CACHE
			// ============================================
			console.log("[DrillPlanService] 💾 Saving to Dexie cache...", { id });
			await db.Planning_DrillPlan.put(fresh);

			console.log("[DrillPlanService] ✅ Cached fresh data successfully", { id });
			return fresh;
		}
		catch (error: any) {
			console.error("[DrillPlanService] ❌ Failed to fetch", { id, error });

			// ============================================
			// STEP 4: OFFLINE FALLBACK
			// ============================================
			// If API failed, try to return stale cache
			const cached = await drillPlanRepo.getById(id);
			if (cached) {
				console.warn("[DrillPlanService] 📴 Using stale cache (offline mode)", { id });
				return cached;
			}

			throw error;
		}
	}

	/**
	 * Refresh all drill plans from API
	 */
	async refreshAll(): Promise<void> {
		console.log("[DrillPlanService] Refreshing all plans...");

		// Clear cache
		await drillPlanRepo.clearAll();

		// Fetch fresh data (multiple pages if needed)
		let page = 1;
		let hasMore = true;

		while (hasMore) {
			const result = await this.fetchAndCache({
				forceRefresh: true,
				pageSize: 500,
				page,
			});

			if (result.data.length < 500) {
				hasMore = false;
			}
			else {
				page++;
			}
		}

		console.log("[DrillPlanService] Refresh complete");
	}

	/**
	 * Save a drill plan (create or update)
	 * Follows offline-first pattern - saves to local DB first, then syncs to API
	 */
	async save(plan: VwDrillPlan): Promise<VwDrillPlan> {
		console.log("[DrillPlanService] Saving plan", { id: plan.DrillPlanId });

		try {
			// OFFLINE-FIRST: Save to local DB immediately
			await drillPlanRepo.save(plan);

			console.log("[DrillPlanService] ✅ Plan saved to local DB", {
				id: plan.DrillPlanId,
				willSync: true,
			});

			return plan;
		}
		catch (error) {
			console.error("[DrillPlanService] ❌ Save failed", error);
			throw error;
		}
	}

	/**
	 * Delete a drill plan (soft delete)
	 */
	async delete(id: string): Promise<void> {
		console.log("[DrillPlanService] Deleting plan", { id });

		// Soft delete in cache
		await drillPlanRepo.softDelete(id);

		// Note: API soft delete would happen via sync protocol
	}

	/**
	 * Get status counts
	 */
	async getStatusCounts(): Promise<Record<string, number>> {
		return drillPlanRepo.getCountByStatus();
	}
}

// Singleton instance
export const drillPlanService = new DrillPlanService();

// Export helper functions for external use if needed
export { mapFilterModel, mapFilterOperator, mapSortModel };

console.log("[DRILL-PLAN-SERVICE] 🔧 DrillPlan service loaded (with SSRM support)");
