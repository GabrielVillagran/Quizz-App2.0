import { useState } from "react";

import { mockScores } from "./features/scores/mockScores";
import AppHeader from "./components/AppHeader";
import HomeScreen from "./features/home/HomeScreen";
import QuizConfigurationPanel from "./features/quiz-generation/QuizConfigurationPanel";
import type { QuizConfiguration } from "./features/quiz-generation/quizConfiguration.types";

import "./App.css";

function App() {
  const [isQuizConfigurationOpen, setIsQuizConfigurationOpen] = useState(false);

  function handleOpenQuizConfiguration(): void {
    setIsQuizConfigurationOpen(true);
  }

  function handleCloseQuizConfiguration(): void {
    setIsQuizConfigurationOpen(false);
  }

  function handleQuizConfigurationSubmit(
    configuration: QuizConfiguration,
  ): void {
    console.info("Quiz configuration submitted:", configuration);
  }

  return (
    <div className="app">
      <AppHeader />

      <main className="app__main">
        {isQuizConfigurationOpen ? (
          <QuizConfigurationPanel
            onClose={handleCloseQuizConfiguration}
            onSubmit={handleQuizConfigurationSubmit}
          />
        ) : (
          <HomeScreen
            scores={mockScores}
            onCreateQuiz={handleOpenQuizConfiguration}
          />
        )}
      </main>
    </div>
  );
}

export default App;
