import type { AppRouteRecordRaw } from "#src/app/router/types";

/**
 * Add a unique ID to route object, replacing the automatically generated id. The ID defaults to the route path
 * {
 *   path: '/dashboard',
 * }
 *
 * After transformation
 *
 * {
 *   path: '/dashboard',
 *   id: '/dashboard',
 * }
 */
export function addRouteIdByPath(routes: AppRouteRecordRaw[], parentId = "") {
	return routes.map((route) => {
		// If it is an index route, id is parent path + "/"
		const newRoute = { ...route, id: route.index ? `${parentId}/` : route.path };

		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addRouteIdByPath(newRoute.children, route.path);
		}

		return newRoute;
	});
}
