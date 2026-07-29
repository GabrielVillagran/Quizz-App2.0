import type { QuizScore } from "./quizScore.types";

const QUIZ_SCORES_STORAGE_KEY = "quiz-learning-platform:scores";

function isQuizScore(value: unknown): value is QuizScore {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const score = value as Record<string, unknown>;

  const hasValidDifficulty =
    score.difficulty === "beginner" ||
    score.difficulty === "intermediate" ||
    score.difficulty === "advanced";

  return (
    typeof score.id === "string" &&
    typeof score.quizTitle === "string" &&
    hasValidDifficulty &&
    typeof score.correctAnswers === "number" &&
    typeof score.totalQuestions === "number" &&
    typeof score.completedAt === "string"
  );
}

export function loadQuizScores(fallbackScores: QuizScore[] = []): QuizScore[] {
  try {
    const storedScores = window.localStorage.getItem(QUIZ_SCORES_STORAGE_KEY);

    if (!storedScores) {
      return fallbackScores;
    }

    const parsedScores: unknown = JSON.parse(storedScores);

    if (!Array.isArray(parsedScores) || !parsedScores.every(isQuizScore)) {
      return fallbackScores;
    }

    return parsedScores;
  } catch {
    return fallbackScores;
  }
}

export function saveQuizScores(scores: QuizScore[]): void {
  try {
    window.localStorage.setItem(
      QUIZ_SCORES_STORAGE_KEY,
      JSON.stringify(scores),
    );
  } catch {
    // The application can continue using in-memory state
    // when browser storage is unavailable.
  }
}
