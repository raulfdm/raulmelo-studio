import { sanityClient } from '../config/sanity';

export class RemoteExercise {
	#exercisesMap: Map<string, string> = new Map();
	#filled = false;

	async loadExercises() {
		if (this.#filled) return;

		const data = (await sanityClient.fetch(`*[_type == "exercise"]{name, _id}`)) as {
			_id: string;
			name: string;
		}[];

		data.forEach((e) => this.#exercisesMap.set(e.name, e._id));

		this.#filled = true;
	}

	getExerciseId(name: string) {
		if (!this.#filled) {
			throw new Error('RemoteExercise not filled');
		}

		return this.#exercisesMap.get(name);
	}
}
