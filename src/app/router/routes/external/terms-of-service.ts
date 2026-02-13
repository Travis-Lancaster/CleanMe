import type { AppRouteRecordRaw } from "#src/app/router/types";
import { $t } from "#src/app/locales";

import { lazy } from "react";
import { Outlet } from "react-router";

const TermsOfService = lazy(() => import("#src/app/pages/terms-of-service"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/terms-of-service",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.termsOfService"),
		},
		children: [
			{
				index: true,
				Component: TermsOfService,
				handle: {
					title: $t("authority.termsOfService"),
				},
			},
		],
	},
];

export default routes;
