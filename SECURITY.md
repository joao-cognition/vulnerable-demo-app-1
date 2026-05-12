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

- **Critical vulnerabilities**: Addressed automatically by the Snyk -> Devin pipeline. Fixes are submitted as PRs for review.
- **High vulnerabilities**: Included in automated remediation alongside critical issues.
- **Medium and low vulnerabilities**: Reviewed periodically and updated during regular maintenance cycles.
- **Dependency updates**: Non-security dependency updates are evaluated on a case-by-case basis.

## Known Intentional Vulnerabilities

This repository includes deliberate security issues for demonstration, including but not limited to:

### Application Code

| Category               | Location                        | Description                                           |
| ---------------------- | ------------------------------- | ----------------------------------------------------- |
| SQL injection          | `src/python/accounts.py`        | String concatenation in SQL queries                   |
| Hardcoded JWT tokens   | `packages/app/src/index.js`     | Plaintext JWT embedded in source                      |
| Hardcoded API key      | `packages/app/src/api.js`       | Long-lived JWT token used in API calls                |
| Hardcoded credentials  | `.env.example`                  | Demo master password in example config                |
| Hardcoded Pusher key   | `src/services/pusher.js`        | Pusher app key committed to source                    |
| Command injection      | `src/index.php`                 | Shell execution via backtick operator (`stat`)        |
| XSS via `v-html`       | `src/components/RichText.vue`   | Unsanitised HTML rendering in Vue component           |
| Unreachable code       | `src/index.php`, `packages/app/src/index.js` | Dead code after return statements       |

### Infrastructure

| Category                   | Location                 | Description                                      |
| -------------------------- | ------------------------ | ------------------------------------------------ |
| Unencrypted DB storage     | `config/database.tf`     | `storage_encrypted = false` on RDS instance      |
| No backup retention        | `config/database.tf`     | `backup_retention_period = 0`                    |
| Overly permissive IAM      | `config/compute.tf`      | IAM role without scoped policy                   |
| Hardcoded certificate ARN  | `config/load_balancer.tf`| ACM certificate ARN embedded in config           |

### Mobile

| Category             | Location                      | Description                              |
| -------------------- | ----------------------------- | ---------------------------------------- |
| Debuggable app       | `android/AndroidManifest.xml` | `android:debuggable="true"` in manifest  |
| Exported activity    | `android/AndroidManifest.xml` | Intent filter with `exported="true"`     |

### Dependencies

| Category                | Location                         | Description                              |
| ----------------------- | -------------------------------- | ---------------------------------------- |
| Outdated npm packages   | `package.json`                   | Packages with known CVEs                 |
| Vulnerable transitive   | `packages/app/package.json`      | `node-fetch@2.6.1` and other outdated deps |
| Outdated Python package | `src/python/requirements.txt`    | Versions not pinned to latest patched    |

These are **not bugs** -- they exist to exercise security scanning tools.

## Supported Versions

As a demonstration repository, only the latest version on the `master` branch is maintained.
