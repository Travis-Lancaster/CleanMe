import type { MenuItemType } from "#src/app/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "#src/app/router/types";

import { rootRoute, router } from "#src/app/router";
import { ROOT_ROUTE_ID } from "#src/app/router/constants";
import { baseRoutes } from "#src/app/router/routes";
import { ascending } from "#src/app/router/utils/ascending";
import { flattenRoutes } from "#src/app/router/utils/flatten-routes";
import { generateMenuItemsFromRoutes } from "#src/app/router/utils/generate-menu-items-from-routes";
import { create } from "zustand";

interface AccessState {
	// Route menus
	wholeMenus: MenuItemType[]
	// Authorized React Router routes
	routeList: AppRouteRecordRaw[]
	// Flattened routes with route id as index key
	flatRouteList: Record<string, AppRouteRecordRaw>
	// Whether access is checked
	isAccessChecked: boolean
}

const initialState: AccessState = {
	wholeMenus: generateMenuItemsFromRoutes(baseRoutes),
	routeList: baseRoutes,
	flatRouteList: flattenRoutes(baseRoutes),
	isAccessChecked: false,
};

interface AccessAction {
	setAccessStore: (routes: AppRouteRecordRaw[]) => AccessState
	reset: () => void
};

export const useAccessStore = create<AccessState & AccessAction>(set => ({
	...initialState,

	setAccessStore: (routes) => {
		const newRoutes = ascending([...baseRoutes, ...routes]);
		/* Add new routes to root route */
		router.patchRoutes(ROOT_ROUTE_ID, routes);
		const flatRouteList = flattenRoutes(newRoutes);
		const wholeMenus = generateMenuItemsFromRoutes(newRoutes);
		const newState = {
			wholeMenus,
			routeList: newRoutes,
			flatRouteList,
			isAccessChecked: true,
		};
		set(() => newState);
		return newState;
	},

	reset: () => {
		/* Remove dynamic routes */
		router._internalSetRoutes(rootRoute);
		set(initialState);
	},
}));
