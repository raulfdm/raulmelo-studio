export function secondsToMinutes(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;

	const secs = seconds % 60;
	const secondsFormat = secs < 10 ? `0${secs}` : secs;

	return `${minutesFormat}:${secondsFormat}`;
}
