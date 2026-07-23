import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("renders the main application content", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /turn your study notes into interactive quizzes/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /create a quiz/i,
      }),
    ).toBeEnabled();
  });
});
