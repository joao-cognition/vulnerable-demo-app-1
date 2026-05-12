# Security Policy

## Important Notice

This repository **intentionally** contains vulnerable dependencies and insecure code patterns for demonstration purposes. It is designed to showcase automated security scanning and AI-driven remediation workflows. **Do not use any code from this repository in production.**

## Reporting a Vulnerability

If you discover a security vulnerability in the tooling or CI pipeline configuration (not the intentionally vulnerable demo code), please report it by:

1. **Email:** Open an issue or contact the repository maintainers directly
2. **GitHub Issues:** For non-sensitive findings, open a [GitHub Issue](https://github.com/joao-cognition/vulnerable-demo-app-1/issues)

Please include:
- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fixes

We aim to acknowledge reports within **48 hours** and provide a resolution timeline within **5 business days**.

## Automated Security Scanning

### Snyk Integration

This repository uses [Snyk](https://snyk.io/) for automated dependency vulnerability scanning. The scanning pipeline is defined in [`.github/workflows/snyk-security-scan.yml`](.github/workflows/snyk-security-scan.yml).

#### How It Works

1. **Trigger:** Scans run automatically on every push and pull request to the `master` branch
2. **Scan:** Snyk analyzes all project dependencies (`package.json`, `requirements.txt`) for known CVEs
3. **Reporting:** Results are summarized in the GitHub Actions job summary with counts by severity (critical, high, total)
4. **Enforcement:** The pipeline **fails** if any critical vulnerabilities are detected
5. **Auto-Remediation:** On failure, a [Devin AI](https://devin.ai/) session is automatically created to fix the identified vulnerabilities

#### Scan Artifacts

Snyk scan results are uploaded as GitHub Actions artifacts (`snyk-results.json`) and retained for 30 days.

### AI-Driven Remediation

When the Snyk scan detects critical or high-severity vulnerabilities:

1. The pipeline extracts affected package names, versions, and fix recommendations
2. A Devin AI session is triggered with a structured prompt containing the vulnerability details
3. Devin creates a PR with the necessary dependency upgrades
4. The PR title includes the `[pipeline]` prefix to prevent recursive CI triggers

This remediation step is **skipped** for PRs that already have `[pipeline]` in their title.

## Dependency Update Policy

### Automated Updates

- **Critical vulnerabilities:** Automatically triaged and fixed via the Snyk + Devin pipeline
- **High vulnerabilities:** Included in automated remediation alongside critical issues
- **Medium/Low vulnerabilities:** Reviewed periodically and addressed in scheduled maintenance

### Manual Review

All automated dependency update PRs should be reviewed by a maintainer before merging to verify:

- The updated packages do not introduce breaking changes
- The application still builds and runs correctly
- Test suites pass with the updated dependencies

## Supported Versions

This is a demo repository and does not follow a formal versioning or support policy. The `master` branch represents the current state of the demo.

## Security-Related Configuration

| Item | Location | Purpose |
|------|----------|---------|
| Snyk Token | GitHub Secrets (`SNYK_TOKEN`) | Authenticates Snyk CLI for scanning |
| Devin API Token | GitHub Secrets (`DEVIN_API_TOKEN`) | Triggers Devin remediation sessions |
| Sentry DSN | `.env` / GitHub Secrets | Error tracking (not a security credential) |
| Environment variables | `.env.example` | Template for local development |
