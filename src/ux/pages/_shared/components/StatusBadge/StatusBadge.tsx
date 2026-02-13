import type { TagProps } from "antd";
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	MinusCircleOutlined,
	QuestionCircleOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

/**
 * StatusBadge Component
 *
 * Provides consistent status displays across the application with predefined
 * color schemes and icons for common status types.
 *
 * @example
 * // Basic status badge
 * <StatusBadge status="active" />
 *
 * @example
 * // With custom label
 * <StatusBadge status="success" label="Completed" />
 *
 * @example
 * // Custom status with color
 * <StatusBadge label="Draft" color="blue" />
 */

export type StatusType
	= | "success"
	  | "error"
	  | "warning"
	  | "info"
	  | "processing"
	  | "pending"
	  | "active"
	  | "inactive"
	  | "completed"
	  | "failed"
	  | "cancelled"
	  | "draft"
	  | "unknown";

export interface StatusBadgeProps extends Omit<TagProps, "color" | "icon"> {
	/**
	 * Predefined status type (determines color and icon)
	 */
	status?: StatusType

	/**
	 * Custom label (overrides default status label)
	 */
	label?: string

	/**
	 * Show icon
	 * @default true
	 */
	showIcon?: boolean

	/**
	 * Custom icon (overrides status icon)
	 */
	icon?: React.ReactNode

	/**
	 * Custom color (overrides status color)
	 */
	color?: string

	/**
	 * Make badge clickable
	 */
	onClick?: () => void

	/**
	 * Size variant
	 * @default 'default'
	 */
	size?: "small" | "default" | "large"
}

const statusConfig: Record<
	StatusType,
	{
		color: string
		icon: React.ReactNode
		label: string
	}
> = {
	success: {
		color: "success",
		icon: <CheckCircleOutlined />,
		label: "Success",
	},
	error: {
		color: "error",
		icon: <CloseCircleOutlined />,
		label: "Error",
	},
	warning: {
		color: "warning",
		icon: <ExclamationCircleOutlined />,
		label: "Warning",
	},
	info: {
		color: "processing",
		icon: <ExclamationCircleOutlined />,
		label: "Info",
	},
	processing: {
		color: "processing",
		icon: <SyncOutlined spin />,
		label: "Processing",
	},
	pending: {
		color: "default",
		icon: <ClockCircleOutlined />,
		label: "Pending",
	},
	active: {
		color: "success",
		icon: <CheckCircleOutlined />,
		label: "Active",
	},
	inactive: {
		color: "default",
		icon: <MinusCircleOutlined />,
		label: "Inactive",
	},
	completed: {
		color: "success",
		icon: <CheckCircleOutlined />,
		label: "Completed",
	},
	failed: {
		color: "error",
		icon: <CloseCircleOutlined />,
		label: "Failed",
	},
	cancelled: {
		color: "default",
		icon: <CloseCircleOutlined />,
		label: "Cancelled",
	},
	draft: {
		color: "default",
		icon: <ClockCircleOutlined />,
		label: "Draft",
	},
	unknown: {
		color: "default",
		icon: <QuestionCircleOutlined />,
		label: "Unknown",
	},
};

const sizeStyles = {
	small: {
		fontSize: "12px",
		padding: "0 6px",
		lineHeight: "18px",
	},
	default: {
		fontSize: "14px",
		padding: "2px 8px",
		lineHeight: "20px",
	},
	large: {
		fontSize: "16px",
		padding: "4px 12px",
		lineHeight: "24px",
	},
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
	status = "unknown",
	label,
	showIcon = true,
	icon,
	color,
	onClick,
	size = "default",
	className = "",
	...tagProps
}) => {
	console.log("[FLOW:status-badge] [ACTION] Rendering StatusBadge", {
		status,
		hasLabel: !!label,
		showIcon,
		clickable: !!onClick,
	});

	const config = statusConfig[status];
	const displayLabel = label || config.label;
	const displayColor = color || config.color;
	const displayIcon = icon || (showIcon ? config.icon : null);
	const sizeStyle = sizeStyles[size];

	const handleClick = () => {
		if (onClick) {
			console.log("[FLOW:status-badge] [ACTION] Status badge clicked", { status, label: displayLabel });
			onClick();
		}
	};

	return (
		<Tag
			color={displayColor}
			icon={displayIcon}
			onClick={handleClick}
			className={`status-badge status-badge-${size} ${onClick ? "status-badge-clickable" : ""} ${className}`}
			style={{
				cursor: onClick ? "pointer" : "default",
				...sizeStyle,
				...tagProps.style,
			}}
			{...tagProps}
		>
			{displayLabel}
		</Tag>
	);
};

/**
 * SuccessBadge Component
 *
 * Convenience component for success status.
 *
 * @example
 * <SuccessBadge label="Approved" />
 */
export const SuccessBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="success" />;
};

/**
 * ErrorBadge Component
 *
 * Convenience component for error status.
 *
 * @example
 * <ErrorBadge label="Failed" />
 */
export const ErrorBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="error" />;
};

/**
 * WarningBadge Component
 *
 * Convenience component for warning status.
 *
 * @example
 * <WarningBadge label="Needs Review" />
 */
export const WarningBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="warning" />;
};

/**
 * ProcessingBadge Component
 *
 * Convenience component for processing status with spinning icon.
 *
 * @example
 * <ProcessingBadge label="Syncing..." />
 */
export const ProcessingBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="processing" />;
};

/**
 * PendingBadge Component
 *
 * Convenience component for pending status.
 *
 * @example
 * <PendingBadge label="Awaiting Approval" />
 */
export const PendingBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="pending" />;
};

/**
 * ActiveBadge Component
 *
 * Convenience component for active status.
 *
 * @example
 * <ActiveBadge />
 */
export const ActiveBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="active" />;
};

/**
 * InactiveBadge Component
 *
 * Convenience component for inactive status.
 *
 * @example
 * <InactiveBadge />
 */
export const InactiveBadge: React.FC<Omit<StatusBadgeProps, "status">> = (props) => {
	return <StatusBadge {...props} status="inactive" />;
};
