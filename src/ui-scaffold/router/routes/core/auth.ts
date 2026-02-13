import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";

import { $t } from "#src/ui-scaffold/locales";
import { loginPath } from "#src/ui-scaffold/router/extra-info";

import { lazy } from "react";

const Login = lazy(() => import("#src/ui-scaffold/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: loginPath,
		Component: Login,
		handle: {
			hideInMenu: true,
			title: $t("authority.login"),
		},
	},
];

export default routes;
