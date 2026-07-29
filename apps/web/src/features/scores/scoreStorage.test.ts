import { beforeEach, describe, expect, it } from "vitest";

import { mockScores } from "./mockScores";
import { loadQuizScores, saveQuizScores } from "./scoreStorage";

describe("score storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns fallback scores when storage is empty", () => {
    expect(loadQuizScores(mockScores)).toEqual(mockScores);
  });

  it("saves and loads quiz scores", () => {
    const scores = [mockScores[0]];

    saveQuizScores(scores);

    expect(loadQuizScores()).toEqual(scores);
  });

  it("returns fallback scores when stored JSON is invalid", () => {
    window.localStorage.setItem(
      "quiz-learning-platform:scores",
      "invalid-json",
    );

    expect(loadQuizScores(mockScores)).toEqual(mockScores);
  });

  it("returns fallback scores when stored data has an invalid shape", () => {
    window.localStorage.setItem(
      "quiz-learning-platform:scores",
      JSON.stringify([
        {
          id: "invalid-score",
          quizTitle: "Incomplete score",
        },
      ]),
    );

    expect(loadQuizScores(mockScores)).toEqual(mockScores);
  });
});
