# Aikido demo repository

Security scanning and vulnerability detection demo repository. Includes automated Snyk scanning and Devin auto-fix pipelines. When critical vulnerabilities are detected, Devin sessions are automatically created to fix them.

## How It Works

The repository contains intentionally vulnerable code samples across multiple languages (JavaScript, TypeScript, Python, PHP, and C#) to demonstrate end-to-end security automation. GitHub Actions workflows run Snyk scans on every push and pull request. When critical or high-severity vulnerabilities are detected, the pipeline automatically triggers a Devin AI session with a tailored fix prompt, creating a pull request with the remediation. PR titles are prefixed with `[pipeline]` to prevent recursive CI loops, ensuring a clean scan-to-fix lifecycle.

eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJibGliIjogImJsb2IifQ.dummy-signature-for-demonstration
