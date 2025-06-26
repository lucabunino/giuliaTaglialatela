import { getInterior } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const interior = await getInterior(params.slug);
  if (interior) {
    return {
      interior,
    };
  }
  throw error(404, 'Not found');
}