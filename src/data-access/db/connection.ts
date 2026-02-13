/**
 * Database Connection Singleton
 * Ensures only one Dexie instance exists throughout the application
 *
 * Pattern:
 * - Lazy initialization on first access
 * - Prevents memory leaks from multiple instances
 * - Centralized database lifecycle management
 *
 * Usage:
 * import { db } from '@/data/db/connection';
 * const collars = await db.DrillHole_Collar.toArray();
 */

import { B2GoldOfflineDBv2 } from "./schema";
// import { registerProtocol } from "../sync/syncProtocol";

let instance: B2GoldOfflineDBv2 | null = null;

/**
 * Get or create the database singleton
 * Thread-safe lazy initialization
 */
export function getDatabase(): B2GoldOfflineDBv2 {
	if (!instance) {
		console.log("[DB-CONNECTION] 🚀 Initializing database singleton...");
		instance = new B2GoldOfflineDBv2();
		// registerProtocol();
		console.log("[DB-CONNECTION] ✅ Database singleton created");
	}
	return instance;
}

/**
 * Get the current database instance (or null if not initialized)
 * Useful for checking if database is ready
 */
export function getDatabaseIfInitialized(): B2GoldOfflineDBv2 | null {
	return instance;
}

/**
 * Reset the database singleton (for testing or logout)
 * WARNING: This will close the database connection
 */
export async function resetDatabase(): Promise<void> {
	if (instance) {
		console.log("[DB-CONNECTION] 🔄 Resetting database singleton...");
		try {
			await instance.close();
			instance = null;
			console.log("[DB-CONNECTION] ✅ Database singleton reset");
		}
		catch (error) {
			console.error("[DB-CONNECTION] ❌ Error resetting database:", error);
			throw error;
		}
	}
}

/**
 * Lazy-initialized database singleton
 * Uses a Proxy to defer initialization and prevent circular import issues during HMR
 *
 * This allows repositories to import `db` without triggering immediate initialization,
 * which can cause "Cannot access 'db' before initialization" errors during HMR reloads
 * when circular imports are detected.
 */
export const db = new Proxy({} as B2GoldOfflineDBv2, {
	get(target, prop) {
		const instance = getDatabase();
		return Reflect.get(instance, prop as string | symbol);
	},
});

// Export for browser DevTools debugging
// Access via: window.db in console
if (typeof window !== "undefined") {
	Object.defineProperty(window, "db", {
		get() {
			return getDatabase();
		},
		configurable: true,
	});
	console.log("[DB] 🔍 Database exposed to window.db for debugging");
}

console.log("[DB-CONNECTION] 🏗️ Database connection module loaded");
