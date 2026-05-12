# Vulnerable Demo App

A demonstration repository for automated security scanning and AI-driven vulnerability remediation. This project showcases end-to-end DevSecOps pipelines using **Snyk** for vulnerability detection and **Devin AI** for automated fixes.

## Purpose

This repository intentionally contains known vulnerabilities and security anti-patterns across multiple languages to demonstrate:

- Automated dependency vulnerability scanning via Snyk
- AI-driven remediation through Devin sessions triggered by CI failures
- Automated documentation and test coverage generation via Devin pipelines

> **Warning**: This is a **demonstration repository**. The code contains intentional vulnerabilities and hardcoded credentials for demo purposes. Do not use any of this code in production.

## Repository Structure

```
.
├── .github/workflows/       # CI/CD pipelines (Snyk scan, Devin remediation)
├── packages/app/            # Client-side JavaScript application
│   └── src/                 # API call examples and app entry point
├── src/
│   ├── components/          # Vue.js components (RichText.vue)
│   ├── infra/               # C# platform migration tasks
│   ├── python/              # Python database operations (PostgreSQL)
│   ├── services/            # JS/TS services (Pusher, Sentry, HTTP utilities)
│   └── index.php            # PHP file utilities
├── config/                  # Terraform infrastructure configuration
├── android/                 # Android manifest
├── Dockerfile               # Multi-stage Node.js container build
├── package.json             # Root Node.js dependencies
└── .env.example             # Environment variable template
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized runs)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure:

   ```bash
   cp .env.example .env
   ```

4. Start the application:

   ```bash
   npm start
   ```

### Docker

Build and run with Docker:

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

## Environment Variables

| Variable          | Description                          | Default                                      |
|-------------------|--------------------------------------|----------------------------------------------|
| `NODE_ENV`        | Application environment              | `development`                                |
| `SENTRY_DSN`      | Sentry error tracking DSN            | —                                            |
| `MASTER_PASSWORD` | Demo master password                 | —                                            |
| `PGHOST`          | PostgreSQL host (Python module)      | `localhost`                                   |
| `PGDATABASE`      | PostgreSQL database name             | `testdb`                                      |
| `PGUSER`          | PostgreSQL username                  | `testuser`                                    |
| `PGPASSWORD`      | PostgreSQL password                  | `testpass`                                    |

See [`.env.example`](.env.example) for a template.

## CI/CD Pipelines

This repository uses three GitHub Actions workflows:

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

- **Triggers**: Push to `master`, PRs targeting `master`, manual dispatch
- **What it does**:
  - Runs `snyk test` against project dependencies
  - Reports critical, high, and total vulnerability counts
  - **Fails the pipeline** if critical vulnerabilities are found
  - Uploads scan results as build artifacts (retained 30 days)
- **Auto-remediation**: When the scan fails and the PR title does **not** contain `[pipeline]`, a Devin AI session is automatically created to fix the vulnerabilities

### 2. Documentation Update (`devin-documentation.yml`)

- **Triggers**: PRs targeting `master` (skipped for `[pipeline]` PRs), manual dispatch
- **What it does**: Creates a Devin AI session to review and update repository documentation

### 3. Test Coverage (`devin-test-coverage.yml`)

- **Triggers**: PRs targeting `master` (skipped for `[pipeline]` PRs), manual dispatch
- **What it does**: Creates a Devin AI session to add unit test coverage for core services

> **Note**: PRs with `[pipeline]` in the title skip the Documentation Update and Test Coverage workflows to prevent recursive CI loops.

## Security

This project uses automated security scanning. See [SECURITY.md](SECURITY.md) for details on:

- Reporting vulnerabilities
- The automated Snyk scanning process
- Dependency update policies

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License — see the [`package.json`](package.json) for details.
