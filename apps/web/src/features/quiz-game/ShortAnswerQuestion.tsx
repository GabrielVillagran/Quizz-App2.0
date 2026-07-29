import type { ShortAnswerQuizQuestion } from "./quiz.types";

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuizQuestion;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

function ShortAnswerQuestion({
  question,
  value,
  onChange,
  disabled,
}: ShortAnswerQuestionProps) {
  const inputId = `${question.id}-answer`;

  return (
    <fieldset className="short-answer-question">
      <legend className="short-answer-question__prompt">
        {question.prompt}
      </legend>

      <label className="short-answer-question__label" htmlFor={inputId}>
        Your answer
      </label>

      <input
        className="short-answer-question__input"
        disabled={disabled}
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </fieldset>
  );
}

export default ShortAnswerQuestion;
