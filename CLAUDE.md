# 프로젝트: EMEC Lab 홈페이지

순천향대학교 전기공학과 **Electro-Mechanical Energy Conversion (EMEC)** 연구실 공식 홈페이지.

---

## 0. 변경 가능한 값 — 단일 소스 원칙

> **가장 중요한 규칙.** 아래 값들은 앞으로 바뀔 수 있다.
> 각 값은 **정해진 한 곳에만** 존재해야 하며, HTML이나 여러 JS 파일에 흩어져 있으면 안 된다.

| 값 | 저장 위치 | 절대 하드코딩 금지 대상 |
|---|---|---|
| 연구실명, 약칭, 소속 | `data/site.js` | 모든 HTML의 헤더·푸터·타이틀 |
| 주소, 전화번호, 이메일, 지도 좌표 | `data/site.js` | 푸터, Contact 페이지, 교수 프로필 |
| 메뉴 라벨, 섹션 제목 | `data/site.js` | 네비게이션, 각 페이지 소제목 |
| 메인 색상 및 파생 색상 | `js/theme.js` + `css/custom.css` | Tailwind 클래스에 hex 직접 입력 |
| 교수 정보 | `data/members.js` | HOME의 교수 소개 섹션 |
| 모집 안내 문구 | `data/site.js` (`SITE.join`) | `join.html`, HOME의 모집 요약 |
| SNS·외부 링크 | `data/site.js` | 푸터 |

**연락처 참조 규칙**

- 전화번호·이메일은 `SITE.phone`, `SITE.email`로만 참조한다.
- 이메일은 `mailto:`, 전화는 `tel:` 링크로 감싸되, 표시 텍스트와 링크 주소 모두 `SITE` 값에서 생성한다.
- 교수 프로필(`MEMBERS`)의 `email`, `office`가 대표 연락처와 같다면 중복 입력하지 말고 `SITE`를 참조한다.

**검증 기준:** `data/site.js`에서 연구실 이름·주소·연락처를 바꾸고 `js/theme.js`에서 색상 하나를
바꿨을 때, 다른 파일을 전혀 건드리지 않아도 사이트 전체에 반영되어야 한다.

아래 명령의 결과가 모두 비어 있어야 한다.

```bash
grep -rn "EMEC" *.html
grep -rn "26539C" --include="*.html" --include="*.css" . | grep -v "theme.js\|custom.css\|_papers/"
grep -rn "041-530\|minro@\|M41" *.html js/
```

### data/site.js

```javascript
const SITE = {
  labName:    "Electro-Mechanical Energy Conversion Lab",
  labShort:   "EMEC",
  labNameKo:  "전기-기계 에너지변환 연구실",     // 푸터·타이틀에서 필요 시 병기
  university: "Soonchunhyang University",
  department: "Department of Electrical Engineering",
  professor:  "Min-Ro Park",

  tagline: "[한 줄 정체성 문구 — 추후 확정]",   // <strong> 태그 사용 가능

  address: {
    // 호실만 다르고 나머지 주소는 같다. 방마다 주소를 되풀이하지 않도록 떼어 둔다.
    // 방이 늘면 rooms 에 한 줄만 더한다
    rooms: [
      { no: "M417", use: "Professor's Office", useKo: "교수 연구실" },
      { no: "M416", use: "Research Lab",       useKo: "학생 연구실" }
    ],
    full:  "Multimedia Building, Soonchunhyang University, 22 Soonchunhyang-ro, Asan-si, Chungcheongnam-do 31538, Republic of Korea",
    fullKo: "충남 아산시 순천향로 22 순천향대학교 멀티미디어관",
    short: "Multimedia Building, M417"   // 교수 프로필의 연구실 한 줄
  },

  phone: "041-530-1334",
  email: "minro@sch.ac.kr",

  // 지도 좌표 — 캠퍼스 기준 근사값. 멀티미디어관 정확한 위치로 검증 후 교체할 것
  mapLat: 36.7706,
  mapLng: 126.9328,

  links: {
    scholar:    "",
    university: "https://home.sch.ac.kr"
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

  // 드롭다운이 있는 네 메뉴에만 하위 항목이 있다
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

  // 페이지 안의 섹션 제목. HTML 은 <h2 data-section-title="areas"> 처럼 키만 적는다
  sectionTitles: {
    professor:  "Professor",
    current:    "Researchers",
    alumni:     "Alumni",
    overview:   "Overview",          // 분야 관계도
    areas:      "Research Topics",   // 분야 카드 목록
    applications: "Applications",
    equipment:  "Facilities",
    projects:   "Research Projects",
    ongoing:    "Ongoing",
    completed:  "Completed",
    location:   "Location",
    talks:      "Invited Talks",   // ACHIEVEMENTS 의 초청강연 묶음 제목
    gallery:    "Gallery"
  },

  // ACHIEVEMENTS 의 묶음 제목. 판정 기준은 js/render.js 의 PUB_SPLITS
  // 초청강연은 나눌 것이 없어 여기 두지 않고 sectionTitles.talks 를 쓴다
  pubGroups: {
    journal:    { international: "International Journal",    domestic:    "Domestic Journal" },
    conference: { international: "International Conference", domestic:    "Domestic Conference" },
    patent:     { registered:    "Granted Patent",           application: "Patent Application" }
  }
};
```

### 색상 정의

```javascript
// js/theme.js  — Tailwind CDN 스크립트 바로 뒤에 동기 로드
// 파생 색상은 메인 색상에서 계산된 값이다. 메인 변경 시 함께 조정할 것
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26539C',   // 메인 색상 (RGB 38, 83, 156)
          dark:    '#1B3C71',   // hover, 강조
          light:   '#E8EEF7',   // 배경 톤
          mid:     '#5C81BC'    // 보조
        },
        // 강조용 보조색. 메인 남색과 구분되는 초록 계열
        accent: {
          DEFAULT: '#047857',   // emerald 700
          dark:    '#065F46'
        }
      }
    }
  }
};
```

```css
/* css/custom.css */
:root {
  --color-primary:       #26539C;
  --color-primary-dark:  #1B3C71;
  --color-primary-light: #E8EEF7;
}
```

**사용 규칙:** 색상은 `bg-primary`, `text-primary-dark`, `var(--color-primary)` 형태로만 참조한다.
`#26539C`를 코드 어디에도 직접 쓰지 않는다. (위 두 파일 제외)

---

## 1. 프로젝트 개요

**주요 방문자 (우선순위 순)**

1. 대학원 진학을 고려하는 학생 — 연구 분야, 구성원, 졸업생 진로를 봄
2. 공동연구·산학협력 제안자 — 연구 실적, 장비, 과제 이력을 봄
3. 논문을 보고 찾아온 동료 연구자 — Publications를 봄

**설계 목표**

- 코드를 모르는 대학원생이 데이터 파일만 수정해서 계속 운영할 수 있을 것
- 5년 뒤에도 빌드 오류 없이 그대로 열리고 수정 가능할 것
- 연구실명·색상 등 브랜드 요소를 한 곳에서 바꿀 수 있을 것

---

## 2. 언어 표기 원칙

> **다국어 전환 기능을 만들지 않는다.** 언어 토글 버튼, `localStorage` 언어 저장,
> 데이터의 `ko`/`en` 이중 필드를 **모두 사용하지 않는다.** 각 항목은 문자열 하나다.

**기본은 영문으로 작성한다.** 국문이 더 적절한 경우에만 국문을 쓰거나 병기한다.
어느 쪽을 쓸지는 내용에 따라 판단하며, 일괄 규칙을 강제하지 않는다.

| 상황 | 표기 | 예 |
|---|---|---|
| 메뉴, 섹션 제목 | 영문 | `RESEARCH`, `Journal Papers` |
| 논문 제목, 저널명, 학회명(국제) | 영문 원문 | `IEEE Transactions on Magnetics` |
| 인명 | 영문 + 괄호 국문 병기 | `Min-Ro Park (박민로)` |
| 국내 학회·기관·직책 | 국문 그대로 | `학술이사, 대한전기학회 (전기기기 및 에너지변환시스템 부문)` |
| 국내 학술대회 발표 | 국문 그대로 | `대한전기학회 하계학술대회` |
| 국내 과제명, 지원기관 | 국문 그대로 | `한국연구재단`, `산업통상자원부` |
| 소식 본문 | 상황에 맞게 | 국내 수상 소식은 국문, 국제 논문 게재는 영문 |
| 주소 | 영문 기본, 국문 병기 가능 | `SITE.address.full` / `.fullKo` |
| 연구분야 제목·설명 라벨 | 영문 | `Coupled-field Analysis`, `Thermal Analysis :` |
| 연구분야 설명 본문·키워드 | 국문 | `열등가회로 구성 및 냉각 방식별 온도 예측` |

**연구분야만 영문 라벨 + 국문 본문으로 간다.** 전기기기 전문 용어는 국문 쪽이 더
정확하고(쇄교자속 · 등가자기회로 · 권선 절환), 이 페이지의 주 독자가 진학을 고려하는
국내 학생이기 때문이다. 대신 뼈대(제목 · 라벨)는 영문으로 두어 다른 페이지와 결을 맞춘다.
표준 약어는 괄호로 병기한다 (`(LPTN)`, `(NVH)`, `(SMC)`, `(GP · DTL)`).

**억지 번역을 하지 않는다.** 국문이 원본인 고유명사를 영어로 옮기면 국내·해외 양쪽 모두에게 불친절해진다.

---

## 3. 기술 스택 (변경 금지)

| 항목 | 결정 |
|---|---|
| 구조 | 순수 HTML + CSS + 바닐라 JS |
| 빌드 도구 | **사용하지 않음** (npm, webpack, vite, 번들러 일체 금지) |
| CSS | Tailwind CSS **CDN 방식** |
| 프레임워크 | React, Vue, Next.js, Astro 등 **사용 금지** |
| 데이터 | `data/*.js` 파일에 `const` 배열/객체로 저장 |
| 배포 | GitHub Pages (`EMEC` 조직, main 브랜치, root) |

**이 제약을 두는 이유**

- 빌드 과정이 있으면 몇 년 뒤 의존성 충돌로 수정이 불가능해짐
- HTML 파일을 더블클릭하면 즉시 브라우저에서 확인 가능해야 함
- 데이터를 `.json`이 아닌 `.js`로 두는 이유: `file://` 프로토콜에서 CORS 없이 로드하기 위함

외부 라이브러리가 꼭 필요하면 **CDN으로만** 추가하고, 추가 전에 먼저 물어볼 것.

**HTML `<head>` 로드 순서 (모든 페이지 동일)**

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="js/theme.js"></script>       <!-- tailwind.config 설정 -->
<link rel="stylesheet" href="css/custom.css">
<!-- body 끝: data/*.js → js/render.js → js/common.js 순서 -->
```

---

## 4. 폴더 구조

```
/
├── index.html          # HOME
├── people.html
├── research.html
├── research-area.html  # 연구분야 상세. #해시로 어느 분야인지 고른다
├── publications.html
├── news.html        # 글 소식
├── gallery.html     # 사진 게시글 (앨범 단위)
├── join.html        # 대학원생 모집 안내
├── contact.html
├── .nojekyll
├── css/
│   └── custom.css
├── js/
│   ├── theme.js        # 색상 정의 (Tailwind config)
│   ├── common.js       # 헤더/푸터 삽입, 공통 유틸
│   └── render.js       # 데이터 → HTML 렌더링 함수
├── data/
│   ├── site.js         # 연구실 정보, 연락처, 메뉴·섹션 라벨
│   ├── members.js
│   ├── publications.js
│   ├── projects.js
│   ├── news.js
│   ├── research.js
│   ├── equipment.js
│   └── gallery.js
├── images/
│   ├── members/
│   ├── research/
│   ├── sponsors/       # 지원기관 CI. SVG 우선
│   └── gallery/
│   ├── hero.mp4        # 히어로 배경 영상
│   └── hero-poster.jpg
└── README.md           # 학생용 운영 매뉴얼
```

---

## 5. 메뉴 구조

```
HOME                                → index.html
PEOPLE ▾
  ├ Professor                       → people.html#professor
  ├ Researchers                     → people.html#current
  └ Alumni                          → people.html#alumni
RESEARCH ▾
  ├ Areas                           → research.html#areas
  ├ Facilities                      → research.html#equipment
  └ Projects                        → research.html#projects
ACHIEVEMENTS ▾
  ├ Journal                         → publications.html#journal
  ├ Conference                      → publications.html#conference
  ├ Patent                          → publications.html#patent
  └ Invited Talk                    → publications.html#talk
ACTIVITIES ▾
  ├ News                            → news.html#feed
  └ Gallery                         → gallery.html#albums
JOIN US                             → join.html
CONTACT                             → contact.html
```

- 1단계 메뉴는 **대문자**로 표기한다. 드롭다운 항목은 일반 표기.
- 드롭다운은 **PEOPLE, RESEARCH, ACHIEVEMENTS, ACTIVITIES 네 곳**이다.
  앞 세 곳의 하위 항목은 **같은 페이지의 앵커**로 연결한다.
  **ACTIVITIES 만 예외**로, Gallery 가 별도 파일(`gallery.html`)이다 — 사진이 무거워
  소식과 같은 페이지에 두면 느려지기 때문이다.
  대메뉴와 다른 파일인 하위 항목은 `common.js` 의 `pageLabel()` 이
  그 항목의 라벨로 제목 밴드를 채운다.
- HOME, JOIN US, CONTACT 는 하위 항목이 없다. 한 번에 해당 페이지로 간다.
- 각 섹션에는 반드시 아래 표의 `id` 속성을 부여한다.
- 메뉴 라벨은 **상위·하위 모두** `SITE.menu` / `SITE.submenu`에서 읽어온다. 네비게이션 HTML에 직접 쓰지 않는다.
- 상위 메뉴가 일곱 개라 가로로 빽빽하다. **더 늘릴 때는 가로 메뉴가 나타나는
  기준 폭을 `lg`(1024px)에서 `xl`(1280px)로 올려야 한다.**

**용어 대응표** — 문서·코드 전반에서 혼용하지 말 것.

| 메뉴 | 섹션 제목 | 데이터 파일 | 앵커 |
|---|---|---|---|
| Professor | Professor | `members.js` (`role: professor`) | `#professor` |
| Researchers | Researchers | `members.js` | `#current` |
| Alumni | Alumni | `members.js` (`role: alumni`) | `#alumni` |
| Areas | Research Topics | `research.js` | `#areas` |
| Facilities | Facilities | `equipment.js` | `#equipment` |
| Projects | Research Projects | `projects.js` | `#projects` |
| Journal | International / Domestic Journal | `publications.js` (`type: journal`) | `#journal` |
| Conference | International / Domestic Conference | `publications.js` (`type: conference`) | `#conference` |
| Patent | Granted Patent / Patent Application | `publications.js` (`type: patent`) | `#patent` |
| Invited Talk | Invited Talks | `members.js` (교수의 `talks`) | `#talk` |
| News | — | `news.js` | `#feed` |
| Gallery | — | `gallery.js` | `#albums` |
| JOIN US | — | `site.js` (`SITE.join`) | `#join` |
| CONTACT | Location | `site.js` | `#location` |

---

## 6. 데이터 파일 명세

> **철칙: 논문·구성원·소식 등 계속 추가되는 내용을 HTML에 직접 쓰지 않는다.**
> 모든 텍스트 필드는 **문자열 하나**다. `{ ko: ..., en: ... }` 구조를 쓰지 않는다.

### data/members.js

```javascript
const MEMBERS = [
  {
    id: "prof-park",
    role: "professor",        // professor | postdoc | phd | ms | undergrad | alumni
    name: "Min-Ro Park (박민로)",
    title: "Professor",       // Assistant / Associate / Professor 등 실제 직급
    photo: "images/members/park.jpg",
    email: "",                // SITE.email과 같으면 비워둘 것
    office: "",
    interests: "Electric machine design and analysis, Multi-physics analysis",
    grade: null,              // 학부연구생 전용. 학년(숫자). 대학원생은 null

    // 한 줄씩 문자열. 날짜는 줄 끝에, 학위명은 맨 앞에 둔다
    education: [
      "Ph.D., Department of Automotive Engineering, Hanyang University, Seoul, 2020.02",
      "B.S., Department of Electrical Engineering, Chungnam National University, Daejeon, 2013.02"
    ],
    // 경력은 반대로 기간이 맨 앞에 온다. 렌더러가 양쪽을 다 받는다
    career: [
      "2022.03 – Present, Assistant Professor, Department of Electrical Engineering, Soonchunhyang University, Asan"
    ],

    // 교수 전용. activities · memberships 는 career 와 같은 한 줄 문자열이다
    activities: [], memberships: [],

    // 초청강연. { date, host, title } 객체 배열.
    // 데이터는 여기 있지만 화면에는 ACHIEVEMENTS 의 Invited Talk 탭에 나온다.
    // 교수 프로필에는 더 이상 나오지 않는다 (7번 항목 참조)
    talks: [
      { date: "2026-06-10", host: "대구대학교", title: "고출력 밀도 전동기 설계를 위한 열등가회로 해석 기법" }
    ],
    scholar: "",

    // 재학생 전용
    honors: "",               // 선발·장학 이력. 한 문자열로 적는다
                              // 예 "과학기술전문사관 장학생 (국방과학연구소, ADD)"
                              // 카드와 프로필 창의 학위 바로 아래에 나온다
                              // 비우면 그 줄이 나오지 않는다

    // 졸업생 전용
    gradYear: null,           // 예: 2026. 묶음 정렬의 보조 값
    thesis: "",
    currentPosition: ""       // 예: "LG전자 책임연구원"
  }
];

/* 재학생 묶음 — role 기준 */
const MEMBER_ROLE_ORDER  = ["postdoc", "phd", "ms", "undergrad"];
const MEMBER_ROLE_LABELS = {
  postdoc: "Post-doctoral Researcher", phd: "Ph.D. Candidate",
  ms: "M.S. Candidate", undergrad: "Undergraduate Student"
};

/* 졸업생 묶음 — title 기준 */
const ALUMNI_DEGREE_ORDER  = ["phd", "ms", "undergrad"];
const ALUMNI_DEGREE_LABELS = {
  phd: "Ph.D. degree", ms: "M.S. degree", undergrad: "B.S. degree"
};
```

**학력 · 경력은 한 줄 문자열로 적고 모양은 렌더러가 만든다.**
날짜를 앞으로 빼고 바로 뒤 조각(학위명 · 직위)을 굵게 하는 일은 `datedList()` 가 한다.
데이터에 HTML 을 적지 않는다.

**`interests` 는 쉼표로 가른다.** 한 조각이 카드의 태그 하나가 된다.
조각 안에 쉼표를 넣지 말 것. 카드 폭에서 한 줄에 들어가도록
**한 조각은 50자 안팔으로** 둔다.

### data/publications.js

```javascript
const PUBLICATIONS = [
  {
    type: "journal",          // journal | conference | patent
    year: 2026,               // 연도별 그룹핑 기준
    date: "2026-03",          // 같은 연도 안에서의 정렬 기준. 아래 표 참조
    authors: "H. Kim, M.-R. Park",
    title: "",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 62, no. 3, pp. 1-5",
    doi: "",
    impact: "1.9",            // 게재 당시의 JCR Impact Factor. 국제 저널에만
    jcrTop: "", jcrRank: "", jcrQuartile: "",   // 상위 % / 순위 / 분위
    domestic: false,          // 화면 분류 기준. false → International, true → Domestic
    patentNo: "",             // patent 전용. 등록번호. 채워지면 Granted 로 분류된다
    applicationNo: "",        // patent 전용. 출원번호
    country: "KR"
  }
];
```

국내 학술대회는 국문 그대로 적는다.
예: `venue: "대한전기학회 하계학술대회"`, `title: "매입형 영구자석 전동기의 ..."`

**학술대회의 `venue` 와 `detail`**

```javascript
venue:  "2026 IEEE Energy Conversion Congress and Exposition (ECCE 2026)"
detail: "Vancouver, Canada, 2026.10.04 ~ 10.08"
```

- 풀네임 뒤에 **괄호로 약어를 병기**한다. 약어에는 년도를 포함한다 (`ECCE 2026`)
- 약어가 없는 국내 학회는 풀네임만 적는다
- 기간은 `개최지, YYYY.MM.DD ~ MM.DD`. 해가 넘어가면 끝 날짜도 연도까지 적는다

**저널 지표는 국제 저널에만 적는다.**

```
[IF 8.9, JCR top 3.3% (6/184), Q1]
```

- 모두 **게재 시점에 공개되어 있던 JCR 판본** 기준이다.
  JCR 은 매년 6월에 전년도 판이 나오므로, 2020년 1월 게재라면 JCR 2018 이 최신이다
- 저널이 여러 카테고리에 속하면 **가장 높은 카테고리** 기준으로 적는다
- 채워진 값만 대괄호 안에 모여 나온다. 비우면 그 조각만 생략된다
- **Q1 · Q2 일 때만 `text-accent`(초록)로 짚는다.**
  논문 제목이 `text-primary`(남색)이라 같은 색을 쓰면 묻힌다.
  Q3 · Q4 는 앞의 서지 정보와 같은 회색·보통 굵기로 둔다
- 자료가 없는 값은 비워 둔다. **추측해서 채우지 않는다**
- 출처는 `Journal&Conference_2026update2.xlsx` (저널 · 판본별 IF · 순위 · 분위)

**저자 역할 표기는 `authors` 문자열 안에 직접 붙인다.**

```javascript
authors: "Dong-Hoon Ko†, Yong-Min Lee†, Min-Ro Park*"
```

| 기호 | 뜻 |
|---|---|
| `†` | 주저자. 공동 주저자면 여러 명에 붙인다 |
| `*` | 교신저자. 공동 교신저자도 같은 표기 |

두 역할을 겸하면 이어 쓴다 (`Min-Ro Park†*`).
렌더러가 이름과 기호를 나눠 기호만 윗첨자로 올리므로, 구성원 볼드 처리는 그대로 동작한다.
범례 문구는 `data/site.js` 의 `SITE.pubMarks` 에 있다. **기호를 바꿀 때는 둘을 함께 고친다.**

**`date` 는 종류마다 가리키는 날짜가 다르다.**

| 종류 | 적는 날짜 | 형식 |
|---|---|---|
| journal | 게재 년월 (Issue Date) | `"2026-03"` |
| conference | 발표일 | `"2026-07-16"` |
| patent | 등록일 | `"2023-08-22"` |

Early Access 라 아직 호가 정해지지 않았으면 **빈 문자열로 둔다.**
`detail` 에 `Early Access` 라 적혀 있으면 그 해의 **맨 위**로 올라간다.
날짜를 모르는 항목(비었고 Early Access 도 아닌 경우)은 맨 아래로 내려간다.

정렬 순서는 `js/render.js` 의 `comparePubs()` 에 있다.
연도 내림차순 → Early Access → `date` 내림차순 → 날짜 미상.

**분류를 손으로 적어두지 않는다.** 화면의 묶음은 아래 두 값에서 매번 계산된다.

| 종류 | 묶음 | 판정 |
|---|---|---|
| journal, conference | International / Domestic | `domestic` |
| patent | Granted / Application | `patentNo` 가 비어 있으면 출원 |

`domestic` 은 학과 평가·통계에도 그대로 쓴다.
특허가 등록되면 `patentNo` 를 채우기만 하면 저절로 Granted 묶음으로 옮겨간다.
과제의 `getStatus()` 와 같은 이유다 — 상태를 손으로 적으면 갱신되지 않는다.

### data/projects.js

```javascript
const PROJECTS = [
  {
    id: "proj-2024-001",
    title: "고효율 매입형 영구자석 전동기 설계 기술 개발",
    sponsor: {
      name: "한국연구재단",
      logo: "images/sponsors/nrf.svg",
      url: "https://www.nrf.re.kr"     // 선택. 화면 표시 안 함
    },
    ministry: "과학기술정보통신부",       // 선택. 기본적으로 표시하지 않음
    startDate: "2024-03-01",            // YYYY-MM-DD 필수
    endDate:   "2027-02-28",            // YYYY-MM-DD 필수
    role: "PI",                         // PI | Co-I | Advisor  (지도교수 개인의 역할)
    program: "",                        // 선택. 세부 사업명
    pi: "",                             // 선택. 지도교수가 아닌 연구책임자 이름
    orgRole: "주관",                     // 선택. 주관 | 공동 | 위탁 (기관 단위). 화면 표시 안 함
    statusOverride: null,               // null이면 자동 판정
    grantNo: "",                        // 화면 표시 안 함. 논문 사사 문구 작성용
    description: ""                     // 선택. 한두 문장
  }
];

const PROJECT_ROLES = {
  "PI":      "Principal Investigator",
  "Co-I":    "Co-Investigator",
  "Advisor": "Academic Advisor"
};
```

**학생이 연구책임자인 과제**는 `role: "Advisor"` 에 `program` 과 `pi` 를 함께 적는다.

```javascript
role: "Advisor",
program: "석사과정생연구장려금지원사업",
pi: "이용민 (석사과정)"
```

사업명과 연구책임자는 과제 한 줄 아래에 작게 따로 붙는다.
둘 다 비우면 그 줄이 나오지 않는다. 라벨 문구는 `SITE.ui.projectPI` 에 있다.

**`role`과 `orgRole`은 다른 축이다.**

- `role` — 지도교수 **개인**이 그 과제에서 연구책임자인지 공동연구원인지
- `orgRole` — **기관**(순천향대)이 컨소시엄에서 주관/공동/위탁 중 어디인지

위탁과제의 연구책임자(`role: "PI"`, `orgRole: "위탁"`)처럼 조합이 교차할 수 있다.
홈페이지에는 `role`만 표시한다.

**진행 상태 판정**

```javascript
function getStatus(p) {
  if (p.statusOverride) return p.statusOverride;
  return new Date(p.endDate) >= new Date() ? 'ongoing' : 'completed';
}
```

`status` 값을 데이터에 직접 적어두지 않는다. 손으로 적으면 과제가 끝나도 갱신되지 않아
종료된 과제가 계속 진행중으로 남는다. 조기종료·기간연장 등 예외에만 `statusOverride`를 쓴다.

**정렬 규칙**

1. `ongoing` 과제를 먼저, `completed` 과제를 그 아래에 배치
2. 각 그룹 내부는 **시작일(`startDate`) 내림차순** — 최근 시작한 과제가 위

```javascript
const SORT_DESC = true;   // false로 바꾸면 오래된 과제부터 표시

const sorted = [...PROJECTS].sort((a, b) => {
  const sa = getStatus(a), sb = getStatus(b);
  if (sa !== sb) return sa === 'ongoing' ? -1 : 1;
  const diff = new Date(b.startDate) - new Date(a.startDate);
  return SORT_DESC ? diff : -diff;
});
```

**지원기관 로고(CI) 취급**

- `images/sponsors/` 에 저장. **SVG 우선**, 없으면 배경 투명 PNG (높이 200px 이상)
- 표시 높이를 `h-7` 등으로 통일하고 너비는 `auto`. 로고마다 가로세로비가 달라 강제 리사이즈 금지
- 기관명이 바로 위에 있으므로 `<img>` 의 `alt` 은 비운다 (음성 안내에서 중복되지 않게)
- **기관명은 항상 텍스트로 보여 주고, 로고는 그 아래에 붙인다.** 로고가 이름을 대신하지 않는다
- `logo`가 비어 있으면 기관명만 나온다
- 기관 CI는 사용 지침이 있는 경우가 많다. 색상 변형·형태 왜곡 없이 원본 그대로 사용
- 로고에 링크를 걸지 않는다
- `ministry`는 기본적으로 표시하지 않는다. 필요하면 지원기관 옆에 작은 글씨로 병기

### data/news.js

```javascript
const NEWS = [
  {
    date: "2026-08-15",
    category: "paper",        // paper | award | member | project | etc
    text: "김OO 학생의 논문이 IEEE Trans. Ind. Electron.에 게재 승인되었습니다.",
    link: "",                 // 선택
    image: ""                 // 선택. 있으면 썸네일 표시
  }
];
```

`category`는 화면에 표시하지 않아도 무방하나 반드시 기록한다.
수상 실적이 쌓이면 `category === "award"`만 걸러 별도 페이지를 만들 수 있다.

### 기타

- `research.js` — 연구분야 3~5개(현재 보이는 것 4개). 제목, 한 줄 요약(`summary`),
  키워드 목록(`topics`, 한 줄씩 문자열), 설명(`description`, 항목마다 `\n` 으로 가른다),
  대표 이미지(`image`), 상세 페이지에 더 붙일 이미지(`images`, 한 장씩 `{ src, caption }`).
  **`caption` 은 화면에 나오지 않는다.** 그림 안에 이미 글자가 있어 아래에 한 줄을 더
  두면 같은 말이 두 번 된다. 값은 그대로 두고 `<img>` 의 `alt` 로만 쓴다 (음성 안내용).
  `hidden: true` 를 두면 목록·상세·이동 버튼 어디에도 나오지 않는다.
  관계도(`overview.svg`)에는 그대로 남으므로, 내용이 준비되면 그 줄만 지우면 살아난다.
  **분야는 방법론 축으로 잡는다.** 응용 대상(xEV · 로봇 · 가전 등)은 분야마다
  겹치므로 같은 파일의 `APPLICATIONS` 배열(묶음명 + 항목)에 따로 둔다
- `equipment.js` — 장비명, 사양, 사진
- `gallery.js` — 앨범 단위. 앨범명, 날짜, 이미지 배열

---

## 7. 페이지별 요구사항

### HOME (index.html)

**섹션 순서**

1. **히어로** — 9번 항목의 상세 규격에 따름
2. **연구분야 요약** — 분야 전체를 카드로, 제목 + 두 줄 요약 → `research.html#areas` 링크
3. **최근 소식** — 최신 3건 → `news.html` 링크
4. **모집 안내 요약** — `SITE.join.heading` + `highlights` → `join.html` 링크

연구분야가 먼저 온다. 방문자의 첫 질문은 "무엇을 연구하는가"이기 때문.

**잠시 감춘 섹션** — 아래 세 가지는 사용자 요청으로 화면에서 내렸다.
`index.html` 의 "감쯐 섹션" 주석 안에 그대로 남아 있으므로 **주석만 풀면 되살아난다.**
다시 살릴 때 위치는 연구분야 다음이다.

- **지도교수 소개** — 사진 + 3~4문장 → `people.html#professor` 링크
- **현황 지표** — 아래 자동 집계 참조
- **최근 논문** — 최신 3건 → `publications.html` 링크

**현황 지표는 반드시 자동 집계한다.** 숫자 하드코딩 금지.

```javascript
const phdCount     = MEMBERS.filter(m => m.role === 'phd').length;
const journalCount = PUBLICATIONS.filter(p => p.type === 'journal').length;
const alumniCount  = MEMBERS.filter(m => m.role === 'alumni').length;
const ongoingCount = PROJECTS.filter(p => getStatus(p) === 'ongoing').length;
```

**각 섹션은 나중에 별도 페이지로 분리할 수 있도록 독립된 블록으로 작성하고 `id`를 부여한다.**

### PEOPLE (people.html)

```
#professor   — 사진 크게, 학력·경력·연구관심사·Google Scholar 전체 노출
#current     — 박사 / 석사 / 학부연구생 순. 학위 과정별로 소제목을 두고 카드 그리드
#alumni      — 재학생과 같은 카드. 학위별로 소제목을 두고, 학위 옆에 졸업 년월을 적는다
```

교수는 학생과 **다른 레이아웃**으로 렌더링한다. 같은 카드 크기로 나열하지 않는다.

**학생 카드 구성** — 가운데 정렬, 위에서부터

```
[증명사진 3:4]
Hye-Seong Kim       영문 이름 (굵게)
김혜성               국문 이름 (작게 · 회색)
M.S. Candidate      title 값 (파란색)
[Data-driven optimal design and analysis]            interests 를 쉼표로 가른 태그
[Vibration and noise analysis]
```

**선발·장학 이력은 `honors` 한 줄로 적는다.** 학위 바로 아래에 나온다.
장학·사관 제도처럼 재학 중의 이력을 적는 자리이며, 졸업생의 `currentPosition`
과는 다른 축이다. 국내 제도명은 국문 그대로 쓴다 (2번 항목).

**데이터에는 한 문자열로 적는다.** 카드는 좁아서 렌더러가 괄호 앞에서 줄을
바꾸고, 프로필 창은 넓으므로 한 줄로 둔다. 데이터에 `<br>` 을 쓰지 않는다.

```
M.S. Candidate
과학기술전문사관 장학생          honors — 카드에서는
(국방과학연구소, ADD)             괄호 앞에서 줄이 바뀐다
```

졸업생 카드는 같은 모양에 두 줄이 더 붙는다.

```
M.S. degree  2026.02        학위(ALUMNI_DEGREE_LABELS) + 졸업 년월(education 에서 읽음)
Korea Automotive Technology Institute (KATECH)      currentPosition. 비우면 줄이 안 나온다
```

- `interests` 는 **쉼표로 구분해 적으면 태그 하나씩으로 나눠진다**
- **태그는 한 줄을 넘기지 않게 둔다.** 그래서 카드 열이 바뀌는 기준이
  `md`(2열) · `xl`(3열) 이다. 한 단계씩 낮추면 좌우 칸이 좁아져 긴 태그가 접힌다
- **학부연구생은 카드를 쓰지 않는다.** 인원이 많고 사진도 없어,
  `grade` 로 묶어 이름만 나열한다 (높은 학년부터)

  ```
  4학년   정민구 · 신주현 · 이현규 · 김호윤 · 노진성 · 한영준 · 최영준
  3학년   정석환 · 김우성
  ```
- **졸업생은 학위별로 묶는다.** 순서와 라벨은 `members.js` 의
  `ALUMNI_DEGREE_ORDER` · `ALUMNI_DEGREE_LABELS` 에 있다 (`Ph.D. degree` · `M.S. degree` · `B.S. degree`).
  어느 묶음인지는 그 사람의 `title` 로 판정하므로 별도 필드를 두지 않는다.
  **해당자가 없는 묶음은 소제목째 나오지 않는다**
- **졸업 년월은 따로 적지 않는다.** `education` 의 해당 학위 줄 끝에 있는 날짜를
  렌더러가 읽어 온다. 정렬도 이 값 기준이라 같은 해 졸업자끼리도 월까지 보고 가른다
- 카드의 **View Profile** 을 누르면 프로필 창이 열린다.
  별도 페이지를 만들지 않고 `people.html` 안의 `#member-modal` 을 쓴다
- 프로필 창은 **학력**과 **참여 논문**을 보여 준다.
  논문은 `PUBLICATIONS` 의 `authors` 에서 그 사람 이름을 찾아 **자동으로** 가져온다.
  따로 목록을 적어두지 않는다
- 논문은 **PUBLICATIONS 페이지와 같은 기준**으로 나눈다.
  종류(저널 → 학술대회 → 특허) 안에서 국제 → 국내, 그 안은 최신순이다.
  기준은 `PUB_SPLITS`, 제목은 `SITE.pubGroups` 를 그대로 쓴다
- 프로필 창 안에서는 **그 사람만** 짚는다.
  표시 방식은 PUBLICATIONS 페이지와 같다 (굵게 + 밑줄). 달라지는 것은 대상뿐이다
- **학력은 날짜를 앞에 두고 학위명을 굵게 한다.**
  데이터는 `"B.S., 학과, 학교, 도시, 2024.02"` 처럼 한 줄 문자열로 적고,
  렌더러(`datedList()`)가 끝의 년월을 떼 왜쪽 칸으로 옮긴다.
  교수 페이지의 학력 · 경력 · 학회 활동 · 학회 회원이 **모두 같은 날짜 칸**을 쓴다
  (`render.js` 의 `DATE_COL` 한 곳에서 온다). ACHIEVEMENTS 의 초청강연도 같은 칸이다
- **초청강연은 교수 프로필에 두지 않는다.** ACHIEVEMENTS 의 `Invited Talk` 탭으로 옮겼다.
  데이터는 그대로 `members.js` 의 교수 항목 `talks` 에 있다

### RESEARCH (research.html)

```
#areas          — 관계도(Overview) + 분야 카드(Research Topics). 카드는 제목과 요약만
#applications   — 응용 대상. #areas 안의 하단 블록으로, 묶음별 태그 나열
#equipment      — 장비명, 사양, 사진 (지금은 주석으로 감췄 둘)
#projects       — 아래 규칙에 따름
```

**분야의 내용은 `research-area.html` 이 맡는다.** 카드를 누르면 그리로 간다.
주소의 `#해시`가 곧 분야의 `id` 이고, 한 페이지가 네 분야를 모두 그린다.

**상세 페이지의 차례는 대표그림 → 키워드 → 설명 → 세부그림이다.**
키워드가 설명보다 위에 온다. 무엇을 다루는 분야인지를 먼저 보여 주고 자세한 내용이
뒤따르는 순서다. 키워드는 **가로 태그**로 깔며(모양은 `#applications` 와 같다),
옆 칸에 세로로 세우지 않는다 — 설명 줄 수와 키워드 개수가 달라 아래쪽 바닥이 어긋난다.

- 대표 그림은 **21:9** 로 만든다. 목록 카드와 상세 페이지 배너가 모두 이 비율이라
  그대로 들어간다. 세부 그림은 비율이 자유이나, **한 분야 안의 두 장은 세로를 맞춘다** —
  폭은 칸에 꽉 차므로 비율이 다르면 높이가 어긋나 보인다.
  **덧대서 맞추지 않는다.** 덧댄 띠가 곧 흰 공백이 되어 두 그림의 내용이
  끝나는 높이가 어긋난다. 여백을 잘라낸 뒤 짧은 쪽을 목표 높이까지 늘린다
  (0.5% 안쪽의 세로 늘림은 눈에 띄지 않는다)
- 키워드 목록의 소제목은 `SITE.ui.topics`(현재 `Keywords`)다.
  목록 쪽 `Research Topics` 와 말이 겹치지 않게 다른 낱말로 둔다
- **설명은 `영문 라벨 : 국문 개조식` 한 줄씩이다.** 라벨은 그림 안의 절 이름과 같게 둔다 —
  글에서 읽은 말을 그림에서 그대로 찾을 수 있어야 한다.
  `render.js` 의 `descParagraphs()` 가 ` : ` 앞을 굵게 세운다. 콜론이 없으면 통짜 문장으로 그린다
- **한 항목은 한 줄에 들어가게 쓴다.** 두 줄로 넘어가면 항목의 리듬이 깨진다.
  `max-w-4xl`(896px) 기준이며, 길면 낱말을 줄이거나 표준 약어를 쓴다
- **설명과 키워드는 역할이 다르다.** 설명은 무엇을 어떻게 하는지 문장으로,
  키워드는 그 안에서 쓰는 구체적인 용어로. 키워드에 라벨을 되풀이하지 않고,
  상위어(`전자기장 해석` · `설계 절차`)보다 구체어(`공간고조파법` · `극-슬롯 조합`)를 쓴다
- 이전·다음 버튼은 주소의 해시만 바꾼다. 브라우저가 문서를 다시 읽지 않으므로
  `render.js` 의 `researchArea()` 가 `hashchange` 를 듣고 직접 다시 그린다

**연구분야와 응용 대상은 다른 축이다.** 분야는 방법론(해석 · 설계 · 시스템 · SW)으로 세우고,
응용 대상(모빌리티 · 로봇 · 가전 · 산업)은 모든 분야를 가로지르므로 카드에 섞지 않고
`#applications` 에서 한 번에 보여 준다. 한 논문이 두 축에 동시에 걸리는 것이 자연스럽다.

**두 개관도는 데이터에서 자동으로 그려지지 않는다.** 같은 내용이 두 곳에 있으니
데이터를 고치면 그림도 함께 고쳐야 한다. 0번의 단일 소스 원칙이 닿지 않는 자리다.

| 데이터 | 함께 고칠 그림 | 그림 안에 든 것 |
|---|---|---|
| `RESEARCH` (분야) | `images/research/overview.svg` | 분야 이름 · 한 줄 부제 · 카드 사이 연결선 |
| `APPLICATIONS` | `images/research/applications.svg` | 묶음 이름 · 부제 |

- 분야를 더하거나 합치면 `overview.svg` 의 **카드 수와 연결선 위치**까지 손봐야 한다.
  카드 높이를 바꾸면 점선의 시작점이 어긋난다
- `applications.svg` 의 부제는 항목을 그대로 옮기지 않고 소문자 축약형으로 둔다.
  전체 항목은 그림 아래 태그로 나오므로 되풀이하지 않는다
- 글자를 늘렸으면 `viewBox`(현재 각각 960×460, 960×400) 를 넘지 않는지 확인한다

**Projects 섹션**

- **Ongoing / Completed 두 그룹으로 나누어 표시**하고 각 그룹에 소제목을 둔다
- 상태 판정과 정렬은 6번 항목의 `getStatus()`, 정렬 규칙을 따른다
- 진행중 과제는 상태 배지를 `bg-primary` 계열로, 완료 과제는 회색 계열로 구분
- 카드 또는 행 하나에 담을 내용:

  ```
  지원기관 · 세부사업   과제명
  [지원기관 CI]      Role     Principal Investigator
                    Period   2024.03 ~ 2027.02   [Ongoing]
  ```

  세부 사업명은 **짧으면 기관명 옆에**, 길면 다음 줄로 내린다.
  기준은 `js/render.js` 의 `PROGRAM_INLINE_MAX`.

  학생이 연구책임자면 두 사람을 함께 적는다.

  ```
  Role     Principal Investigator (Yong-Min Lee, M.S. candidate)
           Academic Advisor (Min-Ro Park)
  ```

- 역할 라벨은 `PROJECT_ROLES[p.role]`에서 가져온다. 직접 문자열을 쓰지 않는다
- 역할에 이름을 붙이는 것은 **지도교수가 연구책임자가 아닐 때뿐**이다.
  그 외에는 `Principal Investigator` 만 적는다 — 이 페이지의 과제는 모두 지도교수의 것이다
- 세부 사업명(`program`)은 **지원기관 아래**에 작게 붙인다. 기관과 사업은 한 묶음이다
- **기간 표시 형식은 `YYYY.MM ~ YYYY.MM`**
- 과제가 없는 그룹은 소제목째 렌더링하지 않는다 (빈 섹션 노출 금지)
- **Completed 그룹은 접어 둔다.** 소제목을 누르면 펌쳐진다

### ACHIEVEMENTS (publications.html)

```
#journal      International Journal    / Domestic Journal
#conference   International Conference / Domestic Conference
#patent       Granted Patent           / Patent Application
#talk         Invited Talks            (나누지 않는다)
```

**초청강연만 데이터가 다른 곳에 있다.** `publications.js` 가 아니라 `members.js` 의
교수 항목 `talks` 다. 연구실의 산출물이 아니라 지도교수 개인의 활동이라 그쪽이 제자리이고,
`publications.js` 에 `type: "talk"` 를 만들면 저자 · 학술지 같은 필드가 전부 빈 채로 남는다.
화면에서만 끌어와 보여 준다 (`render.js` 의 `talksOf`).

- 강연을 추가할 때는 `members.js` 의 `talks` 에 `{ date, host, title }` 한 줄을 넣는다
- 접고 펴는 규칙 · 연도 묶음은 논문과 같다. 항목 모양만 다르다.
  `yearBlocks(list, itemsFn)` 의 둘째 인자로 항목 렌더러를 갈아 끼운다
- 파일 이름은 `publications.html` 그대로다. 바꾸면 링크와 북마크가 끊긴다

- 상단에 `[Journal] [Conference] [Patent] [Invited Talk]` 필터 버튼.
  **한 번에 한 종류만 보인다** (첫 탭 Journal 이 기본. `All` 은 두지 않는다)
- 종류 제목(`Journal Papers` 등)은 따로 두지 않는다.
  위 표의 **묶음 이름이 그 페이지의 큰 제목**이다
- 묶음 안에서 다시 **연도별 그룹핑**, 최신순
- 한 연도 안에서는 `date` 기준 최신순. Early Access 가 맨 위 (6번 항목 참조)
- 비어 있는 묶음은 제목째 렌더링하지 않는다 (빈 섹션 노출 금지)
- **올해만 펼쳐 두고, 지난 해는 한 덩어리로 묶어 접는다.**
  묶음 제목은 `~2025` 처럼 항상 **작년**을 가리키며, 문구는 `SITE.ui.pubEarlier` 에 있다.
  묶음 안에서는 연도 구분을 두지 않는다 — 연도마다 따로 펼쳐야 하면 손이 너무 많이 간다.
  올해 것이 하나도 없는 탭(예: 특허)은 이 묶음을 펼쳐 둔다
- 특허 탭에는 저자 표기 범례를 달지 않는다 (특허에는 주저자·교신저자 개념이 없다)
- DOI가 있으면 제목을 링크로
- 저자 목록에서 **지도교수 이름만** 굵게 + 밑줄로 짚는다 (`role: professor` 로 판별).
  학생까지 짚으면 한 줄에 강조가 여러 개씩 생겨 누가 연구실 사람인지 분별이 안 된다.
  학생 개인 강조는 PEOPLE 의 프로필 창에서만 한다
- 주저자 `†` · 교신저자 `*` 를 윗첨자로 표시하고 범례를 둔다 (6번 항목 참조).
  **범례는 줄을 따로 두지 않고 첫 묶음 제목의 오른쪽에 밀어 붙인다** (베이스라인 정렬).
  위에 한 줄을 더 두면 범례가 없는 특허 탭만 제목이 위로 올라가 탭마다 간격이 달라진다.
  제목 줄 안에 두면 범례가 세로 공간을 쓰지 않아 그 조건을 맞출 일 자체가 없다

**묶는 기준과 제목 문구는 따로 둔다.**

- 판정 기준 — `js/render.js` 의 `PUB_SPLITS`
- 제목 문구 — `data/site.js` 의 `SITE.pubGroups`

다른 기준으로 한 번 더 나누거나 제목을 바꿀 때는 이 두 곳만 고친다.

### NEWS (news.html)

글 소식만 둔다. 사진은 `gallery.html` 로 떼어냈다.

```
#feed     — 글 소식. 제목 없이 바로 피드가 시작된다
```

- **게시판 형태 금지.** 상세 페이지, 목록 페이지, 페이지네이션 없음
- 날짜 + 1~3문장이 시간순으로 누적되는 피드
- **접고 펼치는 규칙은 PUBLICATIONS 와 같다** — 올해만 펼쳐 두고
  그 이전은 `~2025` 한 덩어리로 묶어 접는다. 두 페이지의 조작법을 같게 둔다
- `link`가 있으면 문장을 링크로, `image`가 있으면 좌측에 작은 썸네일

### GALLERY (gallery.html)

```
#albums   — 사진 게시글. 앨범 단위 격자
```

- 앨범 단위 격자 배치. 클릭 시 라이트박스로 확대
- 라이트박스는 외부 라이브러리 없이 직접 만든다 (`bindLightbox`)
- 이미지 `loading="lazy"` 필수
- 제목 밴드가 이미 `Gallery` 라 안쪽에 섹션 제목을 다시 두지 않는다

### JOIN US (join.html)

문구는 전부 `SITE.join` 한 곳에서 온다. HTML 에 직접 쓰지 않는다.
메인의 모집 요약도 같은 곳을 쓴다.

```
제목        SITE.join.heading
문의 안내   SITE.join.contact  — {email} 자리에 SITE.email 이 링크로 들어간다
본문        모집 대상 · 자격·우대 사항 · 연구 내용 · 지원 내용 · 연구실 생활
```

- 문체는 **개조식**으로 통일한다. 한 항목은 한 줄, 명사형으로 끝낸다
- 라벨을 빈 문자열로 두면 그 덩어리 전체가 표시되지 않는다
- 항목은 문자열 또는 `{ text, sub, row }` 객체다.
  `sub` 는 체크 표시의 하위 항목으로, `row: true` 면 두 칸으로 나란히 놓인다
- 문턱을 낮추는 안내문(`qualifyNote`)은 **강조하지 않는다.**
  본문보다 작고 옛게 둔다. 여기가 눈에 먼저 들어오면 조건이 까다로운 것처럼 읽힌다

### CONTACT (contact.html)

- `SITE`의 주소·전화·이메일·좌표를 사용한 오시는 길 (지도 임베드)
- 모집 안내는 여기 두지 않는다. `join.html` 이 따로 있다

---

## 8. 이미지 규칙

- 원본 사진을 그대로 커밋하지 않는다. **긴 변 1600px 이하, WebP 또는 압축 JPG**
- 갤러리용 썸네일은 400px 별도 생성
- `images/` 폴더에 변환 스크립트를 두어 학생이 실행만 하면 되게 한다
- 모든 `<img>`에 `alt` 속성과 `loading="lazy"` 부여

**투명도가 있는 원본은 흰 바탕에 얹은 뒤 변환한다.** 그냥 줄이면 투명한 부분이 검게 나온다.
파워포인트에서 뽑은 그림은 대개 투명도를 갖고 있다. `ffprobe` 로 `yuva420p` 가 나오면 그렇다.

```bash
ffmpeg -f lavfi -i color=white:s=1600x1600 -i in.webp \
  -filter_complex "[1]scale=1600:1600:force_original_aspect_ratio=decrease[s];[0][s]overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuv420p" \
  -frames:v 1 -c:v libwebp -quality 92 out.webp
```

**파워포인트에서 뽑은 그림은 아래쪽 여백을 잘라낸다.** 개체를 묶어 "그림으로 저장"
하면 마지막 글자 밑으로 빈 띠가 20px 안팎 따라 나온다. 위쪽은 내용이 가장자리에 붙어
있어 아래만 떠 보인다. 받을 때마다 재서 잘라낸 뒤 변환한다.

```bash
# 아래 19px 을 버리고 1600 폭으로. 여백을 잰 값은 그림마다 다르다
ffmpeg -f lavfi -i color=white:s=2000x1575 -i in.webp \
  -filter_complex "[1]scale=2000:1575[s];[0][s]overlay=0:0:shortest=1,crop=2000:1556:0:0,scale=1600:1244,format=yuv420p" \
  -frames:v 1 -c:v libwebp -quality 92 out.webp
```

**쓰이지 않는 그림은 지운다.** 데이터에서 경로를 바꾸면 옛 파일이 그대로 남는다.
`scan_unused.py` 를 만들어 두고 돌리면 참조 없는 파일이 나온다.

```python
import os, re, glob
used = set()
for p in glob.glob('data/*.js') + glob.glob('*.html') + glob.glob('images/research/*.svg'):
    t = open(p, encoding='utf-8', errors='ignore').read()
    used |= set(re.findall(r'images/[a-z]+/([A-Za-z0-9_.-]+)', t))
for f in sorted(glob.glob('images/*/*')):
    if os.path.isfile(f) and os.path.basename(f) not in used:
        print(f)
```

---

## 9. 디자인

### 기본 원칙

- 메인 색상: `#26539C` — 반드시 `js/theme.js`를 통해서만 참조 (0번 항목 참조)
- 본문 폰트는 한글 가독성 우선 (Pretendard 등 CDN 사용 가능)
- **모바일 우선 반응형 필수.** 모든 페이지가 375px 폭에서 정상 동작
- 첫 화면 문구에 전문 용어를 나열하지 않는다. 비전공자도 무엇을 하는 곳인지 알 수 있어야 함

### 고정되는 것은 상단 메뉴뿐이다

- **상단 메뉴는 스크롤해도 화면에 남는다** (`#site-header` 에 `sticky top-0 z-50`).
  `sticky` 는 **부모 안에서만 버틴다.** 안쪽 `.site-bar` 에 걸면 부모의 높이가
  곧 자기 높이라 버틸 구간이 0 이라 그대로 올라가 버린다. 반드시 바깥 틀에 건다
- **페이지 안의 알약 탭(`#page-tabs`)은 고정하지 않는다.** 스크롤과 함께 올라간다.
  둘 다 고정하면 375px 화면에서 124px(15%)가 항상 가려 본문이 좁아진다
- 앵커로 이동할 때 헤더에 가리지 않도록 `html` 의 `scroll-padding-top` 을 헤더 높이에 맞춘다
  (`css/custom.css`, 현재 `4.5rem`). 헤더 높이를 바꾸면 이 값도 함께 고친다

**메뉴로 페이지에 들어오면 항상 맨 위에서 시작한다.**
그래서 `common.js` 는 실행되자마자 주소의 `#해시`를 `INITIAL_HASH` 로 떼어 두고,
`sectionTabs` 는 그 값으로 탭을 고른 뒤 **`load` 이후에** 주소에 해시를 다시 넣는다.
브라우저가 `load` 시점에 주소의 해시로 한 번 더 스크롤하기 때문에,
이걸 두면 해시 없이 들어와도 화면이 아래위로 한 번 출렁인다.
브라우저의 스크롤 위치 복원(`scrollRestoration`)도 같은 이유로 끈다.

### 참고 사이트

| 사이트 | 참고할 점 |
|---|---|
| http://fem.cau.ac.kr | 같은 전기기기 분야. 연구 주제별 대표 이미지 카드 구성. 해석 결과 이미지를 시각 자산으로 활용 |
| https://idealab.hanyang.ac.kr | **히어로 구조를 참고한다.** 배경 mp4 자동 재생 + 반투명 오버레이 + 연구실명·슬로건 + Scroll down 유도. 스크롤 기반 순차 전개. 약칭을 굵게 강조한 카피 |

**IDEA LAB의 접속 시 뉴스 팝업은 만들지 않는다.**

두 사이트의 강점을 결합한다. **FEM Lab의 시각 자산 활용 + IDEA LAB의 히어로 구조와 스크롤 연출.**
국내 전기기기 연구실 대부분이 게시판형 CMS라 연출이 평범하므로, 이 조합만으로 충분히 차별화된다.

### 히어로 상세 규격

```html
<section class="relative h-screen overflow-hidden">
  <video autoplay muted loop playsinline
         poster="images/hero-poster.jpg"
         class="absolute inset-0 w-full h-full object-cover">
    <source src="images/hero.mp4" type="video/mp4">
  </video>

  <div class="absolute inset-0 bg-black/50"></div>   <!-- 또는 bg-primary/60 -->

  <div class="relative z-10 ...">
    <h1>Electro-Mechanical Energy Conversion Lab</h1>
    <p>[tagline + taglinePoints]</p>
    <a href="#research">Scroll down ↓</a>
  </div>
</section>
```

**필수 속성** — `muted`, `playsinline`이 없으면 모바일에서 자동 재생이 차단된다.
`poster`는 영상 로딩 전 표시될 정지 이미지로 반드시 지정한다.

**오버레이** — 영상 위 텍스트 가독성을 위해 필수. `bg-black/50` 또는 `bg-primary/60`.
영상이 밝거나 대비가 강하면 농도를 올린다. 오버레이 없이 텍스트를 얹지 않는다.

**영상 파일 제약**

- **10MB 이하**를 목표로 한다. 1080p 15초면 6~8MB가 보통이다.
  GitHub은 100MB 초과 파일을 거부하고, 저장소는 1GB 이하 유지가 권장된다
- **확정본만 커밋한다.** 크기보다 이쪽이 중요하다.
  영상은 이미 압축돼 있어 git이 델타 압축을 못 한다. 한 판을 커밋할 때마다
  통째로 히스토리에 쌓이고, 한 번 쌓이면 히스토리를 재작성하지 않는 한 지워지지 않는다.
  "슬로우 0.72 → 0.9배속" 같은 미세 조정은 작업 폴더에서만 돌려 보고,
  확정됐을 때만 `images/`에 복사해 커밋한다
- 길이 10~20초, 무한 반복. 시작과 끝이 자연스럽게 이어지면 좋다
- 해상도 1920×1080, 음성 트랙 제거
- `ffmpeg` 압축 명령을 `README.md`에 기록해 둔다

**모바일 대응**

- 768px 미만에서는 영상 대신 `poster` 이미지만 표시 (데이터 사용량 배려)
- `prefers-reduced-motion: reduce` 설정 시에도 정지 이미지로 대체

**영상 소재 (우선순위 순)**

1. **해석 결과 애니메이션** — 회전자 회전에 따른 자속밀도 분포 변화. ANSYS Maxwell / JMAG 등에서 직접 출력. **실제 연구 결과라 가장 설득력이 크다**
2. 최적설계 과정의 형상 변화 시퀀스
3. 실험실 전경 / 시제품 구동 촬영 영상
4. 영상 확보가 어려우면 정지 이미지 + Ken Burns(20초에 걸쳐 1.0 → 1.08 확대)로 대체

**연구실 소개** — 연구실 이름 아래에 붙는다. `data/site.js` 의 두 값에서 온다.

- `SITE.tagline` — **한 문장.** 무엇을 연구하는 곳인지. `<strong>` 태그를 쓸 수 있다
- `SITE.taglinePoints` — **그 아래 항목 목록.** 비우거나 지우면 문장만 나온다

**항목은 `research.js` 의 연구분야 차례를 따른다.** 해석(1·2) → 설계(3) → 방법(4) →
자동화(5, 지금은 감춰 둠) 순으로 한 번씩 훑고, **마지막 줄이 도착점(양산 적용)을 밝힌다.**
앞의 넷이 "어떻게 하는가"뿐이라 마지막 줄이 없으면 능력 목록으로 끝난다.
연구분야를 고치면 이 목록도 함께 본다 — 7번의 두 개관도와 같은 자리다.

**목록은 `<p>` 안에 들어가므로 `<ul>`·`<li>` 를 쓰지 않는다.** `<p>` 안에 블록 요소를
넣으면 브라우저가 `<p>` 를 먼저 닫아 버려 문단이 둘로 쪼개진다.
`render.js` 가 `<span class="flex">` 로 그린다.

**폭은 `max-w-3xl` 이다.** 항목이 다섯 줄이라 `2xl` 에서는 한 줄이 접힌다.
항목을 늘리거나 문장을 길게 쓰면 375px 화면에서 `Scroll down` 과 겹치는지 확인할 것
(지금은 문구 끝 624px, `Scroll down` 737px).

### 애니메이션 규격

**HOME 페이지는 스크롤 연출을 적극적으로 사용한다.** 나머지 페이지는 절제한다.

| 위치 | 연출 |
|---|---|
| 히어로 하단 | `Scroll down` 유도 표시 + 아래로 반복 움직이는 화살표 |
| 연구분야 카드 | 스크롤 진입 시 아래에서 위로 페이드업. 카드마다 0.1초씩 시차(stagger) |
| 현황 지표 | 화면 진입 시 0부터 실제 값까지 카운트업 (약 1.5초) |
| 섹션 제목 | 진입 시 페이드업 |
| 카드 hover | `translateY(-4px)` + 그림자 강화. 0.2초 |

**구현 방식 (우선순위 순)**

1. **`IntersectionObserver` + CSS transition** — 기본. 라이브러리 불필요
2. **CSS `@keyframes`** — 반복 애니메이션(화살표, 배경 확대)
3. **SVG 애니메이션** — 자속선 흐름 등. `stroke-dasharray` / `stroke-dashoffset` 활용
4. **GSAP + ScrollTrigger (CDN)** — 위 방법으로 부족할 때만. 추가 전 반드시 물어볼 것

**제약**

- 애니메이션 때문에 **콘텐츠를 못 읽는 상황이 생기면 안 된다.** JS가 실패해도 모든 텍스트는 보여야 하므로, 초기 `opacity: 0`은 JS로 부여하고 CSS 기본값은 보이는 상태로 둔다
- `prefers-reduced-motion: reduce` 미디어 쿼리를 반드시 대응한다
- 한 요소에 두 개 이상의 연출을 겹치지 않는다
- 전환 시간은 0.6초를 넘기지 않는다
- 자동 재생 슬라이더(캐러셀)는 쓰지 않는다

**하위 페이지의 적용 범위** — 지금은 이렇게 잡아 두었다. 바꿀 수 있는 선택이다.

| 페이지 | 연출 단위 |
|---|---|
| PEOPLE | 교수 블록 · 학위 소제목 · 카드 그리드(시차) |
| RESEARCH | 연구분야 항목 · 장비 카드(시차) · 과제 목록 |
| ACHIEVEMENTS | `International Journal` 같은 묶음 단위 |
| NEWS · GALLERY | 소식 피드 · 앨범 격자(시차) |
| JOIN US · CONTACT | 본문 블록 |

- **목록 항목 하나하나에는 걸지 않는다.** 논문 126편을 한 줄씩 띄우면
  스크롤할 때마다 글자가 계속 튀어올라 읽기가 어려워진다.
  묶음 · 카드 단위까지가 지금의 선이다
- **탭을 바꾸면 `Anim.refresh()` 를 불러야 한다** (`sectionTabs` 의 `apply()` 안).
  비활성 섹션은 `hidden` 이라 그 안의 요소가 "화면 밖"으로 판정돼 숨겨진 채로 남는다.
  탭을 눌렀을 때 다시 모아 검사하지 않으면 **빈 화면**이 나온다.
  연출 범위를 늘리거나 줄일 때도 이 호출은 남겨 둔다

### 시각 자산 (가장 중요)

**전기기기 분야는 이미지·영상 자산이 곧 완성도다.** 애니메이션 코드만으로는 화려해지지 않는다.

- **히어로 배경 영상** (`images/hero.mp4`) + 대응 정지 이미지 (`images/hero-poster.jpg`)
- 자속밀도 분포도 (FEA 컬러맵) — 가장 눈에 띄는 자산
- 모터 단면 형상 / 메시 분할도
- 시제품 및 실험 장비 사진
- 토크·효율 특성 곡선

사진 위에 텍스트를 얹을 때는 반드시 어두운 오버레이(`rgba(0,0,0,0.45)` 이상)를 넣는다.

---

## 10. 작업 규칙

- **한 번에 여러 페이지를 만들지 않는다.** 한 페이지씩 완성하고 확인받는다
- 작업 단위마다 `git commit`. 커밋 메시지는 한국어로 간결하게
- 헤더·푸터·네비게이션은 각 HTML에 중복 작성하지 말고 `common.js`에서 삽입한다
- 새 기능을 만들기 전에 기존 데이터 구조로 해결 가능한지 먼저 검토한다
- 데이터 구조를 바꿔야 할 것 같으면 **먼저 물어본다**

### CLAUDE.md 취급

- **이 문서는 사용자가 명시적으로 요청할 때만 수정한다.** 임의로 규칙을 완화하거나 제약을 삭제하지 않는다
- 구현 중 이 문서의 규칙을 지킬 수 없는 상황이 생기면, 문서를 고치지 말고 **먼저 사용자에게 알린다**
- 작업이 한 단락 끝나면 **구현 결과와 이 문서가 어긋난 부분이 있는지 점검해 보고한다.** 수정은 사용자 지시를 받은 뒤에 한다
- 3번(기술 스택), 6번(데이터 파일 명세)의 제약은 프로젝트의 존재 이유이므로 특히 신중히 다룬다

---

## 11. 배포

- GitHub Pages — 조직 `EMEC`, 저장소 `EMEC.github.io`, `main` 브랜치, `/ (root)`
- 접속 주소는 `https://emec.github.io` (GitHub Pages 주소는 소문자로 변환됨)
- `.nojekyll` 파일 필수
- `.gitignore`에 `.DS_Store`, `node_modules`, 원본 이미지·영상 폴더 등 포함

---

## 12. README.md 작성 지침

프로젝트 완료 시 `README.md`에 **코드를 모르는 대학원생 기준**으로 다음을 한국어로 작성한다.

- 논문 추가하는 법 (복사해서 쓸 수 있는 예시 코드 포함)
- 과제 추가하는 법, 진행중/완료가 자동 전환된다는 설명
- 구성원 추가 / 졸업생으로 이동시키는 법
- 소식 올리는 법
- 갤러리에 사진 올리는 법 (이미지 크기 조정 포함). 사진은 `gallery.html` 에 보인다는 점도 적는다
- 모집 안내 문구를 고치는 법 (`data/site.js` 의 `SITE.join`)
- 히어로 영상 교체 및 `ffmpeg` 압축 명령
- **연구실 이름이나 색상을 바꾸는 법** (`data/site.js`, `js/theme.js` 위치 안내)
- 수정한 내용을 실제 사이트에 반영하는 법 (commit & push)

---

## 13. 향후 확장 예정 (지금은 만들지 않음)

아래는 나중에 필요해지면 추가할 항목이다. **지금 미리 만들지 말 것.**

- **수상 페이지** — 현재는 `news.js`에 `category: "award"`로 누적. 충분히 쌓이면 필터링해서 생성
- **About 독립 페이지** — 현재는 HOME에 통합. 연혁 등이 길어지면 `#about` 섹션을 분리
- **Publications 페이지 분할** — 논문 200편 초과 시
- **커스텀 도메인 연결**
