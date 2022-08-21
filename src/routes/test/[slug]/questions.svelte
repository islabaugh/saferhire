<script lang="ts">
	import { onMount } from 'svelte';

	let questions: any[] = [];
	onMount(async () => {
		const res = await fetch('/test');
		questions = await res.json();
	});
</script>

<h1>the real test</h1>
{#if questions}
	{#each questions as q}
		{q.question}
		<br />
	{/each}
{:else}
	no questions
{/if}
