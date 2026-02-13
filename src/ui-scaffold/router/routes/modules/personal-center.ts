import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";
import ContainerLayout from "#src/ui-scaffold/layout/container-layout";
import { $t } from "#src/ui-scaffold/locales";
import { personalCenter } from "#src/ui-scaffold/router/extra-info";

import { lazy } from "react";

const MyProfile = lazy(() => import("#src/ui-scaffold/pages/personal-center/my-profile"));
const Settings = lazy(() => import("#src/ui-scaffold/pages/personal-center/settings"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/personal-center",
		Component: ContainerLayout,
		handle: {
			order: personalCenter,
			title: $t("common.menu.personalCenter"),
			icon: "RiAccountCircleLine",
		},
		children: [
			{
				path: "/personal-center/my-profile",
				Component: MyProfile,
				handle: {
					title: $t("common.menu.profile"),
					icon: "ProfileCardIcon",
				},
			},
			{
				path: "/personal-center/settings",
				Component: Settings,
				handle: {
					title: $t("common.menu.settings"),
					icon: "RiUserSettingsLine",
				},
			},
		],
	},
];

export default routes;
