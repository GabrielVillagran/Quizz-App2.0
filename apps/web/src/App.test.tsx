import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

describe("App", () => {
  it("renders the home screen initially", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /turn your study notes into interactive quizzes/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /your progress/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("SQL Joins and Aggregation")).toBeInTheDocument();
  });

  it("opens the quiz configuration screen", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /create a quiz/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /what did you learn/i,
      }),
    ).toBeInTheDocument();
  });

  it("keeps quiz generation disabled without study content", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /create a quiz/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    ).toBeDisabled();
  });

  it("submits the study content and selected difficulty", async () => {
    const user = userEvent.setup();

    const consoleInfoSpy = vi
      .spyOn(console, "info")
      .mockImplementation(() => undefined);

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /create a quiz/i,
      }),
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /what did you learn/i,
      }),
      "I learned INNER JOIN, LEFT JOIN, and GROUP BY.",
    );

    await user.click(
      screen.getByText("Intermediate", {
        selector: ".difficulty-option__label",
      }),
    );

    expect(
      screen.getByRole("radio", {
        name: /intermediate/i,
      }),
    ).toBeChecked();

    await user.click(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    );

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "Quiz configuration submitted:",
      {
        studyContent: "I learned INNER JOIN, LEFT JOIN, and GROUP BY.",
        difficulty: "intermediate",
      },
    );

    consoleInfoSpy.mockRestore();
  });
});
