<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		const data = ['a', 'b', 'c', 'd'];

		return {
			status: 200,
			props: {
				questions: data
			}
		};
	};
</script>

<script lang="ts">
	import { States, currentState, updateState } from '$lib/state';

	export let questions: any = null;
	let state: States;

	currentState.subscribe((value) => {
		state = value;
	});
</script>

<button
	on:click={() => {
		updateState(States.Welcome);
	}}>restart</button
>

{#if state === States.Welcome}
	<h1>welcome to the test</h1>
	<button
		on:click={() => {
			updateState(States.LanguageSelect);
		}}>enter</button
	>
{:else if state === States.LanguageSelect}
	<h1>select language</h1>
	<p>this doesn't do anything yet</p>
	<select>
		<option>English</option>
		<option>Spanish</option>
	</select>
	<br />
	<button
		on:click={() => {
			updateState(States.Consent);
		}}>enter</button
	>
{:else if state === States.Consent}
	<h1>consent form goes here, customizable by company</h1>
	<button
		on:click={() => {
			updateState(States.Form);
		}}>accept</button
	>
	<button
		on:click={() => {
			updateState(States.Verify);
		}}>reject</button
	>
{:else if state === States.Verify}
	<h1>are you sure you disagree?</h1>
	<button
		on:click={() => {
			updateState(States.End);
		}}>exit</button
	>
	<button
		on:click={() => {
			updateState(States.Form);
		}}>continue</button
	>
{:else if state === States.Form}
	<h1>user form</h1>
	<button
		on:click={() => {
			updateState(States.EEOC);
		}}>submit</button
	>
{:else if state === States.EEOC}
	<h1>EEOC</h1>
	<button
		on:click={() => {
			updateState(States.Instructions);
		}}>next</button
	>
{:else if state === States.Instructions}
	<h1>here are the instructions for the test</h1>
	<button
		on:click={() => {
			updateState(States.Questions);
		}}>next</button
	>
{:else if state === States.Questions}
	<h1>you are now in the test</h1>
	<p>okay this is kinda cool though!!</p>
	<button
		on:click={() => {
			updateState(States.End);
		}}>next</button
	>
	{questions}
{:else if state === States.End}
	<h1>the end</h1>
	<button
		on:click={() => {
			updateState(States.Welcome);
		}}>return to beginning</button
	>
{/if}
