/**
 * Check if the current runtime environment is Windows OS.
 *
 * Determine the current runtime environment by checking the navigator.userAgent string.
 */
export function isWindowsOs() {
	const windowsRegex = /windows|win32/i;
	return windowsRegex.test(navigator.userAgent);
}
