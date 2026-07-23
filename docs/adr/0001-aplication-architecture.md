# ADR 0001: Use a React and Node.js Modular Monolith

- Status: Accepted
- Date: 2026-07-23

## Context

Quiz Learning Platform requires a browser-based interface, an API for AI-generated quizzes, automated testing, and cloud deployment.

The frontend must provide an interactive quiz experience. The backend must protect AI provider credentials, validate generated responses, apply usage limits, and isolate the frontend from provider-specific implementation details.

The application is initially intended for a very small number of users. It does not currently require independent service scaling, distributed transactions, or multiple deployment teams.

The project must also function as a professional React learning project without introducing unnecessary operational complexity.

## Decision

The application will use a modular monolith organized as an npm workspace.

The main applications will be:

```text
apps/web
apps/api
```

The web application will use:

- React
- TypeScript
- Vite

The API will later use:

- Node.js
- NestJS
- TypeScript

The applications will remain independently organized but will be maintained in one Git repository.

The React application will communicate with the API through HTTP.

The frontend will not communicate directly with OpenAI or Ollama.

The backend will expose an application-level quiz-generation operation and hide provider-specific details.

Conceptually:

```text
React Web Application
        |
        | HTTPS
        v
NestJS API
        |
        v
Quiz Generator Boundary
        |
        +-- OpenAI implementation
        |
        +-- Ollama implementation
```

The first deployed release will use OpenAI.

A later release may introduce Ollama through a separate provider implementation.

## Rationale

### React

React supports component-based interfaces and is directly relevant to the developer’s professional learning goals.

### TypeScript

TypeScript provides safer component APIs, domain modeling, refactoring support, and shared language across the frontend and backend.

### Vite

Vite provides a lightweight development server and production build process without requiring a full-stack React framework.

### Node.js and NestJS

Node.js allows the entire application to use TypeScript.

NestJS provides modules, dependency injection, controllers, services, validation integration, and testing support for the API.

### Monorepo

A monorepo provides:

- One version-control history
- One pull-request workflow
- Shared quality commands
- Easier coordination between frontend and backend
- Simplified documentation
- The possibility of sharing contracts later

### Modular monolith

A modular monolith provides clear boundaries without the operational cost of microservices.

Microservices would not currently provide enough value to justify:

- Multiple deployments
- Service discovery
- Distributed logging
- Network failure handling
- Cross-service versioning
- Increased local-development complexity

## Consequences

### Positive consequences

- The first version can be delivered faster.
- The frontend and backend remain clearly separated.
- AI credentials remain on the server.
- Testing and CI can be managed from one repository.
- The AI provider can be changed later without redesigning React.
- The architecture can grow incrementally.

### Negative consequences

- The repository contains multiple applications.
- Root scripts and workspace configuration require additional setup.
- Deployment configuration must understand the monorepo structure.
- Shared packages could become dumping grounds if boundaries are not maintained.

## Mitigations

- Shared packages will only be introduced when multiple applications genuinely need them.
- The project will avoid creating interfaces without a concrete testing or substitution need.
- Architecture will evolve after working functionality exposes real coupling.
- Each phase will include refactoring only where it provides measurable clarity.

## Alternatives considered

### React calling OpenAI directly

Rejected because the browser would expose the OpenAI API key and provider implementation details.

### Separate frontend and backend repositories

Rejected for the initial release because it would add coordination and CI/CD overhead without a clear benefit.

### Next.js full-stack application

Not selected because the current learning goal emphasizes React with a separately understood Node.js backend.

### Microservices

Rejected because the application does not require independent service scaling or distributed ownership.

### Database in Version 1

Rejected because browser storage is sufficient for local score history and avoids unnecessary infrastructure.

## Review conditions

This decision should be reviewed when:

- The application requires independent frontend and backend release cycles.
- Multiple teams own different services.
- Server-side score synchronization becomes necessary.
- A database is introduced.
- Ollama requires a deployment topology that changes the current backend design.
