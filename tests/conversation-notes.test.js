import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { lesson3Pages } from "../data/deep-learning-lesson-3.js";

test("lesson 3 pages 1-54 use the complete original conversation explanations", () => {
  for (const note of lesson3Pages.slice(0, 54)) {
    assert.ok(note.conversationSource, `page ${note.page} must have original conversation provenance`);
    assert.ok(note.explanation.join("\n\n").length > 200, `page ${note.page} must retain its long explanation`);
    assert.ok(note.explanationHtml?.includes("<p>"), `page ${note.page} must have readable rendered notes`);
    assert.ok(note.conversationSource.pages.includes(note.page));
    assert.match(note.conversationSource.sha256, /^[a-f0-9]{64}$/);
    assert.ok(!note.explanationHtml.includes(":codex-"));
    assert.ok(!note.explanationHtml.includes("/Users/"));
    assert.ok(!note.explanationHtml.includes("<script"));
  }
});

test("restored notes retain worked examples, comparisons, and mathematical notation", () => {
  assert.match(lesson3Pages[44].explanationHtml || "", /8\.94/);
  assert.match(lesson3Pages[50].explanationHtml || "", /3\.46/);
  assert.match(lesson3Pages[53].explanationHtml || "", /<math /);
  assert.match(lesson3Pages[19].explanationHtml || "", /<table>/);
  assert.match(lesson3Pages[20].explanationHtml || "", /第 21[–-]22 页/);
  assert.match(lesson3Pages[28].explanationHtml || "", /第 29[–-]30 页/);
  assert.equal(lesson3Pages[20].explanationHtml, lesson3Pages[21].explanationHtml);
  assert.equal(lesson3Pages[28].explanationHtml, lesson3Pages[29].explanationHtml);
});

test("the reader renders restored rich notes and retains the plain-text fallback", async () => {
  const app = await readFile(new URL("../js/app.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(app, /note\.explanationHtml/);
  assert.match(app, /note\.explanation\.map/);
  assert.match(css, /\.conversation-note/);
  assert.match(css, /\.conversation-note.*math/);
});

test("every original source section is preserved on its corresponding slide pages", async () => {
  const sources = JSON.parse(await readFile(new URL("fixtures/lesson-3-conversation.json", import.meta.url), "utf8"));
  assert.equal(sources.length, 13);
  const covered = [];
  const normalize = (text) => text.replace(/\s/g, "");
  for (const source of sources) {
    assert.equal(
      normalize([source.context, ...source.sections.map((section) => section.markdown), source.closing].join("\n\n")),
      normalize(source.markdown),
      `pages ${source.firstPage}-${source.lastPage} must preserve all original text`
    );
    for (const section of source.sections) {
      for (const page of section.pages) {
        const note = lesson3Pages[page - 1];
        assert.deepEqual(note.explanation, [source.context, section.markdown, source.closing].filter(Boolean));
        assert.equal(note.conversationSource.sha256, source.sha256);
        covered.push(page);
      }
    }
  }
  assert.deepEqual(covered, Array.from({ length: 54 }, (_, index) => index + 1));
});

test("restoring early explanations does not change lesson 3 pages 55-84", () => {
  const hash = createHash("sha256").update(JSON.stringify(lesson3Pages.slice(54))).digest("hex");
  assert.equal(hash, "cb7b6f54e9eb61f57843e0946d4b1dacbb32fa6f523c862e04df8c8373c0c9ef");
});
