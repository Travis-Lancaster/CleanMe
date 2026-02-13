import { Button, Modal, Segmented, message } from "antd";
import type { DrillHoleSection, SectionKey } from "#src/ux/types/drillhole.js";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { canAddRows, createEmptyRow } from "../utils/row-actions";

import { WorkflowActionBar } from "#src/ux/components/WorkflowActionBar.js";
import { getSectionKeyForTab } from "../utils/navigation";
import { useDrillHoleDataStore } from "../store";
import { useSectionActions } from "#src/ux/hooks/useSectionActions.js";

const LENSES_BY_TAB: Record<string, string[]> = {
	Setup: ["RigSheet", "Coordinate", "DrillMethod", "Survey"],
	Geology: ["Litho", "Alteration", "Veins", "Everything"],
	Geotech: [
		"CoreRecoveryRun",
		"FractureCount",
		"MagSus",
		"RockMechanic",
		"RockQualityDesignation",
		"SpecificGravityPt",
		"Structure",
	],
	Sampling: ["Sample", "Dispatch", "LabResults"],
};

const OTHER_LOGS_BY_TAB: Record<string, string[]> = {
	Geology: ["Shear", "Structure"],
};

// Tabs that don't support workflow actions
const NO_WORKFLOW_TABS = ["Summary", "SignOff"];

export const DrillHoleActionBar: React.FC = () => {
	const {
		activeTab,
		activeLens,
		setActiveLens,
		saveSection,
		refreshSection,
		addRow,
		deleteRow,
		openDrawer,
		drillPlanId,
		vwCollar,
	} = useDrillHoleDataStore();

	const [isActionLoading, setIsActionLoading] = useState(false);

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens[activeTab] || currentLenses[0] || "";
	const currentSectionKey = useMemo(
		() => getSectionKeyForTab(activeTab, currentViewLens),
		[activeTab, currentViewLens]
	);

	const currentSection = useDrillHoleDataStore(
		state => (currentSectionKey ? (state.sections as any)[currentSectionKey] : null)
	);

	const currentRows = useMemo(
		() => (Array.isArray(currentSection?.data) ? currentSection.data : []),
		[currentSection]
	);

	// Create workflow action handlers - must be at top level (React Rules of Hooks)
	const sectionActions = useSectionActions({
		sectionKey: currentSectionKey as any as SectionKey,
		operations: {
			save: async () => {
				if (!currentSectionKey) return { success: false, message: "No section selected" };
				setIsActionLoading(true);
				try {
					await saveSection(currentSectionKey);
					return { success: true, message: "Section saved successfully" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Save failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
			submit: async () => {
				setIsActionLoading(true);
				try {
					// TODO: Implement submitSection in store
					// await submitSection(currentSectionKey);
					console.warn("[DrillHoleActionBar] Submit not yet implemented in store");
					return { success: true, message: "Section submitted for review" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Submit failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
			review: async () => {
				setIsActionLoading(true);
				try {
					// TODO: Implement reviewSection in store
					console.warn("[DrillHoleActionBar] Review not yet implemented in store");
					return { success: true, message: "Section marked as reviewed" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Review failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
			approve: async () => {
				setIsActionLoading(true);
				try {
					// TODO: Implement approveSection in store
					console.warn("[DrillHoleActionBar] Approve not yet implemented in store");
					return { success: true, message: "Section approved" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Approve failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
			reject: async () => {
				setIsActionLoading(true);
				try {
					// TODO: Implement rejectSection in store
					console.warn("[DrillHoleActionBar] Reject not yet implemented in store");
					return { success: true, message: "Section returned to draft" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Reject failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
			exclude: async () => {
				setIsActionLoading(true);
				try {
					// TODO: Implement excludeSection in store
					console.warn("[DrillHoleActionBar] Exclude not yet implemented in store");
					return { success: true, message: "Section excluded from reports" };
				} catch (error) {
					return {
						success: false,
						message: error instanceof Error ? error.message : "Exclude failed",
					};
				} finally {
					setIsActionLoading(false);
				}
			},
		},
	});

	const handleLensClick = (lens: string) => {
		console.log("[DrillHoleActionBar] 🔍 Lens click", {
			activeTab,
			lens,
			timestamp: new Date().toISOString(),
		});
		setActiveLens(activeTab, lens);
	};

	const handleRefresh = async () => {
		if (!currentSectionKey) return;
		console.log("[DrillHoleActionBar] 🔄 Section refresh requested", {
			activeTab,
			currentViewLens,
			currentSectionKey,
		});
		await refreshSection(currentSectionKey);
	};

	const handleAddInterval = () => {
		if (!canAddRows(currentSectionKey)) {
			message.info("Add Interval is not available in this section");
			return;
		}

		const lastRow = currentRows[currentRows.length - 1] || null;
		const nextDepth = lastRow?.DepthTo || 0;
		const newRow = createEmptyRow(currentSectionKey, {
			drillPlanId,
			organization: vwCollar?.Organization,
			depthFrom: nextDepth,
		});

		console.log("[DrillHoleActionBar] ➕ Add Interval", {
			currentSectionKey,
			newRowId: Object.values(newRow)[0],
		});
		addRow(currentSectionKey, newRow);
		openDrawer(currentSectionKey, newRow);
	};

	const handleNewLog = () => {
		if (!canAddRows(currentSectionKey)) {
			message.info("New Log is not available in this section");
			return;
		}

		Modal.confirm({
			title: "Start New Log",
			content:
				"This will soft-delete current rows for this section and create a fresh first row.",
			okText: "Start New Log",
			onOk: () => {
				currentRows.forEach((row: any) => {
					const rowId =
						row.GeologyCombinedLogId ||
						row.ShearLogId ||
						row.StructureLogId ||
						row.CoreRecoveryRunLogId ||
						row.FractureCountLogId ||
						row.MagSusLogId ||
						row.RockMechanicLogId ||
						row.RockQualityDesignationLogId ||
						row.SpecificGravityPtLogId ||
						row.SampleId;
					if (rowId) {
						deleteRow(currentSectionKey, String(rowId));
					}
				});

				const firstRow = createEmptyRow(currentSectionKey, {
					drillPlanId,
					organization: vwCollar?.Organization,
					depthFrom: 0,
				});

				console.log("[DrillHoleActionBar] 🆕 New Log created", { currentSectionKey });
				addRow(currentSectionKey, firstRow);
				openDrawer(currentSectionKey, firstRow);
			},
		});
	};

	if (currentLenses.length === 0 && currentOtherLogs.length === 0) {
		return null;
	}

	const showLogActions =
		canAddRows(currentSectionKey) &&
		activeTab !== "Drilling" &&
		activeTab !== "QAQC" &&
		activeTab !== "SignOff" &&
		activeTab !== "Summary";

	const supportsWorkflow = !NO_WORKFLOW_TABS.includes(activeTab)

	console.log(`XXX currentSectionKey`, currentSectionKey)
	console.log(`XXX currentSection`, currentSection)
	console.log(`XXX supportsWorkflow`, supportsWorkflow)
	console.log(`XXX sectionActions`, sectionActions)
	return (
		<div className="bg-slate-50 p-3 flex justify-between items-center px-6 border-b">
			<div className="flex items-center space-x-2">
				{currentLenses.length > 0 && (
					<>
						<div className="w-px h-6 bg-slate-300 mx-2"></div>
						<span className="text-[10px] uppercase font-bold text-slate-500 mr-2">
							View Lens:
						</span>
						<div className="inline-flex rounded-md shadow-sm">
							<Segmented onChange={handleLensClick} options={currentLenses} value={currentViewLens} />
							{/* {currentLenses.map((lens, index) => {
								const isFirst = index === 0;
								const isLast = index === currentLenses.length - 1;
								const isActive = currentViewLens === lens;
								return (
									<button
										key={lens}
										onClick={() => handleLensClick(lens)}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"
											} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"
											}`}
									>
										{lens}
									</button>
								);
							})} */}
						</div>
					</>
				)}

				{currentOtherLogs.length > 0 && (
					<>
						<div className="w-px h-6 bg-slate-300 mx-2"></div>
						<span className="text-[10px] uppercase font-bold text-slate-500 mr-2">
							Other Logs:
						</span>
						<div className="inline-flex rounded-md shadow-sm">
							<Segmented onChange={handleLensClick} options={currentOtherLogs} shape={"round"} value={currentViewLens} />
							{/* {currentOtherLogs.map((log, index) => {
								const isFirst = index === 0;
								const isLast = index === currentOtherLogs.length - 1;
								const isActive = currentViewLens === log;
								return (
									<button
										key={log}
										onClick={() => handleLensClick(log)}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"
											} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"
											}`}
									>
										{log}
									</button>
								);
							})} */}
						</div>
					</>
				)}
				<div className="w-px h-6 bg-slate-300 mx-2"></div>
			</div>

			<div className="flex items-center space-x-2">
				{showLogActions && (
					<>
						<Button size="small" icon={<PlusOutlined />} onClick={handleAddInterval}>
							Add Interval
						</Button>
						<Button size="small" onClick={handleNewLog}>
							New Log
						</Button>
					</>
				)}
				<Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh}>
					Refresh
				</Button>

				{/* Workflow Action Buttons */}
				{supportsWorkflow && currentSection && sectionActions && currentSectionKey && (
					<WorkflowActionBar
						section={{
							...currentSection,
							sectionKey: currentSectionKey,
							rowStatus: (currentSection.data as any)?.RowStatus ?? 0,
							isDirty: currentSection.isDirty,
							getMetadata: () => currentSection.data as any,
						} as any}
						actions={sectionActions}
						loading={isActionLoading}
						size="small"
					/>
				)}
			</div>
		</div>
	);
};
