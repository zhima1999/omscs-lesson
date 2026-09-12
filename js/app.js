import { courses, getCourse } from "../data/courses.js";
import { lesson2Pages } from "../data/deep-learning-lesson-2.js";
import { lesson3Pages } from "../data/deep-learning-lesson-3.js";
import { buildRoute, parseRoute } from "./router.js";
import { filterPages } from "./search.js";

const app = document.querySelector("#app");
const lessonPages = new Map([
  ["2", lesson2Pages],
  ["3", lesson3Pages]
]);

let searchQuery = "";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name, size = 18) {
  return `<i data-lucide="${name}" width="${size}" height="${size}" aria-hidden="true"></i>`;
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function siteHeader(showHomeLink = false) {
  return `
    <header class="site-header">
      <div class="shell header-inner">
        <a class="brand" href="#/" aria-label="返回课程首页">
          <span class="brand-mark">${icon("network", 21)}</span>
          <span>
            <strong>OMSCS Learning Notes</strong>
            <small>中文逐页学习笔记</small>
          </span>
        </a>
        ${showHomeLink ? `<a class="header-link" href="#/">${icon("library", 17)}<span>课程首页</span></a>` : ""}
      </div>
    </header>
  `;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell footer-inner">
        <span>OMSCS 自学笔记</span>
        <a href="https://github.com/zhima1999/omscs-lesson" target="_blank" rel="noreferrer">
          ${icon("git-branch", 17)}<span>查看仓库</span>
        </a>
      </div>
    </footer>
  `;
}

function courseArtwork(course) {
  if (course.id === "deep-learning") {
    return `
      <div class="course-art course-art-network" aria-hidden="true">
        <span class="node n1"></span><span class="node n2"></span><span class="node n3"></span>
        <span class="node n4"></span><span class="node n5"></span><span class="node n6"></span>
        <span class="connection c1"></span><span class="connection c2"></span>
        <span class="connection c3"></span><span class="connection c4"></span>
      </div>
    `;
  }

  return `
    <div class="course-art course-art-interface" aria-hidden="true">
      <span class="interface-window"><span></span><span></span><span></span></span>
      <span class="interface-pointer">${icon("mouse-pointer-2", 38)}</span>
    </div>
  `;
}

function courseCard(course) {
  const lessonCount = course.lessons.length;
  const completeCount = course.lessons.filter((lesson) => lesson.status === "complete").length;

  return `
    <a class="course-card course-${course.accent}" href="${buildRoute({ view: "course", courseId: course.id })}">
      ${courseArtwork(course)}
      <div class="course-card-body">
        <div class="course-meta">
          <span class="course-code">${escapeHTML(course.code)}</span>
          <span>${lessonCount ? `${lessonCount} 节课程` : "课程待整理"}</span>
        </div>
        <h2>${escapeHTML(course.title)}</h2>
        <p class="course-title-zh">${escapeHTML(course.titleZh)}</p>
        <p class="course-description">${escapeHTML(course.description)}</p>
        <div class="course-card-footer">
          <span>${lessonCount ? `已完成 ${completeCount} 节` : "入口已建立"}</span>
          <span class="circle-action">${icon("arrow-right", 18)}</span>
        </div>
      </div>
    </a>
  `;
}

function renderHome() {
  document.title = "OMSCS Learning Notes";
  app.innerHTML = `
    ${siteHeader()}
    <main id="main-content">
      <section class="library-intro">
        <div class="shell intro-inner">
          <div>
            <p class="eyebrow">COURSE LIBRARY</p>
            <h1>课程笔记</h1>
            <p>按课程和 PDF 页码整理，把每个概念讲到真正看懂。</p>
          </div>
          <div class="library-stat" aria-label="课程统计">
            <strong>${courses.length}</strong>
            <span>门课程</span>
          </div>
        </div>
      </section>
      <section class="shell course-section" aria-labelledby="course-list-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">MY COURSES</p>
            <h2 id="course-list-title">选择一门课程</h2>
          </div>
          <span class="section-count">${courses.length} courses</span>
        </div>
        <div class="course-grid">
          ${courses.map(courseCard).join("")}
        </div>
      </section>
    </main>
    ${footer()}
  `;
  refreshIcons();
}

function statusLabel(status) {
  const labels = {
    complete: "已完成",
    "in-progress": "进行中",
    "not-started": "待开始"
  };
  return labels[status] || status;
}

function lessonCard(course, lesson) {
  const hasNotes = lessonPages.has(lesson.id);
  const percentage = Math.round((lesson.taughtPages / lesson.totalPages) * 100);
  const href = buildRoute({
    view: "lesson",
    courseId: course.id,
    lessonId: lesson.id,
    page: 1
  });

  return `
    <a class="lesson-card ${hasNotes ? "" : "lesson-card-empty"}" href="${href}">
      <div class="lesson-number" aria-hidden="true">${String(lesson.number).padStart(2, "0")}</div>
      <div class="lesson-copy">
        <div class="lesson-topline">
          <span class="status status-${lesson.status}">${statusLabel(lesson.status)}</span>
          <span>${lesson.taughtPages} / ${lesson.totalPages} 页</span>
        </div>
        <h3>${escapeHTML(lesson.title)}</h3>
        <p>${escapeHTML(lesson.titleZh)}</p>
        <div class="progress-track" aria-label="已整理 ${percentage}%">
          <span style="width: ${percentage}%"></span>
        </div>
        <div class="lesson-source">
          ${icon("file-text", 16)}<span>${escapeHTML(lesson.source)}</span>
        </div>
      </div>
      <span class="lesson-arrow">${icon(hasNotes ? "arrow-right" : "clock-3", 19)}</span>
    </a>
  `;
}

function renderCourse(route) {
  const course = getCourse(route.courseId);
  if (!course) {
    window.location.hash = "#/";
    return;
  }

  document.title = `${course.title} | OMSCS Learning Notes`;
  const taughtPages = course.lessons.reduce((sum, lesson) => sum + lesson.taughtPages, 0);
  const totalPages = course.lessons.reduce((sum, lesson) => sum + lesson.totalPages, 0);

  app.innerHTML = `
    ${siteHeader(true)}
    <main id="main-content">
      <section class="course-banner course-banner-${course.accent}">
        <div class="shell course-banner-inner">
          <nav class="breadcrumbs" aria-label="面包屑导航">
            <a href="#/">课程首页</a>${icon("chevron-right", 15)}<span>${escapeHTML(course.title)}</span>
          </nav>
          <div class="course-banner-title">
            <span class="banner-icon">${icon(course.icon, 30)}</span>
            <div>
              <p class="eyebrow">${escapeHTML(course.code)}</p>
              <h1>${escapeHTML(course.title)}</h1>
              <p>${escapeHTML(course.titleZh)}</p>
            </div>
          </div>
          <div class="course-summary">
            <span><strong>${course.lessons.length}</strong> 节课程</span>
            <span><strong>${taughtPages}</strong> 页已整理</span>
            ${totalPages ? `<span><strong>${totalPages}</strong> 页课件</span>` : ""}
          </div>
        </div>
      </section>
      <section class="shell lesson-section" aria-labelledby="lesson-list-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">LESSONS</p>
            <h2 id="lesson-list-title">课程目录</h2>
          </div>
        </div>
        ${course.lessons.length
          ? `<div class="lesson-list">${course.lessons.map((lesson) => lessonCard(course, lesson)).join("")}</div>`
          : `
            <div class="empty-state">
              <span class="empty-icon">${icon("notebook-tabs", 28)}</span>
              <h2>HCI 讲义暂未整理</h2>
              <p>课程入口已经准备好，当前版本先专注于 Deep Learning。</p>
              <a class="text-action" href="#/">${icon("arrow-left", 17)}返回课程首页</a>
            </div>
          `}
      </section>
    </main>
    ${footer()}
  `;
  refreshIcons();
}

function pageIndexItem(course, lesson, note, selectedPage) {
  const isSelected = note.page === selectedPage;
  const statusIcon = note.status === "pending" ? "clock-3" : "check";
  return `
    <li>
      <a class="page-index-link ${isSelected ? "is-current" : ""} ${note.status === "pending" ? "is-pending" : ""}"
        href="${buildRoute({ view: "lesson", courseId: course.id, lessonId: lesson.id, page: note.page })}"
        ${isSelected ? 'aria-current="page"' : ""}>
        <span class="page-number">${String(note.page).padStart(2, "0")}</span>
        <span class="page-index-title">${escapeHTML(note.title)}</span>
        <span class="page-state">${icon(statusIcon, 14)}</span>
      </a>
    </li>
  `;
}

function renderIndexResults(course, lesson, pages, selectedPage, query) {
  const filtered = filterPages(pages, query);
  const results = document.querySelector("#page-index-results");
  const count = document.querySelector("#search-result-count");
  if (!results || !count) return;

  count.textContent = query.trim() ? `${filtered.length} 个结果` : `${pages.length} 页`;
  results.innerHTML = filtered.length
    ? filtered.map((note) => pageIndexItem(course, lesson, note, selectedPage)).join("")
    : `<li class="no-search-results">没有找到相关笔记</li>`;
  refreshIcons();
}

function slideScreenshot(note) {
  if (!note.slideImage) return "";
  return `
    <figure class="slide-screenshot">
      <a href="${escapeHTML(note.slideImage)}" target="_blank" rel="noreferrer" aria-label="查看 PDF 第 ${note.page} 页完整截图">
        <img src="${escapeHTML(note.slideImage)}" alt="${escapeHTML(note.title)}，PDF 第 ${note.page} 页原始课件"
          width="1600" height="900" decoding="async">
      </a>
      <figcaption>PPT · PDF 第 ${note.page} 页</figcaption>
    </figure>
  `;
}

function pendingNote(note, lastTaughtPage) {
  return `
    <article class="note-card pending-note">
      <div class="note-heading">
        <div>
          <p class="page-kicker">PDF PAGE ${note.page}</p>
          <h1>${escapeHTML(note.title)}</h1>
        </div>
        <span class="note-status pending">待讲</span>
      </div>
      ${slideScreenshot(note)}
      <div class="pending-message">
        <span>${icon("clock-3", 26)}</span>
        <div>
          <h2>这一页还没有在对话中讲解</h2>
          <p>目前笔记整理到 PDF 第 ${lastTaughtPage} 页。等我们继续讲到这一页后，内容会补充到这里。</p>
        </div>
      </div>
    </article>
  `;
}

function taughtNote(note) {
  return `
    <article class="note-card">
      <div class="note-heading">
        <div>
          <p class="page-kicker">PDF PAGE ${note.page}</p>
          <h1>${escapeHTML(note.title)}</h1>
        </div>
        <span class="note-status taught">已讲解</span>
      </div>

      ${slideScreenshot(note)}

      <details class="source-panel" open>
        <summary>
          <span>${icon("presentation", 19)}PPT 原意</span>
          ${icon("chevron-down", 18)}
        </summary>
        <ul>
          ${note.sourcePoints.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}
        </ul>
      </details>

      <section class="explanation-block" aria-labelledby="explanation-title-${note.page}">
        <div class="content-label">${icon("message-square-text", 18)}<h2 id="explanation-title-${note.page}">通俗讲解</h2></div>
        ${note.explanationHtml
          ? `<div class="conversation-note">${note.explanationHtml}</div>`
          : note.explanation.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      </section>

      ${note.formulas.length ? `
        <section class="formula-block" aria-labelledby="formula-title-${note.page}">
          <div class="content-label">${icon("function-square", 18)}<h2 id="formula-title-${note.page}">公式怎么读</h2></div>
          <div class="formula-list">
            ${note.formulas.map((formula) => `<code>${escapeHTML(formula)}</code>`).join("")}
          </div>
        </section>
      ` : ""}

      <section class="takeaway-block" aria-labelledby="takeaway-title-${note.page}">
        <span class="takeaway-icon">${icon("lightbulb", 20)}</span>
        <div>
          <h2 id="takeaway-title-${note.page}">这一页要记住</h2>
          <p>${escapeHTML(note.takeaway)}</p>
        </div>
      </section>
    </article>
  `;
}

function pagerLink(course, lesson, page, direction) {
  if (!page) return `<span class="pager-spacer"></span>`;
  const isPrevious = direction === "previous";
  return `
    <a class="pager-link ${isPrevious ? "pager-previous" : "pager-next"}"
      href="${buildRoute({ view: "lesson", courseId: course.id, lessonId: lesson.id, page })}">
      ${isPrevious ? icon("arrow-left", 18) : ""}
      <span><small>${isPrevious ? "上一页" : "下一页"}</small><strong>PDF 第 ${page} 页</strong></span>
      ${isPrevious ? "" : icon("arrow-right", 18)}
    </a>
  `;
}

function renderEmptyLesson(course, lesson) {
  document.title = `${lesson.title} | ${course.title}`;
  app.innerHTML = `
    ${siteHeader(true)}
    <main id="main-content" class="empty-lesson-main">
      <div class="shell">
        <nav class="breadcrumbs standalone" aria-label="面包屑导航">
          <a href="#/">课程首页</a>${icon("chevron-right", 15)}
          <a href="${buildRoute({ view: "course", courseId: course.id })}">${escapeHTML(course.title)}</a>
          ${icon("chevron-right", 15)}<span>Lesson ${lesson.number}</span>
        </nav>
        <div class="empty-state">
          <span class="empty-icon">${icon("book-dashed", 29)}</span>
          <p class="eyebrow">LESSON ${String(lesson.number).padStart(2, "0")}</p>
          <h1>${escapeHTML(lesson.title)}</h1>
          <p>${escapeHTML(lesson.titleZh)}的逐页笔记尚未开始整理。</p>
          <a class="text-action" href="${buildRoute({ view: "course", courseId: course.id })}">${icon("arrow-left", 17)}返回课程目录</a>
        </div>
      </div>
    </main>
    ${footer()}
  `;
  refreshIcons();
}

function renderLesson(route) {
  const course = getCourse(route.courseId);
  const lesson = course?.lessons.find((item) => item.id === route.lessonId);
  if (!course || !lesson) {
    window.location.hash = course ? buildRoute({ view: "course", courseId: course.id }) : "#/";
    return;
  }

  const pages = lessonPages.get(lesson.id);
  if (!pages) {
    renderEmptyLesson(course, lesson);
    return;
  }

  const selectedPage = Math.min(Math.max(route.page, 1), pages.length);
  const note = pages[selectedPage - 1];
  const taughtCount = pages.filter((page) => page.status === "taught").length;
  const lastTaughtPage = pages.reduce((last, page) => page.status === "taught" ? page.page : last, 0);
  const progress = Math.round((taughtCount / pages.length) * 100);
  document.title = `P${selectedPage} ${note.title} | ${lesson.title}`;

  app.innerHTML = `
    ${siteHeader(true)}
    <main id="main-content" class="reader-main">
      <div class="reader-topbar">
        <div class="shell reader-topbar-inner">
          <nav class="breadcrumbs" aria-label="面包屑导航">
            <a href="#/">课程首页</a>${icon("chevron-right", 15)}
            <a href="${buildRoute({ view: "course", courseId: course.id })}">${escapeHTML(course.title)}</a>
            ${icon("chevron-right", 15)}<span>Lesson ${lesson.number}</span>
          </nav>
          <div class="lesson-progress-summary">
            <span>${taughtCount} / ${pages.length} 页已整理</span>
            <div class="progress-track compact" aria-label="已整理 ${progress}%"><span style="width: ${progress}%"></span></div>
          </div>
        </div>
      </div>

      <div class="shell reader-heading">
        <p class="eyebrow">LESSON ${String(lesson.number).padStart(2, "0")}</p>
        <h2>${escapeHTML(lesson.title)}</h2>
        <p>${escapeHTML(lesson.titleZh)} · ${escapeHTML(lesson.source)}</p>
      </div>

      <div class="shell reader-layout">
            <aside class="page-index is-collapsed" aria-label="本节页码目录">
              <button class="page-index-toggle" type="button" aria-expanded="false" aria-controls="page-index-body">
                <span>${icon("list", 18)}页码目录</span>
                <span>第 ${selectedPage} / ${pages.length} 页 ${icon("chevron-down", 16)}</span>
              </button>
              <div id="page-index-body">
              <div class="page-index-header">
            <div>
              <h2>页码目录</h2>
              <span id="search-result-count">${pages.length} 页</span>
            </div>
            <label class="search-box">
              ${icon("search", 17)}
              <span class="sr-only">搜索本节笔记</span>
              <input id="note-search" type="search" aria-label="搜索本节笔记" placeholder="搜索标题或知识点" value="${escapeHTML(searchQuery)}">
            </label>
          </div>
              <ol id="page-index-results" class="page-index-list">
                ${filterPages(pages, searchQuery).map((page) => pageIndexItem(course, lesson, page, selectedPage)).join("")}
              </ol>
              </div>
        </aside>

        <div class="note-column">
          ${note.status === "taught" ? taughtNote(note) : pendingNote(note, lastTaughtPage)}
          <nav class="pager" aria-label="前后页导航">
            ${pagerLink(course, lesson, selectedPage > 1 ? selectedPage - 1 : null, "previous")}
            ${pagerLink(course, lesson, selectedPage < pages.length ? selectedPage + 1 : null, "next")}
          </nav>
        </div>
      </div>
    </main>
    ${footer()}
  `;

  const searchInput = document.querySelector("#note-search");
  searchInput?.addEventListener("input", (event) => {
    searchQuery = event.target.value;
      renderIndexResults(course, lesson, pages, selectedPage, searchQuery);
    });
  document.querySelector(".page-index-toggle")?.addEventListener("click", (event) => {
    const collapsed = document.querySelector(".page-index").classList.toggle("is-collapsed");
    event.currentTarget.setAttribute("aria-expanded", String(!collapsed));
  });
  renderIndexResults(course, lesson, pages, selectedPage, searchQuery);
  document.querySelector(`.page-index-link[aria-current="page"]`)?.scrollIntoView({ block: "nearest" });
  refreshIcons();
}

function render() {
  const route = parseRoute(window.location.hash);
  if (route.view !== "lesson") searchQuery = "";

  if (route.view === "course") {
    renderCourse(route);
  } else if (route.view === "lesson") {
    renderLesson(route);
  } else {
    renderHome();
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", render);
document.querySelector(".skip-link")?.addEventListener("click", (event) => {
  event.preventDefault();
  const main = document.querySelector("#main-content");
  main?.setAttribute("tabindex", "-1");
  main?.focus();
});
window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.location.hash = "#/";
  } else {
    render();
  }
});
