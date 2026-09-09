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

  // 히어로 제목을 끈는 자리. 한 줄에 다 들어가면 붙여 나오고,
  // 좀아지면 이 조각 사이에서만 줄이 나뉘다.
  // 조각을 공백으로 이으면 labName 과 같아야 한다 (다르면 render.js 가 labName 을 그대로 쓴다)
  labNameLines: ["Electro-Mechanical", "Energy Conversion Lab"],
  labShort:   "EMEC",
  labNameKo:  "전기-기계 에너지변환 연구실",     // 푸터·타이틀에서 필요 시 병기
  university: "Soonchunhyang University",
  department: "Department of Electrical Engineering",
  professor:  "Min-Ro Park",

  // 히어로의 연구실 소개. 연구실 이름 아래, 영상 위에 얹힌다.
  // tagline 은 한 문장이고 <strong> 태그를 쓸 수 있다. 비우면 줄째 나오지 않는다.
  // taglinePoints 는 그 아래 항목 목록이다. 비우거나 지우면 문장만 나온다.
  // 항목은 research.js 의 연구분야 넷과 자동화(감춰 둠)를 차례로 훑고,
  // 마지막 줄이 그 모든 것의 도착점(양산 적용)을 밝힌다. 순서를 지킬 것
  tagline: "전기-기계 에너지변환 연구실(EMEC)은 모빌리티, 로봇, 가전, 전력기기에 쓰이는 " +
           "전동기·발전기·변압기의 해석과 설계를 연구합니다.",
  taglinePoints: [
    "전자기에서 열·구조·소음·진동까지 잇는 다중물리 해석 체계 구축",
    "기기·권선·구동 토폴로지와 재료·제조 기술을 고려한 성능 고도화 설계",
    "시스템 모델 기반 실사용 운전 조건 반영 및 대체모델 기반 다목적·강건 최적화",
    "자체 개발 소프트웨어를 통한 설계 자동화 및 개발 기간 단축",
    "산업체 공동연구를 통한 양산 개발 적용"
  ],

  /* \n 은 줄을 바꾸고 싶은 지점이다. 푸터에서만 적용되고,
   * 폭이 좁은 CONTACT 페이지에서는 그냥 띄어쓰기로 이어진다.
   * 주소가 바뀌면 \n 위치도 보기 좋은 곳으로 옮기면 된다 */
  address: {
    /* 호실만 다르고 나머지 주소는 같다. 방마다 주소를 되풀이하지 않도록 떼어 두었다.
       방이 늘면 rooms 에 한 줄만 더한다 */
    rooms: [
      { no: "M417", use: "Professor's Office", useKo: "교수 연구실" },
      { no: "M416", use: "Research Lab",       useKo: "학생 연구실" }
    ],
    full:  "Multimedia Building, Soonchunhyang University, 22 Soonchunhyang-ro,\nAsan-si, Chungcheongnam-do 31538, Republic of Korea",
    fullKo: "충남 아산시 순천향로 22 순천향대학교 멀티미디어관",
    short: "Multimedia Building, M417"    // 교수 프로필의 연구실 한 줄
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
    publications: "ACHIEVEMENTS",
    news:         "ACTIVITIES",   // 하위에 News · Gallery 를 둘 다 덮는 이름
    join:         "JOIN US",
    contact:      "CONTACT"
  },

  submenu: {
    professor:  "Professor",
    current:    "Researchers",
    alumni:     "Alumni",
    areas:      "Areas",
    equipment:  "Facilities",
    projects:   "Projects",
    journal:    "Journal",
    conference: "Conference",
    patent:     "Patent",
    talk:       "Invited Talk",
    news:       "News",
    gallery:    "Gallery"
  },

  sectionTitles: {
    professor:  "Professor",
    current:    "Researchers",
    alumni:     "Alumni",
    overview:   "Overview",
    areas:      "Research Topics",
    applications: "Applications",
    equipment:  "Facilities",
    projects:   "Research Projects",
    ongoing:    "Ongoing",
    completed:  "Completed",
    location:   "Location",
    talks:      "Invited Talks",   // ACHIEVEMENTS 의 초청강연 묶음 제목
    gallery:    "Gallery"
  },

  /* --- 저자 표기 안내 -----------------------------------------------
   * PUBLICATIONS 페이지 상단에 범례로 표시된다.
   * 실제 표기는 data/publications.js 의 authors 문자열에 직접 붙여 쓴다.
   * 기호를 바꾸려면 여기와 authors 문자열을 함께 고쳐야 한다.
   * ------------------------------------------------------------------- */
  pubMarks: [
    { mark: "†", label: "First author" },
    { mark: "*", label: "Corresponding author" }
  ],

  /* --- PUBLICATIONS 의 국제 / 국내 제목 ------------------------------
   * 저널·학술대회는 종류 제목 대신 이 네 가지가 바로 큰 제목으로 나온다.
   * 구분은 각 항목의 domestic 값을 따른다.
   * ------------------------------------------------------------------- */
  pubGroups: {
    journal: {
      international: "International Journal",
      domestic:      "Domestic Journal"
    },
    conference: {
      international: "International Conference",
      domestic:      "Domestic Conference"
    },
    /* 특허는 등록번호(patentNo)가 있으면 등록, 없으면 출원으로 본다 */
    patent: {
      registered:  "Granted Patent",
      application: "Patent Application"
    }
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
   * (예외 — contact 의 문의 안내는 말건네는 말이므로 서술형으로 둔다)
   *
   * 항목을 늘리거나 줄여도 화면이 알아서 따라간다.
   * 필요 없는 항목은 그 줄만 지우면 되고,
   * 라벨을 빈 문자열로 두면 그 덩어리 전체가 표시되지 않는다.
   *
   * 적는 방식이 덩어리마다 조금씩 다르다.
   *   targets  문자열 목록 — 한 줄에 나란히 놓인다
   *   qualify  { label, items } 목록 — 라벨을 왼쪽에 둔 표 모양으로 나온다
   *   support  문자열, 또는 { text, sub, row } — sub 가 있으면 하위 항목으로
   *            들어가고, row: true 면 하위 항목을 두 칸으로 나란히 놓는다
   *   culture  support 와 같은 방식
   *   contact  {email} 자리에 SITE.email 이 링크로 들어간다. 주소를 직접 적지 말 것
   *   researchNote 문자열이면 한 문단, 배열이면 점 목록
   * -------------------------------------------------------------------- */
  join: {
    title: "Join Us",

    /* JOIN US 페이지의 본문 제목이자 메인 요약의 첫 줄 */
    heading: "대학원생 · 학부연구생 모집",

    /* 문의 안내. {email} 은 굴지 말 것 — SITE.email 이 그 자리에 들어간다 */
    contact: [
      "지원 상담 : 간단한 자기소개와 관심 분야를 작성하여 {email} 로 문의"
    ],
    /* 곁들이는 말. qualifyNote 와 같은 톤으로 작게 깔린다 */
    contactNote: "합류 여부와 무관하게 대학원 생활 · 연구 방향 문의도 환영",

    /* 메인 화면에 요약으로 보여 줄 항목. 아래 상세에서 골라 적는다 */
    highlights: [
      "석사 · 박사 · 석박사통합 과정, 학부연구생 모집",
      "등록금 전액 · 매달 인건비 지원",
      "각종 인센티브 · 산학 프로젝트, 국내외 학술대회 참여 지원"
    ],

    targetsLabel: "모집 대상",
    targets: [
      "석사과정",
      "박사과정",
      "석박사통합과정",
      "학부연구생"
    ],

    qualifyLabel: "자격 · 우대 사항",
    /* 과정과 무관하게 공통으로 해당하는 항목. 과정별 조건 위에 먼저 놓인다 */
    qualifyCommon: [
      "전기전자공학 · 기계공학 관련 전공 우대"
    ],
    qualify: [
      {
        label: "석사과정",
        items: ["학부연구생 1년 이상 수행 권장"]
      },
      {
        label: "학부연구생",
        items: [
          "학부 3학년 이상 권장",
          "석사과정 진학 희망자 우대"
        ]
      }
    ],
    qualifyNote: "위 항목은 권장 · 우대 사항이며 필수 조건 아님",

    researchLabel: "연구 내용",
    /* 학부생이 읽는 자리이지만 눈높이를 낮춘다고 풀어쓰지 않는다.
       연구 주제는 research.js 의 네 분야를 그대로 옮기고, 문장만 짧게 둔다.
       자세한 내용은 아래 researchLink 가 연구분야 페이지로 보낸다 */
    researchNote: [
      "전기에너지와 기계에너지를 변환하는 전동기 · 발전기의 해석과 설계",
      {
        text: "연구 주제",
        sub: [
          "전자기장 해석 및 특성 산출 — 손실 · 효율 · 토크 · 전자기 가진력",
          "연성 해석 — 열, 구조, 소음 · 진동",
          "기기 설계 및 요소 기술 — 형상 · 권선 · 재료 · 제조 공정",
          "시스템 기반 · 데이터 기반 설계 — 대체모델, 다목적 · 강건 최적화"
        ]
      },
      {
        text: "응용 분야",
        row: true,
        sub: [
          "전기차 · 항공모빌리티 · 전기추진 선박의 구동 전동기",
          "로봇 관절 액추에이터, 가전용 전동기, 발전기 · 변압기"
        ]
      },
      "유한요소해석 소프트웨어와 MATLAB · Python 을 주된 도구로 사용",
      "학부 교과의 전기기기 · 전자기학 · 회로이론이 직접 이어지는 분야"
    ],
    researchLink:  "research.html#areas",
    researchLinkLabel: "연구분야 보기",

    supportLabel: "지원 내용",
    support: [
      "등록금 전액 · 매달 인건비 지원",
      {
        text: "인센티브",
        row: true,
        sub: [
          "프로젝트 참여 시 : 참여 프로젝트 수 및 역할에 따라 차등 지급",
          "논문 게재 시 : 저널 Impact Factor 에 따라 차등 지급"
        ]
      },
      "산학 프로젝트 참여 기회 제공",
      "국내외 학술대회 참가 지원"
    ],

    cultureLabel: "연구실 생활",
    culture: [
      "정규 연구 시간 : 평일 오전 9시 ~ 오후 6시",
      {
        text: "미팅 : 주제별 주 1회 이상 진행",
        row: true,
        sub: [
          "개인 연구 : 1:1 미팅",
          "프로젝트 : 팀 단위 미팅"
        ]
      }
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
    publications: "Publications",   // 프로필 창의 참여 논문 소제목
    career:      "Career",
    activities:  "Academic Activities",
    memberships: "Memberships",
    scholar:     "Google Scholar",
    viewProfile: "View profile",
    gradeSuffix: "학년",      // 학부연구생 목록의 학년 라벨
    office:      "Office",
    email:       "Email",
    phone:       "Phone",
    /* 학위논문 라벨. 박사는 dissertation, 석사는 thesis (IEEE 표기 기준) */
    thesis:       "Thesis",
    dissertation: "Dissertation",
    position:    "Current Position"
  },

  /* --- 공통 UI 문구 ----------------------------------------------------- */
  ui: {
    address:    "Address",
    phone:      "Phone",
    email:      "Email",
    directions: "Get Directions",
    role:       "Role",
    period:     "Period",
    viewAll:    "View all",
    readMore:   "Read more",
    topics:     "Keywords",
    prevArea:   "Previous",
    nextArea:   "Next",
    scrollDown: "Scroll down",
    empty:      "Nothing here yet.",
    // PUBLICATIONS 에서 올해보다 이전 논문을 묶는 줄의 제목.
    // {year} 자리에 묶음 안에서 가장 최근 연도가 들어간다
    pubEarlier: "~{year}",
    wip:        "Coming soon.",
    menu:       "Menu",
    openMenu:   "Open menu",
    closeMenu:  "Close menu",
    rights:     "All rights reserved."
  }
};
