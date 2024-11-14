import * as posts from '$lib/services/posts'

export const load = async () => {
	const publishedPosts = await posts.getPublishedPosts();
	return { posts: publishedPosts };
}
