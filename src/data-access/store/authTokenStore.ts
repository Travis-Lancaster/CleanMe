/**
 * Auth Token Store
 * Independent Zustand store for managing authentication tokens
 * Decoupled from UI-scaffold to avoid circular dependencies
 * Handles token storage, retrieval, and expiration checking
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthTokenState {
	token: string;
	refreshToken: string;
}

export interface AuthTokenActions {
	setTokens: (token: string, refreshToken: string) => void;
	getToken: () => string | null;
	getRefreshToken: () => string | null;
	clearTokens: () => void;
	isTokenExpired: () => boolean;
	getTokenPayload: () => Record<string, any> | null;
}

const initialState: AuthTokenState = {
	token: "",
	refreshToken: "",
};

/**
 * Decode JWT token payload
 */
function decodeJwt(token: string): Record<string, any> | null {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
				.join(""),
		);
		return JSON.parse(jsonPayload);
	}
	catch (error) {
		console.error("[authTokenStore] Failed to decode JWT", error);
		return null;
	}
}

/**
 * Create auth token store with persistence
 * Uses localStorage with a namespaced key to avoid conflicts
 */
export const useAuthTokenStore = create<AuthTokenState & AuthTokenActions>()(
	persist(
		(set, get) => ({
			...initialState,

			setTokens: (token: string, refreshToken: string) => {
				console.debug("[authTokenStore] Setting tokens", {
					hasToken: !!token,
					hasRefreshToken: !!refreshToken,
				});
				set({ token, refreshToken });
			},

			getToken: () => {
				const { token } = get();
				return token || null;
			},

			getRefreshToken: () => {
				const { refreshToken } = get();
				return refreshToken || null;
			},

			clearTokens: () => {
				console.debug("[authTokenStore] Clearing tokens");
				set(initialState);
			},

			isTokenExpired: () => {
				const { token } = get();
				if (!token) {
					return true;
				}

				const payload = decodeJwt(token);
				if (!payload || !payload.exp) {
					return true;
				}

				// Check if expiration time is past current time
				return payload.exp * 1000 < Date.now();
			},

			getTokenPayload: () => {
				const { token } = get();
				if (!token) {
					return null;
				}
				return decodeJwt(token);
			},
		}),
		{
			name: "auth-tokens", // localStorage key
			partialize: (state) => ({
				token: state.token,
				refreshToken: state.refreshToken,
			}),
		},
	),
);

export default useAuthTokenStore;
