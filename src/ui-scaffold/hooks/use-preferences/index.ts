import { useMemo } from "react";
import { DEFAULT_PREFERENCES, usePreferencesStore } from "../../store";

import { isDarkTheme, isLightTheme } from "../../utils";

/**
 * Wrap user preference settings parameters that don't need to be stored in localStorage, but variables for convenience can appear here.
 *
 * @returns Returns an object containing user preference settings, including theme, whether it's default settings, whether it's dark theme, whether it's light theme
 */
export function usePreferences() {
	const preferences = usePreferencesStore();
	const { theme } = preferences;

	// Whether it is the default user preference setting
	const isDefault = useMemo(() => {
		return Object.entries(DEFAULT_PREFERENCES).every(([key, value]) => {
			return preferences[key as keyof typeof preferences] === value;
		});
	}, [preferences]);

	return {
		...preferences,
		isDefault,
		isDark: isDarkTheme(theme),
		isLight: isLightTheme(theme),
	};
}
