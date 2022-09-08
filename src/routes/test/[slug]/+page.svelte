<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from 'svelte';

	const name = getContext('name');
</script>

<h1 class="header-text mb-10">Welcome to {name}</h1>

<p class="mb-3 text-base">Select a language</p>

<select class="p-3 mb-10 text-lg">
	<option>English</option>
</select>

<br/>
<a class="btn" href="{$page.params.slug}/consent" sveltekit:prefetch>Next</a>
