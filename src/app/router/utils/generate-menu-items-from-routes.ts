import type { MenuItemType } from "#src/app/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "#src/app/router/types";
import { menuIcons } from "#src/app/icons/menu-icons";
import { isString } from "#src/app/utils/is";
import { createElement } from "react";
import { Link } from "react-router";

/**
 * Generate menu item array from route list
 *
 * @param routeList Route list, type is AppRouteRecordRaw array
 * @returns Returns menu item array, array element type is MenuItemType
 */
export function generateMenuItemsFromRoutes(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<MenuItemType[]>((acc, item) => {
		const label = item.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const iconName = item?.handle?.icon;

		const menuItem: MenuItemType = {
			key: item.path!,
			label: externalLink
				? createElement(
					Link,
					{
						// Prevent event bubbling to avoid triggering menu click events
						onClick: (e) => {
							e.stopPropagation();
						},
						to: externalLink,
						target: "_blank",
						rel: "noopener noreferrer",
					},
					label,
				)
				: (
					label
				),
		};
		if (iconName) {
			menuItem.icon = iconName;
			if (isString(iconName)) {
				if (menuIcons[iconName]) {
					menuItem.icon = createElement(menuIcons[iconName]);
				}
				else {
					console.warn(
						`menu-icon: icon "${iconName}" not found in src/icons/menu-icons.ts file`,
					);
				}
			}
		}
		if (Array.isArray(item.children) && item.children.length > 0) {
			// Filter out non-homepage routes that are not displayed in the menu
			const noIndexRoute = item.children.filter(route => !route.index && !route?.handle?.hideInMenu);
			if (noIndexRoute.length > 0) {
				menuItem.children = generateMenuItemsFromRoutes(noIndexRoute);
			}
		}
		if (item?.handle?.hideInMenu) {
			return acc;
		}
		return [...acc, menuItem];
	}, []);
}
