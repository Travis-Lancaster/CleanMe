import { AutoComplete, DatePicker, Form, Input, InputNumber, Select } from "antd";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { Controller } from "react-hook-form";
import type { ReactNode } from "react";
import dayjs from "dayjs";
import { memo } from "react";

const { TextArea } = Input;
export type FieldType = "text" | "number" | "select" | "date" | "autocomplete" | "area" | "label";
export type DisplayMode = "form" | "description";

interface SheetFormFieldProps<T extends FieldValues> {
	name: FieldPath<T>
	control: Control<T>
	label?: string
	type?: FieldType
	options?: Array<{ value: string | number, label: string | number }>
	placeholder?: string
	bordered?: boolean
	readOnly?: boolean
	required?: boolean
	min?: number
	max?: number
	style?: React.CSSProperties
	validateStatus?: "" | "success" | "warning" | "error" | "validating"
	help?: ReactNode
	className?: string
	displayMode?: DisplayMode
	span?: number
	onChange?: (value: any) => void
	isDirty?: boolean
}

/**
 * Memoized form field component for sheets
 */
function SheetFormFieldComponent<T extends FieldValues>({
	name,
	control,
	label,
	required,
	type = "text",
	options,
	placeholder,
	readOnly = false,
	min,
	max,
	style,
	validateStatus,
	help,
	className,
	displayMode = "form",
	onChange,
	isDirty = false,
}: SheetFormFieldProps<T>) {
	// Logic to render the actual input/control component
	const renderControl = (field: any, originalType: FieldType) => {
		let currentType = type;

		if (readOnly) {
			currentType = "label";
		}

		// Determine if we are in description mode or an 'inner' label case.
		const isInnerBordered = displayMode === "description" || currentType === "label";

		const commonProps = {
			...field,
			placeholder,
			readOnly,
			// Apply style logic: transparent background for input fields in 'form' mode
			style: {
				background: isInnerBordered ? undefined : "transparent",
				width: "100%",
				border: isDirty ? "2px solid #f1ba05" : undefined,
				...style,
			},
			// Use 'borderless' variant if readOnly is true and not in 'text' mode,
			// or if it's explicitly 'label' type in 'form' mode.
			variant: currentType === "label" || readOnly ? "borderless" : undefined,
		};

		const filterSelectOption = (input: string, option?: { label?: ReactNode, value?: string | number }) => {
			const labelText = String(option?.label ?? "").toLowerCase();
			return labelText.includes(input.toLowerCase());
		};

		switch (currentType) {
			// ... (Input components with commonProps)
			case "number":
				return <InputNumber {...commonProps} min={min} max={max} />;
			case "select":
				return <Select {...commonProps} showSearch options={options} filterOption={filterSelectOption} />;
			case "date":
				return (
					<DatePicker
						{...field}
						value={field.value ? dayjs(field.value) : null}
						onChange={date => field.onChange(date?.toISOString())}
						format="YYYY-MM-DD"
						style={{
							background: isInnerBordered ? undefined : "transparent",
							width: "100%",
							border: isDirty ? "2px solid #f1ba05" : undefined,
							...style,
						}}
					// Remove commonProps variant setting as DatePicker doesn't use it the same way.
					/>
				);
			case "autocomplete":
				return (
					<AutoComplete
						{...commonProps}
						showSearch
						options={options}
						filterOption={filterSelectOption}
						variant="outlined"
						onChange={(value) => {
							field.onChange(value);
							onChange?.(value);
						}}
					>
						<Input.Search placeholder={placeholder} />
					</AutoComplete>
				);
			case "area":
				return <TextArea {...commonProps} autoSize={{ minRows: 2, maxRows: 6 }} />;
			case "label":
				{
					// Format the value based on original type
					let displayValue = field.value;
					if (originalType === "date" && field.value) {
						displayValue = dayjs(field.value).format("YYYY-MM-DD");
					}
					return <span>{displayValue || "-"}</span>;
				}
			case "text":
			default:
				{
					const inputValue = readOnly && originalType === "date" && field.value ? dayjs(field.value).format("YYYY-MM-DD") : field.value;
					return <Input {...commonProps} value={inputValue} />;
				}
		}
	};

	const fieldContent = (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				//	console.log('📝 SheetFormField render:', { name, hasError: !!fieldState.error, error: fieldState.error });

				// Only wrap onChange if custom onChange is provided
				const finalField = onChange ? {
					...field,
					onChange: (value: any) => {
						//	console.log('📝 SheetFormField onChange (wrapped):', { name, value });
						field.onChange(value); // Update RHF
						onChange(value); // Call custom onChange
					},
				} : field;

				return renderControl(finalField, type);
			}}
		/>
	);

	// When in description mode, return just the Form.Item without label
	// The parent FormDescriptions component will extract the label prop and handle layout
	if (displayMode === "description") {
		return (
			<Form.Item
				// Don't render label here - FormDescriptions extracts it from props
				label={undefined}
				required={required}
				validateStatus={validateStatus}
				help={help}
				style={{ margin: 0, ...style }}
				className={className}
			>
				{fieldContent}
			</Form.Item>
		);
	}

	// Default: Form Mode
	return (
		<Form.Item
			label={label}
			required={required}
			validateStatus={validateStatus}
			help={help}
			style={{ margin: 0 }}
			className={className}
		>
			{fieldContent}
		</Form.Item>
	);
}

// Export memoized version
export const SheetFormField = memo(SheetFormFieldComponent) as typeof SheetFormFieldComponent;
