import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), "utf8");
}

test("HTML provides the app shell and accessible metadata", async () => {
  const html = await read("index.html");

  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /id="app"/);
  assert.match(html, /type="module" src="\.\/js\/app\.js"/);
});

test("styles include responsive and keyboard-focus behavior", async () => {
  const css = await read("styles.css");

  assert.match(css, /@media \(max-width:/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.course-grid/);
  assert.match(css, /\.reader-layout/);
});

test("application renders all three route views and learning controls", async () => {
  const app = await read("js/app.js");

  assert.match(app, /renderHome/);
  assert.match(app, /renderCourse/);
  assert.match(app, /renderLesson/);
  assert.match(app, /filterPages/);
  assert.match(app, /aria-label="搜索本节笔记"/);
  assert.match(app, /上一页/);
  assert.match(app, /下一页/);
});

test("mobile reader provides a compact expandable page index", async () => {
  const app = await read("js/app.js");
  const css = await read("styles.css");

  assert.match(app, /page-index-toggle/);
  assert.match(app, /aria-expanded="false"/);
  assert.match(css, /\.page-index\.is-collapsed/);
});
