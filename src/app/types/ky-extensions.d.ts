import "ky";

/**
 * Extend `ky`'s `Options` type
 * Use `ignoreLoading` to set whether to ignore loading animation
 */
declare module "ky" {
	interface Options {
		/**
		 * Set to ignore global loading animation
		 */
		ignoreLoading?: boolean
	}
	interface NormalizedOptions {
		/**
		 * Set to ignore global loading animation
		 */
		ignoreLoading?: boolean
	}
}
