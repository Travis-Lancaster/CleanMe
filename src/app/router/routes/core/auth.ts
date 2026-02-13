import type { AppRouteRecordRaw } from "#src/app/router/types";

import { $t } from "#src/app/locales";
import { loginPath } from "#src/app/router/extra-info";

import { lazy } from "react";

const Login = lazy(() => import("#src/app/pages/login"));

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
