/**
 * useDrillPlanData Hook
 * Reactive data hook for drill plans using Dexie LiveQuery
 *
 * Provides real-time updates when drill plan data changes in IndexedDB
 * Handles fetching from API, caching, and reactive UI updates
 */

import { useCallback, useEffect, useState } from "react";

import type { FetchDrillPlansOptions } from "../domain/drill-plan/drill-plan.service";
import type { VwDrillPlan } from "../api/database/data-contracts";
import apiClient from "../api/apiClient";
import { drillPlanRepo } from "../domain/drill-plan/drill-plan.repo";
import { drillPlanService } from "../domain/drill-plan/drill-plan.service";
import { useLiveQuery } from "dexie-react-hooks";

export interface UseDrillPlanDataOptions extends FetchDrillPlansOptions {
	autoFetch?: boolean // Auto-fetch on mount
	enabled?: boolean // Enable/disable the hook
}

export interface UseDrillPlanDataResult {
	// Data
	plans: VwDrillPlan[] | undefined
	total: number
	isLoading: boolean
	isFetching: boolean
	error: Error | null
	source: "cache" | "api" | null

	// Actions
	refresh: () => Promise<void>
	fetchMore: (page: number) => Promise<void>
	search: (query: string) => void
}

export function useDrillPlanData(
	options: UseDrillPlanDataOptions = {},
): UseDrillPlanDataResult {
	const {
		page = 1,
		pageSize = 100,
		status,
		project,
		searchText,
		autoFetch = true,
		enabled = true,
	} = options;

	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [total, setTotal] = useState(0);
	const [source, setSource] = useState<"cache" | "api" | null>(null);
	const [searchQuery, setSearchQuery] = useState(searchText || "");

	// LiveQuery - automatically re-runs when Dexie data changes
	// This provides real-time reactivity across tabs/components
	const plans = useLiveQuery(
		async () => {
			if (!enabled) {
				// Build API query parameters
				const queryParams: any = {
					page,
					take: pageSize,
					search: searchQuery,
					// sorts: mapSortModel(request.sortModel)
				};

				const response = await apiClient.vwDrillPlanControllerFindAll(queryParams);
				setTotal(response.data.meta.itemCount);
				console.log("[useDrillPlanData] LiveQuery result", {
					count: response.data.data.length,
					total: response.data.meta.itemCount,
				});
				return response.data.data;
			}

			console.log("[useDrillPlanData] LiveQuery executing...", {
				page,
				pageSize,
				status,
				searchQuery,
			});

			const result = await drillPlanRepo.getPaginated({
				page,
				pageSize,
				status,
				project,
				searchText: searchQuery,
			});

			setTotal(result.total);
			console.log("[useDrillPlanData] LiveQuery result", {
				count: result.data.length,
				total: result.total,
			});

			return result.data;
		},
		// Dependencies - LiveQuery re-runs when these change
		[page, pageSize, status, project, searchQuery, enabled],
		// Initial value while loading
		undefined,
	);

	// Initial fetch from API
	useEffect(() => {
		if (!autoFetch || !enabled)
			return;

		const initialFetch = async () => {
			setIsLoading(true);
			setIsFetching(true);
			setError(null);

			try {
				const result = await drillPlanService.fetchAndCache({
					page,
					pageSize,
					status,
					project,
					searchText: searchQuery,
				});

				setTotal(result.total);
				setSource(result.source);
				console.log("[useDrillPlanData] Initial fetch complete", {
					source: result.source,
					count: result.data.length,
				});
			}
			catch (err: any) {
				console.error("[useDrillPlanData] Initial fetch failed", err);
				setError(err);
			}
			finally {
				setIsLoading(false);
				setIsFetching(false);
			}
		};

		initialFetch();
	}, [autoFetch, enabled]); // Only run once on mount

	// Refresh data from API
	const refresh = useCallback(async () => {
		if (!enabled)
			return;

		setIsFetching(true);
		setError(null);

		try {
			await drillPlanService.refreshAll();
			setSource("api");
			console.log("[useDrillPlanData] Refresh complete");
		}
		catch (err: any) {
			console.error("[useDrillPlanData] Refresh failed", err);
			setError(err);
		}
		finally {
			setIsFetching(false);
		}
	}, [enabled]);

	// Fetch more pages
	const fetchMore = useCallback(
		async (newPage: number) => {
			if (!enabled)
				return;

			setIsFetching(true);
			setError(null);

			try {
				const result = await drillPlanService.fetchAndCache({
					page: newPage,
					pageSize,
					status,
					project,
					searchText: searchQuery,
				});

				setTotal(result.total);
				setSource(result.source);
				console.log("[useDrillPlanData] Fetch more complete", {
					page: newPage,
					source: result.source,
				});
			}
			catch (err: any) {
				console.error("[useDrillPlanData] Fetch more failed", err);
				setError(err);
			}
			finally {
				setIsFetching(false);
			}
		},
		[pageSize, status, project, searchQuery, enabled],
	);

	// Search handler
	const search = useCallback((query: string) => {
		console.log("[useDrillPlanData] Search", { query });
		setSearchQuery(query);
	}, []);

	return {
		plans,
		total,
		isLoading,
		isFetching,
		error,
		source,
		refresh,
		fetchMore,
		search,
	};
}

console.log("[USE-DRILL-PLAN-DATA] ⚛️ useDrillPlanData hook loaded");
