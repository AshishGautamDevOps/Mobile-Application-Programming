<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot instructions for this repository

Purpose
- Help an AI coding agent be immediately productive in this small static frontend repository.

Big picture
- This is a minimal static web project made of HTML files and a single JS file; there is no build system, package manager, or server. See [README.md](README.md).
- Primary interaction is browser-side DOM manipulation: HTML pages (e.g. [function.html](function.html), [idclass.html](idclass.html), [bulboffon.html](bulboffon.html), [newproject.html](newproject.html)) load or reference `xyz.js` for behavior.

Key files to edit or inspect
- [xyz.js](xyz.js#L1-L11): main JS helper that toggles display of elements; use this as the canonical example when adding client-side behavior.
- HTML pages: [function.html](function.html), [idclass.html](idclass.html), [bulboffon.html](bulboffon.html), [newproject.html](newproject.html) — modify markup, IDs, and classes here; link scripts via `<script src="xyz.js"></script>`.
- [README.md](README.md): repo description; minimal.

Project-specific conventions and patterns
- No framework: keep changes plain HTML/CSS/vanilla JS. Avoid introducing frameworks or build tools unless the user requests and updates repo metadata.
- DOM-first pattern: behavior lives in `xyz.js` and is selected by element IDs (`document.getElementById`) and inline event handlers in HTML. When adding new behavior, follow the existing style of selecting elements by ID and toggling `style.display`.
- Minimal file scope: prefer small, self-contained edits to a single HTML + `xyz.js` update rather than large refactors.

Developer workflows (how to run & debug)
- Run locally: open any HTML file in a browser (double-click or `Open With` in the editor). There is no build step.
- Debugging: use the browser DevTools console and Elements inspector. Log with `console.log(...)` and inspect `document.getElementById(...)` at runtime.

Integration points & external dependencies
- None discoverable in the repo. If adding dependencies, update the top-level README and describe run steps.

What to do when asked to implement a change
- Change should be small and explicit: state which HTML page to modify and what element ID/class to use. Example: "Add a button to `function.html` that toggles `#demo` using `xyz.js`."
- When adding JS behavior, append functions to `xyz.js` and wire them from the HTML file. Keep function names descriptive and avoid globals beyond what existing patterns use.

Examples (explicit)
- To toggle an element with id `demo`, follow the existing pattern in [xyz.js](xyz.js#L1-L11).
- To add a new interactive widget, add markup in `newproject.html` and a corresponding function in `xyz.js`; mention both files in the PR description.

PR & commit guidance for AI agents
- Keep changes minimal and focused to the requested feature. Each PR should mention affected files (e.g., `function.html`, `xyz.js`) and include steps to validate by opening the edited HTML in a browser.

If anything is unclear
- Ask the human: which HTML page is the canonical target, and should changes be purely client-side? If the user asks to add tooling (bundlers, linters), confirm before adding files.

---
If you'd like, I can iterate on this file with more examples or expand run/debug steps. What should I add next?
