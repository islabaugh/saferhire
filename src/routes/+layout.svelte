<script lang="ts">
	import { States, updateState } from '$lib/state';
</script>

<main>
	<div>
		<button
			on:click={() => {
				updateState(States.Welcome);
			}}>to beginning</button
		>

		<slot />
	</div>
</main>

<style>
	:global(html, body) {
		margin: 0;
		width: 100%;
		height: 100%;
	}

	:global(body) {
		background: linear-gradient(white, #b0c4ff);
	}
</style>
