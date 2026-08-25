/* =========================================================================
 * data/site.js
 * 연구실 정보 · 연락처 · 메뉴/섹션 라벨의 단일 소스.
 *
 * 이 파일의 값을 바꾸면 다른 파일을 건드리지 않아도 사이트 전체에 반영된다.
 * HTML 에 연구실명·주소·연락처·메뉴 라벨을 직접 쓰지 않는다. (CLAUDE.md 0번)
 *
 * 모든 텍스트 필드는 문자열 하나다. { ko, en } 구조를 쓰지 않는다. (CLAUDE.md 2번)
 * ========================================================================= */

const SITE = {
  labName:    "Electro-Mechanical Energy Conversion Lab",
  labShort:   "EMEC",
  labNameKo:  "전기기계에너지변환 연구실",     // 푸터·타이틀에서 필요 시 병기
  university: "Soonchunhyang University",
  department: "Department of Electrical Engineering",
  professor:  "Min-Ro Park",

  tagline: "[한 줄 정체성 문구 — 추후 확정]",   // <strong> 태그 사용 가능

  address: {
    full:  "M417, Multimedia Building, Soonchunhyang University, 22 Soonchunhyang-ro, Asan-si, Chungcheongnam-do 31538, Republic of Korea",
    fullKo: "충남 아산시 순천향로 22 순천향대학교 멀티미디어관 M417호",
    short: "Multimedia Building, M417"
  },

  phone: "041-530-1334",
  email: "minro@sch.ac.kr",

  // 지도 좌표 — Google 지도 플러스 코드 8Q88QW9M+JV 를 변환한 값 (멀티미디어관)
  // 바꿀 때는 Google 지도에서 해당 지점을 우클릭해 나오는 좌표를 그대로 넣으면 된다
  mapLat: 36.769062,
  mapLng: 126.934688,

  links: {
    scholar:    "https://scholar.google.com/citations?user=01FS4l4AAAAJ&hl=ko",
    university: "https://home.sch.ac.kr"
  },

  /* --- 연구실 심볼 -------------------------------------------------------
   * 원본은 images/logo/emec-logo.png (4193x469, 투명 배경).
   * 크기별 파일은 images/logo/make-logo.ps1 이 만든다.
   * w/h 는 원본 픽셀 크기 — 브라우저가 세로비를 미리 잡아 화면이 흔들리지 않게 한다.
   *
   *   full      가로형 락업 (EMEC + 부제)
   *   wordmark  EMEC 글자만. 좁은 화면용
   *   mark      C 글자만 잘라낸 정사각형. 파비콘·앱 아이콘용
   *   *White    어두운 배경용 흰색 버전
   * -------------------------------------------------------------------- */
  logo: {
    full:          { src: "images/logo/emec-logo-800.png",           w: 800, h: 89 },
    fullWhite:     { src: "images/logo/emec-logo-white-800.png",     w: 800, h: 89 },
    wordmark:      { src: "images/logo/emec-wordmark-400.png",       w: 400, h: 92 },
    wordmarkWhite: { src: "images/logo/emec-wordmark-white-400.png", w: 400, h: 92 },
    mark:          { src: "images/logo/emec-mark-512.png",           w: 512, h: 512 }
  },

  menu: {
    home:         "HOME",
    people:       "PEOPLE",
    research:     "RESEARCH",
    publications: "PUBLICATIONS",
    news:         "NEWS",
    contact:      "CONTACT"
  },

  submenu: {
    professor:  "Professor",
    current:    "Students",
    alumni:     "Alumni",
    areas:      "Overview",
    equipment:  "Facilities",
    projects:   "Projects",
    journal:    "Journal",
    conference: "Conference",
    patent:     "Patent",
    newsfeed:   "News",
    gallery:    "Gallery"
  },

  sectionTitles: {
    professor:  "Professor",
    current:    "Students",
    alumni:     "Alumni",
    areas:      "Research Areas",
    equipment:  "Facilities",
    projects:   "Research Projects",
    journal:    "Journal Papers",
    conference: "Conference Papers",
    patent:     "Patents",
    ongoing:    "Ongoing",
    completed:  "Completed",
    location:   "Location"
  },

  /* --- HOME 섹션 문구 --------------------------------------------------
   * CLAUDE.md 0번 표의 "메뉴 라벨, 섹션 제목 → data/site.js" 규칙에 따라
   * HOME 각 섹션의 제목도 여기에 둔다.
   * (명세의 sectionTitles 에는 HOME 섹션 키가 없어 별도 블록으로 추가했다)
   * ------------------------------------------------------------------- */
  home: {
    researchTitle:  "Research Areas",
    researchLead:   "What we work on.",
    professorTitle: "Professor",
    statsTitle:     "At a Glance",
    newsTitle:      "Recent News",
    papersTitle:    "Recent Publications",
    /* 현황 지표 라벨. 값은 render.js 가 데이터에서 자동 집계한다 */
    stats: {
      phd:     "Ph.D. Students",
      journal: "Journal Papers",
      alumni:  "Alumni",
      ongoing: "Ongoing Projects"
    }
  },

  /* --- 대학원생 모집 안내 -----------------------------------------------
   * CONTACT 페이지의 Join Us 탭에 항목별로 표시된다.
   * 메인(HOME)은 lead + highlights 만 쓰고, 나머지는 CONTACT 에서만 쓴다.
   *
   * 문체는 개조식으로 통일한다. 한 항목은 한 줄, 명사형으로 끝낸다.
   *
   * 목록(targets, qualify, support, culture, highlights)은 항목을 늘리거나 줄여도
   * 화면이 알아서 따라간다. 필요 없는 항목은 그 줄만 지우면 된다.
   * 라벨을 빈 문자열로 두면 그 덩어리 전체가 표시되지 않는다.
   *
   * researchNote · howToApply · culture 는 문자열과 배열을 모두 받는다.
   * 문자열이면 한 문단, 배열이면 점 목록으로 그려진다.
   * -------------------------------------------------------------------- */
  join: {
    title: "Join Us",
    lead:  "전기기기 설계와 다중물리 해석 분야 대학원생 · 학부연구생 모집",

    /* 메인 화면에 요약으로 보여 줄 항목. 아래 상세에서 골라 적는다 */
    highlights: [
      "박사 · 석박사통합 · 석사과정, 학부연구생 모집",
      "등록금 전액 지원, 인건비 지급",
      "과제 · 논문 인센티브, 국내외 학술대회 참가 지원"
    ],

    targetsLabel: "모집 대상",
    targets: [
      "박사과정",
      "석박사통합과정",
      "석사과정",
      "학부연구생"
    ],

    qualifyLabel: "자격 · 우대 사항",
    qualify: [
      "학부 3학년 이상",
      "전기전자공학 · 기계공학 관련 전공 우대",
      "석사과정 지원자는 학부연구생 1년 이상 수행 권장"
    ],
    qualifyNote: "위 항목은 우대 사항이며 필수 조건 아님 — 전기기기를 처음 접하더라도 배우려는 의지가 있다면 지원 가능",

    researchLabel: "연구 내용",
    researchNote:  "[연구분야와 연결한 설명 — 추후 확정]",
    researchLink:  "research.html#areas",
    researchLinkLabel: "연구분야 보기",

    applyLabel: "지원 방법",
    howToApply: "관심 연구분야를 적어 아래 메일로 송부",
    applyNote:  "연구실 합류 여부와 무관하게 대학원 생활 · 연구 방향에 대한 문의도 환영",

    supportLabel: "지원 내용",
    support: [
      "등록금 전액 지원",
      "인건비 지급",
      "과제 인센티브 — 참여 과제 수에 따라 차등 지급",
      "논문 인센티브 — 저널 Impact Factor 에 따라 차등 지급",
      "국내외 학술대회 참가 지원"
    ],

    cultureLabel: "연구실 생활",
    culture: [
      "개인별 연구 내용 — 1:1 미팅",
      "참여 프로젝트 — 팀 단위 미팅",
      "주제별 주 1회 이상 진행"
    ]
  },

  /* --- 소식 분류 라벨 (news.js 의 category 값과 대응) -------------------- */
  newsCategories: {
    paper:   "Paper",
    award:   "Award",
    member:  "Member",
    project: "Project",
    etc:     "News"
  },

  /* --- PEOPLE 페이지 소제목 --------------------------------------------
   * 교수 프로필 안에서 쓰는 라벨. (sectionTitles 는 대분류 3개만 담는다)
   * ------------------------------------------------------------------- */
  people: {
    interests:   "Research Interests",
    education:   "Education",
    career:      "Career",
    activities:  "Academic Activities",
    memberships: "Memberships",
    talks:       "Invited Talks",
    scholar:     "Google Scholar",
    viewProfile: "View profile",
    office:      "Office",
    email:       "Email",
    phone:       "Phone",
    thesis:      "Thesis",
    position:    "Current Position"
  },

  /* --- 공통 UI 문구 ----------------------------------------------------- */
  ui: {
    address:    "Address",
    phone:      "Phone",
    email:      "Email",
    directions: "Get Directions",
    viewAll:    "View all",
    readMore:   "Read more",
    scrollDown: "Scroll down",
    empty:      "Nothing here yet.",
    wip:        "Coming soon.",
    menu:       "Menu",
    openMenu:   "Open menu",
    closeMenu:  "Close menu",
    all:        "All",
    rights:     "All rights reserved."
  }
};
