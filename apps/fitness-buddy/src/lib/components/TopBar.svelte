<script lang="ts">
	import IconMenu2 from '@tabler/icons-svelte/dist/svelte/icons/IconMenu2.svelte';

	import { toggleSideNav } from '$lib/stores/sideNav';
</script>

<header class="fixed px-4 navbar bg-primary text-base-100">
	<div class="flex-1">
		<span class="text-xl normal-case font-title">My Fitness Buddy</span>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost" on:click={toggleSideNav}>
			<IconMenu2 />
		</button>
	</div>
</header>
