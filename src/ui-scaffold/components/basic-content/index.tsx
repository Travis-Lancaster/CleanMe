import { clsx } from "clsx";

interface Props {
	style?: React.CSSProperties
	className?: string
	children: React.ReactNode
}

export function BasicContent(props: Props) {
	const { children, className, style } = props;

	return (
		<div
			id="basic-content"
			/**
			 * 1. When children height is too high and p-4 style is set, h-full cannot be set to prevent bottom padding-bottom from not appearing.
			 * Please refer to src/pages/about/index.tsx
			 *
			 * 2. If you need children height less than or equal to basic-content, please use h-full
			 * Please refer to src/pages/system/role/index.tsx
			 */
			className={clsx("p-4 box-border", className)}
			style={{ ...style }}
		>
			{
				children
			}
		</div>
	);
}
