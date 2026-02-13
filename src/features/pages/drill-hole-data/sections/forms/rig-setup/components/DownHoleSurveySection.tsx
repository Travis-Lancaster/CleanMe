// import SignaturePad from "#src/features/components/signature-pad/index.js";
import { Col, Descriptions, Input, InputNumber, Select } from "antd";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import SignaturePad from "#src/app/components/signature-pad/index.js";
import TitleCard from "#src/app/components/basic-card/TitleCard.js";

interface DownHoleSurveySectionProps {
	form: Control<any>
	lookupOptions: {
		person: Array<{ value: string, label: string }>
		drillCompanies: Array<{ value: string, label: string }>
		machineryAll: Array<{ value: string, label: string }>
	}
	filteredMachinery: Array<{ value: string, label: string }>
	drillPlanId: string
}

export function DownHoleSurveySection({ form, lookupOptions, filteredMachinery, drillPlanId }: DownHoleSurveySectionProps) {
	return (
		<Col xs={24} md={24}>
			<TitleCard
				title="Down Hole Survey"
				orientation="vertical"
				size="small"
				borderColor="#13c2c2"
				showToggle={true}
				titleAlign="left"
				style={{ minHeight: "auto" }}
				bodyStyle={{ minHeight: "auto", padding: "12px" }}
			>
				<Descriptions bordered size="small" column={4}>
					<Descriptions.Item label="Drilling Contractor" span={1}>
						<Controller
							name="DownHoleSurveyDrillingContractor"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.drillCompanies}
									placeholder="Select contractor"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Driller Name" span={1}>
						<Controller
							name="DownHoleSurveyDriller"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.person}
									placeholder="Select driller"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Rig Name" span={1}>
						<Controller
							name="DownHoleSurveyRigName"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={filteredMachinery}
									placeholder="Select rig"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Driller Signature" span={1}>
						<Controller
							name="DownHoleSurveyDrillerSignature"
							control={form}
							render={({ field }) => (
								<SignaturePad
									value={field.value || ""}
									onChange={(signature: string) => {
										field.onChange(signature);
									}}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Signature Date" span={4}>
						<Controller
							name="DownHoleSurveyDrillerSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>

					{/* Rig Alignment Tool Section */}
					<Descriptions.Item label="Rig Alignment Tool Mag Azi (°)" span={1}>
						<Controller
							name="RigAlignmentToolMagAzi"
							control={form}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={0}
									max={360}
									step={0.1}
									placeholder="0-360"
									style={{ width: "100%" }}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Rig Alignment Tool Dip (°)" span={1}>
						<Controller
							name="RigAlignmentToolDip"
							control={form}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={-90}
									max={90}
									step={0.1}
									placeholder="-90 to 90"
									style={{ width: "100%" }}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Survey Reference" span={2}>
						<Controller
							name="SurveyReference"
							control={form}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Survey reference"
									maxLength={50}
								/>
							)}
						/>
					</Descriptions.Item>

					{/* Survey Measurements Section */}
					<Descriptions.Item label="Survey Mag Azi (°)" span={1}>
						<Controller
							name="SurveyMagAzi"
							control={form}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={0}
									max={360}
									step={0.1}
									placeholder="0-360"
									style={{ width: "100%" }}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Survey Dip (°)" span={1}>
						<Controller
							name="SurveyDip"
							control={form}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={-90}
									max={90}
									step={0.1}
									placeholder="-90 to 90"
									style={{ width: "100%" }}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Survey Depth (m)" span={2}>
						<Controller
							name="SurveyDepth"
							control={form}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={0}
									step={0.1}
									placeholder="Depth in meters"
									style={{ width: "100%" }}
								/>
							)}
						/>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
