<script lang="ts">
	import BeepAudio from '$lib/components/BeepAudio.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import Actvity from '$lib/components/old/Activity/index.svelte';

	import '$lib/styles/app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light+Two&Rubik:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<TopBar />
<main class="container flex flex-col flex-1 h-full p-4 mx-auto mt-16 overflow-scroll">
	<slot />
</main>
<Actvity />
<SideNav />
<BeepAudio />

<style lang="postcss">
	:global(body) {
		min-height: 100vh;
		min-height: -webkit-fill-available;
	}
	:global(html) {
		height: -webkit-fill-available;
	}
</style>
