import type { Breakpoint } from "antd/es/_util/responsiveObserver";
import type { ReactElement, ReactNode } from "react";

import React from "react";

// ============================================================================
// Type Definitions (matching antD Descriptions API)
// ============================================================================

interface DescriptionItemProps {
	label?: ReactNode
	span?: number
	children?: ReactNode
	labelStyle?: React.CSSProperties
	contentStyle?: React.CSSProperties
	className?: string
}

type SemanticName = "root" | "header" | "title" | "extra" | "label" | "content";

export interface SheetLayoutProps {
	prefixCls?: string
	className?: string
	rootClassName?: string
	style?: React.CSSProperties
	bordered?: boolean
	borderRadius?: string | number
	size?: "middle" | "small" | "default"
	children?: ReactNode
	title?: ReactNode
	extra?: ReactNode
	column?: number | Partial<Record<Breakpoint, number>>
	layout?: "horizontal" | "vertical"
	colon?: boolean
	labelStyle?: React.CSSProperties
	contentStyle?: React.CSSProperties
	styles?: Partial<Record<SemanticName, React.CSSProperties>>
	classNames?: Partial<Record<SemanticName, string>>
	mode?: "description" | "item" | string
}

// ============================================================================
// FormDescriptionItem Component
// ============================================================================

export const FormDescriptionItem: React.FC<DescriptionItemProps> = ({
	children,
	label,
	span = 1,
	labelStyle,
	contentStyle,
	className,
}) => {
	// This component is primarily used as a marker for the parent to process
	// The actual rendering happens in SheetLayout
	return <>{children}</>;
};

// ============================================================================
// SheetLayout Component (Main Export)
// ============================================================================

/**
 * Replaces Ant Design's <Descriptions> as a form field container.
 * Supports both FormDescriptionItem and SheetFormField in 'description' mode.
 *
 * Usage:
 * <SheetLayout column={2} bordered>
 *   <FormDescriptionItem label="Field 1">Content</FormDescriptionItem>
 *   <SheetFormField displayMode="description" label="Field 2" ... />
 * </SheetLayout>
 */
export const SheetLayout: React.FC<SheetLayoutProps> = ({
	children,
	column = 3,
	bordered = true,
	borderRadius = "8px",
	size = "default",
	layout = "horizontal",
	colon = true,
	labelStyle,
	contentStyle,
	style,
	className,
	rootClassName,
	title,
	extra,
	styles,
	classNames,
	mode = "description",
}) => {
	// ========================================================================
	// Item Mode - Just render children as-is
	// ========================================================================
	if (mode === "item") {
		return (
			<div className={`${rootClassName || ""} ${className || ""}`} style={style}>
				{(title || extra) && (
					<div style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "20px",
						...styles?.header,
					}}
					>
						{title && (
							<div style={{
								fontSize: "16px",
								fontWeight: 600,
								color: "rgba(0, 0, 0, 0.85)",
								...styles?.title,
							}}
							>
								{title}
							</div>
						)}
						{extra && <div style={styles?.extra}>{extra}</div>}
					</div>
				)}
				{children}
			</div>
		);
	}

	// ========================================================================
	// Size Configuration (for description mode)
	// ========================================================================
	const getSizePadding = () => {
		switch (size) {
			case "small":
				return "8px 16px";
			case "middle":
				return "12px 24px";
			case "default":
			default:
				return "16px 24px";
		}
	};

	const padding = getSizePadding();

	// ========================================================================
	// Process Children into Items
	// ========================================================================
	const processChildren = (): Array<{
		label: ReactNode
		content: ReactNode
		span: number
		labelStyle?: React.CSSProperties
		contentStyle?: React.CSSProperties
	}> => {
		const items: Array<{
			label: ReactNode
			content: ReactNode
			span: number
			labelStyle?: React.CSSProperties
			contentStyle?: React.CSSProperties
		}> = [];

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child))
				return;

			// Handle FormDescriptionItem
			if (child.type === FormDescriptionItem) {
				const props = child.props as DescriptionItemProps;
				items.push({
					label: props.label,
					content: props.children,
					span: props.span || 1,
					labelStyle: props.labelStyle,
					contentStyle: props.contentStyle,
				});
				return;
			}

			// Handle SheetFormField or any component with displayMode='description'
			const childProps = child.props as any;

			// Only extract label if explicitly in description mode
			if (childProps.displayMode === "description" || childProps.label !== undefined) {
				// Extract label from the child component
				const label = childProps.label;

				// Clone the child without the label prop to prevent duplicate rendering
				const childWithoutLabel = React.cloneElement(child, {
					...childProps,
					label: undefined, // Remove label from child so SheetLayout handles it
				});

				items.push({
					label,
					content: childWithoutLabel,
					span: childProps.span || 1,
					labelStyle: childProps.labelStyle,
					contentStyle: childProps.contentStyle,
				});
				return;
			}

			// Default: treat as content without label
			items.push({
				label: undefined,
				content: child,
				span: 1,
			});
		});

		return items;
	};

	const items = processChildren();

	// ========================================================================
	// Calculate Grid Columns (handle number or responsive config)
	// ========================================================================
	const getColumnCount = (): number => {
		if (typeof column === "number") {
			return column;
		}
		// For responsive, default to 3 (could be enhanced with responsive observer)
		return 3;
	};

	const columnCount = getColumnCount();

	// ========================================================================
	// Styles
	// ========================================================================
	const containerStyle: React.CSSProperties = {
		width: "100%",
		borderCollapse: "collapse", // This property is not used on a div, but harmless.
		// RE-ADD BORDER, RADIUS, AND OVERFLOW HERE
		border: bordered ? "1px solid #d9d9d9" : "none",
		borderRadius: bordered ? borderRadius : 0,
		overflow: "hidden", // Crucial to clip the inner table content/borders
		...styles?.root,
		...style,
	};

	const tableStyle: React.CSSProperties = {
		width: "100%",
		borderCollapse: "collapse",
		// border: bordered ? '1px solid red' : 'none',
		// borderRadius: bordered ? borderRadius : 0,
		// overflow: 'hidden',
		border: "none", // Start by ensuring no full border
		borderBottom: bordered ? "1px solid #d9d9d9" : "none", // Apply only the bottom border
		// Explicitly set right border to none to remove vertical lines between labels
		borderRight: "none",
		borderTop: "none",
	};

	const baseLabelStyle: React.CSSProperties = {
		padding,
		fontWeight: layout === "horizontal" ? 600 : "normal",
		backgroundColor: bordered ? "#fafafa" : "transparent",
		textAlign: layout === "horizontal" ? "left" : "left",
		verticalAlign: "middle",
		color: "rgba(0, 0, 0, 0.85)",
		border: "none", // Start by ensuring no full border
		borderBottom: bordered ? "1px solid #d9d9d9" : "none", // Apply only the bottom border
		// Explicitly set right border to none to remove vertical lines between labels
		borderRight: "none",
		borderTop: "none",
		...styles?.label,
		...labelStyle,
	};

	const baseContentStyle: React.CSSProperties = {
		padding,
		backgroundColor: "#fff",
		// border: bordered ? '1px solid #1a2d83ff' : 'none',
		// borderRadius: bordered ? borderRadius : 0,
		border: "none", // Start by ensuring no full border
		borderBottom: bordered ? "1px solid #d9d9d9" : "none", // Apply only the bottom border
		// Explicitly set right border to none to remove vertical lines between labels
		borderRight: "none",
		borderTop: "none",
		color: "rgba(0, 0, 0, 0.85)",
		verticalAlign: "top",
		...styles?.content,
		...contentStyle,
	};

	const headerStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "20px",

		...styles?.header,
	};

	const titleStyle: React.CSSProperties = {
		fontSize: "16px",
		fontWeight: 600,
		color: "rgba(0, 0, 0, 0.85)",
		...styles?.title,
	};

	// ========================================================================
	// Render Items in Rows
	// ========================================================================
	const renderRows = () => {
		const rows: ReactElement[] = [];
		let currentRow: typeof items = [];
		let currentSpan = 0;

		items.forEach((item, index) => {
			const itemSpan = Math.min(item.span, columnCount);

			// Check if item fits in current row
			if (currentSpan + itemSpan > columnCount && currentRow.length > 0) {
				// Render current row and start new one
				rows.push(renderRow(currentRow, rows.length));
				currentRow = [item];
				currentSpan = itemSpan;
			}
			else {
				currentRow.push(item);
				currentSpan += itemSpan;
			}

			// If this is the last item or row is full, render it
			if (index === items.length - 1 || currentSpan >= columnCount) {
				rows.push(renderRow(currentRow, rows.length));
				currentRow = [];
				currentSpan = 0;
			}
		});

		return rows;
	};

	const renderRow = (rowItems: typeof items, rowIndex: number) => {
		if (layout === "vertical") {
			return renderVerticalRow(rowItems, rowIndex);
		}
		return renderHorizontalRow(rowItems, rowIndex);
	};

	const renderHorizontalRow = (rowItems: typeof items, rowIndex: number) => {
		const cells: ReactElement[] = [];

		rowItems.forEach((item, cellIndex) => {
			const itemSpan = Math.min(item.span, columnCount);
			const colspan = itemSpan * 2; // Each item takes label + content cells

			const mergedLabelStyle = {
				...baseLabelStyle,
				...item.labelStyle,
			};

			const mergedContentStyle = {
				...baseContentStyle,
				...item.contentStyle,
			};

			// Add colon to label if enabled
			const labelText = item.label && colon && layout === "horizontal"
				? `${item.label}:`
				: item.label;

			cells.push(
				<td
					key={`label-${rowIndex}-${cellIndex}`}
					style={mergedLabelStyle}
				>
					{labelText}
				</td>,
			);

			cells.push(
				<td
					key={`content-${rowIndex}-${cellIndex}`}
					style={mergedContentStyle}
					colSpan={itemSpan > 1 ? (itemSpan * 2) - 1 : 1}
				>
					{item.content}
				</td>,
			);
		});

		// Fill remaining cells if row is not complete
		const totalCells = rowItems.reduce((sum, item) => sum + Math.min(item.span, columnCount) * 2, 0);
		const remainingCells = columnCount * 2 - totalCells;

		if (remainingCells > 0 && bordered) {
			cells.push(
				<td
					key={`empty-${rowIndex}`}
					colSpan={remainingCells}
					style={baseContentStyle}
				/>,
			);
		}
		// if (remainingCells > 0 && bordered) {
		// 	cells.push(
		// 		<td
		// 			key={`empty-${rowIndex}`}
		// 			colSpan={remainingCells}
		// 			style={baseContentStyle} // <--- This applies the border
		// 		/>
		// 	);
		// }
		return <tr key={`row-${rowIndex}`}>{cells}</tr>;
	};

	const renderVerticalRow = (rowItems: typeof items, rowIndex: number) => {
		const labelCells: ReactElement[] = [];
		const contentCells: ReactElement[] = [];

		rowItems.forEach((item, cellIndex) => {
			const itemSpan = Math.min(item.span, columnCount);

			const mergedLabelStyle = {
				...baseLabelStyle,
				...item.labelStyle,
			};

			const mergedContentStyle = {
				...baseContentStyle,
				...item.contentStyle,
			};

			labelCells.push(
				<th
					key={`label-${rowIndex}-${cellIndex}`}
					style={mergedLabelStyle}
					colSpan={itemSpan}
				>
					{item.label}
				</th>,
			);

			contentCells.push(
				<td
					key={`content-${rowIndex}-${cellIndex}`}
					style={mergedContentStyle}
					colSpan={itemSpan}
				>
					{item.content}
				</td>,
			);
		});

		return (
			<React.Fragment key={`row-group-${rowIndex}`}>
				<tr key={`labels-${rowIndex}`}>{labelCells}</tr>
				<tr key={`contents-${rowIndex}`}>{contentCells}</tr>
			</React.Fragment>
		);
	};

	// ========================================================================
	// Render
	// ========================================================================
	return (
		<div className={`${rootClassName || ""} ${className || ""}`} style={containerStyle}>
			{/* Header Section */}
			{(title || extra) && (
				<div style={headerStyle}>
					{title && <div style={titleStyle}>{title}</div>}
					{extra && <div style={styles?.extra}>{extra}</div>}
				</div>
			)}

			{/* Descriptions Table */}
			<table style={tableStyle}>
				<tbody>
					{renderRows()}
				</tbody>
			</table>
		</div>
	);
};

// Default export for convenience
export default SheetLayout;
