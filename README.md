# Vulnerable Demo App

Security scanning and vulnerability detection demo repository for the [Aikido](https://www.aikido.dev/) security platform. This project contains **intentional vulnerabilities** across multiple languages to showcase SAST, secret detection, dependency scanning, and infrastructure scanning capabilities.

An automated CI pipeline uses [Snyk](https://snyk.io/) to scan for vulnerabilities on every push and pull request. When critical issues are detected, a [Devin](https://devin.ai/) session is automatically created to remediate them.

> **⚠️ Warning:** This repository is for demonstration purposes only. It contains hardcoded credentials, SQL injection vulnerabilities, and outdated dependencies by design. **Do not deploy this application in any production environment.**

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [CI/CD Pipelines](#cicd-pipelines)
- [Security Scanning](#security-scanning)
- [License](#license)

## Project Structure

```
├── .github/workflows/       # CI/CD pipeline definitions
│   ├── snyk-security-scan.yml   # Snyk vulnerability scanning + Devin auto-fix
│   ├── devin-documentation.yml  # Automated documentation updates
│   └── devin-test-coverage.yml  # Automated test coverage
├── src/
│   ├── services/            # JavaScript/TypeScript services (Sentry, Pusher, polling)
│   ├── python/              # Python database operations (psycopg2)
│   ├── infra/               # C# platform migration tasks
│   ├── components/          # Vue.js components
│   └── index.php            # PHP utility functions
├── packages/app/            # Client-side application (API calls, JWT handling)
├── config/                  # Terraform infrastructure definitions (AWS EC2, IAM)
├── env/                     # Environment-specific configuration files
├── android/                 # Android manifest
├── Dockerfile               # Multi-stage Node.js container build
├── package.json             # Root Node.js dependencies
└── .env.example             # Environment variable template
```

## Technologies

| Language / Tool | Usage |
|----------------|-------|
| **Node.js 18** | Primary runtime (Express server) |
| **JavaScript** | Services (Sentry, Pusher), client-side app |
| **TypeScript** | Endpoint polling utilities |
| **Python** | Database operations (psycopg2, PostgreSQL) |
| **PHP** | Filesystem utility functions |
| **C# (.NET)** | Platform migration and deployment tasks |
| **Vue.js 2** | Frontend components |
| **Terraform** | AWS infrastructure definitions |
| **Docker** | Containerized deployment |

## Setup and Installation

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

The application listens on port **3000** by default.

### Docker

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `SENTRY_DSN` | Sentry error tracking DSN | — |
| `MASTER_PASSWORD` | Demo master password | — |
| `PGHOST` | PostgreSQL host (Python services) | `localhost` |
| `PGDATABASE` | PostgreSQL database name | `testdb` |
| `PGUSER` | PostgreSQL username | `testuser` |
| `PGPASSWORD` | PostgreSQL password | `testpass` |

See [`.env.example`](.env.example) for the template.

## CI/CD Pipelines

The repository uses three independent GitHub Actions workflows:

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

- **Triggers:** Push to `master`, PRs targeting `master`, manual dispatch
- **Steps:** Installs dependencies → runs `snyk test` → reports vulnerability counts
- **Failure behavior:** If critical vulnerabilities are found, the pipeline fails and a Devin remediation session is automatically created to fix them
- **Loop prevention:** PRs with `[pipeline]` in the title skip the Devin remediation step

### 2. Documentation Update (`devin-documentation.yml`)

- **Triggers:** PRs targeting `master`, manual dispatch
- **Purpose:** Triggers a Devin session to review and update repository documentation
- **Loop prevention:** Skipped for PRs with `[pipeline]` in the title

### 3. Test Coverage (`devin-test-coverage.yml`)

- **Triggers:** PRs targeting `master`, manual dispatch
- **Purpose:** Triggers a Devin session to add or improve test coverage
- **Loop prevention:** Skipped for PRs with `[pipeline]` in the title

### Required Secrets

| Secret | Used By |
|--------|---------|
| `SNYK_TOKEN` | Snyk security scanning |
| `DEVIN_API_TOKEN` | Creating Devin remediation/documentation/test sessions |

## Security Scanning

This repository uses **Snyk** for automated security scanning. See [SECURITY.md](SECURITY.md) for full details on:

- How to report vulnerabilities
- The automated scanning and remediation process
- Dependency update policy

## License

MIT
