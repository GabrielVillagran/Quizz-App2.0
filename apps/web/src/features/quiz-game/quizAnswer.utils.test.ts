import { describe, expect, it } from "vitest";

import { fakeQuiz } from "./fakeQuiz";
import {
  getCorrectAnswerText,
  isQuizAnswerCorrect,
  normalizeShortAnswer,
} from "./quizAnswer.utils";

const multipleChoiceQuestion = fakeQuiz.questions[0];

const trueFalseQuestion = fakeQuiz.questions[1];

const shortAnswerQuestion = fakeQuiz.questions[2];

describe("quiz answer utilities", () => {
  it("normalizes short-answer text", () => {
    expect(normalizeShortAnswer("  GROUP    BY  ")).toBe("group by");
  });

  it("validates a correct multiple-choice answer", () => {
    expect(
      isQuizAnswerCorrect(multipleChoiceQuestion, {
        questionId: multipleChoiceQuestion.id,
        kind: "option",
        selectedOptionId: "question-1-option-b",
      }),
    ).toBe(true);
  });

  it("rejects an incorrect true-or-false answer", () => {
    expect(
      isQuizAnswerCorrect(trueFalseQuestion, {
        questionId: trueFalseQuestion.id,
        kind: "option",
        selectedOptionId: "question-2-false",
      }),
    ).toBe(false);
  });

  it("validates a normalized short answer", () => {
    expect(
      isQuizAnswerCorrect(shortAnswerQuestion, {
        questionId: shortAnswerQuestion.id,
        kind: "text",
        value: "  group    by ",
      }),
    ).toBe(true);
  });

  it("rejects an answer for a different question", () => {
    expect(
      isQuizAnswerCorrect(multipleChoiceQuestion, {
        questionId: "another-question",
        kind: "option",
        selectedOptionId: "question-1-option-b",
      }),
    ).toBe(false);
  });

  it("returns the visible correct answer", () => {
    expect(getCorrectAnswerText(multipleChoiceQuestion)).toBe("LEFT JOIN");

    expect(getCorrectAnswerText(shortAnswerQuestion)).toBe("GROUP BY");
  });
});
