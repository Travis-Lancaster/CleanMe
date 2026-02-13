import type { AppRouteRecordRaw } from "#src/app/router/types";
import ContainerLayout from "#src/app/layout/container-layout";

import { $t } from "#src/app/locales";
import { home } from "#src/app/router/extra-info";
import { lazy } from "react";

const Home = lazy(() => import("#src/app/pages/home"));

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
