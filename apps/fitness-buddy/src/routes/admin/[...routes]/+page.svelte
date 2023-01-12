<script lang="ts">
	import { Studio, defineConfig, renderStudio } from 'sanity';
	import type { Config } from 'sanity';
	// import { deskTool } from 'sanity/desk';
	import { onMount } from 'svelte';
	import { sanityBaseConfig } from '$lib/config/sanity/config';

	const config = defineConfig(sanityBaseConfig);

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
	*:not([data-ui='Popover__arrow']):not([data-ui='Tooltip__arrow']) > svg {
		display: inline;
	}
</style>
