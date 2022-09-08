<script lang="ts">
	// TODO: handle form on this page
	import { enhance } from '$lib/form';

	let submitButtonDisabled = false;
</script>

<h1 class="header-text mb-10">gimme your info</h1>
<form
	action="/test"
	method="post"
	use:enhance={{
		pending: () => {
			submitButtonDisabled = true;
		},
		result: () => {
			submitButtonDisabled = false;
		},
		error: () => {
			submitButtonDisabled = false;
		}
	}}
>
	<div class="w-full max-w-md mx-auto mb-6">
		<div class="mb-4">
			<label class="form-label" for="firstname">First name</label>
			<input
				class="form-input"
				type="text"
				name="firstname"
				placeholder="First name"
			/>
		</div>

		<div class="mb-4">
			<label class="form-label" for="lastname">Last name</label>
			<input
				class="form-input"
				type="text"
				name="lastname"
				placeholder="Last name"
			/>
		</div>

		<div class="mb-4">
			<label class="form-label" for="phone">Phone number</label>
			<input
				class="form-input"
				type="text"
				name="phone"
				placeholder="Phone number"
			/>
		</div>

		<div class="mb-4">
			<label class="form-label" for="email">Email address</label>
			<input
				class="form-input"
				type="text"
				name="email"
				placeholder="Email address"
			/>
		</div>
	</div>

	<!-- TODO: this should bring you to the next page -->
	<button class="btn mb-4" type="submit" disabled={submitButtonDisabled}
		>Submit</button
	>
</form>
<a class="btn" href="eeoc" sveltekit:prefetch>Skip (for debug)</a>
