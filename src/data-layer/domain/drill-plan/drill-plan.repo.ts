/**
 * DrillPlan Repository
 * Handles CRUD operations and domain-specific queries for drill plans
 *
 * Uses Dexie for IndexedDB storage with LiveQuery support
 * Extends BaseRepository for common operations
 */

import type { VwDrillPlan } from "../../api/database/data-contracts";
import { db } from "../../db/connection";
import { BaseRepository } from "../base.repo";

export class DrillPlanRepository extends BaseRepository<VwDrillPlan> {
	private static _instance: DrillPlanRepository | null = null;

	private constructor() {
		super(db.Planning_DrillPlan);
	}

	static getInstance(): DrillPlanRepository {
		if (!DrillPlanRepository._instance) {
			DrillPlanRepository._instance = new DrillPlanRepository();
		}
		return DrillPlanRepository._instance;
	}

	/**
	 * Get drill plans by pattern
	 */
	async getByPattern(patternId: string): Promise<VwDrillPlan[]> {
		console.log("[DrillPlanRepo] Getting plans for pattern", { patternId });

		return db.Planning_DrillPlan
			.where("DrillPattern")
			.equals(patternId)
			.and(plan => plan.ActiveInd === true)
			.toArray();
	}

	/**
	 * Get drill plans by status
	 */
	async getByStatus(status: string | string[]): Promise<VwDrillPlan[]> {
		console.log("[DrillPlanRepo] Getting plans by status", { status });

		const statuses = Array.isArray(status) ? status : [status];

		if (statuses.length === 0) {
			return this.getAll();
		}

		return db.Planning_DrillPlan
			.where("HoleStatus")
			.anyOf(statuses)
			.and(plan => plan.ActiveInd === true)
			.toArray();
	}

	/**
	 * Get drill plans by project
	 */
	async getByProject(project: string): Promise<VwDrillPlan[]> {
		console.log("[DrillPlanRepo] Getting plans for project", { project });

		return db.Planning_DrillPlan
			.where("Project")
			.equals(project)
			.and(plan => plan.ActiveInd === true)
			.toArray();
	}

	/**
	 * Search drill plans (basic text search across multiple fields)
	 */
	async search(query: string): Promise<VwDrillPlan[]> {
		console.log("[DrillPlanRepo] Searching plans", { query });

		if (!query || query.trim().length === 0) {
			return this.getAll();
		}

		const searchLower = query.toLowerCase();

		return db.Planning_DrillPlan
			.where("ActiveInd")
			.equals(1)
			.filter((plan) => {
				// Search across multiple text fields
				const searchableText = [
					plan.Project,
					plan.Target,
					plan.Organization,
					plan.HoleStatus,
					plan.DrillPattern,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				return searchableText.includes(searchLower);
			})
			.toArray();
	}

	/**
	 * Get paginated drill plans with filtering
	 * Uses table scan instead of indexes to avoid null value issues
	 */
	async getPaginated(options: {
		page?: number
		pageSize?: number
		status?: string[]
		project?: string
		searchText?: string
		sortBy?: "ModifiedOnDt" | "CreatedOnDt" | "DrillPriority"
		sortOrder?: "asc" | "desc"
	}): Promise<{ data: VwDrillPlan[], total: number }> {
		const {
			page = 1,
			pageSize = 100,
			status,
			project,
			searchText,
			sortBy = "ModifiedOnDt",
			sortOrder = "desc",
		} = options;

		console.log("[DrillPlanRepo] Getting paginated plans", options);

		// Use toArray() with filters instead of indexed queries to avoid null issues
		const allPlans = await db.Planning_DrillPlan.toArray();

		// Filter in memory
		const filtered = allPlans.filter((plan) => {
			// Filter by ActiveInd (check for truthy, not strict equality)
			if (plan.ActiveInd !== true)
				return false;

			// Filter by project if specified
			if (project && plan.Project !== project)
				return false;

			// Filter by status if specified
			if (status && status.length > 0) {
				if (!plan.HoleStatus || !status.includes(plan.HoleStatus)) {
					return false;
				}
			}

			// Filter by search text if specified
			if (searchText) {
				const searchLower = searchText.toLowerCase();
				const searchableText = [
					plan.Project,
					plan.Target,
					plan.Organization,
					plan.HoleStatus,
					plan.DrillPattern,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				if (!searchableText.includes(searchLower)) {
					return false;
				}
			}

			return true;
		});

		const total = filtered.length;

		// Sort (if needed, for now just use default order)
		// Pagination
		const offset = (page - 1) * pageSize;
		const data = filtered.slice(offset, offset + pageSize);

		console.log("[DrillPlanRepo] Paginated results", { total, returned: data.length });

		return { data, total };
	}

	/**
	 * Get plans marked for offline use
	 */
	async getOfflinePlans(): Promise<VwDrillPlan[]> {
		const metadata = await db.syncMetadata
			.where("entityType")
			.equals("DrillPlan")
			.and(m => m.isOffline === true)
			.toArray();

		const planIds = metadata.map(m => m.entityId);
		return db.Planning_DrillPlan.where("DrillPlanId").anyOf(planIds).toArray();
	}

	/**
	 * Get count by status
	 */
	async getCountByStatus(): Promise<Record<string, number>> {
		console.log("[DrillPlanRepo] Getting count by status");

		const plans = await db.Planning_DrillPlan
			.where("ActiveInd")
			.equals(1)
			.toArray();

		const counts: Record<string, number> = {};

		plans.forEach((plan) => {
			const status = plan.HoleStatus || "Unknown";
			counts[status] = (counts[status] || 0) + 1;
		});

		return counts;
	}
}

// Singleton instance via lazy getter
export const drillPlanRepo = new Proxy({} as DrillPlanRepository, {
	get(target, prop) {
		const instance = DrillPlanRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});

console.log("[DRILL-PLAN-REPO] 🗄️ DrillPlan repository loaded");
