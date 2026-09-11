const LESSON_PATTERN = /^#\/course\/([^/]+)\/lesson\/([^/?]+)(?:\?(.*))?$/;
const COURSE_PATTERN = /^#\/course\/([^/?]+)$/;

export function parseRoute(hash = "#/") {
  const normalized = hash || "#/";
  const lessonMatch = normalized.match(LESSON_PATTERN);

  if (lessonMatch) {
    const params = new URLSearchParams(lessonMatch[3] || "");
    const requestedPage = Number.parseInt(params.get("page") || "1", 10);

    return {
      view: "lesson",
      courseId: decodeURIComponent(lessonMatch[1]),
      lessonId: decodeURIComponent(lessonMatch[2]),
      page: Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1
    };
  }

  const courseMatch = normalized.match(COURSE_PATTERN);
  if (courseMatch) {
    return {
      view: "course",
      courseId: decodeURIComponent(courseMatch[1])
    };
  }

  return { view: "home" };
}

export function buildRoute(route) {
  if (route.view === "course") {
    return `#/course/${encodeURIComponent(route.courseId)}`;
  }

  if (route.view === "lesson") {
    const page = Number.isFinite(route.page) && route.page > 0 ? route.page : 1;
    return `#/course/${encodeURIComponent(route.courseId)}/lesson/${encodeURIComponent(route.lessonId)}?page=${page}`;
  }

  return "#/";
}
