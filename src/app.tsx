import "dayjs/locale/en-ca";

// import { ANT_DESIGN_LOCALE } from "#src/locales";
// import { AntdApp } from "#src/components/antd-app";
// import { AppVersionMonitor } from "#src/layout/widgets/version-monitor";
// import { JSSThemeProvider } from "#src/components/jss-theme-provider";
// import { RouterProvider } from "react-router/dom";
// import { StyleProvider } from "@ant-design/cssinjs";
import { AllEnterpriseModule, LicenseManager, ModuleRegistry } from "ag-grid-enterprise";
// Offline-first sync imports
// import { useSyncLifecycle } from "./data/hooks/useSyncLifecycle";
import { AntdApp, JSSThemeProvider } from "./ui-scaffold/components";
import { ConfigProvider, theme as antdTheme } from "antd";
import { Suspense, useCallback, useEffect } from "react";
import { customAntdDarkTheme, customAntdLightTheme } from "./ui-scaffold/styles/theme/antd/antd-theme";
import { usePreferences, useScrollToHash } from "./ui-scaffold/hooks";

import { ANT_DESIGN_LOCALE } from "./ui-scaffold/locales";
import { AppVersionMonitor } from "./ui-scaffold/layout";
import { RouterProvider } from "react-router";
import dayjs from "dayjs";
import router from "./ui-scaffold/router";
// import dayjs from "dayjs";
// import { router } from "./router";
// import { usePreferences } from "#src/hooks/use-preferences";
// import { useScrollToHash } from "#src/hooks/use-scroll-to-hash";
import { useTranslation } from "react-i18next";

// import { ConflictResolver } from "./data/components/ConflictResolver";


// import { customAntdDarkTheme, customAntdLightTheme } from "./styles/theme/antd/antd-theme";

// Register AG Grid modules at module level (before any components render)
console.log("� [AG Grid] Registering modules at module level");
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Set AG Grid license
LicenseManager.setLicenseKey(
	"[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-119070}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{25 February 2026}____[v3]_[0102]_MTc3MTk3NzYwMDAwMA==1e514ef251dc0fb0c4feb7262e1ea8df",
);

export default function App() {
	console.log("[APP] � App component rendering");

	// Initialize offline-first sync lifecycle
	// This must be called at the root level to manage:
	// - Auth token changes
	// - Sync connection lifecycle
	// - Local change tracking
	// - Storage quota monitoring
	// useSyncLifecycle();

	const { i18n } = useTranslation();
	const {
		language,
		isDark,
		theme,
		themeColorPrimary,
		colorBlindMode,
		colorGrayMode,
		themeRadius,
		changeSiteTheme,

		enableCheckUpdates,
		checkUpdatesInterval,
		sideCollapsedWidth,
	} = usePreferences();

	useScrollToHash();

	/**
	 * ant design internationalization
	 * @link https://ant.design/docs/react/i18n
	 */
	const getAntdLocale = () => {
		return ANT_DESIGN_LOCALE[language as keyof typeof ANT_DESIGN_LOCALE];
	};

	/**
	 * day.js internationalization
	 * @link https://day.js.org/docs/en/installation/installation
	 */
	useEffect(() => {
		if (language === "en-US") {
			dayjs.locale("en");
		}
		else if (language === "zh-CN") {
			dayjs.locale("zh-cn");
		}
	}, [language]);

	/**
	 * react-i18next internationalization
	 * @link https://www.i18next.com/overview/api#changelanguage
	 */
	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language, i18n.changeLanguage]);

	/**
	 * Change theme when the system theme changes
	 */
	const setEmulateTheme = useCallback(
		// eslint-disable-next-line unused-imports/no-unused-vars
		(dark?: boolean) => {
			changeSiteTheme("auto");
		},
		[changeSiteTheme],
	);

	/**
	 * Watch system theme change
	 */
	useEffect(() => {
		if (theme === "auto") {
			// https://developer.chrome.com/docs/devtools/rendering/emulate-css/
			const darkModeMediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)",
			);

			function matchMode(e: MediaQueryListEvent) {
				setEmulateTheme(e.matches);
			}

			setEmulateTheme(darkModeMediaQuery.matches);
			darkModeMediaQuery.addEventListener("change", matchMode);
			return () => {
				darkModeMediaQuery.removeEventListener("change", matchMode);
			};
		}
	}, [theme, setEmulateTheme]);

	/**
	 * Update page color mode (gray, color blind)
	 */
	const updateColorMode = () => {
		const dom = document.documentElement;
		const COLOR_BLIND = "color-blind-mode";
		const COLOR_GRAY = "gray-mode";
		colorBlindMode
			? dom.classList.add(COLOR_BLIND)
			: dom.classList.remove(COLOR_BLIND);
		colorGrayMode
			? dom.classList.add(COLOR_GRAY)
			: dom.classList.remove(COLOR_GRAY);
	};

	useEffect(() => {
		updateColorMode();
	}, [colorBlindMode, colorGrayMode]);

	/**
	 * Initialize lookup cache on app startup
	 * Loads cached data from Dexie if user is logged in
	 */
	useEffect(() => {
		console.log("[APP] � App component mounted and ready");
		console.log("[APP] � Router and providers initialized");
	}, []);

	console.log("[APP] � Rendering RouterProvider");

	return (
		<ConfigProvider
			input={{ autoComplete: "off" }}
			locale={getAntdLocale()}
			theme={{
				cssVar: true,
				hashed: false,
				algorithm:
					isDark
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
				...(isDark ? customAntdDarkTheme : customAntdLightTheme),
				token: {
					...(isDark ? customAntdDarkTheme.token : customAntdLightTheme.token),
					borderRadius: themeRadius,
					colorPrimary: themeColorPrimary,
				},
				components: {
					...(isDark ? customAntdDarkTheme.components : customAntdLightTheme.components),
					Menu: {
						darkItemBg: "#141414",
						itemBg: "#fff",
						...(isDark
							? customAntdDarkTheme.components?.Menu
							: customAntdLightTheme.components?.Menu),
						collapsedWidth: sideCollapsedWidth,
					},
				},
			}}
		>
			<AntdApp>
				<JSSThemeProvider>
					<Suspense fallback={null}>
						{enableCheckUpdates ? <AppVersionMonitor checkUpdatesInterval={checkUpdatesInterval} /> : null}
						<RouterProvider router={router} />

						{/* Conflict resolver modal - shows when sync conflicts occur <ConflictResolver /> */}

					</Suspense>
				</JSSThemeProvider>
			</AntdApp>
		</ConfigProvider>
	);
}
