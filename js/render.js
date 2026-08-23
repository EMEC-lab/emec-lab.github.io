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

  /* =====================================================================
   * PUBLICATIONS
   *   상단 필터 [All] [Journal] [Conference] [Patent]
   *   각 종류 안에서는 연도별로 묶어 최신순
   *   DOI 가 있으면 제목이 링크, 구성원 이름은 굵게 (publicationItem 담당)
   * =================================================================== */

  function pubsOf(type) {
    if (typeof PUBLICATIONS === 'undefined') return [];
    return PUBLICATIONS.filter(function (p) { return p.type === type; })
      .sort(function (a, b) { return b.year - a.year; });
  }

  /* [{ year, items }, ...] 최신 연도부터 */
  function groupByYear(list) {
    var order = [], map = {};
    list.forEach(function (p) {
      if (!map[p.year]) { map[p.year] = []; order.push(p.year); }
      map[p.year].push(p);
    });
    return order.map(function (y) { return { year: y, items: map[y] }; });
  }

  function renderPubType(type) {
    var host    = document.getElementById('pub-' + type);
    var section = document.getElementById(type);
    if (!host) return 0;

    var list = pubsOf(type);

    /* 항목이 없는 종류는 섹션째 감춘다 (빈 섹션 노출 금지) */
    if (section) section.hidden = !list.length;
    if (!list.length) { host.innerHTML = ''; return 0; }

    host.innerHTML = groupByYear(list).map(function (g) {
      return '<div class="mt-10 first:mt-0">' +
        '<h3 class="border-b-2 border-primary pb-1 font-mono text-lg font-bold text-primary">' +
          esc(g.year) + '</h3>' +
        '<ul class="divide-y divide-slate-200">' +
          g.items.map(publicationItem).join('') +
        '</ul></div>';
    }).join('');

    return list.length;
  }

  function renderPubFilter(counts) {
    var host = document.getElementById('pub-filter');
    if (!host) return;

    var total = PUBLICATION_TYPES.reduce(function (n, t) { return n + (counts[t] || 0); }, 0);

    var buttons = [{ key: 'all', label: SITE.ui.all, count: total }].concat(
      PUBLICATION_TYPES.map(function (t) {
        return { key: t, label: SITE.submenu[t], count: counts[t] || 0 };
      })
    );

    host.className = 'sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur';
    host.innerHTML =
      '<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">' +
        '<div class="flex gap-2 overflow-x-auto py-3">' +
          buttons.map(function (b) {
            return '<button type="button" class="js-pub-filter shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors"' +
              ' data-filter="' + esc(b.key) + '">' + esc(b.label) +
              ' <span class="font-mono text-xs opacity-70">' + esc(b.count) + '</span></button>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  function applyPubFilter(key) {
    PUBLICATION_TYPES.forEach(function (t) {
      var section = document.getElementById(t);
      if (!section) return;
      var empty = !pubsOf(t).length;
      section.hidden = empty || (key !== 'all' && key !== t);
    });

    var btns = document.querySelectorAll('.js-pub-filter');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-filter') === key;
      btns[i].className = 'js-pub-filter shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ' +
        (on ? 'border-primary bg-primary text-white'
            : 'border-slate-300 text-slate-600 hover:border-primary hover:text-primary');
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function bindPubFilter() {
    var btns = document.querySelectorAll('.js-pub-filter');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        applyPubFilter(this.getAttribute('data-filter'));
      });
    }
  }

  function publications() {
    var counts = {};
    PUBLICATION_TYPES.forEach(function (t) { counts[t] = renderPubType(t); });

    renderPubFilter(counts);
    bindPubFilter();

    /* 메뉴에서 publications.html#journal 로 들어오면 그 종류만 보여 준다 */
    var hash = (window.location.hash || '').replace('#', '');
    applyPubFilter(PUBLICATION_TYPES.indexOf(hash) !== -1 ? hash : 'all');

    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').replace('#', '');
      if (PUBLICATION_TYPES.indexOf(h) !== -1) applyPubFilter(h);
    });
  }

  /* =====================================================================
   * 나머지 페이지 — CLAUDE.md 10번에 따라 한 페이지씩 완성한다
   * =================================================================== */

  /* =====================================================================
   * RESEARCH
   *   #areas      RESEARCH      주제별 카드 + 한 문단 이상의 설명
   *   #equipment  EQUIPMENT     장비명 · 사양 · 사진
   *   #projects   PROJECTS      Ongoing / Completed 두 그룹
   * =================================================================== */

  /* 줄바꿈(\n)을 문단으로 */
  function paragraphs(text, cls) {
    return String(text || '').split('\n')
      .filter(function (line) { return line.replace(/^\s+|\s+$/g, '') !== ''; })
      .map(function (line) { return '<p class="' + (cls || '') + '">' + esc(line) + '</p>'; })
      .join('');
  }

  /* --- 연구분야 --------------------------------------------------------- */
  function researchAreas() {
    var host = document.getElementById('research-areas');
    if (!host) return;
    if (typeof RESEARCH === 'undefined' || !RESEARCH.length) { host.innerHTML = emptyNote(); return; }

    host.innerHTML = RESEARCH.map(function (a, i) {
      var flip = (i % 2 === 1);   /* 짝수 번째는 이미지를 오른쪽으로 */
      return '<article id="' + esc(a.id) + '" class="scroll-mt-4 border-t border-slate-200 py-10 first:border-t-0 first:pt-0">' +
        '<div class="grid items-start gap-8 md:grid-cols-5">' +
          '<div class="md:col-span-2' + (flip ? ' md:order-2' : '') + '">' +
            imageBox(a.image, a.title, 'aspect-[4/3]', 'rounded-lg') +
          '</div>' +
          '<div class="md:col-span-3' + (flip ? ' md:order-1' : '') + '">' +
            '<h3 class="text-xl font-bold text-slate-900">' + esc(a.title) + '</h3>' +
            '<p class="mt-2 text-sm font-medium text-primary">' + esc(a.summary) + '</p>' +
            '<div class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">' +
              paragraphs(a.description) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* --- 연구장비 --------------------------------------------------------- */
  function researchEquipment() {
    var host    = document.getElementById('research-equipment');
    var section = document.getElementById('equipment');
    if (!host) return;

    var list = (typeof EQUIPMENT !== 'undefined') ? EQUIPMENT : [];
    if (section) section.hidden = !list.length;
    if (!list.length) { host.innerHTML = ''; return; }

    host.innerHTML = list.map(function (e) {
      return '<div class="card-hover overflow-hidden rounded-lg border border-slate-200 bg-white">' +
        imageBox(e.image, e.name, 'aspect-[4/3]') +
        '<div class="p-5">' +
          '<h3 class="text-base font-bold text-slate-900">' + esc(e.name) + '</h3>' +
          '<div class="mt-2 space-y-1 text-sm leading-relaxed text-slate-600">' +
            paragraphs(e.spec) +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* --- 연구과제 --------------------------------------------------------- */

  /* 지원기관 CI. 로고가 없으면 기관명 텍스트로 대체한다.
     로고마다 가로세로비가 달라 높이만 맞추고 너비는 auto 로 둔다. */
  function sponsorMark(sp) {
    var name = (sp && sp.name) || '';
    var inner;

    if (sp && sp.logo) {
      inner = '<img src="' + esc(sp.logo) + '" alt="' + esc(name) +
              '" loading="lazy" data-fallback class="h-8 w-auto max-w-full object-contain">';
    } else {
      inner = '<span class="text-xs font-semibold leading-snug text-slate-500">' + esc(name) + '</span>';
    }

    if (sp && sp.url) {
      return '<a href="' + esc(sp.url) + '" target="_blank" rel="noopener noreferrer"' +
             ' class="flex h-8 items-center">' + inner + '</a>';
    }
    return '<div class="flex h-8 items-center">' + inner + '</div>';
  }

  function statusBadge(status) {
    var label = SITE.sectionTitles[status === 'ongoing' ? 'ongoing' : 'completed'];
    var cls = status === 'ongoing'
      ? 'bg-primary text-white'
      : 'bg-slate-200 text-slate-600';
    return '<span class="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ' + cls + '">' +
           esc(label) + '</span>';
  }

  function projectRow(p) {
    var status = getStatus(p);
    var period = Util.formatMonth(p.startDate) + ' ~ ' + Util.formatMonth(p.endDate);
    var roleFull = (typeof PROJECT_ROLES !== 'undefined' && PROJECT_ROLES[p.role]) || p.role;

    /* 로고가 없으면 CI 자리에 기관명 텍스트가 들어가므로
       아래 메타 줄에서는 기관명을 한 번 더 쓰지 않는다 */
    var showSponsorInMeta = !!(p.sponsor && p.sponsor.logo);

    return '<li class="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-6">' +
      '<div class="w-32 shrink-0">' + sponsorMark(p.sponsor) + '</div>' +
      '<div class="min-w-0 flex-1">' +
        '<p class="text-sm font-semibold leading-snug text-slate-900">' + esc(p.title) + '</p>' +
        '<p class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">' +
          (showSponsorInMeta
            ? '<span>' + esc(p.sponsor.name) + '</span><span aria-hidden="true">&middot;</span>'
            : '') +
          /* 좁은 화면에서는 약어(PI / Co-I)로 대체 표기 */
          '<span class="sm:hidden">' + esc(p.role) + '</span>' +
          '<span class="hidden sm:inline">' + esc(roleFull) + '</span>' +
          '<span aria-hidden="true">&middot;</span>' +
          '<span class="font-mono">' + esc(period) + '</span>' +
          statusBadge(status) +
        '</p>' +
        (p.description ? '<p class="mt-2 text-sm leading-relaxed text-slate-600">' + esc(p.description) + '</p>' : '') +
      '</div>' +
    '</li>';
  }

  function researchProjects() {
    var host = document.getElementById('research-projects');
    if (!host) return;

    var all = sortedProjects();
    if (!all.length) { host.innerHTML = emptyNote(); return; }

    /* 과제가 없는 그룹은 소제목째 렌더링하지 않는다 (빈 섹션 노출 금지) */
    var groups = [
      { key: 'ongoing',   items: all.filter(function (p) { return getStatus(p) === 'ongoing'; }) },
      { key: 'completed', items: all.filter(function (p) { return getStatus(p) !== 'ongoing'; }) }
    ].filter(function (g) { return g.items.length; });

    host.innerHTML = groups.map(function (g) {
      return '<div class="mt-10 first:mt-0">' +
        '<h3 class="flex items-center gap-2 border-b border-slate-200 pb-2 text-lg font-bold text-slate-900">' +
          esc(SITE.sectionTitles[g.key]) +
          '<span class="font-mono text-sm font-normal text-slate-400">' + esc(g.items.length) + '</span>' +
        '</h3>' +
        '<ul class="divide-y divide-slate-100">' + g.items.map(projectRow).join('') + '</ul>' +
      '</div>';
    }).join('');
  }

  function research() {
    researchAreas();
    researchEquipment();
    researchProjects();
  }

  /* =====================================================================
   * PEOPLE
   *   #professor  사진 크게 + 학력·경력·연구관심사·학회활동·초청강연 전체 노출
   *   #current    박사 → 석사 → 학부 순, 작은 카드 그리드
   *   #alumni     사진 없이 텍스트 목록
   *
   * 교수는 학생과 다른 레이아웃으로 그린다. (CLAUDE.md 7번)
   * =================================================================== */

  /* 프로필 안의 소제목 + 내용 한 덩어리 */
  function profileBlock(title, inner) {
    if (!inner) return '';
    return '<section class="mt-8">' +
      '<h3 class="mb-3 text-xs font-bold uppercase tracking-wider2 text-primary">' + esc(title) + '</h3>' +
      inner +
    '</section>';
  }

  function bulletList(items) {
    if (!items || !items.length) return '';
    return '<ul class="space-y-1.5 text-sm leading-relaxed text-slate-600">' +
      items.map(function (v) {
        return '<li class="flex gap-2"><span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400"></span>' +
               '<span>' + esc(v) + '</span></li>';
      }).join('') + '</ul>';
  }

  /* 학회 활동 / 학회 회원 — 기간이 있으면 앞에 붙인다 */
  function periodList(items, mainKey) {
    if (!items || !items.length) return '';
    return '<ul class="space-y-2 text-sm text-slate-600">' +
      items.map(function (x) {
        var main = x[mainKey] ? '<span class="font-semibold text-slate-800">' + esc(x[mainKey]) + '</span> ' : '';
        return '<li class="sm:flex sm:gap-4">' +
          '<span class="block font-mono text-xs text-slate-400 sm:w-36 sm:shrink-0 sm:pt-0.5">' +
            esc(x.period || '') + '</span>' +
          '<span class="block leading-relaxed">' + main + esc(x.org) + '</span>' +
        '</li>';
      }).join('') + '</ul>';
  }

  function talkList(items) {
    if (!items || !items.length) return '';
    return '<ul class="divide-y divide-slate-100 text-sm">' +
      items.map(function (t) {
        return '<li class="py-2.5 sm:flex sm:gap-4">' +
          '<span class="block font-mono text-xs text-slate-400 sm:w-24 sm:shrink-0 sm:pt-0.5">' +
            esc(Util.formatDate(t.date)) + '</span>' +
          '<span class="block min-w-0 leading-relaxed">' +
            '<span class="text-slate-700">' + esc(t.title) + '</span>' +
            (t.host ? '<span class="ml-2 text-xs text-slate-500">' + esc(t.host) + '</span>' : '') +
          '</span>' +
        '</li>';
      }).join('') + '</ul>';
  }

  function peopleProfessor() {
    var host = document.getElementById('people-professor');
    if (!host) return;

    var prof = (typeof MEMBERS !== 'undefined')
      ? MEMBERS.filter(function (m) { return m.role === 'professor'; })[0] : null;
    if (!prof) { host.innerHTML = emptyNote(); return; }

    /* 대표 연락처와 같으면 members.js 에 중복 입력하지 않는다 (CLAUDE.md 0번) */
    var email  = prof.email  || SITE.email;
    var office = prof.office || SITE.address.short;
    var scholar = prof.scholar || SITE.links.scholar;

    var contact =
      '<dl class="mt-6 space-y-2 text-sm">' +
        '<div class="flex gap-3"><dt class="w-16 shrink-0 text-slate-400">' + esc(SITE.people.office) + '</dt>' +
          '<dd class="text-slate-700">' + esc(office) + '</dd></div>' +
        '<div class="flex gap-3"><dt class="w-16 shrink-0 text-slate-400">' + esc(SITE.people.email) + '</dt>' +
          '<dd><a class="break-all text-primary hover:underline" href="mailto:' + esc(email) + '">' + esc(email) + '</a></dd></div>' +
        '<div class="flex gap-3"><dt class="w-16 shrink-0 text-slate-400">' + esc(SITE.people.phone) + '</dt>' +
          '<dd><a class="text-slate-700 hover:text-primary" href="tel:' + esc(String(SITE.phone).replace(/[^+0-9]/g, '')) + '">' +
            esc(SITE.phone) + '</a></dd></div>' +
        (scholar
          ? '<div class="flex gap-3"><dt class="w-16 shrink-0 text-slate-400">' + esc(SITE.people.scholar) + '</dt>' +
            '<dd><a class="text-primary hover:underline" href="' + esc(scholar) + '" target="_blank" rel="noopener noreferrer">' +
              esc(SITE.people.viewProfile) + ' &rarr;</a></dd></div>'
          : '') +
      '</dl>';

    host.innerHTML =
      /* 위: 사진(크게) + 이름·소속·연락처 */
      '<div class="grid gap-8 md:grid-cols-3">' +
        '<div class="md:col-span-1">' +
          imageBox(prof.photo, prof.name, 'aspect-[3/4]', 'rounded-lg') +
        '</div>' +
        '<div class="md:col-span-2">' +
          '<h3 class="text-2xl font-bold text-slate-900 sm:text-3xl">' + esc(prof.name) + '</h3>' +
          '<p class="mt-1 text-base text-primary">' + esc(prof.title) + '</p>' +
          '<p class="mt-1 text-sm text-slate-500">' + esc(SITE.department) + ', ' + esc(SITE.university) + '</p>' +
          contact +
          (prof.interests
            ? '<p class="mt-6 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-600">' +
              esc(prof.interests) + '</p>'
            : '') +
        '</div>' +
      '</div>' +

      /* 아래: 학력 · 경력 · 학회 활동 · 학회 회원 · 초청강연 */
      '<div class="mt-10 border-t border-slate-200 pt-2">' +
        profileBlock(SITE.people.education,   bulletList(prof.education)) +
        profileBlock(SITE.people.career,      bulletList(prof.career)) +
        profileBlock(SITE.people.activities,  periodList(prof.activities, 'role')) +
        profileBlock(SITE.people.memberships, periodList(prof.memberships, null)) +
        profileBlock(SITE.people.talks,       talkList(prof.talks)) +
      '</div>';
  }

  /* --- 재학생 : 작은 카드 그리드 ----------------------------------------- */
  function peopleCurrent() {
    var host = document.getElementById('people-current');
    if (!host) return;

    var all = (typeof MEMBERS !== 'undefined') ? MEMBERS : [];
    var order = (typeof MEMBER_ROLE_ORDER !== 'undefined') ? MEMBER_ROLE_ORDER : [];

    var groups = order.map(function (role) {
      return { role: role, items: all.filter(function (m) { return m.role === role; }) };
    }).filter(function (g) { return g.items.length; });

    if (!groups.length) { host.innerHTML = emptyNote(); return; }

    host.innerHTML = groups.map(function (g) {
      var label = (typeof MEMBER_ROLE_LABELS !== 'undefined' && MEMBER_ROLE_LABELS[g.role]) || g.role;
      return '<div class="mt-10 first:mt-0">' +
        '<h3 class="mb-4 text-xs font-bold uppercase tracking-wider2 text-primary">' + esc(label) + '</h3>' +
        '<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">' +
          g.items.map(function (m) {
            return '<div class="card-hover overflow-hidden rounded-lg border border-slate-200 bg-white">' +
              imageBox(m.photo, m.name, 'aspect-[3/4]') +
              '<div class="p-4">' +
                '<p class="text-sm font-bold text-slate-900">' + esc(m.name) + '</p>' +
                (m.interests ? '<p class="mt-1.5 text-xs leading-relaxed text-slate-500">' + esc(m.interests) + '</p>' : '') +
                (m.email ? '<a class="mt-2 block break-all text-xs text-primary hover:underline" href="mailto:' +
                  esc(m.email) + '">' + esc(m.email) + '</a>' : '') +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* --- 졸업생 : 사진 없이 텍스트 목록 ------------------------------------ */
  function peopleAlumni() {
    var host = document.getElementById('people-alumni');
    if (!host) return;

    var list = (typeof MEMBERS !== 'undefined')
      ? MEMBERS.filter(function (m) { return m.role === 'alumni'; }) : [];

    if (!list.length) { host.innerHTML = emptyNote(); return; }

    list.sort(function (a, b) { return (b.gradYear || 0) - (a.gradYear || 0); });

    host.innerHTML = '<ul class="divide-y divide-slate-200">' + list.map(function (m) {
      var meta = [];
      if (m.title) meta.push(esc(m.title));
      if (m.currentPosition) meta.push(esc(m.currentPosition));

      return '<li class="py-4 sm:flex sm:gap-6">' +
        '<span class="block font-mono text-sm text-slate-400 sm:w-20 sm:shrink-0 sm:pt-0.5">' +
          esc(m.gradYear || '') + '</span>' +
        '<span class="block min-w-0">' +
          '<span class="text-sm font-semibold text-slate-900">' + esc(m.name) + '</span>' +
          (meta.length ? '<span class="ml-2 text-sm text-slate-500">' + meta.join(' &middot; ') + '</span>' : '') +
          (m.thesis ? '<span class="mt-1 block text-xs leading-relaxed text-slate-500">' +
            esc(SITE.people.thesis) + ': ' + esc(m.thesis) + '</span>' : '') +
        '</span>' +
      '</li>';
    }).join('') + '</ul>';
  }

  function people() {
    peopleProfessor();
    peopleCurrent();
    peopleAlumni();
  }

  /* =====================================================================
   * CONTACT
   *   #location  SITE 의 주소·전화·이메일·좌표를 쓴 오시는 길 + 지도 임베드
   *   #join      대학원생 모집 안내
   *
   * 지도는 별도 라이브러리 없이 iframe 임베드만 쓴다. (CLAUDE.md 3번)
   * =================================================================== */

  function mapEmbedUrl() {
    return 'https://www.google.com/maps?q=' + SITE.mapLat + ',' + SITE.mapLng +
           '&hl=ko&z=17&output=embed';
  }

  /* 길찾기 링크 — 좌표/주소를 넘기기만 하므로 API 키가 필요 없다 */
  function directionLinks() {
    var lat = SITE.mapLat, lng = SITE.mapLng;
    var links = [
      { label: 'Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng },
      { label: '카카오맵',     url: 'https://map.kakao.com/link/map/' + encodeURIComponent(SITE.labShort) + ',' + lat + ',' + lng },
      { label: '네이버지도',   url: 'https://map.naver.com/v5/search/' + encodeURIComponent(SITE.address.fullKo) }
    ];

    return '<div class="mt-6">' +
      '<p class="mb-2 text-xs font-bold uppercase tracking-wider2 text-primary">' +
        esc(SITE.ui.directions) + '</p>' +
      '<div class="flex flex-wrap gap-2">' +
        links.map(function (l) {
          return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"' +
            ' class="rounded-full border border-slate-300 px-3.5 py-1.5 text-sm text-slate-600 transition-colors hover:border-primary hover:text-primary">' +
            esc(l.label) + '</a>';
        }).join('') +
      '</div></div>';
  }

  function contactLocation() {
    var host = document.getElementById('contact-location');
    if (!host) return;

    var tel = String(SITE.phone || '').replace(/[^+0-9]/g, '');

    var info =
      '<dl class="space-y-5 text-sm">' +
        '<div>' +
          '<dt class="text-xs font-bold uppercase tracking-wider2 text-primary">' + esc(SITE.ui.address) + '</dt>' +
          '<dd class="mt-1.5 leading-relaxed text-slate-700">' + esc(SITE.address.full) + '</dd>' +
          '<dd class="mt-1 leading-relaxed text-slate-500">' + esc(SITE.address.fullKo) + '</dd>' +
        '</div>' +
        '<div>' +
          '<dt class="text-xs font-bold uppercase tracking-wider2 text-primary">' + esc(SITE.ui.phone) + '</dt>' +
          '<dd class="mt-1.5"><a class="text-slate-700 hover:text-primary" href="tel:' + esc(tel) + '">' +
            esc(SITE.phone) + '</a></dd>' +
        '</div>' +
        '<div>' +
          '<dt class="text-xs font-bold uppercase tracking-wider2 text-primary">' + esc(SITE.ui.email) + '</dt>' +
          '<dd class="mt-1.5"><a class="break-all text-primary hover:underline" href="mailto:' + esc(SITE.email) + '">' +
            esc(SITE.email) + '</a></dd>' +
        '</div>' +
      '</dl>' +
      directionLinks();

    host.innerHTML =
      '<div class="grid gap-8 lg:grid-cols-5">' +
        '<div class="lg:col-span-3">' +
          '<div class="aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 sm:aspect-[16/10]">' +
            '<iframe src="' + esc(mapEmbedUrl()) + '" title="' + esc(SITE.labName) + '"' +
              ' class="h-full w-full" style="border:0"' +
              ' loading="lazy" referrerpolicy="no-referrer-when-downgrade"' +
              ' allowfullscreen></iframe>' +
          '</div>' +
        '</div>' +
        '<div class="lg:col-span-2">' + info + '</div>' +
      '</div>';
  }

  function contactJoin() {
    var host = document.getElementById('contact-join');
    if (!host) return;

    host.innerHTML =
      '<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">' +
        esc(SITE.home.joinTitle) + '</h2>' +
      '<p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">' +
        esc(SITE.home.joinLead) + '</p>' +
      '<a href="mailto:' + esc(SITE.email) + '"' +
        ' class="mt-8 inline-block rounded bg-white px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-slate-100">' +
        esc(SITE.email) + '</a>';
  }

  function contact() {
    contactLocation();
    contactJoin();
  }

  /* =====================================================================
   * NEWS
   *   날짜 + 1~3문장이 시간순으로 누적되는 피드. 연도별 구분선.
   *   게시판·상세페이지·페이지네이션을 만들지 않는다. (CLAUDE.md 7번)
   * =================================================================== */

  function newsItem(n) {
    var label = (SITE.newsCategories && SITE.newsCategories[n.category]) || n.category || '';

    var body = esc(n.text);
    if (n.link) {
      body = '<a href="' + esc(n.link) + '" target="_blank" rel="noopener noreferrer"' +
             ' class="underline-offset-2 hover:text-primary hover:underline">' + body + '</a>';
    }

    return '<li class="flex gap-4 py-5">' +
      (n.image
        ? '<img src="' + esc(n.image) + '" alt="" loading="lazy" data-fallback' +
          ' class="h-16 w-16 shrink-0 rounded object-cover sm:h-20 sm:w-20">'
        : '') +
      '<div class="min-w-0">' +
        '<div class="flex flex-wrap items-center gap-2">' +
          '<time class="font-mono text-xs text-slate-500">' + esc(Util.formatDate(n.date)) + '</time>' +
          (label ? '<span class="rounded bg-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-primary">' +
            esc(label) + '</span>' : '') +
        '</div>' +
        '<p class="mt-1.5 text-sm leading-relaxed text-slate-700">' + body + '</p>' +
      '</div>' +
    '</li>';
  }

  function news() {
    var host = document.getElementById('news-feed');
    if (!host) return;

    var list = (typeof NEWS !== 'undefined') ? NEWS.slice() : [];
    if (!list.length) { host.innerHTML = emptyNote(); return; }

    list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });

    /* 연도별로 묶어 구분선을 넣는다 */
    var order = [], map = {};
    list.forEach(function (n) {
      var y = Util.yearOf(n.date);
      if (!map[y]) { map[y] = []; order.push(y); }
      map[y].push(n);
    });

    host.innerHTML = order.map(function (y) {
      return '<div class="mt-10 first:mt-0">' +
        '<h2 class="border-b-2 border-primary pb-1 font-mono text-lg font-bold text-primary">' +
          esc(y) + '</h2>' +
        '<ul class="divide-y divide-slate-200">' + map[y].map(newsItem).join('') + '</ul>' +
      '</div>';
    }).join('');
  }

  /* =====================================================================
   * GALLERY
   *   앨범 단위 격자 + 클릭 시 라이트박스.
   *   모든 이미지에 loading="lazy". (CLAUDE.md 7·8번)
   * =================================================================== */

  function albumImages(album) {
    return (album.images || []).filter(function (im) { return im && im.src; });
  }

  function albumCover(album) {
    if (album.cover) return album.cover;
    var imgs = albumImages(album);
    return imgs.length ? imgs[0].src : '';
  }

  function gallery() {
    var host = document.getElementById('gallery-albums');
    if (!host) return;

    var list = (typeof GALLERY !== 'undefined') ? GALLERY.slice() : [];
    if (!list.length) { host.innerHTML = emptyNote(); return; }

    list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });

    host.innerHTML = list.map(function (al, i) {
      var count = albumImages(al).length;
      return '<button type="button" class="js-album card-hover block overflow-hidden rounded-lg border border-slate-200 bg-white text-left"' +
        ' data-album="' + i + '">' +
        imageBox(albumCover(al), al.title, 'aspect-[4/3]') +
        '<div class="p-4">' +
          '<p class="text-sm font-bold text-slate-900">' + esc(al.title) + '</p>' +
          '<p class="mt-1 flex items-center gap-2 text-xs text-slate-500">' +
            '<time>' + esc(Util.formatDate(al.date)) + '</time>' +
            (count ? '<span aria-hidden="true">&middot;</span><span>' + esc(count) + '</span>' : '') +
          '</p>' +
        '</div>' +
      '</button>';
    }).join('');

    bindLightbox(list);
  }

  /* --- 라이트박스 (외부 라이브러리 없이) --------------------------------- */
  function bindLightbox(albums) {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var images = [], index = 0;

    function paint() {
      var im = images[index];
      if (!im) return;
      box.querySelector('[data-lb-img]').src = im.src;
      box.querySelector('[data-lb-img]').alt = im.caption || '';
      box.querySelector('[data-lb-caption]').textContent = im.caption || '';
      box.querySelector('[data-lb-count]').textContent = (index + 1) + ' / ' + images.length;
      box.querySelector('[data-lb-prev]').hidden = images.length < 2;
      box.querySelector('[data-lb-next]').hidden = images.length < 2;
    }

    function open(albumIndex) {
      images = albumImages(albums[albumIndex]);
      if (!images.length) return;
      index = 0;
      paint();
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      box.querySelector('[data-lb-close]').focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function step(delta) {
      if (!images.length) return;
      index = (index + delta + images.length) % images.length;
      paint();
    }

    var buttons = document.querySelectorAll('.js-album');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        open(Number(this.getAttribute('data-album')));
      });
    }

    box.querySelector('[data-lb-close]').addEventListener('click', close);
    box.querySelector('[data-lb-prev]').addEventListener('click', function () { step(-1); });
    box.querySelector('[data-lb-next]').addEventListener('click', function () { step(1); });

    /* 배경(사진 바깥)을 누르면 닫는다 */
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape' || e.keyCode === 27) close();
      else if (e.key === 'ArrowLeft'  || e.keyCode === 37) step(-1);
      else if (e.key === 'ArrowRight' || e.keyCode === 39) step(1);
    });
  }
  /* TODO: contact  — 지도 임베드 + 모집 안내 */

  return {
    home: home,
    publications: publications,
    research: research,
    people: people,
    contact: contact,
    news: news,
    gallery: gallery,

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
