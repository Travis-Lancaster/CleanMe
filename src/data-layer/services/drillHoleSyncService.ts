/**
 * Collar Initializer Service
 *
 * Populates the collars table from API on app startup
 * Called once when the app initializes and user is authenticated
 *
 * Features:
 * - Fetches all collars from API
 * - Stores them in Dexie for offline access
 * - Handles pagination for large datasets
 * - Prevents duplicate initialization
 */

import apiService from "./dbService";
import { db } from "../db/connection";

// import { db } from "../db/connection";
// import { apiClient } from "./apiClient";

// Track if initialization has been attempted to prevent duplicate calls
let initializationAttempted = false;

/**
 * Initialize collars table from API
 * Fetches all collars and stores them in Dexie
 *
 * @returns Promise that resolves when initialization is complete
 * @throws Error if API call fails or database operation fails
 *
 * @example
 * ```typescript
 * // In your app initialization
 * await initializeCollarsFromApi();
 * console.log('Collars loaded from API');
 * ```
 */
export async function initializeCollarsFromApi(): Promise<void> {
	// Prevent duplicate initialization
	if (initializationAttempted) {
		console.log("[CollarInitializer] ℹ️ Initialization already attempted, skipping");
		return;
	}

	initializationAttempted = true;

	try {
		console.log("[CollarInitializer] 🚀 Starting collar initialization from API");

		// Wait for database to be ready
		await db.waitForReady();
		console.log("[CollarInitializer] ✅ Database ready");

		// Check if collars already exist in database
		const existingCount = await db.DrillHole_Collar.count();
		if (existingCount > 0) {
			console.log("[CollarInitializer] ℹ️ Collars already exist in database:", existingCount);
			return;
		}

		console.log("[CollarInitializer] 📥 Fetching collars from API...");

		// Fetch collars from API with pagination
		const response = await apiService.vwCollarControllerFindAll({
			page: 1,
			take: 1000, // Fetch first 1000 collars
			order: "DESC",
		});

		const collars = response || [];
		console.log("[CollarInitializer] 📊 Received", collars.length, "collars from API");

		if (collars.length === 0) {
			console.log("[CollarInitializer] ⚠️ No collars returned from API");
			return;
		}

		// Store collars in Dexie
		console.log("[CollarInitializer] 💾 Storing collars in database...");
		await db.DrillHole_Collar.bulkPut(collars);

		console.log("[CollarInitializer] ✅ Successfully initialized", collars.length, "collars");
	}
	catch (error) {
		console.error("[CollarInitializer] ❌ Error initializing collars:", error);
		// Don't throw - allow app to continue even if initialization fails
		// The sync system will handle fetching data as needed
	}
}

/**
 * Reset initialization flag (useful for testing or manual re-initialization)
 */
export function resetCollarInitialization(): void {
	initializationAttempted = false;
	console.log("[CollarInitializer] 🔄 Initialization flag reset");
}

/**
 * Check if collar initialization has been attempted
 */
export function hasCollarInitializationBeenAttempted(): boolean {
	return initializationAttempted;
}
