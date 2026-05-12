# Vulnerable Demo App

A demonstration repository for **automated security scanning and AI-driven vulnerability remediation**. This project showcases how [Snyk](https://snyk.io/) detects dependency vulnerabilities and how [Devin AI](https://devin.ai/) automatically creates pull requests to fix them.

> **Note:** This repository intentionally includes outdated and vulnerable dependencies for demonstration purposes.

## Table of Contents

- [Purpose](#purpose)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [CI/CD Pipelines](#cicd-pipelines)
- [Security Scanning](#security-scanning)
- [Docker](#docker)
- [License](#license)

## Purpose

This repository serves as a live demonstration of a **DevSecOps pipeline** that:

1. **Detects** critical and high-severity vulnerabilities using Snyk on every push and pull request to `master`.
2. **Remediates** vulnerabilities automatically by triggering a Devin AI session that creates a fix PR.
3. **Documents** the codebase automatically via a Devin-powered documentation pipeline.
4. **Tests** the codebase by triggering a Devin-powered test coverage pipeline.

All three CI pipelines use the `[pipeline]` PR title prefix to prevent recursive pipeline triggers.

## Project Structure

```
├── .github/workflows/
│   ├── snyk-security-scan.yml    # Snyk scan + Devin auto-fix
│   ├── devin-documentation.yml   # Devin documentation updates
│   └── devin-test-coverage.yml   # Devin test coverage generation
├── packages/app/                 # Client-side JavaScript application
│   └── src/
│       ├── api.js                # API call utilities
│       └── index.js              # App entry point
├── src/
│   ├── index.php                  # PHP file metadata utility
│   ├── components/
│   │   └── RichText.vue          # Vue rich text component
│   ├── infra/
│   │   └── MigratePlatfromTask.cs # C# platform migration task
│   ├── python/
│   │   ├── accounts.py           # Python database operations (PostgreSQL)
│   │   └── requirements.txt      # Python dependencies
│   └── services/
│       ├── pusher.js             # Pusher real-time service
│       ├── sentry.js             # Sentry error tracking
│       └── wait.ts               # Endpoint polling utility
├── config/                       # Terraform infrastructure configs
├── android/                      # Android manifest
├── env/                          # Environment configs (staging/production)
├── Dockerfile                    # Multi-stage Node.js container
├── package.json                  # Root Node.js dependencies
└── .env.example                  # Example environment variables
```

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js 18, Express 4.x |
| **Frontend** | Vue 2.x, Bulma CSS |
| **Other Languages** | Python 3 (PostgreSQL ops), PHP (file utils), C# (infra migration) |
| **Database** | PostgreSQL (via psycopg2) |
| **Infrastructure** | Terraform (AWS), Docker |
| **Mobile** | Android (demo manifest) |
| **CI/CD** | GitHub Actions |
| **Security** | Snyk, Devin AI auto-remediation |
| **Monitoring** | Sentry |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [npm](https://www.npmjs.com/)
- [Python 3.x](https://www.python.org/) (for Python modules)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies (optional):
   ```bash
   pip install -r src/python/requirements.txt
   ```

4. Create your environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start the application:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

The application starts on port **3000** by default.

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `SENTRY_DSN` | Sentry Data Source Name for error tracking | — |
| `PGHOST` | PostgreSQL host | `localhost` |
| `PGDATABASE` | PostgreSQL database name | `testdb` |
| `PGUSER` | PostgreSQL user | `testuser` |
| `PGPASSWORD` | PostgreSQL password | `testpass` |
| `MASTER_PASSWORD` | Application master password | — |

### CI/CD Secrets (GitHub Actions)

| Secret | Description |
|--------|-------------|
| `SNYK_TOKEN` | Snyk API token for vulnerability scanning |
| `DEVIN_API_TOKEN` | Devin AI API token for automated remediation |

## CI/CD Pipelines

This repository uses three independent GitHub Actions workflows:

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

- **Triggers:** Push to `master`, PRs targeting `master`, manual dispatch
- **What it does:**
  - Runs `snyk test` with `--severity-threshold=high`
  - Reports vulnerability counts (critical, high, total) in the job summary
  - **Fails the pipeline** if critical vulnerabilities are found
  - On failure, triggers a **Devin AI remediation session** that automatically creates a fix PR
- **Loop prevention:** Devin fix PRs use the `[pipeline]` title prefix and are skipped by the remediation trigger

### 2. Documentation Update (`devin-documentation.yml`)

- **Triggers:** PRs targeting `master` (excluding `[pipeline]` PRs), manual dispatch
- **What it does:** Triggers a Devin AI session to review and update repository documentation

### 3. Test Coverage (`devin-test-coverage.yml`)

- **Triggers:** PRs targeting `master` (excluding `[pipeline]` PRs), manual dispatch
- **What it does:** Triggers a Devin AI session to add or improve unit test coverage

## Security Scanning

Security scanning is fully automated via the Snyk CI pipeline:

- **Scan frequency:** Every push and PR to `master`
- **Severity threshold:** High and critical vulnerabilities are reported
- **Auto-remediation:** When critical vulnerabilities are detected, a Devin AI session is automatically created to fix them
- **Results:** Scan results are uploaded as CI artifacts (`snyk-results.json`) and summarized in the GitHub Actions job summary

For more details, see [SECURITY.md](SECURITY.md).

## Docker

Build and run the application in a container:

```bash
# Build the image
docker build -t vulnerable-demo-app .

# Run the container
docker run -p 3000:3000 vulnerable-demo-app
```

## License

This project is licensed under the MIT License. See [package.json](package.json) for details.
