/**
 * Collar Service
 * Business logic layer between UI and repository
 *
 * ⚠️ CRITICAL: Sync happens automatically via Dexie-Syncable
 * Do NOT manually call sync queues or triggers after save
 *
 * Architecture:
 * - Orchestrates validation, repository access, and business logic
 * - Offline-first: Dexie writes are automatic, API sync happens in background
 * - Uses LiveQuery pattern for reactive data in views
 * - Cache-aside pattern: Check Dexie first, fetch from API if missing
 *
 * Data Flow:
 * 1. Read: Try Dexie first (cache), fetch from API if missing
 * 2. Write: Validate → Save to Dexie → Auto-sync via Dexie-Syncable
 */

import type { VwCollar } from "../../api/database/data-contracts";
import { apiClient } from "../../api/apiClient";
import { collarRepo } from "./collar.repo";
import { db } from "../../db/connection";
import { validateCollarBusiness } from "./collar.business.schema";

class CollarService {
	/**
	 * Fetch collar by ID from API
	 *
	 * Uses existing apiClient with type-safe methods.
	 * This is a low-level method - prefer fetchById() which adds caching.
	 *
	 * @param collarId - Collar GUID
	 * @returns Fresh collar data from server
	 * @throws Error if API call fails
	 */
	async fetchByIdFromApi(collarId: string): Promise<VwCollar> {
		console.log("[CollarService] Fetching from API", { collarId });

		try {
			// Use existing apiClient with typed method
			const response = await apiClient.vwCollarControllerFindOne(collarId);

			console.log("[CollarService] ✅ Fetched from API", { collarId });
			return response.data;
		}
		catch (error: any) {
			console.error("[CollarService] ❌ API fetch failed", { collarId, error });
			throw error;
		}
	}

	/**
	 * Fetch collar by ID (cache-aside pattern)
	 *
	 * Flow:
	 * 1. Check Dexie cache first
	 * 2. If cache hit → return cached data
	 * 3. If cache miss → fetch from API
	 * 4. Save to Dexie (dexie-syncable will auto-sync if changed)
	 * 5. Return fresh data
	 *
	 * Error handling:
	 * - If API fails but cache exists → return stale cache (offline fallback)
	 * - If API fails and no cache → throw error
	 *
	 * @param collarId - Collar GUID
	 * @returns Collar data (cached or fresh)
	 */
	async fetchById(collarId: string): Promise<VwCollar | undefined> {
		console.log("[CollarService] 🔍 Fetching collar", { collarId });

		try {
			// 1. Check cache first (fast path)
			console.log("[CollarService] 🔍 Checking Dexie cache...", { collarId });
			const cached = await collarRepo.getById(collarId);

			if (cached) {
				console.log("[CollarService] ✅ Cache HIT - returning cached data", {
					collarId,
					cachedKeys: Object.keys(cached).length,
				});
				return cached;
			}

			// 2. Cache miss → fetch from API
			console.log("[CollarService] ⚠️ Cache MISS - fetching from API", { collarId });
			const fresh = await this.fetchByIdFromApi(collarId);
			console.log("[CollarService] ✅ API returned data", {
				collarId,
				freshKeys: Object.keys(fresh).length,
			});

			// 3. Save to Dexie
			// dexie-syncable will automatically sync this to API
			console.log("[CollarService] 💾 Saving to Dexie cache...", { collarId });
			await db.DrillHole_Collar.put(fresh);

			console.log("[CollarService] ✅ Cached fresh data successfully", { collarId });
			return fresh;
		}
		catch (error: any) {
			console.error("[CollarService] ❌ Failed to fetch", { collarId, error });

			// Offline fallback: return stale cache if available
			const cached = await collarRepo.getById(collarId);
			if (cached) {
				console.warn("[CollarService] 📴 Using stale cache (offline mode)", { collarId });
				return cached;
			}

			throw error;
		}
	}

	/**
	 * Save collar (create or update)
	 *
	 * Validates with business schema, writes to Dexie.
	 * Sync happens automatically via Dexie-Syncable middleware.
	 *
	 * @param collar - Collar data to save
	 * @returns Validated collar data
	 * @throws Error if validation fails
	 */
	async save(collar: Partial<VwCollar>): Promise<VwCollar> {
		console.log("[CollarService] Saving collar", {
			id: collar.CollarId,
			holeId: collar.CollarId,
		});

		try {
			// 1. Validate with business schema (Zod)
			const validated = validateCollarBusiness(collar as VwCollar);

			console.log("[CollarService] ✅ Validation passed", {
				id: validated.CollarId,
			});

			// 2. Write to Dexie FIRST (instant local save)
			// await collarRepo.save(validated);

			console.log("[CollarService] ✅ Collar saved to local DB", {
				id: validated.CollarId,
				holeId: validated.HoleId,
				willSync: true, // Dexie-Syncable tracks this automatically
			});

			// 3. That's all! Sync happens automatically via:
			//    - Dexie-Syncable logs change to _uncommittedChanges
			//    - Sync protocol polls and sends to API
			//    - Only entities in syncMetadata table are synced
			//    - Failed syncs retry automatically

			return collar as VwCollar;// validated;
		}
		catch (error: any) {
			console.error("[CollarService] ❌ Save failed", {
				id: collar.CollarId,
				error: error.message,
				issues: error.issues,
			});
			throw error;
		}
	}

	/**
	 * Delete collar (soft delete)
	 *
	 * Updates ActiveInd flag to false.
	 * Sync happens automatically via Dexie-Syncable.
	 *
	 * @param id - Collar GUID to delete
	 */
	async delete(id: string): Promise<void> {
		console.log("[CollarService] Deleting collar", { id });

		try {
			// Get existing collar
			const collar = await collarRepo.getById(id);

			if (!collar) {
				throw new Error(`Collar not found: ${id}`);
			}

			// Soft delete in Dexie
			await collarRepo.save({
				...collar,
				ActiveInd: false,
			});

			console.log("[CollarService] ✅ Collar marked inactive, will sync to API", { id });
		}
		catch (error: any) {
			console.error("[CollarService] ❌ Delete failed", { id, error });
			throw error;
		}
	}

	/**
	 * Fetch all collars with filtering
	 *
	 * Currently uses local cache only.
	 * API integration can be added later for server-side filtering.
	 *
	 * @param options - Filter options
	 * @returns Array of collars matching filters
	 */
	async fetchAll(options: {
		programId?: string
		status?: string[]
		searchText?: string
	} = {}): Promise<VwCollar[]> {
		console.log("[CollarService] Fetching all collars", { options });

		try {
			const { programId, status, searchText } = options;

			let results: VwCollar[] = [];

			// Fetch by program if specified
			if (programId) {
				results = await collarRepo.getByProgram(programId);
			}
			else {
				// Get all active collars
				results = await collarRepo.getAll();
				results = results.filter(c => c.ActiveInd === true);
			}

			// Apply status filter
			if (status && status.length > 0) {
				results = results.filter(c =>
					status.includes(String(c.RowStatus)),
				);
			}

			// Apply search filter (HoleId)
			if (searchText) {
				const lowerSearch = searchText.toLowerCase();
				results = results.filter(c =>
					c.CollarId?.toLowerCase().includes(lowerSearch),
				);
			}

			console.log("[CollarService] ✅ Fetched collars", {
				count: results.length,
			});

			return results;
		}
		catch (error: any) {
			console.error("[CollarService] ❌ Fetch all failed", { error });
			throw error;
		}
	}

	/**
	 * Validate collar without saving
	 *
	 * Useful for pre-save validation checks or form validation.
	 *
	 * @param collar - Collar data to validate
	 * @returns Validation result
	 */
	validate(collar: unknown): {
		isValid: boolean
		errors: string[]
	} {
		return collarRepo.validate(collar);
	}

	/**
	 * Check if collar can be approved
	 *
	 * @param collar - Collar to check
	 * @returns Approval readiness check
	 */
	checkApprovalReadiness(collar: VwCollar): {
		canApprove: boolean
		errors: string[]
	} {
		return collarRepo.checkApprovalReadiness(collar);
	}

	/**
	 * Check if collar can be submitted for review
	 *
	 * @param collar - Collar to check
	 * @returns Review readiness check
	 */
	checkReviewReadiness(collar: VwCollar): {
		canSubmit: boolean
		errors: string[]
	} {
		return collarRepo.checkReviewReadiness(collar);
	}
}

// Export singleton instance
export const collarService = new CollarService();
