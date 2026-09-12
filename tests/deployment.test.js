import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Pages workflow tests notes and publishes only site assets", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/pages.yml", import.meta.url),
    "utf8"
  );

  assert.match(workflow, /npm test/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /path: _site/);
  assert.match(workflow, /cp -R js data vendor _site/);
  assert.match(workflow, /cp -R assets _site/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
