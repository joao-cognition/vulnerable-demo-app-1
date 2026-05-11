# Contributing

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the vulnerable demo application.

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

Use descriptive branch names with the following prefixes:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features or enhancements |
| `bugfix/` | Bug fixes |
| `docs/` | Documentation changes |
| `devin/` | Branches created by Devin automated sessions |

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `ci`, `test`, `refactor`, `chore`

Examples:
```
feat: add new vulnerability detection pattern
fix: resolve SQL injection in accounts module
docs: update README with setup instructions
ci: add Snyk scanning to PR workflow
```

## Pull Requests

1. Ensure your changes are on a feature branch (not `master`)
2. Write a clear PR title and description
3. Reference any related issues
4. PRs targeting `master` will trigger the following CI checks:
   - **Snyk Security Scan** — Dependency vulnerability analysis
   - **Documentation Update** — Automated documentation review (skipped for `[pipeline]` PRs)
   - **Test Coverage** — Automated test coverage review (skipped for `[pipeline]` PRs)

### Important: The `[pipeline]` Convention

PRs created by automated Devin sessions use `[pipeline]` in the title to prevent triggering recursive CI loops. If you are manually creating a PR that should skip the Documentation Update and Test Coverage workflows, prefix your title with `[pipeline]`.

## Project Structure

Before making changes, familiarise yourself with the project layout described in the [README](README.md#project-structure).

### Key Directories

- **`src/`** — Multi-language source code (JS, TS, Python, PHP, C#)
- **`packages/app/`** — Client-side application
- **`config/`** — Terraform infrastructure definitions
- **`.github/workflows/`** — CI/CD pipeline definitions

## Adding New Vulnerabilities

This is a security demo repository. If you are adding new intentional vulnerabilities:

1. Choose a clear, well-known vulnerability class (e.g., OWASP Top 10)
2. Keep the vulnerable code self-contained and easy to understand
3. Do **not** introduce vulnerabilities that could affect the CI/CD pipeline or GitHub Actions security
4. Document the vulnerability type in a code comment if it is not immediately obvious

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on the educational and demonstration purpose of this project
- Do not use this repository or its contents to attack real systems

## Questions?

Open an issue on GitHub or reach out to the maintainers.
