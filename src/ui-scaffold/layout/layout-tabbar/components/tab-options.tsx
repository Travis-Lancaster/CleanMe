import type { MenuProps } from "antd";
import { BasicButton } from "#src/ui-scaffold/components";
import { cn } from "#src/ui-scaffold/utils";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import { useDropdownMenu } from "../hooks/use-dropdown-menu";

/**
 * TabOptions component props interface
 * @interface TabOptionsProps
 * @property {string} activeKey - The key of the currently active tab
 */
interface TabOptionsProps {
	activeKey: string
	className?: string
}

/**
 * TabOptions component
 * Used to display dropdown menu for tab operation options
 * @param {TabOptionsProps} props - Component props
 * @returns {JSX.Element} TabOptions component
 */
export function TabOptions({ activeKey, className }: TabOptionsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [items, onClickMenu] = useDropdownMenu();

	/**
	 * Handle dropdown menu visibility state changes
	 * @param {boolean} open - Whether the menu is open
	 */
	const onOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	/**
	 * Handle menu item click events
	 * @param {object} param - Click event parameters
	 * @param {string} param.key - The key of the clicked menu item
	 */
	const onClick: MenuProps["onClick"] = ({ key }) => {
		onClickMenu(key, activeKey);
		setIsOpen(false);
	};

	return (
		<Dropdown
			trigger={["click"]}
			menu={{ items: items(activeKey), onClick }}
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<BasicButton
				className={cn(className)}
				size="middle"
				type="text"
				icon={<DownOutlined />}
			/>
		</Dropdown>
	);
}
