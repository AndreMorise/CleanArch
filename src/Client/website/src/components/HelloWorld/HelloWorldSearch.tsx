import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import type React from "react";
import { useState } from "react";
import { useGetGreeting } from "../../hooks/useHelloWorld";
import {
	helloWorldActions,
	helloWorldStore,
} from "../../store/helloWorldStore";
import { Button } from "../ui/button";

export const HelloWorldSearch: React.FC = () => {
	// Local state for form submission
	const [submittedName, setSubmittedName] = useState("");

	// Get store values
	const { greeting, isLoading, error } = useStore(helloWorldStore);

	// React Query hook - only triggered when submittedName changes
	const { isFetching, refetch } = useGetGreeting(submittedName);

	// Form setup with TanStack Form
	const form = useForm({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			// Update store with name
			helloWorldActions.setName(value.name);

			// Set submitted name to trigger query
			setSubmittedName(value.name);

			// Set loading state
			helloWorldActions.startLoading();

			// Manually trigger query if needed
			if (submittedName === value.name) {
				refetch();
			}
		},
	});

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Get Your Greeting</h2>

			<form
				className="space-y-4"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field
					name="name"
					validators={{
						onChange: ({ value }) => (!value ? "Name is required" : undefined),
					}}
				>
					{(field) => (
						<div className="space-y-2">
							<label htmlFor={field.name} className="block text-sm font-medium">
								Your Name:
							</label>
							<input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Enter your name"
								className={cn(
									"w-full px-3 py-2 h-9 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									field.state.meta.errors ? "border-destructive" : "",
								)}
							/>
							{field.state.meta.errors && (
								<div className="text-sm text-destructive">
									{field.state.meta.errors.join(", ")}
								</div>
							)}
						</div>
					)}
				</form.Field>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							disabled={!canSubmit || isSubmitting || isLoading || isFetching}
						>
							{isSubmitting
								? "Submitting..."
								: isLoading || isFetching
									? "Loading..."
									: "Get Greeting"}
						</Button>
					)}
				</form.Subscribe>
			</form>

			{/* Display results */}
			{isLoading || isFetching ? (
				<div className="text-sm text-muted-foreground animate-pulse">
					Loading your greeting...
				</div>
			) : error ? (
				<div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm dark:bg-destructive/20">
					{error}
				</div>
			) : greeting ? (
				<div className="mt-4 space-y-2">
					<h3 className="text-md font-medium">Your Greeting:</h3>
					<div className="p-4 rounded-md bg-muted/50 text-sm">{greeting}</div>
				</div>
			) : null}
		</div>
	);
};
