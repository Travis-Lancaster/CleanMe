/**
 * Geology Log Repository
 * Domain-specific queries for GeologyCombinedLog entities
 *
 * Responsibilities:
 * - CRUD operations for geology logs
 * - Collar-based queries
 * - Depth-based queries (intervals)
 * - Efficient retrieval for AG Grid
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
	 * Sorted by depth (ascending)
	 */
	async getByCollar(collarId: string): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📋 Getting geology logs by collar", { collarId });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and(log => log.ActiveInd === true)
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found geology logs", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting by collar", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get geology logs for collar within depth range
	 * Useful for loading specific sections
	 */
	async getByCollarAndDepthRange(
		collarId: string,
		depthFrom: number,
		depthTo: number,
	): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📏 Getting geology logs by depth range", {
			collarId,
			depthFrom,
			depthTo,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("[CollarId+DepthFrom]")
				.between([collarId, depthFrom], [collarId, depthTo], true, true)
				.toArray();

			console.log("[GEOLOGY-REPO] Found logs in range", {
				collarId,
				depthFrom,
				depthTo,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting by depth range", {
				collarId,
				depthFrom,
				depthTo,
				error,
			});
			throw error;
		}
	}

	/**
	 * Get geology logs by collar and status
	 * Useful for filtering grid by status (Draft, Complete, etc.)
	 */
	async getByCollarAndStatus(collarId: string, status: number): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📊 Getting geology logs by status", {
			collarId,
			status,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("[CollarId+RowStatus]")
				.equals([collarId, status])
				.and(log => log.ActiveInd === true)
				.sortBy("DepthFrom");

			console.log("[GEOLOGY-REPO] Found logs by status", {
				collarId,
				status,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting by status", {
				collarId,
				status,
				error,
			});
			throw error;
		}
	}

	/**
	 * Get recent logs (last N entries)
	 * Useful for "continue where you left off"
	 */
	async getRecentByCollar(collarId: string, limit: number = 10): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 📅 Getting recent logs", { collarId, limit });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.reverse()
				.limit(limit)
				.toArray();

			console.log("[GEOLOGY-REPO] Recent logs", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting recent", { collarId, limit, error });
			throw error;
		}
	}

	/**
	 * Count logs by collar
	 * Useful for progress indicators
	 */
	async countByCollar(collarId: string): Promise<number> {
		try {
			const count = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and(log => log.ActiveInd === true)
				.count();

			console.log("[GEOLOGY-REPO] Log count", { collarId, count });

			return count;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error counting", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get depth statistics for a collar
	 * Returns min/max depth and total intervals
	 */
	async getDepthStats(collarId: string): Promise<{
		minDepth: number
		maxDepth: number
		logCount: number
		totalLength: number
	}> {
		console.log("[GEOLOGY-REPO] 📊 Getting depth stats", { collarId });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and(log => log.ActiveInd === true)
				.toArray();

			if (logs.length === 0) {
				return {
					minDepth: 0,
					maxDepth: 0,
					logCount: 0,
					totalLength: 0,
				};
			}

			const minDepth = Math.min(...logs.map(log => log.DepthFrom || 0));
			const maxDepth = Math.max(...logs.map(log => log.DepthTo || 0));
			const totalLength = logs.reduce((sum: any, log) => {
				const length = (log.DepthTo || 0) - (log.DepthFrom || 0);
				return sum + length;
			}, 0);

			console.log("[GEOLOGY-REPO] Depth stats", {
				collarId,
				minDepth,
				maxDepth,
				logCount: logs.length,
				totalLength,
			});

			return {
				minDepth,
				maxDepth,
				logCount: logs.length,
				totalLength,
			};
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error getting depth stats", { collarId, error });
			throw error;
		}
	}

	/**
	 * Check for depth overlaps
	 * Returns logs that overlap with the given interval
	 */
	async findOverlaps(
		collarId: string,
		depthFrom: number,
		depthTo: number,
		excludeId?: string,
	): Promise<GeologyCombinedLog[]> {
		console.log("[GEOLOGY-REPO] 🔍 Checking for overlaps", {
			collarId,
			depthFrom,
			depthTo,
			excludeId,
		});

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and((log) => {
					// Skip inactive logs
					if (!(log.ActiveInd === true))
						return false;

					// Skip the excluded log (when updating)
					if (excludeId && log.GeologyCombinedLogId === excludeId)
						return false;

					// Check for overlap
					const logFrom = log.DepthFrom || 0;
					const logTo = log.DepthTo || 0;

					// Overlap occurs if:
					// - New interval starts before log ends AND
					// - New interval ends after log starts
					return depthFrom < logTo && depthTo > logFrom;
				})
				.toArray();

			console.log("[GEOLOGY-REPO] Overlaps found", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error finding overlaps", {
				collarId,
				depthFrom,
				depthTo,
				error,
			});
			throw error;
		}
	}

	/**
	 * Check for depth gaps
	 * Returns depth ranges that have no logged intervals
	 */
	async findGaps(collarId: string): Promise<Array<{ from: number, to: number }>> {
		console.log("[GEOLOGY-REPO] 🔍 Finding depth gaps", { collarId });

		try {
			const logs = await db.Geology_GeologyCombinedLog
				.where("CollarId")
				.equals(collarId)
				.and(log => log.ActiveInd === true)
				.sortBy("DepthFrom");

			if (logs.length === 0) {
				return [];
			}

			const gaps: Array<{ from: number, to: number }> = [];

			for (let i = 0; i < logs.length - 1; i++) {
				const currentTo = logs[i].DepthTo || 0;
				const nextFrom = logs[i + 1].DepthFrom || 0;

				// Gap exists if next interval doesn't start immediately after current
				if (nextFrom > currentTo) {
					gaps.push({
						from: currentTo,
						to: nextFrom,
					});
				}
			}

			console.log("[GEOLOGY-REPO] Gaps found", {
				collarId,
				count: gaps.length,
				gaps: gaps.slice(0, 5), // Log first 5
			});

			return gaps;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error finding gaps", { collarId, error });
			throw error;
		}
	}

	/**
	 * Bulk update status for multiple logs
	 * Useful for approving/rejecting batches
	 */
	async bulkUpdateStatus(logIds: string[], newStatus: number): Promise<number> {
		console.log("[GEOLOGY-REPO] 🔄 Bulk updating status", {
			count: logIds.length,
			newStatus,
		});

		try {
			let updated = 0;

			for (const logId of logIds) {
				const result = await this.update(logId, { RowStatus: newStatus } as Partial<GeologyCombinedLog>);
				updated += result;
			}

			console.log("[GEOLOGY-REPO] Bulk update complete", {
				total: logIds.length,
				updated,
			});

			return updated;
		}
		catch (error) {
			console.error("[GEOLOGY-REPO] Error bulk updating", { count: logIds.length, error });
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

console.log("[GEOLOGY-REPO] 🏗️ Geology log repository loaded");
