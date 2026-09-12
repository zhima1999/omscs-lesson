# Lesson 3 Completion

## Approved Requirements

Continue the existing beginner-friendly notes through PDF page 84. Publish each group of three pages independently. Keep all previous notes unchanged and add the exact slide screenshot above its source summary on every Lesson 3 page. HCI and other lessons are outside this update.

## Design

Render the supplied PDF to 1600-pixel JPEGs in `assets/slides/lesson-3`. Store the screenshot path in each page record. A responsive figure in the existing reader shows the image and links to the full-size image. No PDF viewer or additional dependencies are needed.

New notes live in three-page modules under `data/lesson-3`; the main data module imports each batch only when ready to publish. This lets concurrent writing proceed without exposing unfinished notes. Course progress tracks the activated batches. The Pages workflow includes the new assets folder.

## Acceptance

All 84 images exist and map to the correct PDF page; screenshots load on desktop and mobile. Every substantive new note includes terminology, purpose, worked examples, formula explanations where relevant, and a takeaway. Summation glyphs are not used. Correct misleading slide wording explicitly. Push pages 61-63, 64-66, 67-69, 70-72, 73-75, 76-78, 79-81, and 82-84 in separate tested commits. Verify the final public assets and deployment.
