# ErrorBoundary Component

Generic error boundary component for catching React errors and displaying fallback UI.

## Purpose

Prevents white screens when components crash by catching errors in the React component tree and displaying a user-friendly error message with options to recover.

## Features

- ✅ Catches all React rendering errors in child components
- ✅ Displays user-friendly error message
- ✅ Shows detailed error info in development mode
- ✅ Preserves line numbers in console logs (uses direct console.log)
- ✅ Provides recovery options (Reload, Go Home)
- ✅ Supports custom fallback UI
- ✅ Optional error callback for logging/monitoring
- ✅ Module-specific error messages

## Usage

### Basic Usage

```tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary moduleName="DrillPlan">
			<DrillPlanListView />
		</ErrorBoundary>
	);
}
```

### With Custom Error Handler

```tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

function App() {
	const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
		// Send to error monitoring service
		console.error("[FLOW:error-monitoring] [ERROR] Caught error:", {
			error,
			errorInfo,
			timestamp: new Date().toISOString(),
		});
	};

	return (
		<ErrorBoundary moduleName="DrillPlan" onError={handleError}>
			<DrillPlanListView />
		</ErrorBoundary>
	);
}
```

### With Custom Fallback UI

```tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

const customFallback = (
	<div style={{ padding: "24px", textAlign: "center" }}>
		<h2>Oops! Something went wrong</h2>
		<p>We're sorry for the inconvenience.</p>
		<button onClick={() => window.location.reload()}>
			Try Again
		</button>
	</div>
);

function App() {
	return (
		<ErrorBoundary fallback={customFallback}>
			<DrillPlanListView />
		</ErrorBoundary>
	);
}
```

### Hide Error Details in Production

```tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary
			moduleName="DrillPlan"
			showDetails={false} // Hide technical details
		>
			<DrillPlanListView />
		</ErrorBoundary>
	);
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Child components to wrap |
| `moduleName` | `string` | No | - | Name of the module for error messages |
| `onError` | `(error: Error, errorInfo: React.ErrorInfo) => void` | No | - | Custom error handler callback |
| `fallback` | `ReactNode` | No | - | Custom fallback UI to display on error |
| `showDetails` | `boolean` | No | `import.meta.env.DEV` | Show error details (auto-detects dev mode) |

## Error Logging

The ErrorBoundary uses direct `console.log` statements to preserve line numbers for debugging:

```typescript
// All errors are logged with flow-based naming convention
console.error("[FLOW:error-boundary] [ERROR] Component error caught:", error);
console.error("[FLOW:error-boundary] [ERROR] DrillPlan module error:", {
	error,
	errorInfo,
	componentStack: errorInfo.componentStack,
});
```

**Filter in browser console:**
- `[FLOW:error-boundary]` - See all error boundary logs
- `[FLOW:error-boundary] [ERROR]` - See only errors

## Default Fallback UI

When an error occurs, the default UI shows:

1. **Error message** - User-friendly description
2. **Module name** - Which module had the error (if provided)
3. **Error details** - Technical details in development mode only
4. **Component stack** - Expandable stack trace in development mode
5. **Action buttons**:
   - **Reload Page** - Refreshes the entire application
   - **Go to Home** - Navigates to home page

## Recovery Options

### Reload Page
Completely refreshes the application, clearing all state. Use when the error might be transient or related to stale data.

### Go to Home
Navigates to the home page without refreshing. Use when the error is specific to a module and the rest of the app should work.

## Where to Use

### Module Entry Points
Wrap each major module to catch errors specific to that module:

```tsx
// src/pages/drill-plan/index.tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";
import { DrillPlanRouter } from "./DrillPlanRouter";

export default function DrillPlanModule() {
	return (
		<ErrorBoundary moduleName="DrillPlan">
			<DrillPlanRouter />
		</ErrorBoundary>
	);
}
```

### Critical Features
Wrap critical features that shouldn't crash the entire app:

```tsx
// In a complex page with multiple sections
function DrillHolePage() {
	return (
		<div>
			<DrillHoleHeader />

			<ErrorBoundary moduleName="DrillHole - Master Grid">
				<MasterGrid />
			</ErrorBoundary>

			<ErrorBoundary moduleName="DrillHole - Sections">
				<DrillHoleSections />
			</ErrorBoundary>
		</div>
	);
}
```

### Root App Level
Catch any unhandled errors at the application root:

```tsx
// src/App.tsx
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary moduleName="Application">
			<Router>
				<Routes />
			</Router>
		</ErrorBoundary>
	);
}
```

## What Errors Are Caught

✅ **Catches:**
- Rendering errors
- Lifecycle method errors
- Constructor errors in child components
- Errors in event handlers that propagate
- Errors in useEffect hooks

❌ **Does NOT Catch:**
- Errors in event handlers (need try-catch)
- Errors in async code (need try-catch)
- Errors in setTimeout/setInterval (need try-catch)
- Server-side rendering errors
- Errors in the error boundary itself

## Best Practices

### 1. Use Descriptive Module Names
```tsx
// ✅ GOOD
<ErrorBoundary moduleName="DrillPlan List View">

// ❌ BAD
<ErrorBoundary>
```

### 2. Add Error Callback for Monitoring
```tsx
// ✅ GOOD - Send to monitoring service
<ErrorBoundary
  moduleName="DrillPlan"
  onError={(error, info) => {
    sendToMonitoring({ error, info, module: 'DrillPlan' });
  }}
>

// ❌ BAD - No monitoring
<ErrorBoundary moduleName="DrillPlan">
```

### 3. Combine with Try-Catch for Async
```tsx
// Error boundaries don't catch async errors, so use try-catch too
async function handleSubmit() {
	try {
		await saveDrillPlan(data);
	}
	catch (error) {
		console.error("[FLOW:drill-plan-create] [ERROR] Save failed:", error);
		message.error("Failed to save drill plan");
	}
}
```

### 4. Don't Overuse
```tsx
// ❌ BAD - Too granular
<ErrorBoundary>
  <Button>Click Me</Button>
</ErrorBoundary>

// ✅ GOOD - Reasonable boundary
<ErrorBoundary moduleName="DrillPlan Actions">
  <BulkActionsBar />
  <QuickCreateButton />
  <AdvancedFilter />
</ErrorBoundary>
```

## Testing

### Trigger Error for Testing
```tsx
// Create a component that throws an error
function ErrorTest() {
	throw new Error("Test error for ErrorBoundary");
}

// Wrap with ErrorBoundary
<ErrorBoundary moduleName="Test">
	<ErrorTest />
</ErrorBoundary>;
```

### Verify Error Logging
1. Open browser console
2. Filter by `[FLOW:error-boundary]`
3. Trigger an error
4. Verify error is logged with full context
5. Click line number to verify it goes to correct file

## Migration from Existing Error Boundaries

If you have existing error boundaries (e.g., `DrillPlanErrorBoundary`), migrate them to use this shared component:

```tsx
// After
import { ErrorBoundary } from "#src/pages/_shared/components/ErrorBoundary";

// Before
import { DrillPlanErrorBoundary } from "./components/DrillPlanErrorBoundary";

function DrillPlanModule() {
	return (
		<DrillPlanErrorBoundary>
			<DrillPlanRouter />
		</DrillPlanErrorBoundary>
	);
}

function DrillPlanModule() {
	return (
		<ErrorBoundary moduleName="DrillPlan">
			<DrillPlanRouter />
		</ErrorBoundary>
	);
}
```

## Related Documentation

- [Logging Strategy](../../../Roo_docs/logging-strategy-revised.md)
- [Error Handling Patterns](../../../Roo_docs/optimization-master-plan.md#phase-3-add-comprehensive-error-handling)
- [React Error Boundaries (Official Docs)](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

## Examples

See implementations in:
- `src/pages/drill-plan/index.tsx`
- `src/pages/drill-hole/index.tsx`
- `src/pages/drill-program/index.tsx`
- `src/pages/drill-pattern/index.tsx`
