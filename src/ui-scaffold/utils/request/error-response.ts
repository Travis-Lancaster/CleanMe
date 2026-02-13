import { isObject } from "#src/ui-scaffold/utils/is";
import { message } from "#src/ui-scaffold/utils/static-antd";

/**
 * Handle error response
 *
 * @param response Response object
 * @returns Response object
 */
export async function handleErrorResponse(response: Response) {
	try {
		// Clone response to avoid body used error if we need to read it multiple times
		const resClone = response.clone();
		const text = await resClone.text();

		// Check for empty body
		if (!text) {
			message.error(response.statusText);
			return response;
		}

		// Parse response content as JSON format
		const data = JSON.parse(text);

		// Check if parsed data is object type
		if (isObject(data)) {
			// Cast parsed data to object type containing error information
			const json = data as { errorMsg?: string, message?: string };

			// If parsed data contains errorMsg or message property, display error information
			// Otherwise display response status text as error information
			message.error(json.errorMsg || json.message || response.statusText);
		}
		else {
			// If parsed data is not object type, directly display response status text as error information
			message.error(response.statusText);
		}
	}
	catch (e) {
		// If JSON parsing fails, print error information to console
		console.error("Error parsing JSON:", e);

		// Display response status text as error information
		message.error(response.statusText);
	}

	// Return response object
	return response;
}
