import { NProgress, isString, toggleHtmlClass } from "../../utils";
import { Outlet, useLocation, useMatches } from "react-router";

import { AuthGuard } from "../../router/guard";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../../components";
import { useAuthTokenStore } from "#src/data-access/store/authTokenStore";
import { useEffect } from "react";
import { usePreferences } from "../../hooks";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store";
import { whiteRouteNames } from "../../router/routes";

/**
 * Root layout component
 */
export default function LayoutRoot() {
	console.log("=� [LAYOUT] =� LayoutRoot rendering (src/layout/layout-root/index.tsx)");
	const matches = useMatches();
	const { t } = useTranslation();
	const location = useLocation();
	const { language, isDark, enableDynamicTitle } = usePreferences();
	const isLogin = useAuthTokenStore(state => Boolean(state.token));
	const isAuthorized = useUserStore(state => Boolean(state.id));

	/* document title */
	useEffect(() => {
		if (!enableDynamicTitle) {
			return;
		}
		/**
		 * authGuardDependencies is the dependency of useEffect that will request user information. If it's true,
		 */
		const authGuardDependencies = !whiteRouteNames.includes(location.pathname) && isLogin && !isAuthorized;
		if (!authGuardDependencies) {
			const currentRoute = matches[matches.length - 1];
			const documentTitle = currentRoute.handle?.title as React.ReactElement | string;
			const newTitle = isString(documentTitle) ? documentTitle : documentTitle?.props?.children;
			document.title = t(newTitle) || document.title;
		}
	}, [enableDynamicTitle, language, location]);

	/* tailwind theme */
	useEffect(() => {
		if (isDark) {
			toggleHtmlClass("dark").add();
		}
		else {
			toggleHtmlClass("dark").remove();
		}
	}, [isDark]);

	/**
	 * Close the page loading progress bar, used with the loader and shouldRevalidate of the ROOT_ROUTE_ID route
	 */
	useEffect(() => {
		NProgress.done();
	}, [location.pathname]);

	return (
		<ErrorBoundary FallbackComponent={PageError}>
			<AuthGuard>
				<Outlet />
			</AuthGuard>
		</ErrorBoundary>
	);
}
