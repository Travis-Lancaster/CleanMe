import type { TabsProps } from "#node_modules/antd/es";
import type { TabItemProps } from "../../store";
import { Button, Tabs } from "#node_modules/antd/es";
import { removeTrailingSlash } from "#src/ui-scaffold/router/utils/remove-trailing-slash.js";
import { RedoOutlined } from "@ant-design/icons";
import { clsx } from "clsx";

import { isValidElement, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useCurrentRoute } from "../../hooks";
import { useAccessStore, usePreferencesStore, useTabsStore } from "../../store";
import { isString } from "../../utils/is";
import { tabbarHeight } from "../constants";
import { DraggableTabBar } from "./components/draggable-tab-bar";
import { TabMaximize } from "./components/tab-maximize";
import { TabOptions } from "./components/tab-options";
import { TabActionKeys, useDropdownMenu } from "./hooks/use-dropdown-menu";
import { useStyles } from "./style";

// import { removeTrailingSlash } from "#src/ui-scaffold/router/utils";
// import { useAccessStore, usePreferencesStore, useTabsStore } from "#src/ui-scaffold/store";

/**
 * LayoutTabbar component
 * Used to render and manage application tab navigation
 */
export default function LayoutTabbar() {
	// const { token } = theme.useToken();
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const currentRoute = useCurrentRoute();

	const { tabbarStyleType, tabbarShowMaximize, tabbarShowMore } = usePreferencesStore();
	const { flatRouteList } = useAccessStore();
	const { activeKey, isRefresh, setActiveKey, setIsRefresh, openTabs, addTab, insertBeforeTab } = useTabsStore();
	const [items, onClickMenu] = useDropdownMenu();

	const tabItems: TabItemProps[] = Array.from(openTabs.values()).map((item) => {
		const tabLabel = item.newTabTitle ?? item.label;
		return {
			...item,
			label: (
				<div className="relative flex items-center gap-1">
					{isString(tabLabel) ? t(tabLabel) : tabLabel}
				</div>
			),
		};
	});

	/**
	 * Automatically reset refresh state
	 */
	useEffect(() => {
		if (isRefresh) {
			const timer = setTimeout(() => {
				setIsRefresh(false);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [isRefresh, setIsRefresh]);

	/**
	 * Handle tab switching
	 * @param {string} key - The key of the selected tab
	 */
	const handleChangeTabs = useCallback((key: string) => {
		const historyState = openTabs.get(key)?.historyState || { search: "", hash: "" };
		navigate(key + historyState.search + historyState.hash);
	}, [openTabs]);

	/**
	 * Handle tab editing (closing)
	 * @param {React.MouseEvent | React.KeyboardEvent | string} key - The key of the tab being edited
	 * @param {string} action - Edit action, only handle "remove" here
	 */
	const handleEditTabs = useCallback<Required<TabsProps>["onEdit"]>((key, action) => {
		if (action === "remove") {
			onClickMenu(TabActionKeys.CLOSE, key as string);
		}
	}, [onClickMenu]);

	/**
	 * Custom render tab bar, add right-click menu function
	 * @param {object} tabBarProps - Tab bar properties
	 * @param {React.ComponentType} DefaultTabBar - Default tab bar component
	 * @returns {JSX.Element} Rendered tab bar
	 */
	const renderTabBar = useCallback<Required<TabsProps>["renderTabBar"]>((tabBarProps, DefaultTabBar) => {
		return (
			<DraggableTabBar
				DefaultTabBar={DefaultTabBar}
				tabBarProps={tabBarProps}
				items={items}
				tabItems={tabItems}
				onClickMenu={onClickMenu}
			/>
		);
	}, [tabItems, items, onClickMenu]);

	/**
	 * Generate additional tab bar content
	 */
	const tabBarExtraContent = useMemo(() => ({
		right: (
			<div className="flex items-center" style={{ height: tabbarHeight }}>
				<Button
					icon={(
						<RedoOutlined
							rotate={270}
							className={clsx({ "animate-spin": isRefresh })}
						/>
					)}
					size="middle"
					type="text"
					className={clsx("rounded-none h-full border-l border-l-colorBorderSecondary")}
					onClick={() => onClickMenu(TabActionKeys.REFRESH, activeKey)}
				/>
				{tabbarShowMaximize ? (<TabMaximize className="h-full border-l rounded-none border-l-colorBorderSecondary" />) : null}
				{tabbarShowMore ? (<TabOptions activeKey={activeKey} className="h-full border-l rounded-none border-l-colorBorderSecondary" />) : null}
			</div>
		),
	}), [isRefresh, activeKey, onClickMenu, tabbarShowMore, tabbarShowMaximize]);

	/**
	 * When active tab is closed, automatically navigate to appropriate route
	 *
	 * Warning: Except for the first time entering the system (such as login), please use navigate(import.meta.env.VITE_BASE_HOME_PATH) instead of directly using navigate("/") in the project. Reasons are as follows:
	 * 1. Direct navigation to root path ("/") will cause route root component to re-render
	 * 2. This component will not be able to correctly listen to location changes
	 * 3. Will cause activeKey state to remain as the previous active tab (display abnormal)
	 * 4. Result location.pathname is new, activeKey state is still the previous active tab, causing navigation abnormal.
	 */
	useEffect(() => {
		/**
		 * The following actions will trigger active tab to be closed:
		 * 1. Close current tab
		 * 2. When using close left/right/other/all tabs function, the activated tab is closed
		 *
		 * At this time, activeKey is the latest, location.pathname has not been updated yet, use navigate to navigate to the latest active tab to prevent display abnormal.
		 *
		 * First time entering the application, activeKey value is empty, does not trigger automatic navigation
		 */
		const historyState = openTabs.get(activeKey)?.historyState || { search: "", hash: "" };
		const activeFullPath = activeKey + historyState.search + historyState.hash;
		const currentFullpath = location.pathname + location.search + location.hash;
		if (activeKey.length > 0 && activeFullPath !== currentFullpath) {
			navigate(activeFullPath);
		}
	}, [activeKey]);

	/**
	 * When user refreshes current page but it's not the default Tab page, need to add default Tab
	 */
	useEffect(() => {
		// Check if default Tab is missing
		const isDefaultTabMissing = !Array.from(openTabs.keys()).includes(import.meta.env.VITE_BASE_HOME_PATH);

		if (isDefaultTabMissing) {
			const routeTitle = flatRouteList[import.meta.env.VITE_BASE_HOME_PATH]?.handle?.title;
			insertBeforeTab(import.meta.env.VITE_BASE_HOME_PATH, {
				key: import.meta.env.VITE_BASE_HOME_PATH,
				label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
				closable: false,
				draggable: false,
			});
		}
	}, [openTabs, insertBeforeTab, flatRouteList]);

	/**
	 * Listen to route changes, add tabs and activate tabs
	 */
	useEffect(() => {
		const activePath = location.pathname;
		const normalizedPath = removeTrailingSlash(activePath);
		// tabbarEnable variable will cause this component to mount and unmount, normalizedPath may be the same as activeKey, add judgment to prevent addTab from adding repeatedly
		if (normalizedPath !== activeKey) {
			setActiveKey(normalizedPath);

			// Check if route should be hidden in tabs
			const shouldHideInTabs = currentRoute.handle?.hideInTabs;

			// Only add tab if route is not marked to be hidden in tabs
			if (!shouldHideInTabs) {
				const routeTitle = currentRoute.handle?.title;

				addTab(normalizedPath, {
					key: normalizedPath,
					// Ensure label is string type, stored in sessionStorage.
					label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
					historyState: { search: location.search, hash: location.hash },
					/* Default route after login, cannot be closed or dragged */
					closable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
					draggable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
				});
			}
		}
	}, [location, currentRoute, setActiveKey, addTab]);

	return (
		<div className={classes.tabsContainer}>
			<Tabs
				className={clsx(
					classes.resetTabs,
					tabbarStyleType === "brisk" ? classes.brisk : "",
					tabbarStyleType === "plain" ? classes.plain : "",
					tabbarStyleType === "chrome" ? classes.chrome : "",
					tabbarStyleType === "card" ? classes.card : "",
				)}
				size="small"
				hideAdd
				animated
				onChange={handleChangeTabs}
				activeKey={removeTrailingSlash(activeKey)}
				type="editable-card"
				onEdit={handleEditTabs}
				items={tabItems}
				renderTabBar={renderTabBar}
				tabBarExtraContent={tabBarExtraContent}
			/>
		</div>
	);
}
