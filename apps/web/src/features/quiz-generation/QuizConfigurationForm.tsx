import { type ChangeEvent, type FormEvent, useState } from "react";

import type {
  QuizConfiguration,
  QuizDifficulty,
} from "./quizConfiguration.types";

interface QuizConfigurationFormProps {
  onSubmit: (configuration: QuizConfiguration) => void;
}

const difficultyOptions: Array<{
  value: QuizDifficulty;
  label: string;
  description: string;
}> = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Focus on definitions and fundamental concepts.",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Combine concepts and apply them to practical cases.",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Use complex scenarios and deeper reasoning.",
  },
];

function QuizConfigurationForm({ onSubmit }: QuizConfigurationFormProps) {
  const [studyContent, setStudyContent] = useState("");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("beginner");

  function handleStudyContentChange(
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void {
    setStudyContent(event.target.value);
  }

  function handleDifficultyChange(event: ChangeEvent<HTMLInputElement>): void {
    const selectedDifficulty = event.target.value as QuizDifficulty;

    setDifficulty(selectedDifficulty);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    onSubmit({
      studyContent: studyContent.trim(),
      difficulty,
    });
  }

  const isSubmitDisabled = studyContent.trim().length === 0;

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <div className="quiz-form__field">
        <label className="quiz-form__label" htmlFor="study-content">
          What did you learn?
        </label>

        <textarea
          className="quiz-form__control quiz-form__textarea"
          id="study-content"
          name="study-content"
          placeholder="Example: Today I learned how INNER JOIN, LEFT JOIN, GROUP BY, and HAVING work in SQL..."
          value={studyContent}
          onChange={handleStudyContentChange}
        />

        <p className="quiz-form__help">
          Include concepts, examples, vocabulary, or notes from your latest
          study session, we will take this for generate the quiz for you, tell
          us what've you learned and what you want to practice.
        </p>
      </div>

      <fieldset className="difficulty-selector">
        <legend className="difficulty-selector__legend">
          Choose a difficulty
        </legend>

        <div className="difficulty-selector__options">
          {difficultyOptions.map((option) => (
            <label className="difficulty-option" key={option.value}>
              <input
                className="difficulty-option__input"
                type="radio"
                name="difficulty"
                value={option.value}
                checked={difficulty === option.value}
                onChange={handleDifficultyChange}
              />

              <span className="difficulty-option__content">
                <span className="difficulty-option__label">{option.label}</span>

                <span className="difficulty-option__description">
                  {option.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        className="primary-button quiz-form__submit"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Generate quiz
      </button>
    </form>
  );
}

export default QuizConfigurationForm;
