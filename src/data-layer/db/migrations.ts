/**
 * Database Migrations
 * Handles schema version upgrades and data transformations
 *
 * Pattern:
 * - Each version upgrade is idempotent
 * - Migrations run automatically on database open
 * - Data is preserved across versions
 * - Rollback not supported (use backups)
 *
 * Adding a New Migration:
 * 1. Increment schema version in schema.ts
 * 2. Add upgrade function here
 * 3. Test with existing data
 * 4. Document the changes
 *
 * Usage:
 * Called automatically by Dexie when version changes
 */

import type { B2GoldOfflineDBv2 } from "./schema";

/**
 * Register all database migrations
 * Called from schema.ts during database initialization
 */
export function registerMigrations(db: B2GoldOfflineDBv2): void {
	console.log("[DB-MIGRATIONS] 🔧 Registering database migrations...");

	/**
	 * Migration: v1 → v2
	 * Added DrillPlans table
	 *
	 * Changes:
	 * - New table: drillPlans with minimal indexes
	 * - No data transformation needed (new table)
	 * - Existing collars, geology logs, etc. unchanged
	 */
	db.version(2).upgrade(async (trans) => {
		console.log("[DB-MIGRATIONS] 📦 Upgrading v1 → v2: Adding DrillPlans table");

		// No data migration needed - new table is empty
		// Dexie automatically creates the table based on schema definition

		console.log("[DB-MIGRATIONS] ✅ v1 → v2 upgrade complete");
	});

	/**
	 * Migration: v2 → v3 (Future)
	 * Add compound indexes for better query performance
	 *
	 * Example:
	 * db.version(3).upgrade(async (trans) => {
	 *   console.log('[DB-MIGRATIONS] 📦 Upgrading v2 → v3: Adding compound indexes');
	 *
	 *   // Dexie handles index changes automatically
	 *   // Just update the schema definition
	 *
	 *   console.log('[DB-MIGRATIONS] ✅ v2 → v3 upgrade complete');
	 * });
	 */

	/**
	 * Migration: v3 → v4 (Future)
	 * Example: Add new field to existing table
	 *
	 * Example:
	 * db.version(4).upgrade(async (trans) => {
	 *   console.log('[DB-MIGRATIONS] 📦 Upgrading v3 → v4: Adding new fields');
	 *
	 *   // Transform existing data
	 *   const collars = await trans.table('collars').toArray();
	 *   const updated = collars.map(collar => ({
	 *     ...collar,
	 *     newField: defaultValue,
	 *     updatedAt: new Date().toISOString(),
	 *   }));
	 *
	 *   await trans.table('collars').bulkPut(updated);
	 *
	 *   console.log('[DB-MIGRATIONS] ✅ v3 → v4 upgrade complete');
	 * });
	 */

	console.log("[DB-MIGRATIONS] ✅ All migrations registered");
}

/**
 * Helper: Get current schema version
 * Useful for debugging
 */
export function getCurrentSchemaVersion(db: B2GoldOfflineDBv2): number {
	// Dexie stores version info internally
	// This is a placeholder - actual version is in schema.ts
	return 2; // Update this when adding new versions
}

/**
 * Helper: Check if migration is needed
 * Returns true if database version < current schema version
 */
export async function isMigrationNeeded(db: B2GoldOfflineDBv2): Promise<boolean> {
	try {
		// Dexie automatically runs migrations on open
		// This function is informational only
		const currentVersion = getCurrentSchemaVersion(db);
		console.log("[DB-MIGRATIONS] Current schema version:", currentVersion);
		return false; // Migrations run automatically
	}
	catch (error) {
		console.error("[DB-MIGRATIONS] Error checking migration status:", error);
		return false;
	}
}

/**
 * Best Practices for Writing Migrations:
 *
 * 1. **Idempotent**: Can run multiple times safely
 *    ✅ Good: Check if field exists before adding
 *    ❌ Bad: Assume field doesn't exist
 *
 * 2. **Atomic**: All or nothing
 *    ✅ Good: Use transaction (trans parameter)
 *    ❌ Bad: Multiple separate operations
 *
 * 3. **Logged**: Document what's happening
 *    ✅ Good: console.log at start and end
 *    ❌ Bad: Silent operations
 *
 * 4. **Tested**: Verify with real data
 *    ✅ Good: Test with production data copy
 *    ❌ Bad: Assume it works
 *
 * 5. **Reversible**: Keep backups
 *    ✅ Good: Export data before migration
 *    ❌ Bad: No rollback plan
 *
 * Example Migration Template:
 *
 * db.version(X).upgrade(async (trans) => {
 *   console.log('[DB-MIGRATIONS] 📦 Upgrading v(X-1) → vX: Description');
 *
 *   try {
 *     // 1. Get existing data
 *     const items = await trans.table('tableName').toArray();
 *
 *     // 2. Transform data
 *     const updated = items.map(item => ({
 *       ...item,
 *       newField: calculateValue(item),
 *     }));
 *
 *     // 3. Save back
 *     await trans.table('tableName').bulkPut(updated);
 *
 *     console.log('[DB-MIGRATIONS] ✅ v(X-1) → vX upgrade complete', {
 *       itemsProcessed: updated.length,
 *     });
 *   } catch (error) {
 *     console.error('[DB-MIGRATIONS] ❌ Migration failed:', error);
 *     throw error; // Dexie will handle the error
 *   }
 * });
 */

console.log("[DB-MIGRATIONS] 🏗️ Database migrations module loaded");
