/* =========================================================================
 * data/projects.js
 * 연구과제. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   id             고유 식별자
 *   title          과제명
 *   sponsor        { name, logo, url }  logo 가 비면 기관명 텍스트로 표시된다
 *   ministry       선택. 기본적으로 표시하지 않음
 *   startDate      'YYYY-MM-DD' 필수
 *   endDate        'YYYY-MM-DD' 필수
 *   role           PI | Co-I | Advisor  지도교수 개인의 역할
 *   program        선택. 세부 사업명. 예 "석사과정생연구장려금지원사업"
 *   pi             선택. 지도교수가 아닌 사람이 연구책임자일 때 그 이름
 *                  학생이 책임자이고 교수가 지도하는 과제에 쓴다 (role: "Advisor")
 *   orgRole        선택. 주관 | 공동 | 위탁 (기관 단위). 화면 표시 안 함
 *   statusOverride null 이면 endDate 로 자동 판정
 *   grantNo        화면 표시 안 함. 논문 사사 문구 작성용
 *   description    선택. 한두 문장
 *
 * ⚠ status 값을 데이터에 직접 적지 않는다.
 *   진행 상태는 js/render.js 의 getStatus() 가 endDate 로 매번 계산한다.
 *
 * 출처: 실적정리_20260428.xlsx 'Project' 시트 중 순천향대 부임(2022.03) 이후 과제.
 * 그 이전 참여과제(한양대·한국로봇융합연구원 시절)는 연구실 과제가 아니므로 제외했다.
 * ========================================================================= */

const PROJECTS = [
  {
    id: "proj-2022-01",
    title: "구동 모터와 인버터의 온도 특성을 고려한 전기자동차 구동 시스템 모델링 및 제어",
    sponsor: { name: "한국연구재단", logo: "", url: "" },
    ministry: "과학기술정보통신부",
    startDate: "2022-09-01", endDate: "2025-02-28",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2022-02",
    title: "전기자동차 에너지 효율 예측을 위한 구동 모터와 인버터의 연성 전자기 손실해석",
    sponsor: { name: "순천향대학교", logo: "", url: "" },
    ministry: "",
    startDate: "2022-09-01", endDate: "2023-08-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2023-03",
    title: "EV구동모터 고출력을 위한 이중 여자형 모터개발",
    sponsor: { name: "현대자동차", logo: "", url: "" },
    ministry: "",
    startDate: "2023-03-01", endDate: "2024-05-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2023-04",
    title: "스마트 트레이닝 머신용 모터 설계 및 제어",
    sponsor: { name: "(주)위스피온", logo: "", url: "" },
    ministry: "",
    startDate: "2023-12-11", endDate: "2024-06-30",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2024-05",
    title: "열등가회로 기반 자속집중형 동기전동기 분석",
    sponsor: { name: "한국전자기술연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2024-07-01", endDate: "2024-10-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2024-06",
    title: "전기자동차의 동적 주행 특성을 고려한 구동 모터의 전자기-열 특성 및 에너지 효율 분석",
    sponsor: { name: "한국연구재단", logo: "", url: "" },
    ministry: "과학기술정보통신부",
    program: "석사과정생연구장려금지원사업",
    pi: "Yong-Min Lee, M.S. candidate",
    startDate: "2024-07-01", endDate: "2025-06-30",
    role: "Advisor", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2024-07",
    title: "영구자석 동기전동기의 제작 공차를 고려한 해석적 방법 및 강건 최적 설계 프로세스",
    sponsor: { name: "한국연구재단", logo: "", url: "" },
    ministry: "과학기술정보통신부",
    program: "석사과정생연구장려금지원사업",
    pi: "Dong-Hoon Ko, M.S. candidate",
    startDate: "2024-09-01", endDate: "2025-08-31",
    role: "Advisor", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-08",
    title: "Deep Transfer Learning 적용 해석 정합성 향상 기반 CFSM 설계",
    sponsor: { name: "한국전자기술연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2025-03-03", endDate: "2025-10-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-09",
    title: "0.27t 전기강판 적용 고속 모터 전자기 해석",
    sponsor: { name: "(유)아르젠터보", logo: "", url: "" },
    ministry: "",
    startDate: "2025-02-20", endDate: "2025-12-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-10",
    title: "미래 라이프스타일을 고려한 X care 컨셉 기반 지능형 모빌리티(제품 및 서비스) 플랫폼 로봇 디자인 개발",
    sponsor: { name: "한국로봇융합연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2025-07-01", endDate: "2026-12-31",
    role: "Co-I", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-11",
    title: "해석적 방법 기반 자속집중형 모터 특성 분석",
    sponsor: { name: "한국전자기술연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2025-07-23", endDate: "2025-10-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-12",
    title: "다중물리 연성 해석을 통한 BLAC 및 BLDC 모터의 전자기-진동 특성 분석",
    sponsor: { name: "한국연구재단", logo: "", url: "" },
    ministry: "과학기술정보통신부",
    program: "석사과정생연구장려금지원사업",
    pi: "Hye-Seong Kim, M.S. candidate",
    startDate: "2025-09-01", endDate: "2026-08-31",
    role: "Advisor", orgRole: "",
    statusOverride: "completed",
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-13",
    title: "고속 고출력 구동 모터의 회전자 구조 안정성 분석",
    sponsor: { name: "한국자동차연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2025-09-09", endDate: "2025-11-30",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-14",
    title: "고출력 모터 설계를 위한 코발트 강판 자성 특성 분석(자성데이터 측정)",
    sponsor: { name: "한국생산기술연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2025-09-22", endDate: "2025-12-22",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-15",
    title: "AI 서버 대용량 전력제어용 초고밀도 전력 모듈 개발",
    sponsor: { name: "한국산업기술기획평가원", logo: "", url: "" },
    ministry: "산업통상부",
    startDate: "2025-10-01", endDate: "2028-12-31",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2025-16",
    title: "아마추어 코어 적층 불량 개선",
    sponsor: { name: "(주)승정", logo: "", url: "" },
    ministry: "",
    startDate: "2025-12-04", endDate: "2026-02-28",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2026-17",
    title: "상반회전 전기추진을 위한 이중회전자 모터 토폴로지 분석 및 고성능 설계-검증 프레임워크",
    sponsor: { name: "한국연구재단", logo: "", url: "" },
    ministry: "과학기술정보통신부",
    startDate: "2026-03-01", endDate: "2029-02-28",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2026-18",
    title: "자속집중형 영구자석 동기모터의 전자기 가진력 분석 기반 진동 저감 설계",
    sponsor: { name: "한국전자기술연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2026-04-01", endDate: "2026-11-02",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2026-19",
    title: "5-in-1 EPT 통합시스템용 구동모터의 PWM 전류 고조파 반영 손실해석 프로세스 개발",
    sponsor: { name: "한국자동차연구원", logo: "", url: "" },
    ministry: "",
    startDate: "2026-04-01", endDate: "2026-11-30",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  },
  {
    id: "proj-2026-20",
    title: "운전영역 기반 최적 전류 제어 및 고조파 손실저감을 통한 고효율·고출력 탈희토류 EV 구동모터 개발",
    sponsor: { name: "충남RISE센터", logo: "", url: "" },
    ministry: "교육부",
    startDate: "2026-08-03", endDate: "2026-12-04",
    role: "PI", orgRole: "",
    statusOverride: null,
    grantNo: "", description: ""
  }
];

/* 화면에 표시할 역할 라벨. 코드에서 문자열을 직접 쓰지 않는다 */
const PROJECT_ROLES = {
  "PI":      "Principal Investigator",
  "Co-I":    "Co-Investigator",
  "Advisor": "Academic Advisor"
};

/* 각 그룹 내부 정렬. false 로 바꾸면 오래된 과제부터 표시된다 */
const SORT_DESC = true;
