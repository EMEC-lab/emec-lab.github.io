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
    description: "Every design decision rests on knowing what the machine will actually do. We develop and combine analysis methods across the full spectrum of fidelity — from analytical models such as space-harmonic and equivalent-magnetic-circuit methods that capture machine behavior in seconds, to finite element analysis that resolves local saturation and loss distribution in detail.\nFrom the field we estimate what the machine is judged by: losses and efficiency over the whole operating range, average torque and its ripple, and the electromagnetic excitation forces that later decide how the machine sounds and how long it survives.\nA machine is also never driven by an ideal current source. We reflect the control scheme in the analysis itself — sinusoidal and square-wave drive and the current harmonics they impose, current vector control, and sensorless operation — so that the estimated characteristics are the ones the machine will show on the bench, not on paper.",
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
    description: "The electromagnetic field is where the analysis starts, not where it ends. Losses become heat, and electromagnetic excitation forces become stress, deflection, and sound. A machine that is efficient but runs too hot, or quiet on the test bench but structurally marginal at overspeed, is not a finished design.\nOn the thermal side we build lumped-parameter thermal networks that resolve the path from copper and iron losses through the slot, the stack, and the housing to the coolant, and evaluate cooling methods against the duty the machine will actually see.\nOn the mechanical side we carry the same electromagnetic result into rotor stress at maximum speed, into rotor dynamics and critical speeds, and into the vibration and noise that the excitation force orders produce in the stator structure.",
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
    description: "A machine design begins with a requirement, not a cross-section. From the torque-speed-power envelope the application demands, and the spatial, thermal, voltage, and current limits the system imposes, we fix the pole-slot combination, the two-dimensional geometry, the axial length, and the number of armature turns — each step checked against those limits before the next one is taken — and carry the result through parameter and characteristics analysis to a performance the machine can be judged by.\nWhat that design can become depends on the topology available to it. We work across the conventional family of rotating machines — surface-mounted and interior PM machines, induction and reluctance machines, inner- and outer-rotor structures, and radial- and axial-flux configurations — and across emerging concepts such as dual-rotor and dual-stator machines, variable-flux machines, magnetically geared and vernier machines, and the brushless wound-field synchronous machine. The winding and the way it is driven form a topology of their own: open-end and dual three-phase windings change what the converter can do with the same iron, and winding changeover between series and parallel reshapes the torque-speed envelope without adding a single lamination.\nAnd the machine has to be built. We treat materials and manufacturing as design variables rather than downstream constraints — hairpin and other high slot-fill-factor windings, segmented, bonded, and welded cores, potting for heat dissipation, and materials such as dual-phase electrical steel, soft magnetic composites, bonded magnets, and rare-earth-free permanent magnets. Each opens design space that conventional laminated steel and sintered magnets cannot reach, and each brings magnetic, thermal, and mechanical limits that have to be decided while the geometry is still open.",
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
    description: "Two questions decide how a design is found: how to search the space, and what to judge the result against.\nOn the search side, a single finite element evaluation is expensive, so we build multi-fidelity surrogate models that learn from a large body of cheap low-fidelity results and a handful of expensive high-fidelity ones — multi-fidelity Gaussian process regression and deep transfer learning — and run multi-objective optimization on the surrogate instead of the solver. This is also what makes robust design optimization affordable. Every dimension and every material property arrives with a spread, so we quantify geometric tolerance and material property variation, trace how they propagate to torque ripple, cogging, and efficiency, and search for a design judged by that distribution rather than by its nominal point alone.\nOn the judging side, a machine is judged in the system it drives — a traction motor in the vehicle, a joint motor in the robot. We model the complete electric drive system and translate operating profiles into distributions of points on the torque-speed plane, then shape the machine so its efficiency sits where the energy is actually spent. The same profile decides the thermal question, so derating strategy and thermal margin are designed together with the machine rather than checked afterwards.",
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
    description: "A good design method deserves to run without a person clicking through every step. We build in-house tools that automate the loop from parametric geometry and meshing, through batch analysis, to post-processing and evaluation — so a design space that once took weeks to explore can be swept overnight.\nThis automation is what lets the rest of our research scale. Optimization, uncertainty quantification, and system-level studies all stand on the ability to generate, analyze, and evaluate thousands of candidate designs automatically.",
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
