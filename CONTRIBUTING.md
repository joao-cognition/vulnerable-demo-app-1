# Contributing

Thank you for your interest in contributing to this project. This document outlines the guidelines and processes for contributing.

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
4. Create a feature branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming

Use descriptive branch names with the following prefixes:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features or enhancements |
| `bugfix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `docs/` | Documentation changes |
| `devin/` | Branches created by Devin AI automation |

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>

[optional body]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `ci` | CI/CD pipeline changes |
| `refactor` | Code refactoring (no functional change) |
| `chore` | Maintenance tasks |

### Examples

```
feat: add user authentication endpoint
fix: resolve SQL injection in accounts query
docs: update README with setup instructions
ci: add Snyk security scan workflow
```

## Pull Request Process

1. Ensure your branch is up to date with `master`:
   ```bash
   git fetch origin
   git rebase origin/master
   ```
2. Push your branch and open a Pull Request targeting `master`
3. Fill in the PR description with:
   - Summary of changes
   - Review and testing checklist
   - Any relevant notes
4. Wait for CI checks to pass
5. Request a review from a maintainer

### The `[pipeline]` Convention

PRs created by automated CI pipelines (Devin AI) use the `[pipeline]` prefix in their title. This prevents the documentation and test coverage workflows from triggering additional Devin sessions, avoiding infinite loops.

**When to use `[pipeline]`:**
- When Devin AI creates a PR as part of an automated workflow
- When you want to skip the automated documentation and test coverage CI jobs

**When NOT to use `[pipeline]`:**
- For regular human-authored PRs (you want the full CI suite to run)

## Security Considerations

- **Never commit real secrets or credentials** to the repository
- Review [SECURITY.md](SECURITY.md) for the vulnerability reporting process
- If your PR introduces new dependencies, verify they do not have known critical vulnerabilities (`npm audit` or `snyk test`)

## Code Style

- Follow the existing conventions in the file you are editing
- Use type hints for Python functions
- Use TypeScript where possible for new service files

## Questions?

Open a GitHub issue for general questions or discussions about the project.
