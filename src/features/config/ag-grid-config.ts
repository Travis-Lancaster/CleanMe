import { themeBalham } from "ag-grid-enterprise";

/**
 * Centralized AG Grid Theme Configuration
 *
 * Provides consistent theming across all AG Grid components in the application.
 * Integrates with Material-UI color palette for visual consistency.
 */

// Light theme configuration integrated with Material-UI color palette
export const lightGridTheme = themeBalham.withParams({
	pinnedRowBorder: {
		width: 2,
		color: "#1890ff", // Blue border for pinned rows
	},
	pinnedRowBackgroundColor: "#e6f4ff", // Light blue background for pinned rows

	backgroundColor: "#ffffff",
	browserColorScheme: "light",
	chromeBackgroundColor: "#f5f5f5", // Material-UI grey.100
	accentColor: "#1976d2", // Material-UI primary blue
	foregroundColor: "#212121", // Material-UI grey.900
	headerFontSize: 14,
	headerVerticalPaddingScale: 0.8,
	rowVerticalPaddingScale: 0.8,
	// Row styling for better readability
	oddRowBackgroundColor: "#fafafa", // Material-UI grey.50
	// Interactive states
	rowHoverColor: "#e3f2fd", // Material-UI blue.50
	selectedRowBackgroundColor: "#bbdefb", // Material-UI blue.200
	// Border and header styling
	borderColor: "#e0e0e0", // Material-UI grey.300
	headerBackgroundColor: "#f5f5f5", // Material-UI grey.100
	headerTextColor: "#424242", // Material-UI grey.700
	rowBorder: { color: "#e0e0e0" }, // style: 'dashed',
	columnBorder: { color: "#e0e0e0" },
});

// Future: Dark theme configuration (placeholder)
export const darkGridTheme = themeBalham.withParams({
	pinnedRowBorder: {
		width: 2,
		color: "#1890ff", // Blue border for pinned rows
	},
	pinnedRowBackgroundColor: "#e6f4ff", // Light blue background for pinned rows (dark theme)
	backgroundColor: "#1e1e1e",
	browserColorScheme: "dark",
	chromeBackgroundColor: "#2d2d2d",
	accentColor: "#90caf9", // Material-UI blue.200
	foregroundColor: "#ffffff",
	headerFontSize: 14,
	headerVerticalPaddingScale: 0.8,
	rowVerticalPaddingScale: 0.8,
	oddRowBackgroundColor: "#252525",
	rowHoverColor: "#1565c0",
	selectedRowBackgroundColor: "#0d47a1",
	borderColor: "#424242",
	headerBackgroundColor: "#2d2d2d",
	headerTextColor: "#ffffff",
});
// Default theme export for backward compatibility
export const defaultGridTheme = lightGridTheme;
/**
 * Material-UI Color Palette Reference
 *
 * Primary: #1976d2 (blue.600)
 * Secondary: #dc004e (pink.600)
 * Grey.50: #fafafa
 * Grey.100: #f5f5f5
 * Grey.300: #e0e0e0
 * Grey.700: #424242
 * Grey.900: #212121
 * Blue.50: #e3f2fd
 * Blue.200: #bbdefb
 */

export function getCommonGridProps() {
	return {
		theme: defaultGridTheme,
		defaultColDef: globalDefaultColDef,
		animateRows: true,

	};
}

export const globalDefaultColDef = {
	// Don't use flex by default - let columns define their own width
	// flex: 1, // Removed - this prevents horizontal scrolling
	minWidth: 100, // Minimum width for columns
	sortable: false,
	resizable: true,
	filter: true,
	floatingFilter: true,
};
