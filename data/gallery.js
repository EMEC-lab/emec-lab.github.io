/* =========================================================================
 * data/gallery.js  —  연구실 활동 사진 (앨범 단위)
 *
 * ── 새 앨범 추가하는 법 ────────────────────────────────────────────────
 *  1. 사진을 images/_raw/ 폴더에 모아 둔다.
 *  2. PowerShell 에서 images/resize.ps1 을 실행한다.
 *     → images/gallery/ 에 본문용(1600px), images/gallery/thumb/ 에
 *       격자용 썸네일(400px)이 만들어진다.
 *  3. 아래 GALLERY 배열 맨 위에 이 덩어리를 복사해 붙여넣고 내용을 바꾼다.
 *
 *     {
 *       id: "2026-kiee-summer",
 *       title: "대한전기학회 하계학술대회",
 *       date: "2026-07-08",
 *       desc: "포스터 발표 4건",
 *       cover: "",
 *       images: [
 *         { src: "images/gallery/21-1.jpg", caption: "" }
 *       ]
 *     },
 *
 *  4. 저장하고 gallery.html 을 새로고침하면 바로 보인다.
 *
 *  ⚠ 쉼표(,)와 큰따옴표를 빠뜨리지 말 것.
 *    마지막 항목 뒤에는 쉼표를 찍지 않는다.
 * ──────────────────────────────────────────────────────────────────────
 *
 * 항목 설명
 *   id       영문 소문자·숫자·하이픈. 다른 앨범과 겹치지 않게
 *   title    앨범 이름. 화면에 그대로 표시된다
 *   date     "YYYY-MM-DD"  최신 앨범이 위로 온다. 기간 행사는 시작일
 *   desc     한 줄 설명. 비우면 그 줄이 나오지 않는다
 *   cover    대표 사진 경로. 비워두면 images 의 첫 번째 사진을 쓴다
 *   images   [{ src, caption }, ...]  caption 이 없으면 "" 로 둔다
 *
 * 사진 규칙 (CLAUDE.md 8번)
 *   - 원본을 그대로 커밋하지 않는다. 긴 변 1600px 이하로 줄여서 넣는다
 *   - 격자에는 thumb/ 의 400px 사진을, 확대에는 본문용 사진을 쓴다
 *   - 화면에는 모두 loading="lazy" 로 그려진다
 * ========================================================================= */

const GALLERY = [
  {
    id: "2026-ms-graduation",
    title: "석사 학위 수여",
    date: "2026-08-19",
    desc: "이용민 석사 졸업",
    cover: "",
    images: [
      { src: "images/gallery/23.jpg", caption: "" }
    ]
  },
  {
    id: "2026-workshop-3",
    title: "3차 연구실 엠티",
    date: "2026-07-08",
    desc: "대한전기학회 하계학술대회 참가와 함께 (평창)",
    cover: "",
    images: [
      { src: "images/gallery/22-1.jpg", caption: "" },
      { src: "images/gallery/22-2.jpg", caption: "" },
      { src: "images/gallery/22-3.jpg", caption: "" },
      { src: "images/gallery/22-4.jpg", caption: "" },
      { src: "images/gallery/22-5.jpg", caption: "" },
      { src: "images/gallery/22-6.jpg", caption: "" }
    ]
  },
  {
    id: "2026-kiee-summer",
    title: "대한전기학회 하계학술대회",
    date: "2026-07-08",
    desc: "포스터 발표 4건",
    cover: "",
    images: [
      { src: "images/gallery/21-1.jpg", caption: "" },
      { src: "images/gallery/21-2.jpg", caption: "" },
      { src: "images/gallery/21-3.jpg", caption: "" },
      { src: "images/gallery/21-4.jpg", caption: "" },
      { src: "images/gallery/21-5.jpg", caption: "" }
    ]
  },
  {
    id: "2026-teachers-day",
    title: "스승의 날",
    date: "2026-05-15",
    desc: "연구실 학생들이 준비한 선물",
    cover: "",
    images: [
      { src: "images/gallery/20.jpg", caption: "" }
    ]
  },
  {
    id: "2026-kiee-spring",
    title: "대한전기학회 춘계학술대회",
    date: "2026-04-23",
    desc: "포스터 발표 2건",
    cover: "",
    images: [
      { src: "images/gallery/19-1.jpg", caption: "" },
      { src: "images/gallery/19-2.jpg", caption: "" }
    ]
  },
  {
    id: "2026-intermag",
    title: "Intermag 2026",
    date: "2026-04-13",
    desc: "포스터 발표 2건 (Manchester, UK)",
    cover: "",
    images: [
      { src: "images/gallery/18-1.jpg", caption: "" },
      { src: "images/gallery/18-2.jpg", caption: "" },
      { src: "images/gallery/18-3.jpg", caption: "" },
      { src: "images/gallery/18-4.jpg", caption: "" }
    ]
  },
  {
    id: "2026-commencement",
    title: "학위 수여식",
    date: "2026-02-12",
    desc: "고동훈 석사 졸업, 이영훈 석사 입학, 학부연구생 6명 학사 졸업",
    cover: "",
    images: [
      { src: "images/gallery/17.jpg", caption: "" }
    ]
  },
  {
    id: "2025-kiee-fall-award",
    title: "대한전기학회 우수논문상",
    date: "2025-11-19",
    desc: "EV 구동 모터 재질 및 주행 사이클에 따른 에너지 소비 특성 분석",
    cover: "",
    images: [
      { src: "images/gallery/16.jpg", caption: "" }
    ]
  },
  {
    id: "2025-workshop-2",
    title: "2차 연구실 엠티",
    date: "2025-11-19",
    desc: "대한전기학회 추계학술대회 참가와 함께 (부산)",
    cover: "",
    images: [
      { src: "images/gallery/15-1.jpg", caption: "" },
      { src: "images/gallery/15-2.jpg", caption: "" },
      { src: "images/gallery/15-3.jpg", caption: "" },
      { src: "images/gallery/15-4.jpg", caption: "" },
      { src: "images/gallery/15-5.jpg", caption: "" },
      { src: "images/gallery/15-6.jpg", caption: "" }
    ]
  },
  {
    id: "2025-kiee-fall",
    title: "대한전기학회 추계학술대회",
    date: "2025-11-19",
    desc: "포스터 발표 3건",
    cover: "",
    images: [
      { src: "images/gallery/14-1.jpg", caption: "" },
      { src: "images/gallery/14-2.jpg", caption: "" },
      { src: "images/gallery/14-3.jpg", caption: "" },
      { src: "images/gallery/14-5.jpg", caption: "" }
    ]
  },
  {
    id: "2025-eng-festival",
    title: "공과대학 학술제",
    date: "2025-11-04",
    desc: "",
    cover: "",
    images: [
      { src: "images/gallery/13.jpg", caption: "" }
    ]
  },
  {
    id: "2025-welcome-dinner",
    title: "신입 학부연구생 환영회",
    date: "2025-07-28",
    desc: "새로 합류한 3학년 학생들을 환영하며",
    cover: "",
    images: [
      { src: "images/gallery/12.jpg", caption: "" }
    ]
  },
  {
    id: "2025-kiee-summer",
    title: "대한전기학회 하계학술대회",
    date: "2025-07-16",
    desc: "포스터 발표 3건",
    cover: "",
    images: [
      { src: "images/gallery/11-1.jpg", caption: "" },
      { src: "images/gallery/11-2.jpg", caption: "" },
      { src: "images/gallery/11-3.jpg", caption: "" }
    ]
  },
  {
    id: "2025-compumag",
    title: "Compumag 2025",
    date: "2025-06-22",
    desc: "포스터 발표 4건",
    cover: "",
    images: [
      { src: "images/gallery/10-1.jpg", caption: "" },
      { src: "images/gallery/10-2.jpg", caption: "" },
      { src: "images/gallery/10-3.jpg", caption: "" },
      { src: "images/gallery/10-4.jpg", caption: "" }
    ]
  },
  {
    id: "2025-ldia",
    title: "LDIA 2025",
    date: "2025-05-18",
    desc: "포스터 발표 2건",
    cover: "",
    images: [
      { src: "images/gallery/9-1.jpg", caption: "" },
      { src: "images/gallery/9-2.jpg", caption: "" }
    ]
  },
  {
    id: "2025-teachers-day",
    title: "스승의 날",
    date: "2025-05-15",
    desc: "각자 만들어 온 음식으로 저녁 식사",
    cover: "",
    images: [
      { src: "images/gallery/8-1.jpg", caption: "" },
      { src: "images/gallery/8-2.jpg", caption: "" }
    ]
  },
  {
    id: "2025-commencement",
    title: "학위 수여식",
    date: "2025-02-20",
    desc: "김혜성 석사 입학, 학부연구생 6명 학사 졸업",
    cover: "",
    images: [
      { src: "images/gallery/7.jpg", caption: "" }
    ]
  },
  {
    id: "2025-workshop-1",
    title: "1차 연구실 엠티",
    date: "2025-02-09",
    desc: "대부도 · 비발디파크",
    cover: "",
    images: [
      { src: "images/gallery/6-1.jpg", caption: "" },
      { src: "images/gallery/6-2.jpg", caption: "" }
    ]
  },
  {
    id: "2024-teachers-day",
    title: "스승의 날",
    date: "2024-05-15",
    desc: "모터 모양 케이크",
    cover: "",
    images: [
      { src: "images/gallery/4.jpg", caption: "" }
    ]
  },
  {
    id: "2024-kiee-spring",
    title: "대한전기학회 춘계학술대회",
    date: "2024-04-25",
    desc: "포스터 발표 2건",
    cover: "",
    images: [
      { src: "images/gallery/3.jpg", caption: "" }
    ]
  },
  {
    id: "2024-commencement",
    title: "학위 수여식",
    date: "2024-02-22",
    desc: "이용민 · 고동훈 석사 입학, 학부연구생 4명 학사 졸업",
    cover: "",
    images: [
      { src: "images/gallery/2.jpg", caption: "" }
    ]
  },
  {
    id: "2023-eng-festival-award",
    title: "공과대학 학술제 대상",
    date: "2023-11-08",
    desc: "e-파워트레인 모델 기반 EV 구동용 IPMSM 설계",
    cover: "",
    images: [
      { src: "images/gallery/1.jpg", caption: "" }
    ]
  }
];
