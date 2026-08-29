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
   * 섹션 탭
   * 한 페이지 안에서 한 번에 한 섹션만 보여 준다.
   *
   *   config.tabs = [{ key, label, count, all }]
   *     key   그 섹션의 id 와 같아야 한다
   *     count 있으면 라벨 옆에 숫자를 붙인다
   *     all   true 면 모든 섹션을 함께 보여 주는 탭
   *
   * 주소의 #해시와 연동되므로 상단 드롭다운에서 바로 해당 탭으로 들어온다.
   * 페이지에 <div id="page-tabs"></div> 를 두면 그 자리에 그려진다.
   * =================================================================== */

  /* 알약 탭 모양. sectionTabs 와 linkTabs 가 같은 값을 쓴다 */
  var TAB_BAR  = 'border-b border-slate-200 bg-white';
  var TAB_WRAP = '<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">' +
                 '<div class="flex gap-2 overflow-x-auto py-3">';
  var TAB_BASE = 'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ';
  var TAB_ON   = 'border-primary bg-primary text-white';
  var TAB_OFF  = 'border-slate-300 text-slate-600 hover:border-primary hover:text-primary';

  function tabCount(n) {
    return (n === undefined || n === null) ? ''
      : ' <span class="font-mono text-xs opacity-70">' + esc(n) + '</span>';
  }

  /* --- 페이지를 오가는 탭 -------------------------------------------
   * NEWS 하위의 News · Gallery 처럼 두 항목이 서로 다른 파일일 때 쓴다.
   * sectionTabs 는 한 페이지 안의 섹션을 숨기고 보이는 방식이라
   * 파일이 다르면 쓸 수 없다. 여기서는 그냥 링크를 그리고
   * 지금 보고 있는 페이지만 켜 둔다.
   * ------------------------------------------------------------------- */
  function linkTabs(items) {
    var host = document.getElementById('page-tabs');
    if (!host || !items || !items.length) return;

    var here = Util.currentFile();

    host.className = TAB_BAR;
    host.innerHTML = TAB_WRAP +
      items.map(function (t) {
        var on = Util.fileOf(t.href) === here;
        return '<a href="' + esc(t.href) + '" class="' + TAB_BASE +
          (on ? TAB_ON : TAB_OFF) + '"' + (on ? ' aria-current="page"' : '') + '>' +
          esc(t.label) + tabCount(t.count) + '</a>';
      }).join('') +
      '</div></div>';
  }

  function sectionTabs(config) {
    var host = document.getElementById('page-tabs');
    if (!host) return;

    var tabs = config.tabs || [];
    if (!tabs.length) return;

    var keys = tabs.map(function (t) { return t.key; });

    /* 고정하지 않는다. 상단 메뉴만 따라오고 탭은 스크롤과 함께 올라간다 */
    host.className = TAB_BAR;
    host.innerHTML = TAB_WRAP +
      tabs.map(function (t) {
        return '<button type="button" class="js-tab ' + TAB_BASE + '"' +
          ' data-tab="' + esc(t.key) + '">' + esc(t.label) + tabCount(t.count) + '</button>';
      }).join('') +
      '</div></div>';

    function apply(key) {
      tabs.forEach(function (t) {
        if (t.all) return;
        var sec = document.getElementById(t.key);
        if (sec) sec.hidden = !(key === 'all' || key === t.key);
      });

      var btns = document.querySelectorAll('.js-tab');
      for (var i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute('data-tab') === key;
        btns[i].className = 'js-tab ' + TAB_BASE + (on ? TAB_ON : TAB_OFF);
        btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      /* 주소를 맞춰 두면 새로고침이나 링크 공유에도 같은 탭이 열린다.
         history 를 늘리지 않도록 replaceState 를 쓴다 (hashchange 도 발생하지 않는다).
         file:// 에서는 막힐 수 있어 실패해도 넘어간다. */
      /* 단, load 전에 해시를 넣으면 브라우저가 load 시점에 그 섹션으로
         스크롤해 버린다. 문서가 다 열린 뒤에 넣는다. */
      function syncHash() {
        try {
          window.history.replaceState(null, '', key === 'all' ? window.location.pathname : '#' + key);
        } catch (e) { /* 무시 */ }
      }

      if (document.readyState === 'complete') syncHash();
      else window.addEventListener('load', syncHash, { once: true });

      /* 주소가 바뀌었으니 상단 메뉴의 활성 표시도 맞춘다 */
      if (typeof Layout !== 'undefined' && Layout.refresh) Layout.refresh();

      /* 새로 드러난 섹션의 연출 대상을 다시 잡는다 */
      if (typeof Anim !== 'undefined' && Anim.refresh) Anim.refresh();

      if (config.onApply) config.onApply(key);
    }

    var btns = document.querySelectorAll('.js-tab');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { apply(this.getAttribute('data-tab')); });
    }

    var hash = ((typeof INITIAL_HASH !== 'undefined' && INITIAL_HASH) ||
                window.location.hash || '').replace('#', '');
    apply(keys.indexOf(hash) !== -1 ? hash : (config.defaultKey || keys[0]));

    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').replace('#', '');
      if (keys.indexOf(h) !== -1) apply(h);
    });
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

  /* PUBLICATIONS 에서 짚는 저자는 지도교수 한 명뿐이다.
     학생까지 굵게 하면 한 줄에 강조가 여럿 개씩 생겨 누가 연구실 사람인지 분별이 안 된다.
     학생 개인 강조는 프로필 창에서만, boldAuthors 의 only 로 따로 준다.
     성(姓)만으로 비교하면 동성이인(예: 다른 Park)까지 굵어지므로
     반드시 이름 전체 형태로 대조한다. */
  var tokenCache = null;

  function professorTokens() {
    if (tokenCache) return tokenCache;

    tokenCache = {};
    if (typeof MEMBERS === 'undefined') return tokenCache;

    MEMBERS.filter(function (m) { return m.role === 'professor'; }).forEach(function (m) {
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

  /* 이름 뒤에 붙은 역할 표기를 이름과 분리한다.
   *   †  주저자 (공동 주저자면 여러 명에 붙는다)
   *   *  교신저자 (공동 교신저자도 같은 표기)
   * 표기는 data/publications.js 의 authors 문자열에 직접 적혀 있다. */
  function splitMarks(seg) {
    var m = seg.match(/^([\s\S]*?)([\u2020\u2021*]+)\s*$/);
    return m ? { name: m[1], marks: m[2] } : { name: seg, marks: '' };
  }

  /* 구성원 한 명이 쓸 수 있는 이름 표기들 */
  function tokensOf(m) {
    var t = {};
    var raw = String((m && m.name) || '');
    var ko = (raw.match(/\(([^)]+)\)/) || [])[1] || '';
    var en = raw.replace(/\([^)]*\)/, '').replace(/^\s+|\s+$/g, '');

    if (ko) t[normalizeName(ko)] = true;
    if (en) {
      t[normalizeName(en)] = true;
      var parts = en.split(/\s+/);
      if (parts.length > 1) {
        var last = parts.pop();
        var initials = parts.join('-').split('-').map(function (w) {
          return w.charAt(0);
        }).join('');
        t[normalizeName(initials + last)] = true;
      }
    }
    return t;
  }

  /* only 를 넘기면 그 사람만, 안 넘기면 모든 구성원을 짚는다.
     style 은 'member'(굵게+밑줄) 또는 'self'(굵게+파란색) */
  function boldAuthors(authors, only, style) {
    if (!authors) return '';
    var tokens = only ? tokensOf(only) : professorTokens();
    var hitCls = 'font-bold text-slate-900 underline decoration-slate-400'
      + ' decoration-1 underline-offset-2';

    return String(authors).split(',').map(function (seg) {
      var part = splitMarks(seg);

      /* 이름 앞뒤의 공백은 밑줄 밖으로 빼둔다.
         안 그러면 쉼표 뒤 띄어쓰기까지 줄이 그어진다 */
      var lead  = (part.name.match(/^\s*/) || [''])[0];
      var trail = (part.name.match(/\s*$/) || [''])[0];
      var bare  = part.name.slice(lead.length, part.name.length - trail.length);

      var hit = tokens[normalizeName(bare)] === true;

      var html = lead + (hit
        ? '<strong class="' + hitCls + '">' + esc(bare) + '</strong>'
        : esc(bare));

      if (part.marks) {
        html += '<sup class="ml-px text-[0.7em] font-bold text-primary">' +
                esc(part.marks) + '</sup>';
      }
      return html + trail;
    }).join(',');
  }

  /* 게재 당시의 저널 지표. 채워진 값만 모아 대괄호로 묶는다.
   *   [IF 8.9, JCR top 3.3% (6/182), Q1]
   * 순위·분위는 연도별 JCR 자료가 생기면 데이터에 채우기만 하면 된다. */
  function journalMetrics(p) {
    var bits = [];

    if (p.impact) bits.push('IF ' + esc(p.impact));

    if (p.jcrTop) {
      bits.push('JCR top ' + esc(p.jcrTop) + '%' +
        (p.jcrRank ? ' (' + esc(p.jcrRank) + ')' : ''));
    } else if (p.jcrRank) {
      bits.push('JCR ' + esc(p.jcrRank));
    }

    if (p.jcrQuartile) bits.push(esc(p.jcrQuartile));

    if (!bits.length) return '';

    /* Q1 · Q2 일 때만 색으로 짚어 눈에 들어오게 하고,
       그 외에는 앞의 서지 정보와 같은 톤으로 둔다 */
    var top = (p.jcrQuartile === 'Q1' || p.jcrQuartile === 'Q2');
    var cls = top ? 'font-semibold text-accent' : 'text-slate-500';

    return '<span class="ml-1.5 whitespace-nowrap ' + cls + '">[' +
           bits.join(', ') + ']</span>';
  }

  /* 논문 한 건 */
  function publicationItem(p, only, style) {
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
      '<p class="mt-1 text-sm text-slate-600">' + boldAuthors(p.authors, only, style) + '</p>' +
      (meta.length
        ? '<p class="mt-0.5 text-xs text-slate-500">' + meta.join(', ') +
          journalMetrics(p) + '</p>'
        : '') +
    '</li>';
  }

  /* =====================================================================
   * HOME
   * =================================================================== */

  /* 1. 히어로 — 문구는 SITE 에서 온다.
        tagline 은 <strong> 을 허용하므로 innerHTML 로 넣는다. (CLAUDE.md 9번) */
  /* 히어로 제목 — 의미 덩어리가 중간에서 끈기지 않게 한다.
     각 조각을 whitespace-nowrap 으로 묶으면 폭이 넘칠 때
     조각 사이에서만 줄이 나뉘고, 넓은 화면에서는 한 줄로 붙는다 */
  function heroTitle() {
    var el = document.querySelector('[data-hero-title]');
    if (!el) return;

    var parts = SITE.labNameLines || [];
    /* 조각을 합친 것이 이름과 다르면 손대지 않고 이름을 그대로 쓴다 */
    if (parts.join(' ') !== SITE.labName) {
      el.textContent = SITE.labName;
      return;
    }

    el.innerHTML = parts.map(function (p) {
      return '<span class="whitespace-nowrap">' + esc(p) + '</span>';
    }).join(' ');
  }

  function homeHero() {
    var setText = function (sel, value) {
      var el = document.querySelector(sel);
      if (el) el.textContent = value;
    };

    heroTitle();

    setText('[data-hero-scroll]', SITE.ui.scrollDown);

    var tagline = document.querySelector('[data-hero-tagline]');
    if (tagline) tagline.innerHTML = SITE.tagline;   /* <strong> 허용 */
  }

  /* 2. 연구분야 요약 */
  function homeResearch() {
    var host = document.getElementById('home-research');
    if (!host) return;
    if (typeof RESEARCH === 'undefined' || !RESEARCH.length) { host.innerHTML = emptyNote(); return; }

    host.innerHTML = RESEARCH.map(function (a) {
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

  /* 함께하실 분 — 제목줄은 homeHeadings 가 그리고 여기서는 요약만.
     자세한 안내는 CONTACT 의 Join Us 탭에 있고, 제목줄의 View all 이 그리로 보낸다. */
  function homeJoin() {
    var host = document.getElementById('home-join');
    if (!host) return;

    var J = SITE.join;

    host.innerHTML =
      '<div class="reveal">' +
        '<p class="max-w-2xl text-sm font-semibold leading-relaxed text-slate-900 sm:text-base">' +
          esc(J.heading) + '</p>' +
        ((J.highlights && J.highlights.length)
          ? '<ul class="mt-6 space-y-2.5">' +
              J.highlights.map(function (v) {
                return '<li class="flex gap-2.5 text-sm leading-relaxed text-slate-700">' +
                  '<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-mid"></span>' +
                  '<span>' + esc(v) + '</span></li>';
              }).join('') +
            '</ul>'
          : '') +
      '</div>';
  }

  /* 섹션 제목들 (문구는 SITE.home 에서) */
  function homeHeadings() {
    var map = [
      ['home-research-head', SITE.home.researchTitle, SITE.home.researchLead, 'research.html#areas'],
      ['home-professor-head', SITE.home.professorTitle, '', ''],
      ['home-stats-head', SITE.home.statsTitle, '', ''],
      ['home-news-head', SITE.home.newsTitle, '', 'news.html'],
      ['home-papers-head', SITE.home.papersTitle, '', 'publications.html'],
      ['home-join-head', SITE.join.title, '', 'join.html']
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
   *   상단 필터 [Journal] [Conference] [Patent] — 한 번에 하나만 보인다
   *   종류마다 한 번 더 나눈 뒤 연도별로 묶는다
   *   연도 안에서는 Early Access → date 내림차순 → 날짜 미상 순 (comparePubs)
   *     저널 · 학술대회  International / Domestic  (domestic 값)
   *     특허              Registered / Application  (patentNo 유무)
   *   나누는 기준은 PUB_SPLITS, 제목 문구는 SITE.pubGroups 에 있다
   *   DOI 가 있으면 제목이 링크, 구성원 이름은 굵게 (publicationItem 담당)
   * =================================================================== */

  /* 아직 호가 정해지지 않은 온라인 선공개.
   * detail 에 적힌 말로 판단한다 — 같은 사실을 두 곳에 적지 않기 위해서다 */
  function isEarlyAccess(p) {
    return /early\s*access/i.test(p.detail || '');
  }

  /* 같은 연도 안에서의 자리. 큰 값이 위로 온다 */
  function pubRank(p) {
    if (isEarlyAccess(p)) return 2;   /* 아직 게재 전 — 가장 최근 */
    return p.date ? 1 : 0;            /* 날짜를 모르는 항목은 맨 아래 */
  }

  /* 연도 내림차순 → Early Access → 날짜 내림차순 */
  function comparePubs(a, b) {
    if (a.year !== b.year) return b.year - a.year;

    var ra = pubRank(a), rb = pubRank(b);
    if (ra !== rb) return rb - ra;

    if (ra === 1 && a.date !== b.date) return a.date < b.date ? 1 : -1;
    return 0;
  }

  function pubsOf(type) {
    if (typeof PUBLICATIONS === 'undefined') return [];
    return PUBLICATIONS.filter(function (p) { return p.type === type; })
      .sort(comparePubs);
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

  /* --- 접었다 펴는 덩어리 -------------------------------------------
   * 버튼을 누르면 바로 다음 형제 요소가 열리고 닫힌다.
   * 클릭 처리는 문서에 한 번만 걸어 둔다 (bindDisclosure).
   * JS 가 안 돌아도 내용이 숨지 않도록, 닫힌 상태는 JS 가 부여한다.
   * ----------------------------------------------------------------- */
  var CHEV = '<svg class="js-chev h-4 w-4 shrink-0 transition-transform" fill="none"' +
    ' stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>';

  function disclosure(headInner, headCls, bodyHTML, open) {
    return '<button type="button" class="js-disclose ' + headCls + '"' +
        ' aria-expanded="' + (open ? 'true' : 'false') + '">' +
        headInner + CHEV +
      '</button>' +
      '<div class="js-panel"' + (open ? '' : ' hidden') + '>' + bodyHTML + '</div>';
  }

  var discloseBound = false;
  function bindDisclosure() {
    if (discloseBound) return;
    discloseBound = true;

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('.js-disclose');
      if (!btn) return;

      var panel = btn.nextElementSibling;
      if (!panel || panel.className.indexOf('js-panel') < 0) return;

      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;

      var chev = btn.querySelector('.js-chev');
      if (chev) chev.style.transform = open ? '' : 'rotate(180deg)';
    });
  }

  /* 연도별 덩어리. 최신 연도부터 */
  /* 올해 것만 펼쳐 두고, 지난 연도는 한 덩어리로 묶어 접는다.
     연도마다 따로 펼쳐야 하면 예전 논문을 훑는 데 손이 너무 많이 간다.
     해마다 고칠 필요가 없도록 오늘 날짜에서 기준을 잡는다 */
  function openFromYear() { return new Date().getFullYear(); }

  var PUB_HEAD_CLS = 'flex w-full items-center gap-2 border-b-2 border-primary pb-1 text-left' +
    ' text-primary transition-colors hover:text-primary-dark';

  function pubHead(label, count) {
    return '<span class="font-mono text-lg font-bold text-primary">' + esc(label) + '</span>' +
      '<span class="font-mono text-sm font-semibold text-slate-400">' + esc(count) + '</span>' +
      '<span class="ml-auto"></span>';
  }

  function pubItems(items) {
    return '<ul class="divide-y divide-slate-200">' +
      items.map(function (p) { return publicationItem(p); }).join('') + '</ul>';
  }

  function yearBlocks(list) {
    var openFrom = openFromYear();
    var groups = groupByYear(list);

    var thisYear = groups.filter(function (g) { return Number(g.year) >= openFrom; });
    var past     = groups.filter(function (g) { return Number(g.year) <  openFrom; });

    var html = thisYear.map(function (g) {
      return '<div class="mt-8 first:mt-0">' +
        disclosure(pubHead(g.year, g.items.length), PUB_HEAD_CLS, pubItems(g.items), true) +
      '</div>';
    }).join('');

    if (!past.length) return html;

    /* 묶음 안은 연도 소제목 없이 한 목록으로 이어 붙인다.
       이미 최신순으로 정렬되어 있어 순서는 그대로 유지된다 */
    var items = past.reduce(function (acc, g) { return acc.concat(g.items); }, []);

    /* 라벨은 묶음 안의 최근 연도가 아니라 항상 작년이다.
       그래야 탭을 옮겨도(예: 특허) 같은 문구가 나온다 */
    var label = String((SITE.ui && SITE.ui.pubEarlier) || '~{year}')
      .replace('{year}', openFrom - 1);

    /* 올해 것이 하나도 없으면(예: 특허) 이 묶음을 펼쳐 둔다.
       안 그러면 탭을 열자마자 빈 화면처럼 보인다 */
    return html + '<div class="mt-8 first:mt-0">' +
      disclosure(pubHead(label, items.length), PUB_HEAD_CLS, pubItems(items), !html) +
    '</div>';
  }

  /* 종류마다 나누는 기준이 다르다. 키는 SITE.pubGroups 의 키와 같다.
   * 순서대로 화면에 나타난다 */
  var PUB_SPLITS = {
    journal: [
      { key: 'international', test: function (p) { return !p.domestic; } },
      { key: 'domestic',      test: function (p) { return !!p.domestic; } }
    ],
    conference: [
      { key: 'international', test: function (p) { return !p.domestic; } },
      { key: 'domestic',      test: function (p) { return !!p.domestic; } }
    ],
    patent: [
      { key: 'registered',  test: function (p) { return !!p.patentNo; } },
      { key: 'application', test: function (p) { return !p.patentNo; } }
    ]
  };

  /* 나눠진 묶음이 이 페이지의 큰 제목이다. 그 안에서 다시 연도별로 묶는다.
   * 비어 있는 묶음은 제목째 그리지 않는다 (빈 섹션 노출 금지) */
  function groupBlocks(type, list) {
    var labels = (SITE.pubGroups && SITE.pubGroups[type]) || {};
    var splits = PUB_SPLITS[type];
    if (!splits) return yearBlocks(list);

    return splits.map(function (sp) {
      return { key: sp.key, items: list.filter(sp.test) };
    }).filter(function (g) { return g.items.length; })
     .map(function (g, i) {
       /* 특허에는 주저자·교신저자 개념이 없어 범례를 달지 않는다 */
       var legend = (i === 0 && type !== 'patent') ? legendHTML() : '';

       return '<section class="reveal mt-16 first:mt-0">' +
         '<h2 class="mb-8 flex flex-wrap items-baseline gap-x-3 text-2xl font-bold' +
           ' tracking-tight text-slate-900 sm:text-3xl">' +
           esc(labels[g.key] || g.key) +
           '<span class="font-mono text-base font-semibold text-slate-400">' +
             esc(g.items.length) + '</span>' +
           legend +
         '</h2>' +
         yearBlocks(g.items) +
       '</section>';
     }).join('');
  }

  function renderPubType(type) {
    var host = document.getElementById('pub-' + type);
    if (!host) return 0;

    var list = pubsOf(type);
    if (!list.length) { host.innerHTML = emptyNote(); return 0; }

    host.innerHTML = groupBlocks(type, list);

    return list.length;
  }

  /* 저자 표기 안내. 문구는 SITE.pubMarks 에서 온다.
     줄을 따로 두지 않고 첫 묶음 제목의 오른쪽에 붙인다.
     위에 한 줄을 더 두면 범례가 없는 특허 탭과 제목 위치가 어긋난다 */
  function legendHTML() {
    var list = SITE.pubMarks || [];
    if (!list.length) return '';

    return '<span class="ml-auto flex flex-wrap gap-x-4 gap-y-1' +
      ' text-xs font-normal text-slate-500">' +
      list.map(function (m) {
        return '<span><sup class="text-[0.9em] font-bold text-primary">' +
          esc(m.mark) + '</sup> ' + esc(m.label) + '</span>';
      }).join('') +
    '</span>';
  }

  function publications() {
    var counts = {};
    PUBLICATION_TYPES.forEach(function (t) { counts[t] = renderPubType(t); });

    /* 한 번에 한 종류만 보여 준다. 첫 탭(Journal)이 기본이다 */
    sectionTabs({
      tabs: PUBLICATION_TYPES.map(function (t) {
        return { key: t, label: SITE.submenu[t], count: counts[t] };
      })
    });

    bindDisclosure();
  }

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
  /* 세부 주제 목록. 비어 있으면 아무것도 그리지 않는다 */
  function topicList(items) {
    if (!items || !items.length) return '';
    return '<ul class="mt-4 space-y-1.5 text-sm leading-relaxed text-slate-600">' +
      items.map(function (t) {
        return '<li class="flex gap-2.5">' +
          '<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-mid"></span>' +
          '<span>' + esc(t) + '</span></li>';
      }).join('') + '</ul>';
  }

  /* 응용 대상 — 방법론과 직교하는 축이라 분야 카드와 따로 보여 준다 */
  function researchApplications() {
    var host = document.getElementById('research-applications');
    if (!host) return;
    if (typeof APPLICATIONS === 'undefined' || !APPLICATIONS.length) {
      host.innerHTML = emptyNote(); return;
    }

    host.innerHTML = APPLICATIONS.map(function (g) {
      return '<div class="reveal">' +
        '<h3 class="text-sm font-bold uppercase tracking-wider2 text-primary">' +
          esc(g.group) + '</h3>' +
        '<div class="mt-3 flex flex-wrap gap-1.5">' +
          (g.items || []).map(function (t) {
            return '<span class="rounded-full bg-slate-100 px-3 py-1.5 text-xs' +
              ' leading-tight text-slate-700">' + esc(t) + '</span>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function researchAreas() {
    var host = document.getElementById('research-areas');
    if (!host) return;
    if (typeof RESEARCH === 'undefined' || !RESEARCH.length) { host.innerHTML = emptyNote(); return; }

    /* 목록은 요약만 보여 준다. 자세한 내용은 research-area.html 이 맡는다.
       분야 수가 홀수라 격자로 놓으면 빈 칸이 생겨, 가로형 행으로 나열한다 */
    host.innerHTML = '<div class="space-y-5">' +
      RESEARCH.map(function (a) {
        return '<a href="research-area.html#' + esc(a.id) + '"' +
          ' class="reveal card-hover group grid overflow-hidden rounded-lg' +
          ' border border-slate-200 bg-white md:grid-cols-5">' +
          '<div class="md:col-span-2">' +
            imageBox(a.image, a.title, 'aspect-[16/10] md:aspect-auto md:h-full', '') +
          '</div>' +
          '<div class="flex flex-col p-5 sm:p-6 md:col-span-3">' +
            '<h3 class="text-lg font-bold leading-snug text-slate-900' +
              ' transition-colors group-hover:text-primary">' + esc(a.title) + '</h3>' +
            '<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">' + esc(a.summary) + '</p>' +
            '<span class="mt-4 text-sm font-semibold text-primary">' +
              esc(SITE.ui.readMore) + ' →</span>' +
          '</div>' +
        '</a>';
      }).join('') + '</div>';
  }

  /* --- 연구분야 상세 (research-area.html) -------------------------------
     주소의 #해시로 어느 분야인지 고른다. 해시가 없거나 모르는 값이면 첫 분야.
     common.js 가 해시를 INITIAL_HASH 로 떼어 두므로 그쪽을 먼저 본다 */
  function researchAreaDetail() {
    var host = document.getElementById('area-detail');
    if (!host) return;
    if (typeof RESEARCH === 'undefined' || !RESEARCH.length) { host.innerHTML = emptyNote(); return; }

    var hash = (typeof INITIAL_HASH !== 'undefined' && INITIAL_HASH) || window.location.hash;
    var id = String(hash).replace(/^#/, '');

    var idx = 0;
    RESEARCH.forEach(function (a, i) { if (a.id === id) idx = i; });
    var a = RESEARCH[idx];

    /* 제목 밴드는 RESEARCH 라 두고, 분야 이름은 본문 제목으로 세운다 */
    document.title = a.title + ' | ' + SITE.labName;

    var extra = (a.images || []).map(function (im) {
      return '<figure class="reveal">' +
        imageBox(im.src, im.caption || a.title, 'aspect-[4/3]', 'rounded-lg') +
        (im.caption ? '<figcaption class="mt-2 text-xs text-slate-500">' +
          esc(im.caption) + '</figcaption>' : '') +
      '</figure>';
    }).join('');

    var prev = RESEARCH[(idx - 1 + RESEARCH.length) % RESEARCH.length];
    var next = RESEARCH[(idx + 1) % RESEARCH.length];
    var navBtn = function (t, label, arrow, right) {
      return '<a href="research-area.html#' + esc(t.id) + '"' +
        ' class="flex max-w-[48%] flex-col gap-1 rounded-lg border border-slate-200 p-4' +
        ' transition-colors hover:border-primary' + (right ? ' text-right' : '') + '">' +
        '<span class="text-xs text-slate-500">' + esc(arrow) + ' ' + esc(label) + '</span>' +
        '<span class="text-sm font-semibold text-slate-900">' + esc(t.title) + '</span></a>';
    };

    host.innerHTML =
      '<div class="reveal">' +
        '<a href="research.html#areas" class="text-sm font-medium text-primary' +
          ' transition-colors hover:text-primary-dark">← ' +
          esc(SITE.sectionTitles.areas) + '</a>' +
        '<h1 class="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">' +
          esc(a.title) + '</h1>' +
        '<p class="mt-3 max-w-3xl text-base leading-relaxed text-primary">' + esc(a.summary) + '</p>' +
      '</div>' +

      '<div class="reveal mt-8">' + imageBox(a.image, a.title, 'aspect-[21/9]', 'rounded-lg') + '</div>' +

      '<div class="mt-10 grid gap-10 lg:grid-cols-3">' +
        '<div class="reveal lg:col-span-2 space-y-3 text-sm leading-relaxed text-slate-600">' +
          paragraphs(a.description) +
        '</div>' +
        '<div class="reveal">' +
          '<h2 class="text-sm font-bold uppercase tracking-wider2 text-slate-500">' +
            esc(SITE.ui.topics) + '</h2>' +
          topicList(a.topics) +
        '</div>' +
      '</div>' +

      (extra ? '<div class="mt-12 grid gap-6 sm:grid-cols-2">' + extra + '</div>' : '') +

      '<nav class="mt-14 flex justify-between gap-4 border-t border-slate-200 pt-8"' +
        ' aria-label="' + esc(SITE.sectionTitles.areas) + '">' +
        navBtn(prev, SITE.ui.prevArea, '←', false) +
        navBtn(next, SITE.ui.nextArea, '→', true) +
      '</nav>';
  }

  /* --- 연구장비 --------------------------------------------------------- */
  function researchEquipment() {
    var host = document.getElementById('research-equipment');
    if (!host) return;

    var list = (typeof EQUIPMENT !== 'undefined') ? EQUIPMENT : [];
    if (!list.length) { host.innerHTML = emptyNote(); return; }

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
  /* 사업명이 짧으면 기관명 옆에 붙이고, 길면 다음 줄로 내린다.
   * 한 줄로 끝나면 그만큼 로고가 차지할 세로 공간이 생긴다. */
  var PROGRAM_INLINE_MAX = 10;

  function sponsorHead(p) {
    var name = (p.sponsor && p.sponsor.name) || '';
    if (!name) return '';

    var prog = p.program || '';
    var inline = prog && prog.length <= PROGRAM_INLINE_MAX;

    var out = '<p class="text-xs font-semibold leading-snug text-slate-600">' + esc(name) +
      (inline
        ? '<span class="font-normal text-slate-400"> \u00b7 ' + esc(prog) + '</span>'
        : '') +
      '</p>';

    if (prog && !inline) {
      out += '<p class="mt-0.5 break-keep text-[11px] leading-tight text-slate-400">' +
             esc(prog) + '</p>';
    }
    return out;
  }

  /* 기관명이 이미 적혀 있으므로 alt 는 비운다 (음성 안내에서 중복되지 않게).
   * 로고에 링크를 걸지 않는다 — 기관 홈페이지로 나가는 것은 방문자에게 쓸모가 없다. */
  function sponsorLogo(sp) {
    if (!sp || !sp.logo) return '';

    return '<span class="mt-2 flex items-center">' +
      '<img src="' + esc(sp.logo) + '" alt="" loading="lazy" data-fallback' +
      ' class="max-h-10 w-auto max-w-full object-contain object-left">' +
    '</span>';
  }


  function projectRow(p) {
    var period = Util.formatMonth(p.startDate) + ' ~ ' + Util.formatMonth(p.endDate);

    var roleOf = function (key) {
      return (typeof PROJECT_ROLES !== 'undefined' && PROJECT_ROLES[key]) || key;
    };

    /* 역할. 지도교수가 아닌 사람이 연구책임자면 두 사람을 함께 적는다.
       그렇지 않으면 이름을 붙이지 않는다 — 이 페이지의 과제는 모두 지도교수의 것이다 */
    var roleText = p.pi
      ? '<span class="block">' + esc(roleOf('PI')) + ' (' + esc(p.pi) + ')</span>' +
        '<span class="block">' + esc(roleOf(p.role)) + ' (' + esc(SITE.professor) + ')</span>'
      : esc(roleOf(p.role));

    /* 라벨 + 값 한 줄 */
    function metaRow(label, valueHTML) {
      return '<div class="flex gap-3">' +
        '<dt class="w-14 shrink-0 font-semibold text-slate-400">' +
          esc(label) + '</dt>' +
        '<dd class="min-w-0 flex-1">' + valueHTML + '</dd>' +
      '</div>';
    }

    /* 로고가 없으면 CI 자리에 기관명 텍스트가 들어간다 */
    return '<li class="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-6">' +
      '<div class="w-48 shrink-0">' +
        sponsorHead(p) +
        sponsorLogo(p.sponsor) +
      '</div>' +
      '<div class="min-w-0 flex-1">' +
        '<p class="text-sm font-semibold leading-snug text-slate-900">' + esc(p.title) + '</p>' +
        '<dl class="mt-2 space-y-1 text-xs text-slate-500">' +
          metaRow(SITE.ui.role, roleText) +
          metaRow(SITE.ui.period, '<span class="font-mono">' + esc(period) + '</span>') +
        '</dl>' +
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

    /* 진행중은 펌쳐 두고, 종료된 과제는 접어 둔다 */
    host.innerHTML = groups.map(function (g) {
      var open = (g.key === 'ongoing');

      var head =
        '<span>' + esc(SITE.sectionTitles[g.key]) + '</span>' +
        '<span class="font-mono text-sm font-normal text-slate-400">' +
          esc(g.items.length) + '</span>' +
        '<span class="ml-auto"></span>';

      var body = '<ul class="divide-y divide-slate-100">' +
        g.items.map(projectRow).join('') + '</ul>';

      return '<div class="mt-10 first:mt-0">' +
        disclosure(head,
          'flex w-full items-center gap-2 border-b border-slate-200 pb-2 text-left' +
          ' text-lg font-bold text-slate-900 transition-colors hover:text-primary',
          body, open) +
      '</div>';
    }).join('');

    bindDisclosure();
  }

  function researchArea() {
    researchAreaDetail();
  }

  function research() {
    researchAreas();
    researchApplications();
    researchProjects();

    /* 감췄 둔 항목 — 장비가 정해지면 아래 두 줄의 주석을 푸면 된다.
       함께 되살려야 하는 곳: common.js 의 NAV, research.html 의 #equipment 섹션 */
    // researchEquipment();

    sectionTabs({
      tabs: [
        { key: 'areas',     label: SITE.submenu.areas },
        // { key: 'equipment', label: SITE.submenu.equipment },
        { key: 'projects',  label: SITE.submenu.projects }
      ]
    });
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

  /* 날짜 칸 — 학력 · 경력 · 학회 활동 · 학회 회원 · 초청강연이 모두 이 모양을 쓴다 */
  var DATE_COL = 'block font-mono text-xs text-slate-400 sm:w-36 sm:shrink-0 sm:pt-0.5';

  /* 기간이 붙은 한 줄 문자열을 날짜 칸과 본문으로 나눈다.
     학력은 뒤에 ("…, 2020.02"), 경력은 앞에 ("2022.03 – Present, …") 붙는다.
     기간 바로 옆 조각(학위명 · 직위)은 굵게 짚는다 */
  var PERIOD_HEAD = /^\s*(\d{4}(?:\.\d{2}(?:\.\d{2})?)?(?:\s*[–-]\s*(?:\d{4}(?:\.\d{2}(?:\.\d{2})?)?|Present))?)\s*,\s*/;
  var PERIOD_TAIL = /,\s*(\d{4}(?:\.\d{2}(?:\.\d{2})?)?(?:\s*[–-]\s*(?:\d{4}(?:\.\d{2}(?:\.\d{2})?)?|Present))?)\s*$/;

  /* opts.extraFor(index) 를 넘기면 그 줄 아래에 한 줄을 더 붙인다 (학위논문 등).
     opts.leadWidth 를 넘기면 앞 조각(학위명)을 그 폭으로 고정해
     뒤따르는 본문이 줄마다 같은 자리에서 시작한다 */
  function datedList(items, opts) {
    opts = opts || {};
    if (!items || !items.length) return '';
    return '<ul class="space-y-2 text-sm text-slate-600">' +
      items.map(function (raw, index) {
        var line = String(raw || '');
        var when = '';

        var head = line.match(PERIOD_HEAD);
        if (head) {
          when = head[1];
          line = line.slice(head[0].length);
        } else {
          var tail = line.match(PERIOD_TAIL);
          if (tail) {
            when = tail[1];
            line = line.slice(0, tail.index);
          }
        }

        var cut  = line.indexOf(',');
        var lead = cut === -1 ? line : line.slice(0, cut);
        var rest = cut === -1 ? ''   : line.slice(cut + 1).replace(/^\s+/, '');

        var extra = opts.extraFor ? opts.extraFor(index) : '';
        var leadCls = 'font-semibold text-slate-800' +
          (opts.leadWidth ? ' inline-block ' + opts.leadWidth : '');

        return '<li class="sm:flex sm:gap-4">' +
          '<span class="' + DATE_COL + '">' + esc(when) + '</span>' +
          '<span class="block leading-relaxed">' +
            '<span class="' + leadCls + '">' + esc(lead) + '</span>' +
            (rest ? (opts.leadWidth ? '' : ' ') + esc(rest) : '') +
            extra +
          '</span>' +
        '</li>';
      }).join('') + '</ul>';
  }

  /* 기간·날짜 문자열에서 시작일을 빼 비교할 수 있는 값으로 바꿌다.
     "2022.03 – Present, …" · "2026.01 – 2026.12" · "2025-12-23" 을 모두 받는다.
     모르는 값은 빈 문자열이라 맨 아래로 내려간다 */
  function startKey(v) {
    var m = String(v || '').match(/(\d{4})[.\-]?(\d{2})?[.\-]?(\d{2})?/);
    if (!m) return '';
    return m[1] + (m[2] || '00') + (m[3] || '00');
  }

  /* 최신이 위로. 기간은 시작일 기준이다 */
  function byStartDesc(pick) {
    return function (a, b) {
      var ka = startKey(pick(a)), kb = startKey(pick(b));
      if (!ka && !kb) return 0;
      if (!ka) return 1;
      if (!kb) return -1;
      return ka < kb ? 1 : (ka > kb ? -1 : 0);
    };
  }

  function sortedBy(list, pick) {
    return (list || []).slice().sort(byStartDesc(pick));
  }

  /* 학위 높낮이. 학력 목록은 사람마다 순서가 달라
     몇 번째 줄이 최종 학력인지를 문자열에서 찾아야 한다 */
  var DEGREE_RANK = [
    { test: /^\s*ph\.?\s*d/i,  rank: 3, label: 'dissertation' },
    { test: /^\s*m\.?\s*s/i,   rank: 2, label: 'thesis' },
    { test: /^\s*b\.?\s*s/i,   rank: 1, label: 'thesis' }
  ];

  function degreeRank(line) {
    for (var i = 0; i < DEGREE_RANK.length; i++) {
      if (DEGREE_RANK[i].test.test(line)) return DEGREE_RANK[i];
    }
    return null;
  }

  /* 학력 — 최종 학위 줄 아래에 학위논문을 붙인다.
     박사는 dissertation, 석사는 thesis 로 가른다 (IEEE 표기 기준) */
  /* 학위명 칸 폭. 학력 목록과 학위논문 들여쓰기가 같은 값을 쓴다 */
  var EDU_LEAD_W   = 'w-14';
  var EDU_LEAD_PAD = 'pl-14';

  function educationList(m) {
    var lines = m.education || [];
    if (!lines.length) return '';

    var thesis = String(m.thesis || '');
    if (!thesis) return datedList(lines, { leadWidth: EDU_LEAD_W });

    var top = -1, best = 0;
    lines.forEach(function (line, i) {
      var d = degreeRank(String(line));
      if (d && d.rank > best) { best = d.rank; top = i; }
    });
    if (top < 0) return datedList(lines, { leadWidth: EDU_LEAD_W });

    var kind = degreeRank(String(lines[top])).label;
    var label = (SITE.people && SITE.people[kind]) || kind;

    return datedList(lines, {
      leadWidth: EDU_LEAD_W,
      extraFor: function (index) {
        if (index !== top) return '';
        /* 윈줄의 소속이 시작하는 자리에 맞춰 들여 쓴다 */
        return '<span class="mt-0.5 block text-xs leading-relaxed text-slate-500 ' +
          EDU_LEAD_PAD + '">' +
          '<span class="font-semibold text-slate-600">' + esc(label) + '</span> ' +
          esc(thesis) +
        '</span>';
      }
    });
  }

  /* 학회 활동 / 학회 회원 — 기간이 있으면 앞에 붙인다.
     org 에 가운데점(·)으로 여러 곳을 적으면 구분점을 연하게 넣어 나열한다.
     저널명에 쉼표가 들어가는 경우가 있어 쉼표로 나누지 않는다 */
  function orgList(text) {
    var list = String(text || '').split(' · ')
      .map(function (t) { return t.replace(/^\s+|\s+$/g, ''); })
      .filter(Boolean);
    if (list.length < 2) return esc(text);

    /* 구분점을 앞 이름과 한 덩어리로 묶고 양쪽 간격을 같은 값으로 둔다.
       이름 안에서는 줄이 나누어지지 않고, 줄바꿈은 구분점 뒤에서만 일어난다 */
    return '<span class="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">' +
      list.map(function (t, i) {
        var sep = (i < list.length - 1)
          ? '<span class="ml-2 text-slate-300">·</span>' : '';
        return '<span class="whitespace-nowrap">' + esc(t) + sep + '</span>';
      }).join('') +
    '</span>';
  }

  function periodList(items, mainKey) {
    if (!items || !items.length) return '';
    return '<ul class="space-y-2 text-sm text-slate-600">' +
      items.map(function (x) {
        var main = x[mainKey] ? '<span class="font-semibold text-slate-800">' + esc(x[mainKey]) + '</span> ' : '';
        return '<li class="sm:flex sm:gap-4">' +
          '<span class="' + DATE_COL + '">' +
            esc(x.period || '') + '</span>' +
          '<span class="block min-w-0 leading-relaxed">' + main + orgList(x.org) + '</span>' +
        '</li>';
      }).join('') + '</ul>';
  }

  function talkList(items) {
    if (!items || !items.length) return '';
    return '<ul class="space-y-2 text-sm text-slate-600">' +
      items.map(function (t) {
        return '<li class="sm:flex sm:gap-4">' +
          '<span class="' + DATE_COL + '">' +
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
        '<div class="flex gap-3"><dt class="w-24 shrink-0 text-slate-400">' + esc(SITE.people.office) + '</dt>' +
          '<dd class="text-slate-700">' + esc(office) + '</dd></div>' +
        '<div class="flex gap-3"><dt class="w-24 shrink-0 text-slate-400">' + esc(SITE.people.email) + '</dt>' +
          '<dd><a class="break-all text-primary hover:underline" href="mailto:' + esc(email) + '">' + esc(email) + '</a></dd></div>' +
        '<div class="flex gap-3"><dt class="w-24 shrink-0 text-slate-400">' + esc(SITE.people.phone) + '</dt>' +
          '<dd><a class="text-slate-700 hover:text-primary" href="tel:' + esc(String(SITE.phone).replace(/[^+0-9]/g, '')) + '">' +
            esc(SITE.phone) + '</a></dd></div>' +
        (scholar
          ? '<div class="flex gap-3"><dt class="w-24 shrink-0 text-slate-400">' + esc(SITE.people.scholar) + '</dt>' +
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
        profileBlock(SITE.people.education,   educationList(prof)) +
        profileBlock(SITE.people.career,
          datedList(sortedBy(prof.career, function (v) { return v; }))) +
        profileBlock(SITE.people.activities,
          periodList(sortedBy(prof.activities, function (x) { return x.period; }), 'role')) +
        profileBlock(SITE.people.memberships,
          periodList(sortedBy(prof.memberships, function (x) { return x.period; }), null)) +
        profileBlock(SITE.people.talks,
          talkList(sortedBy(prof.talks, function (x) { return x.date; }))) +
      '</div>';
  }

  /* --- 재학생 : 작은 카드 그리드 ----------------------------------------- */
  /* 이름을 가나다순으로. 화면에 나오는 표기(국문 우선)를 기준으로 비교한다 */
  function byKoreanName(a, b) {
    var na = splitName(a.name), nb = splitName(b.name);
    var x = na.ko || na.en, y = nb.ko || nb.en;
    return String(x).localeCompare(String(y), 'ko');
  }

  /* "Min-Ro Park (박민로)" → { en: "Min-Ro Park", ko: "박민로" } */
  function splitName(raw) {
    var m = String(raw || '').match(/^\s*([^(]*?)\s*(?:\(([^)]*)\))?\s*$/);
    return m ? { en: m[1], ko: m[2] || '' } : { en: raw || '', ko: '' };
  }

  /* interests 는 쉼표로 가른 문자열이다. 하나씩 알약 태그로 보여 준다 */
  function interestTags(text) {
    var list = String(text || '').split(',')
      .map(function (t) { return t.replace(/^\s+|\s+$/g, ''); })
      .filter(Boolean);
    if (!list.length) return '';

    return '<div class="mt-3 flex flex-wrap justify-center gap-1.5">' +
      list.map(function (t) {
        return '<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px]' +
          ' leading-tight text-slate-600">' + esc(t) + '</span>';
      }).join('') +
    '</div>';
  }

  function studentCard(m) {
    var n = splitName(m.name);

    return '<div class="card-hover rounded-lg border border-slate-200 bg-white p-4 text-center">' +
      imageBox(m.photo, n.en, 'aspect-[3/4]', 'rounded') +
      '<p class="mt-4 text-sm font-bold leading-snug text-slate-900">' + esc(m.name) + '</p>' +
      /* 졸업생은 학위 옆에 졸업 년월을 붙인다 */
      (m.title ? '<p class="mt-1.5 text-xs font-semibold text-primary">' + esc(degreeLabel(m)) +
        (gradDate(m) ? '<span class="ml-1.5 font-mono font-normal text-slate-400">' +
          esc(gradDate(m)) + '</span>' : '') + '</p>' : '') +
      (m.currentPosition ? '<p class="mt-1.5 text-xs leading-relaxed text-slate-600">' +
        esc(m.currentPosition) + '</p>' : '') +
      interestTags(m.interests) +
      '<button type="button" class="js-profile mt-4 w-full rounded border border-slate-300' +
        ' px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors' +
        ' hover:border-primary hover:text-primary" data-member="' + esc(m.id) + '">' +
        esc(SITE.people.viewProfile) + '</button>' +
    '</div>';
  }

  /* 학부연구생은 인원이 많고 사진도 없다. 학년별로 묶어 이름만 나열한다 */
  function undergradList(items) {
    var order = [], map = {};
    items.forEach(function (m) {
      var g = (m.grade === null || m.grade === undefined) ? '' : String(m.grade);
      if (!map[g]) { map[g] = []; order.push(g); }
      map[g].push(m);
    });

    /* 높은 학년부터. 학년을 안 적은 사람은 맨 아래 */
    order.sort(function (a, b) {
      if (!a) return 1;
      if (!b) return -1;
      return Number(b) - Number(a);
    });

    return '<dl class="space-y-3 text-sm leading-relaxed">' +
      order.map(function (g) {
        var names = map[g].slice().sort(byKoreanName).map(function (m) {
          var n = splitName(m.name);
          return esc(n.ko || n.en);
        }).join('<span class="px-1.5 text-slate-300">·</span>');

        return '<div class="sm:flex sm:gap-6">' +
          '<dt class="shrink-0 font-semibold text-slate-900 sm:w-20">' +
            (g ? esc(g + SITE.people.gradeSuffix) : esc(SITE.ui.empty)) + '</dt>' +
          '<dd class="mt-1 text-slate-700 sm:mt-0">' + names + '</dd>' +
        '</div>';
      }).join('') +
    '</dl>';
  }

  /* --- 구성원 프로필 창 -------------------------------------------------
   * 카드의 View Profile 을 누르면 학력과 참여 논문을 보여 준다.
   * 논문은 PUBLICATIONS 에서 그 사람 이름이 저자에 있는 것만 골라 온다.
   * ------------------------------------------------------------------- */
  function pubsOfMember(m) {
    if (typeof PUBLICATIONS === 'undefined') return [];
    var t = tokensOf(m);

    return PUBLICATIONS.filter(function (p) {
      return String(p.authors || '').split(',').some(function (seg) {
        var bare = seg.replace(/[\u2020\u2021*]+\s*$/, '');
        return t[normalizeName(bare)] === true;
      });
    }).sort(comparePubs);
  }

  function profileBody(m) {
    var n = splitName(m.name);
    var pubs = pubsOfMember(m);

    var head =
      '<div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">' +
        (m.photo ? '<div class="w-28 shrink-0">' +
          imageBox(m.photo, n.en, 'aspect-[3/4]', 'rounded') + '</div>' : '') +
        '<div class="min-w-0">' +
          '<h2 id="member-modal-name" class="text-2xl font-bold tracking-tight text-slate-900">' +
            esc(m.name) + '</h2>' +
          (m.title ? '<p class="mt-1.5 text-sm font-semibold text-primary">' +
            esc(degreeLabel(m)) + '</p>' : '') +
          /* 연락처는 이름 바로 아래. 관심분야 태그 묶음을 가로지르지 않게 한다 */
          (m.email
            ? '<p class="mt-2 flex flex-wrap items-baseline gap-x-2 text-xs">' +
                '<span class="font-semibold text-slate-400">' + esc(SITE.people.email) + '</span>' +
                '<a class="break-all text-slate-600 hover:text-primary hover:underline"' +
                ' href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>' +
              '</p>'
            : '') +
          interestTags(m.interests) +
        '</div>' +
      '</div>';

    function block(label, inner) {
      if (!inner) return '';
      return '<section class="mt-8">' +
        '<h3 class="mb-3 text-xs font-bold uppercase tracking-wider2 text-primary">' +
          esc(label) + '</h3>' + inner +
      '</section>';
    }

    var edu = educationList(m);

    /* PUBLICATIONS 페이지와 같은 기준으로 나눈다.
       종류(저널 → 학술대회 → 특허) 안에서 국제 → 국내, 그 안은 최신순 */
    var pubList = '';
    (typeof PUBLICATION_TYPES !== 'undefined' ? PUBLICATION_TYPES : []).forEach(function (type) {
      var ofType = pubs.filter(function (p) { return p.type === type; });
      if (!ofType.length) return;

      var labels = (SITE.pubGroups && SITE.pubGroups[type]) || {};
      var splits = PUB_SPLITS[type] || [{ key: '', test: function () { return true; } }];

      splits.forEach(function (sp) {
        var items = sp.key ? ofType.filter(sp.test) : ofType;
        if (!items.length) return;

        pubList +=
          '<h4 class="mb-2 mt-6 flex items-baseline gap-2 border-b border-slate-200 pb-1' +
            ' text-sm font-bold text-slate-900 first:mt-0">' +
            esc(labels[sp.key] || SITE.submenu[type] || type) +
            '<span class="font-mono text-xs font-normal text-slate-400">' +
              esc(items.length) + '</span>' +
          '</h4>' +
          '<ul class="divide-y divide-slate-200">' +
            items.map(function (p) { return publicationItem(p, m, 'self'); }).join('') +
          '</ul>';
      });
    });

    if (!pubList) {
      pubList = '<p class="text-sm text-slate-500">' + esc(SITE.ui.empty) + '</p>';
    }

    return head +
      block(SITE.people.education, edu) +
      block(SITE.people.publications,
        '<p class="mb-2 font-mono text-xs text-slate-400">' + esc(pubs.length) + '</p>' + pubList);
  }

  var profileBound = false;
  function bindProfile() {
    var modal = document.getElementById('member-modal');
    var body = document.getElementById('member-modal-body');
    if (!modal || !body || profileBound) return;
    profileBound = true;

    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('.js-profile');
      if (btn) {
        var id = btn.getAttribute('data-member');
        var m = (typeof MEMBERS !== 'undefined')
          ? MEMBERS.filter(function (x) { return x.id === id; })[0] : null;
        if (!m) return;
        body.innerHTML = profileBody(m);
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (typeof ImageFallback !== 'undefined' && ImageFallback.init) ImageFallback.init();
        return;
      }
      if (e.target && e.target.closest && e.target.closest('[data-mm-close]')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) close();
    });
  }

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

      return '<div class="mt-12 first:mt-0">' +
        '<h3 class="reveal mb-5 flex items-baseline gap-2 text-lg font-bold text-slate-900">' +
          esc(label) +
          '<span class="font-mono text-sm font-normal text-slate-400">' +
            esc(g.items.length) + '</span>' +
        '</h3>' +
        (g.role === 'undergrad'
          ? undergradList(g.items)
          : '<div class="reveal-group grid gap-5 md:grid-cols-2 xl:grid-cols-3">' +
              g.items.map(studentCard).join('') +
            '</div>') +
      '</div>';
    }).join('');
  }

  /* --- 졸업생 : 사진 없이 텍스트 목록 ------------------------------------ */
  /* 졸업생은 학위별로 나눈다. 학위는 title 에 그대로 적혀 있다 */
  var ALUMNI_DEGREE_TESTS = {
    phd:       /^ph\.?\s*d/i,
    ms:        /^m\.?\s*s/i,
    undergrad: /^b\.?\s*s|^under/i
  };

  function degreeOf(m) {
    var title = String(m.title || '');
    var keys = Object.keys(ALUMNI_DEGREE_TESTS);
    for (var i = 0; i < keys.length; i++) {
      if (ALUMNI_DEGREE_TESTS[keys[i]].test(title)) return keys[i];
    }
    return '';
  }

  /* 카드에 적는 문구. 졸업생은 "M.S. degree", 재학생은 title 그대로 */
  function degreeLabel(m) {
    if (m.role !== 'alumni') return m.title;
    return (typeof ALUMNI_DEGREE_LABELS !== 'undefined' && ALUMNI_DEGREE_LABELS[degreeOf(m)])
      || m.title;
  }

  /* 졸업 년월은 학력에 이미 적혀 있다.
     title 과 같은 학위 줄을 찾아 그 끌의 날짜를 가져온다.
     따로 적어 두면 학력과 어긋나기 쉬우므로 한 곳에서만 읽는다 */
  function gradDate(m) {
    if (m.role !== 'alumni') return '';

    var key = degreeOf(m);
    var lines = m.education || [];

    for (var i = lines.length - 1; i >= 0; i--) {
      var line = String(lines[i]);
      var test = ALUMNI_DEGREE_TESTS[key];
      if (key && test && !test.test(line)) continue;

      var hit = line.match(PERIOD_TAIL);
      if (hit) return hit[1];
    }
    return m.gradYear ? String(m.gradYear) : '';
  }

  /* 학사 졸업생 — 사진이 없고 인원이 많아 카드 대신
     졸업 년월로 묶어 이름만 나열한다 (재학생의 학부연구생 목록과 같은 꼴) */
  function bsAlumniList(items) {
    var order = [], map = {};
    items.forEach(function (m) {
      var d = gradDate(m) || '';
      if (!map[d]) { map[d] = []; order.push(d); }
      map[d].push(m);
    });

    /* 최근 졸업이 위로. 날짜 모름은 맨 아래 */
    order.sort(function (a, b) {
      if (!a) return 1;
      if (!b) return -1;
      return a < b ? 1 : -1;
    });

    return '<dl class="space-y-3 text-sm leading-relaxed">' +
      order.map(function (d) {
        var names = map[d].slice().sort(byKoreanName).map(function (m) {
          var n = splitName(m.name);
          return esc(n.ko || n.en);
        }).join('<span class="px-1.5 text-slate-300">·</span>');

        return '<div class="sm:flex sm:gap-6">' +
          '<dt class="shrink-0 font-mono text-xs font-semibold text-slate-500 sm:w-20 sm:pt-0.5">' +
            esc(d || SITE.ui.empty) + '</dt>' +
          '<dd class="mt-1 text-slate-700 sm:mt-0">' + names + '</dd>' +
        '</div>';
      }).join('') +
    '</dl>';
  }

  function peopleAlumni() {
    var host = document.getElementById('people-alumni');
    if (!host) return;

    var list = (typeof MEMBERS !== 'undefined')
      ? MEMBERS.filter(function (m) { return m.role === 'alumni'; }) : [];

    if (!list.length) { host.innerHTML = emptyNote(); return; }

    /* 최근 졸업이 앞으로. 같은 해에도 월까지 보고 가른다 */
    list.sort(function (a, b) {
      return String(gradDate(b) || '').localeCompare(String(gradDate(a) || ''));
    });

    var order = (typeof ALUMNI_DEGREE_ORDER !== 'undefined')
      ? ALUMNI_DEGREE_ORDER : ['phd', 'ms', 'undergrad'];

    var groups = order.map(function (key) {
      return { key: key, items: list.filter(function (m) { return degreeOf(m) === key; }) };
    });

    /* 어느 단계에도 들어가지 않는 사람은 제목 없이 맨 아래에 붙인다 */
    var rest = list.filter(function (m) { return order.indexOf(degreeOf(m)) < 0; });
    if (rest.length) groups.push({ key: '', items: rest });

    host.innerHTML = groups.filter(function (g) { return g.items.length; }).map(function (g) {
      var label = (typeof ALUMNI_DEGREE_LABELS !== 'undefined' && ALUMNI_DEGREE_LABELS[g.key]) || '';

      return '<div class="mt-12 first:mt-0">' +
        (label
          ? '<h3 class="reveal mb-5 flex items-baseline gap-2 text-lg font-bold text-slate-900">' +
              esc(label) +
              '<span class="font-mono text-sm font-normal text-slate-400">' +
                esc(g.items.length) + '</span>' +
            '</h3>'
          : '') +
        (g.key === 'undergrad'
          ? bsAlumniList(g.items)
          : '<div class="reveal-group grid gap-5 md:grid-cols-2 xl:grid-cols-3">' +
              g.items.map(studentCard).join('') +
            '</div>') +
      '</div>';
    }).join('');
  }

  function people() {
    peopleProfessor();
    peopleCurrent();
    peopleAlumni();
    bindProfile();

    sectionTabs({
      tabs: [
        { key: 'professor', label: SITE.submenu.professor },
        { key: 'current',   label: SITE.submenu.current },
        { key: 'alumni',    label: SITE.submenu.alumni }
      ]
    });
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
    /* 세 곳 모두 좌표로 핀을 찍는다.
       주소 문자열로 검색시키면 대학 대표 주소(본부)로 끌려가므로 쓰지 않는다. */
    var lat = SITE.mapLat, lng = SITE.mapLng;
    var name = encodeURIComponent(SITE.labNameKo);

    var links = [
      { label: 'Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng },
      { label: '카카오맵',     url: 'https://map.kakao.com/link/map/' + name + ',' + lat + ',' + lng },
      { label: '네이버지도',   url: 'https://map.naver.com/p?title=' + name + '&lat=' + lat + '&lng=' + lng }
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
          '<dd class="mt-1.5 leading-relaxed text-slate-700">' +
            esc(String(SITE.address.full).replace(/\n/g, ' ')) + '</dd>' +
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

  /* 모집 안내 — CONTACT 페이지가 이 내용의 본거지다.
     HOME 은 요약만 보여 주고 제목줄의 View all 이 여기로 보낸다.
     문구는 전부 data/site.js 의 SITE.join 에서 온다. */
  function joinPage() {
    var host = document.getElementById('join-content');
    if (!host) return;

    var J = SITE.join;

    /* 소제목 + 내용 한 덩어리. 라벨이나 내용이 비면 통째로 생략한다 */
    function block(label, inner) {
      if (!label || !inner) return '';
      return '<section class="mt-10">' +
        '<h3 class="mb-3 text-base font-bold uppercase tracking-wider2 text-primary">' + esc(label) + '</h3>' +
        inner +
      '</section>';
    }

    function dot(color) {
      return '<span class="mt-2 h-1 w-1 shrink-0 rounded-full ' + color + '"></span>';
    }

    /* 하위 항목 표식. 상위의 점과 모양을 달리해 단계가 보이게 한다 */
    function check() {
      return '<svg class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" fill="none"' +
        ' stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>';
    }

    /* 항목 여러 개를 한 줄에 나란히. 좀은 화면에서는 자연스럽게 접힌다 */
    function inlineRow(items) {
      if (!items || !items.length) return '';
      return '<ul class="text-sm leading-relaxed text-slate-700"><li class="flex gap-2.5">' +
        dot('bg-primary-mid') +
        '<span class="flex flex-wrap items-center gap-x-3 gap-y-1">' +
          items.map(function (v, i) {
            return (i ? '<span class="text-slate-300">·</span>' : '') +
                   '<span>' + esc(v) + '</span>';
          }).join('') +
        '</span></li></ul>';
    }

    /* 점 목록. 항목은 문자열이거나 { text, sub, row } 객체다 */
    function bullets(items) {
      if (!items || !items.length) return '';
      return '<ul class="space-y-2.5 text-sm leading-relaxed text-slate-700">' +
        items.map(function (v) {
          if (typeof v === 'string') {
            return '<li class="flex gap-2.5">' + dot('bg-primary-mid') +
                   '<span>' + esc(v) + '</span></li>';
          }
          var sub = v.sub || [];
          /* row 가 true 면 하위 항목을 두 칸으로 나란히 놓는다 */
          var subCls = v.row ? 'mt-2 grid max-w-3xl gap-x-8 gap-y-2 sm:grid-cols-2' : 'mt-2 space-y-1.5';
          return '<li class="flex gap-2.5">' + dot('bg-primary-mid') +
            '<div class="min-w-0 flex-1">' +
              '<span>' + esc(v.text) + '</span>' +
              (sub.length
                ? '<ul class="' + subCls + '">' +
                    sub.map(function (t) {
                      return '<li class="flex gap-2 text-slate-600">' + check() +
                             '<span>' + esc(t) + '</span></li>';
                    }).join('') +
                  '</ul>'
                : '') +
            '</div></li>';
        }).join('') + '</ul>';
    }

    /* 대상별 조건. 라벨을 왼쪽에 두어 표처럼 읽히게 한다 */
    function defs(rows) {
      if (!rows || !rows.length) return '';
      return '<dl class="space-y-4 pl-3.5 text-sm leading-relaxed">' +
        rows.map(function (r) {
          return '<div class="sm:flex sm:gap-6">' +
            '<dt class="shrink-0 font-semibold text-slate-900 sm:w-28">' + esc(r.label) + '</dt>' +
            '<dd class="mt-1 space-y-1 text-slate-700 sm:mt-0">' +
              (r.items || []).map(function (t) { return '<div>' + esc(t) + '</div>'; }).join('') +
            '</dd></div>';
        }).join('') + '</dl>';
    }

    function para(text) {
      return text ? '<p class="max-w-2xl text-sm leading-relaxed text-slate-700">' + esc(text) + '</p>' : '';
    }

    /* 문자열이면 한 문단, 배열이면 목록으로 그린다 */
    function textOrList(v) {
      return (v instanceof Array) ? bullets(v) : para(v);
    }

    /* 곁들이는 말. 본문보다 작고 옛게 — 여기가 강조되면 안 된다 */
    function aside(text) {
      return text
        ? '<p class="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500">' + esc(text) + '</p>'
        : '';
    }

    /* 안내문의 {email} 자리에 SITE.email 을 mailto 링크로 넣는다 */
    function withEmail(text) {
      return esc(text).replace('{email}',
        '<a href="mailto:' + esc(SITE.email) + '"' +
        ' class="font-semibold text-primary hover:underline">' + esc(SITE.email) + '</a>');
    }

    var intro = (J.contact || []).map(function (t, i) {
      return '<p class="' + (i ? 'mt-3' : 'mt-5') +
        ' max-w-2xl text-sm leading-relaxed text-slate-600">' + withEmail(t) + '</p>';
    }).join('');

    host.innerHTML =
      '<h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">' +
        esc(J.heading) + '</h2>' +
      intro +

      aside(J.contactNote) +

      block(J.targetsLabel, inlineRow(J.targets)) +

      block(J.qualifyLabel,
        bullets(J.qualifyCommon) +
        ((J.qualifyCommon && J.qualifyCommon.length) ? '<div class="mt-4"></div>' : '') +
        defs(J.qualify) + aside(J.qualifyNote)) +

      block(J.researchLabel,
        textOrList(J.researchNote) +
        (J.researchLink
          ? '<a href="' + esc(J.researchLink) + '"' +
            ' class="mt-3 inline-block text-sm font-semibold text-primary hover:underline">' +
            esc(J.researchLinkLabel || SITE.ui.readMore) + ' &rarr;</a>'
          : '')) +

      block(J.supportLabel, bullets(J.support)) +

      block(J.cultureLabel, bullets(J.culture));
  }

  function contact() {
    contactLocation();
  }

  /* =====================================================================
   * JOIN US
   *   대학원생 모집 안내. 문구는 SITE.join 한 곳에서 온다.
   * =================================================================== */

  function join() {
    joinPage();
  }

  /* =====================================================================
   * NEWS
   *   날짜 + 1~3문장이 시간순으로 누적되는 피드. 연도별 구분선.
   *   게시판·상세페이지·페이지네이션을 만들지 않는다. (CLAUDE.md 7번)
   * =================================================================== */

  function newsItem(n) {
    var label = (SITE.newsCategories && SITE.newsCategories[n.category]) || n.category || '';

    /* 링크가 있으면 제목을 링크로 감싸다 */
    var head = esc(n.title || n.text);
    if (n.link) {
      head = '<a href="' + esc(n.link) + '" target="_blank" rel="noopener noreferrer"' +
             ' class="underline-offset-2 hover:text-primary hover:underline">' + head + '</a>';
    }

    /* title 이 없던 예전 항목은 text 를 제목으로 쓰고 본문을 비운다 */
    var detail = n.title ? String(n.text || '') : '';

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
        '<p class="mt-1.5 text-base font-bold leading-snug text-slate-900">' + head + '</p>' +
        (detail
          ? '<p class="mt-1 text-sm leading-relaxed text-slate-600">' + esc(detail) + '</p>'
          : '') +
      '</div>' +
    '</li>';
  }

  function newsFeed() {
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

    /* 올해 것만 펼쳐 두고 지난 해는 한 덩어리로 묶어 접는다.
       PUBLICATIONS 와 같은 규칙이다 */
    var openFrom = openFromYear();
    var thisYear = order.filter(function (y) { return Number(y) >= openFrom; });
    var past     = order.filter(function (y) { return Number(y) <  openFrom; });

    function feedList(items) {
      return '<ul class="divide-y divide-slate-200">' + items.map(newsItem).join('') + '</ul>';
    }

    var html = thisYear.map(function (y) {
      return '<div class="mt-10 first:mt-0">' +
        disclosure(pubHead(y, map[y].length), PUB_HEAD_CLS, feedList(map[y]), true) +
      '</div>';
    }).join('');

    if (past.length) {
      var items = past.reduce(function (acc, y) { return acc.concat(map[y]); }, []);
      var label = String((SITE.ui && SITE.ui.pubEarlier) || '~{year}')
        .replace('{year}', openFrom - 1);

      html += '<div class="mt-10 first:mt-0">' +
        disclosure(pubHead(label, items.length), PUB_HEAD_CLS, feedList(items), !html) +
      '</div>';
    }

    host.innerHTML = html;
  }

  /* NEWS 페이지는 글 소식만 그린다. 사진은 gallery.html 로 떼어냈다 */
  /* NEWS · GALLERY 상단에 공통으로 둘 다 대는 탭 */
  function activityTabs() {
    linkTabs([
      { label: SITE.submenu.news,    href: 'news.html',
        count: (typeof NEWS !== 'undefined') ? NEWS.length : undefined },
      { label: SITE.submenu.gallery, href: 'gallery.html',
        count: (typeof GALLERY !== 'undefined') ? GALLERY.length : undefined }
    ]);
  }

  function news() {
    activityTabs();
    newsFeed();
    bindDisclosure();
  }

  /* =====================================================================
   * 사진 게시글 (gallery.html)
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

  /* 격자에는 400px 썸네일을 쓴다. 본문용 1600px 을 그대로 깔면
     첫 화면에서만 몇 MB 를 받게 된다.
     images/resize.ps1 이 images/gallery/thumb/ 에 같은 이름으로 만든다.
     썸네일이 없으면 ImageFallback 이 앨범명을 대신 보여 준다 */
  function thumbOf(src) {
    var s = String(src || '');
    var cut = s.lastIndexOf('/');
    if (cut < 0) return s;
    return s.slice(0, cut) + '/thumb' + s.slice(cut);
  }

  /* gallery.html 진입점 — 상단 탭과 앨범 격자를 그린다 */
  function galleryPage() {
    activityTabs();
    gallery();
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
        imageBox(thumbOf(albumCover(al)), al.title, 'aspect-[4/3]') +
        '<div class="p-4">' +
          '<p class="text-sm font-bold text-slate-900">' + esc(al.title) + '</p>' +
          '<p class="mt-1 flex items-center gap-2 text-xs text-slate-500">' +
            '<time>' + esc(Util.formatDate(al.date)) + '</time>' +
            (count ? '<span aria-hidden="true">&middot;</span><span>' + esc(count) + '</span>' : '') +
          '</p>' +
          (al.desc
            ? '<p class="mt-2 text-xs leading-relaxed text-slate-600">' + esc(al.desc) + '</p>'
            : '') +
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
    'research-area': researchArea,
    people: people,
    contact: contact,
    join: join,
    news: news,
    gallery: galleryPage,

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
