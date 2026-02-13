import type { Options } from "ky";

import { loginPath } from "#src/ui-scaffold/router/extra-info";
import { useAuthTokenStore } from "#src/data-layer/store/authTokenStore";
import { usePreferencesStore } from "#src/ui-scaffold/store/preferences";
import ky from "ky";
import { AUTH_HEADER, LANG_HEADER, REFRESH_TOKEN_PATH } from "./constants";
import { handleErrorResponse } from "./error-response";
import { globalProgress } from "./global-progress";
import { goLogin } from "./go-login";
import { refreshTokenAndRetry } from "./refresh";

// Request whitelist, APIs in the whitelist do not need to carry token
const requestWhiteList = [loginPath];

// Request timeout duration
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_VERSION,

	timeout: API_TIMEOUT,
	retry: {
		// Maximum number of retries when request fails
		limit: 3,
	},
	hooks: {
		beforeRequest: [
			(request, options) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.start();
				}
				// Requests that do not need to carry token
				const isWhiteRequest = requestWhiteList.some(url => request.url.endsWith(url));
				if (!isWhiteRequest) {
					const token = useAuthTokenStore.getState().getToken();
					if (token) {
						request.headers.set(AUTH_HEADER, `Bearer ${token}`);
					}
				}
				// All interfaces need to carry language, etc.
				request.headers.set(LANG_HEADER, usePreferencesStore.getState().language);
			},
		],
		afterResponse: [
			async (request, options, response) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.done();
				}
				// request error
				if (!response.ok) {
					if (response.status === 401) {
						// Prevent infinite loop from continuing to receive 401 errors when refreshing refresh-token
						if ([`/${REFRESH_TOKEN_PATH}`].some(url => request.url.endsWith(url))) {
							goLogin();
							return response;
						}
						// If the token is expired, refresh it and try again.
						const refreshToken = useAuthTokenStore.getState().getRefreshToken();
						// If there is no refresh token, it means that the user has not logged in.
						if (!refreshToken) {
							// If the page route has already been redirected to the login page, no need to jump, directly return the result
							if (location.pathname === loginPath) {
								return response;
							}
							else {
								goLogin();
								return response;
							}
						}

						return refreshTokenAndRetry(request, options, refreshToken);
					}
					else {
						return handleErrorResponse(response);
					}
				}
				// request success
				return response;
			},
		],
	},
};

export const request = ky.create(defaultConfig);
