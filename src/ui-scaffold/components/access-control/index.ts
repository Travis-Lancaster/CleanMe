import type { ReactNode } from "react";
import { useAccess } from "#src/ui-scaffold/hooks/use-access";

interface AccessControlProps {
	// Permission type, default is code
	type?: "code" | "role"
	// Permission value, can be string or string array
	codes?: string | string[]
	children?: ReactNode
	// Display when no permission, default shows nothing when no permission.
	fallback?: ReactNode
}

/**
 * Access control component
 *
 * @param AccessControlProps Access control component properties
 * @returns If child component exists and the passed permission value is valid, return the child component; otherwise return null
 */
export function AccessControl({ type = "code", codes, children, fallback }: AccessControlProps) {
	const { hasAccessByCodes, hasAccessByRoles } = useAccess();

	if (!children)
		return null;

	if (!type || type === "code") {
		return hasAccessByCodes(codes) ? children : fallback;
	}

	if (type === "role") {
		return hasAccessByRoles(codes) ? children : fallback;
	}

	return fallback;
}
