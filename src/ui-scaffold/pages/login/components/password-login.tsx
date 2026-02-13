import type { LoginInfo } from "#src/ui-scaffold/api/user";
import { BasicButton } from "#src/ui-scaffold/components/basic-button";
import { PASSWORD_RULES, USERNAME_RULES } from "#src/ui-scaffold/constants/rules";
import { useAuthStore } from "#src/ui-scaffold/store/auth";

import {
	Button,
	Form,
	Input,
	message,
	Space,
} from "antd";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { FormModeContext } from "../form-mode-context";

const FORM_INITIAL_VALUES: LoginInfo = {
	userNm: "johnDoe",
	password: "Password1234",
};

export function PasswordLogin() {
	const [loading, setLoading] = useState(false);
	const [passwordLoginForm] = Form.useForm();
	const { t } = useTranslation();
	const [messageLoadingApi, contextLoadingHolder] = message.useMessage();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const login = useAuthStore(state => state.login);
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async (values: LoginInfo) => {
		setLoading(true);
		messageLoadingApi?.loading(t("authority.loginInProgress"), 0);
		try {
			await login(values);
			messageLoadingApi?.destroy();
			window.$message?.success(t("authority.loginSuccess"));

			const redirect = searchParams.get("redirect");
			if (redirect) {
				navigate(`/${redirect.slice(1)}`);
			}
			else {
				navigate(import.meta.env.VITE_BASE_HOME_PATH);
			}
		}
		catch (error: any) {
			messageLoadingApi?.destroy();

			// Extract error message from different error formats
			let errorMessage = t("authority.loginFailed");

			if (error?.error?.error?.message) {
				errorMessage = error.error.error.message;
			}
			else if (error?.data?.message) {
				errorMessage = error.data.message;
			}
			else if (error?.message) {
				errorMessage = error.message;
			}
			else if (error?.error?.message) {
				errorMessage = error.error.message;
			}

			// Check for specific error types
			if (error?.status === 401 || error?.error?.status === 401) {
				errorMessage = t("authority.invalidCredentials") || "Invalid username or password";
			}
			else if (!navigator.onLine) {
				errorMessage = t("authority.networkError") || "Network error. Please check your connection.";
			}

			window.$message?.error(errorMessage);
			console.error("Login error:", error);
		}
		finally {
			// Prevent multiple requests from being made by clicking the login button
			setTimeout(() => {
				window.$message?.destroy();
				setLoading(false);
			}, 1000);
		}
	};

	return (
		<>
			{contextLoadingHolder}
			<Space direction="vertical">
				<h2 className="text-colorText mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
					{t("authority.welcomeBack")}
					&nbsp;
					👏
				</h2>
				<p className="lg:text-base text-sm text-colorTextSecondary">
					{t("authority.loginDescription")}
				</p>
			</Space>

			<Form
				name="passwordLoginForm"
				form={passwordLoginForm}
				layout="vertical"
				initialValues={FORM_INITIAL_VALUES}
				onFinish={handleFinish}
			>
				<Form.Item
					label={t("authority.username")}
					name="userNm"
					rules={USERNAME_RULES(t)}
				>
					<Input placeholder={t("form.username.required")} />
				</Form.Item>

				<Form.Item
					label={t("authority.password")}
					name="password"
					rules={PASSWORD_RULES(t)}
				>
					<Input.Password placeholder={t("form.password.required")} />
				</Form.Item>

				<Form.Item>
					<div className="flex justify-between mb-5 -mt-1 text-sm">
						<BasicButton
							type="link"
							className="p-0"
							onPointerDown={() => {
								setFormMode("codeLogin");
							}}
						>
							{t("authority.codeLogin")}
						</BasicButton>
						<BasicButton
							type="link"
							className="p-0"
							onPointerDown={() => {
								setFormMode("forgotPassword");
							}}
						>
							{t("authority.forgotPassword")}
						</BasicButton>
					</div>
					<Button block type="primary" htmlType="submit" loading={loading}>
						{t("authority.login")}
					</Button>
				</Form.Item>

				<div className="text-sm text-center">
					{t("authority.noAccountYet")}
					<BasicButton
						type="link"
						className="px-1"
						onPointerDown={() => {
							setFormMode("register");
						}}
					>
						{t("authority.goToRegister")}
					</BasicButton>
				</div>
			</Form>
		</>
	);
}
