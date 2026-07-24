import type { QuizDifficulty } from "../quiz-generation/quizConfiguration.types";

export interface QuizScore {
  id: string;
  quizTitle: string;
  difficulty: QuizDifficulty;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}
