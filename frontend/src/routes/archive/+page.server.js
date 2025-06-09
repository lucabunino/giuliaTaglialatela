import { getArchive } from '$lib/utils/sanity';
import { getDisplaceImages } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const archive = await getArchive();
	const displaceImages = await getDisplaceImages();
	if (archive && displaceImages) {
		const commercial = archive.filter(item => item.kind === 'commercial');
		const interior = archive.filter(item => item.kind === 'interior');
		console.log(commercial);
		
		return {
			commercial,
			interior,
			displaceImages
		};
	}
  throw error(404, 'Not found');
}