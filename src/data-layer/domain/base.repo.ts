/**
 * Base Repository
 * Abstract base class for all domain repositories
 *
 * Benefits:
 * - DRY: Common CRUD operations defined once
 * - Consistent interface across all repos
 * - Easy to test and mock
 * - Badges: Automatically track unsynced changes
 *
 * Pattern:
 * - Each entity gets a repo (CollarRepo, GeologyCombinedLogRepo, etc.)
 * - Repos extend BaseRepository<EntityType>
 * - Repos add domain-specific queries (e.g., getByProgram)
 */

import type { Table } from "dexie";
// import { useSyncStore } from "../store/syncStore";

/**
 * Base entity interface
 * All entities in the system have these fields
 */
export interface BaseEntity {
	ActiveInd?: boolean | number
	rv?: string // rowversion for optimistic locking
	CreatedOnDt?: string
	CreatedBy?: string
	ModifiedOnDt?: string
	ModifiedBy?: string
}

/**
 * Abstract base repository
 * Provides common CRUD operations
 *
 * @template T - Entity type (Collar, GeologyCombinedLog, etc.)
 * @template K - Primary key type (usually string for GUIDs)
 */
export abstract class BaseRepository<T extends BaseEntity, K = string> {
	constructor(protected table: Table<T, K>) { }

	/**
	 * Get entity by primary key
	 */
	async getById(id: K): Promise<T | undefined> {
		try {
			return await this.table.get(id);
		}
		catch (error) {
			console.error("[REPO] Error getting by ID", {
				table: this.table.name,
				id,
				error,
			});
			throw error;
		}
	}

	/**
	 * Get all active entities
	 * Active means ActiveInd = true or 1
	 */
	async getAll(): Promise<T[]> {
		try {
			// Handle both boolean and number types for ActiveInd
			return await this.table
				.where("ActiveInd")
				.equals(1)
				.toArray();
		}
		catch (error) {
			console.error("[REPO] Error getting all", {
				table: this.table.name,
				error,
			});
			throw error;
		}
	}

	/**
	 * Save entity (create or update)
	 * Dexie.put() will insert if doesn't exist, update if it does
	 */
	async save(entity: T): Promise<K> {
		console.log("[REPO] 💾 Saving entity", {
			table: this.table.name,
		});

		try {
			const key = await this.table.put(entity);

			// If offline, increment unsynced badge
			// const isConnected = useSyncStore.getState().status === "CONNECTED";
			// if (!isConnected) {
			// 	console.log("[REPO] 📝 Offline save - incrementing badge");
			// 	useSyncStore.getState().incrementUnsyncedCount();
			// }

			return key;
		}
		catch (error) {
			console.error("[REPO] ❌ Save failed", {
				table: this.table.name,
				error,
			});
			throw error;
		}
	}

	/**
	 * Bulk save (more efficient for multiple entities)
	 */
	async bulkSave(entities: T[]): Promise<K[]> {
		console.log("[REPO] 💾 Bulk saving", {
			table: this.table.name,
			count: entities.length,
		});

		try {
			const keys = await this.table.bulkPut(entities, { allKeys: true });

			// If offline, increment badge by count
			// const isConnected = useSyncStore.getState().status === "CONNECTED";
			// if (!isConnected) {
			// 	console.log("[REPO] 📝 Offline bulk save - incrementing badge");
			// 	for (let i = 0; i < entities.length; i++) {
			// 		useSyncStore.getState().incrementUnsyncedCount();
			// 	}
			// }

			return keys as K[];
		}
		catch (error) {
			console.error("[REPO] ❌ Bulk save failed", {
				table: this.table.name,
				count: entities.length,
				error,
			});
			throw error;
		}
	}

	/**
	 * Update specific fields of an entity
	 * More efficient than full save when only changing a few fields
	 */
	async update(id: K, changes: Partial<T>): Promise<number> {
		console.log("[REPO] 🔧 Updating entity", {
			table: this.table.name,
			id,
			fields: Object.keys(changes),
		});

		try {
			// Type assertion needed due to Dexie v4's strict UpdateSpec type
			// Runtime behavior is correct - Partial<T> works as expected
			const updated = await this.table.update(id, changes as any);

			// if (updated > 0) {
			// 	// If offline, increment badge
			// 	const isConnected = useSyncStore.getState().status === "CONNECTED";
			// 	if (!isConnected) {
			// 		useSyncStore.getState().incrementUnsyncedCount();
			// 	}
			// }

			return updated;
		}
		catch (error) {
			console.error("[REPO] ❌ Update failed", {
				table: this.table.name,
				id,
				error,
			});
			throw error;
		}
	}

	/**
	 * Soft delete (set ActiveInd = false)
	 * Preferred over hard delete to maintain audit trail
	 */
	async softDelete(id: K): Promise<number> {
		console.log("[REPO] 🗑️ Soft deleting entity", {
			table: this.table.name,
			id,
		});

		try {
			// Type assertion needed due to Dexie v4's strict UpdateSpec type
			const updated = await this.table.update(id, {
				ActiveInd: false,
			} as any);

			// if (updated > 0) {
			// 	const isConnected = useSyncStore.getState().status === "CONNECTED";
			// 	if (!isConnected) {
			// 		useSyncStore.getState().incrementUnsyncedCount();
			// 	}
			// }

			return updated;
		}
		catch (error) {
			console.error("[REPO] ❌ Soft delete failed", {
				table: this.table.name,
				id,
				error,
			});
			throw error;
		}
	}

	/**
	 * Hard delete (remove from database)
	 * Use with caution - this is permanent in local DB
	 */
	async hardDelete(id: K): Promise<void> {
		console.log("[REPO] ⚠️ Hard deleting entity", {
			table: this.table.name,
			id,
		});

		try {
			await this.table.delete(id);

			// const isConnected = useSyncStore.getState().status === "CONNECTED";
			// if (!isConnected) {
			// 	useSyncStore.getState().incrementUnsyncedCount();
			// }
		}
		catch (error) {
			console.error("[REPO] ❌ Hard delete failed", {
				table: this.table.name,
				id,
				error,
			});
			throw error;
		}
	}

	/**
	 * Count entities
	 */
	async count(): Promise<number> {
		try {
			return await this.table.count();
		}
		catch (error) {
			console.error("[REPO] Error counting", {
				table: this.table.name,
				error,
			});
			throw error;
		}
	}

	/**
	 * Check if entity exists
	 */
	async exists(id: K): Promise<boolean> {
		try {
			const entity = await this.table.get(id);
			return !!entity;
		}
		catch (error) {
			console.error("[REPO] Error checking exists", {
				table: this.table.name,
				id,
				error,
			});
			return false;
		}
	}

	/**
	 * Clear all entities from table
	 * Use with caution - mainly for testing
	 */
	async clearAll(): Promise<void> {
		console.warn("[REPO] 🗑️ Clearing all entities", {
			table: this.table.name,
		});

		try {
			await this.table.clear();
		}
		catch (error) {
			console.error("[REPO] ❌ Clear all failed", {
				table: this.table.name,
				error,
			});
			throw error;
		}
	}
}

console.log("[REPO] 🏗️ Base repository loaded");
