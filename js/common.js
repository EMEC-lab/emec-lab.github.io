/* =========================================================================
 * js/common.js
 * 헤더/푸터 삽입 · 공통 유틸 · 스크롤 연출 · 페이지 부트스트랩.
 *
 * 각 페이지는 아래 세 요소만 두면 된다.
 *   <div id="site-header"></div>
 *   <main id="content"> ... </main>
 *   <div id="site-footer"></div>
 *
 * 헤더/푸터를 HTML 조각으로 fetch 하지 않는다.
 * file:// 에서 CORS 에 막히므로 문자열로 만들어 주입한다. (CLAUDE.md 3번)
 * ========================================================================= */

/* =========================================================================
 * 1) 공통 유틸
 * ======================================================================= */

var Util = (function () {
  'use strict';

  function esc(v) {
    return String(v === null || v === undefined ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fileOf(href) { return String(href).split('#')[0]; }

  function hashOf(href) {
    var i = String(href).indexOf('#');
    return i < 0 ? '' : String(href).slice(i);
  }

  function currentFile() {
    var name = (window.location.pathname || '').split('/').pop();
    return name || 'index.html';
  }

  /* 'YYYY-MM-DD' → 'YYYY.MM.DD' */
  function formatDate(v) {
    return String(v || '').replace(/-/g, '.');
  }

  /* 'YYYY-MM-DD' → 'YYYY.MM'  (CLAUDE.md 7번의 과제 기간 표기) */
  function formatMonth(v) {
    var p = String(v || '').split('-');
    return p.length >= 2 ? p[0] + '.' + p[1] : String(v || '');
  }

  function yearOf(v) { return String(v || '').slice(0, 4); }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  return {
    esc: esc, fileOf: fileOf, hashOf: hashOf, currentFile: currentFile,
    formatDate: formatDate, formatMonth: formatMonth, yearOf: yearOf,
    reducedMotion: reducedMotion, ready: ready
  };
})();

/* =========================================================================
 * 2) 메뉴 구조 (CLAUDE.md 5번)
 *
 * 라벨은 여기 적지 않는다. key 로 SITE.menu / SITE.submenu 를 찾아 쓴다.
 * 이 배열은 "어떤 항목이 어느 앵커로 가는가"라는 구조만 갖는다.
 * ======================================================================= */

var NAV = [
  { key: 'home', page: 'home', href: 'index.html' },
  {
    key: 'people', page: 'people', href: 'people.html',
    children: [
      { key: 'professor', page: 'people', href: 'people.html#professor' },
      { key: 'current',   page: 'people', href: 'people.html#current' },
      { key: 'alumni',    page: 'people', href: 'people.html#alumni' }
    ]
  },
  {
    key: 'research', page: 'research', href: 'research.html',
    children: [
      { key: 'areas',     page: 'research', href: 'research.html#areas' },
      { key: 'equipment', page: 'research', href: 'research.html#equipment' },
      { key: 'projects',  page: 'research', href: 'research.html#projects' }
    ]
  },
  {
    key: 'publications', page: 'publications', href: 'publications.html',
    children: [
      { key: 'journal',    page: 'publications', href: 'publications.html#journal' },
      { key: 'conference', page: 'publications', href: 'publications.html#conference' },
      { key: 'patent',     page: 'publications', href: 'publications.html#patent' }
    ]
  },
  {
    key: 'news', page: 'news', href: 'news.html',
    children: [
      { key: 'newsfeed', page: 'news',    href: 'news.html' },
      { key: 'gallery',  page: 'gallery', href: 'gallery.html' }
    ]
  },
  { key: 'contact', page: 'contact', href: 'contact.html' }
];

/* =========================================================================
 * 3) 헤더 / 푸터
 * ======================================================================= */

var Layout = (function () {
  'use strict';

  var LG = 1024;                /* Tailwind lg */
  var SOLID_AFTER = 24;         /* 이만큼 스크롤하면 헤더를 흰 배경으로 */
  var esc = Util.esc;

  function currentPage() { return document.body.getAttribute('data-page') || ''; }

  /* HOME 처럼 전체 화면 히어로가 있는 페이지는 헤더가 히어로 위에 겹친다 */
  function hasHero() { return document.body.getAttribute('data-hero') === 'true'; }

  function isGroupCurrent(item) {
    var page = currentPage();
    if (item.page === page) return true;
    return (item.children || []).some(function (c) { return c.page === page; });
  }

  function isChildCurrent(child, siblings, index) {
    if (Util.fileOf(child.href) !== Util.currentFile()) return false;
    var hash = window.location.hash || '';
    if (hash) return Util.hashOf(child.href) === hash;
    for (var i = 0; i < index; i++) {
      if (Util.fileOf(siblings[i].href) === Util.currentFile()) return false;
    }
    return true;
  }

  var CHEVRON =
    '<svg class="h-3 w-3 shrink-0 opacity-60" fill="none" stroke="currentColor" stroke-width="2.2"' +
    ' viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>';

  /* --- 데스크톱 네비게이션 ---------------------------------------------- */
  function desktopNav() {
    var html = NAV.map(function (item) {
      var kids = item.children || [];
      var on = isGroupCurrent(item);

      var trigger =
        '<a href="' + esc(item.href) + '"' +
        ' class="nav-link flex items-center gap-1 px-3 py-2 text-[0.8rem] font-semibold tracking-wider2 transition-colors' +
        (on ? ' is-current' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' +
        esc(SITE.menu[item.key]) + (kids.length ? CHEVRON : '') + '</a>';

      var panel = '';
      if (kids.length) {
        panel =
          '<div class="nav-panel absolute left-1/2 top-full z-10 -translate-x-1/2 pt-1">' +
            '<div class="min-w-[10.5rem] rounded-md border border-slate-200 bg-white p-1.5 shadow-lg">' +
              kids.map(function (c, i) {
                var childOn = isChildCurrent(c, kids, i);
                return '<a href="' + esc(c.href) + '" class="block rounded px-3 py-2 text-sm transition-colors ' +
                  (childOn ? 'bg-primary-light font-semibold text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-primary') +
                  '">' + esc(SITE.submenu[c.key]) + '</a>';
              }).join('') +
            '</div></div>';
      }

      return '<div class="nav-item relative">' + trigger + panel + '</div>';
    }).join('');

    return '<nav class="hidden items-center lg:flex" aria-label="' + esc(SITE.ui.menu) + '">' + html + '</nav>';
  }

  /* --- 모바일 아코디언 --------------------------------------------------- */
  function mobileNav() {
    var items = NAV.map(function (item, idx) {
      var kids = item.children || [];
      var on = isGroupCurrent(item);
      var color = on ? 'text-primary' : 'text-slate-800';

      if (!kids.length) {
        return '<div class="acc-item border-b border-slate-100">' +
          '<a href="' + esc(item.href) + '" class="block px-1 py-3.5 text-sm font-bold tracking-wider2 ' + color + '">' +
          esc(SITE.menu[item.key]) + '</a></div>';
      }

      return '<div class="acc-item border-b border-slate-100' + (on ? ' is-open' : '') + '">' +
        '<button type="button" class="acc-trigger flex w-full items-center justify-between px-1 py-3.5 text-left text-sm font-bold tracking-wider2 ' + color + '"' +
          ' aria-expanded="' + (on ? 'true' : 'false') + '" aria-controls="acc-' + idx + '">' +
          esc(SITE.menu[item.key]) + '<span class="acc-chevron">' + CHEVRON + '</span></button>' +
        '<div class="acc-panel" id="acc-' + idx + '"><div class="space-y-0.5 pb-3 pl-2">' +
          kids.map(function (c, i) {
            var childOn = isChildCurrent(c, kids, i);
            return '<a href="' + esc(c.href) + '" class="block rounded px-3 py-2.5 text-sm transition-colors ' +
              (childOn ? 'bg-primary-light font-semibold text-primary' : 'text-slate-600 hover:bg-slate-50') +
              '">' + esc(SITE.submenu[c.key]) + '</a>';
          }).join('') +
        '</div></div></div>';
    }).join('');

    return '<div id="mobile-menu" class="hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">' +
             '<nav class="mx-auto max-w-6xl px-4 py-2 sm:px-6">' + items + '</nav></div>';
  }

  /* --- 헤더 -------------------------------------------------------------- */
  function headerHTML() {
    return '' +
    '<a class="skip-link" href="#content">Skip to content</a>' +
    '<div class="site-bar fixed inset-x-0 top-0 z-50 border-b">' +
      '<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">' +
        '<div class="flex h-16 items-center justify-between gap-3">' +

          '<a href="index.html" class="flex min-w-0 items-center gap-2.5">' +
            '<span class="grid h-9 w-9 shrink-0 place-items-center rounded bg-primary text-[0.7rem] font-bold tracking-tight text-white">' +
              esc(SITE.labShort) + '</span>' +
            '<span class="nav-link flex min-w-0 flex-col leading-tight">' +
              '<span class="truncate text-sm font-bold">' + esc(SITE.labShort) + ' Lab</span>' +
              '<span class="nav-sub hidden truncate text-[10px] sm:block">' + esc(SITE.university) + '</span>' +
            '</span>' +
          '</a>' +

          desktopNav() +

          '<button type="button" id="menu-toggle"' +
            ' class="nav-link grid h-9 w-9 shrink-0 place-items-center rounded lg:hidden"' +
            ' aria-expanded="false" aria-controls="mobile-menu" aria-label="' + esc(SITE.ui.openMenu) + '">' +
            '<svg id="icon-open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>' +
            '<svg id="icon-close" class="hidden h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>' +
          '</button>' +

        '</div>' +
      '</div>' +
      mobileNav() +
    '</div>';
  }

  /* --- 푸터 -------------------------------------------------------------- */
  function footerHTML() {
    var year = new Date().getFullYear();
    var tel  = String(SITE.phone || '').replace(/[^+0-9]/g, '');

    var ext = [];
    if (SITE.links.university) {
      ext.push('<li><a href="' + esc(SITE.links.university) + '" target="_blank" rel="noopener noreferrer"' +
        ' class="text-white/70 transition-colors hover:text-white">' + esc(SITE.university) + '</a></li>');
    }
    if (SITE.links.scholar) {
      ext.push('<li><a href="' + esc(SITE.links.scholar) + '" target="_blank" rel="noopener noreferrer"' +
        ' class="text-white/70 transition-colors hover:text-white">Google Scholar</a></li>');
    }

    return '' +
    '<footer class="mt-auto bg-primary-dark text-white/80">' +
      '<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">' +
        '<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">' +

          '<div class="lg:col-span-2">' +
            '<p class="text-base font-bold text-white">' + esc(SITE.labName) + '</p>' +
            '<p class="mt-1 text-sm text-white/70">' + esc(SITE.labNameKo) + '</p>' +
            '<p class="mt-1 text-sm text-white/70">' + esc(SITE.department) + ', ' + esc(SITE.university) + '</p>' +
            '<ul class="mt-5 space-y-1.5 text-sm text-white/70">' +
              '<li>' + esc(SITE.address.full) + '</li>' +
              '<li><a class="transition-colors hover:text-white" href="tel:' + esc(tel) + '">' + esc(SITE.phone) + '</a></li>' +
              '<li><a class="break-all transition-colors hover:text-white" href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a></li>' +
            '</ul>' +
            (ext.length ? '<ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">' + ext.join('') + '</ul>' : '') +
          '</div>' +

          '<div>' +
            '<ul class="space-y-2 text-sm">' +
              NAV.map(function (item) {
                return '<li><a href="' + esc(item.href) + '"' +
                  ' class="font-semibold tracking-wider2 text-white/70 transition-colors hover:text-white">' +
                  esc(SITE.menu[item.key]) + '</a></li>';
              }).join('') +
            '</ul>' +
          '</div>' +

        '</div>' +

        '<div class="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">' +
          '<p>&copy; ' + year + ' ' + esc(SITE.labName) + '. ' + esc(SITE.ui.rights) + '</p>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* --- 헤더 배경 전환 ------------------------------------------------------ */
  function updateBar() {
    var bar = document.querySelector('.site-bar');
    if (!bar) return;
    var solid = !hasHero() || isMenuOpen() || window.pageYOffset > SOLID_AFTER;
    bar.classList.toggle('is-solid', solid);
  }

  /* --- 모바일 메뉴 --------------------------------------------------------- */
  function isMenuOpen() {
    var m = document.getElementById('mobile-menu');
    return !!m && !m.classList.contains('hidden');
  }

  function setMenu(open) {
    var menu = document.getElementById('mobile-menu');
    var btn  = document.getElementById('menu-toggle');
    if (!menu || !btn) return;

    menu.classList.toggle('hidden', !open);
    document.getElementById('icon-open').classList.toggle('hidden', open);
    document.getElementById('icon-close').classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? SITE.ui.closeMenu : SITE.ui.openMenu);
    updateBar();
  }

  function bindMenu() {
    var btn  = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    setMenu(false);
    btn.addEventListener('click', function () { setMenu(!isMenuOpen()); });

    menu.addEventListener('click', function (e) {
      var trigger = e.target.closest ? e.target.closest('.acc-trigger') : null;
      if (trigger) {
        var item = trigger.parentNode;
        var open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        return;
      }
      if (e.target && e.target.tagName === 'A') setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && isMenuOpen()) { setMenu(false); btn.focus(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= LG && isMenuOpen()) setMenu(false);
    });
  }

  /* --- 서브 페이지 제목 밴드 ----------------------------------------------- */
  function pageLabel() {
    var page = currentPage();
    var item = null, i;

    for (i = 0; i < NAV.length; i++) {
      if (NAV[i].page === page) { item = NAV[i]; break; }
      if ((NAV[i].children || []).some(function (c) { return c.page === page; })) { item = NAV[i]; break; }
    }
    if (!item) return '';

    var label = SITE.menu[item.key];

    /* NEWS 하위의 Gallery 처럼 대메뉴와 다른 파일인 하위 항목은 그 라벨을 쓴다 */
    (item.children || []).forEach(function (c) {
      if (Util.fileOf(c.href) === Util.currentFile() &&
          Util.fileOf(c.href) !== Util.fileOf(item.href)) {
        label = SITE.submenu[c.key];
      }
    });
    return label;
  }

  function renderPageHead() {
    var host = document.getElementById('page-head');
    if (!host) return;

    host.className = 'border-b border-slate-200 bg-primary-light';
    host.innerHTML =
      '<div class="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">' +
        '<h1 class="text-2xl font-bold tracking-wider2 text-primary-dark sm:text-3xl">' +
          esc(pageLabel()) + '</h1>' +
      '</div>';
  }

  function renderTitle() {
    if (currentPage() === 'home') { document.title = SITE.labName; return; }
    var label = pageLabel();
    document.title = (label ? label + ' | ' : '') + SITE.labName;
  }

  /* 섹션 제목을 SITE.sectionTitles 에서 채운다.
     HTML 은 <h2 data-section-title="journal"></h2> 처럼 키만 적는다. */
  function renderSectionTitles() {
    var els = document.querySelectorAll('[data-section-title]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-section-title');
      els[i].textContent = SITE.sectionTitles[key] || key;
    }
  }

  /* 아직 만들지 않은 섹션의 자리표시자 문구 */
  function renderPlaceholders() {
    var els = document.querySelectorAll('[data-wip]');
    for (var i = 0; i < els.length; i++) els[i].textContent = SITE.ui.wip;
  }

  function render() {
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');
    if (header) header.innerHTML = headerHTML();
    if (footer) footer.innerHTML = footerHTML();

    bindMenu();
    updateBar();

    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('hashchange', function () {
      if (header) { header.innerHTML = headerHTML(); bindMenu(); updateBar(); }
    });
  }

  return {
    render: render,
    renderPageHead: renderPageHead,
    renderTitle: renderTitle,
    renderSectionTitles: renderSectionTitles,
    renderPlaceholders: renderPlaceholders
  };
})();

/* =========================================================================
 * 4) 이미지 폴백
 * 경로는 적혀 있는데 파일이 아직 없는 경우 깨진 아이콘 대신
 * 자리표시자 박스를 보여 준다. 대상은 data-fallback 이 붙은 <img>.
 * ======================================================================= */

var ImageFallback = (function () {
  'use strict';

  function fail(img) {
    var box = img.parentNode;
    img.style.display = 'none';
    if (!box) return;

    /* alt 가 비어 있으면(장식용 이미지) 조용히 감추기만 한다 */
    if (!img.alt) return;

    box.classList.add('img-placeholder', 'px-3', 'text-xs');
    box.textContent = img.alt;
  }

  function init() {
    var imgs = document.querySelectorAll('img[data-fallback]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      /* 핸들러를 붙이기 전에 이미 실패했을 수 있다 */
      if (img.complete && img.naturalWidth === 0) { fail(img); continue; }
      img.addEventListener('error', function () { fail(this); });
    }
  }

  return { init: init };
})();

/* =========================================================================
 * 5) 스크롤 연출 (CLAUDE.md 9번 "애니메이션 규격")
 *
 *   .reveal              화면 진입 시 아래에서 위로 페이드업
 *   .reveal-group > *    자식들을 0.1초씩 시차를 두고 순차 등장
 *   .countup             0 부터 data-count-to 값까지 약 1.5초간 증가
 *
 * ⚠ 초기 숨김(opacity:0)은 반드시 JS 가 부여한다.
 *   JS 가 실패하면 모든 요소가 그냥 보이는 상태로 남는다.
 *
 * ⚠ IntersectionObserver 를 기본으로 쓰되, 스크롤 시 직접 위치를 재는
 *   보조 검사를 함께 돌린다. 관찰자가 어떤 이유로든 발화하지 않아
 *   본문이 계속 안 보이는 상황을 막기 위한 안전장치다.
 * ======================================================================= */

var Anim = (function () {
  'use strict';

  var STAGGER  = 100;    /* ms */
  var COUNT_MS = 1500;

  var revealTargets = [];
  var countTargets  = [];
  var ticking = false;

  function enabled() {
    return !Util.reducedMotion();
  }

  function inView(el, ratio) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight * ratio && r.bottom > 0;
  }

  function show(el) {
    el.classList.add('is-visible');
  }

  function runCount(el) {
    if (el.getAttribute('data-counted')) return;
    el.setAttribute('data-counted', '1');

    var to = Number(el.getAttribute('data-count-to') || 0);
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / COUNT_MS, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));   /* ease-out */
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* 스크롤 시 직접 위치를 재는 보조 검사 */
  function sweep() {
    ticking = false;

    revealTargets = revealTargets.filter(function (el) {
      if (!inView(el, 0.95)) return true;
      show(el);
      return false;
    });

    countTargets = countTargets.filter(function (el) {
      if (!inView(el, 0.85)) return true;
      runCount(el);
      return false;
    });

    if (!revealTargets.length && !countTargets.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(sweep);
  }

  function collect() {
    /* 그룹 안의 자식들에게 시차를 부여한다 */
    var groups = document.querySelectorAll('.reveal-group');
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var k = 0; k < kids.length; k++) {
        kids[k].classList.add('reveal');
        kids[k].style.transitionDelay = (k * STAGGER) + 'ms';
      }
    }

    revealTargets = [].slice.call(document.querySelectorAll('.reveal'));
    countTargets  = [].slice.call(document.querySelectorAll('.countup'));
  }

  function init() {
    collect();

    /* 연출을 끄는 경우: 숨기지 않고 최종값만 채운다 */
    if (!enabled()) {
      countTargets.forEach(function (el) {
        el.textContent = el.getAttribute('data-count-to') || '0';
      });
      revealTargets = [];
      countTargets = [];
      return;
    }

    revealTargets.forEach(function (el) { el.classList.add('reveal-init'); });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.classList.contains('countup')) runCount(el);
          else show(el);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

      revealTargets.forEach(function (el) { io.observe(el); });
      countTargets.forEach(function (el) { io.observe(el); });
    }

    /* 보조 검사: 첫 화면에 이미 들어와 있는 요소를 즉시 처리하고,
       이후 스크롤할 때마다 관찰자가 놓친 요소를 회수한다 */
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    sweep();
  }

  return { init: init };
})();

/* =========================================================================
 * 6) 부트스트랩
 *   페이지별 렌더링은 js/render.js 의 Render[<data-page>] 가 담당한다.
 * ======================================================================= */

Util.ready(function () {
  Layout.render();
  Layout.renderPageHead();
  Layout.renderTitle();

  Layout.renderSectionTitles();
  Layout.renderPlaceholders();

  var page = document.body.getAttribute('data-page');
  if (typeof Render !== 'undefined' && typeof Render[page] === 'function') Render[page]();

  /* 앵커 보정 —
     (1) 데이터로 만든 요소(research.html#machine-design 등)는 브라우저가
         해시를 처리하는 시점에 아직 없다.
     (2) Tailwind CDN 이 스타일을 비동기로 만들기 때문에 DOMContentLoaded
         시점의 레이아웃 높이는 최종 높이와 다르다. 그때 스크롤하면 어긋난다.
     그래서 스타일과 리소스가 모두 적용된 load 이후에 다시 맞춘다.
     헤더 높이만큼의 여백은 html 의 scroll-padding-top 과 각 요소의
     scroll-mt-* 클래스가 처리한다. */
  function alignToHash() {
    if (window.location.hash.length <= 1) return;

    var target;
    try {
      target = document.querySelector(window.location.hash);
    } catch (e) {
      return;                     /* 선택자로 쓸 수 없는 해시는 무시 */
    }
    if (!target) return;

    /* 페이지를 여는 순간의 보정이므로 애니메이션 없이 바로 맞춘다
       (html 의 scroll-behavior: smooth 를 이 호출에서만 무시) */
    try {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    } catch (e2) {
      target.scrollIntoView();
    }
  }

  if (document.readyState === 'complete') alignToHash();
  else window.addEventListener('load', alignToHash);

  /* 데이터 렌더링이 끝난 뒤에 처리한다 (동적으로 만든 요소까지 포함) */
  ImageFallback.init();
  Anim.init();
});
