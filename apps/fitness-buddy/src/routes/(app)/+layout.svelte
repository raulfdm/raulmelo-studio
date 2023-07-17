<script lang="ts">
	import '$lib/styles/app.css';

	import BeepAudio from '$lib/components/BeepAudio.svelte';
	import Actvity from '$lib/components/old/Activity/index.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { sideNavService, toggleSideNav } from '$lib/stores/sideNav';

	let isMenuOpen = sideNavService.getSnapshot().matches('open');

	sideNavService.onTransition((state) => {
		isMenuOpen = state.matches('open');
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light+Two&Rubik:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" checked={isMenuOpen} />
	<div class="drawer-content">
		<TopBar />
		<main class="container p-4 mx-auto mt-16">
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<button class="drawer-overlay" on:click={toggleSideNav} on:keypress={toggleSideNav} />
		<SideNav />
	</div>
</div>

<BeepAudio />
<Actvity />
