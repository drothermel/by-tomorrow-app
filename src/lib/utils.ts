import { z, type ZodIssue } from 'zod'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names. Useful when conditionally applying styles.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/** Configuration object for {@link validateSchema}. */
interface ValidateConfig<T extends z.ZodTypeAny> {
	dto: unknown
	schema: T
	schemaName: string
}

/**
 * Validate an object against a Zod schema and throw if invalid.
 */
export function validateSchema<T extends z.ZodTypeAny>(
	config: ValidateConfig<T>
): z.infer<T> {
	const { data, success, error } = config.schema.safeParse(config.dto)

	if (success) {
		return data
	} else {
		captureError(`API Validation Error: ${config.schemaName}`, {
			dto: config.dto,
			error: error.message,
			issues: error.issues,
		})

		throw error
	}
}

/** Log an error with optional extra context. */
function captureError(message: string, extra = {}): void {
	console.error(message, extra)
}
