/**
 * GeologyCombinedLog Repository
 * Domain-specific queries for GeologyCombinedLog entities
 *
 * Responsibilities:
 * - CRUD operations for geology logs
 * - Collar-based queries
 * - Depth range queries
 * - Status-based filtering
 */

import type { GeologyCombinedLog } from "../../api/database/data-contracts";
import { db } from "../../db/connection";
import { BaseRepository } from "../base.repo";

export class GeologyCombinedLogRepository extends BaseRepository<GeologyCombinedLog, string> {
	private static _instance: GeologyCombinedLogRepository | null = null;

	private constructor() {
		super(db.Geology_GeologyCombinedLog);
	}

	static getInstance(): GeologyCombinedLogRepository {
		if (!GeologyCombinedLogRepository._instance) {
			GeologyCombinedLogRepository._instance = new GeologyCombinedLogRepository();
		}
		return GeologyCombinedLogRepository._instance;
	}

	/**
	 * Get all geology logs for a collar
	 * Ordered by depth (ascending)
	 */
	async getByCollar(collarId: string): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📋 Getting logs for collar", { collarId });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and((log: GeologyCombinedLog) => log.ActiveInd === true)
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found logs", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting logs", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get logs in depth range for a specific collar
	 * Uses compound index for efficient querying
	 */
	async getByDepthRange(
		collarId: string,
		depthFrom: number,
		depthTo: number,
	): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📏 Getting logs in depth range", {
			collarId,
			depthFrom,
			depthTo,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("[CollarId+DepthFrom]")
				.between(
					[collarId, depthFrom],
					[collarId, depthTo],
					true,
					true,
				)
				.toArray();

			console.log("[GEOLOGY-REPO] Found logs in range", {
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting logs by depth", error);
			throw error;
		}
	}

	/**
	 * Get logs by status for a specific collar
	 * Uses compound index for efficient querying
	 */
	async getByStatus(collarId: string, status: number): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📊 Getting logs by status", {
			collarId,
			status,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("[CollarId+RowStatus]")
				.equals([collarId, status])
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found logs", {
				collarId,
				status,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting by status", error);
			throw error;
		}
	}

	/**
	 * Get all logs for a collar (including inactive)
	 * Used for admin/audit purposes
	 */
	async getAllByCollar(collarId: string): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📋 Getting ALL logs for collar (including inactive)", { collarId });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found logs (all)", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting all logs", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get count of logs for a collar
	 * Useful for progress indicators
	 */
	async countByCollar(collarId: string): Promise<number> {
		try {
			const count = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and((log: GeologyCombinedLog) => log.ActiveInd === true)
				.count();

			return count;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error counting logs", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get logs that overlap a specific depth interval
	 * Used for validation (gap/overlap detection)
	 */
	async getOverlappingLogs(
		collarId: string,
		depthFrom: number,
		depthTo: number,
		excludeLogId?: string,
	): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 🔍 Finding overlapping logs", {
			collarId,
			depthFrom,
			depthTo,
			excludeLogId,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and((log: GeologyCombinedLog) => {
					// Must be active
					if (!(log.ActiveInd === true))
						return false;

					// Exclude the log we're checking against (for updates)
					if (excludeLogId && log.GeologyCombinedLogId === excludeLogId)
						return false;

					// Check for overlap: log overlaps if it starts before our end and ends after our start
					const overlaps = log.DepthFrom < depthTo && log.DepthTo > depthFrom;

					return overlaps;
				})
				.toArray();

			console.log("[GEOLOGY-REPO] Found overlapping logs", {
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error finding overlapping logs", error);
			throw error;
		}
	}

	/**
	 * Get recent logs (last N by modified date)
	 */
	async getRecent(collarId: string, limit: number = 10): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📅 Getting recent logs", {
			collarId,
			limit,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and((log: GeologyCombinedLog) => log.ActiveInd === true)
				.reverse()
				.sortBy("ModifiedOnDt");

			// Take only the requested number
			const recentLogs = logs.slice(0, limit);

			console.log("[GEOLOGY-REPO] Recent logs", {
				collarId,
				count: recentLogs.length,
			});

			return recentLogs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting recent logs", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get logs by depth range with status filter
	 * Combines depth range and status filtering
	 */
	async getByDepthRangeAndStatus(
		collarId: string,
		depthFrom: number,
		depthTo: number,
		status: number,
	): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📏 Getting logs by depth range and status", {
			collarId,
			depthFrom,
			depthTo,
			status,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("[CollarId+RowStatus]")
				.equals([collarId, status])
				.and((log: GeologyCombinedLog) => log.DepthFrom >= depthFrom && log.DepthTo <= depthTo)
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found logs", {
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting logs by depth and status", error);
			throw error;
		}
	}
}

// Export singleton instance via lazy getter
export const geologyCombinedLogRepo = new Proxy({} as GeologyCombinedLogRepository, {
	get(target, prop) {
		const instance = GeologyCombinedLogRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});

console.log("[GEOLOGY-REPO] 🏗️ GeologyCombinedLog repository loaded");
