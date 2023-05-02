import type { Row } from 'read-excel-file';

import type { Routine } from '../../models/Routine';

export function updateSchedule(rows: Row[], weekRoutine: Routine[]) {
	const rowStart = 1;
	const rowEnd = 9;

	const columnEnd = 14;
	let dayIndex = 0;

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		if (rowIndex > rowStart && rowIndex < rowEnd) {
			const row = rows[rowIndex];

			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				if (columnIndex == columnEnd) {
					const cellValue = row[columnIndex];

					const currentRoutine = weekRoutine[dayIndex];

					if (cellValue === null) {
						currentRoutine.title = 'Cardio';
						currentRoutine.subtitle = 'AEJ';
					} else {
						currentRoutine.title = `Treino ${cellValue}`;
					}

					dayIndex++;
				}
			}
		}
	}
}
