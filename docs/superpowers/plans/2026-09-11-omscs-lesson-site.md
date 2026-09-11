# OMSCS Lesson Notes Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a public static OMSCS course-notes site with Deep Learning slide notes and an HCI placeholder.

**Architecture:** A dependency-free hash-routed HTML application renders structured ES module data. Small pure functions handle routing and search so behavior can be tested with Node's built-in test runner before browser integration.

**Tech Stack:** HTML5, CSS, ES modules, Node built-in tests, GitHub Pages Actions

## Global Constraints

- Do not publish the original course PDFs.
- Lesson 2 contains exactly 52 taught page records.
- Lesson 3 contains 84 page records; pages 1-54 are taught and pages 55-84 are pending.
- HCI remains an empty course shell.
- The site must work at the GitHub Pages repository subpath.
- Desktop and mobile layouts must not overlap or clip content.

---

### Task 1: Data and Route Contracts

**Files:**
- Create: `package.json`
- Create: `js/router.js`
- Create: `js/search.js`
- Create: `data/courses.js`
- Create: `data/deep-learning-lesson-2.js`
- Create: `data/deep-learning-lesson-3.js`
- Create: `tests/router.test.js`
- Create: `tests/content.test.js`

**Interfaces:**
- Produces: `parseRoute(hash): Route`, `buildRoute(route): string`, `filterPages(pages, query): PageNote[]`, and exported course/lesson data.
- Consumes: no production interfaces.

- [ ] Write route tests for home, course, lesson, invalid routes, and page query parsing.
- [ ] Run `npm test` and verify failure because route modules do not exist.
- [ ] Implement `parseRoute` and `buildRoute`, then verify route tests pass.
- [ ] Write content tests requiring 52 lesson-2 pages, 84 lesson-3 pages, taught status through page 54, unique page numbers, and nonempty taught notes.
- [ ] Run `npm test` and verify content tests fail because data modules do not exist.
- [ ] Add structured course and page-note data, then verify all tests pass.
- [ ] Commit the data and route contracts.

### Task 2: Application Experience

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `js/app.js`
- Create: `public/favicon.svg`
- Create: `tests/static.test.js`

**Interfaces:**
- Consumes: route, search, course, and lesson exports from Task 1.
- Produces: a keyboard-accessible static course library and lesson reader.

- [ ] Write static tests requiring page metadata, application mount point, stylesheet/module links, favicon, and accessible navigation labels.
- [ ] Run `npm test` and verify failure because the application shell is missing.
- [ ] Implement the home and course views with course and lesson cards.
- [ ] Implement lesson search, page index, expand/collapse controls, deep links, source points, explanations, formula blocks, and pending states.
- [ ] Add responsive styles for desktop, tablet, and mobile widths.
- [ ] Run `npm test` and verify all contract and static tests pass.
- [ ] Serve locally and inspect home, course, lesson 2, lesson 3, HCI, search, and deep-link behavior.
- [ ] Commit the complete application experience.

### Task 3: GitHub Pages Delivery

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: the complete static site from Task 2.
- Produces: a public GitHub Pages deployment from `main`.

- [ ] Add a Pages workflow using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- [ ] Document the site structure and content-update workflow.
- [ ] Run the complete automated test suite.
- [ ] Run local HTTP link and browser checks at desktop and mobile viewport sizes.
- [ ] Commit deployment configuration, push `main`, enable GitHub Pages if required, and wait for the deployment workflow.
- [ ] Fetch the public URL and verify the home page and representative lesson routes load successfully.

