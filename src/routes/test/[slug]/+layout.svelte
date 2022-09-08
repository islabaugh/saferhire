<script lang="ts">
	import { setContext } from 'svelte';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	setContext('name', data.company_name);
</script>

<div class="grid h-screen content-center bg-gray-100 text-gray-700">
	<div class="container mx-auto text-center">
		<slot />
	</div>
</div>
