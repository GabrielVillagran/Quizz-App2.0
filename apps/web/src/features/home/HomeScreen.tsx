import type { QuizScore } from "../scores/quizScore.types";
import ScoreBoard from "../scores/ScoreBoard";
import HeroSection from "./HeroSection";

interface HomeScreenProps {
  scores: QuizScore[];
  onCreateQuiz: () => void;
}

function HomeScreen({ scores, onCreateQuiz }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <HeroSection onCreateQuiz={onCreateQuiz} />

      <ScoreBoard scores={scores} />
    </div>
  );
}

export default HomeScreen;
