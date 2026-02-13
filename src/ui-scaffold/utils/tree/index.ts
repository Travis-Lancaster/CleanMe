/**
 * @description Construct tree structure data
 * @param data Data source
 * @param id ID field, default 'id'
 * @param parentId Parent node field, default 'parentId'
 * @param children Child node field, default 'children'
 * @returns Tree after adding fields
 */
export function handleTree(data: any[], id?: string, parentId?: string, children?: string): any {
	if (!Array.isArray(data)) {
		console.warn("data must be an array");
		return [];
	}
	const config = {
		id: id || "id",
		parentId: parentId || "parentId",
		childrenList: children || "children",
	};

	const childrenListMap: any = {};
	const nodeIds: any = {};
	const tree = [];

	for (const d of data) {
		const parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (const d of data) {
		const parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (const t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o: Record<string, any>) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (const c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}

export interface TreeConfigOptions {
	// The name of the child property, defaults to 'children'
	childProps: string
}

/**
 * Traverse the tree structure and return the specified values from all nodes.
 * @param tree Tree structure array
 * @param getValue Function to get the node value
 * @param options Optional property name for child node array.
 * @returns Array of specified values from all nodes
 */
export function traverseTreeValues<T, V>(
	tree: T[],
	getValue: (node: T) => V,
	options?: TreeConfigOptions,
): V[] {
	const result: V[] = [];
	const { childProps } = options || {
		childProps: "children",
	};

	const dfs = (treeNode: T) => {
		const value = getValue(treeNode);
		result.push(value);
		const children = (treeNode as Record<string, any>)?.[childProps];
		if (!children) {
			return;
		}
		if (children.length > 0) {
			for (const child of children) {
				dfs(child);
			}
		}
	};

	for (const treeNode of tree) {
		dfs(treeNode);
	}
	return result.filter(Boolean);
}

/**
 * Filter nodes in the given tree structure based on conditions, and return an array of all matching nodes in the original order.
 * @param tree Root node array of tree structure to filter.
 * @param filter Condition to match each node.
 * @param options Optional property name for child node array.
 * @returns Array containing all matching nodes.
 */
export function filterTree<T extends Record<string, any>>(
	tree: T[],
	filter: (node: T) => boolean,
	options?: TreeConfigOptions,
): T[] {
	const { childProps } = options || {
		childProps: "children",
	};

	const _filterTree = (nodes: T[]): T[] => {
		return nodes.filter((node: Record<string, any>) => {
			if (filter(node as T)) {
				if (node[childProps]) {
					node[childProps] = _filterTree(node[childProps]);
				}
				return true;
			}
			return false;
		});
	};

	return _filterTree(tree);
}

/**
 * Remap nodes in the given tree structure based on conditions
 * @param tree Root node array of tree structure to filter.
 * @param mapper Condition used to map each node.
 * @param options Optional property name for child node array.
 */
export function mapTree<T, V extends Record<string, any>>(
	tree: T[],
	mapper: (node: T) => V,
	options?: TreeConfigOptions,
): V[] {
	const { childProps } = options || {
		childProps: "children",
	};
	return tree.map((node) => {
		const mapperNode: Record<string, any> = mapper(node);
		if (mapperNode[childProps]) {
			mapperNode[childProps] = mapTree(mapperNode[childProps], mapper, options);
		}
		return mapperNode as V;
	});
}
