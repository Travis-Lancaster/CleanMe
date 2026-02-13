# StatusBadge Component

Provides consistent status displays across the B2Gold Mining Database application with predefined color schemes and icons for common status types.

## Features

- **Predefined Status Types**: 13 common status types with appropriate colors and icons
- **Convenience Components**: Pre-configured components for common statuses
- **Customizable**: Support for custom labels, icons, and colors
- **Size Variants**: Small, default, and large sizes
- **Clickable**: Optional click handlers for interactive status badges
- **Flow Logging**: Built-in logging for debugging status interactions
- **TypeScript**: Full type safety with comprehensive prop types
- **Accessibility**: Proper semantic structure from Ant Design Tag

## Components

### StatusBadge (Main Component)

The main component with full customization options.

### Convenience Components

Pre-configured components for common statuses:
- `SuccessBadge`
- `ErrorBadge`
- `WarningBadge`
- `ProcessingBadge`
- `PendingBadge`
- `ActiveBadge`
- `InactiveBadge`

---

## Usage Examples

### 1. Basic Status Badges

```tsx
import { StatusBadge } from '#src/pages/_shared/components';

// Using predefined status types
<StatusBadge status="success" />
<StatusBadge status="error" />
<StatusBadge status="warning" />
<StatusBadge status="info" />
<StatusBadge status="processing" />
<StatusBadge status="pending" />
```

### 2. With Custom Labels

```tsx
<StatusBadge status="success" label="Approved" />
<StatusBadge status="error" label="Rejected" />
<StatusBadge status="pending" label="Awaiting Review" />
<StatusBadge status="processing" label="Syncing Data..." />
```

### 3. Using Convenience Components

```tsx
import {
  SuccessBadge,
  ErrorBadge,
  WarningBadge,
  ProcessingBadge,
  PendingBadge,
  ActiveBadge,
  InactiveBadge,
} from '#src/pages/_shared/components';

// Pre-configured with appropriate status
<SuccessBadge label="Completed" />
<ErrorBadge label="Failed" />
<WarningBadge label="Needs Attention" />
<ProcessingBadge label="Uploading..." />
<PendingBadge label="In Queue" />
<ActiveBadge />
<InactiveBadge />
```

### 4. Different Sizes

```tsx
// Small badges (good for inline with text)
<StatusBadge status="active" size="small" />

// Default size
<StatusBadge status="active" size="default" />

// Large badges (good for emphasis)
<StatusBadge status="success" size="large" />
```

### 5. Without Icons

```tsx
<StatusBadge status="success" label="Approved" showIcon={false} />
<StatusBadge status="pending" label="Pending" showIcon={false} />
```

### 6. Custom Colors and Icons

```tsx
import { FireOutlined } from '@ant-design/icons';

<StatusBadge
  label="Hot Priority"
  color="red"
  icon={<FireOutlined />}
/>

<StatusBadge
  label="Custom Status"
  color="#8B5CF6"
  showIcon={false}
/>
```

### 7. Clickable Status Badges

```tsx
<StatusBadge
  status="processing"
  label="View Progress"
  onClick={() => {
    console.log('Status clicked');
    navigate('/progress');
  }}
/>

<SuccessBadge
  label="View Details"
  onClick={handleViewDetails}
/>
```

---

## Common Patterns

### Pattern 1: Status in List View Columns

```tsx
export const DrillProgramListView: React.FC = () => {
	const columnDefs: ColDef<DrillProgram>[] = useMemo(() => [
		{
			headerName: "Status",
			field: "status",
			width: 120,
			cellRenderer: (params: any) => {
				const status = params.value?.toLowerCase();

				// Map database status to badge status
				const statusMap: Record<string, StatusType> = {
					active: "active",
					completed: "completed",
					draft: "draft",
					cancelled: "cancelled",
					pending: "pending",
				};

				return (
					<StatusBadge
						status={statusMap[status] || "unknown"}
						label={params.value}
						size="small"
					/>
				);
			},
		},
		// ... other columns
	], []);

	return <AgGridReact columnDefs={columnDefs} />;
};
```

### Pattern 2: Conditional Status Display

```tsx
export const StatusDisplay: React.FC<{ item: any }> = ({ item }) => {
	const getStatusBadge = () => {
		if (item.isProcessing) {
			return <ProcessingBadge label="Processing" />;
		}

		if (item.hasErrors) {
			return <ErrorBadge label="Failed" />;
		}

		if (item.needsReview) {
			return <WarningBadge label="Needs Review" />;
		}

		if (item.isCompleted) {
			return <SuccessBadge label="Completed" />;
		}

		return <PendingBadge label="Pending" />;
	};

	return (
		<div>
			<span>Status: </span>
			{getStatusBadge()}
		</div>
	);
};
```

### Pattern 3: Interactive Status Badges

```tsx
export const StatusSelector: React.FC = () => {
	const [currentStatus, setCurrentStatus] = useState("pending");

	const statusOptions = [
		{ value: "pending", component: <PendingBadge onClick={() => setCurrentStatus("pending")} /> },
		{ value: "active", component: <ActiveBadge onClick={() => setCurrentStatus("active")} /> },
		{ value: "completed", component: <SuccessBadge label="Completed" onClick={() => setCurrentStatus("completed")} /> },
	];

	return (
		<Space>
			{statusOptions.map(option => (
				<div key={option.value} style={{ opacity: currentStatus === option.value ? 1 : 0.5 }}>
					{option.component}
				</div>
			))}
		</Space>
	);
};
```

### Pattern 4: Status in Descriptions

```tsx
export const DetailView: React.FC = () => {
	const { data } = useDetails();

	return (
		<Descriptions bordered>
			<Descriptions.Item label="Program Name">
				{data.name}
			</Descriptions.Item>
			<Descriptions.Item label="Status">
				<StatusBadge
					status={data.isActive ? "active" : "inactive"}
					onClick={() => handleToggleStatus(data.id)}
				/>
			</Descriptions.Item>
			<Descriptions.Item label="Sync Status">
				{data.isSyncing
					? (
						<ProcessingBadge label="Syncing..." />
					)
					: (
						<SuccessBadge label="Synced" />
					)}
			</Descriptions.Item>
		</Descriptions>
	);
};
```

### Pattern 5: Multiple Status Badges

```tsx
export const ItemCard: React.FC = ({ item }) => {
	return (
		<Card>
			<Space direction="vertical">
				<div>
					<strong>Status:</strong>
					<Space style={{ marginLeft: 8 }}>
						<StatusBadge status={item.status} size="small" />
						{item.isPriority && <WarningBadge label="Priority" size="small" />}
						{item.isLocked && <StatusBadge label="Locked" color="orange" size="small" showIcon={false} />}
					</Space>
				</div>
				{/* Other content */}
			</Space>
		</Card>
	);
};
```

---

## API Reference

### StatusBadgeProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `StatusType` | `'unknown'` | Predefined status type |
| `label` | `string` | (status-specific) | Custom label (overrides default) |
| `showIcon` | `boolean` | `true` | Show icon |
| `icon` | `React.ReactNode` | (status-specific) | Custom icon (overrides default) |
| `color` | `string` | (status-specific) | Custom color (overrides default) |
| `onClick` | `() => void` | `undefined` | Click handler (makes badge clickable) |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size variant |
| `className` | `string` | `''` | Custom className |
| `...tagProps` | `TagProps` | - | All other Ant Design Tag props |

### StatusType Values

- `success` - Green badge with check icon
- `error` - Red badge with close icon
- `warning` - Orange badge with exclamation icon
- `info` - Blue badge with info icon
- `processing` - Blue badge with spinning sync icon
- `pending` - Gray badge with clock icon
- `active` - Green badge with check icon
- `inactive` - Gray badge with minus icon
- `completed` - Green badge with check icon
- `failed` - Red badge with close icon
- `cancelled` - Gray badge with close icon
- `draft` - Gray badge with clock icon
- `unknown` - Gray badge with question icon

---

## Status Configuration

Each status type has predefined color, icon, and label:

```tsx
const statusConfig = {
	success: {
		color: "success", // Green
		icon: <CheckCircleOutlined />,
		label: "Success",
	},
	error: {
		color: "error", // Red
		icon: <CloseCircleOutlined />,
		label: "Error",
	},
	warning: {
		color: "warning", // Orange
		icon: <ExclamationCircleOutlined />,
		label: "Warning",
	},
	processing: {
		color: "processing", // Blue with animation
		icon: <SyncOutlined spin />,
		label: "Processing",
	},
	// ... see component for full configuration
};
```

---

## Size Styles

```tsx
const sizeStyles = {
	small: {
		fontSize: "12px",
		padding: "0 6px",
		lineHeight: "18px",
	},
	default: {
		fontSize: "14px",
		padding: "2px 8px",
		lineHeight: "20px",
	},
	large: {
		fontSize: "16px",
		padding: "4px 12px",
		lineHeight: "24px",
	},
};
```

---

## Flow Logging

The component includes flow-based logging for debugging:

```typescript
console.log("[FLOW:status-badge] [ACTION] Rendering StatusBadge", {
	status,
	hasLabel: !!label,
	showIcon,
	clickable: !!onClick,
});

console.log("[FLOW:status-badge] [ACTION] Status badge clicked", {
	status,
	label: displayLabel,
});
```

Filter logs in browser console:
```javascript
// Show all status badge logs
[FLOW:status-badge]

// Show only status badge actions
[FLOW:status-badge] [ACTION]
```

---

## Styling

### CSS Classes

The component adds these classes:

- `status-badge` - Base class
- `status-badge-small` - Small size
- `status-badge-default` - Default size
- `status-badge-large` - Large size
- `status-badge-clickable` - When onClick is provided

### Custom Styling

```tsx
<StatusBadge
	status="success"
	className="custom-status"
	style={{
		borderRadius: "12px",
		fontWeight: "bold",
	}}
/>;
```

---

## Accessibility

The component uses Ant Design's `Tag` component, which provides:

- Proper semantic structure
- Keyboard navigation when clickable
- Screen reader support
- Proper color contrast

---

## Best Practices

1. **Use Appropriate Status Types**: Choose the status that best represents the state
   ```tsx
   // Good
   <StatusBadge status="processing" label="Uploading..." />

   // Avoid
   <StatusBadge status="success" label="Uploading..." />
   ```

2. **Consistent Labeling**: Use consistent labels across the application
   ```tsx
   // Define constants for labels
   const STATUS_LABELS = {
   	APPROVED: "Approved",
   	PENDING: "Pending Review",
   	REJECTED: "Rejected",
   };

   <StatusBadge status="success" label={STATUS_LABELS.APPROVED} />;
   ```

3. **Size for Context**: Use appropriate sizes for different contexts
   - `small` for tables and inline text
   - `default` for cards and lists
   - `large` for emphasis and headers

4. **Icon Consideration**: Only hide icons if space is very limited
   ```tsx
   // In tight spaces
   <StatusBadge status="active" size="small" showIcon={false} />;
   ```

5. **Clickable Indicators**: Make it clear when badges are clickable
   ```tsx
   <Space>
   	<span>Current Status:</span>
   	<StatusBadge
   		status="pending"
   		onClick={handleClick}
   		style={{ cursor: "pointer" }}
   	/>
   	<span style={{ fontSize: "12px", color: "#999" }}>(click to change)</span>
   </Space>;
   ```

---

## Migration Guide

### From Ant Design Tags

**Before:**
```tsx
{ status === "active"
	? (
		<Tag color="success">Active</Tag>
	)
	: (
		<Tag color="default">Inactive</Tag>
	); }
```

**After:**
```tsx
<StatusBadge status={status === "active" ? "active" : "inactive"} />;
```

### From Custom Status Components

**Before:**
```tsx
<Tag
	color={getStatusColor(status)}
	icon={getStatusIcon(status)}
>
	{getStatusLabel(status)}
</Tag>;
```

**After:**
```tsx
<StatusBadge status={status} />;
```

---

## Testing

### Unit Tests

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

test("renders with correct status", () => {
	render(<StatusBadge status="success" label="Approved" />);
	expect(screen.getByText("Approved")).toBeInTheDocument();
});

test("calls onClick when clickable", () => {
	const handleClick = jest.fn();
	render(
		<StatusBadge
			status="active"
			onClick={handleClick}
		/>
	);

	fireEvent.click(screen.getByText("Active"));
	expect(handleClick).toHaveBeenCalledTimes(1);
});

test("applies custom color", () => {
	const { container } = render(
		<StatusBadge status="success" color="purple" />
	);

	const tag = container.querySelector(".ant-tag");
	expect(tag).toHaveClass("ant-tag-purple");
});
```

---

## Examples by Use Case

### Drill Program Status

```tsx
export const DrillProgramStatus: React.FC<{ program: DrillProgram }> = ({ program }) => {
	const statusMap: Record<string, { status: StatusType, label: string }> = {
		DRAFT: { status: "draft", label: "Draft" },
		ACTIVE: { status: "active", label: "Active" },
		COMPLETED: { status: "completed", label: "Completed" },
		CANCELLED: { status: "cancelled", label: "Cancelled" },
	};

	const config = statusMap[program.status] || { status: "unknown", label: "Unknown" };

	return <StatusBadge status={config.status} label={config.label} />;
};
```

### Sync Status Indicator

```tsx
export const SyncStatusIndicator: React.FC<{ isSyncing: boolean, lastSync: Date }> = ({
	isSyncing,
	lastSync
}) => {
	if (isSyncing) {
		return <ProcessingBadge label="Syncing..." />;
	}

	const minutesSinceSync = (Date.now() - lastSync.getTime()) / 1000 / 60;

	if (minutesSinceSync < 5) {
		return <SuccessBadge label="Synced" />;
	}

	if (minutesSinceSync < 30) {
		return <StatusBadge status="success" label={`Synced ${Math.floor(minutesSinceSync)}m ago`} />;
	}

	return <WarningBadge label="Sync Needed" />;
};
```

### Validation Status

```tsx
export const ValidationStatus: React.FC<{ errors: number, warnings: number }> = ({
	errors,
	warnings
}) => {
	if (errors > 0) {
		return <ErrorBadge label={`${errors} Error${errors > 1 ? "s" : ""}`} />;
	}

	if (warnings > 0) {
		return <WarningBadge label={`${warnings} Warning${warnings > 1 ? "s" : ""}`} />;
	}

	return <SuccessBadge label="Valid" />;
};
```

---

## Related Components

- [`LoadingSpinner`](../LoadingSpinner/README.md) - Loading states
- [`EmptyState`](../EmptyState/README.md) - Empty data displays
- [`ErrorBoundary`](../ErrorBoundary/README.md) - Error handling

---

## Related Patterns

- Use with `Descriptions` for detail views
- Use in AG Grid cell renderers for list views
- Combine with `Space` for multiple status indicators
- Use in `Card` headers for entity status

---

## Examples in Codebase

See these files for potential usage:
- `src/pages/drill-program/views/DrillProgramListView.tsx` (status column)
- `src/pages/drill-plan/views/DrillPlanDetailView.tsx` (status display)
- `src/pages/drill-hole/components/StatusIndicator.tsx` (sync status)
