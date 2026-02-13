/**
 * SignOff View
 *
 * Final sign-off view displaying VwCollar data and section completion status.
 * Shows VwCollar grid/details plus overall section progress.
 *
 * @module drill-hole-data/views
 */

import { Badge, Card, Descriptions, Progress, Space, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { DataGrid } from "../components/DataGrid";
import React from "react";
import { SectionKey } from "../types/data-contracts";
// import { getVwCollarColumns } from "../column-defs";
import { useDrillHoleDataStore } from "../store";
import { RowStatus, getRowStatusWorkflowLabel } from "#src/features/shared/domain/row-status";

const { Title, Text } = Typography;

export const SignOffView: React.FC = () => {
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);
	const sections = useDrillHoleDataStore(state => state.sections);

	console.log("[SignOffView] Rendering", {
		hasCollar: !!vwCollar,
		sectionCount: Object.keys(sections).length,
	});

	// Calculate section completion
	const sectionStatus = Object.entries(sections).map(([key, section]: [string, any]) => ({
		name: key,
		isDirty: section.isDirty || false,
		rowStatus: (section.data?.RowStatus ?? RowStatus.Draft) as RowStatus,
		isComplete: section.data?.RowStatus === RowStatus.Approved, // Approved
	}));

	const completedCount = sectionStatus.filter(s => s.isComplete).length;
	const totalCount = sectionStatus.length;
	const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

	// VwCollar as single-row grid
	const collarRowData = vwCollar ? [vwCollar] : [];
	// const collarColumns = getVwCollarColumns();

	return (
		<div className="flex flex-col h-full overflow-auto">
			<div className="p-6 space-y-6">
				{/* VwCollar Grid */}
				<Card title={<Title level={4}>Collar Data</Title>}>
					{collarRowData.length > 0 ? (
						<div style={{ height: 120 }}>
							<DataGrid
								columnDefs={[]}
								rowData={collarRowData}
								readOnly
								sortColumn=""
							/>
						</div>
					) : (
						<Text type="secondary">No collar data available</Text>
					)}
				</Card>

				{/* Drill Hole Summary */}
				<Card title={<Title level={4}>Drill Hole Summary</Title>}>
					{vwCollar ? (
						<Descriptions bordered column={2} size="small">
							<Descriptions.Item label="Hole ID">{vwCollar.HoleNm || vwCollar.PlannedHoleNm}</Descriptions.Item>
							<Descriptions.Item label="Organization">{vwCollar.Organization}</Descriptions.Item>
							<Descriptions.Item label="Project">{vwCollar.Project}</Descriptions.Item>
							<Descriptions.Item label="Status">{vwCollar.HoleStatus}</Descriptions.Item>
							<Descriptions.Item label="Total Depth">{vwCollar.TotalDepth || 0} m</Descriptions.Item>
							<Descriptions.Item label="Planned Depth">{vwCollar.PlannedTotalDepth || 0} m</Descriptions.Item>
							<Descriptions.Item label="Started">
								{vwCollar.StartedOnDt ? new Date(vwCollar.StartedOnDt).toLocaleDateString() : "N/A"}
							</Descriptions.Item>
							<Descriptions.Item label="Finished">
								{vwCollar.FinishedOnDt ? new Date(vwCollar.FinishedOnDt).toLocaleDateString() : "N/A"}
							</Descriptions.Item>
							<Descriptions.Item label="Validation Status">
								<Badge
									status={vwCollar.ValidationStatus === 1 ? "success" : "default"}
									text={vwCollar.ValidationStatus === 1 ? "Valid" : "Not Validated"}
								/>
							</Descriptions.Item>
							<Descriptions.Item label="Approved">
								<Badge
									status={vwCollar.ApprovedInd ? "success" : "default"}
									text={vwCollar.ApprovedInd ? "Yes" : "No"}
								/>
							</Descriptions.Item>
						</Descriptions>
					) : (
						<Text type="secondary">No collar data available</Text>
					)}
				</Card>

				{/* Section Completion Progress */}
				<Card title={<Title level={4}>Section Completion Status</Title>}>
					<Space direction="vertical" style={{ width: "100%" }} size="large">
						<div>
							<Text strong>Overall Progress</Text>
							<Progress
								percent={completionPercent}
								status={completionPercent === 100 ? "success" : "active"}
								format={() => `${completedCount}/${totalCount} sections approved`}
							/>
						</div>

						<Space direction="vertical" style={{ width: "100%" }}>
							{sectionStatus.map(section => (
								<div
									key={section.name}
									className="flex justify-between items-center py-2 border-b border-gray-100"
								>
									<Text>{section.name}</Text>
									<Space>
										{section.isDirty && <Badge status="processing" text="Unsaved" />}
										{section.isComplete ? (
											<CheckCircleOutlined style={{ color: "#52c41a" }} />
										) : section.rowStatus === RowStatus.Complete ? (
											<ClockCircleOutlined style={{ color: "#1890ff" }} />
										) : (
											<CloseCircleOutlined style={{ color: "#d9d9d9" }} />
										)}
										<Text type="secondary">
											{getRowStatusWorkflowLabel(section.rowStatus as RowStatus)}
										</Text>
									</Space>
								</div>
							))}
						</Space>
					</Space>
				</Card>
			</div>
		</div>
	);
};
