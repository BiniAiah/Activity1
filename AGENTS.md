# AGENTS.md — Engineering Conventions

Repository conventions and guardrails for **JohnMac's Hospital** (AP6 — Activity 1).
Read this before making changes.

## Project type
- Static, frontend-only single-page app.
- Native **ES modules** loaded via `<script type="module">`. No bundler, no framework.
- Progressive Web App (service worker + web manifest).
- Icons: **Font Awesome 6.5.2** via CDN (pinned + SRI).

## Directory rules
- `css/` — one concern per file: `variables`, `reset`, `layout`, `components`, `views`.
- `js/data/` — plain data catalogs only (no DOM, no side effects).
- `js/patterns/` — design patterns (`factory.js`, `singleton.js`). No DOM.
- `js/services/` — data access (`api.js`). Network + fallback only.
- `js/ui/` — DOM rendering and UI behaviors (`render`, `router`, `modal`, `toast`).
- `js/utils/` — pure helpers (`helpers`, `manilaTime`).
- `js/app.js` — the only bootstrapper; wires modules together.
- `scripts/` — local tooling (dev server). Not shipped to the browser.

## Code style
- 2-space indentation, semicolons, double quotes in HTML attributes, single quotes in JS.
- Prefer `const`; use `let` only when a value changes.
- Use named function declarations and explicit `return` values.
- Keep each JavaScript topic to one consistent variation (see README table).
- No emojis in source files. Use Font Awesome icons instead.
- Descriptive names; comment intent, not obvious mechanics.

## Security
- Insert **user-provided** text with `textContent` (never `innerHTML`).
- `innerHTML` is allowed only for trusted static content (catalog data, icons).
- Use `escapeHTML()` from `js/utils/helpers.js` if interpolation is unavoidable.
- Never commit secrets or `.env` files.

## Accessibility
- Decorative icons: `aria-hidden="true"`.
- Form controls must have `<label for>`.
- Live status text uses `aria-live="polite"`.
- Modal: `role="dialog"`, `aria-modal="true"`, labelled title, Escape to close, focus return.
- Keep visible focus states.

## PWA
- Bump `CACHE_VERSION` in `sw.js` whenever cached assets change.
- Bypass `/api/*` in the service worker.
- Register the service worker only on `http(s)`.

## Verification before finishing
```bash
node --check js/app.js
node scripts/dev-server.js   # then open http://localhost:5173
```
Check the browser console for errors, confirm cards render, registration works, and the service worker registers.
