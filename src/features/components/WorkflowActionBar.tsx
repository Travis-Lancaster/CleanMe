/**
 * WorkflowActionBar Component
 *
 * Smart action button bar with permission and state awareness.
 * Shows/hides buttons based on user permissions, section RowStatus, and section state.
 *
 * Features:
 * - Automatic button visibility based on permissions and RowStatus
 * - Loading states and tooltips
 * - Customizable button configuration
 * - Support for additional custom actions
 * - Works with both forms and grids
 *
 * @example
 * ```tsx
 * <WorkflowActionBar
 *   section={form.section}
 *   actions={form.actions}
 *   loading={isSubmitting}
 * />
 * ```
 */

import { Button, Space, Tooltip } from "antd";
import { DEFAULT_WORKFLOW_BUTTON_CONFIG, mergeWorkflowButtonConfig } from "./WorkflowActionBar.config";
import React, { useMemo } from "react";
import type { WorkflowActionBarProps, WorkflowActionButton } from "./WorkflowActionBar.types";

import { CheckCircleOutlined } from "@ant-design/icons";
import { RowStatus } from "#src/features/shared/domain/row-status";
import { useDrillHoleDataStore } from "../pages/drill-hole-data/store";
import { useDrillHolePermissions } from "../hooks/use-drillhole-permissions";

/**
 * WorkflowActionBar Component
 *
 * Renders appropriate action buttons based on user permissions and section state.
 * Automatically shows/hides and enables/disables buttons according to business rules.
 */
export const WorkflowActionBar: React.FC<WorkflowActionBarProps> = ({
	section,
	actions,
	loading = false,
	extraActions,
	size = "middle",
	direction = "horizontal",
	className,
	style,
	buttonConfig,
	showReadOnlyIndicator = true,
}) => {
	// Get user permissions
	const permissions = useDrillHolePermissions();

	// Subscribe to dirty state for cross-tab validation
	// Returns single boolean to prevent unnecessary re-renders from object creation
	const hasAnyDirtySection = useDrillHoleDataStore(
		state => {
			const sections = state.sections;
			return (
				sections.rigSetup?.isDirty ||
				sections.drillMethod?.isDirty ||
				sections.survey?.isDirty ||
				sections.collarCoordinate?.isDirty ||
				sections.geologyCombinedLog?.isDirty ||
				sections.shearLog?.isDirty ||
				sections.structureLog?.isDirty ||
				sections.coreRecoveryRunLog?.isDirty ||
				sections.fractureCountLog?.isDirty ||
				sections.magSusLog?.isDirty ||
				sections.rockMechanicLog?.isDirty ||
				sections.rockQualityDesignationLog?.isDirty ||
				sections.specificGravityPtLog?.isDirty ||
				sections.allSamples?.isDirty ||
				sections.dispatch?.isDirty ||
				false
			);
		}
	);

	// Merge default and custom button configurations
	// Include hasAnyDirtySection in dependency array so buttons update when cross-tab dirty state changes
	const config = useMemo(
		() => mergeWorkflowButtonConfig(DEFAULT_WORKFLOW_BUTTON_CONFIG, buttonConfig),
		[buttonConfig, hasAnyDirtySection],
	);

	// Build list of buttons to render based on visibility rules
	const buttons = useMemo((): WorkflowActionButton[] => {
		const result: WorkflowActionButton[] = [];

		// Helper to resolve dynamic values (can be value or function)
		const resolveValue = <T,>(value: T | ((section: any) => T), defaultValue: T): T => {
			if (typeof value === "function") {
				return (value as (section: any) => T)(section);
			}
			return value ?? defaultValue;
		};

		// Helper to get tooltip text
		const getTooltip = (tooltip: string | ((section: any, perms: any) => string) | undefined, defaultText: string): string => {
			if (!tooltip)
				return defaultText;
			return typeof tooltip === "function"
				? tooltip(section, permissions)
				: tooltip;
		};

		// ========================================================================
		// Save Button
		// ========================================================================
		if (actions.onSave && config.save.visible?.(section, permissions)) {
			result.push({
				key: "save",
				action: actions.onSave,
				config: {
					...config.save,
					label: resolveValue(config.save.label, "Save"),
					icon: resolveValue(config.save.icon, undefined),
					type: resolveValue(config.save.type, "default"),
					danger: resolveValue(config.save.danger, false),
				},
				enabled: (config.save.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.save.tooltip, "Save changes"),
			});
		}

		// ========================================================================
		// Submit Button
		// ========================================================================
		if (actions.onSubmit && config.submit.visible?.(section, permissions)) {
			result.push({
				key: "submit",
				action: actions.onSubmit,
				config: {
					...config.submit,
					label: resolveValue(config.submit.label, "Submit"),
					icon: resolveValue(config.submit.icon, undefined),
					type: resolveValue(config.submit.type, "primary"),
					danger: resolveValue(config.submit.danger, false),
				},
				enabled: (config.submit.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.submit.tooltip, "Submit for review"),
			});
		}

		// ========================================================================
		// Review Button
		// ========================================================================
		if (actions.onReview && config.review.visible?.(section, permissions)) {
			result.push({
				key: "review",
				action: actions.onReview,
				config: {
					...config.review,
					label: resolveValue(config.review.label, "Review"),
					icon: resolveValue(config.review.icon, undefined),
					type: resolveValue(config.review.type, "primary"),
					danger: resolveValue(config.review.danger, false),
				},
				enabled: (config.review.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.review.tooltip, "Mark as reviewed"),
			});
		}

		// ========================================================================
		// Approve Button
		// ========================================================================
		if (actions.onApprove && config.approve.visible?.(section, permissions)) {
			result.push({
				key: "approve",
				action: actions.onApprove,
				config: {
					...config.approve,
					label: resolveValue(config.approve.label, "Approve"),
					icon: resolveValue(config.approve.icon, undefined),
					type: resolveValue(config.approve.type, "primary"),
					danger: resolveValue(config.approve.danger, false),
				},
				enabled: (config.approve.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.approve.tooltip, "Final approval"),
			});
		}

		// ========================================================================
		// Reject Button
		// ========================================================================
		if (actions.onReject && config.reject.visible?.(section, permissions)) {
			result.push({
				key: "reject",
				action: actions.onReject,
				config: {
					...config.reject,
					label: resolveValue(config.reject.label, "Reject"),
					icon: resolveValue(config.reject.icon, undefined),
					type: resolveValue(config.reject.type, "default"),
					danger: resolveValue(config.reject.danger, true),
				},
				enabled: (config.reject.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.reject.tooltip, "Return to Draft"),
			});
		}

		// ========================================================================
		// Exclude/Include Button (Dynamic Toggle)
		// ========================================================================
		if (actions.onExclude && config.exclude.visible?.(section, permissions)) {
			result.push({
				key: "exclude",
				action: actions.onExclude,
				config: {
					...config.exclude,
					label: resolveValue(config.exclude.label, "Exclude"),
					icon: resolveValue(config.exclude.icon, undefined),
					type: resolveValue(config.exclude.type, "default"),
					danger: resolveValue(config.exclude.danger, true),
				},
				enabled: (config.exclude.enabled?.(section, permissions) ?? true) && !loading,
				tooltip: getTooltip(config.exclude.tooltip, "Exclude from reports"),
			});
		}

		return result;
	}, [section, permissions, actions, config, loading, hasAnyDirtySection]);

	// Log button state for debugging
	console.log("🔘 WorkflowActionBar render:", {
		sectionKey: section.sectionKey,
		rowStatus: section.rowStatus,
		isDirty: section.isDirty,
		hasAnyDirtySection,
		buttonCount: buttons.length,
		loading,
	});

	return (
		<Space
			direction={direction}
			size="small"
			className={className}
			style={style}
		>
			{/* Render action buttons */}
			{buttons.map(btn => (
				<Tooltip key={btn.key} title={btn.tooltip}>
					<Button
						type={btn.config.type}
						icon={btn.config.icon}
						danger={btn.config.danger}
						size={size}
						disabled={!btn.enabled}
						loading={loading}
						onClick={() => {
							console.log("🎯 [WorkflowActionBar] Button clicked:", {
								key: btn.key,
								sectionKey: section.sectionKey,
								enabled: btn.enabled,
								hasAction: !!btn.action,
							});
							btn.action();
							console.log(`✅ [WorkflowActionBar] Action function called for ${btn.key}`);
						}}
					>
						{btn.config.label}
					</Button>
				</Tooltip>
			))}

			{/* Extra custom actions */}
			{extraActions}

			{/* Read-only indicator for Approved sections with no available actions */}
			{showReadOnlyIndicator
				&& section.rowStatus === RowStatus.Approved
				&& buttons.length === 0 && (
					<Tooltip title="This section has been approved and is read-only">
						<Button
							type="default"
							icon={<CheckCircleOutlined />}
							disabled
							size={size}
						>
							Approved
						</Button>
					</Tooltip>
				)}
		</Space>
	);
};

export { DEFAULT_WORKFLOW_BUTTON_CONFIG, mergeWorkflowButtonConfig } from "./WorkflowActionBar.config";

/**
 * Re-export types for convenience
 */
export type {
	WorkflowActionBarProps,
	WorkflowActionButton,
	WorkflowActionButtonConfig,
	WorkflowButtonItemConfig,
} from "./WorkflowActionBar.types";

export default WorkflowActionBar;
