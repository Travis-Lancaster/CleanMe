import { useMemo } from "react";
import { useMatches } from "react-router";

/**
 * Get current route information
 *
 * @returns Current route match result
 */
export function useCurrentRoute() {
	const matches = useMatches();

	const currentRoute = useMemo(() => {
		const match = matches[matches.length - 1];

		return match;
	}, [matches, location]);

	return currentRoute;
}
