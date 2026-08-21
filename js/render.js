/* =========================================================================
 * js/render.js
 * 데이터 → HTML 렌더링 함수 모음.
 *
 * Render 객체의 키는 <body data-page="..."> 값과 일치한다.
 * js/common.js 의 부트스트랩이 현재 페이지에 해당하는 함수를 호출한다.
 *
 * 이 파일에 내용(문구·수치)을 적지 않는다. 값은 전부 data/*.js 에서 온다.
 * ========================================================================= */

var Render = (function () {
  'use strict';

  /* render.js 는 common.js 보다 먼저 로드되므로(CLAUDE.md 3번의 로드 순서)
     Util 을 여기서 바로 붙잡지 않고 호출 시점에 참조한다. */
  var esc = function (v) { return Util.esc(v); };

  var HOME_NEWS_LIMIT  = 3;
  var HOME_PAPER_LIMIT = 3;

  /* =====================================================================
   * 공통 조각
   * =================================================================== */

  function emptyNote() {
    return '<p class="text-sm text-slate-500">' + esc(SITE.ui.empty) + '</p>';
  }

  /* 이미지가 없으면 자리표시자 박스를 돌려준다.
     모든 <img> 에 alt 와 loading="lazy" 를 붙인다. (CLAUDE.md 8번)

     경로는 적혀 있는데 파일이 아직 없는 경우도 자리표시자로 바뀐다.
     (common.js 의 initImageFallback 이 data-fallback 이 붙은 img 를 감시한다) */
  function imageBox(src, alt, ratio, extra) {
    var cls = (ratio || 'aspect-[4/3]') + ' w-full overflow-hidden ' + (extra || '');
    if (!src) {
      return '<div class="' + cls + ' img-placeholder px-3 text-xs">' + esc(alt || '') + '</div>';
    }
    return '<div class="' + cls + '"><img src="' + esc(src) + '" alt="' + esc(alt || '') +
           '" loading="lazy" data-fallback class="h-full w-full object-cover"></div>';
  }

  function sectionHead(title, lead, href) {
    return '<div class="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">' +
      '<div>' +
        '<h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">' + esc(title) + '</h2>' +
        (lead ? '<p class="mt-2 text-sm text-slate-600">' + esc(lead) + '</p>' : '') +
      '</div>' +
      (href ? '<a href="' + esc(href) + '" class="shrink-0 text-sm font-semibold text-primary hover:underline">' +
              esc(SITE.ui.viewAll) + ' &rarr;</a>' : '') +
    '</div>';
  }

  /* =====================================================================
   * 연구과제 상태 판정과 정렬 (CLAUDE.md 6번)
   * status 를 데이터에 적어두지 않고 endDate 로 매번 계산한다.
   * =================================================================== */

  function getStatus(p) {
    if (p.statusOverride) return p.statusOverride;
    return new Date(p.endDate) >= new Date() ? 'ongoing' : 'completed';
  }

  function sortedProjects() {
    if (typeof PROJECTS === 'undefined') return [];
    return PROJECTS.slice().sort(function (a, b) {
      var sa = getStatus(a), sb = getStatus(b);
      if (sa !== sb) return sa === 'ongoing' ? -1 : 1;
      var diff = new Date(b.startDate) - new Date(a.startDate);
      return SORT_DESC ? diff : -diff;
    });
  }

  /* =====================================================================
   * 저자 표기 — EMEC 구성원 이름을 굵게
   * MEMBERS 의 영문 성과 괄호 안 국문 이름 양쪽으로 판별한다.
   *   "Min-Ro Park (박민로)"  →  'Park' 또는 '박민로' 가 들어간 저자를 굵게
   * =================================================================== */

  /* 비교용 정규화: 공백·마침표·하이픈을 지우고 소문자로
     "M.-R. Park" → "mrpark",  "Min-Ro Park" → "minropark" */
  function normalizeName(s) {
    return String(s || '').toLowerCase().replace(/[\s.\-_]/g, '');
  }

  /* 구성원 한 명이 저자 목록에 쓰일 수 있는 표기들을 모은다.
     성(姓)만으로 비교하면 동성이인(예: 다른 Park)까지 굵어지므로
     반드시 이름 전체 형태로 대조한다. */
  var tokenCache = null;

  function memberTokens() {
    if (tokenCache) return tokenCache;

    tokenCache = {};
    if (typeof MEMBERS === 'undefined') return tokenCache;

    MEMBERS.forEach(function (m) {
      var raw = String(m.name || '');
      if (raw.charAt(0) === '[') return;

      var ko = (raw.match(/\(([^)]+)\)/) || [])[1] || '';
      var en = raw.replace(/\([^)]*\)/, '').replace(/^\s+|\s+$/g, '');

      if (ko) tokenCache[normalizeName(ko)] = true;

      if (en) {
        tokenCache[normalizeName(en)] = true;

        /* "Min-Ro Park" → "M.-R. Park" 같은 약칭 표기 */
        var parts = en.split(/\s+/);
        if (parts.length > 1) {
          var last = parts.pop();
          var initials = parts.join('-').split('-').map(function (w) {
            return w.charAt(0);
          }).join('');
          tokenCache[normalizeName(initials + last)] = true;
        }
      }
    });

    return tokenCache;
  }

  function boldAuthors(authors) {
    if (!authors) return '';
    var tokens = memberTokens();

    return String(authors).split(',').map(function (seg) {
      var hit = tokens[normalizeName(seg)] === true;
      return hit ? '<strong class="font-bold text-slate-900">' + esc(seg) + '</strong>' : esc(seg);
    }).join(',');
  }

  /* 논문 한 건 */
  function publicationItem(p) {
    var titleHtml = esc(p.title);
    if (p.doi) {
      var href = p.doi.indexOf('http') === 0 ? p.doi : 'https://doi.org/' + p.doi;
      titleHtml = '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"' +
                  ' class="text-primary underline-offset-2 hover:underline">' + esc(p.title) + '</a>';
    }

    var meta = [];
    if (p.venue)  meta.push('<em>' + esc(p.venue) + '</em>');
    if (p.detail) meta.push(esc(p.detail));
    if (p.patentNo) meta.push(esc(p.patentNo));
    else if (p.applicationNo) meta.push(esc(p.applicationNo));

    return '<li class="py-4">' +
      '<p class="text-sm font-semibold leading-snug text-slate-900">' + titleHtml + '</p>' +
      '<p class="mt-1 text-sm text-slate-600">' + boldAuthors(p.authors) + '</p>' +
      (meta.length ? '<p class="mt-0.5 text-xs text-slate-500">' + meta.join(', ') + '</p>' : '') +
    '</li>';
  }

  /* =====================================================================
   * HOME
   * =================================================================== */

  /* 1. 히어로 — 문구는 SITE 에서 온다.
        tagline 은 <strong> 을 허용하므로 innerHTML 로 넣는다. (CLAUDE.md 9번) */
  function homeHero() {
    var setText = function (sel, value) {
      var el = document.querySelector(sel);
      if (el) el.textContent = value;
    };

    setText('[data-hero-eyebrow]', SITE.department + ', ' + SITE.university);
    setText('[data-hero-title]', SITE.labName);
    setText('[data-hero-scroll]', SITE.ui.scrollDown);

    var tagline = document.querySelector('[data-hero-tagline]');
    if (tagline) tagline.innerHTML = SITE.tagline;   /* <strong> 허용 */
  }

  /* 2. 연구분야 요약 */
  function homeResearch() {
    var host = document.getElementById('home-research');
    if (!host) return;
    if (typeof RESEARCH === 'undefined' || !RESEARCH.length) { host.innerHTML = emptyNote(); return; }

    host.innerHTML = RESEARCH.slice(0, 4).map(function (a) {
      return '<a href="research.html#' + esc(a.id) + '"' +
        ' class="card-hover group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-primary-mid">' +
        imageBox(a.image, a.title, 'aspect-[16/10]') +
        '<div class="flex flex-1 flex-col p-5">' +
          '<h3 class="text-base font-bold text-slate-900 group-hover:text-primary">' + esc(a.title) + '</h3>' +
          '<p class="mt-2 text-sm leading-relaxed text-slate-600">' + esc(a.summary) + '</p>' +
        '</div></a>';
    }).join('');
  }

  /* 3. 지도교수 소개 */
  function homeProfessor() {
    var host = document.getElementById('home-professor');
    if (!host) return;
    if (typeof MEMBERS === 'undefined') { host.innerHTML = emptyNote(); return; }

    var prof = MEMBERS.filter(function (m) { return m.role === 'professor'; })[0];
    if (!prof) { host.innerHTML = emptyNote(); return; }

    /* 대표 연락처와 같으면 members.js 에 중복 입력하지 않는다 (CLAUDE.md 0번) */
    var email  = prof.email  || SITE.email;
    var office = prof.office || SITE.address.short;

    host.innerHTML =
      '<div class="reveal grid gap-8 sm:grid-cols-3">' +
        '<div class="sm:col-span-1">' + imageBox(prof.photo, prof.name, 'aspect-[3/4]', 'rounded-lg') + '</div>' +
        '<div class="sm:col-span-2">' +
          '<p class="text-sm text-slate-500">' + esc(prof.title) + '</p>' +
          '<h3 class="mt-1 text-2xl font-bold text-slate-900">' + esc(prof.name) + '</h3>' +
          '<p class="mt-4 text-sm leading-relaxed text-slate-600">' + esc(prof.interests) + '</p>' +
          '<ul class="mt-5 space-y-1 text-sm text-slate-600">' +
            '<li>' + esc(office) + '</li>' +
            '<li><a class="text-primary hover:underline" href="mailto:' + esc(email) + '">' + esc(email) + '</a></li>' +
          '</ul>' +
          '<a href="people.html#professor" class="mt-6 inline-block text-sm font-semibold text-primary hover:underline">' +
            esc(SITE.ui.readMore) + ' &rarr;</a>' +
        '</div>' +
      '</div>';
  }

  /* 4. 현황 지표 — 숫자 하드코딩 금지. 전부 자동 집계한다 */
  function homeStats() {
    var host = document.getElementById('home-stats');
    if (!host) return;

    var members = (typeof MEMBERS !== 'undefined') ? MEMBERS : [];
    var pubs    = (typeof PUBLICATIONS !== 'undefined') ? PUBLICATIONS : [];

    var stats = [
      { label: SITE.home.stats.phd,     value: members.filter(function (m) { return m.role === 'phd'; }).length },
      { label: SITE.home.stats.journal, value: pubs.filter(function (p) { return p.type === 'journal'; }).length },
      { label: SITE.home.stats.alumni,  value: members.filter(function (m) { return m.role === 'alumni'; }).length },
      { label: SITE.home.stats.ongoing, value: sortedProjects().filter(function (p) { return getStatus(p) === 'ongoing'; }).length }
    ];

    host.innerHTML = stats.map(function (s) {
      return '<div class="rounded-lg border border-slate-200 bg-white px-4 py-7 text-center">' +
        '<p class="countup text-4xl font-bold text-primary" data-count-to="' + esc(s.value) + '">' + esc(s.value) + '</p>' +
        '<p class="mt-2 text-sm text-slate-600">' + esc(s.label) + '</p>' +
      '</div>';
    }).join('');
  }

  /* 5. 최근 소식 */
  function homeNews() {
    var host = document.getElementById('home-news');
    if (!host) return;
    if (typeof NEWS === 'undefined' || !NEWS.length) { host.innerHTML = emptyNote(); return; }

    var list = NEWS.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, HOME_NEWS_LIMIT);

    host.innerHTML = '<ul class="reveal divide-y divide-slate-200">' + list.map(function (n) {
      var body = esc(n.text);
      if (n.link) {
        body = '<a href="' + esc(n.link) + '" target="_blank" rel="noopener noreferrer"' +
               ' class="underline-offset-2 hover:text-primary hover:underline">' + body + '</a>';
      }
      return '<li class="flex gap-4 py-4">' +
        (n.image ? '<img src="' + esc(n.image) + '" alt="" loading="lazy" class="h-14 w-14 shrink-0 rounded object-cover">' : '') +
        '<div class="min-w-0">' +
          '<time class="font-mono text-xs text-slate-500">' + esc(Util.formatDate(n.date)) + '</time>' +
          '<p class="mt-1 text-sm leading-relaxed text-slate-700">' + body + '</p>' +
        '</div></li>';
    }).join('') + '</ul>';
  }

  /* 6. 최근 논문 */
  function homePapers() {
    var host = document.getElementById('home-papers');
    if (!host) return;
    if (typeof PUBLICATIONS === 'undefined' || !PUBLICATIONS.length) { host.innerHTML = emptyNote(); return; }

    var list = PUBLICATIONS.slice().sort(function (a, b) { return b.year - a.year; }).slice(0, HOME_PAPER_LIMIT);

    host.innerHTML = '<ul class="reveal divide-y divide-slate-200">' + list.map(function (p) {
      return publicationItem(p).replace('<li class="py-4">',
        '<li class="py-4"><span class="mb-1 inline-block rounded border border-slate-300 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">' +
        esc(p.year) + ' &middot; ' + esc(SITE.submenu[p.type]) + '</span>');
    }).join('') + '</ul>';
  }

  /* 7. 함께하실 분 */
  function homeJoin() {
    var host = document.getElementById('home-join');
    if (!host) return;

    host.innerHTML =
      '<div class="reveal">' +
        '<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">' + esc(SITE.home.joinTitle) + '</h2>' +
        '<p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">' + esc(SITE.home.joinLead) + '</p>' +
        '<a href="contact.html" class="mt-8 inline-block rounded bg-white px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-slate-100">' +
          esc(SITE.home.joinCta) + '</a>' +
      '</div>';
  }

  /* 섹션 제목들 (문구는 SITE.home 에서) */
  function homeHeadings() {
    var map = [
      ['home-research-head', SITE.home.researchTitle, SITE.home.researchLead, 'research.html#areas'],
      ['home-professor-head', SITE.home.professorTitle, '', ''],
      ['home-stats-head', SITE.home.statsTitle, '', ''],
      ['home-news-head', SITE.home.newsTitle, '', 'news.html'],
      ['home-papers-head', SITE.home.papersTitle, '', 'publications.html']
    ];

    map.forEach(function (m) {
      var host = document.getElementById(m[0]);
      if (host) host.innerHTML = sectionHead(m[1], m[2], m[3]);
    });
  }

  function home() {
    homeHero();
    homeHeadings();
    homeResearch();
    homeProfessor();
    homeStats();
    homeNews();
    homePapers();
    homeJoin();
  }

  /* =====================================================================
   * 나머지 페이지
   * CLAUDE.md 10번 규칙에 따라 한 페이지씩 완성한다.
   * 아래 함수를 구현하면 common.js 부트스트랩이 자동으로 호출한다.
   * =================================================================== */

  /* TODO: people       — #professor / #current / #alumni (교수는 학생과 다른 레이아웃) */
  /* TODO: research     — #areas / #equipment / #projects (Ongoing·Completed 분리) */
  /* TODO: publications — All/Journal/Conference/Patent 필터 + 연도별 그룹핑 */
  /* TODO: news         — 연도 구분선이 있는 피드 */
  /* TODO: gallery      — 앨범 격자 + 라이트박스 */
  /* TODO: contact      — 지도 임베드 + 모집 안내 */

  return {
    home: home,

    /* 다른 페이지에서 재사용할 조각 */
    getStatus: getStatus,
    sortedProjects: sortedProjects,
    publicationItem: publicationItem,
    boldAuthors: boldAuthors,
    imageBox: imageBox,
    sectionHead: sectionHead,
    emptyNote: emptyNote
  };
})();
