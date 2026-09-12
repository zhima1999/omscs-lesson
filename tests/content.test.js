import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { courses } from "../data/courses.js";
import { lesson2Pages } from "../data/deep-learning-lesson-2.js";
import { lesson3Pages } from "../data/deep-learning-lesson-3.js";

function assertSequentialPages(pages, expectedCount) {
  assert.equal(pages.length, expectedCount);
  assert.deepEqual(
    pages.map((item) => item.page),
    Array.from({ length: expectedCount }, (_, index) => index + 1)
  );
}

function assertCompleteNote(note) {
  assert.ok(note.title.trim());
  assert.ok(note.sourcePoints.length > 0);
  assert.ok(note.explanation.length > 0);
  assert.ok(note.takeaway.trim());
}

test("course catalog contains Deep Learning and an HCI placeholder", () => {
  assert.deepEqual(
    courses.map((course) => course.id),
    ["deep-learning", "hci"]
  );
  assert.equal(courses[0].lessons.length, 3);
  assert.equal(courses[1].lessons.length, 0);
});

test("lesson 2 contains 52 complete taught notes", () => {
  assertSequentialPages(lesson2Pages, 52);
  for (const note of lesson2Pages) {
    assert.equal(note.status, "taught");
    assertCompleteNote(note);
  }
});

test("lesson 3 contains 78 taught pages followed by 6 pending pages", () => {
  assertSequentialPages(lesson3Pages, 84);
  for (const note of lesson3Pages.slice(0, 78)) {
    assert.equal(note.status, "taught");
    assertCompleteNote(note);
  }
  for (const note of lesson3Pages.slice(78)) {
    assert.equal(note.status, "pending");
  }
});

test("lesson 3 pages 55-60 match the source slides and provide detailed explanations", () => {
  const titles = [
    "Behavior of Optimizers",
    "Learning Rate Schedules",
    "Regularization",
    "Regularization: L1, L2, and Elastic",
    "Preventing Co-Adapted Features",
    "Dropout Regularization"
  ];
  const notes = lesson3Pages.slice(54, 60);
  assert.deepEqual(notes.map((note) => note.title), titles);
  for (const note of notes) {
    assert.ok(note.explanation.length >= 6, `page ${note.page} needs step-by-step explanations`);
    assert.ok(note.explanation.join("").length >= 600, `page ${note.page} needs beginner-friendly detail`);
    assert.ok(!JSON.stringify(note).includes("\u03a3"));
    assert.ok(!JSON.stringify(note).includes("\u2211"));
  }
});

test("course progress matches the actual number of available lesson notes", () => {
  const lessons = courses[0].lessons;
  for (const [id, pages] of [["2", lesson2Pages], ["3", lesson3Pages]]) {
    const lesson = lessons.find((item) => item.id === id);
    assert.equal(lesson.taughtPages, pages.filter((note) => note.status === "taught").length);
    assert.equal(lesson.totalPages, pages.length);
  }
});

test("new lesson 3 notes retain detailed beginner explanations without summation notation", () => {
  for (const note of lesson3Pages.slice(60).filter((note) => note.status === "taught")) {
    assert.ok(note.explanation.length >= 6, `page ${note.page} needs step-by-step explanations`);
    assert.ok(note.explanation.join("").length >= 600, `page ${note.page} needs beginner-friendly detail`);
    assert.ok(!JSON.stringify(note).includes("\u03a3"));
    assert.ok(!JSON.stringify(note).includes("\u2211"));
  }
});

test("every lesson 3 page has its corresponding rendered slide screenshot", async () => {
  for (const note of lesson3Pages) {
    assert.equal(note.slideImage, `assets/slides/lesson-3/page-${String(note.page).padStart(2, "0")}.jpg`);
    const bytes = await readFile(new URL(`../${note.slideImage}`, import.meta.url));
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    assert.ok(bytes.length > 10000);
  }
});
