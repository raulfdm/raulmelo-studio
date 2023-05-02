import type { Row } from 'read-excel-file';

import type { Routine } from '../../models/Routine';

export function updateCardioInfo(rows: Row[], weekRoutine: Routine[]) {
	const rowStart = 10;
	const rowEnd = 18;

	const columnEnd = 14;
	let dayIndex = 0;

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		if (rowIndex > rowStart && rowIndex < rowEnd) {
			const row = rows[rowIndex];

			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				if (columnIndex == columnEnd) {
					const cellValue = row[columnIndex];

					if (cellValue) {
						const currentRoutine = weekRoutine[dayIndex];

						currentRoutine.cardioTime = cellValue as string;
					}

					dayIndex++;
				}
			}
		}
	}
}
