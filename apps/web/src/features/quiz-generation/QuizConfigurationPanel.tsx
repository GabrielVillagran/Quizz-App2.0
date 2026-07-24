import QuizConfigurationForm from "./QuizConfigurationForm";
import type { QuizConfiguration } from "./quizConfiguration.types";

interface QuizConfigurationPanelProps {
  onClose: () => void;
  onSubmit: (configuration: QuizConfiguration) => void;
}

function QuizConfigurationPanel({
  onClose,
  onSubmit,
}: QuizConfigurationPanelProps) {
  return (
    <section
      className="quiz-configuration"
      aria-labelledby="quiz-configuration-title"
    >
      <header className="quiz-configuration__header">
        <div>
          <p className="quiz-configuration__eyebrow">Quiz configuration</p>

          <h1
            className="quiz-configuration__title"
            id="quiz-configuration-title"
          >
            What did you learn?
          </h1>
        </div>

        <button
          className="quiz-configuration__back"
          type="button"
          onClick={onClose}
        >
          Back
        </button>
      </header>

      <p className="quiz-configuration__description">
        Describe your latest study session. The application will use your
        content to create a personalized quiz.
      </p>

      <QuizConfigurationForm onSubmit={onSubmit} />
    </section>
  );
}

export default QuizConfigurationPanel;
