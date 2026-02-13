import type { LoginInfo } from "#src/ui-scaffold/api/user/types";

import { fetchLogin } from "#src/ui-scaffold/api/user";
import { useAuthTokenStore } from "#src/data-layer/store/authTokenStore";
import { useAccessStore } from "#src/ui-scaffold/store/access";
import { useTabsStore } from "#src/ui-scaffold/store/tabs";
import { useUserStore } from "#src/ui-scaffold/store/user";

import { create } from "zustand";

interface AuthAction {
	login: (loginPayload: LoginInfo) => Promise<void>
	logout: () => Promise<void>
	reset: () => void
};

export const useAuthStore = create<AuthAction>((set, get) => ({
	login: async (loginPayload) => {
		const response = await fetchLogin(loginPayload);

		// Handle both wrapped and unwrapped responses
		const data = (response as any).result || response;

		// Store tokens in data-layer store (map accessToken to token for internal consistency)
		useAuthTokenStore.getState().setTokens(data.accessToken, data.refreshToken);

		// Immediately populate user store with data from login response
		useUserStore.getState().setUserFromLogin(data.user);
	},

	logout: async () => {
		/**
		 * 1. Logout user
		 */

		// await fetchLogout();
		/**
		 * 2. Clear token and other information
		 */

		get().reset();
	},

	reset: () => {
		/**
		 * Clear tokens via data-layer store
		 */
		useAuthTokenStore.getState().clearTokens();

		/**
		 * Clear user information
		 * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
		 */
		useUserStore.getState().reset();

		/**
		 * Clear access permissions
		 * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
		 */
		useAccessStore.getState().reset();

		/**
		 * Clear tabs
		 */
		useTabsStore.getState().resetTabs();

		/**
		 * Clear keepAlive cache
		 * In the container-layout component, automatically refresh keepAlive cache based on openTabs
		 */
	},
}));
