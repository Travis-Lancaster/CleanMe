import type { AppRouteRecordRaw } from "#src/app/router/types";
import ContainerLayout from "#src/app/layout/container-layout";
import { $t } from "#src/app/locales";
import { about } from "#src/app/router/extra-info";

import { lazy } from "react";

const About = lazy(() => import("#src/app/pages/about"));

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
				// 	const About = await import("#src/app/pages/about");
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
