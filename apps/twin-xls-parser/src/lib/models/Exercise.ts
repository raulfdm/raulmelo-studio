const advancedTechniquesMap = new Map<string, string>([
	['BI-Set', 'bi_set'],
	['FST-7', 'fst_7'],
	['GVT', 'gvt'],
	['Drop Set 3x', 'drop-set'],
	["Rest 'n' Pause 3x", 'rest_and_pause'],
	['Warm-Up', 'warm-up']
]);

export class Exercise {
	#name: string;
	#series: number;
	#reps: string;
	#advancedTechnique: string | null = null;
	#rest: number | null = null;

	set name(name: string) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	set setSxR(sXR: string) {
		const [seriesStr, reps] = sXR.split('x');

		this.#series = Number(seriesStr);
		this.#reps = reps;
	}

	set advancedTechnique(advancedTechnique: string) {
		if (advancedTechnique !== null && advancedTechnique.includes('Descanso')) {
			const [rest] = advancedTechnique.match(/\d+/) || [];
			this.#advancedTechnique = null;
			this.#rest = parseInt(rest as string);
		} else if (advancedTechnique) {
			this.#advancedTechnique = advancedTechniquesMap.get(advancedTechnique);
		}
	}

	get advancedTechnique() {
		return this.#advancedTechnique;
	}

	set rest(rest: number) {
		// do not want to override the rest if it was already set
		// by the advancedTechnique setter
		if (this.#rest === null) {
			this.#rest = rest;
		}
	}

	get rest() {
		return this.#rest;
	}

	getObject() {
		return {
			name: this.#name,
			series: this.#series,
			reps: this.#reps,
			advancedTechnique: this.#advancedTechnique,
			rest: this.#rest
		};
	}
}
