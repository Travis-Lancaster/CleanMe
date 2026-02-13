import type { TabPaneProps } from "antd";
import { usePreferencesStore } from "#src/ui-scaffold/store/preferences";
import { getAppNamespace } from "#src/ui-scaffold/utils/get-app-namespace";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @en Tab item properties interface.
 */
export interface TabItemProps extends Omit<TabPaneProps, "tab"> {
	key: string
	label: React.ReactNode
	/**
	 * @en Whether it can be dragged.
	 */
	draggable?: boolean
	/**
	 * Optional history state values, such as search and hash, can be stored here
	 * They can be accessed via useLocation hook in target route
	 * @see {@link https://reactrouter.com/en/main/hooks/use-navigate#optionsstate | usenavigate - options state}
	 */
	historyState?: Record<string, any>
}

export interface TabStateType extends Omit<TabItemProps, "label"> {
	label: string
	/**
	 * @en The new title of the tab, used to modify the title of the tab.
	 */
	newTabTitle?: React.ReactNode
}

/**
 * @en Initial state.
 */
const initialState = {
	/**
	 * @en Tab collection.
	 */
	openTabs: new Map<string, TabStateType>([]),
	/**
	 * @en The currently active tab.
	 */
	activeKey: "",
	/**
	 * @en Whether it is in a refresh state.
	 */
	isRefresh: false,
	/**
	 * @en Whether the tab is maximized.
	 */
	isMaximize: false,
};

type TabsState = typeof initialState;

/**
 * @en Tab operation methods.
 */
interface TabsAction {
	setIsRefresh: (state: boolean) => void
	addTab: (routePath: string, tabProps: TabStateType) => void
	insertBeforeTab: (routePath: string, tabProps: TabStateType) => void
	removeTab: (routePath: string) => void
	closeRightTabs: (routePath: string) => void
	closeLeftTabs: (routePath: string) => void
	closeOtherTabs: (routePath: string) => void
	closeAllTabs: () => void
	setActiveKey: (routePath: string) => void
	resetTabs: () => void
	changeTabOrder: (from: number, to: number) => void
	toggleMaximize: (state: boolean) => void
	setTableTitle: (routePath: string, title: string) => void
	resetTableTitle: (routePath: string) => void
};

/**
 * @en Tab state management.
 */
export const useTabsStore = create<TabsState & TabsAction>()(
	persist(
		set => ({
			...initialState,

			/**
			 * @en Set whether the tab is in a refresh state.
			 */
			setIsRefresh: (state: boolean) => {
				set({ isRefresh: state });
			},

			/**
			 * @en Set the tab.
			 */
			setActiveKey: (routePath: string) => {
				set({ activeKey: routePath });
			},

			/**
			 * @en Insert a tab at the front.
			 */
			insertBeforeTab: (routePath: string, tabProps: TabStateType) => {
				set((state) => {
					if (routePath.length) {
						const newMap = new Map([[routePath, tabProps]]);
						for (const [key, value] of state.openTabs) {
							newMap.set(key, value);
						}
						return { openTabs: newMap };
					}
					return state;
				});
			},

			/**
			 * @en Add a tab.
			 */
			addTab: (routePath: string, tabProps: TabStateType) => {
				set((state) => {
					if (routePath.length) {
						const newTabs = new Map(state.openTabs);
						/**
						 * 1. If tab already exists, update historyState property, so don't deduplicate, and ...newTabs.get(routePath) is to ensure home closable property not overwritten
						 * 2. If tab does not exist, add to Map
						 */
						newTabs.set(routePath, { ...newTabs.get(routePath), ...tabProps });
						return { openTabs: newTabs };
					}
					return state;
				});
			},

			/**
			 * @en Remove a tab.
			 */
			removeTab: (routePath: string) => {
				set((state) => {
					const homePath = import.meta.env.VITE_BASE_HOME_PATH;

					// If it is the home page, do not allow closing
					if (routePath === homePath) {
						return state;
					}

					const newTabs = new Map(state.openTabs);
					newTabs.delete(routePath);
					let newActiveKey = state.activeKey;

					// Remove the currently active tab, then select the last tab
					if (routePath === state.activeKey) {
						const tabsArray = Array.from(newTabs.keys());
						newActiveKey = tabsArray.at(-1) || homePath;
					}

					// Ensure at least keep the home tab
					if (newTabs.size === 0) {
						newTabs.set(homePath, state.openTabs.get(homePath)!);
						newActiveKey = homePath;
					}

					return { openTabs: newTabs, activeKey: newActiveKey };
				});
			},

			/**
			 * @en Close tabs on the right.
			 */
			closeRightTabs: (routePath: string) => {
				set((state) => {
					const newTabs = new Map();
					let found = false;
					let activeKeyFound = false;
					let newActiveKey = state.activeKey;

					// Iterate through all current tabs
					for (const [key, value] of state.openTabs) {
						// If specified path is found, stop iteration
						if (found) {
							break;
						}
						// Add current tab to new Map
						newTabs.set(key, value);
						// If current key equals specified path, mark as found
						if (key === routePath) {
							found = true;
						}
						// If current key equals current active tab, mark activeKey as found
						if (key === state.activeKey) {
							activeKeyFound = true;
						}
					}

					// If current active tab is closed, set new active tab to specified path
					if (!activeKeyFound) {
						newActiveKey = routePath;
					}

					// Return updated state
					return { openTabs: newTabs, activeKey: newActiveKey };
				});
			},

			/**
			 * @en Close tabs on the left.
			 */
			closeLeftTabs: (routePath: string) => {
				set((state) => {
					const newTabs = new Map();
					const homePath = import.meta.env.VITE_BASE_HOME_PATH;
					let found = false;
					let newActiveKey = state.activeKey;
					let activeKeyOnRight = false;

					// First add home tab, because it cannot be deleted
					newTabs.set(homePath, state.openTabs.get(homePath)!);

					// Iterate through all current tabs
					for (const [key, value] of state.openTabs) {
						if (key === homePath)
							continue; // Skip home tab, as it has already been added

						if (found || key === routePath) {
							newTabs.set(key, value);
							found = true;
						}

						if (key === state.activeKey && found) {
							activeKeyOnRight = true;
						}
					}

					// If current active tab is closed on the left, set new active tab to specified path
					if (!activeKeyOnRight) {
						newActiveKey = routePath;
					}

					// Return updated state
					return { openTabs: newTabs, activeKey: newActiveKey };
				});
			},

			/**
			 * @en Close other tabs.
			 */
			closeOtherTabs: (routePath: string) => {
				set((state) => {
					const newTabs = new Map();
					const homePath = import.meta.env.VITE_BASE_HOME_PATH;

					// Keep home tab
					newTabs.set(homePath, state.openTabs.get(homePath)!);

					// Keep specified tab
					if (routePath !== homePath && state.openTabs.has(routePath)) {
						newTabs.set(routePath, state.openTabs.get(routePath)!);
					}

					// Update active tab
					let newActiveKey = state.activeKey;
					if (!newTabs.has(state.activeKey)) {
						newActiveKey = routePath;
					}

					return { openTabs: newTabs, activeKey: newActiveKey };
				});
			},

			/**
			 * @en Close all tabs.
			 */
			closeAllTabs: () => {
				set((state) => {
					const newTabs = new Map();
					const homePath = import.meta.env.VITE_BASE_HOME_PATH;
					newTabs.set(homePath, state.openTabs.get(homePath)!);
					return { openTabs: newTabs, activeKey: homePath };
				});
			},

			/**
			 * @en Change tab order.
			 */
			changeTabOrder: (from: number, to: number) => {
				set((state) => {
					// You can also use import { arrayMove } from "@dnd-kit/sortable"; to swap positions
					const newTabs = Array.from(state.openTabs.entries());
					const [movedTab] = newTabs.splice(from, 1); // Directly destructuring to get the moved tab
					newTabs.splice(to, 0, movedTab); // Insert to new position

					const newOpenTabs = new Map(newTabs); // Directly use Map constructor
					return { openTabs: newOpenTabs };
				});
			},

			/**
			 * @en Toggle tab maximization status
			 * @param {boolean} state - Maximized status
			 */
			toggleMaximize: (state: boolean) => {
				set({ isMaximize: state });
			},

			/**
			 * @en Set the tab title
			 */
			setTableTitle: (routePath: string, title: React.ReactNode) => {
				set((state) => {
					console.log(`setTableTitle ${routePath} - ${title}`);
					const newTabs = new Map(state.openTabs);
					const targetTab = newTabs.get(routePath);
					if (targetTab) {
						targetTab.newTabTitle = title;
						newTabs.set(routePath, targetTab);
						return { openTabs: newTabs };
					}
					return state;
				});
			},

			/**
			 * @en Reset the tab title (delete custom titles)
			 */
			resetTableTitle: (routePath: string) => {
				set((state) => {
					console.log(`resetTableTitle ${routePath} - ${routePath}`);
					const newTabs = new Map(state.openTabs);
					const targetTab = newTabs.get(routePath);
					if (targetTab) {
						delete targetTab.newTabTitle;
						newTabs.set(routePath, targetTab);
						return { openTabs: newTabs };
					}
					return state;
				});
			},

			/**
			 * @en Reset all tab states
			 */
			resetTabs: () => {
				set(() => {
					return { ...initialState };
				});
			},

		}),
		{
			name: getAppNamespace("tabbar"),
			/**
			 * activeKey does not need to be persisted storage
			 *
			 * If page route is /home
			 * Manually enter /about in address bar
			 * activeKey is still /home causing src/layout/layout-tabbar/index.tsx automatic navigation function to fail
			 * @see https://github.com/condorheroblog/b2-gold/issues/1
			 */
			partialize: (state) => {
				return Object.fromEntries(
					Object.entries(state).filter(([key]) => !["activeKey"].includes(key)),
				);
			},
			/**
			 * openTabs is a Map, persistence storage needs manual management
			 * How do I use it with Map and Set
			 * @see https://github.com/pmndrs/zustand/blob/v5.0.1/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set
			 */
			storage: {
				getItem: (name) => {
					const str = sessionStorage.getItem(name);
					// Whether to enable persistent storage, if not enabled, return null on first page entry
					const isPersist = usePreferencesStore.getState().tabbarPersist;
					if (!str || !isPersist)
						return null;
					const existingValue = JSON.parse(str);
					return {
						...existingValue,
						state: {
							...existingValue.state,
							openTabs: new Map(existingValue.state.openTabs),
						},
					};
				},
				setItem: (name, newValue) => {
					// functions cannot be JSON encoded
					const str = JSON.stringify({
						...newValue,
						state: {
							...newValue.state,
							openTabs: Array.from(newValue.state.openTabs.entries()),
						},
					});
					sessionStorage.setItem(name, str);
				},
				removeItem: name => sessionStorage.removeItem(name),
			},
		},
	),

);
