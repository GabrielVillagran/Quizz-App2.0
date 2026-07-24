import type { QuizScore } from "./quizScore.types";

export const mockScores: QuizScore[] = [
  {
    id: "score-1",
    quizTitle: "SQL Joins and Aggregation",
    difficulty: "intermediate",
    correctAnswers: 9,
    totalQuestions: 10,
    completedAt: "2026-07-22T12:00:00.000Z",
  },
  {
    id: "score-2",
    quizTitle: "Portuguese Greetings",
    difficulty: "beginner",
    correctAnswers: 8,
    totalQuestions: 10,
    completedAt: "2026-07-20T12:00:00.000Z",
  },
  {
    id: "score-3",
    quizTitle: "WHERE and HAVING",
    difficulty: "advanced",
    correctAnswers: 7,
    totalQuestions: 10,
    completedAt: "2026-07-18T12:00:00.000Z",
  },
  {
    id: "score-4",
    quizTitle: "Advanced Python",
    difficulty: "advanced",
    correctAnswers: 8,
    totalQuestions: 10,
    completedAt: "2026-07-15T12:00:00.000Z",
  },
];
