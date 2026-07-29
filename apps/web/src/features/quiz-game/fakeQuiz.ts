import type { Quiz } from "./quiz.types";

export const fakeQuiz: Quiz = {
  id: "quiz-sql-fundamentals",
  title: "SQL Fundamentals",
  difficulty: "intermediate",
  questions: [
    {
      id: "question-1",
      type: "multiple-choice",
      prompt:
        "Which SQL join returns all rows from the left table and matching rows from the right table?",
      options: [
        {
          id: "question-1-option-a",
          text: "INNER JOIN",
        },
        {
          id: "question-1-option-b",
          text: "LEFT JOIN",
        },
        {
          id: "question-1-option-c",
          text: "CROSS JOIN",
        },
        {
          id: "question-1-option-d",
          text: "SELF JOIN",
        },
      ],
      correctOptionId: "question-1-option-b",
      explanation:
        "A LEFT JOIN returns every row from the left table. When a matching row exists in the right table, its values are included; otherwise, the right-side values are NULL.",
    },
    {
      id: "question-2",
      type: "true-false",
      prompt: "The HAVING clause filters grouped results after GROUP BY.",
      options: [
        {
          id: "question-2-true",
          text: "True",
        },
        {
          id: "question-2-false",
          text: "False",
        },
      ],
      correctOptionId: "question-2-true",
      explanation:
        "HAVING filters groups after aggregation. WHERE filters individual rows before grouping occurs.",
    },
    {
      id: "question-3",
      type: "short-answer",
      prompt:
        "Which SQL clause is used to group rows that have the same values?",
      acceptedAnswers: ["GROUP BY"],
      explanation:
        "GROUP BY organizes rows into groups based on one or more columns, often so aggregate functions such as COUNT, SUM, or AVG can be applied.",
    },
  ],
};
