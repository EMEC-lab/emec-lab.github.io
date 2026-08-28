/* =========================================================================
 * data/research.js
 * 연구분야 3~5개. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   id          research.html 안의 앵커로 쓰인다. 영문 소문자·하이픈
 *   title       카드 제목. 짧게
 *   summary     HOME 카드용 두 줄 설명
 *   topics      세부 주제. 한 줄씩 문자열 — 카드 안에 목록으로 나온다
 *   description research.html 용 한 문단 이상. 줄바꿈은 \n
 *   image       'images/research/xxx.jpg'  대표 이미지
 *               자속밀도 분포도, 모터 단면 형상 등 해석 결과 이미지 권장
 *   images      상세 페이지에 더 붙일 이미지. 한 장씩 { src, caption }
 *               비워 두면 대표 이미지 하나만 나온다
 *
 * summary 는 목록 카드용, description 과 images 는 상세 페이지용이다.
 * 상세는 research-area.html#<id> 로 열린다
 *
 * 다섯 분야는 방법론 축이다. 응용 대상(xEV·로봇·가전 등)은 분야마다
 * 겹치므로 여기 넣지 않고 아래 APPLICATIONS 로 따로 보여 준다.
 * ========================================================================= */

const RESEARCH = [
  {
    id: "analysis-methods",
    title: "Analysis Methods",
    summary: "Electromagnetic, thermal, and multi-physics analysis of electric machines, from analytical models to FEA, with acceleration techniques.",
    topics: [
      "Electromagnetic analysis — analytical methods (space harmonic, equivalent magnetic circuit) and FEA",
      "Loss analysis and electromagnetic force analysis linked to thermal and NVH studies",
      "LPTN-based thermal analysis",
      "Analysis acceleration — Quasi-3D modeling, multi-fidelity and transfer learning methods",
      "Multi-physics coupling — vibration and noise, thermal, structural analysis"
    ],
    description: "[한 문단 설명 — 추후 확정]",
    image: "images/research/area-analysis-methods.svg",
    images: [
      { src: "images/research/analysis-01-fea.svg",
        caption: "Flux density distribution and finite-element mesh of an 8-pole IPMSM" },
      { src: "images/research/analysis-02-loss.svg",
        caption: "Loss separation across operating points — copper, iron, PM eddy-current, and mechanical losses" },
      { src: "images/research/analysis-03-lptn.svg",
        caption: "Lumped-parameter thermal network and temperature-rise validation against measurement" },
      { src: "images/research/analysis-04-accel.svg",
        caption: "Quasi-3D modeling and multi-fidelity correlation for analysis acceleration" },
      { src: "images/research/analysis-05-nvh.svg",
        caption: "Stator vibration modes and electromagnetic noise spectrum" }
    ]
  },
  {
    id: "topology-design",
    title: "Topology & Drive-aware Design",
    summary: "Design across machine topologies and drive schemes, reflecting harmonics and electrical dynamics of the controller.",
    topics: [
      "Machine topologies — SPMSM, IPMSM, induction and reluctance machines, inner/outer rotor, radial/axial flux",
      "Advanced topologies — dual-rotor and dual-stator machines, variable flux machines, magnetic gears and magnetically geared machines, vernier machines, brushless wound-field synchronous machines",
      "Drive-aware design — sinusoidal/square-wave drive, open-end winding, multi-phase and multiplex windings",
      "Winding changeover (Y-delta, series-parallel) and sensorless-oriented design"
    ],
    description: "[한 문단 설명 — 추후 확정]",
    image: "",
    images: []
  },
  {
    id: "robust-design",
    title: "Manufacturing-aware & Robust Design",
    summary: "Design that embraces materials, manufacturing processes, and uncertainty — from tolerance analysis to robust optimization.",
    topics: [
      "Design with advanced materials — high slot fill factor coils, magnets, electrical steel, cobalt-iron, SMC, grain-oriented steel",
      "Process-aware design — potting (thermal management materials), carbon fiber sleeves",
      "Uncertainty analysis of material properties and manufacturing tolerances",
      "Robust optimal design, tolerance design, and multi-objective optimization algorithms"
    ],
    description: "[한 문단 설명 — 추후 확정]",
    image: "",
    images: []
  },
  {
    id: "system-design",
    title: "System-level Design",
    summary: "Electric drive system modeling and motor design driven by system performance and driving profiles.",
    topics: [
      "Electric drive system modeling and system performance analysis — xEV, robots (humanoid, manipulator)",
      "Driving profile-based motor performance analysis and design"
    ],
    description: "[한 문단 설명 — 추후 확정]",
    image: "",
    images: []
  },
  {
    id: "design-automation",
    title: "Design Automation & Software",
    summary: "In-house tools for modeling automation, design automation, and characteristic analysis.",
    topics: [
      "Modeling automation",
      "Design automation",
      "Characteristic analysis programs"
    ],
    description: "[한 문단 설명 — 추후 확정]",
    image: "",
    images: []
  }
];

/* =========================================================================
 * 응용 대상 — 방법론과 직교하는 축이라 분야 카드에 섞지 않는다.
 * research.html #applications 에 묶음별 태그로 나온다.
 * ========================================================================= */
const APPLICATIONS = [
  {
    group: "Mobility",
    items: [
      "xEV traction", "Compressor", "EPS", "Brake", "ISG", "Turbocharger",
      "UAM", "Electric propulsion ship"
    ]
  },
  {
    group: "Robotics",
    items: ["Humanoid", "Manipulator", "Wearable robot", "Mobile robot"]
  },
  {
    group: "Home Appliances",
    items: ["Compressor", "Washing machine", "Refrigerator", "Vacuum cleaner"]
  },
  {
    group: "Industrial & Power",
    items: ["Elevator", "Blower", "Generator", "Transformer"]
  }
];
