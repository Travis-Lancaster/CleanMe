import type { AppRouteRecordRaw, RouteFileModule } from "#src/app/router/types";

import { loginPath } from "#src/app/router/extra-info";
import { ascending } from "#src/app/router/utils/ascending";
import { mergeRouteModules } from "#src/app/router/utils/merge-route-modules";
import { traverseTreeValues } from "#src/app/utils/tree";
import { coreRoutes } from "./core";

export const externalRouteFiles: RouteFileModule = import.meta.glob("./external/**/*.ts", { eager: true });

export const staticRouteFiles: RouteFileModule = import.meta.glob("./static/**/*.ts", { eager: true });

/**
 * Backend dynamic route files
 */
export const dynamicRouteFiles: RouteFileModule = import.meta.glob("./modules/**/*.ts", { eager: true });

/**
 * External routes 1. No permission verification, 2. Will not trigger requests, such as user information interface
 * @example "privacy-policy", "terms-of-service" etc.
 */
export const externalRoutes: AppRouteRecordRaw[] = mergeRouteModules(externalRouteFiles);

/** Dynamic routes */
export const dynamicRoutes: AppRouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** Static routes */
export const staticRoutes: AppRouteRecordRaw[] = mergeRouteModules(staticRouteFiles);

/**
 * Basic route list, consisting of core routes and external routes, will always exist in the system
 */
const baseRoutes = ascending([
	...coreRoutes,
	...externalRoutes,
]);

/** Access route list, including dynamic routes and static routes */
const accessRoutes = [
	...dynamicRoutes,
	...staticRoutes,
];

/**
 * Route whitelist 1. No permission verification, 2. Will not trigger requests, such as user information interface
 * @example "privacy-policy", "terms-of-service" etc.
 */
const whiteRouteNames = [
	loginPath,
	...traverseTreeValues(externalRoutes, route => route.path),
];

export {
	accessRoutes,
	baseRoutes,
	whiteRouteNames,
};
