# Security Policy

## Supported Versions

The `main` branch is the supported development line.

## Reporting A Vulnerability

Do not open public issues for suspected vulnerabilities. Report security issues
privately to the project maintainers with:

- A clear description of the issue.
- Steps to reproduce.
- Any affected routes, files, or configuration.
- Suggested mitigation, if known.

Maintainers should acknowledge reports within 72 hours and prioritize fixes for
high-impact issues.

## Secret Handling

Never commit `.env` files, passwords, tokens, database credentials, or private
keys. Use `.env.example` for documentation only.
