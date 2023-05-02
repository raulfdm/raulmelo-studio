import { createHash } from 'node:crypto';

import type { Exercise } from './Exercise';

export class Routine {
	#title: string;
	#subtitle: string;
	#exercises: Exercise[] = [];
	#suggestedRest: number;
	#cardioTime: number | null = 0;
	#date: string;
	#updatedRest = false;

	constructor(date: string) {
		this.#date = date;
	}

	get id() {
		const idParts = `new imported routine ${this.#date} ${this.#title} ${this.#subtitle}`
			.split(' ')
			.filter(Boolean)
			.join(' ');

		return createHash('sha256').update(idParts).digest('hex');
	}

	get title() {
		return this.#title;
	}

	set title(title: string) {
		this.#title = title;
	}

	set subtitle(subtitle: string) {
		this.#subtitle = subtitle;
	}

	get subtitle() {
		return this.#subtitle;
	}

	set suggestedRest(suggestedRest: string) {
		const [rest] = suggestedRest.match(/\d+/) || [];

		if (!rest) {
			throw new Error('suggestedRest is not a number');
		}

		this.#suggestedRest = parseInt(rest);
	}

	set cardioTime(cardioTime: string | number | null) {
		if (cardioTime === null) {
			this.#cardioTime = null;
			return;
		}

		if (typeof cardioTime === 'number') {
			this.#cardioTime = cardioTime;
			return;
		}

		const [time] = cardioTime.match(/\d+/) || [];

		if (!time) {
			throw new Error('cardioTime is not a number');
		}

		this.#cardioTime = parseInt(time);
	}

	get cardioTime() {
		return this.#cardioTime;
	}

	get date() {
		return this.#date;
	}

	#updateExercises() {
		for (const exercise of this.#exercises) {
			if (this.#suggestedRest) {
				exercise.rest = this.#suggestedRest;
			}
		}

		this.#updatedRest = true;
	}

	addExercise(exercise: Exercise) {
		this.#exercises.push(exercise);
	}

	set exercises(exercises: Exercise[]) {
		this.#exercises = [...exercises];
	}

	get exercises() {
		return [...this.#exercises];
	}

	getObject() {
		if (!this.#updatedRest) {
			this.#updateExercises();
		}

		return {
			id: this.id,
			title: this.#title,
			subtitle: this.#subtitle,
			cardioTime: this.#cardioTime,
			date: this.#date,
			exercises:
				this.#exercises.length > 0 ? this.#exercises.map((exercise) => exercise.getObject()) : null
		};
	}
}

export type PlainRoutine = ReturnType<Routine['getObject']>;
