<script lang="ts">
	import type { PageData } from './$types';
	import { States, currentState, updateState } from '$lib/state';

	export let data: PageData;

	const handleSubmit = (event: Event) => {
		// TODO: maybe the state update shouldn't be right here
		updateState(States.EEOC);
	};
</script>

<button
	on:click={() => {
		updateState(States.Welcome);
	}}>restart</button
>

{#if $currentState === States.Welcome}
	<h1>welcome to the test</h1>
	<button
		on:click={() => {
			updateState(States.LanguageSelect);
		}}>enter</button
	>
{:else if $currentState === States.LanguageSelect}
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
{:else if $currentState === States.Consent}
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
{:else if $currentState === States.Verify}
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
{:else if $currentState === States.Form}
	<h1>user form</h1>
	<form action="/user" method="post">
		<input type="text" name="firstname" placeholder="First name" />
		<input type="text" name="lastname" placeholder="Last name" />
		<button type="submit">submit</button>
	</form>
{:else if $currentState === States.EEOC}
	<h1>EEOC</h1>
	<button
		on:click={() => {
			updateState(States.Instructions);
		}}>next</button
	>
{:else if $currentState === States.Instructions}
	<h1>here are the instructions for the test</h1>
	<button
		on:click={() => {
			updateState(States.Questions);
		}}>next</button
	>
{:else if $currentState === States.Questions}
	<h1>you are now in the test</h1>
	<p>okay this is kinda cool though!!</p>
	<button
		on:click={() => {
			updateState(States.End);
		}}>next</button
	>
	{data.questions}
{:else if $currentState === States.End}
	<h1>the end</h1>
	<button
		on:click={() => {
			updateState(States.Welcome);
		}}>return to beginning</button
	>
{/if}
