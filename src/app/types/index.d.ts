/**
 * API response data format
 * data: API response data
 */
interface ApiResponse<T> {
	code: number
	result: T
	message: string
	success: boolean
}

/**
 * Array form API response data format
 * list: API response data
 */
interface ApiListResponse<T> extends ApiResponse<T> {
	result: {
		list: T[]
		total: number
		current: number
	}
}

/**
 * Pull table request parameters
 */
interface ApiTableRequest extends Record<string, any> {
	cqs?: string
	pageSize?: number
	current?: number
}

type Recordable<T = any> = Record<string, T>;
