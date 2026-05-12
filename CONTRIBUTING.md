# Contributing

Thank you for your interest in contributing to this project! This document provides guidelines to help you get started.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming

Use the following prefixes for branch names:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features or enhancements |
| `bugfix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `docs/` | Documentation changes |
| `devin/` | Automated changes from Devin AI |

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `ci`, `refactor`, `test`, `chore`

**Examples:**
```
feat(auth): add OAuth2 login support
fix(api): handle null response from payment gateway
docs: update README with setup instructions
ci: add Snyk security scan to PR workflow
```

## Pull Requests

1. Ensure your branch is up to date with `master` before opening a PR.
2. Write a clear PR title and description explaining **what** and **why**.
3. Link any related issues in the PR description.
4. Ensure CI checks pass before requesting review.
5. PRs require at least one approval before merging.

### Important: `[pipeline]` Prefix

PRs with `[pipeline]` in the title are **automated** (created by Devin AI) and are excluded from triggering additional CI pipelines to prevent recursive loops. Do not use this prefix for manual PRs.

## Code Standards

### JavaScript / TypeScript

- Use ES module syntax (`import`/`export`).
- Follow existing code style and conventions.
- Add JSDoc comments for exported functions.

### Python

- Include type hints on all function signatures.
- Use Google-style docstrings.
- Maximum line length: 100 characters.
- Group imports: standard library, third-party, local.

### General

- Do not commit secrets, credentials, or API keys.
- Use environment variables for sensitive configuration.
- Write tests for new functionality when applicable.

## Security

- Review [SECURITY.md](SECURITY.md) for the security policy.
- Do not introduce known vulnerable dependencies.
- Check Snyk scan results on your PR before requesting review.

## Questions?

If you have questions about contributing, open a GitHub issue or reach out to the maintainers.
