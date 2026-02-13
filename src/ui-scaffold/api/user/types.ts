import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";

/**
 * Authentication response from backend - returned from login endpoint
 * Contains tokens and embedded user data
 */
export interface LoginResponse {
	accessToken: string
	refreshToken: string
	user: {
		userNm: string
		displayName: string
		roles: string[]
	}
}

/**
 * Authentication state stored in the app
 * Uses 'token' internally for consistency with existing code
 */
export interface AuthType {
	token: string
	refreshToken: string
}

/**
 * Login request payload
 * Note: Backend expects 'userNm' field, not 'username'
 */
export interface LoginInfo {
	userNm: string
	password: string
}

/**
 * User information type used internally in the app
 * Populated from login response, not from a separate user-info endpoint
 */
export interface UserInfoType {
	id: string
	avatar: string
	username: string
	email: string
	phoneNumber: string
	description: string
	roles: Array<string>
	// Routes can be dynamically added here
	menus?: AppRouteRecordRaw[]
}

export interface AuthListProps {
	label: string
	name: string
	auth: string[]
}
