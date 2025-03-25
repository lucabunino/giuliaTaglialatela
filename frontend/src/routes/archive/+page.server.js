import { getArchive } from '$lib/utils/sanity';
import { getDisplaceImages } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const archive = await getArchive();
	const displaceImages = await getDisplaceImages();
	if (archive && displaceImages) {
		return {
			archive,
			displaceImages
		};
	}
  throw error(404, 'Not found');
}