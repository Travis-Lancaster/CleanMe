import type { ReactNode } from "react";

import { usePreferences } from "#src/app/hooks/use-preferences";
import { ConfigProvider, theme } from "antd";
import { useContext } from "react";
import { ThemeProvider } from "react-jss";

/**
 * Custom JSS theme provider component
 */
export interface JSSThemeProviderProps {
	/**
	 * Children components, which will receive the JSS theme
	 */
	children: ReactNode
}

const { useToken } = theme;

/**
 * JSSThemeProvider component, used to pass Ant Design tokens and global theme state to child components
 *
 * @param {JSSThemeProviderProps} props Component properties
 * @returns {JSX.Element} Returns the JSX element
 */
export function JSSThemeProvider({ children }: JSSThemeProviderProps) {
	const antdContext = useContext(ConfigProvider.ConfigContext);
	const prefixCls = antdContext.getPrefixCls();
	const { token } = useToken();
	const { theme, isDark, isLight } = usePreferences();

	return (
		<ThemeProvider theme={{ token, theme, isDark, isLight, prefixCls }}>
			{children}
		</ThemeProvider>
	);
}
