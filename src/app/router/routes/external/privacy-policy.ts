import type { AppRouteRecordRaw } from "#src/app/router/types";
import { $t } from "#src/app/locales";

import { lazy } from "react";
import { Outlet } from "react-router";

const PrivacyPolicy = lazy(() => import("#src/app/pages/privacy-policy"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/privacy-policy",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.privacyPolicy"),
		},
		children: [
			{
				index: true,
				Component: PrivacyPolicy,
				handle: {
					title: $t("authority.privacyPolicy"),
				},
			},
		],
	},
];

export default routes;
