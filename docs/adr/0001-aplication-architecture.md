# ADR 0001 - Application Architecture

- Status: Accepted
- Updated: July 2026
- Decision owners: Quiz Learning Platform team

## Context

The Quiz Learning Platform allows a learner to describe what they studied, choose a difficulty, complete a generated quiz, review explanations, and track personal scores.

The first implementation established a React and TypeScript frontend with a complete local quiz engine. The next architecture step must support server-side quiz generation while keeping AI credentials private and preserving the tested frontend contract.

An earlier direction considered Node.js and NestJS for the backend. The project has now selected Java 21 and Spring Boot so the backend also serves as a structured learning path for enterprise Java, dependency injection, REST APIs, validation, testing, and AI-provider integration.

## Decision

### Repository structure

The project will remain a monorepo:

```text
quiz-learning-platform/
|-- apps/
|   |-- web/    React + TypeScript + Vite
|   `-- api/    Java 21 + Spring Boot + Maven
|-- docs/
|-- packages/   Shared packages only when justified
|-- .github/
`-- package.json
```

The npm workspace manages JavaScript and TypeScript packages. The Spring Boot application is managed independently with Maven and its Maven wrapper.

### Frontend

The web application uses:

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- Browser `localStorage` for personal score persistence in Version 1

The frontend owns:

- Quiz configuration UI
- Active quiz-session interaction
- Deterministic answer validation for the returned quiz contract
- Result presentation
- Personal score history in Version 1

The frontend must never contain OpenAI or other provider secrets.

### Backend

The API application will use:

- Java 21
- Spring Boot
- Maven
- Spring Web
- Jakarta Validation
- Spring Boot Actuator
- JUnit 5
- Mockito
- MockMvc

The backend owns:

- Quiz-generation HTTP endpoints
- Request validation
- Prompt construction
- AI-provider credentials
- Provider selection
- AI-response validation and mapping
- Error translation
- Observability and health endpoints

### Architectural style

The backend will begin as a modular monolith, not a microservice system.

```text
React frontend
      |
      | HTTP / JSON
      v
Spring Boot API
      |
      v
QuizGenerationService
      |
      v
QuizGenerator
  |-- FakeQuizGenerator
  |-- OpenAiQuizGenerator
  `-- OllamaQuizGenerator (later)
```

A modular monolith provides clear boundaries without introducing distributed deployment, service discovery, network retries between internal modules, or duplicated operational infrastructure.

### REST contract

The primary future endpoint is:

```text
POST /api/quizzes/generate
```

Example request:

```json
{
  "studyContent": "I studied SQL joins and grouping",
  "difficulty": "intermediate",
  "questionCount": 10
}
```

The response will match the frontend `Quiz` model and support:

- `multiple-choice`
- `true-false`
- `short-answer`

Every question must include an explanation.

### AI-provider boundary

The backend will depend on an application-level interface rather than directly on one provider:

```java
public interface QuizGenerator {
    Quiz generate(QuizGenerationRequest request);
}
```

Initial and future implementations:

```text
FakeQuizGenerator   -> deterministic local development and tests
OpenAiQuizGenerator -> Version 1 AI provider
OllamaQuizGenerator -> optional local provider through Docker later
```

This boundary applies dependency inversion and keeps controllers and application services independent from provider-specific SDKs.

### Security

- AI API keys exist only in backend environment variables or secret management.
- The frontend never calls OpenAI directly.
- The backend validates all incoming requests.
- AI responses are treated as untrusted input and validated before returning a quiz.
- No authentication is required for Version 1.
- Rate limiting, authentication, and multi-user score storage will be reconsidered when the product becomes publicly accessible or user accounts are introduced.

### Persistence

Version 1 has no backend database.

Completed personal scores remain in browser `localStorage`.

The backend is stateless for quiz generation. A database will be introduced only when product requirements require accounts, cross-device history, shared quizzes, analytics, or administrative content management.

### Testing

Frontend quality gates include:

- Formatting
- ESLint
- TypeScript compilation
- Vitest tests
- Production build

Backend quality gates will include:

- Maven compilation
- Unit tests
- Controller tests with MockMvc
- Validation tests
- Application-context test
- Package and startup verification

AI-provider tests must use fakes or mocked HTTP boundaries. CI must not require a real OpenAI key.

### Continuous integration

GitHub Actions will validate both applications.

```text
Frontend job -> npm ci -> quality:web
Backend job  -> ./mvnw verify
```

The jobs may run independently so failures are isolated and feedback remains fast.

### Deployment

The frontend and backend may be deployed independently while remaining in the same repository.

The frontend receives the backend base URL through environment configuration. The backend receives provider keys and provider selection through server-side configuration.

The initial deployment target may change without changing the domain architecture.

## Consequences

### Positive consequences

- The React frontend remains intact.
- API credentials are protected on the server.
- Java and Spring Boot provide a strong enterprise backend learning path.
- The fake provider supports deterministic development before AI integration.
- OpenAI and Ollama can share one application contract.
- The modular monolith keeps operations simple.
- No database is required for the first release.
- Frontend and backend tests can run without external AI services.

### Negative consequences

- The repository uses two build ecosystems: npm and Maven.
- TypeScript and Java models can drift unless the API contract is tested carefully.
- Local development requires running two processes.
- CORS or a Vite development proxy must be configured.
- Provider response validation adds backend implementation work.
- Browser score history is device-specific and can be cleared by the user.

### Risks and mitigations

#### Contract drift

Risk: Java response models and TypeScript domain models become inconsistent.

Mitigation:

- Add controller contract tests.
- Keep example JSON fixtures.
- Consider OpenAPI generation after the initial endpoint stabilizes.

#### AI output instability

Risk: A model returns invalid JSON or incomplete questions.

Mitigation:

- Use structured output where available.
- Validate every response.
- Reject unsupported question types.
- Require explanations.
- Log provider failures without exposing secrets.

#### Provider coupling

Risk: Provider-specific logic leaks into controllers and domain models.

Mitigation:

- Keep provider code behind `QuizGenerator`.
- Map provider responses into internal models.
- Test application services with `FakeQuizGenerator`.

#### Premature complexity

Risk: Adding authentication, databases, queues, or microservices before they solve a real product need.

Mitigation:

- Keep Version 1 stateless on the backend.
- Introduce infrastructure only through a new documented decision.

## Rejected alternatives

### Direct OpenAI calls from React

Rejected because browser code cannot protect API credentials and would make provider cost controls difficult.

### Node.js and NestJS backend

Rejected as the current project direction because the team chose Java and Spring Boot for backend learning and enterprise architecture practice. The React contract does not depend on this choice.

### Multiple backend implementations

Running both NestJS and Spring Boot was rejected because it would duplicate controllers, models, tests, provider integration, deployment, and maintenance.

### Microservices

Rejected because the product has one small backend capability and no current need for independently scaled or independently owned services.

### Database in Version 1

Rejected because the product has no authentication or cross-device score-history requirement. Browser persistence is sufficient for the initial release.

## Implementation sequence

1. Create `apps/api` with Java 21, Spring Boot, Maven, and the Maven wrapper.
2. Add a tested health endpoint.
3. Define Java request and response DTOs matching the frontend quiz contract.
4. Implement `QuizGenerator` and `FakeQuizGenerator`.
5. Add `POST /api/quizzes/generate` with validation and controller tests.
6. Connect the React configuration screen to the fake Spring Boot endpoint.
7. Add frontend loading and error states.
8. Implement `OpenAiQuizGenerator` behind the existing interface.
9. Validate and map AI responses.
10. Extend CI to run frontend and backend quality gates.
11. Add Ollama as an optional provider later without changing controllers.

## Review triggers

Revisit this decision when the product requires any of the following:

- User authentication
- Cross-device score history
- Shared or public quizzes
- Real-time collaboration
- Independent service scaling
- Multiple backend teams
- A persistent quiz catalog
- Analytics that cannot remain client-side
- Regulatory or enterprise security controls
