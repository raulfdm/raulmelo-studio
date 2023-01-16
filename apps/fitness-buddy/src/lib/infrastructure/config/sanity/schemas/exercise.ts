import { defineField, defineType } from 'sanity';

const exerciseName = 'exercise';
export const exerciseSchema = defineType({
	name: exerciseName,
	title: 'Exercise',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'image',
			title: 'Description',
			type: 'image',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'youtubeVideo',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'youtubeUrl',
			title: 'Youtube Video URL',
			type: 'string'
		}),
		defineField({
			name: 'alternatives',
			title: 'Alternativas',
			type: 'array',
			of: [
				{
					type: 'reference',
					weak: true,
					to: [{ type: exerciseName }]
				}
			]
		})
	]
});
