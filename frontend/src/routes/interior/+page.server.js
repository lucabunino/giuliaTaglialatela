import { getInteriors } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const interiors = await getInteriors();
	if (interiors) {
		return {
			interiors
		};
	}
  throw error(404, 'Not found');
}