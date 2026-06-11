# Contributing

Thank you for helping improve FareFinder.

## Development Setup

1. Install dependencies with `npm run install:all`.
2. Copy `.env.example` to `server/.env` and update local values.
3. Start the app with `npm run dev`.

## Quality Checks

Before opening a merge request, run:

```powershell
npm run lint
npm run test
npm run coverage
npm run audit
```

## Commit Style

Use short, clear commit messages. Prefer conventional commit prefixes such as
`feat:`, `fix:`, `docs:`, `test:`, and `chore:` so the changelog can be
generated automatically.

## Merge Requests

Include a summary, test evidence, and screenshots for user interface changes.
Do not commit secrets, local `.env` files, build output, or dependency folders.
