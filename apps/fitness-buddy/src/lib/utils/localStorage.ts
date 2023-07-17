export function createLocalStorage<T>(key: string) {
	return {
		write(value: T) {
			return localStorage.setItem(key, JSON.stringify(value));
		},
		read(): T | null {
			const persistedValue = localStorage.getItem(key);
			return persistedValue === null ? null : (JSON.parse(persistedValue) as T);
		}
	};
}
