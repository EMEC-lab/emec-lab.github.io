/* =========================================================================
 * data/research.js
 * 연구분야. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   id          앵커·상세 페이지 주소로 쓰인다. 영문 소문자·하이픈
 *   title       카드 제목. 짧게
 *   summary     목록 카드용 두 줄 설명
 *   topics      세부 주제. 한 줄씩 문자열
 *   description 상세 페이지용 한 문단 이상. 줄바꿈은 \n
 *   image       대표 이미지
 *   images      상세 페이지에 더 붙일 이미지. 한 장씩 { src, caption }
 *   hidden      true 면 목록·상세·이동 버튼 어디에도 나오지 않는다.
 *               Overview 관계도(overview.svg)에는 그대로 남는다.
 *               내용이 준비되면 이 줄만 지우면 살아난다
 *
 * 큰 축은 둘이다 — 특성을 알아내는 해석(1~2)과 그 위에 세우는 설계(3~5).
 * 해석은 전자기 영역(1)과 그 결과가 열·구조로 건너가는 연성 영역(2)으로,
 * 설계는 무슨 형상으로(3) · 무엇으로 어떻게 만들지(4) · 어떻게 찾을지(5)로 갈린다.
 * 자동화(6)는 위 다섯을 모두 떠받치는 층이라 지금은 관계도에만 둔다.
 *
 * 응용 대상(자동차·로봇·가전 등)은 분야마다 겹치므로 아래 APPLICATIONS 로 뺀다.
 * ========================================================================= */

const RESEARCH = [
  {
    id: "em-analysis",
    title: "Electromagnetic Field & Characteristics Analysis",
    summary: "Field, loss, torque, and force estimation across the full range of fidelity — with the current harmonics the drive actually imposes.",
    topics: [
      "Electromagnetic field analysis — analytical methods (space harmonic, equivalent magnetic circuit) and finite element analysis",
      "Loss and efficiency estimation over the whole operating range",
      "Torque and electromagnetic excitation force",
      "Control scheme — sinusoidal and square-wave drive, current harmonics, current vector control, sensorless control"
    ],
    description: "목적에 맞는 정밀도로 자기장을 푼다 — 공간고조파·등가자기회로 같은 해석적 방법으로 수 초 만에, 유한요소해석으로 국부 포화와 손실 분포까지\n여기서 기기의 성적표가 나온다 — 전 운전영역의 손실과 효율, 평균 토크와 맥동, 소음과 수명을 좌우하는 전자기 가진력\n기기는 이상적인 전류원으로 돌지 않는다 — 정현파·구형파 구동과 그때의 전류 고조파, 전류벡터 제어, 센서리스 운전을 해석에 함께 넣는다",
    image: "images/research/analysis-overview.webp",
    images: [
      { src: "images/research/analysis-analytical.webp",
        caption: "Subdomain method and 2D/3D equivalent magnetic circuit, verified against finite element results" },
      { src: "images/research/analysis-loss.webp",
        caption: "Iron loss over the current harmonic spectrum, and AC ohmic loss in the conductor" }
    ]
  },
  {
    id: "coupled-field",
    title: "Coupled-field Analysis",
    summary: "Where the electromagnetic result crosses into other physics — losses into heat, excitation forces into stress, vibration, and noise.",
    topics: [
      "Thermal analysis — lumped-parameter thermal network (LPTN) and cooling methods",
      "Structural and NVH analysis — rotor stress, rotor dynamics"
    ],
    description: "전자기 해석은 시작일 뿐이다 — 손실은 열이 되고, 가진력은 응력·진동·소음이 된다\n열: 손실이 슬롯과 적층, 하우징을 거쳐 냉각재까지 가는 경로를 등가회로로 푼다. 냉각 방식은 실제 운전 조건으로 평가한다\n구조: 최고속도에서의 회전자 응력, 회전체 동역학과 위험속도, 가진력 차수가 고정자에 만드는 진동과 소음",
    image: "images/research/coupled-overview.webp",
    images: [
      { src: "images/research/coupled-thermal.webp",
        caption: "Lumped-parameter thermal network built from housing, coil-slot, and cooling-method models" },
      { src: "images/research/coupled-structural.webp",
        caption: "Rotor stress and rotor dynamics, electromagnetic excitation force, and the resulting structural vibration" }
    ]
  },
  {
    id: "machine-design",
    title: "Electric Machine Design & Technology",
    summary: "From the torque-speed requirement to a machine that can be built — topology and drive configuration, materials, and the manufacturing process.",
    topics: [
      "Design process — sizing, parameter and characteristics analysis, and multi-physics verification under mechanical and electrical constraints",
      "Machine topology — conventional machines (SPMSM, IPMSM, induction and reluctance machines, inner- and outer-rotor, radial- and axial-flux) and emerging machines (dual-rotor and dual-stator, variable-flux, magnetically geared, vernier, BL-WFSM)",
      "Control and winding topology — sinusoidal and square-wave drive, winding changeover (Y-delta, series-parallel), dual three-phase winding, open-end winding",
      "Manufacturing technology — high slot-fill-factor winding, core stacking method, segmented core, heat dissipation (potting)",
      "Materials technology — rare-earth-free machines, soft magnetic composite (SMC), next-generation electrical steel"
    ],
    description: "요구 조건에서 출발한다 — 토크·출력·속도 곡선, 그리고 시스템이 주는 공간·온도·전압·전류 한계\n극·슬롯 조합 → 2차원 형상 → 축장 → 권선 턴수 순으로 정하고, 매 단계를 한계와 대조한 뒤 특성 해석으로 성능을 확인한다\n쓸 수 있는 형상이 설계의 폭을 정한다 — 통상형 기기부터 이중회전자·이중고정자, 가변자속, 자기기어, 버니어, BL-WFSM 까지\n권선과 구동 방식도 형상이다 — 개방권선과 이중 3상은 같은 철심으로 인버터가 할 수 있는 일을 바꾸고, 직렬-병렬 절체는 적층 한 장 없이 토크-속도 영역을 넓힌다\n재료와 공정은 나중에 따지는 제약이 아니라 설계 변수다 — 헤어핀 권선, 분할·접착·용접 코어, 포팅, 이상 전기강판, SMC, 본드자석, 희토류 프리 자석",
    image: "images/research/design-overview.webp",
    images: [
      { src: "images/research/design-topology.webp",
        caption: "Control and machine topology — drive scheme and winding configuration, and machines from the conventional family to emerging concepts" },
      { src: "images/research/design-material.webp",
        caption: "Manufacturing and material technology — core and winding processes, and next-generation magnetic materials" }
    ]
  },
  {
    id: "design-methods",
    title: "System-aware & Data-driven Design",
    summary: "How the design is found — optimization on multi-fidelity surrogate models, and machine design driven by the system it serves.",
    topics: [
      "Multi-objective optimization",
      "Multi-fidelity surrogate model — multi-fidelity Gaussian process regression, deep transfer learning",
      "Uncertainty analysis — geometric tolerance, material property variation",
      "Robust design optimization",
      "System-aware machine design — operating-profile-based efficiency design",
      "Thermal management — derating strategy, thermal margin estimation"
    ],
    description: "유한요소해석 한 번이 비싸다 — 값싼 저정확도 결과 다수와 비싼 고정확도 결과 소수를 함께 배우는 다중 정확도 대체모델을 세운다 (다중 정확도 가우시안 과정 회귀, 심층 전이학습)\n탐색은 해석기가 아니라 대체모델 위에서 한다. 강건 최적화도 이 위에서만 감당된다 — 후보 하나가 아니라 그 주변의 분포를 평가해야 하기 때문이다\n공차와 재료 물성의 편차가 토크 맥동·코깅·효율로 번지는 경로를 추적하고, 도면 위 한 점이 아니라 양산될 분포로 설계를 판정한다\n기기는 그것이 구동하는 시스템 안에서 평가된다 — 차량의 견인전동기, 로봇의 관절전동기. 운전 프로파일을 토크-속도 평면의 분포로 옮기고, 에너지가 실제로 쓰이는 자리에 효율을 맞춘다\n같은 프로파일이 열 문제도 정한다 — 디레이팅 전략과 열 여유를 기기와 함께 설계한다",
    image: "images/research/method-overview.webp",
    images: [
      { src: "images/research/method-system.webp",
        caption: "System model-based design — e-powertrain analysis over a driving cycle, and actuator sizing for robot joints" },
      { src: "images/research/method-datadriven.webp",
        caption: "Multi-fidelity surrogate model-based optimization, and robust design optimization under variable uncertainty" }
    ]
  },
  {
    /* 아직 내용·그림을 준비하지 못해 감춰 둔다.
       Overview 관계도(overview.svg)에는 하단 띠로 남아 있다.
       준비되면 아래 hidden 줄만 지우면 목록에 다시 나온다 */
    hidden: true,
    id: "automation",
    title: "Design Automation & In-house Software",
    summary: "In-house tools that run the loop from parametric modeling through batch analysis to evaluation.",
    topics: [
      "Modeling automation — parametric geometry, mesh generation",
      "Design automation — batch analysis and evaluation",
      "In-house characteristic analysis programs"
    ],
    description: "좋은 설계 방법이라도 사람이 매 단계를 눌러야 하면 규모가 나오지 않는다\n파라메트릭 형상과 메시 생성부터 일괄 해석, 후처리와 평가까지 하나의 흐름으로 자동화한다\n이 자동화가 나머지 연구의 규모를 정한다 — 최적화, 불확실성 정량화, 시스템 단위 검토 모두 수천 개 후보를 자동으로 돌릴 수 있어야 성립한다",
    image: "images/research/set-automation-00.png",
    images: [
      { src: "images/research/set-automation-01.jpg",
        caption: "In-house electromagnetic field program suite" },
      { src: "images/research/set-automation-03.png",
        caption: "In-house mesh generator for machine cross-sections" },
      { src: "images/research/set-automation-02.png",
        caption: "In-house solver — back-EMF, cogging, and dynamic characteristics" },
      { src: "images/research/set-automation-04.png",
        caption: "Search algorithm for maximum-efficiency operating points" }
    ]
  }
];

/* =========================================================================
 * 응용 대상 — 방법론과 직교하는 축이라 분야 카드에 섞지 않는다.
 * research.html #applications 에 묶음별 태그로 나온다.
 * ========================================================================= */
const APPLICATIONS = [
  {
    group: "Mobility",
    items: ["Automotive", "Air mobility", "Electric propulsion ship"]
  },
  {
    group: "Robotics",
    items: ["Humanoid", "Manipulator", "Wearable robot", "Mobile robot"]
  },
  {
    group: "Home Appliances",
    items: ["Compressor motor", "Direct-drive motor", "High-speed motor"]
  },
  {
    group: "Power Systems",
    items: ["Generator", "Power transformer", "High-frequency transformer"]
  }
];
