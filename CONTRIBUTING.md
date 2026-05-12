# Contributing

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the Vulnerable Demo App repository.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

## Development Workflow

### Branch Naming

Create a descriptive branch from `master`:

```bash
git checkout -b <prefix>/<short-description>
```

Use one of these prefixes:
- `feature/` — new functionality
- `bugfix/` — bug fixes
- `hotfix/` — urgent production fixes
- `docs/` — documentation changes
- `test/` — adding or updating tests
- `devin/` — branches created by Devin AI automation

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>
```

Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `ci`, `style`

Examples:
```
feat: add user authentication endpoint
fix: resolve SQL injection in account query
docs: update README with setup instructions
test: add unit tests for sentry service
ci: update Snyk scan workflow
```

### Running Tests

Before submitting a PR, verify that all tests pass:

```bash
npm test
```

### Code Style

- **JavaScript/TypeScript:** Follow the existing ESLint configuration
- **Python:** Use type hints, Google-style docstrings, and a maximum line length of 100 characters
- **General:** Match the conventions of the file you are editing

## Pull Requests

### Creating a PR

1. Push your branch to your fork
2. Open a pull request targeting the `master` branch
3. Fill in the PR description with:
   - A summary of the changes
   - Any related issues
   - Testing steps

### CI Pipelines

When you open a PR against `master`, the following CI workflows run automatically:

| Workflow | Purpose |
|----------|---------|
| **Snyk Security Scan** | Checks for dependency vulnerabilities |
| **Documentation Update** | Triggers a Devin session to review docs |
| **Test Coverage** | Triggers a Devin session to review test coverage |

> **Note:** PRs with `[pipeline]` in the title skip the Documentation Update and Test Coverage workflows to prevent recursive automation loops.

### Review Process

- All PRs require at least one review before merging
- CI checks must pass before merging
- Address review feedback with new commits (do not force-push or amend)

## Reporting Issues

Use [GitHub Issues](https://github.com/joao-cognition/vulnerable-demo-app-1/issues) to report bugs or request features. Include:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Relevant logs or screenshots

## Security Vulnerabilities

For security-related issues, please refer to [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
