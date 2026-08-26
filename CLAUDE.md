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
grep -rn "26539C" --include="*.html" --include="*.css" . | grep -v "theme.js\|custom.css"
grep -rn "041-530\|minro@\|M417" *.html js/
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
    full:  "M417, Multimedia Building, Soonchunhyang University, 22 Soonchunhyang-ro, Asan-si, Chungcheongnam-do 31538, Republic of Korea",
    fullKo: "충남 아산시 순천향로 22 순천향대학교 멀티미디어관 M417호",
    short: "Multimedia Building, M417"
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
    publications: "PUBLICATIONS",
    news:         "NEWS",
    join:         "JOIN US",
    contact:      "CONTACT"
  },

  // 드롭다운이 있는 세 메뉴에만 하위 항목이 있다
  submenu: {
    professor:  "Professor",
    current:    "Students",
    alumni:     "Alumni",
    areas:      "Overview",
    equipment:  "Facilities",
    projects:   "Projects",
    journal:    "Journal",
    conference: "Conference",
    patent:     "Patent"
  },

  // 페이지 안의 섹션 제목. HTML 은 <h2 data-section-title="areas"> 처럼 키만 적는다
  sectionTitles: {
    professor:  "Professor",
    current:    "Students",
    alumni:     "Alumni",
    areas:      "Research Areas",
    equipment:  "Facilities",
    projects:   "Research Projects",
    ongoing:    "Ongoing",
    completed:  "Completed",
    location:   "Location",
    gallery:    "Gallery"
  },

  // PUBLICATIONS 의 묶음 제목. 판정 기준은 js/render.js 의 PUB_SPLITS
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
├── publications.html
├── news.html        # 글 소식 + 사진 게시글
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
  ├ Students                        → people.html#current
  └ Alumni                          → people.html#alumni
RESEARCH ▾
  ├ Overview                        → research.html#areas
  ├ Facilities                      → research.html#equipment
  └ Projects                        → research.html#projects
PUBLICATIONS ▾
  ├ Journal                         → publications.html#journal
  ├ Conference                      → publications.html#conference
  └ Patent                          → publications.html#patent
NEWS                                → news.html
JOIN US                             → join.html
CONTACT                             → contact.html
```

- 1단계 메뉴는 **대문자**로 표기한다. 드롭다운 항목은 일반 표기.
- 드롭다운은 **PEOPLE, RESEARCH, PUBLICATIONS 세 곳뿐**이고,
  하위 항목은 **별도 파일이 아니라 같은 페이지의 앵커**로 연결한다.
- HOME, NEWS, JOIN US, CONTACT 는 하위 항목이 없다. 한 번에 해당 페이지로 간다.
- 각 섹션에는 반드시 아래 표의 `id` 속성을 부여한다.
- 메뉴 라벨은 **상위·하위 모두** `SITE.menu` / `SITE.submenu`에서 읽어온다. 네비게이션 HTML에 직접 쓰지 않는다.
- 상위 메뉴가 일곱 개라 가로로 빽빽하다. **더 늘릴 때는 가로 메뉴가 나타나는
  기준 폭을 `lg`(1024px)에서 `xl`(1280px)로 올려야 한다.**

**용어 대응표** — 문서·코드 전반에서 혼용하지 말 것.

| 메뉴 | 섹션 제목 | 데이터 파일 | 앵커 |
|---|---|---|---|
| Professor | Professor | `members.js` (`role: professor`) | `#professor` |
| Students | Students | `members.js` | `#current` |
| Alumni | Alumni | `members.js` (`role: alumni`) | `#alumni` |
| Overview | Research Areas | `research.js` | `#areas` |
| Facilities | Facilities | `equipment.js` | `#equipment` |
| Projects | Research Projects | `projects.js` | `#projects` |
| Journal | International / Domestic Journal | `publications.js` (`type: journal`) | `#journal` |
| Conference | International / Domestic Conference | `publications.js` (`type: conference`) | `#conference` |
| Patent | Granted Patent / Patent Application | `publications.js` (`type: patent`) | `#patent` |
| NEWS | — | `news.js` | `#feed` |
| NEWS 하단 | Gallery | `gallery.js` | `#albums` |
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
    interests: "Electric Machine Design, Multiphysics Analysis, Optimal Design",

    // 교수 전용
    education: [
      "Ph.D., Electrical Engineering, OO University, 2015",
      "M.S., Electrical Engineering, OO University, 2010"
    ],
    career: [
      "2020–Present, Professor, Soonchunhyang University",
      "학술이사, 대한전기학회 (전기기기 및 에너지변환시스템 부문)"
    ],
    scholar: "",

    // 졸업생 전용
    gradYear: null,           // 예: 2024
    thesis: "",
    currentPosition: ""       // 예: "LG전자 책임연구원"
  }
];
```

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
[IF 8.9, JCR top 3.3% (6/182), Q1]
```

- 모두 **게재 시점에 공개되어 있던 JCR 판본** 기준이다.
  JCR 은 매년 6월에 전년도 판이 나오므로, 2020년 1월 게재라면 JCR 2018 이 최신이다
- 저널이 여러 카테고리에 속하면 **가장 높은 카테고리** 기준으로 적는다
- 채워진 값만 대괄호 안에 모여 나온다. 비우면 그 조각만 생략된다
- **순위·상위 %·분위는 연도별 JCR 자료가 없어 현재 비어 두었다.**
  추측해서 채우지 않는다. 자료가 생기면 그때 넣는다

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

- `research.js` — 연구분야 3~5개. 제목, 설명(한 문단), 대표 이미지
- `equipment.js` — 장비명, 사양, 사진
- `gallery.js` — 앨범 단위. 앨범명, 날짜, 이미지 배열

---

## 7. 페이지별 요구사항

### HOME (index.html)

**섹션 순서**

1. **히어로** — 9번 항목의 상세 규격에 따름
2. **연구분야 요약** — 3~4개 카드, 제목 + 두 줄 설명 → `research.html#areas` 링크
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
#current     — 박사 / 석사 / 학부연구생 순, 작은 카드 그리드
#alumni      — 사진 없이 텍스트 목록. 이름, 학위, 졸업연도, 현재 소속
```

교수는 학생과 **다른 레이아웃**으로 렌더링한다. 같은 카드 크기로 나열하지 않는다.

### RESEARCH (research.html)

```
#areas       — 주제별 카드. 각 주제마다 한 문단 이상의 설명
#equipment   — 장비명, 사양, 사진
#projects    — 아래 규칙에 따름
```

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

### PUBLICATIONS (publications.html)

```
#journal      International Journal    / Domestic Journal
#conference   International Conference / Domestic Conference
#patent       Granted Patent           / Patent Application
```

- 상단에 `[Journal] [Conference] [Patent]` 필터 버튼. **한 번에 한 종류만 보인다**
  (첫 탭 Journal 이 기본. `All` 은 두지 않는다)
- 종류 제목(`Journal Papers` 등)은 따로 두지 않는다.
  위 표의 **묶음 이름이 그 페이지의 큰 제목**이다
- 묶음 안에서 다시 **연도별 그룹핑**, 최신순
- 한 연도 안에서는 `date` 기준 최신순. Early Access 가 맨 위 (6번 항목 참조)
- 비어 있는 묶음은 제목째 렌더링하지 않는다 (빈 섹션 노출 금지)
- DOI가 있으면 제목을 링크로
- 저자 목록에서 EMEC 구성원 이름은 **굵게 + 밑줄** (`MEMBERS` 데이터로 판별)
- 주저자 `†` · 교신저자 `*` 를 윗첨자로 표시하고, 상단에 범례를 둔다 (6번 항목 참조)

**묶는 기준과 제목 문구는 따로 둔다.**

- 판정 기준 — `js/render.js` 의 `PUB_SPLITS`
- 제목 문구 — `data/site.js` 의 `SITE.pubGroups`

다른 기준으로 한 번 더 나누거나 제목을 바꿀 때는 이 두 곳만 고친다.

### NEWS (news.html)

글 소식과 사진 게시글을 **한 페이지에 위아래로** 둔다. 탭을 두지 않는다.

```
#feed     — 글 소식. 제목 없이 바로 피드가 시작된다
#albums   — 사진 게시글. 연한 배경 밴드에 Gallery 제목을 단다
```

**글 소식 (`#feed`)**

- **게시판 형태 금지.** 상세 페이지, 목록 페이지, 페이지네이션 없음
- 날짜 + 1~3문장이 시간순으로 누적되는 피드
- 연도별 구분선
- `link`가 있으면 문장을 링크로, `image`가 있으면 좌측에 작은 썸네일

**사진 게시글 (`#albums`)**

- 앨범 단위 격자 배치. 클릭 시 라이트박스로 확대
- 이미지 `loading="lazy"` 필수
- 앨범이 많아져 페이지가 무거워지면 다시 별도 파일로 분리하는 것을 검토한다

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

---

## 9. 디자인

### 기본 원칙

- 메인 색상: `#26539C` — 반드시 `js/theme.js`를 통해서만 참조 (0번 항목 참조)
- 본문 폰트는 한글 가독성 우선 (Pretendard 등 CDN 사용 가능)
- **모바일 우선 반응형 필수.** 모든 페이지가 375px 폭에서 정상 동작
- 첫 화면 문구에 전문 용어를 나열하지 않는다. 비전공자도 무엇을 하는 곳인지 알 수 있어야 함

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
    <p>[tagline]</p>
    <a href="#research">Scroll down ↓</a>
  </div>
</section>
```

**필수 속성** — `muted`, `playsinline`이 없으면 모바일에서 자동 재생이 차단된다.
`poster`는 영상 로딩 전 표시될 정지 이미지로 반드시 지정한다.

**오버레이** — 영상 위 텍스트 가독성을 위해 필수. `bg-black/50` 또는 `bg-primary/60`.
영상이 밝거나 대비가 강하면 농도를 올린다. 오버레이 없이 텍스트를 얹지 않는다.

**영상 파일 제약**

- **5MB 이하**를 목표로 한다. GitHub은 100MB 초과 파일을 거부하고, 저장소는 1GB 이하 유지가 권장된다
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

**슬로건 처리** — `SITE.tagline`에 `<strong>` 태그를 허용하여 강조 단어를 굵게 처리한다.

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
- 갤러리에 사진 올리는 법 (이미지 크기 조정 포함). 사진은 NEWS 페이지 하단에 보인다는 점도 적는다
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
- **Gallery 페이지 분리** — 현재는 NEWS 하단에 함께 있다.
  사진이 많아져 NEWS 페이지가 무거워지면 `gallery.html` 로 다시 떼어낸다
- **커스텀 도메인 연결**
