import {orderRankField} from '@sanity/orderable-document-list'
import { EditIcon } from "@sanity/icons";

export default {
name: 'project',
type: 'document',
fields: [
	orderRankField({ type: "project" }),
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
		initialValue: 'public',
		validation: (Rule) => Rule.required(),
	},
	{
		name: 'kind',
		type: 'string',
		options: {
			list: [
			{ title: 'Commercial', value: 'commercial' },
			{ title: 'Interior', value: 'interior' },
			],
			layout: 'radio'
		},
		initialValue: 'commercial',
		validation: (Rule) => Rule.required(),
	},
	{
	name: 'singlePaged',
	type: 'boolean',
	description: "Turn this off to hide the link in Archive",
	initialValue: true,
	},
	{
	name: 'date',
	type: 'date',
	options: {
		dateFormat: 'DD.MM.YYYY'
	},
	validation: (Rule) => Rule.required()
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
	},
	prepare({ title, client, preview, status }) {
		return {
			title: status === "hidden" ? `[HIDDEN] ${title}` : title,
			subtitle: client || 'No client',
			media: status === "hidden" ? undefined : preview,
			icon: status === "hidden" ? EditIcon : undefined,
		};
	},
}
};