# Quiz Learning Platform

An AI-powered quiz application that transforms study topics and notes into interactive quizzes.

The initial version is being developed for two primary learning contexts:

- Data analysis
- Portuguese

The platform will remain general enough to support other subjects.

## Project goals

The project has two complementary goals:

1. Provide a practical learning tool that can be used from a web browser.
2. Serve as a professional React and full-stack learning project.

The codebase prioritizes:

- Clear responsibilities
- Maintainable architecture
- Type safety
- Automated testing
- Continuous integration
- Incremental delivery
- Practical documentation

## Version 1 scope

The first deployed version will support:

- Quiz configuration
- Topic and study-note input
- AI-generated questions
- General, data-analysis, and Portuguese learning profiles
- Multiple-choice and true-or-false questions
- Quiz review before playing
- Individual quiz gameplay
- Score calculation
- Explanations for answers
- Local score history
- Personal best comparison
- Responsive browser support
- Continuous integration and deployment

Version 1 will not include:

- User accounts
- Authentication
- A database
- Multiplayer gameplay
- Public leaderboards
- Payments
- PDF uploads

Scores and preferences will initially be stored in the browser.

## Technology stack

### Web application

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- ESLint
- Prettier

### API

The API will be introduced in a later phase using:

- Node.js
- NestJS
- OpenAI API
- Zod
- Automated API tests

### Delivery

- Git
- GitHub
- GitHub Actions
- Cloud deployment

## Repository structure

```text
quiz-learning-platform/
├── apps/
│   ├── web/
│   └── api/
├── docs/
│   ├── adr/
│   └── phases/
├── packages/
├── .github/
│   └── workflows/
├── package.json
└── README.md
```

Some directories are introduced only when their responsibilities become necessary.

## Requirements

- Node.js 24.18.0
- npm 11.16.0
- Git

The expected Node.js version is documented in `.nvmrc`.

On Windows with NVM for Windows:

```cmd
nvm use 24.18.0
```

## Installation

Install all workspace dependencies from the repository root:

```cmd
npm ci
```

For normal local dependency updates, use:

```cmd
npm install
```

## Development

Start the React development server:

```cmd
npm run dev:web
```

Vite will display the local application URL in the terminal.

## Quality checks

Run all frontend quality checks:

```cmd
npm run quality:web
```

This command performs:

1. Formatting validation
2. ESLint analysis
3. TypeScript checking
4. Automated tests
5. Production build

Individual commands are also available:

```cmd
npm run format:check
npm run lint:web
npm run typecheck:web
npm run test:web
npm run build:web
```

## Git workflow

Development is performed in short-lived branches.

Examples:

```text
phase/00-project-foundations
feature/quiz-generation-form
fix/score-calculation
```

Commit messages follow the Conventional Commits style:

```text
feat: add quiz configuration form
fix: prevent empty quiz submission
test: cover score calculation
docs: document React component composition
ci: add frontend quality checks
```

Changes are integrated into `main` through pull requests after automated checks pass.

## Documentation

Learning notes and implementation summaries are stored in:

```text
docs/phases/
```

Architecture decisions are stored in:

```text
docs/adr/
```

Each phase document includes:

- Objectives
- Features implemented
- Technical theory
- Architecture decisions
- Testing strategy
- Problems encountered
- Interview questions
- Glossary
- Practice exercises

## Current status

The project is currently in:

```text
Phase 0 — Product and Engineering Foundations
```
