import type { TFunction } from "i18next";

/**
 * @description: Configuration items
 */
export const TOKEN = "admin_token"; // token name
export const LANG = "lang"; // language
export const EMPTY_VALUE = "-"; // empty value display

// Common component default values
export const MAX_TAG_COUNT = "responsive"; // maximum number of tags to display, responsive: adaptive

// Date formatting
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";

// Initialize pagination data
export const INITIAL_PAGINATION = {
	current: 1,
	pageSize: 20,
};

// Offline-first cache configuration
export const CACHE_CONFIG = {
	// Cache timeout in milliseconds (50 seconds)
	cacheTimeoutExpiry: 50000,
	// Max retry attempts for failed sync operations
	maxRetryAttempts: 5,
	// Exponential backoff delays (ms): 1s, 2s, 4s, 8s, 16s, 60s
	retryDelays: [1000, 2000, 4000, 8000, 16000, 60000],
};

// Add/edit title
export const ADD_TITLE = (t: TFunction, title?: string) => t("public.createTitle", { title: title ?? "" });
export const EDIT_TITLE = (t: TFunction, name: string, title?: string) => `${t("public.editTitle", { title: title ?? "" })}${name ? `(${name})` : ""}`;
