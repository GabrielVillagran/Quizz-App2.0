import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import QuizResultScreen from "./QuizResultScreen";

describe("QuizResultScreen", () => {
  it("displays the final quiz result", () => {
    render(
      <QuizResultScreen
        quizTitle="SQL Fundamentals"
        correctAnswers={8}
        totalQuestions={10}
        onReturnHome={() => undefined}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /sql fundamentals/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("80%")).toBeInTheDocument();

    const resultSummary = screen.getByText(/you answered/i);

    expect(resultSummary).toHaveTextContent(
      /you answered 8 of 10 questions correctly/i,
    );
  });

  it("returns home when the action is selected", async () => {
    const user = userEvent.setup();
    const handleReturnHome = vi.fn();

    render(
      <QuizResultScreen
        quizTitle="SQL Fundamentals"
        correctAnswers={8}
        totalQuestions={10}
        onReturnHome={handleReturnHome}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /return home/i,
      }),
    );

    expect(handleReturnHome).toHaveBeenCalledOnce();
  });
});
