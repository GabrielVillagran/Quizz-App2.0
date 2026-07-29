import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import QuizGameScreen from "./quizGameScreen";
import type { Quiz } from "./quiz.types";

const shortAnswerQuiz: Quiz = {
  id: "short-answer-quiz",
  title: "SQL Short Answer",
  difficulty: "beginner",
  questions: [
    {
      id: "question-1",
      type: "short-answer",
      prompt: "Which SQL clause groups rows with the same values?",
      acceptedAnswers: ["GROUP BY"],
      explanation: "GROUP BY organizes rows based on shared column values.",
    },
  ],
};

describe("QuizGameScreen", () => {
  it("validates, completes, and exits a short-answer quiz", async () => {
    const user = userEvent.setup();
    const handleExit = vi.fn();
    const handleComplete = vi.fn();

    render(
      <QuizGameScreen
        quiz={shortAnswerQuiz}
        onExit={handleExit}
        onComplete={handleComplete}
      />,
    );

    const checkAnswerButton = screen.getByRole("button", {
      name: /check answer/i,
    });

    expect(checkAnswerButton).toBeDisabled();

    await user.type(
      screen.getByRole("textbox", {
        name: /your answer/i,
      }),
      "  group    by  ",
    );

    expect(checkAnswerButton).toBeEnabled();

    await user.click(checkAnswerButton);

    expect(
      screen.getByRole("heading", {
        name: /correct/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /group by organizes rows based on shared column values/i,
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /finish quiz/i,
      }),
    );

    expect(handleComplete).toHaveBeenCalledOnce();

    expect(handleComplete).toHaveBeenCalledWith({
      quizTitle: "SQL Short Answer",
      difficulty: "beginner",
      correctAnswers: 1,
      totalQuestions: 1,
    });

    expect(screen.getByText(/quiz completed/i)).toBeInTheDocument();

    expect(screen.getByText("100%")).toBeInTheDocument();

    const resultSummary = screen.getByText(/you answered/i);

    expect(resultSummary).toHaveTextContent(
      /you answered 1 of 1 questions correctly/i,
    );

    expect(handleExit).not.toHaveBeenCalled();

    await user.click(
      screen.getByRole("button", {
        name: /return home/i,
      }),
    );

    expect(handleExit).toHaveBeenCalledOnce();
  });
});
