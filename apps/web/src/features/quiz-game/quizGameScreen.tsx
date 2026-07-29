import { useState } from "react";

import OptionQuestion from "./OptionQuestion";
import QuizResultScreen from "./QuizResultScreen";
import ShortAnswerQuestion from "./ShortAnswerQuestion";
import { getCorrectAnswerText, isQuizAnswerCorrect } from "./quizAnswer.utils";
import type { Quiz, QuizAnswer, QuizCompletionResult } from "./quiz.types";

interface QuizGameScreenProps {
  quiz: Quiz;
  onExit: () => void;
  onComplete: (result: QuizCompletionResult) => void;
}

function QuizGameScreen({ quiz, onExit, onComplete }: QuizGameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const [shortAnswerValue, setShortAnswerValue] = useState("");

  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (isQuizComplete) {
    return (
      <QuizResultScreen
        quizTitle={quiz.title}
        correctAnswers={correctAnswerCount}
        totalQuestions={quiz.questions.length}
        onReturnHome={onExit}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <section className="quiz-game">
        <h1>No questions available</h1>

        <button
          className="quiz-configuration__back"
          type="button"
          onClick={onExit}
        >
          Return home
        </button>
      </section>
    );
  }

  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  function handleSelectOption(optionId: string): void {
    setSelectedOptionId(optionId);
    setIsAnswerSubmitted(false);
  }

  function handleShortAnswerChange(value: string): void {
    setShortAnswerValue(value);
    setIsAnswerSubmitted(false);
  }

  const answer: QuizAnswer | null =
    currentQuestion.type === "short-answer"
      ? shortAnswerValue.trim() === ""
        ? null
        : {
            questionId: currentQuestion.id,
            kind: "text",
            value: shortAnswerValue,
          }
      : selectedOptionId === null
        ? null
        : {
            questionId: currentQuestion.id,
            kind: "option",
            selectedOptionId,
          };

  const isCorrect =
    isAnswerSubmitted && answer
      ? isQuizAnswerCorrect(currentQuestion, answer)
      : null;

  function handleCheckAnswer(): void {
    if (!answer || isAnswerSubmitted) {
      return;
    }

    const answerIsCorrect = isQuizAnswerCorrect(currentQuestion, answer);

    if (answerIsCorrect) {
      setCorrectAnswerCount((currentCount) => currentCount + 1);
    }

    setIsAnswerSubmitted(true);
  }

  function handleNextQuestion(): void {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= quiz.questions.length) {
      return;
    }

    setCurrentQuestionIndex(nextQuestionIndex);
    setSelectedOptionId(null);
    setShortAnswerValue("");
    setIsAnswerSubmitted(false);
  }

  function handleFinishQuiz(): void {
    onComplete({
      quizTitle: quiz.title,
      difficulty: quiz.difficulty,
      correctAnswers: correctAnswerCount,
      totalQuestions: quiz.questions.length,
    });

    setIsQuizComplete(true);
  }

  return (
    <section className="quiz-game" aria-labelledby="quiz-title">
      <header className="quiz-game__header">
        <div>
          <p className="quiz-game__progress">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>

          <h1 className="quiz-game__title" id="quiz-title">
            {quiz.title}
          </h1>
        </div>

        <button
          className="quiz-configuration__back"
          type="button"
          onClick={onExit}
        >
          Exit quiz
        </button>
      </header>

      <div className="quiz-game__question">
        {currentQuestion.type === "short-answer" ? (
          <ShortAnswerQuestion
            question={currentQuestion}
            value={shortAnswerValue}
            disabled={isAnswerSubmitted}
            onChange={handleShortAnswerChange}
          />
        ) : (
          <OptionQuestion
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            disabled={isAnswerSubmitted}
            onSelectOption={handleSelectOption}
          />
        )}
      </div>

      {isAnswerSubmitted && isCorrect !== null && (
        <section className="quiz-feedback" aria-live="polite">
          <h2 className="quiz-feedback__result">
            {isCorrect ? "Correct!" : "Incorrect"}
          </h2>

          {!isCorrect && (
            <p>
              <strong>Correct answer:</strong>{" "}
              {getCorrectAnswerText(currentQuestion)}
            </p>
          )}

          <p>
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </p>
        </section>
      )}

      {isAnswerSubmitted ? (
        <button
          className="primary-button quiz-game__submit"
          type="button"
          onClick={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
        >
          {isLastQuestion ? "Finish quiz" : "Next question"}
        </button>
      ) : (
        <button
          className="primary-button quiz-game__submit"
          type="button"
          disabled={answer === null}
          onClick={handleCheckAnswer}
        >
          Check answer
        </button>
      )}
    </section>
  );
}

export default QuizGameScreen;
