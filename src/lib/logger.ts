/** Simple wrapper around console logging controlled by an env variable. */
export const logger = {
	/** Log informational messages when logging is enabled. */
	log: (...args: unknown[]): void => {
		if (import.meta.env?.VITE_ENABLE_LOGGING !== 'false') {
			console.log(...args)
		}
	},
	/** Log error messages when logging is enabled. */
	error: (...args: unknown[]): void => {
		if (import.meta.env?.VITE_ENABLE_LOGGING !== 'false') {
			console.error(...args)
		}
	},
}

export default logger
