/* =========================================================================
 * data/projects.js
 * 연구과제. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   id             고유 식별자
 *   title          과제명. 국내 과제는 국문 그대로
 *   sponsor        { name, logo, url }  지원기관
 *                  logo 가 비면 기관명 텍스트로 대체 표시된다
 *   ministry       선택. 기본적으로 표시하지 않음
 *   startDate      'YYYY-MM-DD' 필수
 *   endDate        'YYYY-MM-DD' 필수
 *   role           PI | Co-I   지도교수 개인의 역할. 화면에 표시된다
 *   orgRole        선택. 주관 | 공동 | 위탁 (기관 단위). 화면 표시 안 함
 *   statusOverride null 이면 endDate 로 자동 판정. 조기종료·기간연장 때만 사용
 *   grantNo        화면 표시 안 함. 논문 사사 문구 작성용
 *   description    선택. 한두 문장
 *
 * ⚠ status 값을 데이터에 직접 적지 않는다.
 *   손으로 적으면 과제가 끝나도 갱신되지 않아 종료 과제가 계속 진행중으로 남는다.
 *   진행 상태는 js/render.js 의 getStatus() 가 endDate 로 매번 계산한다.
 *
 * TODO: 아래는 구조 확인용 자리표시자. 실제 과제로 교체할 것.
 * ========================================================================= */

const PROJECTS = [
  {
    id: "proj-2024-001",
    title: "[진행중 과제명 — 추후 확정]",
    sponsor: {
      name: "한국연구재단",
      logo: "",                          // images/sponsors/nrf.svg
      url: "https://www.nrf.re.kr"
    },
    ministry: "과학기술정보통신부",
    startDate: "2024-03-01",
    endDate:   "2027-02-28",
    role: "PI",
    orgRole: "주관",
    statusOverride: null,
    grantNo: "",
    description: ""
  },
  {
    id: "proj-2022-001",
    title: "[완료 과제명 — 추후 확정]",
    sponsor: {
      name: "산업통상자원부",
      logo: "",
      url: ""
    },
    ministry: "",
    startDate: "2022-06-01",
    endDate:   "2024-05-31",
    role: "Co-I",
    orgRole: "공동",
    statusOverride: null,
    grantNo: "",
    description: ""
  }
];

/* 화면에 표시할 역할 라벨. 코드에서 문자열을 직접 쓰지 않는다 */
const PROJECT_ROLES = {
  "PI":   "Principal Investigator",
  "Co-I": "Co-Investigator"
};

/* 각 그룹 내부 정렬. false 로 바꾸면 오래된 과제부터 표시된다 */
const SORT_DESC = true;
