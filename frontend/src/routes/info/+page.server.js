import { getInfo, getDisplaceImages } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const info = await getInfo();
	const displaceImages = await getDisplaceImages();
	if (info && displaceImages) {
		return {
			info,
			displaceImages
		};
	}
  throw error(404, 'Not found');
}