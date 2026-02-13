/**
 * RigSetup Repository - Dexie Query Layer
 *
 * Abstracts IndexedDB operations for RigSetup entity
 * All components should use this instead of db.DrillHole_RigSetup directly
 */

import type { RigSetup } from "#src/data-access/api/database/data-contracts.js";
import { db } from "#src/data-access/db/connection.js";

class RigSetupRepository {
	private static _instance: RigSetupRepository | null = null;

	private constructor() { }

	static getInstance(): RigSetupRepository {
		if (!RigSetupRepository._instance) {
			RigSetupRepository._instance = new RigSetupRepository();
		}
		return RigSetupRepository._instance;
	}

	/**
	 * Get rig setup by ID
	 */
	async getById(id: string): Promise<RigSetup | undefined> {
		console.log("[RigSetupRepo] Getting rig setup by ID:", { id });
		return await db.DrillHole_RigSetup.get(id);
	}

	/**
	 * Get rig setup by drill plan ID
	 */
	async getByDrillPlanId(drillPlanId: string): Promise<RigSetup | undefined> {
		console.log("[RigSetupRepo] Getting rig setup by drill plan ID:", { drillPlanId });
		return await db.DrillHole_RigSetup
			.where("DrillPlanId")
			.equals(drillPlanId)
			.first();
	}

	/**
	 * Get all rig setups (unpaginated)
	 */
	async getAll(): Promise<RigSetup[]> {
		console.log("[RigSetupRepo] Getting all rig setups");
		return await db.DrillHole_RigSetup.toArray();
	}

	/**
	 * Get paginated rig setups
	 */
	async getPaginated(options: {
		page?: number
		pageSize?: number
		organization?: string
		status?: number
		searchText?: string
	}): Promise<{ data: RigSetup[], total: number }> {
		const { page = 1, pageSize = 100, organization, status, searchText } = options;

		let query = db.DrillHole_RigSetup.toCollection();

		// Apply filters
		if (organization) {
			query = query.and(item => item.Organization === organization);
		}

		if (status !== undefined) {
			query = query.and(item => item.RowStatus === status);
		}

		if (searchText) {
			const searchLower = searchText.toLowerCase();
			query = query.filter((item) => {
				const searchableText = [
					item.DrillingCompany,
					item.DrillSupervisor,
					item.FinalGeologist,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				return searchableText.includes(searchLower);
			});
		}

		// Get total count
		const total = await query.count();

		// Apply pagination
		const offset = (page - 1) * pageSize;
		const data = await query.offset(offset).limit(pageSize).toArray();

		return { data, total };
	}

	/**
	 * Search rig setups (basic text search)
	 */
	async search(query: string): Promise<RigSetup[]> {
		console.log("[RigSetupRepo] Searching rig setups:", { query });
		const searchLower = query.toLowerCase();

		return await db.DrillHole_RigSetup
			.filter((item) => {
				const searchableText = [
					item.DrillingCompany,
					item.DrillSupervisor,
					item.FinalGeologist,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				return searchableText.includes(searchLower);
			})
			.toArray();
	}

	/**
	 * Create or update rig setup
	 */
	async save(data: RigSetup): Promise<string> {
		console.log("[RigSetupRepo] Saving rig setup:", { id: data.RigSetupId });
		const id = await db.DrillHole_RigSetup.put(data);
		return id as string;
	}

	/**
	 * Delete rig setup
	 */
	async delete(id: string): Promise<void> {
		console.log("[RigSetupRepo] Deleting rig setup:", { id });
		await db.DrillHole_RigSetup.delete(id);
	}

	/**
	 * Bulk insert rig setups
	 */
	async bulkCreate(items: RigSetup[]): Promise<void> {
		console.log("[RigSetupRepo] Bulk creating rig setups:", { count: items.length });
		await db.DrillHole_RigSetup.bulkPut(items);
	}

	/**
	 * Get count of rig setups by status
	 */
	async getCountByStatus(): Promise<Record<number, number>> {
		console.log("[RigSetupRepo] Getting count by status");
		const all = await db.DrillHole_RigSetup.toArray();
		const counts: Record<number, number> = {};

		all.forEach((item) => {
			const status = item.RowStatus || 0;
			counts[status] = (counts[status] || 0) + 1;
		});

		return counts;
	}
}

export const rigSetupRepo = new Proxy({} as RigSetupRepository, {
	get(target, prop) {
		const instance = RigSetupRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});
