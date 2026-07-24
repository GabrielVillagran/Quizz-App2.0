import type { QuizScore } from "./quizScore.types";

export function calculateScorePercentage(
  score: Pick<QuizScore, "correctAnswers" | "totalQuestions">,
): number {
  if (score.totalQuestions <= 0) {
    return 0;
  }

  return Math.round((score.correctAnswers / score.totalQuestions) * 100);
}

export function calculateAverageScore(scores: QuizScore[]): number {
  if (scores.length === 0) {
    return 0;
  }

  const totalPercentage = scores.reduce(
    (total, score) => total + calculateScorePercentage(score),
    0,
  );

  return Math.round(totalPercentage / scores.length);
}

export function findPersonalBest(scores: QuizScore[]): number {
  if (scores.length === 0) {
    return 0;
  }
  return Math.max(...scores.map(calculateScorePercentage));
}

export function formatScoreDate(completedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(completedAt));
}
