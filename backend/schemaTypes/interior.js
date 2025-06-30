// import {orderRankField} from '@sanity/orderable-document-list'
import { EditIcon } from "@sanity/icons";

export default {
name: 'interior',
type: 'document',
fields: [
	// orderRankField({ type: "project" }),
	{
	name: 'title',
	type: 'string',
	},
	{
	name: 'slug',
	type: 'slug',
	validation: (Rule) => Rule.required(),
		options: {
			source: 'title',
			maxLength: 96,
		},
	},
	{
		name: 'status',
		type: 'string',
		options: {
			list: [
				{ title: 'Public', value: 'public' },
				{ title: 'Hidden', value: 'hidden' },
			],
		},
		initialValue: 'hidden',
		validation: (Rule) => Rule.required(),
	},
	{
		name: 'singlePaged',
		type: 'boolean',
		description: "Turn this off to hide the link in Archive",
		initialValue: true,
	},
	{
		name: 'client',
		type: 'reference',
		to: [{ type: 'client' }]
	},
	{
		name: 'photographer',
		type: 'reference',
		to: [{ type: 'photographer' }]
	},
	{ 
		name: 'preview',
		type: 'image',
		validation: (Rule) => Rule.required(),
	},
	{
	name: 'images',
	type: 'array',
	of: [
		{ type: 'image' },
	],
	options: {
		layout: 'grid'
	},
	},
],
preview: {
	select: {
		title: 'title',
		client: 'client.title',
		preview: 'preview',
		status: 'status',
		singlePaged: 'singlePaged'
	},
	prepare({ title, client, preview, status, singlePaged }) {
		let sp
		if (singlePaged) {
			sp = 'YES'
		} else {
			sp = 'NO'
		}
		return {
			title: status === "hidden" ? `[HIDDEN / ${sp}] ${title}` : `[${sp}] ${title}`,
			subtitle: status === "hidden" ? '' : client || 'No client',
			media: status === "hidden" ? undefined : preview,
			icon: status === "hidden" ? EditIcon : undefined,
		};
	},
}
};