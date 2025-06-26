import React from "react";
import "@testing-library/jest-dom";
import UserList from "./UserList";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Use "@testing-library/react" and test 3 cases
// Do not mock useQuery but only mock fetcj
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve(() => {
    setTimeout(() => {}, 20000);
  })
);

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const queryClient = new QueryClient();
const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
};
describe("UserList", () => {
  test("renders loading state initially", () => {
    renderComponent();
    expect();
  });

  test("renders users after successful fetch", () => {});

  test("renders error message on fetch failure", () => {});
});
