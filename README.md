# Vulnerable Demo App

A demonstration repository for automated security scanning and AI-driven vulnerability remediation. This project showcases a complete **Scan-to-Fix** pipeline using [Snyk](https://snyk.io/) for vulnerability detection and [Devin AI](https://devin.ai/) for autonomous remediation.

## Purpose

This repository intentionally includes outdated dependencies with known vulnerabilities across multiple languages (JavaScript, Python, PHP, C#). It serves as a testbed for:

- **Automated vulnerability scanning** via Snyk in CI
- **AI-driven auto-remediation** triggered when critical vulnerabilities are detected
- **Pipeline loop prevention** using the `[pipeline]` PR title convention

> **Note:** This is a demo/test repository. The included code and credentials are for demonstration purposes only and are not used in any production system.

## Repository Structure

```
.
├── .github/workflows/
│   ├── snyk-security-scan.yml      # Snyk scan + Devin auto-fix pipeline
│   ├── devin-documentation.yml     # Automated documentation updates
│   └── devin-test-coverage.yml     # Automated test coverage improvements
├── packages/app/                   # Client-side JavaScript application
│   └── src/
│       ├── api.js                  # API call utilities
│       └── index.js                # Application entry point
├── src/
│   ├── components/RichText.vue     # Vue.js component
│   ├── infra/MigratePlatfromTask.cs # C# infrastructure migration
│   ├── python/
│   │   ├── accounts.py             # Python database operations (PostgreSQL)
│   │   └── requirements.txt        # Python dependencies
│   ├── services/
│   │   ├── pusher.js               # Pusher WebSocket client
│   │   ├── sentry.js               # Sentry error tracking + permission logic
│   │   └── wait.ts                 # Endpoint polling utility (TypeScript)
│   └── index.php                   # PHP file size utility
├── android/                        # Android manifest
├── config/                         # Terraform infrastructure configs
├── env/                            # Environment-specific configs
├── Dockerfile                      # Multi-stage Node.js container build
├── package.json                    # Node.js dependencies and scripts
└── .env.example                    # Example environment variables
```

## Technologies

| Language / Framework | Usage |
|----------------------|-------|
| JavaScript (Node.js / Express) | Primary application runtime |
| TypeScript | Service utilities (`wait.ts`) |
| Python | Database operations (`psycopg2`) |
| PHP | File system utilities |
| C# | Infrastructure migration tasks |
| Vue.js | Frontend component |
| Terraform | Infrastructure-as-code configs |
| Docker | Containerized deployment |

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) 9+
- (Optional) [Python 3.8+](https://www.python.org/) for running Python modules
- (Optional) [Docker](https://www.docker.com/) for containerized deployment

### Quick Start

```bash
# Clone the repository
git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
cd vulnerable-demo-app-1

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the application
npm start
```

### Docker

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

### Python Module

```bash
cd src/python
pip install -r requirements.txt
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `SENTRY_DSN` | Sentry error tracking DSN | _(see `.env.example`)_ |
| `PGHOST` | PostgreSQL host | `localhost` |
| `PGDATABASE` | PostgreSQL database name | `testdb` |
| `PGUSER` | PostgreSQL user | `testuser` |
| `PGPASSWORD` | PostgreSQL password | `testpass` |

See [`.env.example`](.env.example) for a full template.

## CI/CD Pipelines

This repository uses three independent GitHub Actions workflows:

### 1. Snyk Security Scan (`snyk-security-scan.yml`)

| Trigger | Branches |
|---------|----------|
| `push`, `pull_request`, `workflow_dispatch` | `master` |

- Runs `snyk test` with a high-severity threshold
- Reports critical and high vulnerability counts in the GitHub Step Summary
- **Fails the pipeline** if critical vulnerabilities are found
- On failure, triggers the **Devin Remediation** job (unless the PR title contains `[pipeline]`)

The Devin Remediation job:
1. Re-scans for critical/high vulnerabilities
2. Constructs a structured fix prompt with package details
3. Creates a Devin AI session via the API to autonomously fix the vulnerabilities
4. The resulting PR uses the `[pipeline]` title prefix to prevent recursive pipeline triggers

### 2. Documentation Update (`devin-documentation.yml`)

| Trigger | Branches |
|---------|----------|
| `pull_request`, `workflow_dispatch` | `master` |

- Creates a Devin AI session to review and update documentation
- Skipped on PRs with `[pipeline]` in the title to prevent loops

### 3. Test Coverage (`devin-test-coverage.yml`)

| Trigger | Branches |
|---------|----------|
| `pull_request`, `workflow_dispatch` | `master` |

- Creates a Devin AI session to add unit test coverage
- Skipped on PRs with `[pipeline]` in the title to prevent loops

### Pipeline Loop Prevention

All three pipelines use the `[pipeline]` PR title convention to prevent infinite CI loops. When Devin creates a PR as part of an automated pipeline:

- The PR title **must** start with `[pipeline]`
- Pipelines that trigger Devin sessions check for this prefix and skip execution
- This ensures automated fixes don't trigger additional automated sessions

## Security

This repository includes automated security scanning. See [SECURITY.md](SECURITY.md) for details on:
- Reporting vulnerabilities
- The automated Snyk scanning process
- Dependency update policy

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License.
