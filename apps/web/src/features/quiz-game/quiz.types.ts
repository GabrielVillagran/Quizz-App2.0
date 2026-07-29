import type { QuizDifficulty } from "../quiz-generation/quizConfiguration.types";

export type QuizQuestionType =
  "multiple-choice" | "true-false" | "short-answer";

export interface QuizAnswerOption {
  id: string;
  text: string;
}

export interface QuizCompletionResult {
  quizTitle: string;
  difficulty: QuizDifficulty;
  correctAnswers: number;
  totalQuestions: number;
}

interface BaseQuizQuestion {
  id: string;
  prompt: string;
  explanation: string;
}

export interface OptionQuizQuestion extends BaseQuizQuestion {
  type: "multiple-choice" | "true-false";
  options: QuizAnswerOption[];
  correctOptionId: string;
}

export interface ShortAnswerQuizQuestion extends BaseQuizQuestion {
  type: "short-answer";
  acceptedAnswers: string[];
}

export type QuizQuestion = OptionQuizQuestion | ShortAnswerQuizQuestion;

export interface Quiz {
  id: string;
  title: string;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
}

export type QuizAnswer =
  | {
      questionId: string;
      kind: "option";
      selectedOptionId: string;
    }
  | {
      questionId: string;
      kind: "text";
      value: string;
    };
