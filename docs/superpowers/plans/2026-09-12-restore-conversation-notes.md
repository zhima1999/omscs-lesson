# Restore Conversation Notes Implementation Plan

**Goal:** Replace Lesson 03 pages 1-54's short explanations with the original long explanations from this conversation and publish the update.

**Architecture:** Extract only the thirteen final teaching responses for the optimization lecture. Keep a source fixture for comparison, split at actual page headings, and pre-render Markdown and LaTeX into safe static HTML. Merge the restored explanations into the existing lesson data without changing page titles, slide images, navigation, or pages 55-84. Native MathML avoids introducing browser dependencies.

**Tech Stack:** Static JavaScript, Node test runner, Marked for the one-off Markdown import, KaTeX for static MathML generation, GitHub Pages.

## Constraints

- Use the original conversation text, not newly generated summaries.
- Retain combined explanations for pages 21-22 and 29-30, with their original page headings.
- Include group context and closing review material; remove only app citations and follow-up controls.
- Keep screenshots and all pages 55-84 unchanged.
- Escape source HTML and reject unsafe links during generation.
- Tables and formulas must not create horizontal page overflow on mobile.

## Tasks

- [x] Capture the thirteen source responses in `tests/fixtures/lesson-3-conversation.json`; record source hashes and page boundaries.
- [x] Add failing tests for restored explanations, Markdown layout, MathML, and unchanged pages 55-84.
- [x] Generate `data/lesson-3/conversation-01-54.js` with complete explanations, static HTML, and page provenance.
- [x] Merge the restored content in `data/deep-learning-lesson-3.js`; render static explanation HTML in `js/app.js` with the existing text-only fallback.
- [x] Add scoped long-note typography and overflow rules in `styles.css`.
- [x] Verify exact source coverage, all unit tests, and desktop/mobile screenshots.
- [ ] Commit, push, wait for the existing Pages deployment, and compare published content with local files.

## Verification Results

- All 38,199 source characters are retained apart from whitespace and removed app controls.
- Pages 1-54 preserve their original source section plus group context and review; the two combined page pairs retain identical shared explanations.
- Pages 55-84 are byte-for-byte equivalent as serialized note objects to commit `a1034c1`; titles, source points, formulas, takeaways, and screenshot paths on pages 1-54 are unchanged.
- Browser checks covered all 54 restored pages at 1280px, 390px, and 320px: 162 checks, no horizontal page overflow, and nonblank native MathML.
- Browser search finds detailed original text, pagination reaches unchanged page 55, Lesson 02 retains its text-only rendering, and the browser reports no console errors.
