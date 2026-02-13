import { fetchAsyncRoutes } from "#src/app/api/user";
import { useCurrentRoute } from "#src/app/hooks/use-current-route";
import { hideLoading } from "#src/app/plugins/hide-loading";

import { setupLoading } from "#src/app/plugins/loading";
import { exception403Path, exception404Path, exception500Path, loginPath } from "#src/app/router/extra-info";
import { accessRoutes, whiteRouteNames } from "#src/app/router/routes";
import { isSendRoutingRequest } from "#src/app/router/routes/config";
import { generateRoutesFromBackend } from "#src/app/router/utils/generate-routes-from-backend";
import { generateRoutesByFrontend } from "#src/app/router/utils/generate-routes-from-frontend";
import { useAccessStore } from "#src/app/store/access";
import { useAuthTokenStore } from "#src/data-access/store/authTokenStore";
import { useAuthStore } from "#src/app/store/auth";
import { useUserStore } from "#src/app/store/user";
import { useEffect } from "react";
import { matchRoutes, Navigate, useLocation, useNavigate, useSearchParams } from "react-router";
import { removeDuplicateRoutes } from "./utils";

/**
 * Routes whitelist 1. No permission verification, 2. Will not trigger requests, such as user information interface
 * @example "privacy-policy", "terms-of-service" and so on.
 */
const noLoginWhiteList = Array.from(whiteRouteNames).filter(item => item !== loginPath);

interface AuthGuardProps {
	children?: React.ReactNode
}

/**
 * AuthGuard component, used for permission verification. The order of the code is important and should not be arbitrarily adjusted
 */
export function AuthGuard({ children }: AuthGuardProps) {
	// console.log("🚀 [AUTH-GUARD] 📍 AuthGuard rendering");

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const currentRoute = useCurrentRoute();
	const { pathname, search } = useLocation();
	const isLogin = useAuthTokenStore(state => Boolean(state.token));
	const isAuthorized = useUserStore(state => Boolean(state.id));
	const userRoles = useUserStore(state => state.roles);
	const { setAccessStore, isAccessChecked, routeList } = useAccessStore();
	// const { enableBackendAccess, enableFrontendAceess } = usePreferencesStore(state => state);
	const enableBackendAccess = false;
	const enableFrontendAccess = true;
	const isPathInNoLoginWhiteList = noLoginWhiteList.includes(pathname);

	// console.log("[AUTH-GUARD] 📍 State check", {
	// 		pathname,
	// 		isLogin,
	// 		isAuthorized,
	// 		isAccessChecked,
	// 		isPathInNoLoginWhiteList,
	// 		hasChildren: !!children,
	// 		userRoles,
	// 	});

	/**
	 * Migration check: If we have a token but no user data, clear everything and redirect to login
	 * This handles the case where old localStorage data exists from before the refactor
	 */
	useEffect(() => {
		if (isLogin && !isAuthorized && !isPathInNoLoginWhiteList && pathname !== loginPath) {
			// console.log("[AUTH-GUARD] ⚠️ Token exists but no user data - clearing auth and redirecting to login");
			useAuthStore.getState().reset();
		}
	}, [isLogin, isAuthorized, isPathInNoLoginWhiteList, pathname]);

	/**
	 * Generate access routes based on user roles
	 * User data is already populated during login, so no need to fetch user-info
	 */
	useEffect(() => {
		async function generateAccessRoutes() {
			// console.log("[AUTH-GUARD] 📍 Generating access routes");
			/**
			 * Login redirect, prevent flicker
			 */
			setupLoading();

			const routes = [];

			/**
			 * Get user roles from user store (already populated during login)
			 */
			const latestRoles = userRoles;
			// console.log("[AUTH-GUARD] 📍 Using roles from user store", { roles: latestRoles });

			/**
			 * If backend routing is enabled and the route is obtained from a separate interface
			 */
			if (enableBackendAccess && isSendRoutingRequest) {
				try {
					const routeResult = await fetchAsyncRoutes();
					routes.push(...await generateRoutesFromBackend(routeResult.result ?? []));
				}
				catch (error) {
					// console.error("[AUTH-GUARD] ❌ Failed to fetch async routes", error);
					return navigate(exception500Path);
				}
			}

			/**
			 * If frontend routing is enabled (default)
			 */
			if (enableFrontendAccess) {
				routes.push(...generateRoutesByFrontend(accessRoutes, latestRoles));
			}

			/**
			 * Remove duplicate routes to prevent React Router DataRoutes errors
			 */
			const uniqueRoutes = removeDuplicateRoutes(routes);
			setAccessStore(uniqueRoutes);

			/**
			 * Under the condition of dynamic routing, replace the current route
			 * to trigger proper route matching after routes are added
			 */
			navigate(`${pathname}${search}`, {
				replace: true,
				/**
				 * Ensure that the 404 page will not be displayed before replacing the route
				 */
				flushSync: true,
			});
		}
		/**
		 * Generate routes only when:
		 * 1. Not in the route whitelist
		 * 2. Logged in (has token)
		 * 3. User is authorized (has user data from login)
		 * 4. Access routes not yet checked
		 */
		if (!whiteRouteNames.includes(pathname) && isLogin && isAuthorized && !isAccessChecked) {
			generateAccessRoutes();
		}
	}, [pathname, isLogin, isAuthorized, isAccessChecked]);

	/**
	 * Route whitelist
	 * @see {noLoginWhiteList}
	 */
	if (isPathInNoLoginWhiteList) {
		// console.log("[AUTH-GUARD] ✅ Path in whitelist - rendering children");
		hideLoading();
		return children;
	}

	/**
	 * Processing logic under unlogged conditions
	 */
	/* --------------- Start ------------------ */
	if (!isLogin) {
		console.log("[AUTH-GUARD] ⚠️ Not logged in", { pathname, loginPath });
		hideLoading();
		// If not logged in and target page is not login page, redirect to login page
		if (pathname !== loginPath) {
			const redirectPath = pathname.length > 1 ? `${loginPath}?redirect=${pathname}${search}` : loginPath;
			// console.log("[AUTH-GUARD] 🔄 Redirecting to login", { from: pathname, to: redirectPath });
			return (
				<Navigate
					to={redirectPath}
					replace
				/>
			);
		}
		// If not logged in and target page is login page, keep login page
		else {
			// console.log("[AUTH-GUARD] ✅ On login page - rendering login");
			return children;
		}
	}
	/* --------------- End ------------------ */

	/**
	 * Processing logic under logged conditions
	 */
	/* --------------- Start ------------------ */

	/**
	 * Under logged conditions, match the login route and jump to the home page
	 * Put it before user information, because the login route will not request user information, so put it in front to judge
	 */
	if (pathname === loginPath) {
		/**
		 * @example login?redirect=/system/user
		 */
		const redirectPath = searchParams.get("redirect");
		if (redirectPath?.length && redirectPath !== pathname) {
			return (
				<Navigate
					to={redirectPath}
					replace
				/>
			);
		}
		return (
			<Navigate
				to={import.meta.env.VITE_BASE_HOME_PATH}
				replace
			/>
		);
	}

	/**
	 * Waiting for route information to be obtained
	if (!isAuthorized) {
	 * Only token presence is required for authentication
	 */
	if (!isAccessChecked) {
		// console.log("[AUTH-GUARD] ⚠️ Waiting for route access check");
		return null;
	}

	// console.log("[AUTH-GUARD] ✅ Access checked - authenticated with token");

	/**
	 * Hide loading animation
	 */
	hideLoading();

	/**
	 * If it is the root route, jump to the home page (jump to the default home page after obtaining user information to prevent requesting twice for user information interface)
	 * pathname returns the path relative to import.meta.env.BASE_URL, so here is the root route "/" relative to BASE_URL
	 */
	if (pathname === "/") {
		// console.log("[AUTH-GUARD] 🔄 Root path - redirecting to home");
		return (
			<Navigate
				to={import.meta.env.VITE_BASE_HOME_PATH}
				replace
			/>
		);
	}

	/* --------------- End ------------------ */

	/**
	 * Route permission verification logic
	 */
	const routeRoles = currentRoute?.handle?.roles;
	const ignoreAccess = currentRoute?.handle?.ignoreAccess;

	/**
	 * Ignore permission verification
	 */
	if (ignoreAccess === true) {
		// console.log("[AUTH-GUARD] ✅ Ignoring access check - rendering children");
		return children;
	}

	const matches = matchRoutes(
		routeList,
		pathname,
		/**
		 * pathname returns the path relative to import.meta.env.BASE_URL, so there is no need to specify the third parameter basename
		 */
	) ?? [];

	const hasChildren = matches[matches.length - 1]?.route?.children?.filter(item => !item.index)?.length;
	/**
	 * If the current route has sub-routes, jump to the 404 page
	 */
	if (hasChildren && hasChildren > 0) {
		return (
			<Navigate
				to={exception404Path}
				replace
			/>
		);
	}

	/**
	 * Role permission verification
	 */
	const hasRoutePermission = userRoles.some(role => routeRoles?.includes(role));
	/**
	 * Permission verification logic:
	 * 1. If there is no role on the route, it is considered as a permissionless route, equivalent to ignoreAccess being true
	 * 2. For routes that do not pass permission verification, cancel the current route navigation and jump to the 403 page
	 */
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		return (
			<Navigate
				to={exception403Path}
				replace
			/>
		);
	}

	// console.log("[AUTH-GUARD] ✅ All checks passed - rendering children");
	return children;
}
/**
 * Steps to verify if route navigation is working correctly:
 * 1. When not logged in, enter login route
 * 2. When not logged in, enter non-login route
 * 3. When logged in, use system logout, then login again
 * 4. Choose any non-home page, use developer tools to clear localStorage, login after refreshing page
 * 5. When logged in, enter login route
 * 6. When logged in, enter non-login route
 * 7. When logged in, enter http://localhost:3333 redirect to /home route, user interface sends once
 * 8. When logged in, enter http://localhost:3333/ redirect to /home route, user interface sends once
 * 9. When logged in, enter http://localhost:3333/home redirect to /home route, user interface sends once
 */
