<script lang="ts">
	import { onMount } from 'svelte';

	let questions: any[] = [];
	onMount(async () => {
		const res = await fetch('/test');
		questions = await res.json();
	});
</script>

<h1 class="header-text">test in progress</h1>
<div class="my-8 h-fit">
	{#if questions}
		{#each questions as q}
			{q.option}
			<br />
		{/each}
	{:else}
		no questions
	{/if}
</div>

<a class="btn" href="." sveltekit:prefetch>To beginning</a>
