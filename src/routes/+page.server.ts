import type { PageServerLoad } from "./$types";

// this is hit when the server renders the page
export const load: PageServerLoad = async () => {
	const data = ['a', 'b', 'c', 'd'];

	return {
		questions: data
	};
};
