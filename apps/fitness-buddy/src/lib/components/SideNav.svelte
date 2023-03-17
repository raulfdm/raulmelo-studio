<script lang="ts">
	import { toggleSideNav } from '$lib/stores/sideNav';
	import IconClock from '@tabler/icons-svelte/dist/svelte/icons/IconClock.svelte';
	import IconAxe from '@tabler/icons-svelte/dist/svelte/icons/IconAxe.svelte';
	import IconYoga from '@tabler/icons-svelte/dist/svelte/icons/IconYoga.svelte';
	import IconUser from '@tabler/icons-svelte/dist/svelte/icons/IconUser.svelte';
	import { page } from '$app/stores';

	function onLinkClick() {
		toggleSideNav();
	}
</script>

<ul class="p-4 space-y-2 bg-base-100 menu w-60 md:w-80">
	<li class="menu-title">
		<span>App</span>
	</li>
	<li>
		<a href="/" class:active={$page.url.pathname === '/'} on:click={onLinkClick}>
			<IconAxe width={24} />
			Training
		</a>
	</li>
	<li>
		<a
			href="/tabata-clock"
			class:active={$page.url.pathname === '/tabata-clock'}
			on:click={onLinkClick}
		>
			<IconClock />
			Tabata Clock
		</a>
	</li>
	<li>
		<a href="/exercises" class:active={$page.url.pathname === '/exercises'} on:click={onLinkClick}>
			<IconYoga />
			Exercises
		</a>
	</li>

	<li class="menu-title">
		<span>Management</span>
	</li>
	<li>
		<a href="/admin" on:click={onLinkClick}>
			<IconUser />
			Admin
		</a>
	</li>
</ul>

<style>
	.menu-title:not(:first-child) {
		@apply mt-4;
	}
</style>
