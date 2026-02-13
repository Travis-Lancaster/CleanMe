import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";
import { $t } from "#src/ui-scaffold/locales";

import { lazy } from "react";
import { Outlet } from "react-router";

const TermsOfService = lazy(() => import("#src/ui-scaffold/pages/terms-of-service"));

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
