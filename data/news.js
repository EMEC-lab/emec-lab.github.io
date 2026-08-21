/* =========================================================================
 * data/news.js
 * 소식 피드. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   date     'YYYY-MM-DD'  정렬 기준(최신순). 연도별 구분선에도 쓰인다
 *   category paper | award | member | project | etc
 *            화면에 표시하지 않아도 되지만 반드시 기록한다.
 *            수상이 쌓이면 category === "award" 만 걸러 별도 페이지를 만들 수 있다
 *   text     1~3문장. 국내 소식은 국문, 국제 논문 게재는 영문 등 상황에 맞게
 *   link     선택. 있으면 문장이 링크가 된다
 *   image    선택. 있으면 좌측에 작은 썸네일
 * ========================================================================= */

const NEWS = [
  {
    date: "2026-08-15",
    category: "etc",
    text: "[소식 본문 — 추후 확정]",
    link: "",
    image: ""
  }
];

/* =========================================================================
 * 수상 실적 — 실적정리_20260428.xlsx 'Research Experience' 시트 Award 항목
 *
 * ⚠ 엑셀에는 연도만 있고 정확한 수상 일자가 없다.
 *   news 피드는 'YYYY-MM-DD' 를 요구하므로, 날짜를 임의로 지어내지 않고
 *   아래에 주석으로 두었다. 각 항목의 date 를 채운 뒤 위 NEWS 배열로 옮길 것.
 *
 *   {
 *     date: "2023-__-__",
 *     category: "award",
 *     text: "Best Paper Award, IEEE Power & Energy Society Transactions on Energy Conversion",
 *     link: "", image: ""
 *   },
 *   {
 *     date: "2025-__-__",
 *     category: "award",
 *     text: "Prize Winner, IEEE Compumag 2025 Galileo Ferraris Contest",
 *     link: "", image: ""
 *   },
 *   {
 *     date: "2025-__-__",
 *     category: "award",
 *     text: "우수논문상, 대한전기학회 전기기기 및 에너지변환시스템 부문 2025년도 추계학술대회",
 *     link: "", image: ""
 *   }
 * ========================================================================= */
