import { getArchive, getDisplaceImages } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const archive = await getArchive();
	const displaceImages = await getDisplaceImages();
	if (archive && displaceImages) {
		const commercial = archive.filter(item => item._type === 'commercial');
		const interior = archive.filter(item => item._type === 'interior');
		console.log(commercial);
		
		return {
			commercial,
			interior,
			displaceImages
		};
	}
  throw error(404, 'Not found');
}