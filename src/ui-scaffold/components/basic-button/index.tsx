import type { ButtonProps } from "antd";

import type { ReactNode } from "react";
import { Button } from "antd";
import { forwardRef } from "react";

interface BasicButtonProps extends ButtonProps {
	children?: ReactNode
}

export const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>((props, ref) => {
	const { children } = props;

	// Clear custom properties
	const params: Partial<BasicButtonProps> = { ...props };

	return (
		<Button
			ref={ref}
			type="primary"
			{...params}
		>
			{children}
		</Button>
	);
});
