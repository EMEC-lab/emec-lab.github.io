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
    summary: "전자기장 분포에서 회로 정수·손실·토크·가진력까지, 실제 구동 조건을 반영한 전기기기 특성 해석",
    topics: [
      "공간고조파법 · 등가자기회로",
      "유한요소해석 (2D · 3D)",
      "회로 정수 · 쇄교자속",
      "손실 · 효율",
      "평균 토크 · 토크 리플",
      "전자기 가진력",
      "전류벡터 제어 · 전류 고조파"
    ],
    description: "Electromagnetic Field Analysis : 해석적 방법(공간고조파법·등가자기회로)과 유한요소해석(FEA)에 의한 전자기장 분포 산출\nCharacteristics Analysis : 전자기장 해석 기반 회로 정수, 손실, 토크, 전자기 가진력 등 주요 성능 도출\nConverter-fed Analysis : 제어 알고리즘 및 구동 방식에 따른 전류 고조파 예측 및 기기 특성 계산",
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
      "열 해석",
      "등가열회로 (LPTN)",
      "냉각 방식",
      "구조 해석 · 회전자 응력",
      "회전체 동역학 · 위험속도",
      "소음 · 진동 (NVH)"
    ],
    description: "전자기 해석 결과의 타 물리 영역 전달 — 손실은 열원으로, 전자기 가진력은 구조 응답의 입력으로\n열 해석 — 손실이 슬롯·적층·하우징을 거쳐 냉각재에 이르는 경로의 등가회로(LPTN) 구성, 운전 조건 기반 냉각 방식 평가\n구조·NVH 해석 — 최고속도 회전자 응력, 회전체 동역학 및 위험속도, 가진력 차수에 따른 고정자 진동·소음",
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
      "설계 절차 · 사이징",
      "통상형 기기 (SPMSM · IPMSM · 유도기 · 릴럭턴스기)",
      "신개념 기기 (이중회전자 · 가변자속 · 자기기어 · 버니어 · BL-WFSM)",
      "권선 형상 · 권선 절체",
      "제조 기술 (헤어핀 권선 · 분할코어 · 포팅)",
      "재료 기술 (전기강판 · SMC · 희토류 프리 자석)"
    ],
    description: "요구 조건 정의 — 토크·출력·속도 곡선, 시스템이 부여하는 공간·온도·전압·전류 제약\n설계 절차 — 극·슬롯 조합, 2차원 형상, 축장, 전기자 권선 턴수의 순차 결정 및 특성 해석에 의한 성능 검증\n기기 형상 — 통상형 기기(SPMSM·IPMSM·유도기·릴럭턴스기)부터 신개념 기기(이중회전자·이중고정자, 가변자속, 자기기어, 버니어, BL-WFSM)까지\n권선 및 구동 형상 — 개방권선, 이중 3상 권선, 직렬-병렬 권선 절체를 통한 운전 영역 확장\n재료·제조 기술의 설계 변수화 — 헤어핀 권선, 분할·접착·용접 코어, 포팅, 이상 전기강판, 연자성 복합재(SMC), 본드자석, 희토류 프리 자석",
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
      "다목적 최적화",
      "다중 정확도 대체모델",
      "가우시안 과정 회귀 · 심층 전이학습",
      "강건 최적화",
      "불확실성 정량화 (기하 공차 · 재료 물성)",
      "시스템 기반 설계 · 운전 프로파일",
      "열 관리 · 디레이팅"
    ],
    description: "다중 정확도 대체모델 구축 — 저정확도 대량 데이터와 고정확도 소량 데이터의 결합 (다중 정확도 가우시안 과정 회귀, 심층 전이학습)\n대체모델 기반 다목적 최적화 — 해석기 직접 호출 대비 탐색 비용 절감, 강건 최적화 수행의 전제\n불확실성 정량화 — 기하 공차 및 재료 물성 편차가 토크 맥동·코깅토크·효율에 미치는 영향 추적, 공칭점이 아닌 분포 기준의 설계 판정\n시스템 관점 설계 — 차량·로봇의 운전 프로파일을 토크-속도 평면상 분포로 변환, 실사용 영역에 효율 정합\n열 관리 — 동일 프로파일에 기반한 디레이팅 전략 및 열적 여유 설계",
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
      "파라메트릭 모델링 · 메시 생성",
      "일괄 해석 · 평가 자동화",
      "자체 특성 해석 프로그램"
    ],
    description: "설계 절차 자동화 — 파라메트릭 형상 생성 및 메시 분할부터 일괄 해석, 후처리·평가까지 단일 흐름 구성\n자체 특성 해석 및 설계 프로그램 개발\n자동화가 확보하는 규모 — 최적화, 불확실성 정량화, 시스템 단위 검토 모두 수천 개 후보의 자동 평가를 전제",
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
