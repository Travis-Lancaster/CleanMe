import type { AppRouteRecordRaw } from "#src/app/router/types";
import type { LoginInfo, LoginResponse, UserInfoType } from "./types";

import { request } from "#src/app/utils/request";
import { REFRESH_TOKEN_PATH } from "#src/app/utils/request/constants";

export * from "./types";

export function fetchLogin(data: LoginInfo) {
	return request
		.post("auth/login", { json: data })
		.json<LoginResponse>();
}

export function fetchLogout() {
	return request.post("auth/logout").json();
}

export function fetchAsyncRoutes() {
	return request.get("get-async-routes").json<ApiResponse<AppRouteRecordRaw[]>>();
}

/**
 * @deprecated This endpoint may not exist on the backend
 * User information is now retrieved from the login response
 * Use the setUserFromLogin method in the user store instead
 */
export function fetchUserInfo() {
	return request.get("user-info").json<ApiResponse<UserInfoType>>();
}

export interface RefreshTokenResult {
	token: string
	refreshToken: string
}

export function fetchRefreshToken(data: { readonly refreshToken: string }) {
	return request.post(REFRESH_TOKEN_PATH, { json: data }).json<ApiResponse<RefreshTokenResult>>();
}
