# Product Scope

## Product vision

Quiz Learning Platform helps learners convert recently studied material into interactive quizzes.

The learner describes the topics they studied, optionally provides notes, selects quiz settings, and receives a personalized game that tests their understanding.

The application should make studying more engaging by combining practice, immediate feedback, explanations, scores, and personal records.

## Primary users

The initial product is designed for two users:

- A learner studying data analysis and Portuguese
- A developer using the project to learn professional React and full-stack development

The product architecture should remain general enough to support additional learners and subjects later.

## Primary use cases

### Generate a quiz

The learner can provide:

- A subject
- Studied topics
- Optional study notes
- Difficulty
- Number of questions
- Question types
- Quiz language
- Explanation language

The application generates a structured quiz based on those settings.

### Review a quiz

Before beginning the game, the learner can:

- Read generated questions
- Edit a question
- Remove a question
- Review answer options
- Verify the correct answer
- Regenerate a question

### Play a quiz

The learner can:

- Select answers
- Move through questions
- See quiz progress
- Complete the quiz
- Receive a final score
- Review explanations

### Save a score

After completing a quiz, the learner can save:

- Player name
- Quiz title
- Subject
- Difficulty
- Correct answers
- Total questions
- Percentage
- Completion time
- Completion date

### Review local performance

The learner can view:

- Previous scores
- Personal best
- Previous result
- Improvement or decline
- Best score by subject
- Quiz completion history

## Functional requirements

### Quiz configuration

The system must allow the learner to configure a quiz.

The initial supported learning profiles are:

- General
- Data analysis
- Portuguese

### Quiz generation

The system must generate structured questions through an AI provider.

The initial provider will be OpenAI.

A future implementation will support Ollama without requiring changes to the React user interface.

### Quiz gameplay

The system must support at least:

- Multiple-choice questions
- True-or-false questions

Additional question types may be added after the first release.

### Scoring

The system must calculate:

- Correct-answer count
- Incorrect-answer count
- Percentage score
- Quiz duration

### Local persistence

The system must store quiz scores in the browser.

The first version does not require server-side persistence.

### Responsive interface

The application must be usable from:

- Desktop browsers
- Tablet browsers
- Mobile browsers

## Non-functional requirements

### Security

- The OpenAI API key must never be included in frontend code.
- AI requests must pass through the backend.
- Public generation endpoints must use validation and rate limiting.
- Environment files containing secrets must not be committed.

### Reliability

- Generated AI responses must be validated before reaching the frontend.
- Invalid responses must produce understandable errors.
- The application must provide loading and failure states.

### Maintainability

- Components must have clear responsibilities.
- Business rules should be separated from visual presentation when justified.
- New abstractions must solve a current or likely problem.
- The project should avoid premature overengineering.

### Testability

- Important business rules must have unit tests.
- Important React behavior must have component tests.
- API behavior must have integration tests.
- Pull requests must pass automated quality checks.

### Accessibility

- Interactive controls must be keyboard accessible.
- Inputs must have associated labels.
- Pages must use meaningful headings and semantic HTML.
- Error messages must be understandable and discoverable.

### Performance

- The frontend must use a production build.
- AI requests must use reasonable timeouts.
- Quiz-generation input and output sizes must be limited.
- Unnecessary frontend dependencies should be avoided.

## Version 1 exclusions

Version 1 will not implement:

- Authentication
- User registration
- Database persistence
- Multiplayer sessions
- WebSockets
- Global rankings
- Social features
- Payments
- Administrative dashboards
- File uploads

These features are excluded to maintain a focused and deliverable first release.

## Future direction

A later release may introduce:

- Ollama as an alternative quiz generator
- Docker-based development and deployment
- Export and import of local scores
- Additional question types
- Adaptive quizzes based on previous mistakes
- Server-side persistence if it becomes useful

Future features must be evaluated based on actual user needs rather than added speculatively.
