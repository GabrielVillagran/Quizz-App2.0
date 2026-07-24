import { describe, expect, it } from "vitest";

import type { QuizScore } from "./quizScore.types";
import {
  calculateAverageScore,
  calculateScorePercentage,
  findPersonalBest,
} from "./score.utils";

const scores: QuizScore[] = [
  {
    id: "score-1",
    quizTitle: "Quiz One",
    difficulty: "beginner",
    correctAnswers: 8,
    totalQuestions: 10,
    completedAt: "2026-07-20T12:00:00.000Z",
  },
  {
    id: "score-2",
    quizTitle: "Quiz Two",
    difficulty: "intermediate",
    correctAnswers: 6,
    totalQuestions: 10,
    completedAt: "2026-07-21T12:00:00.000Z",
  },
];

describe("score utilities", () => {
  it("calculates a score percentage", () => {
    expect(
      calculateScorePercentage({
        correctAnswers: 8,
        totalQuestions: 10,
      }),
    ).toBe(80);
  });

  it("returns zero when the quiz has no questions", () => {
    expect(
      calculateScorePercentage({
        correctAnswers: 0,
        totalQuestions: 0,
      }),
    ).toBe(0);
  });

  it("calculates the average score", () => {
    expect(calculateAverageScore(scores)).toBe(70);
  });

  it("finds the personal best", () => {
    expect(findPersonalBest(scores)).toBe(80);
  });
});
