# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainers at [joao.esteves@cognition.ai](mailto:joao.esteves@cognition.ai) with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - The potential impact
3. You will receive an acknowledgment within **48 hours**.
4. A fix will be prioritized based on severity and impact.

## Automated Security Scanning

This repository uses **Snyk** for automated dependency vulnerability detection, integrated into the CI/CD pipeline via GitHub Actions.

### How It Works

1. **On every push and PR to `master`**, the `Snyk Security Scan` workflow runs automatically.
2. Snyk analyzes all dependencies (Node.js, Python, and sub-packages) for known vulnerabilities.
3. Results are categorized by severity: **Critical**, **High**, **Medium**, and **Low**.
4. If **critical** vulnerabilities are detected, the pipeline **fails** and triggers an automated remediation process.

### Automated Remediation

When the Snyk scan detects critical or high-severity vulnerabilities:

1. A **Devin AI** session is automatically created via the Devin API.
2. Devin analyzes the vulnerability report and identifies the affected packages.
3. Devin creates a pull request with the necessary dependency updates.
4. The fix PR uses a `[pipeline]` title prefix to prevent recursive CI triggers.

### Scan Artifacts

- Scan results are saved as `snyk-results.json` and uploaded as a GitHub Actions artifact (retained for 30 days).
- A summary of findings is posted to the GitHub Actions job summary.

## Dependency Update Policy

- **Critical vulnerabilities:** Addressed automatically via the Devin AI remediation pipeline. Fixes are expected within hours of detection.
- **High vulnerabilities:** Reviewed and prioritized for the next update cycle. May also be auto-remediated.
- **Medium and low vulnerabilities:** Reviewed periodically and addressed in regular maintenance updates.
- **Dependency updates:** Dependencies are updated as part of security remediation. Routine updates are performed on a best-effort basis.

## Supported Versions

This is a **demonstration repository**. It intentionally contains vulnerable dependencies to showcase the automated security scanning and remediation pipeline. It is not intended for production use.

| Version | Supported |
|---------|-----------|
| `master` (latest) | Yes |
| Older branches | No |

## Demo Credentials Notice

This repository **intentionally** contains hardcoded demo tokens and credentials (e.g. JWT tokens in `packages/app/src/`) as part of the vulnerability demonstration. These are **not real secrets** and exist solely to trigger security scanner findings. Do not use them in any real application.

## Security Best Practices

When contributing to this repository, please follow these guidelines:

- Do not commit **real** secrets, API keys, or credentials to the repository.
- Use environment variables for all sensitive configuration (see `.env.example`).
- Keep dependencies up to date and review Snyk scan results on PRs.
- Follow the principle of least privilege for any infrastructure configuration.
- Review the Terraform configs in `config/` for infrastructure security best practices.
