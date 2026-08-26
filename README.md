# EMEC Lab 홈페이지 운영 매뉴얼

이 문서는 **코드를 몰라도 홈페이지를 관리할 수 있도록** 쓴 설명서입니다.
프로그램을 새로 설치할 필요는 없습니다. 메모장으로도 수정할 수 있지만,
**[VS Code](https://code.visualstudio.com/)** 같은 편집기를 쓰면 실수를 줄일 수 있습니다.

---

## 0. 가장 먼저 알아둘 것

### 내용은 전부 `data` 폴더 안에 있습니다

HTML 파일은 건드리지 않습니다. 아래 7개 파일만 고치면 됩니다.

| 고치고 싶은 것 | 열어야 할 파일 |
|---|---|
| 논문 · 학술대회 · 특허 | `data/publications.js` |
| 연구과제 | `data/projects.js` |
| 교수 · 학생 · 졸업생 | `data/members.js` |
| 소식 | `data/news.js` |
| 갤러리 사진 | `data/gallery.js` |
| 연구분야 설명 | `data/research.js` |
| 연구장비 | `data/equipment.js` |
| 연구실 이름 · 주소 · 연락처 · 메뉴 | `data/site.js` |

### 수정한 결과를 바로 보는 법

`index.html` 파일을 **더블클릭**하면 브라우저에서 열립니다.
파일을 고치고 저장한 뒤 브라우저에서 **F5**(새로고침)를 누르면 바로 반영됩니다.

### 화면이 갑자기 비어 보인다면

거의 항상 **쉼표(`,`)나 큰따옴표(`"`)를 빠뜨린 것**입니다.

1. 브라우저에서 **F12** 를 누릅니다.
2. **Console** 탭을 봅니다.
3. 빨간 글씨에 `data/news.js:37` 처럼 **파일 이름과 줄 번호**가 나옵니다.
4. 그 줄 근처를 확인합니다.

바로 직전에 고친 부분을 되돌리면 대부분 해결됩니다.

### 공통 규칙 3가지

- 각 항목은 `{` 로 시작해서 `}` 로 끝납니다.
- 항목과 항목 사이에는 **쉼표**를 찍습니다. **마지막 항목 뒤에는 찍지 않습니다.**
- 값이 없으면 지우지 말고 **빈 큰따옴표 `""`** 로 둡니다.

```javascript
const NEWS = [
  { ... },   ← 쉼표 있음
  { ... },   ← 쉼표 있음
  { ... }    ← 마지막, 쉼표 없음
];
```

---

## 1. 논문 추가하기

`data/publications.js` 를 엽니다. `const PUBLICATIONS = [` 바로 아래에 붙여넣습니다.

### 학술지 논문

```javascript
  {
    type: "journal",
    year: 2026,
    date: "2026-08",
    authors: "Hong-Gil Dong, Min-Ro Park",
    title: "Design of a High Torque Density Motor for Robot Joints",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 62, no. 8, pp. 1-6",
    doi: "10.1109/TMAG.2026.1234567",
    impact: "1.9",
    jcrTop: "", jcrRank: "", jcrQuartile: "",
    domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
```

### 국내 학술대회

국내 학회는 **국문 그대로** 적습니다. 억지로 영어로 옮기지 않습니다.

```javascript
  {
    type: "conference",
    year: 2026,
    date: "2026-07-16",
    authors: "홍길동, 박민로",
    title: "매입형 영구자석 전동기의 토크 리플 저감 설계",
    venue: "2026년도 대한전기학회 하계학술대회",
    detail: "용평, 2026.07.08 ~ 07.11",
    doi: "",
    domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
```

### 특허

```javascript
  {
    type: "patent",
    year: 2026,
    date: "2026-05-20",
    authors: "박민로, 홍길동",
    title: "회전자 구조를 개선한 영구자석 전동기",
    venue: "순천향대학교 산학협력단",
    detail: "등록일 2026.05.20",
    doi: "",
    domestic: true,
    patentNo: "10-1234567",
    applicationNo: "10-2025-0001234",
    country: "KR"
  },
```

**알아두면 좋은 것**

- `year` 와 `date` 만 맞으면 **자동으로 정렬**됩니다. 붙여넣는 위치는 신경 쓰지 않아도 됩니다.
- `date` 는 종류별로 적는 날짜가 다릅니다.

  | 종류 | 적는 날짜 | 예 |
  |---|---|---|
  | 학술지 | 게재 년월 | `"2026-08"` |
  | 학술대회 | 발표일 | `"2026-07-16"` |
  | 특허 | 등록일 | `"2026-05-20"` |

- **아직 호가 안 나온 Early Access 논문**은 `date: ""` 로 비워 두고
  `detail: "Early Access"` 라고 적으세요. 그해 목록의 **맨 위**에 놓입니다.
  나중에 호가 나오면 `date` 와 `detail` 을 채우면 제자리로 내려갑니다.
- `doi` 를 넣으면 논문 제목이 **자동으로 링크**가 됩니다. 없으면 `""`.
- `data/members.js` 에 등록된 사람 이름은 저자 목록에서 **자동으로 굵게 + 밑줄** 표시됩니다.
- **주저자와 교신저자**는 이름 바로 뒤에 기호를 붙입니다. 윗첨자는 자동으로 붙습니다.

  ```javascript
  authors: "Dong-Hoon Ko†, Yong-Min Lee†, Min-Ro Park*"
  ```

  | 기호 | 뜻 | 입력법 |
|---|---|---|
  | `†` | 주저자 | 한글 자모 `ㅁ` + 한자키 또는 복사해서 쓰기 |
  | `*` | 교신저자 | 그냥 별표 |

  공동 주저자·공동 교신저자면 **해당하는 사람 모두에게** 붙입니다.
  한 사람이 둘 다면 `Min-Ro Park†*` 처럼 이어 씁니다.
- `type` 은 `journal` / `conference` / `patent` 셋 중 하나입니다.
- **국제 학술지**만 `impact` 에 Impact Factor 를 적습니다. 국내 학술지는 비워 둡니다.

  반드시 **게재 당시에 나와 있던 값**을 적습니다. JCR 은 매년 6월에 전년도 판이
  나오므로, 2026년 1월에 게재되었다면 JCR 2024 값이 맞습니다.

  ```javascript
  impact: "8.9",
  jcrTop: "3.3", jcrRank: "6/182", jcrQuartile: "Q1",
  ```

  화면에는 `[IF 8.9, JCR top 3.3% (6/182), Q1]` 처럼 붙습니다.
  순위·분위를 모르면 `""` 로 비워 두세요. 그 조각만 생략됩니다.
  저널이 여러 분야에 속하면 **가장 높은 분야** 기준으로 적습니다.
- **학술대회**는 `venue` 에 풀네임을 적고 뒤에 괄호로 약어를 붙입니다.

  ```javascript
  venue:  "2026 IEEE Energy Conversion Congress and Exposition (ECCE 2026)"
  detail: "Vancouver, Canada, 2026.10.04 ~ 10.08"
  ```

  약어가 없는 국내 학회는 풀네임만 적으면 됩니다.
  기간은 `개최지, 시작날 ~ 끝날` 순서로, 같은 해면 끝날은 월·일만 적습니다.

**페이지 안에서 어느 칸에 들어갈지는 자동으로 정해집니다.**

| 종류 | 나뉘는 칸 | 기준 |
|---|---|---|
| 학술지 · 학술대회 | International / Domestic | `domestic: false` 면 International |
| 특허 | Granted Patent / Patent Application | `patentNo` 가 `""` 면 출원 |

- `domestic` 은 이제 **화면의 분류를 결정합니다.** 사실대로 적어 주세요.
  학과 평가·통계에도 그대로 쓰입니다.
- **아직 등록되지 않은 출원 특허**는 `patentNo: ""` 로 두고 `applicationNo` 만 적으세요.
  나중에 등록되면 `patentNo` 를 채우기만 하면 Granted Patent 로 옮겨갑니다.
- 출원 특허가 하나도 없으면 `Patent Application` 제목 자체가 나오지 않습니다.

---

## 2. 연구과제 추가하기

`data/projects.js` 를 엽니다.

```javascript
  {
    id: "proj-2026-20",
    title: "고효율 구동 모터 설계 기술 개발",
    sponsor: {
      name: "한국연구재단",
      logo: "",
      url: "https://www.nrf.re.kr"
    },
    ministry: "과학기술정보통신부",
    startDate: "2026-09-01",
    endDate:   "2029-08-31",
    role: "PI",
    orgRole: "주관",
    statusOverride: null,
    grantNo: "",
    description: ""
  },
```

### 학생이 연구책임자인 과제

석사과정생연구장려금처럼 **학생이 연구책임자이고 교수님은 지도만** 하는 과제는
세 항목을 함께 적습니다.

```javascript
    role: "Advisor",
    program: "석사과정생연구장려금지원사업",
    pi: "Yong-Min Lee, M.S. candidate",
```

화면에는 이렇게 나옵니다.

```
한국연구재단              전기자동차의 동적 주행 특성을 고려한 …
석사과정생연구장려금지원사업   Role     Principal Investigator (Yong-Min Lee, M.S. candidate)
                                  / Academic Advisor (Min-Ro Park)
                         Period   2024.07 ~ 2025.06   [Completed]
```

보통 과제는 `program` 과 `pi` 를 `""` 로 비워 두거나 아예 적지 않으면 됩니다.
그 줄 자체가 나오지 않습니다.

---

### 지원기관 로고 넣기

로고는 `images/sponsors/` 에 넣고 `sponsor.logo` 에 경로를 적습니다.

```javascript
    sponsor: { name: "한국연구재단", logo: "images/sponsors/nrf.jpg", url: "https://www.nrf.re.kr" },
```

- **기관명은 로고와 상관없이 항상 글자로 나옵니다.** 로고가 없으면 기관명만 나옵니다
- 파일 이름은 **영문 소문자**로 짓습니다. 한글 파일명은 주소창에서 깨질 수 있습니다
- 높이 **160px 안팽**이면 충분합니다. 화면에는 28px 로 나옵니다
- 로고 주변의 **흰 여백은 미리 잘라냅니다.** 여백이 남아 있으면 로고가 작게 보입니다
- 배경이 투명해야 하면 PNG, 그렇지 않으면 JPG 가 용량이 작습니다
- 원본 파일은 `images/sponsors/_raw/` 에 두면 됩니다. 이 폴더는 git 에 올라가지 않습니다

---

### 진행중 / 완료는 자동으로 바뀝니다

**`status` 라는 항목은 없습니다.** `endDate`(종료일)가 오늘보다 뒤면 `Ongoing`,
지났으면 `Completed` 로 홈페이지가 **매번 알아서 판단**합니다.
과제가 끝나도 따로 고칠 필요가 없습니다.

예외가 있을 때만 `statusOverride` 를 씁니다.

```javascript
statusOverride: null          // 평소 (자동 판정)
statusOverride: "completed"   // 기간은 남았지만 조기 종료된 경우
statusOverride: "ongoing"     // 기간이 지났지만 연장된 경우
```

### 항목 설명

- `id` — 다른 과제와 겹치지 않는 이름이면 됩니다.
- `role` — `PI`(연구책임자) / `Co-I`(참여연구원) / `Advisor`(지도교수) 중 하나.
- `orgRole` — 기관 단위 역할(주관·공동·위탁). **화면에 나오지 않습니다.**
- `grantNo` — 논문 사사 문구 쓸 때 필요한 과제번호. **화면에 나오지 않습니다.**
- `logo` — 지원기관 로고. 비워두면 기관 이름이 글자로 나옵니다.
  넣으려면 `images/sponsors/` 에 SVG 파일을 두고 `"images/sponsors/nrf.svg"` 처럼 적습니다.

---

## 3. 구성원 추가하기

`data/members.js` 를 엽니다. 파일 안에 **복사해 쓸 수 있는 예시가 주석으로** 들어 있습니다.

### 새 학생

```javascript
  {
    id: "student-kim",
    role: "ms",
    name: "Hyun-Woo Kim (김현우)",
    title: "M.S. Student",
    photo: "images/members/kim.jpg",
    email: "",
    office: "",
    interests: "IPMSM 설계, 진동·소음 해석",
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
```

- `role` — `phd`(박사과정) / `ms`(석사과정) / `undergrad`(학부연구생) / `postdoc`(박사후연구원)
- `name` — **영문 이름 + 괄호 안에 국문** 형식을 지켜주세요.
  이 표기를 기준으로 논문 저자 목록에서 이름이 굵게 표시됩니다.
- `email`, `office` 를 `""` 로 두면 **연구실 대표 연락처가 자동으로 들어갑니다.**
  개인 이메일이 따로 있을 때만 적으세요.
- `photo` — 사진은 `images/members/` 에 넣습니다. (4번 항목의 사진 줄이는 법 참고)
  아직 없으면 `""` 로 두면 이름이 적힌 회색 상자가 나옵니다.

### 졸업생으로 옮기기

학생 항목을 지우지 말고 **세 곳만 고칩니다.**

```javascript
    role: "alumni",              ← ms / phd 에서 alumni 로
    title: "M.S.",               ← "M.S. Student" 에서 "M.S." 로
    gradYear: 2027,              ← 졸업 연도 (숫자, 따옴표 없이)
    thesis: "학위논문 제목",
    currentPosition: "LG전자 선임연구원"
```

졸업생은 사진 없이 **졸업 연도 내림차순 목록**으로 자동 정리됩니다.

---

## 4. 소식 올리기

`data/news.js` 를 엽니다. `const NEWS = [` 바로 아래에 붙여넣습니다.

```javascript
  {
    date: "2026-09-01",
    category: "paper",
    text: "김현우 학생의 논문이 IEEE Transactions on Magnetics에 게재 승인되었습니다.",
    link: "",
    image: ""
  },
```

- `date` — **반드시 `"YYYY-MM-DD"` 형식.** 순서는 자동으로 최신순 정렬됩니다.
- `category` — `paper`(논문) / `award`(수상) / `member`(구성원) / `project`(과제) / `etc`(그 외)
- `text` — 1~3문장. 길게 쓰지 않습니다.
- `link` — 주소를 넣으면 문장 전체가 링크가 됩니다. 없으면 `""`.
- `image` — 넣으면 왼쪽에 작은 사진이 붙습니다. 없으면 `""`.

수상 소식은 별도 페이지를 만들지 않고 `category: "award"` 로 여기에 쌓습니다.

---

## 5. 갤러리에 사진 올리기

사진은 **NEWS 페이지 하단**에 앨범 단위로 보입니다.
갤러리 전용 페이지는 따로 없고, 글 소식 아래에 이어서 나옵니다.

### 1단계 — 사진 줄이기

**원본 사진을 그대로 올리면 안 됩니다.** 사진 한 장이 5MB 씩 쌓이면
홈페이지가 느려지고 저장소 용량도 금방 찹니다.

1. 올릴 사진을 `images\_raw\` 폴더에 모아 둡니다. (폴더가 없으면 만드세요)
2. `images` 폴더에서 **Shift + 마우스 오른쪽 클릭** → "여기에 PowerShell 창 열기"
3. 아래를 붙여넣고 Enter

```powershell
powershell -ExecutionPolicy Bypass -File .\resize.ps1
```

`images\gallery\` 안에 **긴 변 1600px 로 줄어든 JPG** 가 만들어집니다.
파일 이름도 영문 소문자로 자동 정리됩니다. (`제주 MT 01.jpg` → `mt-01.jpg`)

`_raw` 폴더는 git 에 올라가지 않으니 원본은 그대로 두어도 됩니다.

**다른 폴더에 넣고 싶을 때**

```powershell
powershell -ExecutionPolicy Bypass -File .\resize.ps1 -Out members
powershell -ExecutionPolicy Bypass -File .\resize.ps1 -Out research
```

### 2단계 — `data/gallery.js` 에 적기

```javascript
  {
    id: "2026-kiee-summer",
    title: "2026 대한전기학회 하계학술대회",
    date: "2026-07-15",
    cover: "",
    images: [
      { src: "images/gallery/kiee2026-01.jpg", caption: "포스터 발표" },
      { src: "images/gallery/kiee2026-02.jpg", caption: "" }
    ]
  },
```

- `cover` 를 비워두면 **첫 번째 사진이 대표 사진**이 됩니다.
- `caption` 은 없으면 `""` 로 둡니다.
- 앨범을 클릭하면 사진이 크게 열리고, 좌우 화살표나 키보드로 넘길 수 있습니다.
- 저장한 뒤 `news.html` 을 새로고침하면 페이지 하단에 바로 나타납니다.

---

## 6. 첫 화면 영상 바꾸기

첫 화면 배경 영상은 `images/hero.mp4`, 영상이 뜨기 전 보이는 사진은
`images/hero-poster.jpg` 입니다. 같은 이름으로 덮어쓰면 됩니다.

**영상은 5MB 이하로 줄여서 넣으세요.** [ffmpeg](https://ffmpeg.org/download.html) 로 처리합니다.

```bash
ffmpeg -i 원본영상.mp4 -t 20 -vf "scale=1920:-2" -c:v libx264 -crf 30 -preset slow -an -movflags +faststart images/hero.mp4
```

- `-t 20` 20초만 자르기 · `-an` 소리 제거 · `-crf 30` 화질(숫자가 클수록 용량 작음)
- `-movflags +faststart` 는 재생이 빨리 시작되게 합니다. 빼지 마세요.

포스터 이미지는 영상에서 한 장 뽑아 씁니다.

```bash
ffmpeg -i images/hero.mp4 -ss 00:00:02 -vframes 1 -q:v 3 images/hero-poster.jpg
```

**영상 소재로 좋은 것** (설득력 순서)

1. 해석 결과 애니메이션 — 회전자 회전에 따른 자속밀도 분포 변화 (ANSYS Maxwell / JMAG 출력)
2. 최적설계 과정의 형상 변화
3. 실험실 전경 / 시제품 구동 촬영

영상이 없어도 홈페이지는 정상 동작합니다. 짙은 남색 배경이 대신 나옵니다.

---

## 7. 연구실 이름이나 색상 바꾸기

### 이름 · 주소 · 연락처 · 메뉴 이름

**`data/site.js` 한 곳만** 고치면 헤더, 푸터, 페이지 제목, 지도까지 전부 바뀝니다.

```javascript
const SITE = {
  labName:    "Electro-Mechanical Energy Conversion Lab",
  labShort:   "EMEC",
  labNameKo:  "전기-기계 에너지변환 연구실",
  university: "Soonchunhyang University",
  department: "Department of Electrical Engineering",
  tagline:    "한 줄 소개 문구",
  address: { full: "...", fullKo: "...", short: "..." },
  phone: "041-530-1334",
  email: "minro@sch.ac.kr",
  mapLat: 36.7706,        ← 지도 위치
  mapLng: 126.9328,
  ...
};
```

지도 좌표는 Google 지도에서 원하는 지점을 **마우스 오른쪽 클릭**하면 나옵니다.

### 색상

**`js/theme.js` 한 곳만** 고칩니다.

```javascript
var PALETTE = {
  DEFAULT: '#26539C',   // 메인 색상
  dark:    '#1B3C71',   // 진한 색 (버튼 hover, 푸터 배경)
  light:   '#E8EEF7',   // 아주 옅은 배경
  mid:     '#5C81BC'    // 중간 색
};
```

⚠ `dark` / `light` / `mid` 는 메인 색상에서 계산한 값입니다.
**메인 색상만 바꾸면 어색해집니다.** 네 개를 같이 조정하세요.
[Tailwind Color Generator](https://uicolors.app/create) 같은 도구를 쓰면 편합니다.

---

## 8. 수정한 내용을 실제 사이트에 반영하기

홈페이지는 GitHub Pages 로 서비스됩니다. 파일을 고친 뒤 아래를 실행하면
**1~2분 안에** 실제 주소에 반영됩니다.

```bash
git add .
git commit -m "2026년 하계학술대회 사진 추가"
git push
```

`git commit -m "..."` 안에는 **무엇을 바꿨는지 한글로 짧게** 씁니다.

GitHub Desktop 을 쓴다면 변경된 파일을 확인하고
**Commit → Push origin** 두 번만 누르면 됩니다.

### 올리기 전에 꼭 확인할 것

1. `index.html` 을 더블클릭해서 **직접 눈으로 확인**합니다.
2. 브라우저 창을 좁게 줄여서 **휴대폰 화면에서도 깨지지 않는지** 봅니다.
3. F12 → Console 에 **빨간 글씨가 없는지** 확인합니다.
   (`cdn.tailwindcss.com should not be used in production` 이라는 노란 경고는 정상입니다)

---

## 9. 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| 페이지가 하얗게 비어 있음 | 쉼표나 따옴표 실수. F12 → Console 에서 줄 번호 확인 |
| 사진 자리에 회색 상자가 나옴 | 파일 이름이 다르거나 경로가 틀림. 대소문자도 구분됩니다 |
| 새 논문이 안 보임 | 저장했는지 확인 → 브라우저에서 **Ctrl + F5** (강력 새로고침) |
| 과제가 계속 진행중으로 나옴 | `endDate` 를 확인. `statusOverride` 가 `null` 인지 확인 |
| 저자 이름이 굵게 안 나옴 | `data/members.js` 의 `name` 표기와 논문 저자 표기가 다름 |
| 사이트에 반영이 안 됨 | `git push` 를 했는지 확인. 반영에 1~2분 걸립니다 |

---

## 10. 하지 말아야 할 것

- **HTML 파일 안에 내용을 직접 쓰지 마세요.** 논문·구성원·소식은 전부 `data` 폴더입니다.
- **원본 사진·영상을 그대로 올리지 마세요.** 반드시 줄여서 넣습니다.
- **`js/` 폴더 파일은 건드리지 마세요.** (색상 바꾸는 `theme.js` 는 예외)
- **`npm install` 같은 명령을 실행하지 마세요.** 이 홈페이지는 설치 과정이 없습니다.

---

궁금한 점이나 고장이 나면 지도교수님께 문의하세요.
자세한 설계 규칙은 `CLAUDE.md` 에 정리되어 있습니다.
