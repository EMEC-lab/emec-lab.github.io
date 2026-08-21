/* =========================================================================
 * data/publications.js
 * 논문 · 특허. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   type          journal | conference | patent
 *   year          숫자. 연도별 그룹핑과 정렬 기준
 *   authors       "H. Kim, M.-R. Park" 형태.
 *                 EMEC 구성원 이름은 render.js 가 MEMBERS 로 판별해 굵게 표시한다
 *   title         제목. doi 가 있으면 자동으로 링크가 된다
 *   venue         저널명 / 학회명
 *   detail        권·호·페이지 등
 *   doi           'https://doi.org/...' 또는 '10.xxxx/...'
 *   domestic      화면에 표시하지 않음. 학과 평가·통계용
 *   patentNo      patent 전용. 등록번호
 *   applicationNo patent 전용. 출원번호
 *   country       patent 전용
 *
 * 국제 학술지·학회는 영문 원문, 국내 학술대회는 국문 그대로 적는다. (CLAUDE.md 2번)
 *   예) venue: "대한전기학회 하계학술대회", title: "매입형 영구자석 전동기의 ..."
 *
 * TODO: 아래는 구조 확인용 자리표시자. 실제 실적으로 교체할 것.
 * ========================================================================= */

const PUBLICATIONS = [
  {
    type: "journal",
    year: 2026,
    authors: "H. Kim, M.-R. Park",
    title: "[Journal paper title — TBD]",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 62, no. 3, pp. 1-5",
    doi: "",
    domestic: false,
    patentNo: "",
    applicationNo: "",
    country: ""
  },
  {
    type: "conference",
    year: 2026,
    authors: "이지원, 박민로",
    title: "[국내 학술대회 발표 논문 제목 — 추후 확정]",
    venue: "대한전기학회 하계학술대회",
    detail: "",
    doi: "",
    domestic: true,
    patentNo: "",
    applicationNo: "",
    country: ""
  },
  {
    type: "patent",
    year: 2025,
    authors: "박민로, 김현우",
    title: "[특허 명칭 — 추후 확정]",
    venue: "",
    detail: "",
    doi: "",
    domestic: true,
    patentNo: "",
    applicationNo: "10-2025-0000000",
    country: "KR"
  }
];

/* publications.html 필터 버튼 순서 */
const PUBLICATION_TYPES = ["journal", "conference", "patent"];
