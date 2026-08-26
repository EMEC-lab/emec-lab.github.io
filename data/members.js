/* =========================================================================
 * data/members.js
 * 구성원. HTML 에 하드코딩 금지 - 이 배열만 수정한다.
 *
 *   role   professor | postdoc | phd | ms | undergrad | alumni
 *   name   영문 + 괄호 국문 병기.  예: "Min-Ro Park (박민로)"
 *          -> 이 표기를 기준으로 논문 저자 목록에서 자동으로 굵게 표시된다
 *   email  SITE.email 과 같으면 비워둘 것 (자동으로 SITE 값을 쓴다)
 *   office 비우면 SITE.address.short 를 쓴다
 *   grade  학부연구생 전용. 학년(숫자). 학년별로 묶어 이름만 나열한다
 *          대학원생은 null 로 둔다
 *
 *   교수 전용 필드
 *     education    문자열 배열                     학력
 *     career       문자열 배열                     경력
 *     activities   period / role / org 객체 배열   학회 활동
 *     memberships  period / org 객체 배열          학회 회원
 *     talks        date / host / title 객체 배열   초청강연
 *     scholar      Google Scholar URL
 *
 *   졸업생 전용 필드
 *     gradYear / thesis / currentPosition
 *
 * 국내 학회 · 직책은 국문 그대로 적는다. 억지로 영역하지 않는다. (CLAUDE.md 2번)
 *
 * 출처: 실적정리_20260428.xlsx 'Research Experience' 시트
 * ========================================================================= */

const MEMBERS = [
  {
    id: "prof-park",
    role: "professor",
    name: "Min-Ro Park (박민로)",
    title: "Assistant Professor",
    photo: "images/members/park.jpg",
    email: "",
    office: "",
    interests: "Analysis and design of electric machines, Multi-physics analysis, Model-based and AI-assisted design, Electrified propulsion system design",

    education: [
      "Ph.D., Department of Automotive Engineering, Hanyang University, Seoul, 2020.02",
      "B.S., Department of Electrical Engineering, Chungnam National University, Daejeon, 2013.02"
    ],

    career: [
      "2022.03 – Present, Assistant Professor, Department of Electrical Engineering, Soonchunhyang University, Asan",
      "2025.02 – 2025.07, Lecturer, Global Partnership Center, Hyundai Motor Group",
      "2020.07 – 2022.02, Senior Researcher, Human-Robot Interaction R&D Center, Korea Institute of Robotics & Technology Convergence"
    ],

    activities: [
      { period: "2026.01 – 2026.12", role: "편집이사", org: "대한전기학회 전기기기 및 에너지변환시스템 부문 (B부문)" },
      { period: "2025.02 – 2026.12", role: "간사", org: "한국자기학회 Electro-Magnetic Energy Conversion 분과" },
      { period: "2026.01 – 2026.12", role: "Editor", org: "Journal of Electrical Engineering & Technology (SCIE)" },
      { period: "2025.02 – 2029.12", role: "Associate editor", org: "Journal of Magnetics (SCIE)" },
      { period: "2025.04 – 2026.06", role: "Guest editor", org: "Machines (SCIE), Special Issue (Electromagnetic and Multi-Physics Analysis and Design of Electric Machines)" },
      { period: "2026.01 – 2026.12", role: "편집위원", org: "The Transactions of The Korean Institute of Electrical Engineers (Scopus, KCI)" },
      { period: "2024.05 – 2025.07", role: "Technical Program Committee", org: "The 15th International Symposium on Linear Drives for Industry Applications (LDIA 2025)" },
      { period: "2020.09 – Present", role: "Reviewer", org: "IEEE Transactions on Industrial Electronics · IEEE Transactions on Transportation Electrification · IEEE/ASME Transactions on Mechatronics · IEEE Transactions on Energy Conversion · IEEE Transactions on Industry Applications · IEEE Transactions on Magnetics · Journal of Electrical Engineering & Technology · International Journal of Automotive Technology · Journal of Magnetics · The Journal of Korea Robotics Society · Journal of Institute of Control, Robotics and Systems" }
    ],

    memberships: [
      { period: "2022.03 – Present", org: "IEEE (Institute of Electrical and Electronics Engineers)" },
      { period: "2014.04 – Present", org: "KIEE (The Korean Institute of Electrical Engineers)" },
      { period: "2014.03 – Present", org: "KSAE (The Korean Society of Automotive Engineers)" },
      { period: "2014.10 – Present", org: "KMS (The Korean Magnetics Society)" }
    ],

    talks: [
      { date: "2025-12-23", host: "대구대학교", title: "전기-기계 특성을 고려한 Multi-physics 해석 기반 구동 모터 고출력밀도 설계" },
      { date: "2025-12-22", host: "한국자동차연구원", title: "전기-기계 특성을 고려한 Multi-physics 해석 기반 구동 모터 고출력밀도 설계" },
      { date: "2025-12-19", host: "한국생산기술연구원", title: "전기강판 BH 특성 평가 기술" },
      { date: "2025-11-26", host: "한국소음진동공학회, LG전자 인버터 BLDC모터 세션", title: "전자기력 기반 모터 소음·진동 특성 분석" },
      { date: "2025-11-21", host: "㈜ 승정", title: "e-모빌리티용 직구동(Direct Drive) 모터의 고효율·고토크밀도 설계 기술" },
      { date: "2025-10-30", host: "대한금속재료학회, 마그넷 분과", title: "연자성, 경자성 재료 기반 모터 설계 연구 동향" },
      { date: "2025-10-30", host: "한국자동차연구원", title: "고조파 전류 주입 제어를 통한 전기 구동 시스템 성능 개선 및 특성 분석" },
      { date: "2025-10-24", host: "한국생산기술연구원", title: "전자기력 기인 전기모터 진동&소음" },
      { date: "2025-09-19", host: "영남대학교", title: "동기발전기의 이해와 특성 및 개발 동향" },
      { date: "2025-08-19", host: "한국자기학회", title: "제 10회 자기학여름학교 : 모터와 자성재료" },
      { date: "2025-07-10", host: "한국자동차연구원", title: "제작 공차를 고려한 구동 모터 특성 분석 및 설계" },
      { date: "2025-02-25", host: "한국생산기술연구원", title: "로봇용 전동기의 토크밀도 및 응답성 개선 설계" },
      { date: "2025-02-05", host: "경상국립대", title: "분할코어 조립공차에 따른 영구자석 전동기 특성 분석" },
      { date: "2025-01-03", host: "한국자동차연구원", title: "차량용 모터-자성재료 최신기술 동향" },
      { date: "2024-12-23", host: "한국생산기술연구원", title: "전기모터 응답특성 향상 설계" },
      { date: "2024-11-01", host: "한국생산기술연구원", title: "Custom Design of Electric Actuator for Servo System Considering Electro-Mechanical Characteristics and Manufacturing condition" },
      { date: "2024-10-11", host: "영남대학교", title: "전자기력 기인 전기모터 진동&소음" },
      { date: "2024-08-20", host: "LG전자 가산R&D캠퍼스", title: "신개념 모터 및 제작기술을 고려한 전자기-기계적 특성 분석" },
      { date: "2024-08-12", host: "충남대학교", title: "전기기기의 제작기술을 고려한 전자기-기계적 특성" },
      { date: "2024-05-31", host: "동국대학교", title: "전자기력 기인 전기모터 진동&소음" },
      { date: "2023-12-13", host: "한국자동차연구원", title: "xEV 구동 모터 설계" },
      { date: "2023-10-25", host: "한국자동차연구원", title: "영구자석형 구동모터 신기술 동향" },
      { date: "2023-10-17", host: "한국생산기술연구원", title: "영구자석형 구동모터 신기술 동향" },
      { date: "2022-10-19", host: "한양대학교", title: "전기모터 기술 동향" },
      { date: "2022-09-30", host: "한국자동차연구원", title: "xEV 구동용 모터 설계 이론" },
      { date: "2022-08-19", host: "한국자동차연구원", title: "전동화 모듈 기술 동향" }
    ],

    scholar: "",

    gradYear: null,
    thesis: "",
    currentPosition: ""
  },
  {
    id: "ms-lee-yongmin",
    role: "ms",
    name: "Yong-Min Lee (이용민)",
    title: "M.S. Candidate",
    photo: "images/members/lee-yongmin.jpg",
    email: "", office: "",
    interests: "Optimal design of electric machines, Multi-physics analysis, Data-driven surrogate modeling, Machine learning",
    grade: null,
    education: [
      "B.S., Department of Electrical Engineering, Soonchunhyang University, 2024.02",
      "M.S., Department of Electrical and Communication Systems Engineering, Soonchunhyang University, 2026.08"
    ], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ms-kim-hyeseong",
    role: "ms",
    name: "Hye-Seong Kim (김혜성)",
    title: "M.S. Candidate",
    photo: "images/members/kim-hyeseong.png",
    email: "", office: "",
    interests: "Electromagnetic analysis and design, Vibration and noise analysis, Fault diagnosis of electric machines, Data-driven surrogate modeling, Machine learning",
    grade: null,
    education: [
      "B.S., Department of Electrical Engineering, Soonchunhyang University, 2025.02",
      "M.S., Department of Electrical and Communication Systems Engineering, Soonchunhyang University, 2025.03 – Present"
    ], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ms-lee-younghoon",
    role: "ms",
    name: "Young-Hoon Lee (이영훈)",
    title: "M.S. Candidate",
    photo: "images/members/lee-younghoon.jpg",
    email: "", office: "",
    interests: "Optimal design of electric machines, Multi-physics analysis, Analytical modeling",
    grade: null,
    education: [
      "B.S., Department of Electrical Engineering, Soonchunhyang University, 2026.02",
      "M.S., Department of Electrical and Communication Systems Engineering, Soonchunhyang University, 2026.03 – Present"
    ], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-01",
    role: "undergrad",
    name: "정민구",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 4,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-02",
    role: "undergrad",
    name: "신주현",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 4,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-03",
    role: "undergrad",
    name: "이현규",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 4,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-04",
    role: "undergrad",
    name: "김호윤",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 4,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-05",
    role: "undergrad",
    name: "노진성",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 4,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
      {
    id: "ug-08",
    role: "undergrad",
    name: "정석환",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 3,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "ug-09",
    role: "undergrad",
    name: "김우성",
    title: "",
    photo: "",
    email: "", office: "",
    interests: "",
    grade: 3,
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "alumni-ko-donghoon",
    role: "alumni",
    name: "Dong-Hoon Ko (고동훈)",
    title: "M.S.",
    photo: "images/members/ko-donghoon.jpg",
    email: "", office: "",
    interests: "Optimal design of electric machines, Robust design optimization, Computationally efficient analysis, Data-driven surrogate modeling",
    grade: null,
    education: [
      "B.S., Department of Electrical Engineering, Soonchunhyang University, 2024.02",
      "M.S., Department of Electrical and Communication Systems Engineering, Soonchunhyang University, 2026.02"
    ],
    career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: 2026,
    thesis: "",
    currentPosition: "Korea Automotive Technology Institute (KATECH)"
  }

  /* --- 학생 · 졸업생은 아래 형식으로 추가한다 --------------------------
   * interests 는 쉼표로 나누면 카드에 태그 한 개씩으로 나눠진다
  ,{
    id: "student-kim",
    role: "ms",
    name: "Hyun-Woo Kim (김현우)",
    title: "M.S. Candidate",
    photo: "images/members/kim.jpg",
    email: "", office: "",
    interests: "IPMSM Design",
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "alumni-lee",
    role: "alumni",
    name: "Ji-Won Lee (이지원)",
    title: "M.S.",
    photo: "",
    email: "", office: "", interests: "",
    education: [], career: [], activities: [], memberships: [], talks: [], scholar: "",
    gradYear: 2024,
    thesis: "매입형 영구자석 전동기의 토크 리플 저감 설계",
    currentPosition: "LG전자 선임연구원"
  }
  --------------------------------------------------------------------- */
];

/* people.html #current 에서 표시할 순서 (CLAUDE.md 7번: 박사 -> 석사 -> 학부) */
const MEMBER_ROLE_ORDER = ["postdoc", "phd", "ms", "undergrad"];

/* 역할별 표시 라벨 */
const MEMBER_ROLE_LABELS = {
  postdoc:   "Post-doctoral Researcher",
  phd:       "Ph.D. Candidate",
  ms:        "M.S. Candidate",
  undergrad: "Undergraduate Researcher"
};
