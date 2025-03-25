import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2025-03-19', // date of setup
});

export async function getSEO() {
	return await client.fetch(
		`*[_type == "seo"] {
			SEOTitle,
			SEODescription,
			SEOKeywords,
			SEOImage,
		}|order(year desc)`
	);
}
export async function getSettings() {
	return await client.fetch(
		`
		*[_type == "settings" && !(_id in path('drafts.**'))][0] {
			hoverColor,
			instagramUrl
		}
		`
	);
}
export async function getHomepage() {
	return await client.fetch(
		`
		*[_type == "selection" && !(_id in path('drafts.**')) && _id == "homepage"][0].selected[] {
			...,
			image {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
			reference->{
				_type,
				title,
				slug,
				date,
				client->{ title },
				photographer->{ title },
			},
		}
		`
	);
}
export async function getCommercial() {
	return await client.fetch(
		`
		*[_type == "selection" && !(_id in path('drafts.**')) && _id == "commercial"][0].selected[] {
			...,
			image {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
			reference->{
				_type,
				title,
				slug,
				date,
				client->{ title },
				photographer->{ title },
			},
		}
		`
	);
}
export async function getInterior() {
	return await client.fetch(
		`
		*[_type == "selection" && !(_id in path('drafts.**')) && _id == "interior"][0].selected[] {
			...,
			image {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
			reference->{
				_type,
				title,
				slug,
				date,
				client->{ title },
				photographer->{ title },
			},
		}
		`
	);
}
export async function getArchive() {
	return await client.fetch(
		`
		*[_type == "project" && !(_id in path('drafts.**'))] {
			preview {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
			client->{ title },
			photographer->{ title },
			date,
			singlePaged,
			slug,
			title
		}
		`
	);
}
export async function getDisplaceImages() {
	return await client.fetch(
		`
		*[_type == "settings" && !(_id in path('drafts.**'))][0] {
			displaceImages[] {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
		}
		`
	);
}
export async function getProject(slug) {
	return await client.fetch(
		`
		*[_type == "project" && slug.current == $slug] {
			images[] {
				asset->{
					_ref, _id, _type,
					title,
					description,
					altText,
					metadata {dimensions}
				}
			},
			client->{ title },
			photographer->{ title },
			date,
			slug,
			title
		}
		`, { slug });
}

export async function getInfo() {
	return await client.fetch(
		`
		*[_type == "info" && !(_id in path('drafts.**'))][0] {
			...,
		}
		`
	);
}