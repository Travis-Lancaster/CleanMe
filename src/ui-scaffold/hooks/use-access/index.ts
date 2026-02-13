import { useUserStore } from "#src/ui-scaffold/store/user";
import { isString } from "#src/ui-scaffold/utils/is";

import { useMatches } from "react-router";
import { accessControlCodes, AccessControlRoles } from "./constants";

export * from "./constants";

/**
 * Access judgment
 */
export function useAccess() {
	const matches = useMatches();
	const { roles: userRoles } = useUserStore();
	const currentRoute = matches[matches.length - 1];

	/**
	 * Determine whether the current route has a specified permission based on permission codes
	 * @param permission All lowercase permission name or permission name array, for example `["add", "delete"]`.
	 * @returns boolean Whether has the specified permission
	 */
	const hasAccessByCodes = (permission?: string | Array<string>) => {
		if (!permission)
			return false;
		/** Get all custom `code` values at the button level from the `handle` field of the current route */
		const metaAuth = currentRoute?.handle?.permissions;
		if (!metaAuth) {
			return false;
		}
		permission = isString(permission) ? [permission] : permission;
		permission = permission.map(item => item.toLowerCase());
		if (import.meta.env.DEV) {
			// Validate if the permission code is valid, invalid permission codes will print warning information
			for (const code of permission) {
				if (!Object.values(accessControlCodes).includes(code)) {
					console.warn(`[hasAccessByCodes]: '${code}' is not a valid permission code`);
				}
			}
		}
		const isAuth = metaAuth.some(item => permission.includes(item.toLowerCase()));
		return isAuth;
	};

	/**
	 * Determine whether the current user has a specified permission based on roles
	 * @param roles All lowercase permission name or permission name array, for example `["admin", "super", "user"]`.
	 * @returns boolean Whether has the specified permission
	 */
	const hasAccessByRoles = (roles?: string | Array<string>) => {
		if (!roles || !userRoles) {
			return false;
		}
		roles = isString(roles) ? [roles] : roles;
		roles = roles.map(item => item.toLowerCase());
		if (import.meta.env.DEV) {
			// Validate if the role is valid, invalid roles will print warning information
			for (const roleItem of roles) {
				if (!Object.values(AccessControlRoles).includes(roleItem)) {
					console.warn(`[hasAccessByRoles]: '${roleItem}' is not a valid role`);
				}
			}
		}
		const isAuth = userRoles.some(item => roles.includes(item.toLowerCase()));
		return isAuth;
	};

	return { hasAccessByCodes, hasAccessByRoles };
}
