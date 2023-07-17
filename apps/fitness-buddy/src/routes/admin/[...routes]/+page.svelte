<script lang="ts">
	import { defineConfig, renderStudio } from 'sanity';
	import { onMount } from 'svelte';

	import { workspaceConfig } from '$lib/infrastructure/config/sanity/workspaceConfig';

	const config = defineConfig(workspaceConfig);

	onMount(() => {
		renderStudio(document.getElementById('sanity-studio'), config);
	});
</script>

<div id="sanity-studio" />

<style>
	#sanity-studio {
		height: 100vh;
		max-height: 100dvh;
		overscroll-behavior: none;
		-webkit-font-smoothing: antialiased;
		overflow: auto;
	}

	/* Fix if you're using Tailwind.css */
	:global(*:not([data-ui='Popover__arrow']):not([data-ui='Tooltip__arrow']) > svg) {
		display: inline;
	}
</style>
