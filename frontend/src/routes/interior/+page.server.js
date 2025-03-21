import { getInterior } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const interior = await getInterior();
	if (interior) {
		return {
			interior
		};
	}
  throw error(404, 'Not found');
}