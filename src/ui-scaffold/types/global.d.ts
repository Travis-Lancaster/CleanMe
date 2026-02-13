import type { dependencies, devDependencies } from "#package.json";

import type { ThemeType } from "#src/ui-scaffold/store";
import type { GlobalToken } from "antd";

declare global {
	const __APP_INFO__: {
		pkg: {
			name: string
			version: string
			license: string
			author: string
			dependencies: typeof dependencies
			devDependencies: typeof devDependencies
		}
		lastBuildTime: string
	};

	/* Inspired by https://github.com/soybeanjs/soybean-admin/blob/v1.3.8/src/typings/global.d.ts */
	interface Window {
		/** ant design message instance */
		$message?: import("antd/es/message/interface").MessageInstance
		/** ant design modal instance */
		$modal?: Omit<import("antd/es/modal/confirm").ModalStaticFunctions, "warn">
		/** ant design notification instance */
		$notification?: import("antd/es/notification/interface").NotificationInstance
	}

	/**
	 * @description Enhances the default theme for JSS
	 * @see https://github.com/cssinjs/jss/blob/master/docs/react-jss-ts.md#defining-a-global-default-theme
	 */
	namespace Jss {
		/**
		 * @en Theme interface, containing theme-related properties and dark/light theme checks
		 */
		export interface Theme {
			/**
			 * @en The current theme type of the application, which can be "dark", "light", or an empty string
			 */
			theme: ThemeType

			/**
			 * @en antd style token
			 */
			token: GlobalToken

			/**
			 * @en Indicates whether the current theme is dark. True if the theme is "dark", otherwise false.
			 */
			isDark: boolean

			/**
			 * @en Indicates whether the current theme is light. True if the theme is "light", otherwise false.
			 */
			isLight: boolean
			/**
			 * @en Component class name prefix
			 * @default "ant"
			 */
			prefixCls: string
		}
	}
}
