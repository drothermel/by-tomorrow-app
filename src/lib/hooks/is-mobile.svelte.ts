import { untrack } from 'svelte'

const MOBILE_BREAKPOINT = 768

/** Reactive helper that tracks whether the viewport width is below a mobile breakpoint. */
export class IsMobile {
	#current = $state<boolean>(false)

	/** Start listening for viewport changes. */
	constructor() {
		$effect(() => {
			return untrack(() => {
				const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
				const onChange = () => {
					this.#current = window.innerWidth < MOBILE_BREAKPOINT
				}
				mql.addEventListener('change', onChange)
				onChange()
				return () => {
					mql.removeEventListener('change', onChange)
				}
			})
		})
	}

	/** Current mobile state. */
	get current() {
		return this.#current
	}
}
