import type { ButtonProps } from "antd";
import { BasicButton } from "#src/app/components/basic-button/index.js";
import { useDeviceType, usePreferences } from "#src/app/hooks";
import { loginPath } from "#src/app/router/extra-info";

import { useAuthStore } from "#src/app/store/auth.js";
import { usePreferencesStore } from "#src/app/store/preferences/index.js";
import { CopyOutlined, RedoOutlined, RocketOutlined, SettingOutlined } from "@ant-design/icons";
import { theme as antdTheme, Badge, ConfigProvider, Divider, Drawer, FloatButton } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
	Animation,
	BuiltinTheme,
	General,
	PreferencesFooter,
	PreferencesLayout,
	Sidebar,
	SiteTheme,
	Tabbar,
} from "./blocks";

const preferencesContentId = "__b2-gold__preferences_drawer__";
export function Preferences({ ...restProps }: ButtonProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { isMobile } = useDeviceType();
	const { reset, isDefault, isDark } = usePreferences();
	const preferences = usePreferencesStore();
	const logout = useAuthStore(state => state.logout);

	const clearAndLogout = async () => {
		await logout();
		usePreferencesStore.persist.clearStorage();
		navigate(loginPath);
	};

	const handleCopyPreferences = async () => {
		const data = JSON.stringify(preferences, null, 2);
		await navigator.clipboard.writeText(data);
		window.$modal?.success?.({
			title: t("preferences.copyPreferencesSuccessTitle"),
			content: t("preferences.copyPreferencesSuccess"),
		});
	};

	return (
		<>
			<BasicButton
				type="text"
				{...restProps}
				onClick={(e) => {
					restProps?.onClick?.(e);
					setIsOpen(true);
				}}
			>
				<SettingOutlined />
			</BasicButton>
			<ConfigProvider
				theme={{
					/**
					 * When sidebar is in dark mode and using top navigation or mixed navigation,
					 * it affects the styling of components below, so reset the algorithm here
					 */
					algorithm: isDark
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
				}}
			>

				<Drawer
					title={t("preferences.title")}
					placement="right"
					onClose={() => {
						setIsOpen(false);
					}}
					extra={(
						<Badge
							style={{ width: 8, height: 8 }}
							dot={!isDefault}
							color="blue"
							offset={[-5, 5]}
						>
							<BasicButton
								onPointerDown={() => !isDefault && reset()}
								type="text"
								icon={<RedoOutlined rotate={270} />}
							/>
						</Badge>
					)}
					footer={(
						<div className="flex justify-between">
							<BasicButton
								icon={<CopyOutlined rotate={180} />}
								onPointerDown={handleCopyPreferences}
							>
								{t("preferences.copyPreferences")}
							</BasicButton>
							<BasicButton
								type="text"
								onPointerDown={clearAndLogout}
							>
								{t("preferences.clearAndLogout")}
							</BasicButton>
						</div>
					)}
					{...(isMobile
						? {
							width: "100vw",
						}
						: {})}
					open={isOpen}
					id={preferencesContentId}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Divider>{t("preferences.general.title")}</Divider>
						<General />
						<Divider>{t("preferences.theme.title")}</Divider>
						<SiteTheme />
						<Divider>{t("preferences.theme.builtin.title")}</Divider>
						<BuiltinTheme />
						<Divider>{t("preferences.layout.title")}</Divider>
						<PreferencesLayout />
						<Divider>{t("preferences.sidebar.title")}</Divider>
						<Sidebar />
						<Divider>{t("preferences.tabbar.title")}</Divider>
						<Tabbar />
						<Divider>{t("preferences.animation.title")}</Divider>
						<Animation />
						<Divider>{t("preferences.footer.title")}</Divider>
						<PreferencesFooter />
					</div>
					<FloatButton.BackTop
						icon={<RocketOutlined />}
						target={() => document.querySelector(`#${preferencesContentId} .ant-drawer-body`) as HTMLElement}
					/>
				</Drawer>
			</ConfigProvider>
		</>
	);
}
