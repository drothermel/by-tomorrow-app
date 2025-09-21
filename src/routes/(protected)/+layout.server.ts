import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
    await parent() // ensures proper load order

    const { userId } = locals.auth()
    if (!userId) {
        throw redirect(307, '/sign-in')
    }

    return {
        userId
    };
}