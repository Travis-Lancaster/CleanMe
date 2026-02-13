# LoadingSpinner Component

Provides consistent loading indicators across the B2Gold Mining Database application with multiple variants and customization options.

## Features

- **Multiple Sizes**: Small, default, and large spinner variants
- **Three Display Modes**: Inline, centered, and full-page overlay
- **Customizable**: Support for custom messages, icons, and styling
- **Consistent UX**: Standardized loading states across all modules
- **Flow Logging**: Built-in logging for debugging loading states
- **Accessibility**: Proper ARIA attributes from Ant Design Spin
- **TypeScript**: Full type safety with comprehensive prop types

## Components

### LoadingSpinner (Main Component)

The main component with full customization options.

### LoadingOverlay (Convenience Component)

Pre-configured for full-page loading overlays.

### InlineSpinner (Convenience Component)

Pre-configured for inline loading indicators.

---

## Usage Examples

### 1. Basic Centered Spinner

```tsx
import { LoadingSpinner } from "#src/pages/_shared/components";

export const MyView: React.FC = () => {
	const { data, isLoading } = useFetchData();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return <div>{/* Your content */}</div>;
};
```

### 2. With Custom Message

```tsx
<LoadingSpinner tip="Loading drill programs..." />;
```

### 3. Different Sizes

```tsx
// Small spinner
<LoadingSpinner size="small" />

// Default spinner (medium)
<LoadingSpinner size="default" />

// Large spinner
<LoadingSpinner size="large" />
```

### 4. Inline Spinner

Use for inline loading indicators (e.g., inside buttons or text).

```tsx
import { InlineSpinner } from '#src/pages/_shared/components';

<Button>
  Saving changes <InlineSpinner />
</Button>

// Or using the main component
<LoadingSpinner inline size="small" />
```

### 5. Full-Page Overlay

Use for operations that block the entire page.

```tsx
import { LoadingOverlay } from "#src/pages/_shared/components";

export const MyView: React.FC = () => {
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await saveData();
		}
		finally {
			setIsSaving(false);
		}
	};

	return (
		<div>
			{isSaving && <LoadingOverlay tip="Saving changes..." />}
			{/* Your content */}
		</div>
	);
};

// Or using the main component
<LoadingSpinner overlay size="large" tip="Processing..." />;
```

### 6. Custom Height

```tsx
// Taller loading area
<LoadingSpinner minHeight="400px" />

// Shorter loading area
<LoadingSpinner minHeight={150} />
```

### 7. Custom Icon

```tsx
import { SyncOutlined } from "@ant-design/icons";

<LoadingSpinner
	customIcon={<SyncOutlined spin style={{ fontSize: 24 }} />}
	tip="Syncing data..."
/>;
```

### 8. With Custom Styling

```tsx
<LoadingSpinner
	className="my-custom-spinner"
	style={{ backgroundColor: "#f5f5f5" }}
	tip="Loading..."
/>;
```

---

## Common Patterns

### Pattern 1: Conditional Rendering in List Views

```tsx
export const DrillProgramListView: React.FC = () => {
	const { programs, isLoading, error } = useDrillProgramList();

	if (error) {
		return <Alert type="error" message={error.message} />;
	}

	if (isLoading && programs.length === 0) {
		return <LoadingSpinner tip="Loading drill programs..." />;
	}

	return (
		<div>
			{/* Render programs */}
		</div>
	);
};
```

### Pattern 2: Loading State in Forms

```tsx
export const DrillProgramForm: React.FC = () => {
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (values: any) => {
		setSaving(true);
		try {
			await saveDrillProgram(values);
			message.success("Saved successfully");
		}
		catch (error) {
			message.error("Failed to save");
		}
		finally {
			setSaving(false);
		}
	};

	return (
		<div>
			{saving && <LoadingOverlay tip="Saving drill program..." />}
			<Form onFinish={handleSubmit}>
				{/* Form fields */}
			</Form>
		</div>
	);
};
```

### Pattern 3: Loading with AG Grid

```tsx
export const DataGrid: React.FC = () => {
	const { data, isLoading } = useFetchList();

	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
			{isLoading && data.length === 0 ? (
				<LoadingSpinner minHeight="400px" tip="Loading data..." />
			) : (
				<div className="ag-theme-alpine" style={{ flex: 1 }}>
					<AgGridReact
						rowData={data}
						loading={isLoading}
						// ... other props
					/>
				</div>
			)}
		</div>
	);
};
```

### Pattern 4: Inline Loading in Buttons

```tsx
export const ActionButton: React.FC = () => {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			await performAction();
		}
		finally {
			setLoading(false);
		}
	};

	return (
		<Button onClick={handleClick} disabled={loading}>
			{loading
				? (
					<>
						Processing
						{" "}
						<InlineSpinner />
					</>
				)
				: (
					"Click Me"
				)}
		</Button>
	);
};
```

### Pattern 5: Loading Sections

```tsx
export const DetailView: React.FC = () => {
	const { details, isLoading } = useDetails();
	const { related, isLoadingRelated } = useRelated();

	return (
		<div>
			<Card title="Details">
				{isLoading ? (
					<LoadingSpinner size="small" minHeight="100px" />
				) : (
					<Descriptions>{/* details */}</Descriptions>
				)}
			</Card>

			<Card title="Related Items" style={{ marginTop: 16 }}>
				{isLoadingRelated
					? (
						<LoadingSpinner size="small" minHeight="150px" />
					)
					: (
						<List dataSource={related} />
					)}
			</Card>
		</div>
	);
};
```

---

## API Reference

### LoadingSpinnerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size of the spinner (16px, 24px, 40px) |
| `inline` | `boolean` | `false` | Display as inline element (no centering) |
| `overlay` | `boolean` | `false` | Display as full-page overlay with backdrop |
| `tip` | `string` | `undefined` | Message to display below spinner |
| `minHeight` | `string \| number` | `'200px'` | Minimum height for container (not for inline/overlay) |
| `className` | `string` | `''` | Custom className for wrapper |
| `customIcon` | `React.ReactNode` | `undefined` | Custom icon to replace default spinner |
| `...spinProps` | `SpinProps` | - | All other Ant Design Spin props |

### Size to Pixel Mapping

- `small`: 16px
- `default`: 24px
- `large`: 40px

---

## Display Modes

### 1. Default (Centered)

```tsx
<LoadingSpinner />;
```

Creates a centered spinner in a flex container with configurable minimum height.

**Use when:**
- Loading a full view or section
- Need vertical centering
- Want consistent spacing

### 2. Inline

```tsx
<LoadingSpinner inline />;
```

Renders just the spinner without any wrapper.

**Use when:**
- Loading inline with text or buttons
- Need horizontal alignment
- Want minimal DOM elements

### 3. Overlay

```tsx
<LoadingSpinner overlay />;
```

Creates a fixed full-page overlay with semi-transparent backdrop.

**Use when:**
- Blocking entire page during operations
- Saving critical data
- Need to prevent user interaction

---

## Styling

### Default Styles

```tsx
// Centered container
{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  width: '100%',
}

// Overlay
{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 9999,
}
```

### Custom Styling

You can override styles using `className` and `style` props:

```tsx
<LoadingSpinner
	className="custom-spinner"
	style={{
		backgroundColor: "#f0f2f5",
		minHeight: "300px",
	}}
/>;
```

---

## Flow Logging

The component includes flow-based logging for debugging:

```typescript
console.log("[FLOW:loading-spinner] [ACTION] Rendering LoadingSpinner", {
	size,
	inline,
	overlay,
	hasTip: !!tip,
});
```

Filter logs in browser console:
```javascript
// Show all loading spinner logs
[FLOW:loading-spinner]

// Show only loading spinner actions
[FLOW:loading-spinner] [ACTION]
```

---

## Accessibility

The component uses Ant Design's `Spin` component, which provides:

- Proper ARIA attributes
- Screen reader support
- Semantic HTML

---

## Performance Considerations

1. **Conditional Rendering**: Only render when actually loading
2. **Unmount When Done**: Remove from DOM when loading completes
3. **Avoid Nested Overlays**: Only one overlay at a time
4. **Inline for Small Operations**: Use inline for non-blocking operations

---

## Migration Guide

### From Custom Loaders

**Before:**
```tsx
{ isLoading && (
	<div style={{ textAlign: "center", padding: "40px" }}>
		<Spin />
	</div>
); }
```

**After:**
```tsx
{ isLoading && <LoadingSpinner />; }
```

### From Ant Design Spin

**Before:**
```tsx
<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
```

**After:**
```tsx
<LoadingSpinner size="default" />;
```

### From Custom Overlays

**Before:**
```tsx
{ isSaving && (
	<div style={{
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		zIndex: 9999,
	}}
	>
		<Spin size="large" tip="Saving..." />
	</div>
); }
```

**After:**
```tsx
{ isSaving && <LoadingOverlay tip="Saving..." />; }
```

---

## Testing

### Unit Tests

```tsx
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

test("renders with tip message", () => {
	render(<LoadingSpinner tip="Loading data..." />);
	expect(screen.getByText("Loading data...")).toBeInTheDocument();
});

test("renders as overlay", () => {
	const { container } = render(<LoadingSpinner overlay />);
	const overlay = container.querySelector(".loading-spinner-overlay");
	expect(overlay).toHaveStyle({ position: "fixed", zIndex: "9999" });
});
```

---

## Best Practices

1. **Use Appropriate Size**: Match spinner size to context
   - `small` for inline or compact areas
   - `default` for standard sections
   - `large` for full-page or overlays

2. **Provide Context**: Use `tip` prop to explain what's loading
   ```tsx
   <LoadingSpinner tip="Fetching drill programs..." />;
   ```

3. **Avoid Over-Use**: Don't show spinners for very fast operations (<100ms)

4. **Combine with Skeleton Screens**: For better perceived performance
   ```tsx
   { isLoading ? <LoadingSpinner /> : <SkeletonScreen />; }
   ```

5. **Only One Overlay**: Never stack multiple overlays

6. **Clear Loading States**: Always clear loading in `finally` blocks
   ```tsx
   try {
   	setLoading(true);
   	await operation();
   }
   finally {
   	setLoading(false);
   }
   ```

---

## Related Components

- [`ErrorBoundary`](../ErrorBoundary/README.md) - Error handling
- `EmptyState` - Empty data displays (coming soon)
- `LoadingSkeleton` - Skeleton screens (coming soon)

---

## Related Hooks

- [`useApiRequest`](../../hooks/useApiRequest.ts) - Provides loading states
- [`useFetchList`](../../hooks/useApiRequest.ts) - Provides loading states for lists

---

## Examples in Codebase

See these files for real-world usage:
- `src/pages/drill-program/views/DrillProgramListView.tsx`
- `src/pages/drill-pattern/views/DrillPatternListView.tsx`
- `src/pages/drill-plan/views/DrillPlanListView.tsx`
