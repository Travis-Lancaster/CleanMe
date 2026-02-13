import { useAuthTokenStore } from "#src/data-layer/store/authTokenStore";
import { useAuthStore } from "#src/ui-scaffold/store/auth";
import { rememberRoute } from "#src/ui-scaffold/utils/remember-route";

/**
 * Navigate to login page
 *
 * @returns No return value
 */
export function goLogin() {
	// Clear tokens via data-layer store
	useAuthTokenStore.getState().clearTokens();
	// Reset login status (clears user, access, tabs stores)
	useAuthStore.getState().reset();
	// Navigate to login page, and include the route information that needs to be remembered
	window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
}
