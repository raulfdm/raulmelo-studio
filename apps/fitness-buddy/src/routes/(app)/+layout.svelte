<script lang="ts">
	import BeepAudio from '$lib/components/BeepAudio.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import Actvity from '$lib/components/old/Activity/index.svelte';
	import { sideNavService, toggleSideNav } from '$lib/stores/sideNav';

	import '$lib/styles/app.css';

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
		<main class="container p-4 mx-auto">
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
