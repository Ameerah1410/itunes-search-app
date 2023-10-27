// Import necessary functions from testing library
import React from "react";
import { render } from "@testing-library/react";
// Import the component to be tested
import App from "../App";

// Describe block for the App component test
describe("App component", () => {
  // Test to match the snapshot
  it("should match the snapshot", () => {
    // Render the component and get the container
    const { asFragment } = render(<App />);
    // Assert the component matches the previous snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
