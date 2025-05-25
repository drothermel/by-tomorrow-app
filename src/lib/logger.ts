export const logger = {
	log: (...args: unknown[]): void => {
		if (import.meta.env?.VITE_ENABLE_LOGGING !== 'false') {
			console.log(...args)
		}
	},
	error: (...args: unknown[]): void => {
		if (import.meta.env?.VITE_ENABLE_LOGGING !== 'false') {
			console.error(...args)
		}
	},
}

export default logger
