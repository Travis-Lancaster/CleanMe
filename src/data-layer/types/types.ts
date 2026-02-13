export const WorkMode = {
	ONLINE: 'online',   // UI <-> API
	OFFLINE: 'offline'  // UI <-> Dexie
};
export interface FilterOperators {
	gt?: number | Date;
	gte?: number | Date;
	lt?: number | Date;
	lte?: number | Date;
	contains?: string;
	startsWith?: string;
	endsWith?: string;
}

export interface FilterField {
	field: string;
	op: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'notIn';
	value: string | number | boolean | Date | Array<string | number | boolean | Date>;
}

export interface FilterOptions {
	[key: string]: string | number | boolean | Date | string[] | number[] | FilterOperators;
}

// Frontend format wrapper
export interface FilterWrapper {
	filters: FilterField[];
}

// Support both object and wrapped array formats
export type FilterInput = FilterOptions | FilterWrapper;
