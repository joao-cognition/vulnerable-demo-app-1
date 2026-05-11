# Security Policy

## Purpose

This repository is a **security demonstration project** containing intentional vulnerabilities for showcasing scanning tools such as [Aikido](https://www.aikido.dev/) and [Snyk](https://snyk.io/). It is not intended for production use.

## Reporting a Vulnerability

If you discover a security issue that is **not** one of the intentional demonstration vulnerabilities, please report it responsibly:

1. **Do not** open a public GitHub issue.
2. Email the maintainers at **joao.esteves@cognition.ai** with:
   - A description of the vulnerability
   - Steps to reproduce
   - Any potential impact
3. You should receive an acknowledgement within **48 hours**.
4. A fix or mitigation plan will be communicated within **7 business days**.

## Automated Snyk Scanning

This repository has an automated security scanning pipeline powered by **Snyk**:

| Aspect | Details |
|--------|---------|
| **Tool** | [Snyk Open Source](https://snyk.io/) |
| **Trigger** | Every push to `master`, every PR targeting `master`, and manual dispatch |
| **Threshold** | Pipeline fails on **critical** severity vulnerabilities |
| **Reporting** | Results are uploaded as build artifacts (`snyk-results.json`) and summarised in the GitHub Actions step summary |
| **Auto-remediation** | When critical/high vulnerabilities are found, a [Devin](https://devin.ai/) session is automatically created to update the affected packages |

### How It Works

1. The `snyk-security-scan.yml` workflow runs `snyk test --severity-threshold=high`.
2. Vulnerability counts (critical, high, total) are extracted from the JSON results.
3. If **critical** vulnerabilities are detected:
   - The pipeline **fails**.
   - A Devin remediation session is triggered to update the vulnerable packages and open a PR.
4. PRs created by the auto-remediation process include `[pipeline]` in the title to prevent triggering additional CI loops.

### Scan Results

Scan results are available in the **Actions** tab of this repository:

- Navigate to the **Snyk Security Scan** workflow
- Each run includes a downloadable `snyk-results.json` artifact
- The step summary shows a table of vulnerability counts by severity

## Dependency Update Policy

| Category | Policy |
|----------|--------|
| **Critical vulnerabilities** | Addressed automatically via Devin remediation within the CI pipeline |
| **High vulnerabilities** | Reviewed and patched within 7 days |
| **Medium/Low vulnerabilities** | Reviewed during regular maintenance cycles |
| **Routine dependency updates** | Evaluated monthly for compatibility and security improvements |

### Supported Package Ecosystems

- **npm** — `package.json` (root and `packages/app/`)
- **pip** — `src/python/requirements.txt`

## Scope

Since this is a demonstration repository with intentional vulnerabilities, the security policy primarily covers:

- Unintended vulnerabilities introduced outside the demo scope
- Infrastructure or CI/CD configuration issues
- Credential leaks beyond the intentional demo tokens

The intentional vulnerabilities (SQL injection, hardcoded JWTs, outdated dependencies, etc.) are **by design** and are documented in the codebase for educational purposes.
