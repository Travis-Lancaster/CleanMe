import type { AppRouteRecordRaw } from "#src/app/router/types";
import ContainerLayout from "#src/app/layout/container-layout";
import { system } from "#src/app/router/extra-info";

import { lazy } from "react";

const User = lazy(() => import("#src/app/pages/system/user"));
const Dept = lazy(() => import("#src/app/pages/system/dept"));
const Role = lazy(() => import("#src/app/pages/system/role"));
const Menu = lazy(() => import("#src/app/pages/system/menu"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/system",
		Component: ContainerLayout,
		handle: {
			icon: "SettingOutlined",
			title: "common.menu.system",
			order: system,
			roles: ["admin"],
		},
		children: [
			{
				path: "/system/user",
				Component: User,
				handle: {
					icon: "UserOutlined",
					title: "common.menu.user",
					roles: ["admin"],
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
			{
				path: "/system/role",
				Component: Role,
				handle: {
					icon: "TeamOutlined",
					title: "common.menu.role",
					roles: ["admin"],
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
			{
				path: "/system/menu",
				Component: Menu,
				handle: {
					icon: "MenuOutlined",
					title: "common.menu.menu",
					roles: ["admin"],
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
			{
				path: "/system/dept",
				Component: Dept,
				handle: {
					keepAlive: false,
					icon: "ApartmentOutlined",
					title: "common.menu.dept",
					roles: ["admin"],
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
		],
	},
];

export default routes;
