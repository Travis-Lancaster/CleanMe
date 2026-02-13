/**
 * Core Recovery Repository
 * Domain-specific queries for CoreRecoveryRunLog entities
 *
 * Responsibilities:
 * - CRUD operations for core recovery logs
 * - Collar-based queries
 * - Depth-based queries
 * - Recovery statistics
 */

import type { CoreRecoveryRunLog } from "../../api/database/data-contracts";
import { db } from "../../db/connection";
import { BaseRepository } from "../base.repo";

export class CoreRecoveryRepository extends BaseRepository<CoreRecoveryRunLog, string> {
	private static _instance: CoreRecoveryRepository | null = null;

	private constructor() {
		super(db.Geotech_CoreRecoveryRunLog);
	}

	static getInstance(): CoreRecoveryRepository {
		if (!CoreRecoveryRepository._instance) {
			CoreRecoveryRepository._instance = new CoreRecoveryRepository();
		}
		return CoreRecoveryRepository._instance;
	}

	/**
	 * Get all core recovery logs for a collar
	 */
	async getByCollar(collarId: string): Promise<CoreRecoveryRunLog[]> {
		console.log("[CORE-RECOVERY-REPO] 📋 Getting core recovery logs by collar", { collarId });

		try {
			const logs = await db.Geotech_CoreRecoveryRunLog
				.where("CollarId")
				.equals(collarId)
				.and((l: CoreRecoveryRunLog) => l.ActiveInd === true)
				.toArray();

			console.log("[CORE-RECOVERY-REPO] Found logs", {
				collarId,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] Error getting by collar", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get core recovery logs within a depth range
	 */
	async getByDepthRange(
		collarId: string,
		depthFrom: number,
		depthTo: number,
	): Promise<CoreRecoveryRunLog[]> {
		console.log("[CORE-RECOVERY-REPO] 📏 Getting logs by depth range", {
			collarId,
			depthFrom,
			depthTo,
		});

		try {
			const logs = await db.Geotech_CoreRecoveryRunLog
				.where("[CollarId+DepthFrom]")
				.between([collarId, depthFrom], [collarId, depthTo])
				.toArray();

			console.log("[CORE-RECOVERY-REPO] Found logs in range", {
				collarId,
				depthFrom,
				depthTo,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] Error getting by depth range", {
				collarId,
				depthFrom,
				depthTo,
				error,
			});
			throw error;
		}
	}

	/**
	 * Get core recovery logs by status
	 */
	async getByStatus(collarId: string, status: number): Promise<CoreRecoveryRunLog[]> {
		console.log("[CORE-RECOVERY-REPO] 📊 Getting logs by status", { collarId, status });

		try {
			const logs = await db.Geotech_CoreRecoveryRunLog
				.where("[CollarId+RowStatus]")
				.equals([collarId, status])
				.toArray();

			console.log("[CORE-RECOVERY-REPO] Found logs by status", {
				collarId,
				status,
				count: logs.length,
			});

			return logs;
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] Error getting by status", { collarId, status, error });
			throw error;
		}
	}

	/**
	 * Calculate recovery statistics for a collar
	 * Returns total depth, recovered length, and recovery percentage
	 */
	async getRecoveryStats(collarId: string): Promise<{
		totalDepth: number
		recoveredLength: number
		recoveryPercentage: number
		logCount: number
	}> {
		console.log("[CORE-RECOVERY-REPO] 📊 Calculating recovery stats", { collarId });

		try {
			const logs = await this.getByCollar(collarId);

			if (logs.length === 0) {
				return {
					totalDepth: 0,
					recoveredLength: 0,
					recoveryPercentage: 0,
					logCount: 0,
				};
			}

			// Calculate total depth covered
			let totalDepth = 0;
			let recoveredLength = 0;

			for (const log of logs) {
				const depth = (log.DepthTo || 0) - (log.DepthFrom || 0);
				const recovered = log.Recovery_Interval || 0;

				totalDepth += depth;
				recoveredLength += recovered;
			}

			const recoveryPercentage = totalDepth > 0 ? (recoveredLength / totalDepth) * 100 : 0;

			const stats = {
				totalDepth,
				recoveredLength,
				recoveryPercentage: Math.round(recoveryPercentage * 100) / 100,
				logCount: logs.length,
			};

			console.log("[CORE-RECOVERY-REPO] Recovery stats", { collarId, ...stats });

			return stats;
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] Error calculating stats", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get logs with poor recovery (below threshold)
	 */
	async getPoorRecovery(collarId: string, threshold: number = 80): Promise<CoreRecoveryRunLog[]> {
		console.log("[CORE-RECOVERY-REPO] ⚠️ Getting poor recovery logs", { collarId, threshold });

		try {
			const logs = await this.getByCollar(collarId);

			const poorRecovery = logs.filter((log) => {
				const depth = (log.DepthTo || 0) - (log.DepthFrom || 0);
				const recovered = log.Recovery_Interval || 0;
				const percentage = depth > 0 ? (recovered / depth) * 100 : 0;

				return percentage < threshold;
			});

			console.log("[CORE-RECOVERY-REPO] Found poor recovery logs", {
				collarId,
				count: poorRecovery.length,
			});

			return poorRecovery;
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] Error getting poor recovery", { collarId, error });
			throw error;
		}
	}

	/**
	 * Create core recovery log with validation
	 */
	async createWithValidation(logData: Partial<CoreRecoveryRunLog>): Promise<string> {
		console.log("[CORE-RECOVERY-REPO] ➕ Creating core recovery log with validation");

		try {
			const log = {
				...logData,
				CoreRecoveryRunLogId: logData.CoreRecoveryRunLogId || crypto.randomUUID(),
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
				ActiveInd: logData.ActiveInd ?? true,
				RowStatus: logData.RowStatus ?? 0, // Draft
			} as CoreRecoveryRunLog;

			return await this.save(log);
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] ❌ Create failed", { error });
			throw error;
		}
	}

	/**
	 * Update core recovery log with validation
	 */
	async updateWithValidation(
		logId: string,
		changes: Partial<CoreRecoveryRunLog>,
	): Promise<number> {
		console.log("[CORE-RECOVERY-REPO] 🔧 Updating core recovery log with validation", { logId });

		try {
			const updates = {
				...changes,
				ModifiedOnDt: new Date().toISOString(),
			};

			return await this.update(logId, updates);
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] ❌ Update failed", { logId, error });
			throw error;
		}
	}

	/**
	 * Bulk create core recovery logs
	 */
	async bulkCreateWithValidation(logsData: Partial<CoreRecoveryRunLog>[]): Promise<string[]> {
		console.log("[CORE-RECOVERY-REPO] 📦 Bulk creating logs", { count: logsData.length });

		try {
			const logs = logsData.map(data => ({
				...data,
				CoreRecoveryRunLogId: data.CoreRecoveryRunLogId || crypto.randomUUID(),
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
				ActiveInd: data.ActiveInd ?? true,
				RowStatus: data.RowStatus ?? 0,
			})) as CoreRecoveryRunLog[];

			return await this.bulkSave(logs);
		}
		catch (error) {
			console.error("[CORE-RECOVERY-REPO] ❌ Bulk create failed", { error });
			throw error;
		}
	}
}

// Export singleton instance via lazy getter
export const coreRecoveryRepo = new Proxy({} as CoreRecoveryRepository, {
	get(target, prop) {
		const instance = CoreRecoveryRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});

console.log("[CORE-RECOVERY-REPO] 🏗️ Core recovery repository loaded");
