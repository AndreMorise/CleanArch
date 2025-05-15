import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { HelloWorldForm } from "./HelloWorldForm";
import { HelloWorldSearch } from "./HelloWorldSearch";

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
});

export const HelloWorldPage: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-bold tracking-tight">Hello World Example</h1>
					<p className="text-muted-foreground">
						This example demonstrates integration with the CleanArch backend API
						using TanStack Query for data fetching and TanStack Store for state
						management.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-card rounded-lg shadow-sm p-6">
						<HelloWorldSearch />
					</div>

					<div className="bg-card rounded-lg shadow-sm p-6">
						<HelloWorldForm />
					</div>
				</div>
			</div>
		</QueryClientProvider>
	);
};
