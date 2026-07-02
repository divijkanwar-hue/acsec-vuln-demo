# acsec-vuln-demo

> ⚠️ **Deliberately vulnerable. DO NOT DEPLOY.**
> This is a small, intentionally-insecure app used to demonstrate the
> [aws-code-security-scanner](https://github.com/divijkanwar-hue/aws-code-security-scanner)
> pipeline. Every "flaw" below is planted on purpose so the scanners have real
> issues to find. The hardcoded AWS key is AWS's public *example* key - not a real credential.

## Planted vulnerabilities (expected findings)

| # | Vulnerability | File | Scanner that should catch it |
|---|---|---|---|
| 1 | Hardcoded AWS credentials + DB password | `config.js` | **Gitleaks** (secrets) |
| 2 | SQL injection (string-concatenated query) | `app.js` (`/user`) | **Semgrep** (SAST) |
| 3 | Command injection (`exec` with user input) | `app.js` (`/ping`) | **Semgrep** (SAST) |
| 4 | Vulnerable dependency (`lodash 4.17.11`) | `package.json` | **Trivy** (deps/CVE) |

## What it "is"

A minimal Express app with a couple of routes. It is not meant to run in
production (or at all) - it exists solely as a scan target.

## How it's scanned

The scanner pipeline clones this repo, runs Semgrep + Gitleaks + Trivy, and writes
SARIF results to an encrypted S3 bucket. See the scanner project's README for the
full flow.
