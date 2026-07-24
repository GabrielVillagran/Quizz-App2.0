import ScoreBoard from "../scores/ScoreBoard";
import { mockScores } from "../scores/mockScores";
import HeroSection from "./HeroSection";

interface HomeScreenProps {
  onCreateQuiz: () => void;
}

function HomeScreen({ onCreateQuiz }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <HeroSection onCreateQuiz={onCreateQuiz} />

      <ScoreBoard scores={mockScores} />
    </div>
  );
}

export default HomeScreen;
