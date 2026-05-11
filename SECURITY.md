# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainers at **joao.esteves@cognition.ai** with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - The affected component(s) and version(s)
   - Any potential impact assessment
3. You will receive an acknowledgement within **48 hours**.
4. A fix or mitigation plan will be communicated within **7 business days**.

## Scope

> **Note:** This repository is a **demonstration project** that intentionally contains vulnerable dependencies and code patterns to showcase security scanning tools. The vulnerabilities listed below are expected and exist by design.

Security reports are welcome for:

- Vulnerabilities in the CI/CD pipeline configuration
- Credential leaks beyond the intentional demonstration tokens
- Issues in the automated remediation workflows

## Automated Security Scanning

This project uses [Snyk](https://snyk.io/) for continuous vulnerability monitoring through GitHub Actions.

### Snyk Security Scan

- **Trigger:** Every push and pull request to `master`, or on-demand via `workflow_dispatch`.
- **Scope:** Scans all npm dependencies (root `package.json` and `packages/app/package.json`).
- **Threshold:** The pipeline **fails** when critical-severity vulnerabilities are detected.
- **Artifacts:** Raw scan results are uploaded as GitHub Actions artifacts (`snyk-results.json`) and retained for 30 days.

### Devin Auto-Fix Pipeline

When the Snyk scan fails, a secondary workflow automatically triggers [Devin](https://devin.ai/) sessions to:

1. **Fix vulnerabilities** — upgrade affected packages to their patched versions.
2. **Update documentation** — refresh README, SECURITY, and CONTRIBUTING files.
3. **Add test coverage** — generate unit tests for untested modules.

Each session creates a pull request for human review before merging.

### Running Scans Locally

```bash
# Install the Snyk CLI
npm install -g snyk

# Authenticate with your Snyk account
snyk auth

# Run an open-source dependency scan
snyk test --severity-threshold=high

# Monitor the project (creates a snapshot in the Snyk dashboard)
snyk monitor
```

## Dependency Update Policy

| Priority | Response Time | Action |
|----------|--------------|--------|
| **Critical** | Within 24 hours | Immediate patch via automated PR or manual intervention |
| **High** | Within 7 days | Upgrade to the recommended fix version |
| **Medium / Low** | Next scheduled maintenance | Bundle with routine dependency updates |

### Process

1. Snyk scans run on every push and PR to `master`.
2. Critical vulnerabilities trigger the Devin Auto-Fix pipeline, which opens PRs automatically.
3. All dependency update PRs require human review and approval before merging.
4. After merging, a follow-up Snyk scan verifies the fix.

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` / `master` branch | Yes |
| Feature branches | Best-effort |
| Archived tags | No |
