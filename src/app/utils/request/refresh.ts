import type { KyResponse, Options } from "ky";
import { fetchRefreshToken } from "#src/app/api/user";

import { useAuthTokenStore } from "#src/data-access/store/authTokenStore";
import ky from "ky";
import { AUTH_HEADER } from "./constants";
import { goLogin } from "./go-login";

let isRefreshing = false;

/**
 * Refresh token and retry request
 *
 * @param request Request object
 * @param options Request options
 * @param refreshToken Refresh token
 * @returns Response object
 * @throws Throws exception when refresh token fails
 */
export async function refreshTokenAndRetry(request: Request, options: Options, refreshToken: string) {
	if (!isRefreshing) {
		isRefreshing = true;
		try {
			// Use store's refreshTokens method (which uses Ky)
			const freshResponse = await fetchRefreshToken({ refreshToken });

			const newToken = freshResponse.result.token;
			const newRefreshToken = freshResponse.result.refreshToken;
			useAuthTokenStore.getState().setTokens(newToken, newRefreshToken);
			onRefreshed(newToken);

			// Set Authorization header of request to new token
			// Retry current request
			request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
			// Resend request with new token
			return ky(request, options);
		}
		catch (error) {
			// Call onRefreshFailed function, passing error object
			// refreshToken authentication failed, reject all waiting requests
			onRefreshFailed(error);
			// Redirect to login page
			goLogin();
			// Throw error
			throw error;
		}
		finally {
			// Set isRefreshing to false regardless of error
			isRefreshing = false;
		}
	}
	else {
		// Wait for token refresh to complete
		return new Promise<KyResponse>((resolve, reject) => {
			// Add refresh subscriber
			addRefreshSubscriber({
				// When token refresh succeeds, set new token to Authorization header and retry request
				resolve: async (newToken) => {
					request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
					resolve(ky(request, options));
				},
				// When token refresh fails, reject current Promise
				reject,
			});
		});
	}
}

// Define an array to store all subscribers waiting for token refresh
// Each subscriber object contains resolve and reject methods, called when token refresh succeeds or fails respectively
let refreshSubscribers: Array<{
	resolve: (token: string) => void // Function called when token refresh succeeds, passing new token
	reject: (error: any) => void // Function called when token refresh fails, passing error information
}> = [];

/**
 * When token refresh succeeds, notify all waiting subscribers.
 * Iterate through all subscribers, call their resolve methods, and pass the new token.
 * Then clear the subscriber list, preparing for the next token refresh.
 *
 * @param token Refreshed token string
 */
function onRefreshed(token: string) {
	refreshSubscribers.forEach(subscriber => subscriber.resolve(token));
	refreshSubscribers = []; // Clear subscriber list
}

/**
 * When token refresh fails, notify all waiting subscribers.
 * Iterate through all subscribers, call their reject methods, and pass the error information.
 * Then clear the subscriber list.
 *
 * @param error Error information when refresh fails
 */
function onRefreshFailed(error: any) {
	refreshSubscribers.forEach(subscriber => subscriber.reject(error));
	refreshSubscribers = []; // Clear subscriber list
}

/**
 * Add a new subscriber to the list.
 * Subscriber object should contain resolve and reject methods.
 *
 * @param subscriber Subscriber object, contains resolve and reject methods
 */
function addRefreshSubscriber(subscriber: {
	resolve: (token: string) => void // Function called when token refresh succeeds
	reject: (error: any) => void // Function called when token refresh fails
}) {
	refreshSubscribers.push(subscriber); // Add the new subscriber to the list
}
