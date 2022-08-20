<script lang="ts">
	import { enhance } from '$lib/form';
	import { States, currentState, updateState } from '$lib/state';
	let submitButtonDisabled = false;

	let questions: string[] = [];

	const getQuestions = (): string[] => {
		return ['a', 'b', 'c'];
	};
</script>

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
	<form
		action="/user"
		method="post"
		use:enhance={{
			pending: async () => {
				submitButtonDisabled = true;
			},
			result: async () => {
				updateState(States.EEOC);
				submitButtonDisabled = false;
				questions = getQuestions();
			},
			error: async () => {
				console.log('error');
			}
		}}
	>
		<input type="text" name="firstname" placeholder="First name" />
		<input type="text" name="lastname" placeholder="Last name" />
		<br />
		<input type="text" name="phone" placeholder="Phone number" />
		<input type="text" name="email" placeholder="Email address" />
		<br />
		<button type="submit" disabled={submitButtonDisabled}>submit</button>
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
	<h1>this is the test</h1>
	{#if questions && questions.length != 0}
		{#each questions as q}
			<p>{q}</p>
		{/each}
	{:else}
		<p>no questions</p>
	{/if}
	<button
		on:click={() => {
			updateState(States.End);
		}}>next</button
	>
{:else if $currentState === States.End}
	<h1>the end</h1>
{/if}
