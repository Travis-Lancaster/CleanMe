import type { ReactNode } from "react";

import { StaticAntd } from "#src/ui-scaffold/utils/static-antd";
import { theme as antdTheme, App } from "antd";
import { useEffect } from "react";
import { setupAntdThemeTokensToHtml } from "./setup-antd-theme";

export interface AntdAppProps {
	children: ReactNode
}

export function AntdApp({ children }: AntdAppProps) {
	const { token: antdTokens } = antdTheme.useToken();

	useEffect(() => {
		/* Print to view supported tokens */
		// console.log("antdTokens", antdTokens);
		setupAntdThemeTokensToHtml(antdTokens);
	}, [antdTokens]);

	return (
		<App className="h-full">
			<StaticAntd />
			{children}
		</App>
	);
}
