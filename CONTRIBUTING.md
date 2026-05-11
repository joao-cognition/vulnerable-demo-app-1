# Contributing

Thank you for your interest in contributing to this project! This guide explains how to get started.

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. Create a feature branch from `master`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make your changes and verify the application starts:

   ```bash
   npm run dev
   ```

## Branch Naming

Use a descriptive prefix for your branch:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New functionality |
| `bugfix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `docs/` | Documentation updates |
| `fix/` | Security or dependency fixes |

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `ci`, `style`

Examples:

```
feat(api): add health check endpoint
fix(deps): upgrade lodash to 4.17.21
docs: update README with setup instructions
ci: add Snyk security scan workflow
```

## Pull Request Process

1. Ensure your branch is up to date with `master`.
2. Open a pull request targeting the `master` branch.
3. Fill in the PR template with a clear description of your changes.
4. Wait for CI checks to complete:
   - **Snyk Security Scan** — dependency vulnerability check.
5. Request a review from a maintainer.
6. Address any review feedback.
7. A maintainer will merge the PR once approved.

## Security Considerations

- **Never commit real secrets or credentials.** Use environment variables and the `.env` file (which is git-ignored).
- When upgrading dependencies, verify that the upgrade resolves the target vulnerability by running `snyk test` locally.
- See [SECURITY.md](SECURITY.md) for the vulnerability reporting process and dependency update policy.

## Development Notes

- The application entry point is `src/index.js` (Node.js/Express).
- Client-side code lives in `packages/app/`.
- Python utilities are in `src/python/` (requires `psycopg2-binary`).
- Terraform configurations in `config/` define AWS infrastructure.
- The `Dockerfile` uses a multi-stage build targeting Node.js 18.

## Code of Conduct

Be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive experience for everyone.
