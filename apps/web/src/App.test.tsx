import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

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

  it("starts the quiz after submitting its configuration", async () => {
    const user = userEvent.setup();

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

    await user.click(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /sql fundamentals/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/question 1 of 3/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    ).toBeDisabled();
  });

  it("enables answer confirmation after selecting an option", async () => {
    const user = userEvent.setup();

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
      "SQL joins",
    );

    await user.click(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    );

    const checkAnswerButton = screen.getByRole("button", {
      name: /check answer/i,
    });

    expect(checkAnswerButton).toBeDisabled();

    await user.click(screen.getByText("LEFT JOIN"));

    expect(
      screen.getByRole("radio", {
        name: /left join/i,
      }),
    ).toBeChecked();

    expect(checkAnswerButton).toBeEnabled();
  });
  it("moves to the next question after checking an answer", async () => {
    const user = userEvent.setup();

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
      "SQL joins and grouping",
    );

    await user.click(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    );

    await user.click(screen.getByText("LEFT JOIN"));

    await user.click(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /next question/i,
      }),
    );

    expect(screen.getByText(/question 2 of 3/i)).toBeInTheDocument();

    expect(
      screen.getByText(/the having clause filters grouped results/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    ).toBeDisabled();
  });

  it("persists completed quiz scores in browser storage", async () => {
    const user = userEvent.setup();

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
      "SQL fundamentals",
    );

    await user.click(
      screen.getByRole("button", {
        name: /generate quiz/i,
      }),
    );

    await user.click(screen.getByText("LEFT JOIN"));
    await user.click(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: /next question/i,
      }),
    );

    await user.click(screen.getByText("True"));
    await user.click(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: /next question/i,
      }),
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /your answer/i,
      }),
      "GROUP BY",
    );

    await user.click(
      screen.getByRole("button", {
        name: /check answer/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /finish quiz/i,
      }),
    );

    const storedScores = window.localStorage.getItem(
      "quiz-learning-platform:scores",
    );

    expect(storedScores).not.toBeNull();

    expect(storedScores).toContain('"quizTitle":"SQL Fundamentals"');

    expect(storedScores).toContain('"correctAnswers":3');
  });
});
