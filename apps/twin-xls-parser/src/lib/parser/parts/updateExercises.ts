import type { Row } from 'read-excel-file';

import { Exercise } from '../../models/Exercise';
import type { Routine } from '../../models/Routine';

export function updateExercises(rows: Row[], weekRoutine: Routine[]): void {
	const trainingRoutine = getOnlyTraining(weekRoutine);

	/**
	 * This values are based on the excel file structure.
	 *
	 * The first block over exercises starts at row 1 and ends at row 17.
	 * The second block over exercises starts at row 18 and ends at the end of the file.
	 */
	updateExercises(1, 17, [0, 1, 2]);
	updateExercises(18, undefined, [3, 4, 5]);

	function updateExercises(rowStart: number, rowEnd: number, trainings: [number, number, number]) {
		const nextRows = rows.slice(rowStart, rowEnd);
		const subtitleRowIndex = 1;
		const exerciseRowIndexStart = 3;
		const exerciseRowIndexEnd = 14;
		const suggestedRestRowIndex = 15;

		for (let rowIndex = 0; rowIndex < nextRows.length; rowIndex++) {
			const row = nextRows[rowIndex];

			if (rowIndex === subtitleRowIndex) {
				handleSubtitle(row);
			} else if (rowIndex >= exerciseRowIndexStart && rowIndex <= exerciseRowIndexEnd) {
				handleExercises(row);
			} else if (rowIndex === suggestedRestRowIndex) {
				handleSuggestedRest(row);
			}
		}

		function handleSubtitle(row: Row) {
			const columnIndexes = [1, 5, 9];

			for (let index = 0; index < columnIndexes.length; index++) {
				const columnIndex = columnIndexes[index];
				const routineIndex = trainings[index];

				const cellValue = row[columnIndex];

				const currentRoutine = trainingRoutine[routineIndex];

				if (currentRoutine && cellValue) {
					currentRoutine.subtitle = cellValue as string;
				}
			}
		}

		function handleExercises(row: Row) {
			const columnsIndexes = [
				[1, 2, 3],
				[5, 6, 7],
				[9, 10, 11]
			];

			for (let index = 0; index < columnsIndexes.length; index++) {
				const exerciseIndexes = columnsIndexes[index];
				const routineIndex = trainings[index];
				const routine = trainingRoutine[routineIndex];

				const name = row[exerciseIndexes[0]] as string;
				const sXR = row[exerciseIndexes[1]] as string;
				const advancedTechnique = row[exerciseIndexes[2]] as string;

				if (name !== null && sXR !== null) {
					// Bi-set
					if (name.includes('+')) {
						const [ex1, ex2] = name.split('+');

						const exercise1 = new Exercise();
						exercise1.name = ex1.trim();

						exercise1.setSxR = sXR;
						exercise1.advancedTechnique = advancedTechnique;
						routine.addExercise(exercise1);

						const exercise2 = new Exercise();
						exercise2.name = ex2.trim();
						exercise2.setSxR = sXR;
						exercise2.advancedTechnique = advancedTechnique;
						routine.addExercise(exercise2);
					} else {
						const exercise = new Exercise();
						exercise.name = name;
						exercise.setSxR = sXR;
						exercise.advancedTechnique = advancedTechnique;
						routine.addExercise(exercise);
					}
				}
			}
		}

		function handleSuggestedRest(row: Row) {
			const columnIndexes = [1, 5, 9];

			for (let index = 0; index < columnIndexes.length; index++) {
				const columnIndex = columnIndexes[index];
				const routineIndex = trainings[index];

				const cellValue = row[columnIndex];

				const currentRoutine = trainingRoutine[routineIndex];

				if (cellValue !== null) {
					currentRoutine.suggestedRest = cellValue as string;
				}
			}
		}
	}
}

function getOnlyTraining(routines: Routine[]) {
	return routines.filter((routine) => routine.title.includes('Treino'));
}
