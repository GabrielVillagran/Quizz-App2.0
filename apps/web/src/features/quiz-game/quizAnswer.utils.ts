import type { QuizAnswer, QuizQuestion } from "./quiz.types";

export function normalizeShortAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isQuizAnswerCorrect(
  question: QuizQuestion,
  answer: QuizAnswer,
): boolean {
  if (question.id !== answer.questionId) {
    return false;
  }

  if (question.type === "short-answer") {
    if (answer.kind !== "text") {
      return false;
    }

    const normalizedAnswer = normalizeShortAnswer(answer.value);

    return question.acceptedAnswers.some(
      (acceptedAnswer) =>
        normalizeShortAnswer(acceptedAnswer) === normalizedAnswer,
    );
  }

  if (answer.kind !== "option") {
    return false;
  }

  return question.correctOptionId === answer.selectedOptionId;
}

export function getCorrectAnswerText(question: QuizQuestion): string {
  if (question.type === "short-answer") {
    return question.acceptedAnswers[0] ?? "No accepted answer was configured.";
  }

  const correctOption = question.options.find(
    (option) => option.id === question.correctOptionId,
  );

  return correctOption?.text ?? "The correct answer is unavailable.";
}
