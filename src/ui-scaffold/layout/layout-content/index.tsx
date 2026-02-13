import { GlobalSpin, Scrollbar } from "#src/ui-scaffold/components";
import { useLayoutContentStyle } from "#src/ui-scaffold/hooks";
import { LayoutFooter } from "#src/ui-scaffold/layout";
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, ELEMENT_ID_MAIN_CONTENT } from "#src/ui-scaffold/layout/constants";
import { useAccessStore, usePreferencesStore, useTabsStore } from "#src/ui-scaffold/store";
import { theme } from "antd";

import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { useEffect, useMemo } from "react";
import { useLocation, useOutlet } from "react-router";

export interface LayoutContentProps { }

export default function LayoutContent() {
	const {
		token: { colorBgLayout },
	} = theme.useToken();
	const { pathname, search } = useLocation();
	const outlet = useOutlet();
	const { contentElement } = useLayoutContentStyle();

	const aliveRef = useKeepAliveRef();
	const isRefresh = useTabsStore(state => state.isRefresh);
	const openTabs = useTabsStore(state => state.openTabs);
	const tabbarEnable = usePreferencesStore(state => state.tabbarEnable);
	const flatRouteList = useAccessStore(state => state.flatRouteList);
	const transitionName = usePreferencesStore(state => state.transitionName);
	const transitionEnable = usePreferencesStore(state => state.transitionEnable);
	const enableFooter = usePreferencesStore(state => state.enableFooter);
	const fixedFooter = usePreferencesStore(state => state.fixedFooter);

	/**
	 * To distinguish different pages to cache
	 */
	const cacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	/**
	 * When using close current tab, close right tabs, close left tabs, close other tabs, close all tabs functions, need to clear the cache of this tab
	 */
	useEffect(() => {
		const cacheNodes = aliveRef.current?.getCacheNodes?.();
		cacheNodes?.forEach((node) => {
			if (!openTabs.has(node.cacheKey)) {
				aliveRef.current?.destroy(node.cacheKey);
			}
		});
	}, [openTabs]);

	/**
	 * Disable multi-tab function, clear all cached pages
	 */
	useEffect(() => {
		if (!tabbarEnable) {
			const cacheNodes = aliveRef.current?.getCacheNodes?.();
			cacheNodes?.forEach((node) => {
				/* Does not include current page */
				if (node.cacheKey !== cacheKey) {
					aliveRef.current?.destroy(node.cacheKey);
				}
			});
		}
	}, [tabbarEnable]);

	/* KeepAlive refresh */
	useEffect(() => {
		/* Only effective when tab bar is enabled */
		if (tabbarEnable && isRefresh) {
			aliveRef.current?.refresh();
		}
	}, [isRefresh]);

	/* Routes with keepAlive = false will not cache pages */
	const keepAliveExclude = useMemo(() => {
		/**
		 * If multi-tab function is not enabled, KeepAlive function is not needed
		 * To preserve page switching animation, just put all routes in the exclude array
		 */
		if (!tabbarEnable) {
			return Object.keys(flatRouteList);
		}
		return Object.entries(flatRouteList).reduce<string[]>((acc, [key, value]) => {
			if (value.handle.keepAlive === false) {
				acc.push(key);
			}
			return acc;
		}, []);
	}, [flatRouteList, tabbarEnable]);

	return (
		<main
			id={ELEMENT_ID_MAIN_CONTENT}
			ref={contentElement}
			className="relative overflow-y-auto overflow-x-hidden flex-grow"
			style={
				{
					backgroundColor: colorBgLayout,
				}
			}
		>
			<Scrollbar>
				<GlobalSpin>
					<div
						className="flex flex-col h-full"
					>
						<div
							style={{
								height: `var(${CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT})`,
							}}
						>
							<KeepAlive
								max={20}
								transition
								duration={300}
								cacheNodeClassName={transitionEnable ? `keepalive-${transitionName}` : undefined}
								exclude={keepAliveExclude}
								activeCacheKey={cacheKey}
								aliveRef={aliveRef}
							>
								{outlet}
							</KeepAlive>
						</div>
						{enableFooter && !fixedFooter ? <LayoutFooter /> : null}
					</div>
				</GlobalSpin>
			</Scrollbar>

		</main>
	);
}
