import type { MenuProps } from "antd";

import type { MenuItemType } from "./types";
// import { useDeviceType, usePreferences } from "#src/app/hooks";
import { removeTrailingSlash } from "#src/app/router/utils/remove-trailing-slash";
import { useAccessStore } from "#src/app/store";
import { cn } from "#src/app/utils";
import { Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useMatches } from "react-router";
import { useDeviceType } from "../../hooks/use-device-type";
import { usePreferences } from "../../hooks/use-preferences";
import { useStyles } from "./style";
import { getParentKeys } from "./utils";

interface LayoutMenuProps {
	mode?: MenuProps["mode"]
	/**
	 * Control whether to automatically expand the menu item corresponding to the current route
	 *
	 * Why?
	 * Note: When the menu mode is top navigation mode and menu mode is horizontal, when first entering the page, the menu should not automatically expand. You can specify autoExpandCurrentMenu as false to disable the automatic expansion function
	 * @see https://github.com/user-attachments/assets/705ae01d-db7f-4f42-b4dd-66adba0dd68f
	 */
	autoExpandCurrentMenu?: boolean
	menus?: MenuItemType[]
	handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void
}

const emptyArray: MenuItemType[] = [];
export default function LayoutMenu({
	mode = "inline",
	autoExpandCurrentMenu,
	handleMenuSelect,
	menus = emptyArray,
}: LayoutMenuProps) {
	const classes = useStyles();
	const matches = useMatches();
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const { sidebarCollapsed, sidebarTheme, isDark, accordion } = usePreferences();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const { isMobile } = useDeviceType();

	const menuParentKeys = useMemo(() => {
		return getParentKeys(wholeMenus);
	}, [wholeMenus]);

	const getSelectedKeys = useMemo(
		() => {
			// First, try to find a route that specifies currentActiveMenu (highest priority)
			const currentActiveMatch = matches.findLast(routeItem =>
				routeItem.handle?.currentActiveMenu,
			);

			// If found, return the currentActiveMenu path with its parent keys
			if (currentActiveMatch?.handle?.currentActiveMenu) {
				const activeMenuPath = removeTrailingSlash(currentActiveMatch.handle.currentActiveMenu);
				const parentKeys = menuParentKeys[activeMenuPath] || [];
				return [...parentKeys, activeMenuPath];
			}

			// Fallback: Find the last visible route (not hidden in menu)
			const latestVisibleMatch = matches.findLast(routeItem =>
				routeItem.handle?.hideInMenu !== true,
			);

			// If found, return the route ID path with its parent keys
			if (latestVisibleMatch?.id) {
				const routePath = removeTrailingSlash(latestVisibleMatch.id);
				const parentKeys = menuParentKeys[routePath] || [];
				return [...parentKeys, routePath];
			}

			// Default return empty array if no matches found
			return [];
		},
		[matches, menuParentKeys],
	);

	const menuInlineCollapsedProp = useMemo(() => {
		/* inlineCollapsed is only available in inline mode */
		if (mode === "inline") {
			return { inlineCollapsed: isMobile ? false : sidebarCollapsed };
		}
		return {};
	}, [mode, isMobile, sidebarCollapsed]);

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		/**
		 * 1. Accordion mode, click menu item, automatically close other menus
		 * 2. Non-accordion mode and menu is collapsed, mouse hover menu automatically closes other menus
		 *
		 * Why not use the code in the antd menu example:
		 * @see https://ant.design/components/menu-cn#menu-demo-sider-current
		 * Reason: When multiple menus are opened in non-accordion mode, switching to accordion mode, clicking menu items will not automatically close other menus
		 */
		if (accordion || sidebarCollapsed) {
			// eslint-disable-next-line unicorn/prefer-includes
			const currentOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
			// open
			if (currentOpenKey !== undefined) {
				const parentKeys = menuParentKeys[currentOpenKey] || [];
				setOpenKeys([...parentKeys, currentOpenKey]);
			}
			else {
				// eslint-disable-next-line unicorn/prefer-includes
				const currentCloseKey = openKeys.find(key => keys.indexOf(key) === -1);
				// close
				if (currentCloseKey) {
					setOpenKeys(menuParentKeys[currentCloseKey]);
				}
			}
		}
		else {
			setOpenKeys(keys);
		}
	};

	const menuOpenProps = useMemo(() => {
		// If accordion mode is enabled, need to automatically expand the menu
		if (autoExpandCurrentMenu) {
			return {
				openKeys,
				onOpenChange: handleOpenChange,
			};
		}
		return {};
	}, [autoExpandCurrentMenu, openKeys, handleOpenChange]);

	/**
	 * When the side menu is expanded, automatically expand the activated menu
	 * When the side menu is collapsed, automatically close all activated menus
	 * @see https://github.com/user-attachments/assets/df2d7b63-acf4-4faa-bea6-7616b7e69621
	 */
	useEffect(() => {
		// Collapsed
		if (sidebarCollapsed) {
			setOpenKeys([]);
		}
		// Expanded
		else {
			// Accordion mode, only expand the currently activated menu
			if (accordion) {
				setOpenKeys(getSelectedKeys);
			}
			// Non-accordion mode, expand all activated menus
			else {
				setOpenKeys((prevOpenKeys) => {
					if (prevOpenKeys.length === 0) {
						return getSelectedKeys;
					}
					return prevOpenKeys;
				});
			}
		}
	}, [matches, sidebarCollapsed, getSelectedKeys]);

	return (
		<Menu
			/**
			 * min-w-0 flex-auto solves the issue where Menu does not responsively collapse as expected in Flex layout
			 * @see https://ant-design.antgroup.com/components/menu#why-menu-do-not-responsive-collapse-in-flex-layout
			 */
			className={cn(
				"!border-none min-w-0 flex-auto",
				{
					/**
					 * When the side menu is collapsed, add background color
					 */
					[classes.menuBackgroundColor]: sidebarCollapsed,
				},
			)}
			inlineIndent={16}
			{...menuInlineCollapsedProp}
			style={{ height: isMobile ? "100%" : "initial" }}
			mode={mode}
			theme={isDark ? "dark" : sidebarTheme}
			items={menus as MenuProps["items"]}
			{...menuOpenProps}
			selectedKeys={getSelectedKeys}
			/**
			 * Use onClick instead of onSelect event, because when child routes activate parent menu, clicking parent menu can still navigate normally.
			 * @see https://github.com/user-attachments/assets/cf67a973-f210-45e4-8278-08727ab1b8ce
			 */
			onClick={({ key }) => handleMenuSelect?.(key, mode)}
		/>
	);
}
