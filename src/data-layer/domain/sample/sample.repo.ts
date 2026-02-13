/**
 * Sample Repository
 * Domain-specific queries for Sample entities
 *
 * Responsibilities:
 * - CRUD operations for samples
 * - Collar-based queries
 * - Depth-based queries
 * - Sample type filtering
 * - Batch operations for sample registration
 */

import type { AllSamples } from "../../api/database/data-contracts";
import { BaseRepository } from "../base.repo";
import { db } from "../../db/connection";

export class SampleRepository extends BaseRepository<AllSamples, string> {
	private static _instance: SampleRepository | null = null;

	private constructor() {
		super(db.Sample);
	}

	static getInstance(): SampleRepository {
		if (!SampleRepository._instance) {
			SampleRepository._instance = new SampleRepository();
		}
		return SampleRepository._instance;
	}

	/**
	 * Get all samples for a collar
	 */
	async getByCollar(collarId: string): Promise<AllSamples[]> {
		console.log("[SAMPLE-REPO] 📋 Getting samples by collar", { collarId });

		try {
			const samples = await db.Sample
				.where("CollarId")
				.equals(collarId)
				.and(s => s.ActiveInd === true)
				.toArray();

			console.log("[SAMPLE-REPO] Found samples", {
				collarId,
				count: samples.length,
			});

			return samples;
		}
		catch (error) {
			console.error("[SAMPLE-REPO] Error getting by collar", { collarId, error });
			throw error;
		}
	}

	/**
	 * Get samples within a depth range
	 */
	async getByDepthRange(
		collarId: string,
		depthFrom: number,
		depthTo: number,
	): Promise<AllSamples[]> {
		console.log("[SAMPLE-REPO] 📏 Getting samples by depth range", {
			collarId,
			depthFrom,
			depthTo,
		});

		try {
			const samples = await db.Sample
				.where("[CollarId+DepthFrom]")
				.between([collarId, depthFrom], [collarId, depthTo])
				.toArray();

			console.log("[SAMPLE-REPO] Found samples in range", {
				collarId,
				depthFrom,
				depthTo,
				count: samples.length,
			});

			return samples;
		}
		catch (error) {
			console.error("[SAMPLE-REPO] Error getting by depth range", {
				collarId,
				depthFrom,
				depthTo,
				error,
			});
			throw error;
		}
	}

	/**
	 * Get samples by type
	 */
	async getByType(collarId: string, sampleType: string): Promise<AllSamples[]> {
		console.log("[SAMPLE-REPO] 🔍 Getting samples by type", { collarId, sampleType });

		try {
			const samples = await db.Sample
				.where("CollarId")
				.equals(collarId)
				.and(s => s.SampleType === sampleType && s.ActiveInd === true)
				.toArray();

			console.log("[SAMPLE-REPO] Found samples by type", {
				collarId,
				sampleType,
				count: samples.length,
			});

			return samples;
		}
		catch (error) {
			console.error("[SAMPLE-REPO] Error getting by type", { collarId, sampleType, error });
			throw error;
		}
	}

	/**
	 * Get samples by status
	 */
	async getByStatus(collarId: string, status: number): Promise<AllSamples[]> {
		console.log("[SAMPLE-REPO] 📊 Getting samples by status", { collarId, status });

		try {
			const samples = await db.Sample
				.where("[CollarId+RowStatus]")
				.equals([collarId, status])
				.toArray();

			console.log("[SAMPLE-REPO] Found samples by status", {
				collarId,
				status,
				count: samples.length,
			});

			return samples;
		}
		catch (error) {
			console.error("[SAMPLE-REPO] Error getting by status", { collarId, status, error });
			throw error;
		}
	}

	/**
	 * Get samples pending dispatch
	 */
	// async getPendingDispatch(collarId: string): Promise<Sample[]> {
	// 	console.log('[SAMPLE-REPO] 📤 Getting samples pending dispatch', { collarId });

	// 	try {
	// 		const samples = await db.Sample
	// 			.where('CollarId')
	// 			.equals(collarId)
	// 			.and(s => s.ActiveInd === true && !s.DispatchDate)
	// 			.toArray();

	// 		console.log('[SAMPLE-REPO] Found pending dispatch', {
	// 			collarId,
	// 			count: samples.length,
	// 		});

	// 		return samples;
	// 	} catch (error) {
	// 		console.error('[SAMPLE-REPO] Error getting pending dispatch', { collarId, error });
	// 		throw error;
	// 	}
	// }

	/**
	 * Get samples by dispatch status
	 */
	// async getByDispatchStatus(collarId: string, dispatched: boolean): Promise<Sample[]> {
	//   console.log('[SAMPLE-REPO] 📦 Getting samples by dispatch status', {
	//     collarId,
	//     dispatched,
	//   });

	//   try {
	//     const samples = await db.Sample
	//       .where('CollarId')
	//       .equals(collarId)
	//       .and(s => {
	//         if (dispatched) {
	//           return s.ActiveInd === true && !!s.DispatchDate;
	//         } else {
	//           return s.ActiveInd === true && !s.DispatchDate;
	//         }
	//       })
	//       .toArray();

	//     console.log('[SAMPLE-REPO] Found samples by dispatch status', {
	//       collarId,
	//       dispatched,
	//       count: samples.length,
	//     });

	//     return samples;
	//   } catch (error) {
	//     console.error('[SAMPLE-REPO] Error getting by dispatch status', {
	//       collarId,
	//       dispatched,
	//       error,
	//     });
	//     throw error;
	//   }
	// }

	/**
	 * Create sample with validation
	 */
	async createWithValidation(allSamples: Partial<AllSamples>): Promise<string> {
		console.log("[SAMPLE-REPO] ➕ Creating sample with validation");

		try {
			const sample = {
				...allSamples,
				SampleId: allSamples.SampleId || crypto.randomUUID(),
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
				ActiveInd: allSamples.ActiveInd ?? true,
				RowStatus: allSamples.RowStatus ?? 0, // Draft
			} as AllSamples;

			return await this.save(sample);
		}
		catch (error) {
			console.error("[SAMPLE-REPO] ❌ Create failed", { error });
			throw error;
		}
	}

	/**
	 * Update sample with validation
	 */
	async updateWithValidation(
		sampleId: string,
		changes: Partial<AllSamples>,
	): Promise<number> {
		console.log("[SAMPLE-REPO] 🔧 Updating sample with validation", { sampleId });

		try {
			const updates = {
				...changes,
				ModifiedOnDt: new Date().toISOString(),
			};

			return await this.update(sampleId, updates);
		}
		catch (error) {
			console.error("[SAMPLE-REPO] ❌ Update failed", { sampleId, error });
			throw error;
		}
	}

	/**
	 * Bulk create samples
	 * Useful for registering multiple samples at once
	 */
	async bulkCreateWithValidation(samplesData: Partial<AllSamples>[]): Promise<string[]> {
		console.log("[SAMPLE-REPO] 📦 Bulk creating samples", { count: samplesData.length });

		try {
			const samples = samplesData.map(data => ({
				...data,
				SampleId: data.SampleId || crypto.randomUUID(),
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
				ActiveInd: data.ActiveInd ?? true,
				RowStatus: data.RowStatus ?? 0,
			})) as AllSamples[];

			return await this.bulkSave(samples);
		}
		catch (error) {
			console.error("[SAMPLE-REPO] ❌ Bulk create failed", { error });
			throw error;
		}
	}

	/**
	 * Mark samples as dispatched
	 */
	// async markDispatched(sampleIds: string[], dispatchDate: string): Promise<number> {
	// 	console.log('[SAMPLE-REPO] 📤 Marking samples as dispatched', {
	// 		count: sampleIds.length,
	// 		dispatchDate,
	// 	});

	// 	try {
	// 		let updated = 0;

	// 		for (const sampleId of sampleIds) {
	// 			const result = await this.update(sampleId, {
	// 				DispatchDate: dispatchDate,
	// 				ModifiedOnDt: new Date().toISOString(),
	// 			});
	// 			updated += result;
	// 		}

	// 		console.log('[SAMPLE-REPO] ✅ Samples marked as dispatched', { updated });

	// 		return updated;
	// 	} catch (error) {
	// 		console.error('[SAMPLE-REPO] ❌ Mark dispatched failed', { error });
	// 		throw error;
	// 	}
	// }

	/**
	 * Get sample count by type
	 */
	async getCountByType(collarId: string): Promise<Record<string, number>> {
		console.log("[SAMPLE-REPO] 📊 Getting sample count by type", { collarId });

		try {
			const samples = await this.getByCollar(collarId);

			const counts: Record<string, number> = {};
			for (const sample of samples) {
				const type = sample.SampleType || "UNKNOWN";
				counts[type] = (counts[type] || 0) + 1;
			}

			console.log("[SAMPLE-REPO] Sample counts by type", { collarId, counts });

			return counts;
		}
		catch (error) {
			console.error("[SAMPLE-REPO] Error getting count by type", { collarId, error });
			throw error;
		}
	}
}

// Export singleton instance via lazy getter
export const sampleRepo = new Proxy({} as SampleRepository, {
	get(target, prop) {
		const instance = SampleRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});

console.log("[SAMPLE-REPO] 🏗️ Sample repository loaded");
