<script lang="ts">
	import audioUrl from '$lib/assets/beep.wav';
	import { audioActions, audioStore } from '$lib/stores/audio';

	let audio: HTMLAudioElement;

	$: {
		if ($audioStore === 'beeping') {
			audio.play();
		}
	}
</script>

<audio on:ended={audioActions.finish} bind:this={audio}>
	<source src={audioUrl} type="audio/wav" />
</audio>
