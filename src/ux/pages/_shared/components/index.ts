/**
 * Shared Components Exports
 *
 * Reusable components that can be used across all modules
 */

// Empty States
export {
	EmptyDataState,
	EmptyFilterResults,
	EmptySearchResults,
	EmptyState,
} from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";

// Error Handling
export { ErrorBoundary } from "./ErrorBoundary";
export type { ErrorBoundaryProps } from "./ErrorBoundary";

// Loading States
export {
	InlineSpinner,
	LoadingOverlay,
	LoadingSpinner,
} from "./LoadingSpinner";
export type { LoadingSpinnerProps } from "./LoadingSpinner";

// Status Displays
export {
	ActiveBadge,
	ErrorBadge,
	InactiveBadge,
	PendingBadge,
	ProcessingBadge,
	StatusBadge,
	SuccessBadge,
	WarningBadge,
} from "./StatusBadge";
export type { StatusBadgeProps, StatusType } from "./StatusBadge";
