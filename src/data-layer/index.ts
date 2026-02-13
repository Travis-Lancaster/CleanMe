/**
 * Data Layer - Barrel Export
 * Clean imports for the offline-first sync system
 *
 * Usage:
 * import { db, collarRepo, useSyncStore } from '#src/data';
 */

import { pullLookUpTables } from "./services/lookupService";

// API Types (re-export for convenience)
export type { GeologyCombinedLog, Survey } from "./api/database/data-contracts";
// Components
// export { ConflictResolver } from "./components/ConflictResolver";
// Database
export { db, getDatabase, getDatabaseIfInitialized, resetDatabase } from "./db/connection";

export { B2GoldOfflineDBv2 } from "./db/schema";
export type { SyncMetadata } from "./db/schema";

// Repositories
// export { BaseRepository } from "./domain/base.repo";

// export { collarRepo, CollarRepository } from "./domain/collar/collar.repo";
// export { coreRecoveryRepo, CoreRecoveryRepository } from "./domain/core-recovery/coreRecovery.repo";
// export { sampleRepo, SampleRepository } from "./domain/sample/sample.repo";
// export { surveyRepo, SurveyRepository } from "./domain/survey/survey.repo";



export async function startLazyLookupSync() {
	console.log("Starting lazy lookup sync...");
	await pullLookUpTables();
}

export function runWhenIdle(task: () => void) {
	if (typeof window !== "undefined" && "requestIdleCallback" in window) {
		window.requestIdleCallback(() => task());
	} else {
		setTimeout(task, 3000);
	}
}

