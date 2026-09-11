import test from "node:test";
import assert from "node:assert/strict";

import { filterPages } from "../js/search.js";

const pages = [
  {
    page: 3,
    title: "Activation Functions",
    sourcePoints: ["Add a non-linearity"],
    explanation: ["激活函数让网络表达非线性关系。"],
    takeaway: "线性层之间需要非线性。"
  },
  {
    page: 12,
    title: "Gradient Descent",
    sourcePoints: ["Update weights"],
    explanation: ["梯度告诉参数应该向哪个方向移动。"],
    takeaway: "沿负梯度方向更新。"
  }
];

test("filterPages searches English and Chinese note content", () => {
  assert.deepEqual(filterPages(pages, "activation"), [pages[0]]);
  assert.deepEqual(filterPages(pages, "梯度"), [pages[1]]);
});

test("filterPages accepts a page number", () => {
  assert.deepEqual(filterPages(pages, "12"), [pages[1]]);
});

test("filterPages returns all pages for a blank query", () => {
  assert.deepEqual(filterPages(pages, "  "), pages);
});
