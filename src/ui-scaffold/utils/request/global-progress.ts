import { useGlobalStore } from "#src/ui-scaffold/store/global";

// Define a global variable to track how many requests are currently in progress
let requestCount = 0;

export const globalProgress = {
	/**
	 * Start request
	 *
	 * If request count is 0, show global loading animation, and increment request count by 1.
	 */
	start() {
		if (requestCount === 0) {
			// Show global loading animation
			useGlobalStore.getState().openGlobalSpin();
		}
		// Increment request count by 1
		requestCount++;
	},

	/**
	 * Callback function after request completion
	 *
	 * @description Decrement request count by 1, and ensure request count does not go below 0;
	 *              if request count is 0, hide global loading animation
	 */
	done() {
		// Decrement request count by 1, but ensure request count does not go below 0
		requestCount = Math.max(requestCount - 1, 0);
		if (requestCount === 0) {
			// Hide global loading animation
			useGlobalStore.getState().closeGlobalSpin();
		}
	},

	/**
	 * Force complete request
	 *
	 * Set request count directly to 0, and hide global loading animation
	 */
	forceFinish() {
		// Directly set request count to 0
		requestCount = 0;
		// Hide global loading animation
		useGlobalStore.getState().closeGlobalSpin();
	},
};
