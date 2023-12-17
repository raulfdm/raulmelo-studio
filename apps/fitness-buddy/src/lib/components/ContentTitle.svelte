<script lang="ts">
	export let title: string;
</script>

<h2 {...$$restProps} class={`title ${$$restProps.class}`}>{title}</h2>

<style lang="postcss" module>
	.title {
		@apply text-xl font-bold text-center text-gray-600 mb-4;
	}
</style>
