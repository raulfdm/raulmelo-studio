import { defineField, defineType } from 'sanity';

export const trainingSchema = defineType({
	name: 'trainingSchema',
	title: 'Training Schema',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Titulo',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'startDate',
			title: 'Início',
			type: 'date',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'endDate',
			title: 'Fim',
			type: 'date',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'schema',
			title: 'Planilha',
			type: 'array',
			of: [
				{
					name: 'routine',
					type: 'reference',
					to: { type: 'trainingRoutine' },
					validation: (Rule) => Rule.required()
				}
			]
		})
	]
});
