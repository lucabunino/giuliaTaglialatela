import { getCommercials } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const commercials = await getCommercials();
	if (commercials) {
		return {
			commercials
		};
	}
  throw error(404, 'Not found');
}