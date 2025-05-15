import { useSaveGreeting } from "@/hooks/useHelloWorld";
import { cn } from "@/lib/utils";
import { helloWorldActions, helloWorldStore } from "@/store/helloWorldStore";
import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import type React from "react";
import { Button } from "../ui/button";

export const HelloWorldForm: React.FC = () => {
	// Get greeting from store
	const greeting = useStore(helloWorldStore, (state) => state.greeting);

	// Mutation hook for saving greeting
	const saveGreetingMutation = useSaveGreeting();

	// Form setup with TanStack Form
	const form = useForm({
		defaultValues: {
			message: greeting,
		},
		onSubmit: async ({ value }) => {
			helloWorldActions.startLoading();
			try {
				const saved = await saveGreetingMutation.mutateAsync(value.message);
				helloWorldActions.setGreeting(saved);
				form.reset();
			} catch (err) {
				if (err instanceof Error) {
					helloWorldActions.setError(err.message);
				}
			}
		},
	});

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Save Your Greeting</h2>

			{greeting ? (
				<form
					className="space-y-4"
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div>
						<form.Field
							name="message"
							validators={{
								onChange: ({ value }) =>
									!value
										? "Message is required"
										: value.length < 5
											? "Message must be at least 5 characters"
											: undefined,
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<label
										htmlFor={field.name}
										className="block text-sm font-medium"
									>
										Edit your greeting:
									</label>
									<textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										rows={3}
										className={cn(
											"w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<div className="flex gap-2">
								<Button
									type="submit"
									disabled={
										!canSubmit || isSubmitting || saveGreetingMutation.isPending
									}
								>
									{isSubmitting
										? "Submitting..."
										: saveGreetingMutation.isPending
											? "Saving..."
											: "Save Greeting"}
								</Button>
							</div>
						)}
					</form.Subscribe>

					{saveGreetingMutation.isSuccess && (
						<div className="p-3 rounded-md bg-green-50 text-green-700 text-sm dark:bg-green-900/20 dark:text-green-400">
							Greeting saved successfully!
						</div>
					)}

					{saveGreetingMutation.isError && (
						<div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm dark:bg-destructive/20">
							Failed to save greeting: {saveGreetingMutation.error?.message}
						</div>
					)}
				</form>
			) : (
				<p className="text-muted-foreground">
					Generate a greeting first to save it.
				</p>
			)}
		</div>
	);
};
