import type { QuizScore } from "./quizScore.types";
import {
  calculateAverageScore,
  calculateScorePercentage,
  findPersonalBest,
  formatScoreDate,
} from "./score.utils";

interface ScoreBoardProps {
  scores: QuizScore[];
}

function ScoreBoard({ scores }: ScoreBoardProps) {
  const personalBest = findPersonalBest(scores);
  const averageScore = calculateAverageScore(scores);

  return (
    <section className="scoreboard" aria-labelledby="scoreboard-title">
      <div className="scoreboard__header">
        <div>
          <p className="scoreboard__eyebrow">Keep improving</p>

          <h2 className="scoreboard__title" id="scoreboard-title">
            Your progress
          </h2>
        </div>
      </div>

      {scores.length === 0 ? (
        <p className="scoreboard__empty">
          Complete your first quiz to start tracking your progress.
        </p>
      ) : (
        <>
          <div className="scoreboard__summary">
            <article className="score-summary-card">
              <span className="score-summary-card__label">Personal best</span>

              <strong className="score-summary-card__value">
                {personalBest}%
              </strong>
            </article>

            <article className="score-summary-card">
              <span className="score-summary-card__label">Average score</span>

              <strong className="score-summary-card__value">
                {averageScore}%
              </strong>
            </article>

            <article className="score-summary-card">
              <span className="score-summary-card__label">
                Quizzes completed
              </span>

              <strong className="score-summary-card__value">
                {scores.length}
              </strong>
            </article>
          </div>

          <div className="scoreboard__history">
            <h3 className="scoreboard__history-title">Recent scores</h3>

            <ol className="score-list">
              {scores.map((score) => {
                const percentage = calculateScorePercentage(score);

                return (
                  <li className="score-list__item" key={score.id}>
                    <div>
                      <p className="score-list__title">{score.quizTitle}</p>

                      <p className="score-list__metadata">
                        {score.difficulty} ·{" "}
                        {formatScoreDate(score.completedAt)}
                      </p>
                    </div>

                    <strong className="score-list__percentage">
                      {percentage}%
                    </strong>
                  </li>
                );
              })}
            </ol>
          </div>
        </>
      )}
    </section>
  );
}

export default ScoreBoard;
