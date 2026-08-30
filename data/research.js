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
 * 큰 축은 둘이다 — 특성을 알아내는 해석(1)과, 그 위에 세우는 설계(2~5).
 * 설계는 다시 무엇을 만들지(형상·재료)와 어떻게 찾을지(시스템·데이터)로 갈린다.
 * 응용 대상(자동차·로봇·가전 등)은 분야마다 겹치므로 여기 넣지 않고
 * 아래 APPLICATIONS 로 따로 보여 준다.
 * ========================================================================= */

const RESEARCH = [
  {
    id: "analysis",
    title: "Analysis & Characteristics Estimation",
    summary: "Electromagnetic, thermal, structural, and NVH analysis of electric machines, including the current harmonics the drive actually imposes.",
    topics: [
      "Electromagnetic field analysis — analytical methods (space harmonic, equivalent magnetic circuit) and finite element analysis",
      "Loss and efficiency estimation over the whole operating range",
      "Torque and excitation force — cogging torque, torque ripple, radial force",
      "Thermal analysis — lumped-parameter thermal network (LPTN) and cooling methods",
      "Structural and NVH — rotor stress, rotor dynamics, vibration and noise",
      "Control scheme in analysis — sinusoidal and square-wave drive with current harmonics, current vector control, sensorless control"
    ],
    description: "Every design decision rests on knowing what the machine will actually do. We develop and combine analysis methods across the full spectrum of fidelity — from analytical models such as space-harmonic and equivalent-magnetic-circuit methods that capture machine behavior in seconds, to finite element analysis that resolves local saturation and loss distribution in detail.\nThe electromagnetic field is only the starting point. Losses and electromagnetic forces are carried into thermal behavior through lumped-parameter thermal networks and cooling models, and into structural response through rotor stress, rotor dynamics, and vibration and noise analysis. The four physics are estimated together, because a design that is efficient but too hot, or quiet but structurally marginal, is not a design.\nA machine is also never driven by an ideal current source. We reflect the control scheme in the analysis itself — sinusoidal and square-wave drive and the current harmonics they impose, current vector control, and sensorless operation — so that the estimated characteristics are the ones the machine will show on the bench, not on paper.",
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
        caption: "Measured noise waterfall of an EV traction motor" }
    ]
  },
  {
    id: "topology",
    title: "Machine & Winding Topology",
    summary: "Design across the family of rotating machines and their winding configurations, from conventional PM machines to magnetically geared and wound-field concepts.",
    topics: [
      "Machine topologies — SPMSM, IPMSM, induction and reluctance machines, inner/outer rotor, radial/axial flux",
      "Advanced topologies — dual-rotor and dual-stator machines, variable flux machines, magnetic gears and magnetically geared machines, vernier machines, brushless wound-field synchronous machines",
      "Winding topologies — open-end winding, multiplex winding",
      "Winding changeover (Y-delta, series-parallel) for an extended operating range"
    ],
    description: "The right machine begins with the right topology. We design across the full family of rotating machines — surface-mounted and interior PM machines, induction and reluctance machines, inner- and outer-rotor structures, and radial- and axial-flux configurations — and extend to advanced concepts such as dual-rotor and dual-stator machines, variable flux machines, magnetic gears and magnetically geared machines, vernier machines, and brushless wound-field synchronous machines.\nThe winding is a topology of its own. Open-end and multiplex windings change what the inverter can do with the same iron, and winding changeover between Y and delta or between series and parallel reshapes the torque-speed envelope without adding a single lamination. Choosing the machine and the winding together is what turns a good cross-section into a machine that performs across its whole operating range.",
    image: "images/research/set-topology-00.png",
    images: [
      { src: "images/research/set-topology-03.png",
        caption: "Spoke-type flux-concentrating PMSM cross-section" },
      { src: "images/research/set-topology-04.jpg",
        caption: "Operating principle of a hybrid-flux machine" },
      { src: "images/research/set-topology-05.jpg",
        caption: "Design variables of a multi-layer ferrite IPMSM rotor" },
      { src: "images/research/set-topology-01.png",
        caption: "Series-parallel winding changeover for low- and high-speed modes" },
      { src: "images/research/set-topology-02.png",
        caption: "Efficiency map extended by winding changeover (dual 3-phase WFSM)" }
    ]
  },
  {
    id: "materials",
    title: "Materials & Manufacturing",
    summary: "Design that carries materials, manufacturing processes, and their unavoidable variation into the machine from the first sketch.",
    topics: [
      "Manufacturing technology — high slot fill factor winding, core stacking methods, segmented core, heat dissipation (potting)",
      "Material technology — rare-earth free machines, soft magnetic composites, next-generation electrical steel",
      "Uncertainty analysis — geometric tolerance and material property variation"
    ],
    description: "Performance on the drawing and performance off the production line are not the same thing. We treat manufacturing as a design variable rather than a downstream constraint — high slot-fill-factor windings, core stacking methods, segmented cores, and potting for heat dissipation each change what the machine can be, and each has to be decided while the geometry is still open.\nMaterials carry the same weight. Rare-earth free machines, soft magnetic composites, and next-generation electrical steels open design space that conventional laminated silicon steel and sintered magnets cannot reach, but they bring their own magnetic, thermal, and mechanical limits.\nAnd every dimension and every material property arrives with a spread. We quantify geometric tolerance and material property variation and trace how they propagate to torque ripple, cogging, and efficiency — so that the machine is judged by the distribution it will actually be manufactured into, not by its nominal point alone.",
    image: "images/research/set-robust-00.png",
    images: [
      { src: "images/research/set-robust-02.png",
        caption: "Bonded-magnet manufacturing chain from powder to magnetized rotor" },
      { src: "images/research/set-robust-05.jpg",
        caption: "Welded versus bonded lamination stator prototypes" },
      { src: "images/research/set-robust-04.png",
        caption: "Irreversible demagnetization — operating points on the B-H curve" },
      { src: "images/research/set-robust-03.png",
        caption: "Measured stator segment radii versus the design value" }
    ]
  },
  {
    id: "system-design",
    title: "System Model-based Design",
    summary: "Motor design driven by the system it serves — drive system modeling, driving profiles, and thermal margin over the real duty cycle.",
    topics: [
      "Electric drive system modeling and system-level performance analysis",
      "Driving profile based high energy efficiency design",
      "Thermal management — derating strategy and thermal margin estimation"
    ],
    description: "A machine is judged in the system it drives — a traction motor in the vehicle, a joint motor in the robot. We model the complete electric drive system, from battery and inverter through machine and reducer to the load, and evaluate performance where it is felt: at the wheel, at the joint, at the range on a full charge.\nRather than designing to a single rated point, we design against how the machine is actually used. Driving profiles and duty cycles are translated into distributions of operating points on the torque-speed plane, and the machine is shaped so that its efficiency sits where the energy is actually spent.\nThe same duty cycle decides the thermal question. Continuous rating tells little about a load that peaks and rests, so we estimate thermal margin over the profile and design the derating strategy together with the machine — deciding how much of the peak the system can promise, and for how long.",
    image: "images/research/set-system-00.png",
    images: [
      { src: "images/research/set-system-03.png",
        caption: "Vehicle simulation model from drive cycle to wheels" },
      { src: "images/research/set-system-04.jpg",
        caption: "Road-load force decomposition on a gradient" },
      { src: "images/research/set-system-01.jpg",
        caption: "Drive-cycle operating points on the torque-speed plane" },
      { src: "images/research/set-system-02.png",
        caption: "Efficiency maps with cycle operating points, before and after improvement" },
      { src: "images/research/set-system-05.jpg",
        caption: "Measured joint velocity and torque trajectories of a wearable robot" }
    ]
  },
  {
    id: "data-driven",
    title: "Data-driven Design & Automation",
    summary: "Optimization, surrogate models, and in-house software that run the design loop — and make robust design affordable.",
    topics: [
      "Design optimization — multi-objective optimization algorithms",
      "Multi-fidelity surrogate models — co-Gaussian process, deep transfer learning",
      "Robust design against manufacturing and material variation",
      "Modeling and design automation, in-house characteristic analysis programs"
    ],
    description: "A good design method deserves to run without a person clicking through every step. We build in-house tools that automate the loop from parametric geometry and meshing, through batch analysis, to post-processing and evaluation — so a design space that once took weeks to explore can be swept overnight.\nAutomation alone is not enough when a single finite element evaluation is expensive. We build multi-fidelity surrogate models that learn from a large body of cheap low-fidelity results and a handful of expensive high-fidelity ones — co-Gaussian process regression and deep transfer learning — and drive multi-objective optimization on the surrogate instead of the solver.\nThis is what makes robust design affordable. Finding a design that is insensitive to tolerance and material spread means evaluating not one candidate but the distribution around it, and that cost is only bearable when the loop is automated and the model is fast. The methods in our other areas scale because this one does.",
    image: "images/research/set-automation-00.png",
    images: [
      { src: "images/research/set-robust-01.png",
        caption: "Cogging torque distribution before and after robust design optimization" },
      { src: "images/research/set-analysis-06.png",
        caption: "Deep transfer learning pipeline linking 2-D and 3-D FEA" },
      { src: "images/research/set-automation-05.png",
        caption: "Prediction accuracy with and without transfer learning" },
      { src: "images/research/set-automation-04.png",
        caption: "Search algorithm for maximum-efficiency operating points" },
      { src: "images/research/set-automation-01.jpg",
        caption: "In-house electromagnetic field program suite" },
      { src: "images/research/set-automation-03.png",
        caption: "In-house mesh generator for machine cross-sections" },
      { src: "images/research/set-automation-02.png",
        caption: "In-house solver — back-EMF, cogging, and dynamic characteristics" }
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
