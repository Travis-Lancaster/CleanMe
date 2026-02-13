/**
 * Unified management of permission constants to avoid hardcoding strings throughout the project for easy maintenance.
 */

/**
 * Button permission prefix
 */
export const permissionPrefix = "permission:button";

/**
 * Common button permissions:
 * - get: Get
 * - update: Update
 * - delete: Delete
 * - add: Add
 */
export const accessControlCodes = {
	get: `${permissionPrefix}:get`,
	update: `${permissionPrefix}:update`,
	delete: `${permissionPrefix}:delete`,
	add: `${permissionPrefix}:add`,
};

export const AccessControlRoles = {
	admin: "admin",
	common: "common",
	// user: "user",
};
