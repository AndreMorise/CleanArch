import { Store } from "@tanstack/react-store";

// Define store types
export interface HelloWorldState {
	greeting: string;
	name: string;
	isLoading: boolean;
	error: string | null;
}

// Create store with initial state
export const helloWorldStore = new Store<HelloWorldState>({
	greeting: "",
	name: "",
	isLoading: false,
	error: null,
});

// Store actions
export const helloWorldActions = {
	setName: (name: string) => {
		helloWorldStore.setState((state) => ({
			...state,
			name,
		}));
	},

	startLoading: () => {
		helloWorldStore.setState((state) => ({
			...state,
			isLoading: true,
			error: null,
		}));
	},

	setGreeting: (greeting: string) => {
		helloWorldStore.setState((state) => ({
			...state,
			greeting,
			isLoading: false,
			error: null,
		}));
	},

	setError: (error: string) => {
		helloWorldStore.setState((state) => ({
			...state,
			error,
			isLoading: false,
		}));
	},

	reset: () => {
		helloWorldStore.setState(() => ({
			greeting: "",
			name: "",
			isLoading: false,
			error: null,
		}));
	},
};
