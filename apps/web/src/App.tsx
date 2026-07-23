import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <a
          className="app__brand"
          href="/"
          aria-label="Quiz Learning Platform home"
        >
          Quiz Learning Platform
        </a>
      </header>

      <main className="app__main">
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero__eyebrow">Learn through practice</p>

          <h1 className="hero__title" id="hero-title">
            Turn your study notes into interactive quizzes
          </h1>

          <p className="hero__description">
            Generate personalized quizzes, test your knowledge, and compete
            against your previous scores.
          </p>

          <button className="hero__action" type="button">
            Create a quiz
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
