# EmptyState Component

Provides consistent empty state displays across the B2Gold Mining Database application with contextual messages, icons, and actions.

## Features

- **Predefined Variants**: Common empty state scenarios (search, filter, data, folder)
- **Custom Icons**: Support for any icon or custom components
- **Action Buttons**: Primary and secondary action support
- **Flexible Descriptions**: Support for text or custom React nodes
- **Consistent UX**: Standardized empty states across all modules
- **Flow Logging**: Built-in logging for debugging empty state interactions
- **TypeScript**: Full type safety with comprehensive prop types
- **Accessibility**: Proper semantic structure and ARIA attributes

## Components

### EmptyState (Main Component)

The main component with full customization options.

### EmptySearchResults (Convenience Component)

Pre-configured for empty search results.

### EmptyFilterResults (Convenience Component)

Pre-configured for empty filter results.

### EmptyDataState (Convenience Component)

Pre-configured for empty data with creation action.

---

## Usage Examples

### 1. Basic Empty State

```tsx
import { EmptyState } from "#src/pages/_shared/components";

export const MyView: React.FC = () => {
	const { data } = useFetchData();

	if (data.length === 0) {
		return <EmptyState />;
	}

	return <div>{/* Your content */}</div>;
};
```

### 2. Empty State with Action

```tsx
<EmptyState
	title="No drill programs found"
	description="Get started by creating your first drill program"
	showAction
	actionLabel="Create Program"
	onAction={() => navigate("/drill-programs/new")}
/>;
```

### 3. Empty Search Results

```tsx
import { EmptySearchResults } from "#src/pages/_shared/components";

<EmptySearchResults
	description="No drill programs match your search"
	showAction
	actionLabel="Clear Search"
	onAction={handleClearSearch}
/>;
```

### 4. Empty Filter Results

```tsx
import { EmptyFilterResults } from "#src/pages/_shared/components";

<EmptyFilterResults
	title="No matching drill programs"
	description="Try adjusting your filters or search criteria"
	showAction
	actionLabel="Clear Filters"
	onAction={handleClearFilters}
	showSecondaryAction
	secondaryActionLabel="Reset All"
	onSecondaryAction={handleResetAll}
/>;
```

### 5. Empty Data State with Create Action

```tsx
import { EmptyDataState } from "#src/pages/_shared/components";

<EmptyDataState
	title="No drill programs yet"
	description="Create your first drill program to get started"
	actionLabel="Create Program"
	onAction={handleCreate}
/>;
```

### 6. Custom Icon

```tsx
import { RocketOutlined } from "@ant-design/icons";

<EmptyState
	icon={<RocketOutlined style={{ fontSize: 80, color: "#1890ff" }} />}
	title="Ready to launch"
	description="Click below to create your first item"
	showAction
	actionLabel="Get Started"
	onAction={handleGetStarted}
/>;
```

### 7. Predefined Variants

```tsx
// Default variant
<EmptyState variant="default" />

// Search variant
<EmptyState variant="search" />

// Filter variant
<EmptyState variant="filter" />

// Data variant
<EmptyState variant="data" />

// Folder variant
<EmptyState variant="folder" />
```

### 8. Custom Description with React Node

```tsx
<EmptyState
	title="No drill patterns found"
	description={(
		<div>
			<p>You haven't created any drill patterns yet.</p>
			<p>Drill patterns help you organize your drilling operations.</p>
		</div>
	)}
	showAction
	actionLabel="Learn More"
	onAction={handleLearnMore}
/>;
```

---

## Common Patterns

### Pattern 1: List View with Empty State

```tsx
export const DrillProgramListView: React.FC = () => {
	const { programs, isLoading, searchTerm } = useDrillProgramList();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (programs.length === 0) {
		// Show different empty states based on context
		if (searchTerm) {
			return (
				<EmptySearchResults
					description={`No drill programs match "${searchTerm}"`}
					showAction
					actionLabel="Clear Search"
					onAction={handleClearSearch}
				/>
			);
		}

		return (
			<EmptyDataState
				title="No drill programs yet"
				description="Create your first drill program to get started"
				actionLabel="Create Program"
				onAction={handleCreate}
			/>
		);
	}

	return <div>{/* Render programs */}</div>;
};
```

### Pattern 2: Filtered Results

```tsx
export const FilteredList: React.FC = () => {
	const { items, filters, hasActiveFilters } = useFilteredList();

	if (items.length === 0 && hasActiveFilters) {
		return (
			<EmptyFilterResults
				description="No items match the selected filters"
				showAction
				actionLabel="Clear Filters"
				onAction={handleClearFilters}
			/>
		);
	}

	if (items.length === 0) {
		return (
			<EmptyDataState
				title="No items yet"
				description="Add your first item to get started"
				actionLabel="Add Item"
				onAction={handleAddItem}
			/>
		);
	}

	return <div>{/* Render items */}</div>;
};
```

### Pattern 3: With Secondary Actions

```tsx
export const AdvancedEmptyState: React.FC = () => {
	return (
		<EmptyState
			variant="data"
			title="No drill programs found"
			description="You can create a new program or import from a file"
			showAction
			actionLabel="Create New"
			onAction={handleCreate}
			showSecondaryAction
			secondaryActionLabel="Import from File"
			onSecondaryAction={handleImport}
		/>
	);
};
```

### Pattern 4: Conditional Empty States

```tsx
export const SmartEmptyState: React.FC = () => {
	const { data, isLoading, error, searchTerm, hasFilters } = useData();

	if (isLoading)
		return <LoadingSpinner />;
	if (error)
		return <Alert type="error" message={error.message} />;

	if (data.length === 0) {
		// Different empty states based on user context
		if (searchTerm) {
			return <EmptySearchResults onAction={handleClearSearch} />;
		}

		if (hasFilters) {
			return <EmptyFilterResults onAction={handleClearFilters} />;
		}

		// First-time user state
		return (
			<EmptyDataState
				title="Welcome to Drill Programs"
				description="Create your first drill program to start managing your drilling operations"
				actionLabel="Create Your First Program"
				onAction={handleCreate}
			/>
		);
	}

	return <div>{/* Data content */}</div>;
};
```

### Pattern 5: Empty State in AG Grid

```tsx
export const DataGridWithEmpty: React.FC = () => {
	const { data, isLoading, searchTerm } = useFetchList();

	// Show empty state instead of grid when no data
	if (!isLoading && data.length === 0) {
		return (
			<EmptyState
				variant={searchTerm ? "search" : "data"}
				title={searchTerm ? "No results found" : "No data available"}
				description={searchTerm ? "Try a different search term" : "Data will appear here once available"}
				minHeight="400px"
			/>
		);
	}

	return (
		<div className="ag-theme-alpine" style={{ height: "400px" }}>
			<AgGridReact
				rowData={data}
				loading={isLoading}
				// ... other props
			/>
		</div>
	);
};
```

---

## API Reference

### EmptyStateProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'search' \| 'filter' \| 'data' \| 'folder'` | `'default'` | Predefined variant for common scenarios |
| `title` | `string` | (variant-specific) | Title text |
| `description` | `React.ReactNode` | (variant-specific) | Description text or React node |
| `icon` | `React.ReactNode` | (variant-specific) | Custom icon (overrides variant icon) |
| `iconSize` | `number` | `64` | Icon size in pixels |
| `showAction` | `boolean` | `false` | Show primary action button |
| `actionLabel` | `string` | `undefined` | Primary action button label |
| `onAction` | `() => void` | `undefined` | Primary action button handler |
| `actionType` | `'primary' \| 'default' \| 'dashed' \| 'link' \| 'text'` | `'primary'` | Primary button type |
| `showSecondaryAction` | `boolean` | `false` | Show secondary action button |
| `secondaryActionLabel` | `string` | `undefined` | Secondary action button label |
| `onSecondaryAction` | `() => void` | `undefined` | Secondary action button handler |
| `minHeight` | `string \| number` | `'300px'` | Minimum height for container |
| `className` | `string` | `''` | Custom className |
| `...emptyProps` | `EmptyProps` | - | All other Ant Design Empty props |

---

## Variants

### Default

```tsx
<EmptyState variant="default" />;
```

- Icon: InboxOutlined
- Title: "No data"
- Description: "There is no data to display"

### Search

```tsx
<EmptyState variant="search" />;
```

- Icon: SearchOutlined
- Title: "No results found"
- Description: "Try adjusting your search query"

### Filter

```tsx
<EmptyState variant="filter" />;
```

- Icon: FilterOutlined
- Title: "No matching results"
- Description: "Try adjusting your filters"

### Data

```tsx
<EmptyState variant="data" />;
```

- Icon: DatabaseOutlined
- Title: "No data available"
- Description: "Data will appear here once available"

### Folder

```tsx
<EmptyState variant="folder" />;
```

- Icon: FolderOpenOutlined
- Title: "This folder is empty"
- Description: "Add items to get started"

---

## Styling

### Default Container Styles

```tsx
{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  width: '100%',
}
```

### Custom Styling

You can override styles using `className` and Ant Design's Empty props:

```tsx
<EmptyState
	className="custom-empty-state"
	style={{ backgroundColor: "#f5f5f5", padding: "40px" }}
/>;
```

---

## Flow Logging

The component includes flow-based logging for debugging:

```typescript
console.log("[FLOW:empty-state] [ACTION] Rendering EmptyState", {
	variant,
	hasTitle: !!title,
	hasAction: showAction,
	hasSecondaryAction: showSecondaryAction,
});

console.log("[FLOW:empty-state] [ACTION] Primary action clicked");
console.log("[FLOW:empty-state] [ACTION] Secondary action clicked");
```

Filter logs in browser console:
```javascript
// Show all empty state logs
[FLOW:empty-state]

// Show only empty state actions
[FLOW:empty-state] [ACTION]
```

---

## Accessibility

The component uses Ant Design's `Empty` component, which provides:

- Proper semantic structure
- Screen reader support
- Keyboard navigation for action buttons
- ARIA attributes

---

## UX Best Practices

1. **Context-Aware Messages**: Tailor messages to the user's context
   ```tsx
   // Good
   <EmptyState
     title="No drill programs yet"
     description="Create your first drill program to get started"
   />

   // Bad
   <EmptyState title="No data" />
   ```

2. **Actionable Empty States**: Provide clear next steps
   ```tsx
   <EmptyState
   	title="No results found"
   	description="Try adjusting your search or create a new item"
   	showAction
   	actionLabel="Create New"
   	onAction={handleCreate}
   />;
   ```

3. **Visual Hierarchy**: Use appropriate icon sizes
   - Larger icons (80-100px) for primary empty states
   - Standard icons (64px) for secondary areas
   - Smaller icons (48px) for compact areas

4. **Positive Messaging**: Frame messages positively
   ```tsx
   // Good
   "Ready to create your first drill program?";

   // Avoid
   "You don't have any drill programs";
   ```

5. **Progressive Disclosure**: Show relevant information based on state
   ```tsx
   if (isFirstTime) {
   	return <EmptyState title="Welcome!" description="Let's get started..." />;
   }
   if (hasSearch) {
   	return <EmptySearchResults />;
   }
   return <EmptyDataState />;
   ```

---

## Migration Guide

### From Custom Empty States

**Before:**
```tsx
{ data.length === 0 && (
	<div style={{ textAlign: "center", padding: "40px" }}>
		<Empty description="No data available" />
	</div>
); }
```

**After:**
```tsx
{ data.length === 0 && <EmptyState variant="data" />; }
```

### From Ant Design Empty

**Before:**
```tsx
<Empty
	image={<InboxOutlined style={{ fontSize: 64 }} />}
	description="No drill programs found"
>
	<Button type="primary" onClick={handleCreate}>
		Create Program
	</Button>
</Empty>;
```

**After:**
```tsx
<EmptyState
	title="No drill programs found"
	showAction
	actionLabel="Create Program"
	onAction={handleCreate}
/>;
```

---

## Testing

### Unit Tests

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

test("renders with custom title and description", () => {
	render(
		<EmptyState
			title="Custom Title"
			description="Custom Description"
		/>
	);
	expect(screen.getByText("Custom Description")).toBeInTheDocument();
});

test("calls action handler when button clicked", () => {
	const handleAction = jest.fn();
	render(
		<EmptyState
			showAction
			actionLabel="Click Me"
			onAction={handleAction}
		/>
	);

	fireEvent.click(screen.getByText("Click Me"));
	expect(handleAction).toHaveBeenCalledTimes(1);
});
```

---

## Best Practices

1. **Use Appropriate Variants**: Choose the variant that matches the context
2. **Provide Actions**: Give users a way forward when possible
3. **Keep Messages Short**: Clear and concise descriptions
4. **Consider User Journey**: First-time vs. returning users
5. **Consistent Styling**: Use standard variants for consistency
6. **Test Empty States**: Don't forget to test the empty case

---

## Related Components

- [`LoadingSpinner`](../LoadingSpinner/README.md) - Loading states
- [`ErrorBoundary`](../ErrorBoundary/README.md) - Error handling
- `StatusBadge` - Status displays (coming soon)

---

## Related Hooks

- [`useFetchList`](../../hooks/useApiRequest.ts) - List data fetching
- [`usePagination`](../../hooks/usePagination.ts) - Pagination logic
- [`useSelection`](../../hooks/useSelection.ts) - Selection management

---

## Examples in Codebase

See these files for real-world usage examples:
- `src/pages/drill-program/views/DrillProgramListView.tsx`
- `src/pages/drill-pattern/views/DrillPatternListView.tsx`
- `src/pages/drill-plan/views/DrillPlanListView.tsx`
