# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email **joao.esteves@cognition.ai** with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - The potential impact
3. You will receive an acknowledgment within **48 hours**
4. A fix or mitigation plan will be communicated within **7 business days**

## Automated Security Scanning

This repository uses **Snyk** for continuous vulnerability detection through a GitHub Actions pipeline.

### How It Works

1. **On every push to `master`** and **on every PR targeting `master`**, the `Snyk Security Scan` workflow runs automatically
2. Snyk scans all project dependencies (Node.js, Python) for known vulnerabilities
3. Results are categorized by severity: **Critical**, **High**, **Medium**, **Low**
4. The pipeline **fails** if any **critical** vulnerabilities are detected
5. Scan results are uploaded as build artifacts and retained for 30 days

### Automated Remediation

When the Snyk scan detects critical or high vulnerabilities:

- A **Devin AI** session is automatically triggered to fix the vulnerable dependencies
- Devin creates a PR with the title prefixed by `[pipeline]` containing the patched versions
- The fix PR includes a description listing each vulnerability with before/after versions

This automated remediation is **skipped** for PRs whose titles already contain `[pipeline]` to prevent recursive CI loops.

### Required Secrets

The following GitHub repository secrets are required for the security pipeline:

| Secret              | Purpose                                      |
|---------------------|----------------------------------------------|
| `SNYK_TOKEN`        | Authentication token for the Snyk CLI        |
| `DEVIN_API_TOKEN`   | API token for triggering Devin AI sessions   |

## Dependency Update Policy

- **Critical vulnerabilities**: Addressed immediately via automated Devin remediation or manual hotfix
- **High vulnerabilities**: Addressed within the current sprint (1–2 weeks)
- **Medium/Low vulnerabilities**: Reviewed and prioritized during regular maintenance cycles
- Dependencies are reviewed periodically and updated to their latest stable versions when feasible

## Supported Versions

This is a demonstration repository. Only the latest version on the `master` branch is actively maintained.

| Version | Supported |
|---------|-----------|
| `master` (latest) | Yes |
| Older commits      | No  |

## Scope

> **Important**: This repository is designed for **demonstration purposes only**. It intentionally contains vulnerabilities, hardcoded credentials, and insecure patterns to showcase security scanning and automated remediation workflows. These are not real credentials and should not be treated as security incidents.
