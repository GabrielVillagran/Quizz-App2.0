import { calculateScorePercentage } from "../scores/score.utils";

interface QuizResultScreenProps {
  quizTitle: string;
  correctAnswers: number;
  totalQuestions: number;
  onReturnHome: () => void;
}

function QuizResultScreen({
  quizTitle,
  correctAnswers,
  totalQuestions,
  onReturnHome,
}: QuizResultScreenProps) {
  const percentage = calculateScorePercentage({
    correctAnswers,
    totalQuestions,
  });

  return (
    <section className="quiz-result" aria-labelledby="quiz-result-title">
      <p className="quiz-result__eyebrow">Quiz completed</p>

      <h1 className="quiz-result__title" id="quiz-result-title">
        {quizTitle}
      </h1>

      <p className="quiz-result__score">{percentage}%</p>

      <p className="quiz-result__summary">
        You answered <strong>{correctAnswers}</strong> of{" "}
        <strong>{totalQuestions}</strong> questions correctly.
      </p>

      <button className="primary-button" type="button" onClick={onReturnHome}>
        Return home
      </button>
    </section>
  );
}

export default QuizResultScreen;
