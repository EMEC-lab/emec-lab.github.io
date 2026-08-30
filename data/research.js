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
    description: "Accurate analysis is the foundation of every design decision. We develop and combine analysis methods across the full spectrum of fidelity — from analytical models such as space-harmonic and equivalent-magnetic-circuit methods that capture machine behavior in seconds, to finite-element analysis that resolves local saturation and loss distribution in detail.\nBeyond electromagnetics, we extend the analysis to the physics that determine real-world performance: losses and electromagnetic forces are linked to thermal behavior through lumped-parameter thermal networks, and to vibration and noise through structural coupling. To make these analyses practical in design loops, we also study acceleration techniques — quasi-3D modeling, multi-fidelity methods, and transfer learning — that trade minimal accuracy for order-of-magnitude speed-ups.",
    image: "images/research/set-analysis-00.png",
    images: [
      { src: "images/research/set-analysis-01.png",
        caption: "Three-dimensional equivalent magnetic circuit with axial leakage paths" },
      { src: "images/research/set-analysis-02.png",
        caption: "Magnetic flux vector plot around spoke-type magnets" },
      { src: "images/research/set-analysis-03.png",
        caption: "Iron-loss density surfaces for two core materials" },
      { src: "images/research/set-analysis-04.png",
        caption: "Temperature distribution of a traction motor" },
      { src: "images/research/set-analysis-05.png",
        caption: "Measured noise waterfall of an EV traction motor" },
      { src: "images/research/set-analysis-06.png",
        caption: "Deep transfer learning pipeline linking 2-D and 3-D FEA" }
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
    description: "The right machine begins with the right topology. We design across the full family of rotating machines — surface-mounted and interior PM machines, induction and reluctance machines, inner- and outer-rotor structures, and radial- and axial-flux configurations — and extend to advanced concepts such as dual-rotor and dual-stator machines, variable flux machines, magnetic gears and magnetically geared machines, vernier machines, and brushless wound-field synchronous machines.\nA machine never runs alone — its real performance is decided together with the drive. We reflect the electrical dynamics of the controller from the earliest design stage: sinusoidal and square-wave drives, open-end winding, multi-phase and multiplex windings, winding changeover (Y-delta, series-parallel), and sensorless-oriented design, so that the machine and its inverter perform as one system.",
    image: "images/research/set-topology-00.png",
    images: [
      { src: "images/research/set-topology-01.png",
        caption: "Series-parallel winding changeover for low- and high-speed modes" },
      { src: "images/research/set-topology-02.png",
        caption: "Efficiency map extended by winding changeover (dual 3-phase WFSM)" },
      { src: "images/research/set-topology-03.png",
        caption: "Spoke-type flux-concentrating PMSM cross-section" },
      { src: "images/research/set-topology-04.jpg",
        caption: "Operating principle of a hybrid-flux machine" },
      { src: "images/research/set-topology-05.jpg",
        caption: "Design variables of a multi-layer ferrite IPMSM rotor" }
    ]
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
    description: "Performance on the drawing and performance off the production line are not the same thing. We design with the realities of materials and manufacturing built in — high slot-fill-factor windings, advanced magnets and electrical steels, cobalt-iron, SMC and grain-oriented steel — and with the processes that shape them, from potting with thermal-management materials to carbon-fiber sleeves for high-speed rotors.\nEvery material property and every dimension carries uncertainty. We quantify how these variations propagate to machine performance, and apply robust and tolerance design with multi-objective optimization algorithms to find designs that are not only optimal at the nominal point, but insensitive to the spread of real manufacturing.",
    image: "images/research/set-robust-00.png",
    images: [
      { src: "images/research/set-robust-01.png",
        caption: "Cogging torque distribution before and after robust design optimization" },
      { src: "images/research/set-robust-02.png",
        caption: "Bonded-magnet manufacturing chain from powder to magnetized rotor" },
      { src: "images/research/set-robust-03.png",
        caption: "Measured stator segment radii versus the design value" },
      { src: "images/research/set-robust-04.png",
        caption: "Irreversible demagnetization — operating points on the B-H curve" },
      { src: "images/research/set-robust-05.jpg",
        caption: "Welded versus bonded lamination stator prototypes" }
    ]
  },
  {
    id: "system-design",
    title: "System-level Design",
    summary: "Electric drive system modeling and motor design driven by system performance and driving profiles.",
    topics: [
      "Electric drive system modeling and system performance analysis — xEV, robots (humanoid, manipulator)",
      "Driving profile-based motor performance analysis and design"
    ],
    description: "A machine is judged in the system it drives — a traction motor in the vehicle, a joint motor in the robot. We model the complete electric drive system — battery, inverter, machine, reducer, and load — and analyze performance at the system level for applications ranging from xEV powertrains to humanoids and manipulators.\nRather than designing to a single rated point, we design against how the machine is actually used. Driving profiles and duty cycles are translated into distributions of operating points on the torque-speed plane, and the machine is shaped so that its efficiency and thermal capability sit where the energy is actually spent.",
    image: "images/research/set-system-00.png",
    images: [
      { src: "images/research/set-system-01.jpg",
        caption: "Drive-cycle operating points on the torque-speed plane" },
      { src: "images/research/set-system-02.png",
        caption: "Efficiency maps with cycle operating points, before and after improvement" },
      { src: "images/research/set-system-03.png",
        caption: "Vehicle simulation model from drive cycle to wheels" },
      { src: "images/research/set-system-04.jpg",
        caption: "Road-load force decomposition on a gradient" },
      { src: "images/research/set-system-05.jpg",
        caption: "Measured joint velocity and torque trajectories of a wearable robot" }
    ]
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
    description: "A good design method deserves to run without a person clicking through every step. We build in-house tools that automate the loop from parametric geometry and modeling, through batch analysis, to post-processing and evaluation — so a design space that once took weeks to explore can be swept overnight.\nThis automation is what lets the rest of our research scale. Optimization, uncertainty quantification, and system-level studies all stand on the ability to generate, analyze, and evaluate thousands of candidate designs automatically — and the same foundation grows into characteristic analysis programs that put our methods into the hands of engineers.",
    image: "images/research/set-automation-00.png",
    images: [
      { src: "images/research/set-automation-01.jpg",
        caption: "In-house electromagnetic field program suite" },
      { src: "images/research/set-automation-02.png",
        caption: "In-house solver — back-EMF, cogging, and dynamic characteristics" },
      { src: "images/research/set-automation-03.png",
        caption: "In-house mesh generator for machine cross-sections" },
      { src: "images/research/set-automation-04.png",
        caption: "Search algorithm for maximum-efficiency operating points" },
      { src: "images/research/set-automation-05.png",
        caption: "Prediction accuracy with and without transfer learning" }
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
    items: ["Compressor", "Washing machine", "Refrigerator", "Vacuum cleaner"]
  },
  {
    group: "Industrial & Power",
    items: ["Elevator", "Blower", "Generator", "Transformer"]
  }
];
