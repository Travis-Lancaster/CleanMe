import type { UserInfoType } from "#src/app/api/user/types";
import { fetchUserInfo } from "#src/app/api/user";
import { getAppNamespace } from "#src/app/utils/get-app-namespace";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
	id: "",
	avatar: "",
	username: "",
	email: "",
	phoneNumber: "",
	description: "",
	roles: [],
	// menus: [],
};

type UserState = UserInfoType;

interface UserAction {
	setUserFromLogin: (userData: { userNm: string, displayName: string, roles: string[] }) => UserInfoType
	getUserInfo: () => Promise<UserInfoType>
	reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	persist(set => ({
		...initialState,

		/**
		 * Populate user store from login response data
		 * This is the primary method for setting user data after login
		 * @param userData - User data from login response
		 * @returns Populated user info
		 */
		setUserFromLogin: (userData: { userNm: string, displayName: string, roles: string[] }) => {
			const userInfo: UserInfoType = {
				id: userData.userNm, // Use userNm as ID
				avatar: "",
				username: userData.userNm,
				email: "",
				phoneNumber: "",
				description: userData.displayName || "",
				roles: userData.roles || [],
			};
			set(userInfo);
			return userInfo;
		},

		/**
		 * @deprecated This method calls the user-info endpoint which may not exist
		 * Use setUserFromLogin() instead to populate from login response
		 */
		getUserInfo: async () => {
			const response = await fetchUserInfo();
			const userData: UserInfoType = {
				id: (response.result as any).id || "",
				avatar: (response.result as any).avatar || "",
				username: (response.result as any).userNm || (response.result as any).username || "",
				email: (response.result as any).email || "",
				phoneNumber: (response.result as any).phoneNumber || "",
				description: (response.result as any).description || "",
				roles: (response.result as any).roles || [],
			};
			set(userData);
			return userData;
		},

		reset: () => {
			return set({
				...initialState,
			});
		},

	}), { name: getAppNamespace("user-info") }),

);
