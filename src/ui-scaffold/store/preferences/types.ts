import type {
	MIXED_NAVIGATION,
	SIDE_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/ui-scaffold/layout/widgets/preferences/blocks/layout/constants";

import type { LanguageType } from "#src/ui-scaffold/locales";
import type { MenuProps } from "antd";

/**
 * @en Login page layout
 */
export type PageLayoutType = "layout-left" | "layout-center" | "layout-right";
/**
 * @en Tabbar style
 */
export type TabsStyleType = "brisk" | "card" | "chrome" | "plain";

/**
 * @en Theme type
 */
export type ThemeType = "dark" | "light" | "auto";

/**
 * @en Animation type
 */
interface AnimationState {
	/**
	 * @en Whether to enable transition animation
	 * @default true
	 */
	transitionProgress: boolean
	/**
	 * @en Whether to enable loading animation
	 * @default true
	 */
	transitionLoading: boolean
	/**
	 * @en Whether to enable animation
	 * @default true
	 */
	transitionEnable: boolean
	/**
	 * @en Transition animation name
	 * @default "fade-slide"
	 */
	transitionName: string
}

export type NavigationType
	= | typeof SIDE_NAVIGATION
	  | typeof TOP_NAVIGATION
	  | typeof TWO_COLUMN_NAVIGATION
	  | typeof MIXED_NAVIGATION;
export type BuiltinThemeType
	= | "red"
	  | "volcano"
	  | "orange"
	  | "gold"
	  | "yellow"
	  | "lime"
	  | "green"
	  | "cyan"
	  | "blue"
	  | "geekblue"
	  | "purple"
	  | "magenta"
	  | "gray"
	  | "custom";

interface LayoutState {
	navigationStyle: NavigationType
}

export interface GeneralState {
	/**
	 * @en Whether to enable watermark
	 * @default false
	 */
	watermark: boolean
	/**
	 * @en Watermark content
	 * @default ""
	 */
	watermarkContent: string
	/**
	 * @en BackTop makes it easy to go back to the top of the page.
	 * @default true
	 */
	enableBackTopButton: boolean
	/**
	 * @en Login page layout configuration
	 * @default "layout-right"
	 */
	pageLayout: PageLayoutType
	/**
	 * @en Enable frontend route permissions
	 * @default false
	 */
	enableFrontendAccess: boolean
	/**
	 * @en Enable backend route permissions
	 * @default true
	 */
	enableBackendAccess: boolean

	/**
	 * @en Current language
	 * @default "zh-CN"
	 */
	language: LanguageType
	/**
	 * @en Whether to enable dynamic title
	 * @default true
	 */
	enableDynamicTitle: boolean
	/**
	 * @en Whether to enable update check
	 * @default true
	 */
	enableCheckUpdates: boolean
	/**
	 * @en Polling time, unit: minute, default 1 minute
	 * @default 1
	 */
	checkUpdatesInterval: number
}

export interface SidebarState {
	/**
	 * @en Whether the sidebar is visible
	 * @default true
	 */
	sidebarEnable?: boolean
	/**
	 * @en Sidebar menu width
	 * @default 210
	 */
	sidebarWidth: number
	/**
	 * @en Sidebar menu collapsed width
	 * @default 56
	 */
	sideCollapsedWidth: number
	/**
	 * @en Sidebar menu collapsed state
	 * @default false
	 */
	sidebarCollapsed: boolean
	/**
	 * @en Whether to show title when sidebar menu is collapsed
	 * @default true
	 */
	sidebarCollapseShowTitle: boolean
	/**
	 * @en Sidebar menu extra collapsed width
	 * @default 48
	 */
	sidebarExtraCollapsedWidth: number
	/**
	 * @en Left menu width in two-column layout
	 * @default 80
	 */
	firstColumnWidthInTwoColumnNavigation: number
	/**
	 * @en Sidebar theme
	 * @default dark
	 */
	sidebarTheme: MenuProps["theme"]
	/**
	 * @en Accordion mode of navigation menu
	 */
	accordion: boolean
}

export interface FooterState {
	enableFooter: boolean
	fixedFooter: boolean
	companyName: string
	companyWebsite: string
	copyrightDate: string
	ICPNumber: string
	ICPLink: string
}

export interface PreferencesState
	extends AnimationState,
	LayoutState,
	GeneralState,
	SidebarState,
	FooterState {
	/* ================== Theme ================== */
	/**
	 * @en Current theme
	 * @default "auto"
	 */
	theme: ThemeType
	/**
	 * @en Whether to enable color-blind mode
	 * @default false
	 */
	colorBlindMode: boolean
	/**
	 * @en Whether to enable gray mode
	 * @default false
	 */
	colorGrayMode: boolean
	/**
	 * @en Theme radius value
	 * @default 6
	 */
	themeRadius: number
	/**
	 * @en Theme color
	 * @default "#1677ff" - blue
	 */
	themeColorPrimary: string
	/**
	 * @en Builtin theme
	 * @default "blue"
	 */
	builtinTheme: BuiltinThemeType
	/* ================== Theme ================== */

	/* ================== Tabbar ================== */
	/**
	 * @en Tabbar style
	 * @default "chrome"
	 */
	tabbarStyleType: TabsStyleType
	/**
	 * @en Whether to enable tabbar
	 * @default true
	 */
	tabbarEnable: boolean
	/**
	 * @en Whether to show tabbar icon
	 * @default true
	 * @todo To be implemented
	 */
	tabbarShowIcon: boolean
	/**
	 * @en Whether to persist tabbar
	 * @default true
	 */
	tabbarPersist: boolean
	/**
	 * @en Whether to drag tabbar
	 * @default true
	 * @todo To be implemented
	 */
	tabbarDraggable: boolean
	/**
	 * @en Whether to show more
	 * @default true
	 */
	tabbarShowMore: boolean
	/**
	 * @en Whether to show maximize
	 * @default true
	 */
	tabbarShowMaximize: boolean
	/* ================== Tabbar ================== */
}
