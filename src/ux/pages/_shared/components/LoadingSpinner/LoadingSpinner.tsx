import type { SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

/**
 * LoadingSpinner Component
 *
 * Provides consistent loading indicators across the application with multiple size variants
 * and customization options.
 *
 * @example
 * // Basic usage - centered spinner
 * <LoadingSpinner />
 *
 * @example
 * // Small inline spinner
 * <LoadingSpinner size="small" inline />
 *
 * @example
 * // Full page overlay
 * <LoadingSpinner size="large" overlay tip="Loading data..." />
 *
 * @example
 * // Custom message
 * <LoadingSpinner tip="Fetching drill programs..." />
 */

export interface LoadingSpinnerProps extends Omit<SpinProps, "size"> {
	/**
	 * Size of the spinner
	 * @default 'default'
	 */
	size?: "small" | "default" | "large"

	/**
	 * Display as inline element (no centering wrapper)
	 * @default false
	 */
	inline?: boolean

	/**
	 * Display as full-page overlay with backdrop
	 * @default false
	 */
	overlay?: boolean

	/**
	 * Message to display below the spinner
	 */
	tip?: string

	/**
	 * Minimum height for the container (only applies when not inline or overlay)
	 * @default '200px'
	 */
	minHeight?: string | number

	/**
	 * Custom className for the wrapper
	 */
	className?: string

	/**
	 * Show a custom icon instead of the default spinner
	 */
	customIcon?: React.ReactElement
}

const sizeMap = {
	small: 16,
	default: 24,
	large: 40,
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "default",
	inline = false,
	overlay = false,
	tip,
	minHeight = "200px",
	className = "",
	customIcon,
	...spinProps
}) => {
	console.log("[FLOW:loading-spinner] [ACTION] Rendering LoadingSpinner", {
		size,
		inline,
		overlay,
		hasTip: !!tip,
	});

	const iconSize = sizeMap[size];
	const spinnerIcon = customIcon || <LoadingOutlined style={{ fontSize: iconSize }} spin />;

	const spinner = (
		<Spin
			indicator={spinnerIcon}
			tip={tip}
			size={size as SpinProps["size"]}
			{...spinProps}
		/>
	);

	// Inline mode - no wrapper
	if (inline) {
		return spinner;
	}

	// Overlay mode - full page centered with backdrop
	if (overlay) {
		return (
			<div
				className={`loading-spinner-overlay ${className}`}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgba(255, 255, 255, 0.8)",
					zIndex: 9999,
				}}
			>
				{spinner}
			</div>
		);
	}

	// Default mode - centered in container
	return (
		<div
			className={`loading-spinner-container ${className}`}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
				width: "100%",
			}}
		>
			{spinner}
		</div>
	);
};

/**
 * LoadingOverlay Component
 *
 * Convenience component for full-page loading overlays.
 * Equivalent to <LoadingSpinner overlay size="large" />
 *
 * @example
 * <LoadingOverlay tip="Saving changes..." />
 */
export const LoadingOverlay: React.FC<Omit<LoadingSpinnerProps, "overlay" | "inline">> = (props) => {
	return <LoadingSpinner {...props} overlay size="large" />;
};

/**
 * InlineSpinner Component
 *
 * Convenience component for inline loading indicators.
 * Equivalent to <LoadingSpinner inline size="small" />
 *
 * @example
 * <Button>
 *   Saving <InlineSpinner />
 * </Button>
 */
export const InlineSpinner: React.FC<Omit<LoadingSpinnerProps, "overlay" | "inline">> = (props) => {
	return <LoadingSpinner {...props} inline size="small" />;
};
