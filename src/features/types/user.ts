/**
 * User Role and Permission Types
 *
 * Defines role-based access control for the application.
 * Permissions are calculated from user roles using a pure function approach.
 */

// ============================================================================
// User Roles
// ============================================================================

/**
 * Available user roles in the system.
 *
 * - geologist: Standard geologist with basic access
 * - loggingGeologist: Geologist with access to restricted logging sections
 * - DBA: Database administrator with full data access and management
 * - Manager: Manager with approval and review capabilities
 * - Project Manager: Project manager with full approval and review capabilities
 */
export type UserRole
	= | "geologist"
	  | "loggingGeologist"
	  | "DBA"
	  | "Manager"
	  | "admin"
	  | "Project Manager";

// ============================================================================
// Permission Flags
// ============================================================================

/**
 * Permission flags that control user capabilities.
 *
 * These permissions are derived from user roles and determine
 * what actions users can perform in the application.
 */
export interface UserPermissions {
	/** Can approve drillhole data and sections (DBA, Manager, Project Manager) */
	canApprove: boolean

	/** Can review drillhole data and sections (DBA, Manager, Project Manager) */
	canReview: boolean

	/** Can exclude samples or data from reports (DBA, Manager, Project Manager) */
	canExclude: boolean

	/** Can view restricted geological logging sections (loggingGeologist) */
	canViewRestrictedSections: boolean

	/** Can access QAQC tools and reports (DBA, Manager, Project Manager) */
	canAccessQAQC: boolean

	/** Can import assay data (DBA, Manager, Project Manager) */
	canImportAssay: boolean
}

// ============================================================================
// Permission Calculation
// ============================================================================

/**
 * Calculate user permissions based on assigned roles.
 *
 * This is a pure function that derives permissions from roles.
 * A user can have multiple roles, and permissions are OR'd together.
 *
 * Permission Logic:
 * - DBA, Manager, Project Manager: Full data management permissions
 *   (approve, review, exclude, QAQC access, assay import)
 * - loggingGeologist: Can view restricted geological logging sections
 * - geologist: Basic access only (no special permissions)
 *
 * @param roles - Array of roles assigned to the user
 * @returns UserPermissions object with calculated permission flags
 *
 * @example
 * ```ts
 * // Manager gets full permissions
 * const managerPerms = getUserPermissions(['Manager']);
 * // { canApprove: true, canReview: true, ... }
 *
 * // Logging geologist gets restricted section access
 * const loggerPerms = getUserPermissions(['loggingGeologist']);
 * // { canViewRestrictedSections: true, ... }
 *
 * // Multiple roles combine permissions
 * const multiPerms = getUserPermissions(['loggingGeologist', 'Manager']);
 * // { canApprove: true, canViewRestrictedSections: true, ... }
 * ```
 */
export function getUserPermissions(roles: UserRole[]): UserPermissions {
	// Initialize all permissions to false
	const permissions: UserPermissions = {
		canApprove: false,
		canReview: false,
		canExclude: false,
		canViewRestrictedSections: false,
		canAccessQAQC: false,
		canImportAssay: false,
	};

	// Return early if no roles assigned
	if (!roles || roles.length === 0) {
		return permissions;
	}

	// Check for elevated roles (DBA, Manager, Project Manager)
	const hasElevatedRole = roles.some(
		role => role === "DBA" || role === "Manager" || role === "Project Manager" || role === "admin",
	);

	if (hasElevatedRole) {
		permissions.canApprove = true;
		permissions.canReview = true;
		permissions.canExclude = true;
		permissions.canAccessQAQC = true;
		permissions.canImportAssay = true;
	}

	// Check for loggingGeologist or Admin role
	if (roles.includes("loggingGeologist") || roles.includes("admin")) {
		permissions.canViewRestrictedSections = true;
	}
	console.log("getUserPermissions", permissions);
	return permissions;
}

/**
 * Check if a user has a specific role.
 *
 * @param roles - Array of user roles
 * @param role - Role to check for
 * @returns true if user has the specified role
 */
export function hasRole(roles: UserRole[], role: UserRole): boolean {
	return roles.includes(role);
}

/**
 * Check if a user has any elevated role (DBA, Manager, or Project Manager).
 *
 * @param roles - Array of user roles
 * @returns true if user has an elevated role
 */
export function hasElevatedRole(roles: UserRole[]): boolean {
	return roles.some(
		role => role === "DBA" || role === "Manager" || role === "Project Manager",
	);
}
