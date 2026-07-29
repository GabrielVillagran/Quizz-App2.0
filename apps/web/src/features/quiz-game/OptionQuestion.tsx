import type { OptionQuizQuestion } from "./quiz.types";

interface OptionQuestionProps {
  question: OptionQuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  disabled: boolean;
}

function OptionQuestion({
  question,
  selectedOptionId,
  onSelectOption,
  disabled,
}: OptionQuestionProps) {
  return (
    <fieldset className="option-question">
      <legend className="option-question__prompt">{question.prompt}</legend>

      <div className="option-question__options">
        {question.options.map((option) => {
          const inputId = `${question.id}-${option.id}`;

          return (
            <label className="answer-option" htmlFor={inputId} key={option.id}>
              <input
                checked={selectedOptionId === option.id}
                className="answer-option__input"
                disabled={disabled}
                id={inputId}
                name={question.id}
                type="radio"
                value={option.id}
                onChange={() => onSelectOption(option.id)}
              />

              <span className="answer-option__content">{option.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default OptionQuestion;
