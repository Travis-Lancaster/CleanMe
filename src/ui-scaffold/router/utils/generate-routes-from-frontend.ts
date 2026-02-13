import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";
import { filterTree } from "#src/ui-scaffold/utils/tree";

/**
 * Generate routes dynamically - frontend approach
 */
export function generateRoutesByFrontend(
	routes: AppRouteRecordRaw[],
	roles: string[],
) {
	// Filter route table based on role identifiers to determine if current user has specified permissions
	const finalRoutes = filterTree(routes, (route) => {
		return hasAuthority(route, roles);
	});

	return finalRoutes;
}

/**
 * Determine if route has permission to access
 * @param route
 * @param accesses
 */
function hasAuthority(route: AppRouteRecordRaw, accesses: string[]) {
	const authority = route.handle?.roles;
	if (!authority) {
		return true;
	}
	return accesses.some(value => authority.includes(value));
}
