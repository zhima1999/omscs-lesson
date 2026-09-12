# Lesson 3 Completion Implementation Plan

> **For agentic workers:** Use the parallel writing tasks with disjoint three-page files; the parent integrates and publishes each tested batch.

**Goal:** Finish Lesson 3 with page-matched screenshots and eight three-page releases.

**Architecture:** Keep the existing static reader and schema. Add optional `slideImage` paths and three-page data modules, then activate batches in page order. Preserve all previous text.

**Tech Stack:** JavaScript modules, CSS, Node tests, Poppler, GitHub Pages.

## Global Constraints

- Exact source: `M1L3 Optimization of Deep Networks - Slides v4.pdf`, 84 pages.
- Detailed Chinese explanations; no summation glyphs; no new dependencies.
- Publish only tested batches of three new notes; no changes to HCI or Lesson 2.

## Tasks

- [ ] Add failing tests for 84 screenshot paths/files, screenshot placement, and Pages asset packaging in `tests/content.test.js`, `tests/ui.test.js`, and `tests/deployment.test.js`.
- [ ] Render `assets/slides/lesson-3/page-01.jpg` through `page-84.jpg`; inspect all newly taught source pages.
- [ ] Add `slideScreenshot(note)` in `js/app.js` before each source summary; constrain image width in `styles.css`; include `assets` in `.github/workflows/pages.yml`.
- [ ] Create `data/lesson-3/batch-61-63.js`; activate it in `data/deep-learning-lesson-3.js`; set course and tested progress to 63 and update README.
- [ ] Run `npm test`, `git diff --check`, and browser image/reading checks; commit only activated data and necessary UI/assets, then push `main`.
- [ ] Repeat activation, progress update, tests, scoped commit and push for `batch-64-66.js`, `batch-67-69.js`, `batch-70-72.js`, `batch-73-75.js`, `batch-76-78.js`, `batch-79-81.js`, and `batch-82-84.js`.
- [ ] Confirm Lesson 3 has 84 taught notes and images, all deployment runs are successful, public files match, and the worktree is clean.
