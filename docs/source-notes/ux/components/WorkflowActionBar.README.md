# WorkflowActionBar Component

Smart action button bar with permission and state awareness for workflow state transitions.

## Quick Start

```tsx
import { WorkflowActionBar } from '#src/ux/components/WorkflowActionBar.js';
import { useFormHook } from '#src/ux/hooks/useFormHook.js';

export function MyForm() {
  const form = useFormHook({
    sectionKey: SectionKey.Collar,
    schema: collarSchema,
  });

  return (
    <div>
      <WorkflowActionBar
        section={form.section}
        actions={form.actions}
        loading={form.formState.isSubmitting}
      />
      <Form>{/* form fields */}</Form>
    </div>
  );
}
```

## Features

- **Automatic button visibility** based on permissions and RowStatus
- **State-aware enabling** based on isDirty, validation, and rowStatus
- **Customizable button configuration**
- **Loading states and tooltips**
- **Works with both forms and grids**

## Props

### Required

- `section: DrillHoleSection` - Section instance with state and metadata
- `actions: Partial<FormActionHandlers>` - Action handlers (onSave, onSubmit, etc.)

### Optional

- `loading?: boolean` - Loading state during async operations (default: false)
- `extraActions?: React.ReactNode` - Additional custom buttons
- `size?: "small" | "middle" | "large"` - Button size (default: "middle")
- `direction?: "horizontal" | "vertical"` - Layout direction (default: "horizontal")
- `className?: string` - Custom CSS class
- `style?: React.CSSProperties` - Custom inline styles
- `buttonConfig?: Partial<WorkflowActionButtonConfig>` - Override button configs
- `showReadOnlyIndicator?: boolean` - Show "Approved" indicator (default: true)

## Button Visibility Rules

### Save Button
- **Shows when:** `isDirty && rowStatus === Draft`
- **Enabled when:** `isDirty && database.isValid`
- **Action:** Saves changes to local database

### Submit Button
- **Shows when:** `!isDirty && rowStatus === Draft`
- **Enabled when:** `!isDirty && database.isValid`
- **Action:** Transitions Draft → Complete

### Review Button
- **Shows when:** `!isDirty && rowStatus === Complete && canReview`
- **Enabled when:** Always (when visible)
- **Action:** Transitions Complete → Reviewed

### Approve Button
- **Shows when:** `!isDirty && rowStatus === Reviewed && canApprove`
- **Enabled when:** Always (when visible)
- **Action:** Transitions Reviewed → Approved

### Reject Button
- **Shows when:** `!isDirty && rowStatus in [Complete, Reviewed, Approved] && canReview`
- **Enabled when:** Always (when visible)
- **Action:** Returns to Draft status

### Exclude Button
- **Shows when:** `!isDirty && rowStatus in [Reviewed, Approved] && canExclude`
- **Enabled when:** Always (when visible)
- **Action:** Toggles ReportIncludeInd

## Usage with Forms (useFormHook)

```tsx
import { WorkflowActionBar } from '#src/ux/components/WorkflowActionBar.js';
import { useFormHook } from '#src/ux/hooks/useFormHook.js';

export function CollarForm() {
  const form = useFormHook({
    sectionKey: SectionKey.Collar,
    schema: collarSchema,
  });

  return (
    <div>
      <WorkflowActionBar
        section={form.section}
        actions={form.actions}
        loading={form.formState.isSubmitting}
      />
      
      <Form layout="vertical">
        <Controller
          name="HoleId"
          control={form.control}
          render={({ field }) => (
            <Form.Item label="Hole ID" {...form.getFieldProps("HoleId")}>
              <Input {...field} />
            </Form.Item>
          )}
        />
      </Form>
    </div>
  );
}
```

## Usage with Grids (useSectionActions)

```tsx
import { WorkflowActionBar } from '#src/ux/components/WorkflowActionBar.js';
import { useSectionActions } from '#src/ux/hooks/useSectionActions.js';

export function SampleGrid() {
  const section = useStore(state => state.sections.sample);
  const [isLoading, setIsLoading] = useState(false);
  
  const actions = useSectionActions({
    sectionKey: SectionKey.Sample,
    operations: {
      save: async () => {
        setIsLoading(true);
        try {
          await saveSamples();
          return { success: true, message: 'Samples saved' };
        } finally {
          setIsLoading(false);
        }
      },
      submit: async () => {
        await submitSamples();
        return { success: true, message: 'Samples submitted' };
      },
    },
  });

  return (
    <div>
      <WorkflowActionBar
        section={section}
        actions={actions}
        loading={isLoading}
        size="small"
      />
      <AgGridReact>{/* grid config */}</AgGridReact>
    </div>
  );
}
```

## Custom Button Configuration

```tsx
<WorkflowActionBar
  section={section}
  actions={actions}
  buttonConfig={{
    save: {
      label: 'Save Survey',
      icon: <DatabaseOutlined />,
      tooltip: 'Save survey measurements',
    },
    submit: {
      label: 'Complete Survey',
      tooltip: (section) =>
        section.isDirty
          ? 'Save changes first'
          : 'Mark survey as complete',
    },
  }}
/>
```

## Extra Actions

```tsx
<WorkflowActionBar
  section={section}
  actions={actions}
  extraActions={
    <>
      <Button icon={<ImportOutlined />}>Import</Button>
      <Button icon={<ExportOutlined />}>Export</Button>
      <Button icon={<PrinterOutlined />}>Print</Button>
    </>
  }
/>
```

## Workflow State Diagram

```
Draft → (Submit) → Complete → (Review) → Reviewed → (Approve) → Approved
  ↑                    ↓                     ↓                      ↓
  └────────────────(Reject)──────────────────────────────────────┘
```

## Permission Requirements

- **canReview**: Required for Review and Reject buttons
- **canApprove**: Required for Approve button
- **canExclude**: Required for Exclude button

Permissions are automatically checked via [`useDrillHolePermissions`](../hooks/use-drillhole-permissions.ts) hook.

## Validation

The component checks section validation to enable/disable buttons:

```typescript
const validation = section.validate();

// Database validation (blocking)
const isValid = "database" in validation
  ? validation.database.isValid
  : validation.isValid;

// Save enabled: isDirty && isValid
// Submit enabled: !isDirty && isValid
```

## Related Components

- [`DrillHoleActionBar`](../pages/drill-hole-data/components/DrillHoleActionBar.tsx) - Page-specific toolbar with integrated WorkflowActionBar
- [`useFormHook`](../hooks/useFormHook.ts) - Form management hook that provides section and actions
- [`useSectionActions`](../hooks/useSectionActions.ts) - Action handler hook for grid-based sections

## Type Definitions

See [`WorkflowActionBar.types.ts`](./WorkflowActionBar.types.ts) for complete type definitions.

## Configuration

See [`WorkflowActionBar.config.ts`](./WorkflowActionBar.config.ts) for default button configurations.
