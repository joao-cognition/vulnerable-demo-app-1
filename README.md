# Aikido Demo Repository

A polyglot demonstration application designed for security scanning and vulnerability detection workflows. The repository contains intentional vulnerabilities across multiple languages (JavaScript, Python, PHP, C#, Terraform) to showcase automated security tooling such as [Snyk](https://snyk.io/) and [Aikido Security](https://www.aikido.dev/).

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Security Scanning](#security-scanning)
- [Known Vulnerabilities](#known-vulnerabilities)
- [License](#license)

## Project Structure

```
├── src/
│   ├── components/        # Vue.js UI components
│   ├── infra/             # C# platform migration tasks
│   ├── python/            # Python database operations
│   ├── services/          # JS/TS services (Sentry, Pusher, polling)
│   └── index.php          # PHP filesystem utility
├── packages/app/          # Client-side application (Webpack + Vue)
├── config/                # Terraform infrastructure definitions
├── android/               # Android manifest
├── env/                   # Per-environment .env files
├── .github/workflows/     # CI pipelines (Snyk scan, Devin auto-fix)
├── Dockerfile             # Multi-stage Node.js container build
├── package.json           # Root dependencies and scripts
└── .env.example           # Environment variable template
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [Docker](https://www.docker.com/) (optional, for containerised builds)

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/joao-cognition/vulnerable-demo-app-1.git
   cd vulnerable-demo-app-1
   ```

2. **Copy the environment template:**

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

**Local development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

**Docker:**

```bash
docker build -t vulnerable-demo-app .
docker run -p 3000:3000 vulnerable-demo-app
```

The application listens on port **3000** by default.

## Environment Variables

| Variable          | Description                          | Example                                      |
|-------------------|--------------------------------------|----------------------------------------------|
| `NODE_ENV`        | Runtime environment                  | `development`, `production`                  |
| `SENTRY_DSN`      | Sentry error tracking DSN            | `https://key@org.ingest.sentry.io/project`   |
| `MASTER_PASSWORD` | Application master password          | *(set in `.env`)*                            |

See [`.env.example`](.env.example) for the full template. Per-environment overrides live in the `env/` directory.

## Security Scanning

This repository uses automated security scanning via **Snyk** integrated into the CI/CD pipeline.

### CI Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Snyk Security Scan** | Push/PR to `master`, manual | Scans dependencies for critical/high vulnerabilities and fails the build on critical findings |
| **Devin Auto-Fix** | Runs after Snyk scan fails | Automatically triggers Devin sessions to fix vulnerabilities, update docs, and add tests |

### Running Snyk Locally

```bash
npm install -g snyk
snyk auth
snyk test --severity-threshold=high
```

For more details on reporting vulnerabilities or the dependency update policy, see [SECURITY.md](SECURITY.md).

## Known Vulnerabilities

> **⚠️ This repository intentionally contains vulnerable dependencies for demonstration purposes. Do not use these dependency versions in production.**

The following high/critical vulnerabilities have been identified by Snyk:

| Severity | Vulnerability | Package | Fix Version |
|----------|--------------|---------|-------------|
| CRITICAL | Predictable Value Range from Previous Values | `form-data@2.3.3` | `2.5.4` |
| HIGH | Denial of Service (DoS) | `trim-newlines@1.0.0` | `3.0.1` |
| HIGH | Directory Traversal | `tar@2.2.2` | `7.5.8` |
| HIGH | ReDoS | `semver@5.6.0` | `5.7.2` |
| HIGH | Resource Exhaustion | `qs@6.9.4` | `6.14.1` |
| HIGH | Prototype Pollution | `open-graph@0.2.4` | `0.2.6` |
| HIGH | ReDoS | `nth-check@1.0.2` | `2.0.1` |
| HIGH | NULL Pointer Dereference | `node-sass@4.14.1` | latest |
| HIGH | Directory Traversal | `moment@2.24.0` | `2.29.2` |
| HIGH | ReDoS | `minimatch@3.0.4` | `3.1.3` |
| HIGH | Code Injection | `lodash@4.17.20` | `4.17.21` |
| HIGH | Prototype Pollution | `json-schema@0.2.3` | `0.4.0` |
| HIGH | ReDoS | `hawk@6.0.2` | `9.0.1` |
| HIGH | DoS | `decode-uri-component@0.2.0` | `0.2.2` |
| HIGH | Use of Weak Hash | `crypto-js@3.3.0` | `4.2.0` |
| HIGH | ReDoS | `cross-spawn@3.0.1` | `6.0.6` |
| HIGH | Prototype Pollution | `chart.js@2.7.2` | `2.9.4` |
| HIGH | Infinite loop | `brace-expansion@1.1.11` | `1.1.13` |
| HIGH | Amplification | `body-parser@1.18.2` | `1.20.3` |
| HIGH | ReDoS | `ansi-regex@3.0.0` | `3.0.1` |
| HIGH | ReDoS | `ajv@5.5.2` | `6.14.0` |

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
