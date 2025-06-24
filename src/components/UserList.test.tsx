import React from "react";
import "@testing-library/jest-dom";

// Use "@testing-library/react" and test 3 cases
// Do not mock useQuery but only mock fetcj
global.fetch = jest.fn();

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("UserList", () => {
  test("renders loading state initially", () => {});

  test("renders users after successful fetch", () => {});

  test("renders error message on fetch failure", () => {});
});
