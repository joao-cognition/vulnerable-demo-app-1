# Security Policy

## Important Disclaimer

This repository **intentionally contains security vulnerabilities** for demonstration and educational purposes. It is used to showcase automated security scanning tools (Snyk, Aikido Security) and AI-powered remediation via Devin.

**Do not deploy this application in any production or publicly accessible environment.**

## Reporting Security Vulnerabilities

If you discover a security issue that is **not** part of the intentional demonstration set, please report it responsibly:

1. **Do not** open a public GitHub issue.
2. Email the maintainers at [joao.esteves@cognition.ai](mailto:joao.esteves@cognition.ai) with:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
3. Allow up to **5 business days** for an initial response.

## Automated Security Scanning

### Snyk CI Pipeline

The repository runs a [Snyk](https://snyk.io/) security scan on every push and pull request to the `master` branch via the `snyk-security-scan.yml` GitHub Actions workflow.

**How it works:**

1. Dependencies are installed and scanned with `snyk test`.
2. Vulnerabilities are categorised by severity (critical, high, medium, low).
3. If **critical** vulnerabilities are found, the pipeline **fails**.
4. On failure, a Devin AI session is automatically created to:
   - Identify the vulnerable packages
   - Upgrade them to patched versions
   - Open a pull request with the fixes
5. Scan results are uploaded as build artifacts and retained for 30 days.

### Loop Prevention

Automated remediation PRs use a `[pipeline]` prefix in their title. All CI workflows skip Devin session creation for PRs matching this pattern, preventing infinite pipeline loops.

## Dependency Update Policy

- **Critical vulnerabilities**: Addressed automatically by the Snyk → Devin pipeline. Fixes are submitted as PRs for review.
- **High vulnerabilities**: Included in automated remediation alongside critical issues.
- **Medium and low vulnerabilities**: Reviewed periodically and updated during regular maintenance cycles.
- **Dependency updates**: Non-security dependency updates are evaluated on a case-by-case basis.

## Known Intentional Vulnerabilities

This repository includes deliberate security issues for demonstration, including but not limited to:

- SQL injection via string concatenation (`src/python/accounts.py`)
- Hardcoded credentials and JWT tokens (`packages/app/src/index.js`, `.env.example`)
- Command injection via shell execution (`src/index.php`)
- Outdated dependencies with known CVEs (`package.json`, `packages/app/package.json`)
- Unencrypted database storage (`config/database.tf`)
- Overly permissive IAM and network configurations (`config/`)

These are **not bugs** — they exist to exercise security scanning tools.

## Supported Versions

As a demonstration repository, only the latest version on the `master` branch is maintained.
