export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export interface QuizConfiguration {
  studyContent: string;
  difficulty: QuizDifficulty;
}

export const DEFAULT_QUESTION_COUNT = 10;
