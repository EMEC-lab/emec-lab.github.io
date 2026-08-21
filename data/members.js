/* =========================================================================
 * data/members.js
 * 구성원. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   role   professor | postdoc | phd | ms | undergrad | alumni
 *   name   영문 + 괄호 국문 병기.  예: "Min-Ro Park (박민로)"
 *   email  SITE.email 과 같으면 비워둘 것 (자동으로 SITE 값을 쓴다)
 *   office 비우면 SITE.address.short 를 쓴다
 *
 *   education / career / scholar : 교수 전용
 *   gradYear / thesis / currentPosition : 졸업생 전용
 *
 * 국내 학회·직책은 국문 그대로 적는다. 억지로 영역하지 않는다. (CLAUDE.md 2번)
 * ========================================================================= */

const MEMBERS = [
  {
    id: "prof-park",
    role: "professor",
    name: "Min-Ro Park (박민로)",
    title: "Professor",
    photo: "images/members/park.jpg",
    email: "",
    office: "",
    interests: "Electric Machine Design, Multiphysics Analysis, Optimal Design",

    education: [
      "[학위 이력 — 추후 확정]"
    ],
    career: [
      "[경력 — 추후 확정]"
    ],
    scholar: "",

    gradYear: null,
    thesis: "",
    currentPosition: ""
  }

  /* --- 학생·졸업생은 아래 형식으로 추가한다 ----------------------------
  ,{
    id: "student-kim",
    role: "ms",
    name: "Hyun-Woo Kim (김현우)",
    title: "M.S. Student",
    photo: "images/members/kim.jpg",
    email: "",
    office: "",
    interests: "IPMSM Design",
    education: [], career: [], scholar: "",
    gradYear: null, thesis: "", currentPosition: ""
  },
  {
    id: "alumni-lee",
    role: "alumni",
    name: "Ji-Won Lee (이지원)",
    title: "M.S.",
    photo: "",
    email: "", office: "", interests: "",
    education: [], career: [], scholar: "",
    gradYear: 2024,
    thesis: "매입형 영구자석 전동기의 토크 리플 저감 설계",
    currentPosition: "LG전자 선임연구원"
  }
  --------------------------------------------------------------------- */
];

/* people.html #current 에서 표시할 순서 (CLAUDE.md 7번: 박사 → 석사 → 학부) */
const MEMBER_ROLE_ORDER = ["postdoc", "phd", "ms", "undergrad"];

/* 역할별 표시 라벨 */
const MEMBER_ROLE_LABELS = {
  postdoc:   "Post-doctoral Researcher",
  phd:       "Ph.D. Student",
  ms:        "M.S. Student",
  undergrad: "Undergraduate Researcher"
};
