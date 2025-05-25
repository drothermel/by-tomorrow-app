import type { SveditContext, Path, SetPathStatus } from '$lib/svedit/types'
import type SveditSession from '$lib/svedit/SveditSession.svelte'
import type BlockData from '$lib/svedit/BlockData.svelte'
import { setContext, getContext } from 'svelte'

const sveditKey = Symbol('svedit')

/**
 * Store the given session instance in Svelte's context so that nested
 * components can easily access it.
 */
export function setSveditSession(value: any) {
	setContext(sveditKey, { session: value })
}

/**
 * Convenience wrapper around {@link SveditSession.setElemByPath} using the
 * session stored in context.
 */
export function setElemByPath(
	path: Path,
	newKey: number,
	value: any
): SetPathStatus {
	return getSession().setElemByPath(path, newKey, value)
}

/** Retrieve the Svedit context object from Svelte. */
export function getSveditContext(): SveditContext {
	return getContext(sveditKey)
}

/** Get the session stored in context. */
export function getSession(): SveditSession {
	return getSveditContext().session
}

/** Shortcut for accessing the root {@link BlockData} from the session. */
export function getRootBlock(): BlockData | undefined {
	return getSession().rootBlock
}

/**
 * Retrieve a {@link BlockData} instance relative to the root block using the
 * provided path.
 */
export function getElemByPath(path: Path): BlockData | undefined {
	return getSession().getElemByPath(path)
}
