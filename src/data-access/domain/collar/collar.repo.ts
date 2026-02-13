/**
 * Collar Repository
 * Domain-specific queries for Collar entities
 *
 * Responsibilities:
 * - CRUD operations for collars
 * - Program-based queries
 * - Offline collar queries
 * - Search functionality
 * - Validation-enabled workflows (approval, review)
 */

// import { db } from "#src/data/db/connection.js";
import { RowStatusValues, z } from "../schema-helpers";
// import type { Collar } from './collar.types.ts.tmp';
// import { RowStatusValues, canSubmitForReview } from "#src/data/domain/schema-helpers/enums.js";
import { canApproveCollar, canSubmitForReview, validateStatusTransition } from ".";
import {
	safeValidateCollarDb,
	validateCollarDb,
	validateCollarDbCreate,
	validateCollarDbUpdate,
} from "./collar.db.schema";

import { BaseRepository } from "../base.repo";
// import { BaseRepository } from "../base.repo";
import type { VwCollar } from "../../api/database/data-contracts";
import { apiToDomain } from "./collar.mappers";
import { db } from "#src/data-access/db/connection.js";

export class CollarRepository extends BaseRepository<VwCollar, string> {
	private static _instance: CollarRepository | null = null;

	private constructor() {
		super(db.DrillHole_Collar);
	}

	/**
	 * Get or create the singleton instance
	 * Lazy initialization defers database access until first use
	 */
	static getInstance(): CollarRepository {
		if (!CollarRepository._instance) {
			console.log("[COLLAR-REPO] 🔧 Creating CollarRepository singleton on first access");
			CollarRepository._instance = new CollarRepository();
			console.log("[COLLAR-REPO] ✅ CollarRepository singleton created");
		}
		return CollarRepository._instance;
	}

	/**
	 * Load coordinates for a collar
	 * Note: Coordinates are not currently synced offline
	 * They would need to be loaded from API when needed for business validation
	 */
	private async loadCoordinates(collarId: string) {
		// TODO: Load from API when needed for approval workflow
		// For now, coordinates are not available offline
		return [];
	}

	/**
	 * Get collar by ID with domain type mapping
	 * Returns domain Collar type with coordinates
	 */
	async getDomainCollar(id: string): Promise<VwCollar | undefined> {
		console.log("[COLLAR-REPO] 🔍 getDomainCollar called", { id });
		const apiCollar = await super.getById(id);
		console.log("[COLLAR-REPO] 🔍 super.getById result", {
			id,
			found: !!apiCollar,
			keys: apiCollar ? Object.keys(apiCollar).length : 0,
		});

		if (!apiCollar)
			return undefined;

		const coordinates = await this.loadCoordinates(id);
		return apiToDomain(apiCollar, coordinates);
	}

	/**
	 * Get all collars in a drill program
	 * Returns domain Collar types with coordinates
	 */
	async getByProgram(programId: string): Promise<VwCollar[]> {
		console.log("[COLLAR-REPO] 📋 Getting collars by program", { programId });

		try {
			const apiCollars = await db.DrillHole_Collar
				.where("DrillProgramId")
				.equals(programId)
				.and(c => c.ActiveInd === true)
				.toArray();

			console.log("[COLLAR-REPO] Found collars", {
				programId,
				count: apiCollars.length,
			});

			// Map to domain types with coordinates
			const domainCollars = await Promise.all(
				apiCollars.map(async (apiCollar) => {
					const coordinates = await this.loadCoordinates(apiCollar.CollarId);
					return apiToDomain(apiCollar, coordinates);
				}),
			);

			return domainCollars;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting by program", { programId, error });
			throw error;
		}
	}

	/**
	 * Search collars by hole ID
	 * Case-insensitive prefix search
	 * Returns domain Collar types with coordinates
	 */
	async searchByHoleId(query: string): Promise<VwCollar[]> {
		console.log("[COLLAR-REPO] 🔍 Searching by hole ID", { query });

		try {
			const apiCollars = await db.DrillHole_Collar
				.where("HoleId")
				.startsWithIgnoreCase(query)
				.toArray();

			console.log("[COLLAR-REPO] Search results", {
				query,
				count: apiCollars.length,
			});

			// Map to domain types with coordinates
			const domainCollars = await Promise.all(
				apiCollars.map(async (apiCollar) => {
					const coordinates = await this.loadCoordinates(apiCollar.CollarId);
					return apiToDomain(apiCollar, coordinates);
				}),
			);

			return domainCollars;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error searching", { query, error });
			throw error;
		}
	}

	/**
	 * Get collars marked for offline use
	 * Uses sync metadata to determine offline status
	 * Returns domain Collar types with coordinates
	 */
	async getOfflineCollars(): Promise<VwCollar[]> {
		console.log("[COLLAR-REPO] 📱 Getting offline collars");

		try {
			// Get collar IDs from sync metadata
			// Using alternative query pattern for better type inference
			const metadata = await db.syncMetadata
				.where("entityType")
				.equals("Collar")
				.and(m => m.isOffline === true)
				.toArray();

			const collarIds = metadata.map(m => m.entityId);

			if (collarIds.length === 0) {
				console.log("[COLLAR-REPO] No offline collars");
				return [];
			}

			// Get collars by IDs
			const apiCollars = await db.DrillHole_Collar
				.where("CollarId")
				.anyOf(collarIds)
				.toArray();

			console.log("[COLLAR-REPO] Offline collars", { count: apiCollars.length });

			// Map to domain types with coordinates
			const domainCollars = await Promise.all(
				apiCollars.map(async (apiCollar) => {
					const coordinates = await this.loadCoordinates(apiCollar.CollarId);
					return apiToDomain(apiCollar, coordinates);
				}),
			);

			return domainCollars;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting offline collars", error);
			throw error;
		}
	}

	/**
	 * Get collars by status
	 * Returns domain Collar types with coordinates
	 */
	async getByStatus(status: number): Promise<VwCollar[]> {
		console.log("[COLLAR-REPO] 📊 Getting collars by status", { status });

		try {
			const apiCollars = await db.DrillHole_Collar
				.where("RowStatus")
				.equals(status)
				.and(c => c.ActiveInd === true)
				.toArray();

			console.log("[COLLAR-REPO] Found collars", {
				status,
				count: apiCollars.length,
			});

			// Map to domain types with coordinates
			const domainCollars = await Promise.all(
				apiCollars.map(async (apiCollar) => {
					const coordinates = await this.loadCoordinates(apiCollar.CollarId);
					return apiToDomain(apiCollar, coordinates);
				}),
			);

			return domainCollars;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting by status", { status, error });
			throw error;
		}
	}

	/**
	 * Get collar by hole ID (exact match)
	 * Returns domain Collar type with coordinates
	 */
	async getByHoleId(holeId: string): Promise<VwCollar | undefined> {
		console.log("[COLLAR-REPO] 🔍 Getting collar by hole ID", { holeId });

		try {
			const apiCollar = await db.DrillHole_Collar
				.where("HoleId")
				.equals(holeId)
				.first();

			if (apiCollar) {
				console.log("[COLLAR-REPO] Found collar", { holeId, collarId: apiCollar.CollarId });
				const coordinates = await this.loadCoordinates(apiCollar.CollarId);
				return apiToDomain(apiCollar, coordinates);
			}
			else {
				console.log("[COLLAR-REPO] Collar not found", { holeId });
				return undefined;
			}
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting by hole ID", { holeId, error });
			throw error;
		}
	}

	/**
	 * Get recent collars (last N)
	 * Returns domain Collar types with coordinates
	 */
	async getRecent(limit: number = 10): Promise<VwCollar[]> {
		console.log("[COLLAR-REPO] 📅 Getting recent collars", { limit });

		try {
			const apiCollars = await db.DrillHole_Collar
				.orderBy("CreatedOnDt")
				.reverse()
				.limit(limit)
				.toArray();

			console.log("[COLLAR-REPO] Recent collars", { count: apiCollars.length });

			// Map to domain types with coordinates
			const domainCollars = await Promise.all(
				apiCollars.map(async (apiCollar) => {
					const coordinates = await this.loadCoordinates(apiCollar.CollarId);
					return apiToDomain(apiCollar, coordinates);
				}),
			);

			return domainCollars;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting recent", { limit, error });
			throw error;
		}
	}

	/**
	 * Check if collar is marked for offline use
	 */
	async isOffline(collarId: string): Promise<boolean> {
		try {
			const metadata = await db.syncMetadata
				.where("entityId")
				.equals(collarId)
				.and(m => m.entityType === "Collar" && m.isOffline === true)
				.first();

			return !!metadata;
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error checking offline status", { collarId, error });
			return false;
		}
	}

	/**
	 * Get collar with all related data counts
	 * Useful for dashboard cards showing progress
	 */
	async getWithCounts(collarId: string): Promise<{
		collar: VwCollar | undefined
		geologyCombinedLogCount: number
		surveyCount: number
		// sampleCount: number;
	}> {
		console.log("[COLLAR-REPO] 📊 Getting collar with counts", { collarId });

		try {
			const apiCollar = await db.DrillHole_Collar.get(collarId);

			if (!apiCollar) {
				return {
					collar: undefined,
					geologyCombinedLogCount: 0,
					surveyCount: 0,
					// sampleCount: 0,
				};
			}

			const [coordinates, geologyCombinedLogCount, surveyCount] = await Promise.all([
				this.loadCoordinates(collarId),
				db.Geology_GeologyCombinedLog.where("CollarId").equals(collarId).count(),
				db.DrillHole_Survey.where("CollarId").equals(collarId).count(),
				0,
				// db.Sample_SampleRegister.where('CollarId').equals(collarId).count(),
			]);

			console.log("[COLLAR-REPO] Collar with counts", {
				collarId,
				geologyCombinedLogCount,
				surveyCount,
				// sampleCount,
			});

			return {
				collar: apiToDomain(apiCollar, coordinates),
				geologyCombinedLogCount,
				surveyCount,
				// sampleCount,
			};
		}
		catch (error) {
			console.error("[COLLAR-REPO] Error getting with counts", { collarId, error });
			throw error;
		}
	}

	/**
	 * Create new collar with validation
	 * Auto-generates VwCollarId, timestamps, and defaults
	 */
	async createWithValidation(collarData: Partial<VwCollar>): Promise<string> {
		console.log("[COLLAR-REPO] ➕ Creating new collar with validation");

		try {
			// Auto-generate fields
			const collar: Partial<VwCollar> = {
				...collarData,
				CollarId: collarData.CollarId || crypto.randomUUID(),
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
				ActiveInd: collarData.ActiveInd ?? true,
				RowStatus: collarData.RowStatus as any ?? 0, // Draft
				ApprovedInd: collarData.ApprovedInd ?? false,
				ValidationErrors: collarData.ValidationErrors ?? undefined, // Ensure no null
			};

			// Validate before save
			const validated = validateCollarDbCreate(collar) as unknown as VwCollar;

			// Convert to API type for database storage (casting validated as Partial<VwCollar>)
			// const apiCollar = partialDomainToApi(validated as Partial<VwCollar>);
			return await this.save(validated);
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				console.error("[COLLAR-REPO] ❌ Validation failed", {
					errors: error.issues,
				});
			}
			throw error;
		}
	}

	/**
	 * Update collar with validation
	 * Validates partial updates
	 */
	async updateWithValidation(
		collarId: string,
		changes: Partial<VwCollar>,
	): Promise<number> {
		console.log("[COLLAR-REPO] 🔧 Updating collar with validation", { collarId });

		try {
			// Add modified timestamp and ensure no null values
			const updates: Partial<VwCollar> = {
				...changes,
				ModifiedOnDt: new Date().toISOString(),
				ValidationErrors: changes.ValidationErrors ?? undefined, // Ensure no null
			};

			// Validate update
			const validated = validateCollarDbUpdate({
				CollarId: collarId,
				...updates,
			});

			// Convert to API type for database storage
			// const apiUpdates = partialDomainToApi(validated as Partial<VwCollar>);
			return await this.update(collarId, validated as Partial<VwCollar>);
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				console.error("[COLLAR-REPO] ❌ Update validation failed", {
					collarId,
					errors: (error as z.ZodError).issues,
				});
			}
			throw error;
		}
	}

	/**
	 * Save collar with validation
	 * Validates before saving to database
	 */
	async saveWithValidation(collar: VwCollar): Promise<string> {
		console.log("[COLLAR-REPO] 💾 Saving collar with validation", {
			HoleId: collar.CollarId,
		});

		try {
			// Validate before save
			validateCollarDb(collar);

			// Convert to API type for database storage
			// const apiCollar = domainToApi(collar);
			return await this.save(collar);
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				console.error("[COLLAR-REPO] ❌ Validation failed", {
					HoleId: collar.CollarId,
					errors: (error as z.ZodError).issues,
				});
			}
			throw error;
		}
	}

	/**
	 * Approve collar with business validation
	 * Ensures collar meets all approval criteria
	 */
	async approve(collarId: string, approvedBy?: string): Promise<void> {
		console.log("[COLLAR-REPO] ✅ Approving collar", { collarId });

		const collar = await this.getDomainCollar(collarId);
		if (!collar) {
			throw new Error(`Collar ${collarId} not found`);
		}

		// Check if can approve
		const approvalCheck = canApproveCollar(collar);
		if (!approvalCheck.canApprove) {
			const errorMsg = `Cannot approve collar:\n${approvalCheck.errors.join("\n")}`;
			console.error("[COLLAR-REPO] ❌ Approval validation failed", {
				collarId,
				errors: approvalCheck.errors,
			});
			throw new Error(errorMsg);
		}

		// Validate status transition
		const statusCheck = validateStatusTransition(collar, 2);
		if (!statusCheck.valid) {
			console.error("[COLLAR-REPO] ❌ Invalid status transition", {
				collarId,
				error: statusCheck.error,
			});
			throw new Error(statusCheck.error);
		}

		// Approve
		await this.update(collarId, {
			ApprovedInd: true,
			RowStatus: RowStatusValues.APPROVED as any, // Approved (3) - cast to API type
			ModifiedOnDt: new Date().toISOString(),
			ModifiedBy: approvedBy,
		});

		console.log("[COLLAR-REPO] ✅ VwCollar approved", { collarId });
	}

	/**
	 * Submit collar for review
	 * Validates collar meets minimum requirements for review
	 */
	async submitForReview(collarId: string, submittedBy?: string): Promise<void> {
		console.log("[COLLAR-REPO] 📋 Submitting collar for review", { collarId });

		const collar = await this.getDomainCollar(collarId);
		if (!collar) {
			throw new Error(`Collar ${collarId} not found`);
		}

		// Check if can submit for review
		const reviewCheck = canSubmitForReview(collar);
		if (!reviewCheck.canSubmit) {
			const errorMsg = `Cannot submit for review:\n${reviewCheck.errors.join("\n")}`;
			console.error("[COLLAR-REPO] ❌ Review validation failed", {
				collarId,
				errors: reviewCheck.errors,
			});
			throw new Error(errorMsg);
		}

		// Validate status transition
		const statusCheck = validateStatusTransition(collar, 1);
		if (!statusCheck.valid) {
			console.error("[COLLAR-REPO] ❌ Invalid status transition", {
				collarId,
				error: statusCheck.error,
			});
			throw new Error(statusCheck.error);
		}

		// Submit for review
		await this.update(collarId, {
			RowStatus: RowStatusValues.REVIEWED as any, // In Review (2) - cast to API type
			ModifiedOnDt: new Date().toISOString(),
			ModifiedBy: submittedBy,
		});

		console.log("[COLLAR-REPO] 📋 Submitted for review", { collarId });
	}

	/**
	 * Reject collar (from review)
	 * Moves collar back to rejected status
	 */
	async reject(
		collarId: string,
		rejectedBy?: string,
		reason?: string,
	): Promise<void> {
		console.log("[COLLAR-REPO] ❌ Rejecting collar", { collarId });

		const collar = await this.getDomainCollar(collarId);
		if (!collar) {
			throw new Error(`Collar ${collarId} not found`);
		}

		// Validate status transition
		const statusCheck = validateStatusTransition(collar, 3);
		if (!statusCheck.valid) {
			console.error("[COLLAR-REPO] ❌ Invalid status transition", {
				collarId,
				error: statusCheck.error,
			});
			throw new Error(statusCheck.error);
		}

		// Reject
		await this.update(collarId, {
			RowStatus: RowStatusValues.REJECTED as any, // Rejected (255) - cast to API type
			ApprovedInd: false,
			Comments: reason
				? `${collar.Comments ? `${collar.Comments}\n` : ""}REJECTED: ${reason}`
				: collar.Comments,
			ModifiedOnDt: new Date().toISOString(),
			ModifiedBy: rejectedBy,
		});

		console.log("[COLLAR-REPO] ❌ VwCollar rejected", { collarId });
	}

	/**
	 * Supersede collar (replace with newer version)
	 * Only allowed for approved collars
	 */
	async supersede(
		collarId: string,
		newCollarId: string,
		supersededBy?: string,
	): Promise<void> {
		console.log("[COLLAR-REPO] 🔄 Superseding collar", { collarId, newCollarId });

		const collar = await this.getDomainCollar(collarId);
		if (!collar) {
			throw new Error(`Collar ${collarId} not found`);
		}

		// Validate status transition (only approved can be superseded)
		const statusCheck = validateStatusTransition(collar, 4);
		if (!statusCheck.valid) {
			console.error("[COLLAR-REPO] ❌ Invalid status transition", {
				collarId,
				error: statusCheck.error,
			});
			throw new Error(statusCheck.error);
		}

		// Supersede
		await this.update(collarId, {
			RowStatus: RowStatusValues.SUPERSEDED as any, // Superseded (4) - cast to API type
			SupersededById: newCollarId,
			ModifiedOnDt: new Date().toISOString(),
			ModifiedBy: supersededBy,
		});

		console.log("[COLLAR-REPO] 🔄 VwCollar superseded", { collarId, newCollarId });
	}

	/**
	 * Check if collar can be approved
	 * Returns detailed validation errors if not
	 */
	checkApprovalReadiness(collar: VwCollar): {
		canApprove: boolean
		errors: string[]
	} {
		return canApproveCollar(collar);
	}

	/**
	 * Check if collar can be submitted for review
	 * Returns detailed validation errors if not
	 */
	checkReviewReadiness(collar: VwCollar): {
		canSubmit: boolean
		errors: string[]
	} {
		return canSubmitForReview(collar);
	}

	/**
	 * Validate collar data without saving
	 * Useful for pre-save validation checks
	 */
	validate(collar: unknown): {
		isValid: boolean
		errors: string[]
	} {
		const result = safeValidateCollarDb(collar);

		if (result.success) {
			return { isValid: true, errors: [] };
		}

		return {
			isValid: false,
			errors: result.error.issues.map(
				(err: z.ZodIssue) => `${err.path.join(".")}: ${err.message}`,
			),
		};
	}
}

// Export singleton instance via lazy getter
export const collarRepo = new Proxy({} as CollarRepository, {
	get(target, prop) {
		const instance = CollarRepository.getInstance();
		return Reflect.get(instance, prop as string | symbol);
	},
});

console.log("[COLLAR-REPO] 🏗️ VwCollar repository loaded with lazy initialization");
