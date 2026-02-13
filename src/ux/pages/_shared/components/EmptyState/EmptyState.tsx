import type { EmptyProps } from "antd";
import {
	DatabaseOutlined,
	FilterOutlined,
	FolderOpenOutlined,
	InboxOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Empty } from "antd";
import React from "react";

/**
 * EmptyState Component
 *
 * Provides consistent empty state displays across the application with contextual
 * messages, icons, and actions.
 *
 * @example
 * // Basic empty state
 * <EmptyState />
 *
 * @example
 * // With custom message and action
 * <EmptyState
 *   title="No drill programs found"
 *   description="Get started by creating your first drill program"
 *   actionLabel="Create Program"
 *   onAction={handleCreate}
 * />
 *
 * @example
 * // Empty search results
 * <EmptyState
 *   variant="search"
 *   title="No results found"
 *   description="Try adjusting your search or filters"
 *   actionLabel="Clear Filters"
 *   onAction={handleClearFilters}
 * />
 */

export interface EmptyStateProps extends Omit<EmptyProps, "image"> {
	/**
	 * Predefined variant for common empty states
	 * @default 'default'
	 */
	variant?: "default" | "search" | "filter" | "data" | "folder"

	/**
	 * Title text
	 */
	title?: string

	/**
	 * Description text (can be string or React node)
	 */
	description?: React.ReactNode

	/**
	 * Custom icon (overrides variant icon)
	 */
	icon?: React.ReactNode

	/**
	 * Icon size in pixels
	 * @default 64
	 */
	iconSize?: number

	/**
	 * Show action button
	 * @default false
	 */
	showAction?: boolean

	/**
	 * Action button label
	 */
	actionLabel?: string

	/**
	 * Action button click handler
	 */
	onAction?: () => void

	/**
	 * Action button type
	 * @default 'primary'
	 */
	actionType?: "primary" | "default" | "dashed" | "link" | "text"

	/**
	 * Show secondary action button
	 * @default false
	 */
	showSecondaryAction?: boolean

	/**
	 * Secondary action button label
	 */
	secondaryActionLabel?: string

	/**
	 * Secondary action button click handler
	 */
	onSecondaryAction?: () => void

	/**
	 * Minimum height for the empty state container
	 * @default '300px'
	 */
	minHeight?: string | number

	/**
	 * Custom className
	 */
	className?: string
}

const variantConfig = {
	default: {
		icon: InboxOutlined,
		title: "No data",
		description: "There is no data to display",
	},
	search: {
		icon: SearchOutlined,
		title: "No results found",
		description: "Try adjusting your search query",
	},
	filter: {
		icon: FilterOutlined,
		title: "No matching results",
		description: "Try adjusting your filters",
	},
	data: {
		icon: DatabaseOutlined,
		title: "No data available",
		description: "Data will appear here once available",
	},
	folder: {
		icon: FolderOpenOutlined,
		title: "This folder is empty",
		description: "Add items to get started",
	},
};

export const EmptyState: React.FC<EmptyStateProps> = ({
	variant = "default",
	title,
	description,
	icon,
	iconSize = 64,
	showAction = false,
	actionLabel,
	onAction,
	actionType = "primary",
	showSecondaryAction = false,
	secondaryActionLabel,
	onSecondaryAction,
	minHeight = "300px",
	className = "",
	...emptyProps
}) => {
	console.log("[FLOW:empty-state] [ACTION] Rendering EmptyState", {
		variant,
		hasTitle: !!title,
		hasAction: showAction,
		hasSecondaryAction: showSecondaryAction,
	});

	const config = variantConfig[variant];
	const IconComponent = config.icon;
	const displayTitle = title || config.title;
	const displayDescription = description || config.description;

	// Custom icon or variant icon
	const emptyImage = icon || (
		<IconComponent
			style={{
				fontSize: iconSize,
				color: "#bfbfbf",
			}}
		/>
	);

	// Build description with actions
	const emptyDescription = (
		<div style={{ textAlign: "center" }}>
			{displayDescription && (
				<div style={{ marginBottom: showAction || showSecondaryAction ? 16 : 0 }}>
					{displayDescription}
				</div>
			)}

			{(showAction || showSecondaryAction) && (
				<div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
					{showAction && actionLabel && (
						<Button
							type={actionType}
							onClick={() => {
								console.log("[FLOW:empty-state] [ACTION] Primary action clicked");
								onAction?.();
							}}
						>
							{actionLabel}
						</Button>
					)}

					{showSecondaryAction && secondaryActionLabel && (
						<Button
							type="default"
							onClick={() => {
								console.log("[FLOW:empty-state] [ACTION] Secondary action clicked");
								onSecondaryAction?.();
							}}
						>
							{secondaryActionLabel}
						</Button>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div
			className={`empty-state-container ${className}`}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
				width: "100%",
			}}
		>
			<Empty
				image={emptyImage}
				description={emptyDescription}
				{...emptyProps}
			>
				{/* Slot for custom content */}
				{emptyProps.children}
			</Empty>
		</div>
	);
};

/**
 * EmptySearchResults Component
 *
 * Convenience component for empty search results.
 * Equivalent to <EmptyState variant="search" />
 *
 * @example
 * <EmptySearchResults
 *   description="No drill programs match your search"
 *   actionLabel="Clear Search"
 *   onAction={handleClearSearch}
 * />
 */
export const EmptySearchResults: React.FC<Omit<EmptyStateProps, "variant">> = (props) => {
	return <EmptyState {...props} variant="search" />;
};

/**
 * EmptyFilterResults Component
 *
 * Convenience component for empty filter results.
 * Equivalent to <EmptyState variant="filter" />
 *
 * @example
 * <EmptyFilterResults
 *   description="No items match the selected filters"
 *   actionLabel="Clear Filters"
 *   onAction={handleClearFilters}
 * />
 */
export const EmptyFilterResults: React.FC<Omit<EmptyStateProps, "variant">> = (props) => {
	return <EmptyState {...props} variant="filter" />;
};

/**
 * EmptyDataState Component
 *
 * Convenience component for empty data states with creation action.
 * Equivalent to <EmptyState variant="data" showAction />
 *
 * @example
 * <EmptyDataState
 *   title="No drill programs yet"
 *   description="Create your first drill program to get started"
 *   actionLabel="Create Program"
 *   onAction={handleCreate}
 * />
 */
export const EmptyDataState: React.FC<Omit<EmptyStateProps, "variant" | "showAction">> = (props) => {
	return <EmptyState {...props} variant="data" showAction />;
};
