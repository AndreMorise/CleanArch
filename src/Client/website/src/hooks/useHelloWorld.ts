import { helloWorldActions } from "@/store/helloWorldStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
// API service functions
const fetchGreeting = async (name: string): Promise<string> => {
	const response = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);

	if (!response.ok) {
		throw new Error("Failed to fetch greeting");
	}

	return response.json();
};

const saveGreeting = async (message: string): Promise<string> => {
	const response = await fetch("/api/hello", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message }),
	});

	if (!response.ok) {
		throw new Error("Failed to save greeting");
	}

	return response.json();
};

// TANStack Query hooks
export const useGetGreeting = (name: string) => {
	const query = useQuery({
		queryKey: ["greeting", name],
		queryFn: () => fetchGreeting(name),
		enabled: name.length > 0,
	});

	React.useEffect(() => {
		if (query.isSuccess && query.data !== undefined) {
			helloWorldActions.setGreeting(query.data);
		}
	}, [query.isSuccess, query.data]);

	React.useEffect(() => {
		if (query.isError && query.error instanceof Error) {
			helloWorldActions.setError(query.error.message);
		}
	}, [query.isError, query.error]);

	return query;
};

export const useSaveGreeting = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: saveGreeting,
		onSuccess: () => {
			// Invalidate and refetch relevant queries
			queryClient.invalidateQueries({ queryKey: ["greeting"] });
		},
	});
};
