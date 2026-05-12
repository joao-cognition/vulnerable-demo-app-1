# Aikido demo repository

Security scanning and vulnerability detection demo repository. Includes automated Snyk scanning and Devin auto-fix pipelines. When critical vulnerabilities are detected, Devin sessions are automatically created to fix them.

## Repository Structure

- **`packages/app/`** — Client-side JavaScript application with API logic
- **`src/python/`** — Python database interfaces and account management
- **`src/services/`** — TypeScript/JS network utilities and service health checks
- **`src/infra/`** — C# platform migration and infrastructure tasks
- **`src/components/`** — Vue.js UI components
- **`config/`** — Terraform infrastructure definitions (compute, database, load balancer)
- **`.github/workflows/`** — CI/CD pipelines for Snyk scans and Devin remediation

eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJibGliIjogImJsb2IifQ.dummy-signature-for-demonstration
