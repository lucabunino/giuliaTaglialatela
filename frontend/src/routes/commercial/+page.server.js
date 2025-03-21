import { getCommercial } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const commercial = await getCommercial();
	if (commercial) {
		return {
			commercial
		};
	}
  throw error(404, 'Not found');
}