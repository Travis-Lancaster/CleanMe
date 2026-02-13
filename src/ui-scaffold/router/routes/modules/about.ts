import type { AppRouteRecordRaw } from "#src/ui-scaffold/router/types";
import ContainerLayout from "#src/ui-scaffold/layout/container-layout";
import { $t } from "#src/ui-scaffold/locales";
import { about } from "#src/ui-scaffold/router/extra-info";

import { lazy } from "react";

const About = lazy(() => import("#src/ui-scaffold/pages/about"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		Component: ContainerLayout,
		handle: {
			order: about,
			title: $t("common.menu.about"),
			icon: "CopyrightOutlined",
		},
		children: [
			{
				index: true,
				Component: About,
				// lazy: async () => {
				// 	const About = await import("#src/ui-scaffold/pages/about");
				// 	return { Component: About.default };
				// },
				handle: {
					// roles: ["common"],
					title: $t("common.menu.about"),
					icon: "CopyrightOutlined",
				},
			},
		],
	},
];

export default routes;
