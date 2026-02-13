// import { useDeviceType } from "#src/app/hooks";

import { useMemo } from "react";

import { useDeviceType } from "../../hooks";
import { usePreferencesStore } from "../../store";
import { MIXED_NAVIGATION, SIDE_NAVIGATION, TOP_NAVIGATION, TWO_COLUMN_NAVIGATION } from "../widgets/preferences/blocks/layout/constants";

/**
 * Get current page layout type information
 *
 * @returns Returns object containing current layout type information, including:
 * - currentLayout: Current navigation type
 * - isSideNav: Whether it is side navigation
 * - isTopNav: Whether it is top navigation
 * - isMixedNav: Whether it is mixed navigation
 * - isTwoColumnNav: Whether it is two-column navigation
 */
export function useLayout() {
	const { isMobile } = useDeviceType();
	// Layout type
	const navigationStyle = usePreferencesStore(state => state.navigationStyle);
	const sidebarWidth = usePreferencesStore(state => state.sidebarWidth);
	const sideCollapsedWidth = usePreferencesStore(state => state.sideCollapsedWidth);
	const firstColumnWidthInTwoColumnNavigation = usePreferencesStore(state => state.firstColumnWidthInTwoColumnNavigation);

	/**
	 * Current navigation type
	 */
	const currentLayout = useMemo(
		() => isMobile ? SIDE_NAVIGATION : navigationStyle,
		[isMobile, navigationStyle],
	);

	/**
	 * Whether it is side navigation
	 */
	const isSideNav = useMemo(
		() => currentLayout === SIDE_NAVIGATION,
		[currentLayout],
	);

	/**
	 * Whether it is top navigation
	 */
	const isTopNav = useMemo(
		() => currentLayout === TOP_NAVIGATION,
		[currentLayout],
	);

	/**
	 * Whether it is two-column navigation
	 */
	const isTwoColumnNav = useMemo(
		() => currentLayout === TWO_COLUMN_NAVIGATION,
		[currentLayout],
	);

	/**
	 * Whether it is mixed navigation
	 */
	const isMixedNav = useMemo(
		() => currentLayout === MIXED_NAVIGATION,
		[currentLayout],
	);

	return {
		currentLayout,
		isSideNav,
		isTopNav,
		isMixedNav,
		isTwoColumnNav,
		sidebarWidth,
		sideCollapsedWidth,
		firstColumnWidthInTwoColumnNavigation,
	};
}
