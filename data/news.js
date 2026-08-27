/* =========================================================================
 * data/news.js  —  연구실 소식
 *
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ 새 소식 추가하는 법                                                  │
 * │  1. 아래 NEWS 배열의 맨 위에 아래 덩어리를 복사해 붙여넣는다.          │
 * │  2. 내용을 바꾼다.                                                  │
 * │  3. 저장하고 news.html 을 새로고침하면 바로 보인다.                   │
 * │                                                                   │
 * │   {                                                               │
 * │     date: "2026-09-01",                                           │
 * │     category: "paper",                                            │
 * │     title: "한 줄 제목",                                            │
 * │     text: "여기에 한두 문장으로 씁니다.",                             │
 * │     link: "",                                                     │
 * │     image: ""                                                     │
 * │   },                                                              │
 * │                                                                   │
 * │ ⚠ 쉼표(,)를 빠뜨리거나 큰따옴표를 닫지 않으면 페이지가 비어 보인다.     │
 * │   그럴 때는 브라우저에서 F12 → Console 을 보면 몇 번째 줄인지 나온다.   │
 * └───────────────────────────────────────────────────────────────────┘
 *
 * 항목 설명
 *   date      "YYYY-MM-DD"  최신 소식이 위로 온다
 *   category  paper | award | member | project | etc   (라벨은 SITE.newsCategories)
 *   title     제목 한 줄. 굵게 표시된다
 *   text      세부 내용. 한두 문장
 *   link      선택. 있으면 제목이 링크가 된다
 *   image     선택. 있으면 왼쪽에 작은 썸네일이 붙는다
 * ========================================================================= */

const NEWS = [
  {
    date: "2026-08-19",
    category: "member",
    title: "이용민 석사 졸업",
    text: "이용민 석사가 학위를 마치고 졸업하였습니다. 앞으로의 길에 좋은 일이 가득하기를 바랍니다.",
    link: "", image: ""
  },
  {
    date: "2026-06-09",
    category: "paper",
    title: "김혜성, IEEE Transactions on Magnetics 게재 승인",
    text: "김혜성 석사과정이 제1저자로 작성한 “Transfer Learning-Assisted Analytical Quasi-3D Surrogate Modeling for Electromagnetic Performance Prediction of AFPMs Considering Eccentricity” 논문이 게재 승인되었습니다.",
    link: "", image: ""
  },
  {
    date: "2026-05-30",
    category: "paper",
    title: "고동훈, International Journal of Automotive Technology 게재 승인",
    text: "고동훈 석사가 제1저자로 작성한 “Analytical Estimation and Verification of Cogging Torque in an SPMSM Considering Segmented-Core Manufacturing Tolerances for EPS Motors” 논문이 게재 승인되었습니다.",
    link: "", image: ""
  },
  {
    date: "2026-04-03",
    category: "paper",
    title: "이용민, International Journal of Automotive Technology 게재 승인",
    text: "이용민 석사과정이 제1저자로 작성한 “Comparative study of kriging and deep neural networks as surrogate models for parameter prediction of PMSM” 논문이 게재 승인되었습니다.",
    link: "", image: ""
  },
  {
    date: "2026-03-01",
    category: "member",
    title: "이영훈 석사과정 입학",
    text: "이영훈 학생이 석사과정으로 연구실에 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2026-02-20",
    category: "paper",
    title: "김유정, 전기학회논문지 게재 승인",
    text: "김유정 학부연구생이 제1저자로 작성한 “Analysis of Energy Consumption in Electric Vehicles Considering Motor Materials and Driving Cycles” 논문이 게재 승인되었습니다.",
    link: "", image: ""
  },
  {
    date: "2026-02-19",
    category: "member",
    title: "고동훈 석사 졸업",
    text: "고동훈 석사가 학위를 마치고 졸업하였습니다. 앞으로의 길에 좋은 일이 가득하기를 바랍니다.",
    link: "", image: ""
  },
  {
    date: "2026-02-19",
    category: "member",
    title: "학부연구생 7명 졸업",
    text: "김수경 · 김효희 · 이기욱 · 김유정 · 장선주 · 황인준 · 이영훈 학부연구생이 학사 학위를 취득하였습니다.",
    link: "", image: ""
  },
  {
    date: "2025-12-05",
    category: "paper",
    title: "이용민, IEEE Transactions on Magnetics 게재 승인",
    text: "이용민 석사과정이 제1저자로 작성한 “Characteristics Estimation and Design of SPMSM Using Analytic Method-Based Transfer Learning” 논문이 게재 승인되었습니다.",
    link: "", image: ""
  },
  {
    date: "2025-11-20",
    category: "award",
    title: "대한전기학회 추계학술대회 우수논문상 수상",
    text: "김유정 · 장선주 · 황인준 학부연구생이 2025 대한전기학회 추계학술대회에서 우수논문상을 수상하였습니다.",
    link: "", image: ""
  },
  {
    date: "2025-09-01",
    category: "project",
    title: "김혜성, 석사과정생 연구장려금 선정",
    text: "김혜성 석사과정이 한국연구재단 석사과정생연구장려금지원사업에 선정되었습니다.",
    link: "", image: ""
  },
  {
    date: "2025-06-01",
    category: "member",
    title: "학부연구생 4명 합류",
    text: "정민구 · 이현규 · 노진성 · 신주현 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2025-03-01",
    category: "member",
    title: "김혜성 석사과정 입학",
    text: "김혜성 학생이 석사과정으로 연구실에 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2025-02-20",
    category: "member",
    title: "학부연구생 7명 졸업",
    text: "이영교 · 김혜성 · 정재혁 · 안도국 · 김운형 · 박지원 · 양준영 학부연구생이 학사 학위를 취득하였습니다.",
    link: "", image: ""
  },
  {
    date: "2024-09-01",
    category: "project",
    title: "고동훈, 석사과정생 연구장려금 선정",
    text: "고동훈 석사과정이 한국연구재단 석사과정생연구장려금지원사업에 선정되었습니다.",
    link: "", image: ""
  },
  {
    date: "2024-07-01",
    category: "project",
    title: "이용민, 석사과정생 연구장려금 선정",
    text: "이용민 석사과정이 한국연구재단 석사과정생연구장려금지원사업에 선정되었습니다.",
    link: "", image: ""
  },
  {
    date: "2024-03-06",
    category: "member",
    title: "학부연구생 7명 합류",
    text: "김수경 · 김효희 · 이기욱 · 김유정 · 장선주 · 황인준 · 이영훈 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2024-03-01",
    category: "member",
    title: "석사과정 2명 입학",
    text: "이용민 · 고동훈 학생이 석사과정으로 연구실에 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2024-02-22",
    category: "member",
    title: "학부연구생 6명 졸업",
    text: "이용민 · 고동훈 · 김동현 · 홍준택 · 이다은 · 김은서 학부연구생이 학사 학위를 취득하였습니다.",
    link: "", image: ""
  },
  {
    date: "2023-11-08",
    category: "award",
    title: "공과대학 학술제 대상 수상",
    text: "이용민 · 홍준택 · 김동현 학부연구생이 공과대학 학술제에서 대상을 수상하였습니다.",
    link: "", image: ""
  },
  {
    date: "2023-03-31",
    category: "member",
    title: "학부연구생 4명 합류",
    text: "이영교 · 김혜성 · 정재혁 · 안도국 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2022-11-01",
    category: "member",
    title: "학부연구생 3명 합류",
    text: "김운형 · 박지원 · 양준영 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2022-09-01",
    category: "member",
    title: "학부연구생 3명 합류",
    text: "홍준택 · 이다은 · 김은서 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2022-08-22",
    category: "member",
    title: "학부연구생 3명 합류",
    text: "이용민 · 고동훈 · 김동현 학생이 학부연구생으로 합류하였습니다.",
    link: "", image: ""
  },
  {
    date: "2022-03-02",
    category: "etc",
    title: "EMEC 연구실 설립",
    text: "박민로 교수가 순천향대학교 전기공학과에 부임하고 Electro-Mechanical Energy Conversion (EMEC) 연구실을 설립하였습니다.",
    link: "", image: ""
  }
];

/* =========================================================================
 * 아직 날짜를 모르는 수상 실적 — 실적정리_20260428.xlsx 'Research Experience'
 *
 * ⚠ 엑셀에는 연도만 있고 정확한 수상 일자가 없다.
 *   날짜를 임의로 지어내지 않고 아래에 주석으로 두었다.
 *   각 항목의 date 를 채운 뒤 위 NEWS 배열로 옮길 것.
 *
 *   {
 *     date: "2023-__-__",
 *     category: "award",
 *     title: "IEEE Trans. Energy Convers. 우수논문상",
 *     text: "Best Paper Award, IEEE Power & Energy Society Transactions on Energy Conversion",
 *     link: "", image: ""
 *   },
 *   {
 *     date: "2025-__-__",
 *     category: "award",
 *     title: "Compumag 2025 Galileo Ferraris Contest 입상",
 *     text: "Prize Winner, IEEE Compumag 2025 Galileo Ferraris Contest",
 *     link: "", image: ""
 *   }
 * ========================================================================= */
