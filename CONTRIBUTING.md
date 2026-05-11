# Contributing

Thank you for your interest in contributing to this project. This guide outlines the process for making contributions.

## Getting Started

1. Fork the repository.
2. Clone your fork locally:
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

Use one of the following prefixes:

| Prefix      | Purpose                          |
| ----------- | -------------------------------- |
| `feature/`  | New features or enhancements     |
| `bugfix/`   | Bug fixes                        |
| `hotfix/`   | Urgent production fixes          |
| `docs/`     | Documentation changes            |
| `devin/`    | Branches created by Devin AI     |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]
```

Common types: `feat`, `fix`, `docs`, `ci`, `test`, `refactor`, `chore`.

## Pull Requests

1. Push your branch and open a PR against `master`.
2. Provide a clear description of the changes and their purpose.
3. Ensure CI checks pass before requesting review.
4. PRs require at least one approving review before merging.

### Pipeline PRs

PRs with `[pipeline]` in the title are created by automated Devin sessions and skip certain CI workflows to prevent recursive triggers. Do not add `[pipeline]` to manual PR titles unless you intend to bypass those workflows.

## Code Style

- **JavaScript/TypeScript**: Follow the existing ESLint configuration.
- **Python**: Use type hints, Google-style docstrings, and a 100-character line limit.
- **General**: Match the conventions of the surrounding code.

## Security Considerations

This repository intentionally contains vulnerabilities for demonstration purposes. When contributing:

- **Do not** fix intentional vulnerabilities unless explicitly asked to.
- **Do not** add real secrets, credentials, or API keys.
- If adding new demo vulnerabilities, document them in [SECURITY.md](SECURITY.md).

## Questions

Open a GitHub issue for questions or suggestions.
