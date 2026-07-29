import { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import HomeScreen from "./features/home/HomeScreen";
import QuizConfigurationPanel from "./features/quiz-generation/QuizConfigurationPanel";
import type { QuizConfiguration } from "./features/quiz-generation/quizConfiguration.types";
import { fakeQuiz } from "./features/quiz-game/fakeQuiz";
import QuizGameScreen from "./features/quiz-game/quizGameScreen";
import type { QuizCompletionResult } from "./features/quiz-game/quiz.types";
import { mockScores } from "./features/scores/mockScores";
import type { QuizScore } from "./features/scores/quizScore.types";
import { loadQuizScores, saveQuizScores } from "./features/scores/scoreStorage";

import "./App.css";

type AppScreen = "home" | "quiz-configuration" | "quiz-game";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");

  const [scores, setScores] = useState<QuizScore[]>(() =>
    loadQuizScores(mockScores),
  );

  useEffect(() => {
    saveQuizScores(scores);
  }, [scores]);

  function handleQuizCompleted(result: QuizCompletionResult): void {
    const completedScore: QuizScore = {
      id: crypto.randomUUID(),
      quizTitle: result.quizTitle,
      difficulty: result.difficulty,
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      completedAt: new Date().toISOString(),
    };

    setScores((currentScores) => [completedScore, ...currentScores]);
  }

  function handleOpenQuizConfiguration(): void {
    setCurrentScreen("quiz-configuration");
  }

  function handleReturnHome(): void {
    setCurrentScreen("home");
  }

  function handleQuizConfigurationSubmit(
    configuration: QuizConfiguration,
  ): void {
    console.info("Quiz configuration submitted:", configuration);

    setCurrentScreen("quiz-game");
  }

  function renderCurrentScreen() {
    switch (currentScreen) {
      case "quiz-configuration":
        return (
          <QuizConfigurationPanel
            onClose={handleReturnHome}
            onSubmit={handleQuizConfigurationSubmit}
          />
        );

      case "quiz-game":
        return (
          <QuizGameScreen
            quiz={fakeQuiz}
            onExit={handleReturnHome}
            onComplete={handleQuizCompleted}
          />
        );

      case "home":
      default:
        return (
          <HomeScreen
            scores={scores}
            onCreateQuiz={handleOpenQuizConfiguration}
          />
        );
    }
  }

  return (
    <div className="app">
      <AppHeader />

      <main className="app__main">{renderCurrentScreen()}</main>
    </div>
  );
}

export default App;
