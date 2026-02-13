import type { GlobalToken } from "antd";

import { baseColorPalettes, neutralColors, prefix, productLevelColorSystem } from "./constants";

/**
 * Convert hexadecimal color value to RGB color value, because hexadecimal color values do not support transparency in Tailwind, for example cannot use bg-blue-500/20
 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
export function hexToRGB(hex: string) {
	// Remove any existing # symbol
	hex = hex.replace("#", "");

	// Get R, G, B values
	const r = Number.parseInt(hex.substring(0, 2), 16);
	const g = Number.parseInt(hex.substring(2, 4), 16);
	const b = Number.parseInt(hex.substring(4, 6), 16);

	return `${r} ${g} ${b}`;
}

// Determine if it is an RGB color value
export function isRGBColor(color: string) {
	return color.trim().startsWith("rgb");
}

export function getCSSVariablesByTokens(tokens: GlobalToken) {
	return Object.entries(tokens)
		.reduce((acc, [key, value]): string => {
			// Functional color system, excluding neutral color system
			if (productLevelColorSystem.includes(key)) {
				const rgb = hexToRGB(value);
				return `${acc}--${prefix}-${key}:${rgb};`;
			}

			// Neutral color system
			if (neutralColors.includes(key)) {
				// If the color value is in RGB format, use it directly
				const rgb = isRGBColor(value) ? value : `rgb(${hexToRGB(value)})`;
				return `${acc}--${prefix}-${key}:${rgb};`;
			}
			// Color palette
			return baseColorPalettes.includes(key) ? `${acc}--${prefix}-${key}:${hexToRGB(value)};` : acc;
		}, "");
}
