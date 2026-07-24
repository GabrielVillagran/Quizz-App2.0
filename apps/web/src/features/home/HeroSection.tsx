import PrimaryButton from "../../components/PrimaryButton";

interface HeroSectionProps {
  onCreateQuiz: () => void;
}

function HeroSection({ onCreateQuiz }: HeroSectionProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow">Learn through practice</p>

      <h1 className="hero__title" id="hero-title">
        Turn your study notes into interactive quizzes
      </h1>

      <p className="hero__description">
        Generate personalized quizzes, test your knowledge, and compete against
        your previous scores.
      </p>

      <PrimaryButton onClick={onCreateQuiz}>Create a quiz</PrimaryButton>
    </section>
  );
}

export default HeroSection;
