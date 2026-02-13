/**
 * Query Optimization Helpers
 * Provides utilities for efficient Dexie queries
 *
 * Features:
 * - Pagination support
 * - Batch queries
 * - Query result caching
 * - Performance monitoring
 */

export interface PaginationResult<T> {
	items: T[]
	total: number
	page: number
	pageSize: number
	totalPages: number
	hasMore: boolean
}

export interface QueryStats {
	duration: number
	itemCount: number
	cacheHit: boolean
}

/**
 * Query optimizer for Dexie tables
 */
export class QueryOptimizer {
	/**
	 * Paginated query with total count
	 */
	static async paginate<T>(
		table: any,
		page: number = 0,
		pageSize: number = 50,
	): Promise<PaginationResult<T>> {
		const startTime = Date.now();

		try {
			// Get total count
			const total = await table.count();

			// Get paginated items
			const items = await table
				.offset(page * pageSize)
				.limit(pageSize)
				.toArray();

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 📄 Paginated query", {
				page,
				pageSize,
				total,
				itemCount: items.length,
				duration: `${duration}ms`,
			});

			return {
				items,
				total,
				page,
				pageSize,
				totalPages: Math.ceil(total / pageSize),
				hasMore: (page + 1) * pageSize < total,
			};
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Pagination failed", error);
			throw error;
		}
	}

	/**
	 * Batch query for multiple IDs
	 */
	static async batch<T>(
		table: any,
		ids: string[],
	): Promise<T[]> {
		const startTime = Date.now();

		try {
			const results = await Promise.all(
				ids.map(id => table.get(id)),
			);

			const duration = Date.now() - startTime;
			const found = results.filter(r => r !== undefined).length;

			console.log("[QUERY-OPTIMIZER] 📦 Batch query", {
				requested: ids.length,
				found,
				duration: `${duration}ms`,
			});

			return results.filter(r => r !== undefined);
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Batch query failed", error);
			throw error;
		}
	}

	/**
	 * Range query with index
	 */
	static async range<T>(
		table: any,
		indexName: string,
		lowerBound: any,
		upperBound: any,
		inclusive: boolean = true,
	): Promise<T[]> {
		const startTime = Date.now();

		try {
			let query = table.where(indexName);

			if (inclusive) {
				query = query.between(lowerBound, upperBound);
			}
			else {
				query = query.between(lowerBound, upperBound, false, false);
			}

			const items = await query.toArray();

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 📊 Range query", {
				index: indexName,
				itemCount: items.length,
				duration: `${duration}ms`,
			});

			return items;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Range query failed", error);
			throw error;
		}
	}

	/**
	 * Filtered query with predicate
	 */
	static async filter<T>(
		table: any,
		predicate: (item: T) => boolean,
		limit?: number,
	): Promise<T[]> {
		const startTime = Date.now();

		try {
			let query = table.toCollection();

			if (limit) {
				query = query.limit(limit);
			}

			const items = await query.toArray();
			const filtered = items.filter(predicate);

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 🔍 Filter query", {
				total: items.length,
				filtered: filtered.length,
				duration: `${duration}ms`,
			});

			return filtered;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Filter query failed", error);
			throw error;
		}
	}

	/**
	 * Distinct query
	 */
	static async distinct<T>(
		table: any,
		field: string,
	): Promise<any[]> {
		const startTime = Date.now();

		try {
			const items = await table.toArray();
			const values = [...new Set(items.map((item: any) => item[field]))];

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 🎯 Distinct query", {
				field,
				count: values.length,
				duration: `${duration}ms`,
			});

			return values;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Distinct query failed", error);
			throw error;
		}
	}

	/**
	 * Aggregation query (count, sum, avg, etc.)
	 */
	static async aggregate<T>(
		table: any,
		operation: "count" | "sum" | "avg" | "min" | "max",
		field?: string,
	): Promise<number> {
		const startTime = Date.now();

		try {
			let result: number;

			switch (operation) {
				case "count":
					result = await table.count();
					break;

				case "sum":
					if (!field)
						throw new Error("Field required for sum");
					const items = await table.toArray();
					result = items.reduce((sum: number, item: any) => sum + (item[field] || 0), 0);
					break;

				case "avg":
					if (!field)
						throw new Error("Field required for avg");
					const avgItems = await table.toArray();
					const sum = avgItems.reduce((s: number, item: any) => s + (item[field] || 0), 0);
					result = avgItems.length > 0 ? sum / avgItems.length : 0;
					break;

				case "min":
					if (!field)
						throw new Error("Field required for min");
					const minItems = await table.toArray();
					result = Math.min(...minItems.map((item: any) => item[field] || Infinity));
					break;

				case "max":
					if (!field)
						throw new Error("Field required for max");
					const maxItems = await table.toArray();
					result = Math.max(...maxItems.map((item: any) => item[field] || -Infinity));
					break;

				default:
					throw new Error(`Unknown operation: ${operation}`);
			}

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 📈 Aggregation query", {
				operation,
				field,
				result,
				duration: `${duration}ms`,
			});

			return result;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Aggregation query failed", error);
			throw error;
		}
	}

	/**
	 * Bulk update with predicate
	 */
	static async bulkUpdate<T>(
		table: any,
		predicate: (item: T) => boolean,
		updates: Partial<T>,
	): Promise<number> {
		const startTime = Date.now();

		try {
			const items = await table.toArray();
			const toUpdate = items.filter(predicate);

			const updated = await Promise.all(
				toUpdate.map((item: any) =>
					table.update(item.id || item.CollarId, updates),
				),
			);

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 🔄 Bulk update", {
				matched: toUpdate.length,
				updated: updated.filter(u => u).length,
				duration: `${duration}ms`,
			});

			return updated.filter(u => u).length;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Bulk update failed", error);
			throw error;
		}
	}

	/**
	 * Bulk delete with predicate
	 */
	static async bulkDelete<T>(
		table: any,
		predicate: (item: T) => boolean,
	): Promise<number> {
		const startTime = Date.now();

		try {
			const items = await table.toArray();
			const toDelete = items.filter(predicate);

			const ids = toDelete.map((item: any) => item.id || item.CollarId);
			await table.bulkDelete(ids);

			const duration = Date.now() - startTime;

			console.log("[QUERY-OPTIMIZER] 🗑️ Bulk delete", {
				deleted: toDelete.length,
				duration: `${duration}ms`,
			});

			return toDelete.length;
		}
		catch (error: any) {
			console.error("[QUERY-OPTIMIZER] ❌ Bulk delete failed", error);
			throw error;
		}
	}

	/**
	 * Get query statistics
	 */
	static getStats(duration: number, itemCount: number, cacheHit: boolean = false): QueryStats {
		return {
			duration,
			itemCount,
			cacheHit,
		};
	}

	/**
	 * Log query statistics
	 */
	static logStats(label: string, stats: QueryStats): void {
		console.log(`[QUERY-OPTIMIZER] 📊 ${label}`, {
			duration: `${stats.duration}ms`,
			items: stats.itemCount,
			cached: stats.cacheHit ? "✅" : "❌",
		});
	}
}

/**
 * Query builder for complex queries
 */
export class QueryBuilder<T> {
	private table: any;
	private filters: Array<(item: T) => boolean> = [];
	private sortField?: string;
	private sortAsc: boolean = true;
	private limitValue?: number;
	private offsetValue: number = 0;

	constructor(table: any) {
		this.table = table;
	}

	/**
	 * Add filter predicate
	 */
	where(predicate: (item: T) => boolean): this {
		this.filters.push(predicate);
		return this;
	}

	/**
	 * Sort results
	 */
	orderBy(field: string, ascending: boolean = true): this {
		this.sortField = field;
		this.sortAsc = ascending;
		return this;
	}

	/**
	 * Limit results
	 */
	limit(count: number): this {
		this.limitValue = count;
		return this;
	}

	/**
	 * Offset results
	 */
	offset(count: number): this {
		this.offsetValue = count;
		return this;
	}

	/**
	 * Execute query
	 */
	async toArray(): Promise<T[]> {
		const startTime = Date.now();

		try {
			let items = await this.table.toArray();

			// Apply filters
			items = items.filter((item: T) =>
				this.filters.every(filter => filter(item)),
			);

			// Apply sorting
			if (this.sortField) {
				items.sort((a: any, b: any) => {
					const aVal = a[this.sortField!];
					const bVal = b[this.sortField!];

					if (aVal < bVal)
						return this.sortAsc ? -1 : 1;
					if (aVal > bVal)
						return this.sortAsc ? 1 : -1;
					return 0;
				});
			}

			// Apply offset and limit
			if (this.offsetValue > 0) {
				items = items.slice(this.offsetValue);
			}

			if (this.limitValue) {
				items = items.slice(0, this.limitValue);
			}

			const duration = Date.now() - startTime;

			console.log("[QUERY-BUILDER] 🔨 Query executed", {
				filters: this.filters.length,
				sorted: !!this.sortField,
				limited: !!this.limitValue,
				items: items.length,
				duration: `${duration}ms`,
			});

			return items;
		}
		catch (error: any) {
			console.error("[QUERY-BUILDER] ❌ Query failed", error);
			throw error;
		}
	}

	/**
	 * Get count
	 */
	async count(): Promise<number> {
		const items = await this.toArray();
		return items.length;
	}

	/**
	 * Get first item
	 */
	async first(): Promise<T | undefined> {
		const items = await this.toArray();
		return items[0];
	}
}
