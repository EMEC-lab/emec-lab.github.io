/* =========================================================================
 * data/research.js
 * 연구분야 3~5개. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   id          research.html 안의 앵커로 쓰인다. 영문 소문자·하이픈
 *   title       카드 제목. 짧게
 *   summary     HOME 카드용 두 줄 설명
 *   description research.html 용 한 문단 이상. 줄바꿈은 \n
 *   image       'images/research/xxx.jpg'  대표 이미지
 *               자속밀도 분포도, 모터 단면 형상 등 해석 결과 이미지 권장
 *
 * 아래 4개 분야는 실적정리_20260428.xlsx 의 Research Interests 8개 항목을
 * 묶어 구성한 안이다. 항목 자체는 원문 그대로이며, 묶는 방식과 상세 설명은
 * 확인 후 조정할 것.
 *
 *   Analysis and design of electric machines            -> areas[0]
 *   Model-based electric machine design                 -> areas[0]
 *   Multi-physics analysis of electric machines         -> areas[1]
 *   Thermal management of e-powertrain system           -> areas[1]
 *   AI-assisted acceleration of designing of e-machines -> areas[2]
 *   Design automation with commercial software          -> areas[2]
 *   Design of 1-D electrified propulsion system         -> areas[3]
 *   Integrated inverter-motor system analysis           -> areas[3]
 * ========================================================================= */

const RESEARCH = [
  {
    id: "machine-design",
    title: "Electric Machine Analysis & Design",
    summary: "Analysis and design of electric machines, and model-based electric machine design.",
    description: "[한 문단 설명 — 추후 확정]",
    image: ""
  },
  {
    id: "multi-physics",
    title: "Multi-physics Analysis",
    summary: "Multi-physics analysis of electric machines and thermal management of e-powertrain systems.",
    description: "[한 문단 설명 — 추후 확정]",
    image: ""
  },
  {
    id: "ai-design",
    title: "AI-assisted & Automated Design",
    summary: "AI-assisted acceleration of electric machine design and design automation with commercial software.",
    description: "[한 문단 설명 — 추후 확정]",
    image: ""
  },
  {
    id: "propulsion-system",
    title: "Electrified Propulsion System",
    summary: "Design of 1-D electrified propulsion systems and integrated inverter-motor system analysis.",
    description: "[한 문단 설명 — 추후 확정]",
    image: ""
  }
];
