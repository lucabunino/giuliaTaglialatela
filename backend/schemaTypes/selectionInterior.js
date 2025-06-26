export default {
	name: 'selectionInterior',
	type: 'document',
	fields: [
		{
			name: 'title',
			type: 'string',
			hidden: true,
		},
		{
			name: 'selected',
			type: 'array',
			validation: (Rule) => Rule.required().min(4),
			of: [
				{
					name: 'selectedProject',
					type: 'object',
					fields: [
						{
							name: 'reference',
							type: 'reference',
							to: [{ type: 'interior' }],
							options: {
								filter: 'status == $status',
								filterParams: { status: 'public' }
							},
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'size',
							type: 'string',
							options: {
								layout: 'radio',
								direction: 'horizontal',
								list: [
									{ title: 'Small', value: 'S' },
									{ title: 'Medium', value: 'M' },
									{ title: 'Large', value: 'L' }
								],
							},
							initialValue: 'M',
							validation: (Rule) => Rule.required()
						},
					],
					preview: {
						select: {
							title: 'reference.title',
							size: 'size',
							client: 'reference.client.title',
							preview: 'reference.preview'
						},
						prepare({ title, date, client, preview, size }) {
							return {
								title: `[${size}] ${title}`,
								subtitle: `× ${client || 'No client'}`,
								media: preview,
							};
						}
					}
				},
			],
		},
	],
};