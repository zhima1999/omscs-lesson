import test from "node:test";
import assert from "node:assert/strict";

import { buildRoute, parseRoute } from "../js/router.js";

test("parseRoute recognizes the course library", () => {
  assert.deepEqual(parseRoute("#/"), { view: "home" });
});

test("parseRoute recognizes a course", () => {
  assert.deepEqual(parseRoute("#/course/deep-learning"), {
    view: "course",
    courseId: "deep-learning"
  });
});

test("parseRoute recognizes a lesson and selected page", () => {
  assert.deepEqual(
    parseRoute("#/course/deep-learning/lesson/3?page=17"),
    {
      view: "lesson",
      courseId: "deep-learning",
      lessonId: "3",
      page: 17
    }
  );
});

test("parseRoute falls back to home for unknown routes", () => {
  assert.deepEqual(parseRoute("#/something/unexpected"), { view: "home" });
});

test("buildRoute creates stable GitHub Pages hash routes", () => {
  assert.equal(
    buildRoute({
      view: "lesson",
      courseId: "deep-learning",
      lessonId: "2",
      page: 8
    }),
    "#/course/deep-learning/lesson/2?page=8"
  );
});
