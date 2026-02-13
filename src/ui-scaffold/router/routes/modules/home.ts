import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";
import ContainerLayout from "#src/ui-scaffold/layout/container-layout";

import { $t } from "#src/ui-scaffold/locales";
import { home } from "#src/ui-scaffold/router/extra-info";
import { lazy } from "react";

const Home = lazy(() => import("#src/ui-scaffold/pages/home"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: "HomeOutlined",
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"),
					icon: "HomeOutlined",
				},
			},
		],
	},
];

export default routes;
