# Vulnerable Demo App

A demonstration repository for **automated security scanning and AI-driven remediation**. This project contains intentional vulnerabilities across multiple languages and frameworks (JavaScript, TypeScript, Python, PHP, C#, Terraform, Android) to showcase tools such as [Snyk](https://snyk.io/) and [Aikido Security](https://www.aikido.dev/).

When the Snyk CI pipeline detects critical vulnerabilities, a [Devin AI](https://devin.ai/) session is automatically created to remediate them, producing a fix PR without human intervention.

## Technology Stack

| Layer           | Technologies                                                  |
| --------------- | ------------------------------------------------------------- |
| Backend         | Node.js 18, Express 4                                         |
| Frontend        | Vue 2, Bulma CSS, Chart.js                                    |
| Database        | PostgreSQL (via psycopg2 in Python)                           |
| Infrastructure  | Terraform (AWS EC2, RDS, ALB, Route 53)                       |
| Monitoring      | Sentry (error tracking), Pusher (real-time events)            |
| Security Scans  | Snyk (dependency vulnerabilities), Aikido Security            |
| CI/CD           | GitHub Actions with Devin AI auto-remediation                 |
| Containerisation| Docker (multi-stage Node.js build)                            |

## Project Structure

```
.
├── .github/workflows/       # CI/CD pipelines (Snyk scan, Devin docs, Devin tests)
├── android/                 # Android manifest (demo misconfiguration)
├── config/                  # Terraform IaC for AWS (EC2, RDS, ALB, Route 53)
├── env/                     # Environment-specific configuration (placeholder)
├── packages/
│   └── app/                 # Client-side application (Webpack, Vue, node-fetch)
│       └── src/
│           ├── api.js       # API call logic with demo JWT token
│           └── index.js     # Application entry point
├── src/
│   ├── components/          # Vue.js UI components (RichText)
│   ├── infra/               # C# deployment/migration task (MigratePlatformTask)
│   ├── python/              # Python database operations (psycopg2)
│   │   ├── accounts.py      # Account query functions
│   │   └── requirements.txt # Python dependencies
│   ├── services/            # JavaScript/TypeScript services
│   │   ├── pusher.js        # Pusher real-time event client
│   │   ├── sentry.js        # Sentry init + permission validation logic
│   │   └── wait.ts          # Endpoint polling utility (waitFor200)
│   └── index.php            # PHP file-size utility functions
├── .env.example             # Environment variable template
├── Dockerfile               # Multi-stage Node.js container build
├── package.json             # Root dependencies and npm scripts
├── CONTRIBUTING.md          # Contribution guidelines
└── SECURITY.md              # Security policy and vulnerability disclosure
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm
- (Optional) [Python 3](https://www.python.org/) for the `src/python/` module
- (Optional) [Docker](https://www.docker.com/) for containerised runs

### Installation

```bash
git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
cd vulnerable-demo-app-1
npm install
```

To install Python dependencies (for `src/python/accounts.py`):

```bash
pip install -r src/python/requirements.txt
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

| Variable          | Description                          | Default         |
| ----------------- | ------------------------------------ | --------------- |
| `NODE_ENV`        | Runtime environment                  | `development`   |
| `SENTRY_DSN`      | Sentry error-tracking DSN            | -               |
| `MASTER_PASSWORD` | Demo-only master password            | -               |
| `PGHOST`          | PostgreSQL host (Python module)      | `localhost`     |
| `PGDATABASE`      | PostgreSQL database name             | `testdb`        |
| `PGUSER`          | PostgreSQL user                      | `testuser`      |
| `PGPASSWORD`      | PostgreSQL password                  | `testpass`      |

## CI/CD Pipelines

The repository uses three independent GitHub Actions workflows. All workflows use the `[pipeline]` PR title prefix to prevent recursive triggers.

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

Runs on every push and PR to `master`.

- Installs dependencies and runs `snyk test` with a **high** severity threshold.
- Fails the pipeline if **critical** vulnerabilities are found.
- Uploads scan results as a build artifact (retained 30 days).
- On failure, triggers a **Devin remediation session** that automatically creates a PR to upgrade vulnerable packages.
- PRs created by Devin use a `[pipeline]` title prefix to prevent recursive pipeline triggers.

### 2. Documentation Update (`devin-documentation.yml`)

Runs on PRs to `master` (skipped for `[pipeline]` PRs) and manual dispatch.

- Triggers a Devin session to review and update repository documentation (README, SECURITY.md, CONTRIBUTING.md).

### 3. Test Coverage (`devin-test-coverage.yml`)

Runs on PRs to `master` (skipped for `[pipeline]` PRs) and manual dispatch.

- Triggers a Devin session to add or improve unit test coverage (target: 80%).
- Jest is included as a dev dependency.

## Infrastructure

Terraform configurations in `config/` define demo AWS resources:

| Resource    | File               | Description                                     |
| ----------- | ------------------ | ----------------------------------------------- |
| EC2         | `compute.tf`       | t3.micro instance with IAM role and profile     |
| RDS         | `database.tf`      | PostgreSQL 13.4 with unencrypted storage (demo) |
| ALB         | `load_balancer.tf`  | Application Load Balancer with HTTPS listener   |
| Route 53    | `data.tf`          | Public hosted zone with A record                |

> **Note:** These configurations use placeholder values and are for demonstration purposes only. They intentionally include security misconfigurations (e.g., unencrypted storage, no backup retention) as part of the vulnerability demo.

## Security

This repository intentionally contains vulnerabilities for security tool demonstrations. See [SECURITY.md](SECURITY.md) for the full security policy, the list of known intentional vulnerabilities, and how to report issues.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit conventions, PR process, and development guidelines.

## License

MIT
