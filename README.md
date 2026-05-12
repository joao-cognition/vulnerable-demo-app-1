# Aikido demo repository

Security scanning and vulnerability detection demo repository. Includes automated Snyk scanning and Devin auto-fix pipelines. When critical vulnerabilities are detected, Devin sessions are automatically created to fix them.

## Repository Structure

This repository contains a multi-language codebase spanning JavaScript/TypeScript, Python, PHP, and C# to demonstrate security scanning across diverse technology stacks. The `packages/app/` directory holds the client-side JavaScript application, while `src/` contains backend services organized by language — Python database interfaces in `src/python/`, C# infrastructure migration tasks in `src/infra/`, TypeScript network utilities in `src/services/`, and PHP file-handling logic in `src/index.php`. GitHub Actions workflows under `.github/workflows/` automate the end-to-end security pipeline: Snyk scans dependencies for known CVEs, and when critical vulnerabilities are found, a Devin AI session is triggered with a structured fix prompt to remediate them autonomously via pull request.

eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJibGliIjogImJsb2IifQ.dummy-signature-for-demonstration
