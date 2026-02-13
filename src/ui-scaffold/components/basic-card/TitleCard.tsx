import type { CSSProperties, ReactNode } from "react";
import { MenuOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;

export interface TitleCardProps {
	// Content
	children?: ReactNode
	title?: string
	subtitle?: string

	// Layout
	orientation?: "vertical" | "horizontal" | string
	collapsible?: boolean
	defaultCollapsed?: boolean
	showToggle?: boolean

	// Title Alignment
	titleAlign?: "left" | "center" | "right"

	// Styling
	borderColor?: string
	borderWidth?: string
	titleWidth?: string
	titleBackground?: string
	titleColor?: string
	titleLevel?: 1 | 2 | 3 | 4 | 5
	cardStyle?: CSSProperties
	bodyStyle?: CSSProperties
	titleStyle?: CSSProperties
	headerStyle?: CSSProperties

	// Actions
	extra?: ReactNode
	onToggle?: (collapsed: boolean) => void

	// Card props
	[key: string]: any
}

const TitleCard: React.FC<TitleCardProps> = ({
	// Content
	children,
	title,
	subtitle,

	// Layout
	orientation = "vertical",
	collapsible = false,
	defaultCollapsed = false,
	showToggle = false,

	// Title Alignment
	titleAlign = "center",

	// Styling
	borderColor = "#1890ff",
	borderWidth = "1px",
	titleWidth = "30px",
	titleBackground = "#fafafa",
	titleColor = "#1890ff",
	titleLevel = 5,
	cardStyle = {},
	bodyStyle = {},
	titleStyle = {},
	headerStyle = {},

	// Actions
	extra,
	onToggle,

	// Card props
	...cardProps
}) => {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);

	const handleToggle = () => {
		const newState = !collapsed;
		setCollapsed(newState);
		onToggle?.(newState);
	};

	const isVertical = orientation === "vertical";

	// Get text alignment style for vertical layout (after rotation)
	// This controls the vertical position of the title block (top/center/bottom)
	const getVerticalTitleAlignment = (): CSSProperties => {
		switch (titleAlign) {
			case "left":
				// After 180deg rotation, visual left becomes physical bottom
				return {
					justifyContent: "flex-end",
					paddingBottom: "4px",
				};
			case "right":
				// After 180deg rotation, visual right becomes physical top
				return {
					justifyContent: "flex-start",
					paddingTop: "4px",
				};
			case "center":
			default:
				return {
					justifyContent: "center",
					paddingTop: "0",
				};
		}
	};

	// Get text alignment style for horizontal layout
	const getHorizontalTitleAlignment = (): CSSProperties => {
		switch (titleAlign) {
			case "left":
				return {
					justifyContent: "flex-start",
					textAlign: "left",
				};
			case "right":
				return {
					justifyContent: "flex-end",
					textAlign: "right",
				};
			case "center":
			default:
				return {
					justifyContent: "center",
					textAlign: "center",
				};
		}
	};

	// Render Vertical Layout
	if (isVertical) {
		// When collapsed, render title bar horizontally
		if (collapsed) {
			return (
				<div style={{
					display: "flex",
					flexDirection: "column",
					border: "1px solid #f0f0f0",
					borderRadius: "8px",
					overflow: "hidden",
					...cardStyle,
				}}
				>
					{/* Horizontal Title Section (when collapsed) */}
					<div style={{
						minHeight: "auto",
						position: "relative",
						display: "flex",
						alignItems: "center",
						background: titleBackground,
						flexDirection: "row",
						padding: "8px 12px",
						borderBottom: `${borderWidth} solid ${borderColor}`,
					}}
					>
						{/* Toggle Button (if enabled) */}
						{showToggle && (
							<Button
								type="text"
								icon={<VerticalAlignTopOutlined />}
								onClick={handleToggle}
								style={{ marginRight: "8px" }}
								size="small"
							/>
						)}

						{/* Horizontal Text Container */}
						<div style={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							...getHorizontalTitleAlignment(),
							...titleStyle,
						}}
						>
							<div>
								<Title
									level={titleLevel}
									style={{
										margin: 0,
										color: titleColor,
										fontSize: "14px",
										lineHeight: 1.2,
									}}
								>
									{title}
								</Title>
								{subtitle && (
									<Text
										type="secondary"
										style={{
											fontSize: "10px",
											display: "block",
										}}
									>
										{subtitle}
									</Text>
								)}
							</div>
						</div>

						{/* Extra actions */}
						{extra && (
							<div style={{ marginLeft: "auto" }}>
								{extra}
							</div>
						)}
					</div>
				</div>
			);
		}

		// When expanded, render title bar vertically
		return (
			<div style={{
				display: "flex",
				border: "1px solid #f0f0f0",
				borderRadius: "8px",
				overflow: "hidden",
				...cardStyle,
			}}
			>
				{/* Vertical Title Section */}
				<div style={{
					width: titleWidth,
					minHeight: "50px",
					position: "relative",
					display: "flex",
					// Main section aligns vertically (column)
					alignItems: "center",
					justifyContent: "center",
					background: titleBackground,
					flexDirection: "column",
					padding: "12px 0",
				}}
				>
					{/* Toggle Button (if enabled) */}
					{showToggle && (
						<Button
							type="text"
							icon={<VerticalAlignTopOutlined />}
							onClick={handleToggle}
							style={{ marginBottom: "12px" }}
							size="small"
						/>
					)}

					{/* Vertical Border */}
					<div style={{
						position: "absolute",
						right: "0",
						top: "0",
						height: "100%",
						width: borderWidth,
						background: borderColor,
					}}
					/>

					{/* Vertical Text Container */}
					<div style={{
						display: "flex",
						flex: 1,
						// FIX: Use alignItems (cross-axis) for horizontal alignment in this column flex container.
						// This aligns the rotated text block left/center/right within the title column.
						alignItems: titleAlign === "left" ? "flex-start" : titleAlign === "right" ? "flex-end" : "center",
						...getVerticalTitleAlignment(), // This controls vertical alignment (top/center/bottom)
						...titleStyle,
					}}
					>
						<div style={{
							writingMode: "vertical-rl",
							transform: "rotate(180deg)",
							fontWeight: 600,
							letterSpacing: "0.5px",
							display: "flex",
							flexDirection: "column",
						}}
						>
							<Title
								level={titleLevel}
								style={{
									margin: 0,
									fontSize: "12px",
									color: titleColor,
									padding: "8px 0",
								}}
							>
								{title}
							</Title>
							{subtitle && (
								<Text
									type="secondary"
									style={{
										fontSize: "10px",
										display: "block",
										marginTop: "4px",
									}}
								>
									{subtitle}
								</Text>
							)}
						</div>
					</div>

					{/* Extra actions */}
					{extra && (
						<div style={{
							marginTop: "auto",
							writingMode: "vertical-rl",
							transform: "rotate(180deg)",
						}}
						>
							{extra}
						</div>
					)}
				</div>

				{/* Content Section */}
				<div style={{
					flex: 1,
					padding: "12px",
					background: "white",
					minHeight: "50px",
					...bodyStyle,
				}}
				>
					{children}
				</div>
			</div>
		);
	}

	// Render Horizontal Layout
	return (
		<Card
			title={(
				<div style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					...getHorizontalTitleAlignment(),
					...titleStyle,
				}}
				>
					<div>
						<Title
							level={titleLevel}
							style={{
								margin: 0,
								color: titleColor,

								lineHeight: 1.2,
							}}
						>
							{title}
						</Title>
						{subtitle && (
							<Text type="secondary" style={{ fontSize: "12px" }}>
								{subtitle}
							</Text>
						)}
					</div>
				</div>
			)}
			extra={(
				<Space>
					{showToggle && (
						<Button
							type="text"
							icon={collapsed ? <MenuOutlined /> : <VerticalAlignTopOutlined />}
							onClick={handleToggle}
							size="small"
						/>
					)}
					{extra}
				</Space>
			)}
			headStyle={{
				background: titleBackground,
				borderBottom: `${borderWidth} solid ${borderColor}`,
				...headerStyle,
			}}
			bodyStyle={collapsed ? { display: "none" } : bodyStyle}
			style={{
				minHeight: collapsed ? "auto" : "50px",
				...cardStyle,
			}}
			{...cardProps}
		>
			{!collapsed && children}
		</Card>
	);
};

export default TitleCard;
