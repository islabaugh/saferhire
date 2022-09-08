<script lang="ts">
	import { onMount } from 'svelte';
	interface Question {
		question: string;
		options: string[];
	}

	let questions: any[] = [];
	let typed_questions: Question[] = [];
	let current_question = 0;
	onMount(async () => {
		const res = await fetch('/test');
		questions = await res.json();
		let map: Map<number, Question> = new Map();
		questions.forEach((question) => {
			let current = map.get(question.question_id);
			if (current) {
				current.options.push(question.option);
			} else {
				map.set(question.question_id, {
					question: question.question,
					options: [question.option]
				});
			}
		});
		typed_questions = [...map.values()];
	});

	const handle_submit = () => {
		console.log('Submitting');
	};
</script>

<h1 class="mb-8 header-text">test in progress</h1>
<div class="mb-8 h-fit">
	{#if typed_questions.length > 0}
		<h2 class="text-3xl mb-8">
			{typed_questions[current_question].question}
		</h2>
		{#each typed_questions[current_question].options as option}
			<span class="text-lg">
				{option}
			</span>
			<br />
		{/each}
		<br />
	{:else}
		no questions
	{/if}
</div>

{#if current_question === typed_questions.length - 1}
	<div class="btn" on:click={handle_submit}>Submit</div>
{:else}
	<div class="btn" on:click={() => current_question++}>Next</div>
{/if}
