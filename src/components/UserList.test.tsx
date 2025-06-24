import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserList from "./UserList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

global.fetch = jest.fn();

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("UserList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders loading state initially", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders users after successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockUsers,
    });
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    );

    // Wait for user names to appear
    for (const user of mockUsers) {
      await waitFor(() =>
        expect(screen.getByText(user.name)).toBeInTheDocument()
      );
      expect(screen.getByText(user.email)).toBeInTheDocument();
    }
  });

  test("renders error message on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // disable retry to fail fast on errors
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument()
    );
  });
});
