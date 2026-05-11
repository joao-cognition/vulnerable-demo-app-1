# Vulnerable Demo App

A demonstration repository for security scanning and vulnerability detection. This project contains **intentional vulnerabilities** across multiple languages and frameworks, used to showcase automated security tools such as [Snyk](https://snyk.io/) and [Aikido Security](https://www.aikido.dev/).

When critical vulnerabilities are detected by the Snyk CI pipeline, a [Devin](https://devin.ai/) session is automatically created to remediate them.

## Project Structure

```
├── src/
│   ├── python/          # Python database operations (psycopg2)
│   ├── services/        # JavaScript/TypeScript services (Sentry, Pusher, polling)
│   ├── infra/           # C# deployment/migration task
│   ├── components/      # Vue.js UI components
│   └── index.php        # PHP utility functions
├── packages/app/        # Client-side application (Webpack, Vue)
├── config/              # Terraform IaC for AWS (EC2, RDS, ALB, Route 53)
├── android/             # Android manifest
├── .github/workflows/   # CI/CD pipelines
├── .env.example         # Environment variable template
└── Dockerfile           # Multi-stage Node.js container build
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
cd vulnerable-demo-app-1
npm install
```

### Running the Application

```bash
# Development (with hot-reload via nodemon)
npm run dev

# Production
npm start
```

The application starts an Express server on port **3000**.

### Docker

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable          | Description                          | Default                                      |
| ----------------- | ------------------------------------ | -------------------------------------------- |
| `NODE_ENV`        | Runtime environment                  | `development`                                |
| `SENTRY_DSN`      | Sentry error-tracking DSN            | —                                            |
| `MASTER_PASSWORD` | Demo-only master password            | —                                            |
| `PGHOST`          | PostgreSQL host                      | `localhost`                                   |
| `PGDATABASE`      | PostgreSQL database name             | `testdb`                                      |
| `PGUSER`          | PostgreSQL user                      | `testuser`                                    |
| `PGPASSWORD`      | PostgreSQL password                  | `testpass`                                    |

## CI/CD Pipelines

The repository uses three independent GitHub Actions workflows:

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

Runs on every push and PR to `master`.

- Installs dependencies and runs `snyk test` with a **high** severity threshold.
- Fails the pipeline if **critical** vulnerabilities are found.
- Uploads scan results as a build artifact (retained 30 days).
- On failure, triggers a **Devin remediation session** that automatically creates a PR to upgrade vulnerable packages.
- PRs created by Devin use a `[pipeline]` title prefix to prevent recursive pipeline triggers.

### 2. Documentation Update (`devin-documentation.yml`)

Runs on PRs to `master` (skipped for `[pipeline]` PRs) and manual dispatch.

- Triggers a Devin session to review and update repository documentation.

### 3. Test Coverage (`devin-test-coverage.yml`)

Runs on PRs to `master` (skipped for `[pipeline]` PRs) and manual dispatch.

- Triggers a Devin session to add or improve unit test coverage.

## Infrastructure

Terraform configurations in `config/` define demo AWS resources:

- **EC2** instance with an IAM role and instance profile
- **RDS** PostgreSQL 13.4 database
- **ALB** with HTTPS listener
- **Route 53** public hosted zone

> **Note:** These configurations use placeholder values and are for demonstration purposes only.

## Security

This repository intentionally contains vulnerabilities for security tool demonstrations. See [SECURITY.md](SECURITY.md) for details on how vulnerabilities are handled and how to report issues.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT
