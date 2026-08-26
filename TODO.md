# 진행 상황과 남은 일

작업이 중단되었다가 다시 이어질 때를 위한 인수인계 문서.
설계 규칙은 `CLAUDE.md`, 학생용 운영법은 `README.md` 에 있다.
이 문서는 **지금 어디까지 왔고, 무엇을 기다리고 있는지**만 적는다.

최종 갱신: 2026-08-27

---

## 1. 페이지 상태

| 페이지 | 상태 | 비고 |
|---|---|---|
| HOME | 완료 | 히어로 · 연구분야 · 최근 소식 · Join Us |
| PEOPLE | 교수만 완료 | 재학생 · 졸업생 명단 대기 |
| RESEARCH | 완료 | 연구분야 설명글과 장비 목록은 자리표시자 |
| PUBLICATIONS | 완료 | 130건. 국제/국내 · 등록/출원으로 나눠 표시 |
| NEWS | 완료 | 글 소식 + 사진 게시글 한 페이지. 실제 소식 · 사진 대기 |
| JOIN US | 완료 | 연구 내용 항목만 자리표시자 |
| CONTACT | 완료 | 주소 · 연락처 · 지도 |

---

## 2. 답을 기다리는 질문

아래는 물어봤지만 아직 결정되지 않은 것들이다.

### 2-1. CLAUDE.md 와 코드가 어긋난 부분

문서 수정은 사용자 지시를 받은 뒤에 한다. (CLAUDE.md 10번)

- **7번 HOME 섹션 구성** — 문서에는 섹션 7개와 "섹션 순서 변경 금지"가 적혀 있으나,
  사용자 요청으로 **지도교수 · 현황 지표 · 최근 논문을 감췄다.** 현재 4개.
  감춘 섹션은 `index.html` 의 "감춘 섹션" 주석 안에 그대로 있어 주석만 풀면 복구된다.
- **7번 Join Us 성격** — 문서는 "대학원생 모집 안내 → contact.html 링크"인데,
  지금은 CONTACT 가 본거지이고 HOME 은 배너 역할이다.
- **0번 검증 grep 2번** — `grep -rn "26539C" --include="*.css"` 가 `css/custom.css` 의
  `:root` 한 줄에 걸린다. 문서는 "위 두 파일(theme.js, custom.css) 제외"라고 하므로
  **grep 명령 쪽이 문서 본문과 맞지 않는다.** 명령을 고치거나, CSS 변수를 theme.js 로 옮겨야 한다.
- **5번 메뉴 구조** — 문서는 `NEWS ▾ (News / Gallery)` 와 `CONTACT` 단일 구조이나,
  사용자 요청으로 **NEWS 를 한 페이지로 합치고 JOIN US 를 상위 메뉴로 분리했다.**
  현재 상위 메뉴는 7개 (… NEWS · JOIN US · CONTACT).
  `gallery.html` 은 삭제되고 `join.html` 이 생겼다. → **4번 폴더 구조도 함께 어깋난다.**
- **5번 NEWS 분리 근거** — "갤러리 이미지 용량 때문에 두 파일로 분리한다"는 설명이
  더 이상 맞지 않는다. 앵범이 많아지면 NEWS 페이지가 무거워질 수 있다.
- **0번 현재 값 블록** — `address.short` 가 문서에는 `Multimedia Bldg. M417`,
  코드에는 `Multimedia Building, M417` (사용자 요청으로 약어를 풀었음).

### 2-2. 확인 대기

- **수상 3건의 정확한 날짜** — `data/news.js` 하단 주석에 대기 중.
  연도만 알고 있어 날짜를 지어내지 않았다. 날짜만 채우면 바로 NEWS 에 나온다.
- **연구분야 4개의 개수와 내용** — 사용자가 "틀 잡은 뒤 다시 이야기하자"고 함.
  현재 4개는 실적정리 엑셀의 Research Interests 8개 항목을 묶은 것이고,
  `description` 은 전부 자리표시자다.
- **파비콘 C 마크** — 로고가 9:1 이라 정사각 아이콘을 만들 수 없어
  마지막 글자 C 만 떼어 썼다. 다른 방식을 원하면 교체 가능.
- **Join Us 완전 통합 여부** — 메인에서 빼고 CONTACT 에만 둘지.
  지금은 메인에 배너를 남겨 두었다.
- **지도 핀 위치** — 플러스 코드 `8Q88QW9M+JV` 를 변환해 넣었고 캠퍼스 안인 것은 확인했으나,
  멀티미디어관 건물이 맞는지는 눈으로 확인 필요.

---

## 3. JCR 순위 자료 (조회 필요)

`data/publications.js` 의 `jcrTop` · `jcrRank` · `jcrQuartile` 을 채우려면
아래 조합의 JCR 자료가 필요하다. **게재 시점에 공개되어 있던 판본** 기준이다.
(JCR `<연도>` 판은 그 이듬해 6월 말에 공개된다)

저널이 여러 카테고리에 속하면 **가장 높은 카테고리** 기준으로 적는다.

| 저널 | 논문 | 필요한 JCR 판본 |
|---|---|---|
| IEEE Transactions on Magnetics | 7건 | 2014, 2018, 2019, 2024 |
| International Journal of Automotive Technology | 4건 | 2024, 최신 |
| Journal of Magnetics | 3건 | 2018, 2021, 2023 |
| Mathematics | 3건 | 2023 |
| IEEE Transactions on Energy Conversion | 3건 | 2019 |
| IEEE Transactions on Industry Applications | 2건 | 2017, 2019 |
| Energies | 1건 | 2019 |
| Journal of Electrical Engineering & Technology | 1건 | 2021 |
| Machines | 1건 | 2024 |
| Mechanical Systems and Signal Processing | 1건 | 2024 |
| Mechatronics | 1건 | 2020 |
| Renewable and Sustainable Energy Reviews | 1건 | 2021 |
| Sensors | 1건 | 2019 |
| Structural and Multidisciplinary Optimization | 1건 | 2024 |
| IEEE/ASME Transactions on Mechatronics | 1건 | 2016 |

저널 15개 · 조합 22개 · 논문 31건

**판본을 어떻게 정했나** — 논문에 이미 들어 있는 `impact` 값을
엑셀 `Impact Factor` 시트의 연도별 IF 행렬에서 역으로 찾았다.
교수님이 실제로 어느 판본을 쓰셨는지 그대로 나온다. 31건 중 29건이 이렇게 확정됐다.

나머지 2건은 확인이 필요하다.

- **IEEE Transactions on Magnetics, 2016.03 게재 2건** — IF `1.386`.
  엑셀 행렬이 2015년부터 시작해 이 값이 없다. 게재일로 보면 **JCR 2014** 다.
- **International Journal of Automotive Technology, Early Access 1건** — IF `2.1`.
  행렬의 IJAT 값(0.876~1.6)에 없다. **JCR 2025** 처럼 더 최근 판본으로 보인다.

---
## 4. 받아야 할 자료

### 이미지 · 영상

| 파일 | 용도 | 상태 |
|---|---|---|
| `images/hero.mp4` | 첫 화면 배경 영상 | **없음** — 지금은 남색 단색 |
| `images/hero-poster.jpg` | 영상 로딩 전 · 모바일용 | **없음** |
| `images/research/*.jpg` | 연구분야 대표 이미지 4장 | **없음** — 회색 자리표시자 |
| `images/sponsors/*.svg` | 지원기관 CI | **없음** — 기관명 텍스트로 표시 중 |
| `images/members/park.jpg` | 교수 사진 | 완료 |
| `images/logo/*` | 로고 일체 | 완료 |

영상은 5MB 이하, 사진은 긴 변 1600px 이하. `images/resize.ps1` 로 처리한다.
히어로 영상 소재로는 자속밀도 분포 애니메이션이 가장 설득력이 크다. (CLAUDE.md 9번)

### 글

- `SITE.tagline` — 연구실 한 줄 정체성 문구
- `SITE.home.joinLead` — 대학원생 모집 안내 문구
- `RESEARCH[].description` — 연구분야별 한 문단
- `EQUIPMENT` — 실제 보유 장비 목록
- `MEMBERS` — 재학생 · 졸업생 명단
- `MEMBERS[0].education` / `career` — 학위 이력과 경력의 세부 항목
  (현재는 엑셀에서 옮긴 요약만 들어 있음)

---

## 5. 데이터 출처

- 논문 · 과제 · 학회활동 · 초청강연 : `D:\개인서류\2_실적\실적정리_20260428.xlsx`
- 로고 원본 : `images/logo/EMEC_Lab Identity.png` (4192×468, 투명 배경, #26539C)
- 교수 사진 원본 : `D:\개인서류\1_취업\증명사진\박민로_고화질.JPG`

엑셀이 갱신되면 논문 · 과제를 다시 옮겨야 한다.
1회성 변환 스크립트는 세션 임시 폴더에 있었으므로 남아 있지 않을 수 있다.

---

## 6. 아직 안 한 것

- **배포** — GitHub Pages 설정 (조직 `EMEC`, 저장소 `EMEC.github.io`).
  `.nojekyll` 은 준비되어 있고 원격 저장소만 연결하면 된다.
- **`images/` 변환 스크립트 안내** — `resize.ps1` 은 만들었고 README 에 사용법이 있다.

---

## 7. 새 세션에서 시작할 때

1. `CLAUDE.md` 를 읽는다. 기술 제약(3번)과 데이터 명세(6번)가 이 프로젝트의 존재 이유다.
2. 이 문서의 2번(대기 중인 질문)을 확인한다.
3. `git log --oneline` 으로 진행 이력을 본다.
4. `index.html` 을 더블클릭해 현재 화면을 확인한다.
