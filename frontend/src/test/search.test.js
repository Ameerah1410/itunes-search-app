// Import necessary functions from testing library and the component to be tested
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";

// Describe block for the App component test
describe("App component", () => {
  // Test for the search functionality
  it("should perform a search", async () => {
    // Render the component
    render(<App />);
    // Get the search input
    const searchInput = screen.getByPlaceholderText("Enter search term");
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: "test" } });
    // Get the search button
    const searchButton = screen.getByText("Search");
    // Click the search button
    fireEvent.click(searchButton);
    // Wait for the search results to appear
    await waitFor(() => screen.getByText("Your list of favorite items"));
    // Assert that the search results are displayed
    expect(screen.getByText("Your list of favorite items")).toBeInTheDocument();
  });
});
