import type { MenuProps } from "antd";
import { useCurrentRoute } from "#src/app/hooks";

import { removeTrailingSlash } from "#src/app/router/utils/remove-trailing-slash.js";
import { useAccessStore } from "#src/app/store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMatches, useNavigate } from "react-router";
import { useLayout } from "../hooks";
import { findDeepestFirstItem, findRootMenuByPath, translateMenus } from "./utils";

export function useMenu() {
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const { isMixedNav, isTwoColumnNav } = useLayout();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const translatedMenus = translateMenus(wholeMenus, t);

	const { pathname } = useCurrentRoute();
	const matches = useMatches();
	/**
	 * Whether to split menu items in mixed menu mode
	 */
	const shouldSplitMenuItems = useMemo(
		() => isMixedNav || isTwoColumnNav,
		[isMixedNav, isTwoColumnNav],
	);

	/**
	 * Top-level menu key for sidebar navigation in mixed navigation mode
	 */
	const sideNavMenuKeyInSplitMode = useMemo(() => {
		if (!shouldSplitMenuItems)
			return "";

		// Try to find active menu from currentActiveMenu first
		const activeMenuPath = matches.findLast(routeItem =>
			routeItem.handle?.currentActiveMenu,
		)?.handle?.currentActiveMenu;

		// Fallback to current pathname if no currentActiveMenu found
		const targetPath = activeMenuPath ? removeTrailingSlash(activeMenuPath) : removeTrailingSlash(pathname);

		const { rootMenuPath } = findRootMenuByPath(translatedMenus, targetPath);
		return rootMenuPath ?? "";
	}, [shouldSplitMenuItems, pathname, matches]);

	/**
	 * Split menu items for mixed menu mode
	 */
	const splitSideNavItems = useMemo(
		() => {
			const foundMenu = translatedMenus.find(item => item?.key === sideNavMenuKeyInSplitMode);
			if (!foundMenu) {
				return [];
			}
			return foundMenu?.children ?? [foundMenu];
		},
		[sideNavMenuKeyInSplitMode, translatedMenus],
	);

	/**
	 * Top navigation menu items
	 */
	const topNavItems = useMemo(() => {
		if (!shouldSplitMenuItems) {
			return translatedMenus;
		}
		return translatedMenus.map((item) => {
			return {
				...item,
				/**
				 * Children set to empty array cannot trigger menu's onSelect event
				 */
				children: undefined,
			};
		});
	}, [shouldSplitMenuItems, translatedMenus]);

	/**
	 * Sidebar menu items
	 */
	const sideNavItems = useMemo(() => {
		return shouldSplitMenuItems ? splitSideNavItems : translatedMenus;
	}, [shouldSplitMenuItems, splitSideNavItems, translatedMenus]);

	/**
	 * Menu click event handler
	 */
	const handleMenuSelect = (key: string, mode: MenuProps["mode"]) => {
		if (key === removeTrailingSlash(pathname)) {
			return;
		}
		/**
		 * 1. Non-mixed navigation mode 2. Sidebar navigation in mixed navigation mode
		 */
		if (!shouldSplitMenuItems || mode !== "horizontal") {
			// eslint-disable-next-line regexp/no-unused-capturing-group
			if (/http(s)?:/.test(key)) {
				window.open(key);
			}
			else {
				navigate(key);
			}
		}
		else {
			/**
			 * Top navigation in mixed navigation mode
			 */
			const rootMenu = translatedMenus.find(item => item?.key === key);
			const targetMenu = findDeepestFirstItem(rootMenu?.children ?? []);
			/**
			 * Clicking top navigation defaults to navigate to the first child item under the menu
			 */
			if (!targetMenu) {
				navigate(key);
			}
			else {
				navigate(targetMenu.key);
			}
		}
	};

	return {
		handleMenuSelect,
		sideNavMenuKeyInSplitMode,
		topNavItems,
		sideNavItems,
	};
}
