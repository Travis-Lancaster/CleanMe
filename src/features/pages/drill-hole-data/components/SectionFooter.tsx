import { CheckOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons";

import { Button } from "antd";
import React from "react";
import { RowStatus } from "#src/features/shared/domain/row-status";

interface SectionFooterProps {
	rowStatus: RowStatus;
	isDirty: boolean;
	onSave?: () => void;
	onSubmit?: () => void;
	onReview?: () => void;
	className?: string;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({
	rowStatus,
	isDirty,
	onSave,
	onSubmit,
	onReview,
	className = "",
}) => {
	console.log("[SectionFooter] 🎨 Rendering", {
		rowStatus,
		isDirty,
		hasOnSave: !!onSave,
		hasOnSubmit: !!onSubmit,
		hasOnReview: !!onReview,
		timestamp: new Date().toISOString(),
	});

	const handleSave = () => {
		console.log("[SectionFooter] 💾 Save clicked", {
			rowStatus,
			isDirty,
			timestamp: new Date().toISOString(),
		});
		onSave?.();
	};

	const handleSubmit = () => {
		console.log("[SectionFooter] ✅ Submit clicked", {
			rowStatus,
			isDirty,
			timestamp: new Date().toISOString(),
		});
		onSubmit?.();
	};

	const handleReview = () => {
		console.log("[SectionFooter] 👁️ Review clicked", {
			rowStatus,
			isDirty,
			timestamp: new Date().toISOString(),
		});
		onReview?.();
	};

	// Determine which button to show based on RowStatus and isDirty
	const showSave = rowStatus === RowStatus.Draft && isDirty; // Draft & Dirty -> Save
	const showSubmit = rowStatus === RowStatus.Draft && !isDirty; // Draft & Clean -> Submit
	const showReview = rowStatus === RowStatus.Complete && !isDirty; // Complete -> Review

	console.log("[SectionFooter] 🔘 Button visibility", {
		showSave,
		showSubmit,
		showReview,
		rowStatus,
		isDirty,
	});

	return (
		<div
			className={`bg-slate-50 p-3 flex justify-between items-center px-6 border-t ${className}`}
		>
			<div className="flex items-center space-x-2">
				<div className="w-px h-6 bg-slate-300 mx-2"></div>
			</div>
			<div className="flex items-center space-x-3">
				{showSave && (<></>)}
				{showSubmit && (<></>)}
				{showReview && (<></>)}
				{rowStatus === RowStatus.Reviewed && (
					<div className="text-green-600 font-semibold">✓ Reviewed</div>
				)}
				{rowStatus === RowStatus.Approved && (
					<div className="text-green-600 font-semibold">✓ Approved (Read Only)</div>
				)}
			</div>
		</div>
	);
};
