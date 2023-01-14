import { defineField, defineType } from 'sanity';

const measurementGroup = 'measurement';
const bodyCompositionGroup = 'bodyComposition';

export const measurementSchema = defineType({
	name: 'measurementSchema',
	title: 'Measurements',
	type: 'document',
	groups: [
		{
			name: measurementGroup,
			title: 'Measurement',
			default: true
		},
		{
			name: bodyCompositionGroup,
			title: 'Body Composition'
		}
	],
	fields: [
		defineField({
			group: measurementGroup,
			name: 'date',
			title: 'Data',
			type: 'date',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			group: measurementGroup,
			name: 'biceps_left',
			title: 'Bíceps Esquerdo',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'biceps_right',
			title: 'Bíceps Direito',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'forearm_right',
			title: 'Antebraço Direito',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'forearm_left',
			title: 'Antebraço Esquerdo',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'shoulders',
			title: 'Ombros',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'chest',
			title: 'Peito',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'abdomen',
			title: 'Abdômen',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'glute',
			title: 'Glúteos',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'thigh_right',
			title: 'Coxa Direita',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'calf_right',
			title: 'Panturrilha Direita',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'thigh_left',
			title: 'Coxa Esquerda',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: measurementGroup,
			name: 'calf_left',
			title: 'Panturrilha Esquerda',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),

		defineField({
			group: bodyCompositionGroup,
			name: 'weight',
			title: 'Peso',
			type: 'number',
			validation: (Rule) => Rule.min(0).required()
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'body_fat',
			title: 'Body Fat (%)',
			type: 'number',
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'skeletal_muscle_percentage',
			title: 'Skeletal Muscle (%)',
			type: 'number',
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'visceral_fat',
			title: 'Visceral fat level',
			type: 'number',
			validation: (Rule) => Rule.min(0)
		}),

		/**
		 * Deleted Fields
		 */
		defineField({
			group: bodyCompositionGroup,
			name: 'skeletal_muscle',
			title: 'Skeletal Muscle (kg)',
			type: 'number',
			hidden: () => true
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'fat_mass',
			title: 'Fat Mass (kg)',
			type: 'number',
			hidden: () => true
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'bmr',
			title: 'BMR (kcal)',
			type: 'number',
			hidden: () => true
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'body_water',
			title: 'Body Water (kg)',
			type: 'number',
			hidden: () => true
		}),
		defineField({
			group: bodyCompositionGroup,
			name: 'bmi',
			title: 'BMI',
			type: 'number',
			hidden: () => true
		})
	],
	preview: {
		select: {
			date: 'date',
			weight: 'weight'
		},
		prepare({ date, weight }: { date: string; weight: number }) {
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			} as const;

			if (date !== undefined && weight !== undefined) {
				return {
					title: new Intl.DateTimeFormat('default', options).format(new Date(date)),
					subtitle: `${weight} kg`
				};
			}

			return {
				title: 'Sem título'
			};
		}
	}
});
