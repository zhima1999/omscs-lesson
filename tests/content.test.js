import test from "node:test";
import assert from "node:assert/strict";

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

test("lesson 3 contains 54 taught pages followed by 30 pending pages", () => {
  assertSequentialPages(lesson3Pages, 84);
  for (const note of lesson3Pages.slice(0, 54)) {
    assert.equal(note.status, "taught");
    assertCompleteNote(note);
  }
  for (const note of lesson3Pages.slice(54)) {
    assert.equal(note.status, "pending");
  }
});
