import { BasicButton } from "#src/app/components/basic-button/index.js";

import { useTabsStore } from "#src/app/store/tabs.js";
import { cn } from "#src/app/utils/cn/index.js";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useShallow } from "zustand/shallow";

interface TabMaximizeProps {
	className?: string
}
/**
 * Toggle tab maximize / minimize
 *
 * @returns Tab maximize / minimize button component
 */
export function TabMaximize({ className }: TabMaximizeProps) {
	/**
	 * useShallow - it may cause infinite loops in zustand v5
	 * https://github.com/pmndrs/zustand/blob/v5.0.0/docs/migrations/migrating-to-v5.md#requiring-stable-selector-outputs
	 */
	const { isMaximize } = useTabsStore(useShallow(state => ({ isMaximize: state.isMaximize })));
	const { toggleMaximize } = useTabsStore(useShallow(state => ({ toggleMaximize: state.toggleMaximize })));

	/**
	 * Toggle maximize / minimize
	 */
	const onClick = () => {
		toggleMaximize(!isMaximize);
	};

	return (
		<BasicButton
			className={cn(className)}
			type="text"
			size="middle"
			icon={isMaximize ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
			onClick={onClick}
		/>
	);
}
