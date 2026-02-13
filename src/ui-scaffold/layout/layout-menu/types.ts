/**
 * Menu item type definition
 */
export interface MenuItemType {
	/**
	 * Menu path, unique identifier for the item
	 */
	key: string
	/**
	 * Menu item title
	 */
	label: React.ReactNode
	/**
	 * Child menu items for submenus
	 */
	children?: MenuItemType[]
	/**
	 * Menu icon
	 */
	icon?: React.ReactNode
	/**
	 * Whether to disable the menu
	 * @default false
	 */
	disabled?: boolean
}
