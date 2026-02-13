import React, { useEffect } from "react";

import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupFormView } from "../sections/forms/rig-setup";
// import { DrillMethodGrid, SurveyGrid } from "../sections/grids";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";
import { useSectionActions } from "../hooks";

export const DrillingView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const drillPlanId = useDrillHoleDataStore(state => state.drillPlanId);
	const currentLens = activeLens || "RigSheet";

	// Get current section key based on lens
	const getSectionKey = (): SectionKey => {
		switch (currentLens) {
			case "RigSheet":
				return SectionKey.RigSetup;
			case "Coordinate":
				return SectionKey.CollarCoordinate;
			case "DrillMethod":
				return SectionKey.DrillMethod;
			case "Survey":
				return SectionKey.Survey;
			default:
				return SectionKey.RigSetup;
		}
	};

	const currentSectionKey = getSectionKey();

	// Get section state for footer
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	// Get section actions
	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	console.log("[DrillingView] 🔍 Rendering DrillingView", {
		currentLens,
		sectionKey: currentSectionKey,
		hasSection: !!section,
		sectionData: section?.data,
		isDirty: section?.isDirty,
		rowStatus: Array.isArray(section?.data)
			? section?.data?.[0]?.RowStatus
			: section?.data?.RowStatus,
		timestamp: new Date().toISOString(),
	});

	useEffect(() => {
		console.log("[DrillingView] 📊 Section state changed", {
			sectionKey: currentSectionKey,
			isDirty: section?.isDirty,
			rowStatus: Array.isArray(section?.data)
				? section?.data?.[0]?.RowStatus
				: section?.data?.RowStatus,
		});
	}, [section?.isDirty, section?.data, currentSectionKey]);

	// Determine row status (handle both single objects and arrays)
	const getRowStatus = () => {
		if (!section?.data) return 0;
		if (Array.isArray(section.data)) {
			return section.data[0]?.RowStatus || 0;
		}
		return (section.data as any).RowStatus || 0;
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-auto p-6 bg-slate-50">
				{currentLens === "RigSheet" && <RigSetupFormView drillPlanId={drillPlanId || ""} />}
				{currentLens === "Coordinate" && <CollarCoordinateForm />}
				{/* {currentLens === "DrillMethod" && <DrillMethodGrid />}
				{currentLens === "Survey" && <SurveyGrid />} */}
			</div>
			<SectionFooter
				rowStatus={getRowStatus()}
				isDirty={section?.isDirty || false}
				onSave={onSave}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
