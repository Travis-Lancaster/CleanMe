/**
 * Determine if the current theme is a light theme
 *
 * @param theme Theme name, can be "light" (light), "dark" (dark) or "auto" (automatic)
 * @returns Returns true if the current theme is light theme; otherwise returns false
 */
export function isLightTheme(theme: string) {
	let light = theme === "light";
	if (theme === "auto") {
		light = window.matchMedia("(prefers-color-scheme: light)").matches;
	}
	return light;
}
