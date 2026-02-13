/**
 * Core Recovery Domain Module
 *
 * Exports repository and utilities for CoreRecoveryRunLog entity
 *
 * @example
 * ```typescript
 * import { coreRecoveryRepo } from '@/data/domain/core-recovery';
 *
 * // Get core recovery logs for a collar
 * const logs = await coreRecoveryRepo.getByCollar(collarId);
 *
 * // Get recovery statistics
 * const stats = await coreRecoveryRepo.getRecoveryStats(collarId);
 *
 * // Get logs with poor recovery
 * const poor = await coreRecoveryRepo.getPoorRecovery(collarId, 80);
 * ```
 */

export { coreRecoveryRepo, CoreRecoveryRepository } from "./coreRecovery.repo";

console.log("[CORE-RECOVERY] 🏗️ Core recovery domain module loaded");
