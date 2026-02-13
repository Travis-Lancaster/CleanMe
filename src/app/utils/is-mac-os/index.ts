/**
 * Check if the current runtime environment is macOS.
 *
 * Determine the current runtime environment by checking the navigator.userAgent string.
 */
export function isMacOs() {
	const macRegex = /macintosh|mac os x/i;
	return macRegex.test(navigator.userAgent);
}
