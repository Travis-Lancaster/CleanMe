import { AppRouteRecordRaw } from "../../types";
// import type { AppRouteRecordRaw } from "#src/router/types";
// import { ContainerLayout } from "#src/layout";
import { ContainerLayout } from "#src/ui-scaffold/layout/index.js";
import { DrillHoleDataLayout } from "#src/ux/pages/drill-hole-data/DrillHoleDataLayout.js";
import { lazy } from "react";

// const DrillHoleDataLayout = lazy(() => import("#src/ux/pages/drill-hole-data/DrillHoleDataLayout.js"));
//
const routes: AppRouteRecordRaw[] = [
	{
		path: "/drill-hole-data",
		Component: ContainerLayout,
		handle: {
			icon: "TableOutlined",
			title: "Drill Hole Data",
			// hideInMenu: false, // Show in menu for easy access
		},
		children: [
			{
				path: "/drill-hole-data/:drillPlanId",
				Component: DrillHoleDataLayout,
				handle: {
					icon: "TableOutlined",
					title: "Drill Hole Data",
				},
			},
		],
	},
];

export default routes;
