# Aikido demo repository

Security scanning and vulnerability detection demo repository. Includes automated Snyk scanning and Devin auto-fix pipelines. When critical vulnerabilities are detected, Devin sessions are automatically created to fix them.

## CI Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Snyk Security Scan** | push/PR to `master`, manual | Scans for dependency vulnerabilities; triggers Devin remediation on critical findings |
| **Documentation Update** | PR to `master`, manual | Triggers a Devin session to review and update repo documentation |
| **Test Coverage** | PR to `master`, manual | Triggers a Devin session to add unit test coverage |

eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJibGliIjogImJsb2IifQ.dummy-signature-for-demonstration
