import type { ReactNode } from "react";

import type { IndexRouteObject, NonIndexRouteObject, createBrowserRouter as RemixRouter } from "react-router";

export interface IndexRouteMeta extends Omit<IndexRouteObject, "id"> {
	redirect?: string
	handle: RouteMeta
}
export interface NonIndexRouteMeta extends Omit<NonIndexRouteObject, "id"> {
	redirect?: string
	handle: RouteMeta
	children?: AppRouteRecordRaw[]
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
	/**
	 * Route title, usually used for page title or sidebar menu display
	 */
	title: ReactNode

	/**
	 * Menu icon, used for sidebar menu item icon display
	 */
	icon?: ReactNode

	/**
	 * Menu order, used to control the display order of sidebar menu
	 */
	order?: number

	/**
	 * Used to configure page permissions, only users with corresponding permissions can access the page, no permissions required if not configured.
	 */
	roles?: string[]

	/**
	 * Page-level button permissions, used to control the display and hiding of buttons within the page
	 */
	permissions?: string[]

	/**
	 * Set whether the page enables caching, when enabled, the page will be cached and won't reload, only effective when tabs are enabled.
	 * @default true
	 */
	keepAlive?: boolean

	/**
	 * Whether to hide in menu, used to control certain routes not displayed in sidebar menu
	 */
	hideInMenu?: boolean

	/**
	 * Whether to hide in tabs, used to control certain routes not displayed in tab bar
	 */
	hideInTabs?: boolean

	/**
	 * iframe link, used when route needs to load external page in iframe
	 */
	iframeLink?: string

	/**
	 * External link, opens directly in new tab when clicked
	 */
	externalLink?: string

	/**
	 * Used to configure whether page ignores permissions and can be accessed directly
	 */
	ignoreAccess?: boolean

	/**
	 * @description Specify the currently active menu, applicable for activating parent menu in dynamic routing scenarios
	 * @example When navigating from parent route '/user/info' to child route '/user/info/1', you can manually specify to highlight the parent menu '/user/info'
	 */
	currentActiveMenu?: string

	/**
	 * Current route obtained from backend interface request
	 */
	backstage?: boolean
}

export type ReactRouterType = ReturnType<typeof RemixRouter>;
export type RouterSubscriber = Parameters<ReactRouterType["subscribe"]>[0];
export type RouterState = ReactRouterType["state"];
export type RouterNavigate = ReactRouterType["navigate"];

//
export type RouteFileModule = Record<string, { default: AppRouteRecordRaw[] }>;
