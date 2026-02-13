/**
 * Store Actions
 *
 * Business logic for store actions (save, submit, review, approve, reject).
 *
 * @module drill-hole-data/store
 */

import type { ActionResult, SectionKey } from "../types/data-contracts";
import { getSectionConfig, isSingleSection } from "./section-config";
import { saveRowData, saveSectionData } from "../services/drill-hole-data-service";

/**
 * Update section data (single-object sections)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @param partialData - Partial data to update
 */
export function updateSectionData<TData>(
	set: any,
	get: any,
	sectionKey: SectionKey,
	partialData: Partial<TData>,
): void {
	console.log(`[StoreActions] 📝 Updating section data:`, {
		sectionKey,
		fields: Object.keys(partialData),
		incomingData: partialData,
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section) {
			console.log(`[StoreActions] 🔍 BEFORE merge:`, {
				sectionKey,
				currentData: section.data,
			});

			section.data = { ...section.data, ...partialData };
			section.isDirty = true;

			console.log(`[StoreActions] ✅ AFTER merge:`, {
				sectionKey,
				mergedData: section.data,
				isDirty: section.isDirty,
				fieldsChanged: Object.keys(partialData),
			});
		} else {
			console.error(`[StoreActions] ❌ Section not found:`, {
				sectionKey,
				availableSections: Object.keys(state.sections),
			});
		}
	});

	// Verify state after set completes
	const stateAfter = get();
	console.log(`[StoreActions] 🔎 VERIFICATION - State after update:`, {
		sectionKey,
		dataInStore: stateAfter.sections[sectionKey]?.data,
		isDirty: stateAfter.sections[sectionKey]?.isDirty,
	});
}

/**
 * Save section (validates and saves to service)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @returns Action result
 */
export async function saveSection(
	set: any,
	get: any,
	sectionKey: SectionKey,
): Promise<ActionResult> {
	console.log(`[StoreActions] 💾 Saving section:`, {
		sectionKey,
		timestamp: new Date().toISOString(),
	});

	try {
		const state = get();
		const section = state.sections[sectionKey];
		const drillPlanId = state.drillPlanId;

		console.log(`[StoreActions] 📊 Current section state:`, {
			sectionKey,
			sectionExists: !!section,
			dataKeys: section ? Object.keys(section.data) : [],
			currentData: section?.data,
		});

		// ⚠️ CRITICAL: Check if form data is out of sync with store
		// This happens when useFormHook saves to Dexie but store.section.data hasn't been updated
		console.log(`[StoreActions] 🔍 DIAGNOSTIC - Checking data sync:`, {
			sectionKey,
			hasSection: !!section,
			sectionDataType: section?.data ? typeof section.data : 'undefined',
			isArray: Array.isArray(section?.data),
			note: 'If form was edited, section.data may be stale. Form changes are in React Hook Form state, not in store.',
		});

		// ⚠️ ARCHITECTURAL ISSUE DETECTED:
		// useFormHook saves directly to Dexie (line 464 in useFormHook.ts)
		// But DrillHoleActionBar calls store.saveSection() which reads from section.data
		// These are TWO SEPARATE SAVE PATHS that are disconnected:
		//
		// PATH 1 (useFormHook):
		//   Form changes → React Hook Form state → getValues() → Dexie.Update()
		//
		// PATH 2 (DrillHoleActionBar):
		//   Click Save → store.saveSection() → reads section.data → service.saveSectionData()
		//
		// RESULT: section.data is STALE because form changes went to Dexie, not to store
		//
		// FIX NEEDED: Either:
		// 1. Make useFormHook update section.data before saving to Dexie
		// 2. Make DrillHoleActionBar get form values from React Hook Form instead of store
		// 3. Unify both paths to use the same save mechanism
		console.log(`[StoreActions] ⚠️ ARCHITECTURE ISSUE:`, {
			sectionKey,
			problem: 'Two disconnected save paths - form changes in React Hook Form, store reading stale section.data',
			path1: 'useFormHook → Dexie (form changes go here)',
			path2: 'DrillHoleActionBar → store.saveSection() → reads stale section.data',
			consequence: 'Form changes are lost when saving through store',
		});

		if (!drillPlanId) {
			return {
				success: false,
				message: "No drill plan loaded",
				errors: ["Drill plan ID is missing"],
			};
		}

		if (!section) {
			return {
				success: false,
				message: `Section '${sectionKey}' not found`,
				errors: ["Invalid section key"],
			};
		}

		// Validate section
		const validation = section.validate();

		// CRITICAL: Only database validation blocks save
		// Business validation warnings are allowed (data may be incomplete for months/years)
		if (!validation.database.isValid) {
			console.error(`[StoreActions] ❌ Database validation failed:`, {
				sectionKey,
				errors: validation.database.errors,
			});

			return {
				success: false,
				message: "Database validation failed - cannot save to database",
				errors: validation.database.errors.map((e: any) => e.message),
			};
		}

		// Log business validation warnings (but don't block save)
		if (!validation.save.isValid) {
			console.warn(`[StoreActions] ⚠️ Business validation warnings:`, {
				sectionKey,
				warnings: validation.save.warnings,
			});
		}

		// Add validation status to data
		const dataToSave = {
			...section.data,
			ValidationStatus: validation.save.isValid ? 1 : 2, // 1=Valid, 2=HasWarnings
		};

		console.log(`[StoreActions] 📤 Data being sent to service:`, {
			sectionKey,
			drillPlanId,
			dataToSave,
			dataKeys: Object.keys(dataToSave),
		});

		// Save via service
		const result = await saveSectionData(drillPlanId, sectionKey, dataToSave);

		console.log(`[StoreActions] 📥 Service response:`, {
			sectionKey,
			success: result.success,
			message: result.message,
			hasResponseData: result.data !== undefined,
			responseData: result.data,
		});

		if (result.success) {
			set((state: any) => {
				const storeSection = state.sections[sectionKey];
				if (!storeSection) return;

				console.log(`[StoreActions] 🔄 Updating store after successful save:`, {
					sectionKey,
					willUpdateData: result.data !== undefined,
					newData: result.data,
				});

				if (result.data !== undefined) {
					storeSection.data = result.data;
				}

				storeSection.originalData = storeSection.data;
				storeSection.isDirty = false;

				if (Array.isArray(storeSection.data) && storeSection.rowMetadata) {
					storeSection.data.forEach((row: any) => {
						const rowId = row.GeologyCombinedLogId || row.ShearLogId || row.StructureLogId || row.CoreRecoveryRunLogId || row.FractureCountLogId || row.MagSusLogId || row.RockMechanicLogId || row.RockQualityDesignationLogId || row.SpecificGravityPtLogId || row.SampleId;
						if (rowId && storeSection.rowMetadata[rowId]) {
							storeSection.rowMetadata[rowId].isDirty = false;
							storeSection.rowMetadata[rowId].isNew = false;
						}
					});
				}
			});

			console.log(`[StoreActions] ✅ Section saved successfully with response data`, { sectionKey, hasData: result.data !== undefined });
		}

		return result;
	} catch (error) {
		console.error(`[StoreActions] ❌ Save failed:`, {
			sectionKey,
			error,
		});

		return {
			success: false,
			message: error instanceof Error ? error.message : "Save failed",
			errors: [error instanceof Error ? error.message : "Unknown error"],
		};
	}
}

/**
 * Submit section (save + change RowStatus to Submitted)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @returns Action result
 */
export async function submitSection(
	set: any,
	get: any,
	sectionKey: SectionKey,
): Promise<ActionResult> {
	console.log(`[StoreActions] ✅ Submitting section:`, {
		sectionKey,
		timestamp: new Date().toISOString(),
	});

	try {
		// First save the section
		const saveResult = await saveSection(set, get, sectionKey);

		if (!saveResult.success) {
			return saveResult;
		}

		// Update RowStatus to Submitted (1)
		set((state: any) => {
			const section = state.sections[sectionKey];
			if (section && section.data) {
				section.data.RowStatus = 1;
			}
		});

		// Save with new status
		const statusResult = await saveSection(set, get, sectionKey);

		if (statusResult.success) {
			console.log(`[StoreActions] ✅ Section submitted successfully:`, sectionKey);
		}

		return statusResult;
	} catch (error) {
		console.error(`[StoreActions] ❌ Submit failed:`, {
			sectionKey,
			error,
		});

		return {
			success: false,
			message: error instanceof Error ? error.message : "Submit failed",
			errors: [error instanceof Error ? error.message : "Unknown error"],
		};
	}
}

/**
 * Reject section (change RowStatus to Rejected)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @returns Action result
 */
export async function rejectSection(
	set: any,
	get: any,
	sectionKey: SectionKey,
): Promise<ActionResult> {
	console.log(`[StoreActions] ❌ Rejecting section:`, {
		sectionKey,
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && section.data) {
			section.data.RowStatus = 4; // Rejected
		}
	});

	return await saveSection(set, get, sectionKey);
}

/**
 * Review section (change RowStatus to Reviewed)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @returns Action result
 */
export async function reviewSection(
	set: any,
	get: any,
	sectionKey: SectionKey,
): Promise<ActionResult> {
	console.log(`[StoreActions] 👁️ Reviewing section:`, {
		sectionKey,
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && section.data) {
			section.data.RowStatus = 2; // Reviewed
		}
	});

	return await saveSection(set, get, sectionKey);
}

/**
 * Approve section (change RowStatus to Approved)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @returns Action result
 */
export async function approveSection(
	set: any,
	get: any,
	sectionKey: SectionKey,
): Promise<ActionResult> {
	console.log(`[StoreActions] ✔️ Approving section:`, {
		sectionKey,
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && section.data) {
			section.data.RowStatus = 3; // Approved
		}
	});

	return await saveSection(set, get, sectionKey);
}
