/**
 * RigSetup Domain Module
 *
 * Exports repository, service, and validation for RigSetup entity
 *
 * @example
 * ```typescript
 * import { rigSetupRepo, rigSetupService } from '@/data/domain/rig-setup';
 *
 * // Get rig setup data
 * const rigSetup = await rigSetupRepo.getById(id);
 *
 * // Fetch with cache-aside
 * const fresh = await rigSetupService.fetchById(id);
 *
 * // Validate data
 * const result = safeValidateRigSetupBusiness(data);
 * ```
 */

export type { RigSetupBusiness } from "./rig-setup.business.schema.js";
// export {
// 	RigSetupDbSchema,
// 	RigSetupBusinessSchema,
// 	validateRigSetupDb,
// 	safeValidateRigSetupDb,
// 	isValidRigSetupDb,
// 	validateRigSetupBusiness,
// 	safeValidateRigSetupBusiness,
// 	canSubmitForReview,
// 	canApproveRigSetup,
// 	getRigSetupValidationReport,
// } from './rig-setup.db.schema.js';
export type { RigSetupDb, RigSetupDbCreate, RigSetupDbUpdate } from "./rig-setup.db.schema.js";
export { rigSetupRepo } from "./rig-setup.repo.js";
export { rigSetupService } from "./rig-setup.service.js";

console.log("[RIG-SETUP] 🏗️ RigSetup domain module loaded");
