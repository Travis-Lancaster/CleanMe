import type { MenuItemType } from "./types";

import { isString } from "#src/app/utils";
import { cloneElement, isValidElement } from "react";

/**
 * Convert all labels in the menu tree to internationalized text
 * @param menus Original menu array
 * @param t Translation function
 * @returns Converted menu array
 */
export function translateMenus(menus: MenuItemType[], t: (key: string) => string): MenuItemType[] {
	return menus.map((menu) => {
		let translatedLabel: React.ReactNode = menu.label;
		if (isValidElement(menu.label)) {
			translatedLabel = cloneElement(menu.label, {}, t(menu.label.props.children));
		}
		if (isString(menu.label)) {
			translatedLabel = t(menu.label);
		}
		const translatedMenu = {
			...menu,
			label: translatedLabel,
		};

		if (menu.children && menu.children.length > 0) {
			translatedMenu.children = translateMenus(menu.children, t);
		}

		return translatedMenu;
	});
}

/**
 * Find menu by path
 *
 * @param list Menu list
 * @param path Menu path
 * @returns Found menu object, returns null if not found
 */
export function findMenuByPath(
	list: MenuItemType[],
	path?: string,
): MenuItemType | null {
	for (const menu of list) {
		if (menu.key === path) {
			return menu;
		}
		const findMenu = menu.children && findMenuByPath(menu.children, path);
		if (findMenu) {
			return findMenu;
		}
	}
	return null;
}

/**
 * Find root menu by path
 *
 * @param menus Menu list
 * @param path Menu path, optional
 * @returns Object containing found menu, root menu and root menu path
 */
export function findRootMenuByPath(menus: MenuItemType[], path?: string): {
	findMenu: MenuItemType | null
	rootMenu: MenuItemType | null
	rootMenuPath: string | null
} {
	// Initialize return values
	let findMenu: MenuItemType | null = null;
	let rootMenu: MenuItemType | null = null;
	let rootMenuPath: string | null = null;

	// If no path provided, return default values
	if (!path) {
		return {
			findMenu: null,
			rootMenu: null,
			rootMenuPath: null,
		};
	}

	// Recursive search function
	const find = (
		list: MenuItemType[],
		targetPath: string,
		parents: MenuItemType[] = [],
	): boolean => {
		for (const menu of list) {
			// If target menu found
			if (menu.key === targetPath) {
				findMenu = menu;
				// If no parent menu, current menu is root menu
				if (parents.length === 0) {
					rootMenu = menu;
					rootMenuPath = menu.key;
				}
				else {
					// Get top-level parent menu
					rootMenu = parents[0];
					rootMenuPath = parents[0].key;
				}
				return true;
			}

			// If has child menus, continue recursive search
			if (menu.children && menu.children.length > 0) {
				// Add current menu to parent menu array
				const found = find(menu.children, targetPath, [...parents, menu]);
				if (found) {
					return true;
				}
			}
		}
		return false;
	};

	// Start search
	find(menus, path);

	return {
		findMenu,
		rootMenu,
		rootMenuPath,
	};
}

/**
 * Recursively find the first menu item at the deepest level under the first submenu path
 *
 * @param splitSideNavItems Menu list
 * @returns The first menu item found at the deepest level
 */
export function findDeepestFirstItem(splitSideNavItems: MenuItemType[]): MenuItemType | null {
	// If list is empty, return null
	if (!splitSideNavItems || splitSideNavItems.length === 0) {
		return null;
	}

	// Get first menu item
	const firstItem = splitSideNavItems[0];

	// If current item has child menus, continue recursive search
	if (firstItem.children && firstItem.children.length > 0) {
		return findDeepestFirstItem(firstItem.children);
	}

	// If no child menus, reached deepest level, return current item
	return firstItem;
}

/**
 * Get all keys in menu items and their corresponding levels
 *
 * @param menuItems1 Menu item array
 * @returns An object with menu item keys as keys and menu item levels as values
 */
export function getLevelKeys(menuItems1: MenuItemType[]) {
	const key: Record<string, number> = {};
	const func = (menuItems2: MenuItemType[], level = 1) => {
		menuItems2.forEach((item) => {
			if (item.key) {
				key[item.key] = level;
			}
			if (item.children) {
				func(item.children, level + 1);
			}
		});
	};
	func(menuItems1);
	return key;
};

/**
 * Get parent keys of menu items
 *
 * @param menuItems Menu item array
 * @returns Object recording parent key arrays corresponding to each menu item key
 */
export function getParentKeys(menuItems: MenuItemType[]): Record<string, string[]> {
	const parentKeyMap: Record<string, string[]> = {};

	function traverse(items: MenuItemType[], parentKeys: string[] = []) {
		for (const item of items) {
			// Record parent key array for current key
			parentKeyMap[item.key] = [...parentKeys];

			// If has child nodes, traverse recursively
			if (Array.isArray(item.children) && item.children.length) {
				traverse(item.children, [...parentKeys, item.key]);
			}
		}
	}

	traverse(menuItems);
	return parentKeyMap;
}
