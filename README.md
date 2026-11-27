# JohnMacs's Hospital

A responsive, installable hospital web app built with **HTML5, CSS3, and vanilla JavaScript
(ES modules)**. It demonstrates core JavaScript fundamentals and two design patterns through a
working patient-registration flow, and ships as a Progressive Web App.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Service%20Worker-5A0FC8?style=flat&logo=pwa&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-528DD7?style=flat&logo=fontawesome&logoColor=white)
[![GitHub](https://img.shields.io/badge/GitHub-BiniAiah%2FActivity1-181717?style=flat&logo=github&logoColor=white)](https://github.com/BiniAiah/Activity1)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [JavaScript Topics Covered](#javascript-topics-covered)
- [Design Patterns](#design-patterns)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [PWA Notes](#pwa-notes)
- [Accessibility & Best Practices](#accessibility--best-practices)
- [Limitations](#limitations)
- [Author](#author)
- [License](#license)

## Overview
JohnMacs's Hospital is a single-page website for a fictional hospital. Visitors can browse
featured doctors, view services and prices, and register as a patient. Content is driven by
JavaScript data, the UI is split into ES modules, and the patient flow is built with a
**Factory function** and a **Singleton** to show clean object creation and shared state.

There is **no backend** in this activity. An API layer attempts `/api/v1/*` and gracefully
falls back to local data, so the app stays fully usable offline.

## Features
- Responsive layout (desktop, tablet, mobile) with Flexbox/Grid and media queries
- Doctor and service cards generated from arrays of objects
- Patient registration with validation, live counter, and details modal
- Toast notifications for user feedback
- Hash-based navigation with active-link state
- Progressive Web App: manifest + service worker (offline caching)
- Consistent icons via Font Awesome, with accessible markup

## Tech Stack
- **HTML5** — semantic structure and app shell
- **CSS3** — custom properties, Flexbox, Grid, media queries, reduced-motion support
- **Vanilla JavaScript (ES modules)** — no framework, no bundler
- **Font Awesome 6.5.2** — icon library (CDN, pinned with SRI)
- **Service Worker + Web App Manifest** — installable, offline-capable

## Project Structure
```
Activity1/
├── index.html                  # App shell (Hero, Doctors, Register, Services, Patterns, Objectives)
├── manifest.webmanifest        # PWA manifest
├── sw.js                       # Service worker (network-first nav, cache-first static, /api bypass)
├── css/
│   ├── variables.css           # Design tokens
│   ├── reset.css               # Reset + base typography
│   ├── layout.css              # Container, header, panels, footer
│   ├── components.css          # Buttons, cards, forms, pills, toast, modal
│   └── views.css               # Hero, objectives, responsive breakpoints
├── assets/img/
│   ├── favicon.svg
│   └── logo.svg
├── js/
│   ├── app.js                  # Bootstrapper (wires modules + events + SW)
│   ├── data/
│   │   ├── doctors.js          # Doctors catalog
│   │   └── services.js         # Services catalog
│   ├── patterns/
│   │   ├── factory.js          # AppointmentFactory, UICardFactory, NotificationFactory
│   │   └── singleton.js        # HospitalConfig, AppStore
│   ├── services/
│   │   └── api.js              # fetch /api/v1/* with local fallback
│   ├── ui/
│   │   ├── render.js           # DOM rendering
│   │   ├── router.js           # Hash routing + active nav
│   │   ├── modal.js            # Accessible modal
│   │   └── toast.js            # Toast notifications
│   └── utils/
│       ├── helpers.js          # getInitials, escapeHTML, qs, debounce
│       └── manilaTime.js       # Asia/Manila date-time formatting
├── scripts/
│   └── dev-server.js           # Zero-dependency static dev server
├── dev.bat                     # Windows launcher for the dev server
├── AGENTS.md                   # Engineering conventions & guardrails
├── TASK_PROGRESS.txt           # Implementation status ledger
├── PITCH_SCRIPT.md             # Video presentation script (Taglish)
└── README.md
```

## JavaScript Topics Covered
Each topic uses one consistent variation.

| # | Topic | Variation used | Where |
|---|-------|----------------|-------|
| 1 | Variables | `const` for fixed references, `let` for mutable values; string/number/boolean primitives | Throughout `js/` |
| 2 | Arrays | Array literal of objects + `push()` + index-based `for` loop | `js/data/`, `AppStore` |
| 3 | Objects | Object literal with dot notation + a `describe()` method | Patient/doctor/service objects |
| 4 | Functions | Named function declarations and exported functions with parameters + `return` | `js/ui/`, `js/utils/`, `js/app.js` |
| 5 | Factory | Factory function returning an object literal | `AppointmentFactory.create()` |
| 6 | Singleton | Class with a static private instance + `getInstance()` | `HospitalConfig`, `AppStore` |

## Design Patterns

### Factory
`AppointmentFactory.create()` builds a patient/appointment record, so the object literal is
not repeated on every registration.

```js
export const AppointmentFactory = {
  create({ name, age, condition }) {
    return {
      id: store.nextId(),
      name: String(name).trim(),
      age: Number(age),
      condition: String(condition).trim(),
      status: "Waiting",
      createdAt: formatManila(),
      describe() {
        return this.name + " — Age " + this.age + " · " + this.condition;
      }
    };
  }
};
```

### Singleton
`AppStore` is created once through a static private instance and accessed with `getInstance()`.
It privately holds the shared patient list.

```js
export class AppStore {
  static #instance;
  #patients = [];

  static getInstance() {
    if (!AppStore.#instance) {
      AppStore.#instance = new AppStore();
    }
    return AppStore.#instance;
  }

  addPatient(patient) { this.#patients.push(patient); }
  getPatients() { return this.#patients.slice(); }
  count() { return this.#patients.length; }
}
```

## Getting Started
The app uses ES modules and a service worker, which require an `http://` origin, so run it
through the included dev server instead of opening `index.html` directly.

Repository: [github.com/BiniAiah/Activity1](https://github.com/BiniAiah/Activity1)

```bash
git clone https://github.com/BiniAiah/Activity1.git
cd Activity1
node scripts/dev-server.js
```

On Windows you can also double-click **`dev.bat`**. Then open:

```
http://localhost:5173
```

No installation, dependencies, or build step are required.

## How It Works
1. `js/app.js` imports the data, patterns, UI, and API modules, then runs `init()`.
2. `getDoctors()` and `getServices()` try `/api/v1/*` and fall back to local catalogs.
3. `renderDoctors()` / `renderServices()` use `UICardFactory` to build cards.
4. On form submit, `handleSubmit()` validates input, calls `AppointmentFactory.create()`
   (Factory), and stores the result in `AppStore` (Singleton).
5. `updatePatientCount()` and `renderSystem()` refresh the UI; `showToast()` confirms; clicking
   a patient opens an accessible modal with the details.
6. The service worker caches static assets for offline use and bypasses `/api/*`.

## PWA Notes
- `sw.js` uses **network-first** for navigations, **cache-first** for static assets, and a
  **strict bypass** for `/api/*` and cross-origin requests.
- The service worker registers only on `http(s)` (not `file://`).
- Bump `CACHE_VERSION` in `sw.js` whenever cached files change.
- Icons are SVG; some platforms prefer PNG for install prompts.

## Accessibility & Best Practices
- Decorative icons use `aria-hidden="true"`; live regions use `aria-live="polite"`
- Form inputs have associated `<label>` elements
- User input is rendered with `textContent` / text nodes (no `innerHTML` for untrusted data)
- Modal: `role="dialog"`, `aria-modal="true"`, labelled title, Escape to close, focus return
- Font Awesome is pinned to a version and verified with a Subresource Integrity (SRI) hash
- `preconnect`, `theme-color`, SVG favicon, and reduced-motion support included

## Limitations
- Client-side only: patient data lives in memory and resets on refresh
- No backend or database; `/api/v1/*` intentionally falls back to local data
- Font Awesome loads from a CDN, so icons require an internet connection
- PWA icons are SVG; add PNG sizes if you need stricter installability

## Author
**@BiniAiah** — BSIT 4-A
Course: AP6

## License
This project is for educational purposes as part of AP6.
