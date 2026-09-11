# OMSCS Lesson Notes Site Design

## Goal

Build a public, responsive course-notes site for OMSCS study material. The home screen shows Deep Learning and HCI course cards. Deep Learning contains three lesson cards, and each taught slide is represented by an expandable page note with source points and Chinese explanation.

## Scope

- Deep Learning lesson 1 maps to `M1L1 Linear Classifiers and Gradient Descent - Slides v2.pdf` and is shown as not started.
- Deep Learning lesson 2 maps to `slides 1.pdf`; all 52 slide-page entries are available.
- Deep Learning lesson 3 maps to `M1L3 Optimization of Deep Networks - Slides v4.pdf`; pages 1-54 contain notes and pages 55-84 are marked as awaiting study.
- HCI has a course landing view but no lecture notes in this release.
- Original course PDFs are not published. The public site contains slide titles, concise source points, formulas, and original Chinese study notes.

## Information Architecture

The application uses hash-based routes so every view works on GitHub Pages without server rewrites:

- `#/` shows the course library.
- `#/course/deep-learning` shows Deep Learning lessons and progress.
- `#/course/hci` shows the HCI empty state.
- `#/course/deep-learning/lesson/2` and `/lesson/3` show slide notes.
- A `?page=N` suffix selects and scrolls to one slide card.

## Experience

The interface is a quiet academic workspace rather than a marketing page. Course and lesson views use compact cards. Lesson views use a sticky page index on desktop and a searchable page selector on mobile. Each slide card exposes its page number, slide heading, English source points, Chinese explanation, formulas when needed, and a takeaway. Cards can be expanded individually or together.

Deep Learning uses a green accent, HCI uses coral, and the base palette is white, graphite, and cool gray. Typography stays compact and readable. All controls have keyboard focus states, meaningful labels, and stable dimensions.

## Architecture

- `index.html` owns metadata and the application shell.
- `styles.css` owns responsive layout and visual tokens.
- `js/router.js` parses and creates hash routes.
- `js/app.js` renders views, search, expansion state, and navigation.
- `data/courses.js` defines course and lesson metadata.
- `data/deep-learning-lesson-2.js` and `data/deep-learning-lesson-3.js` define page notes.
- Node's built-in test runner validates routes, content counts, required fields, and search behavior without adding dependencies.

## Deployment

The `main` branch is the source of truth. A GitHub Pages workflow uploads the static repository and deploys it publicly. The delivered site must pass automated tests, link checks, desktop/mobile browser checks, and a production URL smoke test.

