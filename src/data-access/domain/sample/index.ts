/**
 * Sample Domain Module
 *
 * Exports repository and utilities for Sample entity
 *
 * @example
 * ```typescript
 * import { sampleRepo } from '@/data/domain/sample';
 *
 * // Get samples for a collar
 * const samples = await sampleRepo.getByCollar(collarId);
 *
 * // Get samples pending dispatch
 * const pending = await sampleRepo.getPendingDispatch(collarId);
 *
 * // Mark samples as dispatched
 * await sampleRepo.markDispatched(sampleIds, dispatchDate);
 * ```
 */

export { sampleRepo, SampleRepository } from "./sample.repo";

console.log("[SAMPLE] 🏗️ Sample domain module loaded");
