import { writable, type Writable } from 'svelte/store';

export enum States {
	Welcome,
	LanguageSelect,
	Consent,
	Verify,
	Form,
	EEOC,
	Instructions,
	Questions,
	End
}

export const currentState: Writable<States> = writable(States.Welcome);
export const updateState = (newState: States) => {
	currentState.set(newState);
};
