# Contributing

Thank you for your interest in contributing to this project. This guide outlines the process and conventions for contributing.

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

4. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming

Use one of the following prefixes for your branch name:

| Prefix      | Use case                          |
|-------------|-----------------------------------|
| `feature/`  | New features or enhancements      |
| `bugfix/`   | Bug fixes                         |
| `hotfix/`   | Urgent production fixes           |
| `docs/`     | Documentation changes             |
| `devin/`    | Automated changes from Devin AI   |

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

Examples:

```
feat: add user authentication endpoint
fix: resolve SQL injection in accounts query
docs: update README with setup instructions
ci: add Snyk security scanning workflow
```

## Pull Requests

1. Ensure your branch is up to date with `master`:

   ```bash
   git fetch origin
   git rebase origin/master
   ```

2. Push your branch and open a PR targeting `master`
3. Fill out the PR description with:
   - A summary of changes
   - Any related issue numbers
   - Testing steps (if applicable)
4. Wait for CI checks to pass

### CI Pipeline Behavior

- PRs targeting `master` trigger the **Snyk Security Scan**, **Documentation Update**, and **Test Coverage** workflows
- PRs with `[pipeline]` in the title **skip** the Documentation Update and Test Coverage workflows to prevent recursive loops
- The Snyk scan must pass (no critical vulnerabilities) for the PR to be mergeable

## Code Standards

### JavaScript / TypeScript

- Use ES module syntax (`import`/`export`)
- Follow existing code style and conventions

### Python

- Include type hints for all function parameters and return values
- Use Google-style docstrings
- Maximum line length: 100 characters
- Group imports: standard library, third-party, local

### General

- Do not commit secrets, API keys, or credentials (use environment variables)
- Keep changes focused and minimal
- Add tests for new functionality when applicable

## Security

If you discover a security vulnerability, **do not** open a public issue. See [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

## Questions

If you have questions or need help, open a GitHub issue with the `question` label.
