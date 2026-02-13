# useFormHook and ActionBar - Usage Guide

## Overview

The `useFormHook` and `ActionBar` provide a complete, reusable solution for managing forms in the U2Work application. These patterns eliminate ~80% of duplicate form code while maintaining full type safety and flexibility.

## Quick Start

### 1. Basic Form

```tsx
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { collarSchema } from "@/data/validation/collar-schemas";
import { ActionBar, useFormHook } from "@/ux/hooks";
import { SectionKey } from "@/ux/types/drillhole";

export function CollarForm() {
	const form = useFormHook({
		sectionKey: SectionKey.Collar,
		schema: collarSchema,
	});

	return (
		<div>
			<ActionBar section={form.section} actions={form.actions} />

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

				<Controller
					name="CollarType"
					control={form.control}
					render={({ field }) => (
						<Form.Item label="Collar Type" {...form.getFieldProps("CollarType")}>
							<Select {...field}>
								<Select.Option value="DD">Diamond Drilling</Select.Option>
								<Select.Option value="RC">Reverse Circulation</Select.Option>
							</Select>
						</Form.Item>
					)}
				/>
			</Form>
		</div>
	);
}
```

### 2. Form with Callbacks

```tsx
export function RigSheetForm() {
	const [showModal, setShowModal] = useState(false);

	const form = useFormHook({
		sectionKey: SectionKey.RigSheet,
		schema: rigSheetSchema,
		callbacks: {
			beforeSave: async () => {
				console.log("Preparing to save...");
			},
			afterSave: async () => {
				setShowModal(true);
			},
			onActionSuccess: (action, message) => {
				console.log(`${action} succeeded: ${message}`);
			},
			onActionError: (action, error) => {
				console.error(`${action} failed: ${error}`);
			},
		},
	});

	return (
		<>
			<ActionBar section={form.section} actions={form.actions} />
			<Form>{ /* fields */ }</Form>

			<Modal visible={showModal} onOk={() => setShowModal(false)}>
				Rig sheet saved successfully!
			</Modal>
		</>
	);
}
```

### 3. Custom Action Buttons

```tsx
export function SurveyForm() {
	const form = useFormHook({
		sectionKey: SectionKey.Survey,
		schema: surveySchema,
	});

	const customConfig = {
		save: {
			label: "Save Survey",
			icon: <DatabaseOutlined />,
		},
		submit: {
			label: "Complete Survey",
			tooltip: "Submit for geological review",
		},
	};

	return (
		<div>
			<ActionBar
				section={form.section}
				actions={form.actions}
				buttonConfig={customConfig}
				extraActions={(
					<>
						<Button icon={<ImportOutlined />}>Import</Button>
						<Button icon={<ExportOutlined />}>Export</Button>
					</>
				)}
			/>
			<Form>{ /* fields */ }</Form>
		</div>
	);
}
```

### 4. Grid Section (Non-Form)

```tsx
export const SampleGrid = () => {
  const section = useDrillHoleStore(state => state.sections.sample);
  const actions = useSectionActions(SectionKey.Sample);

  return (
    <div>
      <ActionBar
        section={section}
        actions={actions}
        extraActions={
          <>
            <Button icon={<PlusOutlined />}>Add Row</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </>
        }
      />
      <AgGridReact { /* grid config */ } />
    </div>
  );
};
```

## API Reference

### useFormHook

#### Options

```typescript
interface FormHookOptions<TTable, TZodSchema> {
	sectionKey: SectionKey
	schema: TZodSchema
	defaultValues?: Partial<TTable>
	mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all"
	callbacks?: FormHookCallbacks<TTable>
}
```

#### Returns

```typescript
interface FormHookReturn<TTable> {
	// React Hook Form
	control: Control<TTable>
	formState: FormState<TTable>
	getValues: () => TTable
	setValue: (name: keyof TTable, value: any) => void
	reset: (values?: Partial<TTable>) => void
	watch: (name?: keyof TTable) => any

	// Section state
	section: DrillHoleSection<TTable>
	isValid: boolean
	validationErrors: Record<string, string>

	// Actions
	actions: FormActionHandlers

	// Helpers
	getFieldProps: (fieldName: keyof TTable) => FieldProps
}
```

### ActionBar

#### Props

```typescript
interface ActionBarProps {
	section: DrillHoleSection
	actions: Partial<FormActionHandlers>
	loading?: boolean
	extraActions?: React.ReactNode
	size?: "small" | "middle" | "large"
	direction?: "horizontal" | "vertical"
	className?: string
	style?: React.CSSProperties
	buttonConfig?: Partial<ActionButtonConfig>
	showReadOnlyIndicator?: boolean
}
```

## Field Props Helper

The `getFieldProps()` method combines form state, validation, and section state into props for `Form.Item`:

```tsx
const props = form.getFieldProps("HoleId");
// Returns:
// {
//   isDirty: boolean;
//   validateStatus: 'error' | undefined;
//   help: string | undefined;
//   readOnly: boolean;
// }

<Form.Item label="Hole ID" {...props}>
	<Input />
</Form.Item>;
```

## Validation

The hook automatically handles two-tier validation:

```tsx
const validation = form.section.validate();

// Database validation (blocking)
if (!validation.database.isValid) {
	console.log("Cannot save:", validation.database.errors);
}

// Save validation (non-blocking warnings)
if (!validation.save.isValid) {
	console.log("Warnings:", validation.save.warnings);
}

// Can save if database validation passes
console.log("Can save:", validation.canSave);
```

## Action Handlers

All actions are automatically provided:

```tsx
const { actions } = form;

// Available actions:
actions.onSave(); // Save changes
actions.onSubmit(); // Submit for review (Draft → Complete)
actions.onReject(); // Return to Draft
actions.onReview(); // Mark as reviewed (Complete → Reviewed)
actions.onApprove(); // Approve (Reviewed → Approved)
actions.onExclude(); // Toggle report inclusion
```

## Dirty State

The hook tracks dirty state at both form and field levels:

```tsx
// Form-level dirty state
if (form.formState.isDirty) {
	console.log("Form has unsaved changes");
}

// Field-level dirty state
if (form.formState.dirtyFields.HoleId) {
	console.log("HoleId has been modified");
}

// Section-level dirty state (from store)
if (form.section.isDirty) {
	console.log("Section has unsaved changes in store");
}
```

## Lifecycle Management

The hook manages three lifecycle stages automatically:

1. **Initial Load** - Resets form with section data on mount
2. **Background Sync** - Resets form when section is synced from server
3. **Form Changes** - Syncs form changes to store on field change

You can hook into these with callbacks:

```tsx
const form = useFormHook({
	sectionKey: SectionKey.Collar,
	schema: collarSchema,
	callbacks: {
		beforeSave: async () => {
			// Called before save operation
			// Use for pre-save data transformation
		},
		afterSave: async () => {
			// Called after successful save
			// Use for post-save actions (navigation, notifications)
		},
		onValidationError: (errors) => {
			// Called when validation fails
			// Use for custom error handling
		},
	},
});
```

## Button Configuration

Customize button appearance and behavior:

```typescript
const customConfig: Partial<ActionButtonConfig> = {
  save: {
    label: 'Save Survey',
    icon: <DatabaseOutlined />,
    type: 'primary',
    tooltip: 'Save survey measurements',
  },
  submit: {
    label: 'Complete',
    tooltip: (section) =>
      section.isDirty
        ? 'Save changes first'
        : 'Mark as complete',
    visible: (section, permissions) => {
      // Custom visibility logic
      return !section.isDirty && permissions.canSubmit;
    },
  },
};

<ActionBar
  section={form.section}
  actions={form.actions}
  buttonConfig={customConfig}
/>
```

## Testing

### Unit Testing the Hook

```typescript
import { act, renderHook } from "@testing-library/react";
import { useFormHook } from "./useFormHook";

describe("useFormHook", () => {
	it("should initialize with section data", () => {
		const { result } = renderHook(() =>
			useFormHook({
				sectionKey: SectionKey.Collar,
				schema: collarSchema,
			})
		);

		expect(result.current.formState.isDirty).toBe(false);
		expect(result.current.section).toBeDefined();
	});

	it("should track dirty state", async () => {
		const { result } = renderHook(() =>
			useFormHook({
				sectionKey: SectionKey.Collar,
				schema: collarSchema,
			})
		);

		act(() => {
			result.current.setValue("HoleId", "NEW-001");
		});

		expect(result.current.formState.isDirty).toBe(true);
	});
});
```

### Integration Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { CollarForm } from './CollarForm';

describe('CollarForm', () => {
  it('should show Save button when dirty', async () => {
    render(<CollarForm />);

    const input = screen.getByLabelText('Hole ID');
    fireEvent.change(input, { target: { value: 'NEW-001' } });

    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should show Submit button when not dirty', async () => {
    render(<CollarForm />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });
});
```

## Migration Guide

### Migrating from useCollarForm

**Before:**
```tsx
import { useCollarForm } from "@/ux/hooks/useCollarForm";

const {
	control,
	isDirty,
	errors,
	onSave,
	getFieldProps,
} = useCollarForm();

<ActionButtons
	section={section}
	onSave={onSave}
	onSubmit={onSubmit}
	// ... other handlers
/>;
```

**After:**
```tsx
import { ActionBar, useFormHook } from "@/ux/hooks";

const form = useFormHook({
	sectionKey: SectionKey.Collar,
	schema: collarSchema,
});

<ActionBar section={form.section} actions={form.actions} />;
```

## Tips and Best Practices

1. **Keep callbacks minimal** - Use for side effects only, not data transformation
2. **Use getFieldProps()** - It handles all field-level state automatically
3. **Customize buttons sparingly** - Default config covers most cases
4. **Test with different RowStatuses** - Ensure buttons show/hide correctly
5. **Watch console logs** - Hook and component log their actions for debugging

## Troubleshooting

### Save button not appearing

Check that:
1. Section `isDirty === true`
2. User has save permission
3. Section `RowStatus` is Draft or Complete

### Submit button disabled

Check that:
1. Section `isDirty === false` (save first)
2. Database validation passes (`isValid === true`)
3. Section `RowStatus` is Draft

### Validation errors not showing

Check that:
1. Schema is correctly passed to `useFormHook`
2. Field names match schema exactly
3. `getFieldProps()` is spread on `Form.Item`

## Related Documentation

- [Generic Form Hook Design](../../../plans/GENERIC_FORM_HOOK_AND_ACTION_BAR_DESIGN.md)
- [Actions and Workflow](../../../plans/ACTIONS_AND_WORKFLOW_DOCUMENTATION.md)
- [Validation System](../types/validation.ts)
- [DrillHoleSection Interface](../types/drillhole.ts)
