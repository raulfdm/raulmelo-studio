<script>
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

<a href="/" class="block w-full text-center bg-blue-400">Go back to the app</a>

<slot />
