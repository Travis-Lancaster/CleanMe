import type { MenuProps } from "antd";
import { useTabsStore } from "#src/ui-scaffold/store";

import {
	CloseOutlined,
	RedoOutlined,
	SwapOutlined,
	VerticalAlignBottomOutlined,
	VerticalAlignMiddleOutlined,
	VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { useKeepAliveContext } from "keepalive-for-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const homePath = import.meta.env.VITE_BASE_HOME_PATH;
/**
 * Tab operation key value object
 * @readonly
 * @enum {string}
 * @property {string} REFRESH - Reload current tab
 * @property {string} CLOSE - Close current tab
 * @property {string} CLOSE_RIGHT - Close right tabs
 * @property {string} CLOSE_LEFT - Close left tabs
 * @property {string} CLOSE_OTHERS - Close other tabs
 * @property {string} CLOSE_ALL - Close all tabs
 */
export const TabActionKeys = {
	REFRESH: "refresh",
	CLOSE: "close",
	CLOSE_RIGHT: "closeRight",
	CLOSE_LEFT: "closeLeft",
	CLOSE_OTHERS: "closeOthers",
	CLOSE_ALL: "closeAll",
} as const;

export type TabActionKey = typeof TabActionKeys[keyof typeof TabActionKeys];

/**
 * Custom hook for handling tab dropdown menu
 * @returns {[Function, Function]} Returns a tuple containing menu item generation function and menu click handler function
 */
export function useDropdownMenu() {
	const { t } = useTranslation();
	const {
		openTabs,
		activeKey,
		removeTab,
		closeLeftTabs,
		closeRightTabs,
		closeOtherTabs,
		closeAllTabs,
		setIsRefresh,
	} = useTabsStore();
	const { refresh } = useKeepAliveContext();
	/**
	 * Generate menu items
	 * @param {string} tabKey - Current tab key
	 * @returns {MenuProps["items"]} Menu item configuration
	 */
	const items = useCallback((tabKey: string): MenuProps["items"] => {
		const isOnlyTab = openTabs.size === 2 && openTabs.has(homePath);
		const isLastTab = Array.from(openTabs.keys()).pop() === tabKey;
		return [
			{
				key: TabActionKeys.REFRESH,
				icon: <RedoOutlined rotate={270} />,
				label: t("preferences.tabbar.contextMenu.refresh"),
				disabled: activeKey !== tabKey,
			},
			{
				key: TabActionKeys.CLOSE,
				icon: <CloseOutlined />,
				label: t("preferences.tabbar.contextMenu.close"),
				disabled: tabKey === homePath,
			},
			{ type: "divider" },
			{
				key: TabActionKeys.CLOSE_LEFT,
				icon: <VerticalAlignBottomOutlined rotate={90} />,
				label: t("preferences.tabbar.contextMenu.closeLeft"),
				disabled: tabKey === homePath || isOnlyTab,
			},
			{
				key: TabActionKeys.CLOSE_RIGHT,
				icon: <VerticalAlignTopOutlined rotate={90} />,
				label: t("preferences.tabbar.contextMenu.closeRight"),
				disabled: tabKey === homePath || isOnlyTab || isLastTab,
			},
			{ type: "divider" },
			{
				key: TabActionKeys.CLOSE_OTHERS,
				icon: <VerticalAlignMiddleOutlined rotate={90} />,
				label: t("preferences.tabbar.contextMenu.closeOthers"),
				disabled: tabKey === homePath || isOnlyTab,
			},
			{
				key: TabActionKeys.CLOSE_ALL,
				icon: <SwapOutlined />,
				label: t("preferences.tabbar.contextMenu.closeAll"),
				disabled: tabKey === homePath,
			},
		];
	}, [t, activeKey, homePath, openTabs]);

	/**
	 * Define menu operations and corresponding handler functions
	 */
	const actions = useMemo(() => ({
		[TabActionKeys.REFRESH]: (currentPath: string) => {
			// Refresh KeepAlive cached page
			refresh(currentPath);
			// Re-render page
			setIsRefresh(true);
		},
		[TabActionKeys.CLOSE]: removeTab,
		[TabActionKeys.CLOSE_RIGHT]: closeRightTabs,
		[TabActionKeys.CLOSE_LEFT]: closeLeftTabs,
		[TabActionKeys.CLOSE_OTHERS]: closeOtherTabs,
		[TabActionKeys.CLOSE_ALL]: closeAllTabs,
	}), [removeTab, closeRightTabs, closeLeftTabs, closeOtherTabs, closeAllTabs]);

	/**
	 * Handle menu click events
	 * @param {string} menuKey - Clicked menu item key
	 * @param {string} nodeKey - Current tab key
	 */
	const onClickMenu = useCallback((menuKey: string, nodeKey: string) => {
		const action = actions[menuKey as keyof typeof actions];
		if (action) {
			action(nodeKey);
		}
	}, [actions]);

	return [items, onClickMenu] as const;
}
