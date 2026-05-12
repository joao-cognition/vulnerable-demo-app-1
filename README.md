# Vulnerable Demo App

A demonstration repository for automated security scanning and AI-driven vulnerability remediation. The project showcases how [Snyk](https://snyk.io/) vulnerability detection integrates with [Devin AI](https://devin.ai/) auto-fix pipelines to detect, triage, and resolve security issues automatically.

## Purpose

This repository intentionally contains dependencies with known vulnerabilities and code patterns with security issues. It serves as a **demo environment** to illustrate:

- Automated dependency vulnerability scanning via Snyk
- AI-driven remediation sessions triggered by Devin when critical CVEs are found
- CI pipeline design that prevents recursive workflow triggers using the `[pipeline]` PR title prefix

> **Warning:** This repository contains intentionally vulnerable code and dependencies for demonstration purposes. Do not use any of this code in production.

## Project Structure

```
├── .github/workflows/       # CI/CD pipelines
│   ├── snyk-security-scan.yml    # Snyk scan + Devin auto-remediation
│   ├── devin-documentation.yml   # Automated documentation updates via Devin
│   └── devin-test-coverage.yml   # Automated test coverage via Devin
├── packages/app/             # Client-side JavaScript application
│   └── src/
│       ├── api.js                # API call utilities
│       └── index.js              # Application entry point
├── src/
│   ├── services/             # JavaScript/TypeScript service modules
│   │   ├── pusher.js             # Pusher real-time integration
│   │   ├── sentry.js             # Sentry error tracking + RBAC logic
│   │   └── wait.ts               # Endpoint polling utilities
│   ├── python/               # Python database interface
│   │   ├── accounts.py           # Account query operations (PostgreSQL)
│   │   └── requirements.txt      # Python dependencies
│   ├── infra/                # C# infrastructure code
│   │   └── MigratePlatfromTask.cs # Platform migration orchestrator
│   └── index.php             # PHP file metadata utility
├── config/                   # Terraform infrastructure definitions
├── android/                  # Android manifest
├── Dockerfile                # Multi-stage Node.js container build
├── package.json              # Node.js dependencies and scripts
└── .env.example              # Example environment variables
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later
- (Optional) [Docker](https://www.docker.com/) for container-based workflows
- (Optional) [Python 3.x](https://www.python.org/) with `psycopg2-binary` for the Python modules

### Installation

```bash
# Clone the repository
git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
cd vulnerable-demo-app-1

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Running the Application

```bash
# Start the development server
npm run dev

# Or start in production mode
npm start
```

The application listens on port **3000** by default.

### Running with Docker

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

### Running Tests

```bash
npm test
```

Jest is configured with coverage reporting. See the test suites under `__tests__/` and `packages/app/src/`.

## Environment Variables

| Variable          | Description                          | Default                                      |
|-------------------|--------------------------------------|----------------------------------------------|
| `NODE_ENV`        | Application environment              | `development`                                |
| `SENTRY_DSN`      | Sentry Data Source Name for error tracking | —                                       |
| `MASTER_PASSWORD` | Application master password          | —                                            |
| `PGHOST`          | PostgreSQL host (Python module)      | `localhost`                                  |
| `PGDATABASE`      | PostgreSQL database name             | `testdb`                                     |
| `PGUSER`          | PostgreSQL username                  | `testuser`                                   |
| `PGPASSWORD`      | PostgreSQL password                  | `testpass`                                   |

See [`.env.example`](.env.example) for a template.

## CI/CD Pipelines

### Snyk Security Scan (`snyk-security-scan.yml`)

Runs on every push and pull request to `master`:

1. Installs dependencies and the Snyk CLI
2. Scans for open-source dependency vulnerabilities using `snyk test`
3. Reports critical/high vulnerability counts in the GitHub Actions summary
4. **Fails the pipeline** if any critical vulnerabilities are found
5. On failure, automatically triggers a **Devin AI remediation session** to fix the vulnerabilities

The Devin remediation step is skipped for PRs whose title contains `[pipeline]` to prevent recursive CI loops.

### Documentation Update (`devin-documentation.yml`)

Triggered on PRs to `master` (skipped for `[pipeline]` PRs):
- Creates a Devin session to review and update repository documentation

### Test Coverage (`devin-test-coverage.yml`)

Triggered on PRs to `master` (skipped for `[pipeline]` PRs):
- Creates a Devin session to add or improve unit test coverage

### The `[pipeline]` Convention

PRs created by automated pipelines use the `[pipeline]` prefix in their title. This prevents the documentation and test coverage workflows from triggering recursively on machine-generated PRs.

## Security

This repository uses automated security scanning. See [SECURITY.md](SECURITY.md) for details on:
- Reporting vulnerabilities
- The automated scanning process
- Dependency update policies

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License — see the [package.json](package.json) for details.
