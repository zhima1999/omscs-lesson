function searchableText(page) {
  return [
    page.page,
    page.title,
    ...(page.sourcePoints || []),
    ...(page.explanation || []),
    ...(page.formulas || []),
    page.takeaway || ""
  ]
    .join(" ")
    .toLocaleLowerCase();
}

export function filterPages(pages, query) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return pages;

  return pages.filter((page) => searchableText(page).includes(normalized));
}
