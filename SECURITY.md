# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this repository, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email the maintainers at **security@cognition.ai** with:
   - A description of the vulnerability
   - Steps to reproduce
   - Affected files or dependencies
   - Severity assessment (if known)
3. You will receive an acknowledgment within **48 hours**
4. A fix or mitigation plan will be communicated within **5 business days**

## Automated Snyk Scanning

This repository uses [Snyk](https://snyk.io/) for continuous security scanning via GitHub Actions.

### How It Works

1. **On every push and pull request to `master`**, the `snyk-security-scan.yml` workflow runs automatically
2. Snyk scans all dependencies (`package.json`, `packages/app/package.json`, `src/python/requirements.txt`) for known vulnerabilities
3. Results are categorized by severity: **Critical**, **High**, **Medium**, **Low**
4. The pipeline **fails** if any **critical** vulnerabilities are detected
5. Vulnerability counts are reported in the GitHub Actions Step Summary

### Automated Remediation (Devin AI)

When the Snyk scan detects critical or high-severity vulnerabilities:

1. The **Devin Remediation** job is triggered automatically
2. Devin AI receives a structured prompt listing all vulnerable packages with their current and target versions
3. Devin creates a pull request with the necessary dependency upgrades
4. The PR title includes the `[pipeline]` prefix to prevent triggering additional CI pipelines
5. A human reviewer approves and merges the fix

This job is skipped for PRs that already have `[pipeline]` in the title to prevent infinite CI loops.

### Manual Scanning

You can also trigger a scan manually:

1. Go to the [Actions tab](https://github.com/joao-cognition/vulnerable-demo-app-1/actions/workflows/snyk-security-scan.yml)
2. Click **Run workflow**
3. Select the `master` branch
4. Click **Run workflow**

## Dependency Update Policy

### Response Times

| Severity | Response Time | Action |
|----------|---------------|--------|
| **Critical** | Within 24 hours | Automated fix via Devin AI; manual review and merge |
| **High** | Within 5 business days | Automated fix via Devin AI or manual update |
| **Medium** | Within 30 days | Included in regular dependency updates |
| **Low** | Next scheduled update | Batched with other low-priority updates |

### Update Process

1. **Automated**: Snyk scans run on every push/PR. Critical vulnerabilities trigger automatic Devin AI remediation sessions
2. **Manual**: Maintainers periodically review and update dependencies using `npm audit` and `snyk test`
3. **Transitive dependencies**: Fixed via npm `overrides` in `package.json` when direct upgrades are not available

### Supported Versions

This is a demonstration repository. Only the `master` branch receives security updates.

| Branch | Supported |
|--------|-----------|
| `master` | Yes |
| All other branches | No |

## Secrets and Credentials

> **Important:** This repository is a security demo. Any credentials visible in the source code are **intentionally included for demonstration purposes** and are not valid for any production system.

The following GitHub Actions secrets are required for CI pipelines:

| Secret | Purpose |
|--------|---------|
| `SNYK_TOKEN` | Authenticates with the Snyk API for vulnerability scanning |
| `DEVIN_API_TOKEN` | Authenticates with the Devin AI API for automated remediation sessions |
