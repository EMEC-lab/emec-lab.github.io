/* =========================================================================
 * data/publications.js
 * 논문 · 특허. HTML 에 하드코딩 금지 — 이 배열만 수정한다.
 *
 *   type          journal | conference | patent
 *   year          숫자. 연도별 그룹핑 기준
 *   date          게재 · 발표 · 등록 날짜. 같은 연도 안에서의 정렬 기준
 *                   journal     게재 년월  "2026-03"
 *                   conference  발표일    "2026-07-16"
 *                   patent      등록일    "2023-08-22"
 *                 Early Access 라 아직 호가 없으면 비워 둔다 (해당 연도의 맨 위로 올라간다)
 *   authors       EMEC 구성원 이름은 render.js 가 MEMBERS 로 판별해 굵게·밑줄로 표시한다
 *                 이름 바로 뒤에 역할을 붙이면 윗첨자로 올라간다
 *                   †  주저자     공동 주저자면 여러 명에 붙인다
 *                   *  교신저자   공동 교신저자도 같은 표기
 *                 예: "Dong-Hoon Ko, Min-Ro Park*"  /  "Min-Ro Park†"
 *                 두 역할을 겸하면 이어 쓴다. 예: "Min-Ro Park†*"
 *   title         제목. doi 가 있으면 자동으로 링크가 된다
 *   venue         저널명 / 학회명 / (특허는 특허권자)
 *                 학회는 풀네임 뒤에 괄호로 약어를 병기한다
 *                   "2026 IEEE Energy Conversion Congress and Exposition (ECCE 2026)"
 *                 약어가 없는 국내 학회는 풀네임만 적는다
 *   detail        권·호·페이지 / 개최지와 기간 / 등록일
 *                 학회 기간은 "개최지, YYYY.MM.DD ~ MM.DD" 형식.
 *                 해가 넘어가면 끝 날짜도 연도까지 적는다
 *   doi           'https://doi.org/...' 또는 '10.xxxx/...'
 *   impact        게재 당시의 JCR Impact Factor. 국제 저널에만 적는다
 *                 게재 시점에 공개되어 있던 판본 기준이다
 *                 (예: 2020.01 게재 → JCR 2018. JCR 2019 는 2020년 6월 공개)
 *   jcrTop        상위 %  예 "3.3"        ┐
 *   jcrRank       순위     예 "6/182"      │ 여러 카테고리에 속하면 가장 높은 것
 *   jcrQuartile   분위     예 "Q1"         ┘ 지금은 자료가 없어 비워 둔다
 *   domestic      화면에 표시하지 않음. 학과 평가·통계용
 *   patentNo      patent 전용. 등록번호
 *   applicationNo patent 전용. 출원번호
 *   country       patent 전용
 *
 * 국제 학술지·학회는 영문 원문, 국내 학술대회는 국문 그대로. (CLAUDE.md 2번)
 *
 * 출처: 실적정리_20260428.xlsx (SCIE / Scopus / KCI / 국내외 학술대회 / 특허)
 * ========================================================================= */

const PUBLICATIONS = [
  {
    type: "conference", year: 2026,
    date: "2026-10-04",
    authors: "Young-Hoon Lee†, Soo-Hwan Park, Young-Hoon Jung, Min-Ro Park*",
    title: "A Fast Overhang-Aware Quasi-3D Equivalent Magnetic Circuit Model for Axial-Flux PM Machines",
    venue: "2026 IEEE Energy Conversion Congress and Exposition (ECCE 2026)",
    detail: "Vancouver, Canada, 2026.10.04 ~ 10.08",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-07-10",
    authors: "신주현†, 김혜성, 박민로*",
    title: "AFPM의 오버행 고려 Quasi-3D EMC 기반 전자기 특성 분석",
    venue: "2026년도 대한전기학회 하계학술대회",
    detail: "용평, 2026.07.08 ~ 07.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-13",
    authors: "Geun-Ho Park†, Min-Ro Park*, Jae-Hun Kim, Young-Hoon Jung*",
    title: "Comparison of Energy Consumption of ML IPMSMs for EV Traction under Various Driving Cycles Considering DPMM Application",
    venue: "International Magnetics Conference (Intermag 2026)",
    detail: "Manchester, UK, 2026.04.13 ~ 04.17",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-09-06",
    authors: "Jae-Kyung Ryu†, Jae-Hyun Kim, Jae-Yoon Kim, Min-Ro Park*, Soo-Hwan Park*",
    title: "Computationally Efficient Prediction of Electromagnetic Excitation Force in SPMSM Considering Axial Leakage Flux via Space Harmonic Analysis-Based Deep Transfer Learning",
    venue: "27th International Conference on Electrical Machines (ICEM 2026)",
    detail: "Funchal, Madeira, Portugal, 2026.09.06 ~ 09.09",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-13",
    authors: "Yong-Min Lee†, Soo-Hwan Park, Hye-Seong Kim, Young-Hoon Lee, Min-Ro Park*",
    title: "Deep Transfer Learning-Assisted Fast Performance Prediction for AFPM",
    venue: "International Magnetics Conference (Intermag 2026)",
    detail: "Manchester, UK, 2026.04.13 ~ 04.17",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-07-09",
    authors: "이영훈†, 박민로*",
    title: "EMCN 기반 Quasi-3D 해석을 통한 YASA형 AFPM의 전자기 특성 분석",
    venue: "2026년도 대한전기학회 하계학술대회",
    detail: "용평, 2026.07.08 ~ 07.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-09-14",
    authors: "Jae-Hun Kim†, Kyoung-Soo Cha, Soo-Hwan Park, Min-Ro Park, Young-Hoon Jung*",
    title: "Electrical and Thermal Performance Analysis of a WFSM Using a Sizing Method Incorporating a Thermal Equivalent Circuit",
    venue: "2026 IEEE Energy Conversion Congress and Exposition - Europe (ECCE Europe 2026)",
    detail: "Valencia, Spain, 2026.09.14 ~ 09.18",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-13",
    authors: "Young-Hoon Jung†, Ki-O Kim, Min-Ro Park*",
    title: "Flux Linkage Decomposition-based Analysis and Harmonic Reduction Design of Induced Voltage in High-Speed Multilayer IPMSM",
    venue: "International Magnetics Conference (Intermag 2026)",
    detail: "Manchester, UK, 2026.04.13 ~ 04.17",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-24",
    authors: "이용민†, 박민로*",
    title: "PMSM 전자기 특성 예측을 위한 해석적 방법-유한요소해석 기반 심층전이학습 기법",
    venue: "2026년도 대한전기학회 전기기기 및 에너지변환시스템부문회 춘계학술대회",
    detail: "대전, 2026.04.23 ~ 04.25",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-24",
    authors: "정민구†, 이영훈, 박민로*",
    title: "Quasi-3D 해석을 이용한 형상 변수 변화에 따른 AFPM 전동기 특성 분석",
    venue: "2026년도 대한전기학회 전기기기 및 에너지변환시스템부문회 춘계학술대회",
    detail: "대전, 2026.04.23 ~ 04.25",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-06-30",
    authors: "Min-Ro Park†*",
    title: "Research Trends in Motor Design Based on Soft and Hard Magnetic Materials",
    venue: "2026 International Symposium on Advanced Magnetic Materials and Applications (ISAMMA 2026)",
    detail: "Busan, Korea, 2026.06.28 ~ 07.02",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-07-09",
    authors: "노진성†, 이영훈, 박민로*",
    title: "Tooth-Tip Chamfer를 반영한 자기등가회로 기반 V-Type IPMSM의 전자기 특성 분석",
    venue: "2026년도 대한전기학회 하계학술대회",
    detail: "용평, 2026.07.08 ~ 07.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-04-13",
    authors: "Hye-Seong Kim†, Yong-Min Lee, Dong-Hoon Ko, Young-Hoon Lee, Min-Ro Park*",
    title: "Transfer Learning-Assisted Analytical Quasi-3D Surrogate Modeling for Electromagnetic Performance Prediction of AFPMs Considering Eccentricity",
    venue: "International Magnetics Conference (Intermag 2026)",
    detail: "Manchester, UK, 2026.04.13 ~ 04.17",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-06-26",
    authors: "유재경(동국대학교)†, 김재윤(동국대학교), 박민로(순천향대학교), 박수환(동국대학교)*",
    title: "로봇 액추에이터용 SPMSM 의 진동 건전성 평가를 위한 축방향 누설자속 고려 전자기 가진력 예측 프레임워크",
    venue: "PHM Korea 2026 정기학술대회",
    detail: "부산, 2026.06.24 ~ 06.27",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-06-26",
    authors: "박민로†*",
    title: "모터 회전자 편심 고장의 물리기반 진단을 위한 전자기–진동 특성 분석",
    venue: "PHM Korea 2026 정기학술대회",
    detail: "부산, 2026.06.24 ~ 06.27",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-05-28",
    authors: "박민로†*",
    title: "모터 회전자 편심에 따른 전자기 가진원 특성 분석",
    venue: "2026년도 춘계 소음진동 학술대회",
    detail: "삼척, 2026.05.27 ~ 05.30",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2026,
    date: "2026-07-09",
    authors: "이현규†, 김혜성, 이영훈, 박민로*",
    title: "정편심 및 동편심을 고려한 AFPM의 해석적 Quasi-3D 모델링 및 전자기 특성 분석",
    venue: "2026년도 대한전기학회 하계학술대회",
    detail: "용평, 2026.07.08 ~ 07.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "",
    authors: "Dong-Hoon Ko†, Yong-Min Lee, Min-Ro Park*",
    title: "Analytical Estimation and Verification of Cogging Torque in an SPMSM Considering Segmented-Core Manufacturing Tolerances for EPS Motors",
    venue: "International Journal of Automotive Technology",
    detail: "Early Access",
    doi: "10.1007/s12239-026-00465-3",
    impact: "1.5",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-07",
    authors: "Yong-Min Lee†, Dong-Hoon Ko, Sungan Yoon, Jeongho Cho, Soo-Hwan Park*, Min-Ro Park*",
    title: "Characteristics Estimation and Design of SPMSM using Analytic Method-based Transfer Learning",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 62, no. 7, pp. 1-6 (Art no. 7401806)",
    doi: "10.1109/TMAG.2025.3640767",
    impact: "1.9",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "",
    authors: "Yong-Min Lee†, Dong-Hoon Ko, Min-Ro Park*",
    title: "Comparative study of kriging and deep neural networks as surrogate models for parameter prediction of PMSM",
    venue: "International Journal of Automotive Technology",
    detail: "Early Access",
    doi: "10.1007/s12239-026-00462-6",
    impact: "1.5",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-01",
    authors: "Ho-Young Lee†*, Soon-O Kwon, Min-Ro Park",
    title: "Design and Performance Evaluation of a Hybrid Flux-Path Limited-Angle Torque Motor",
    venue: "Machines",
    detail: "vol. 14, no. 1, pp. 1-17 (3)",
    doi: "10.3390/machines14010003",
    impact: "2.5",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-02",
    authors: "Dong-Min Kim†, Min-Ro Park*",
    title: "Driving Condition Based-Design and Performance Analysis of Wound-Field Synchronous Motor in Electric Vehicles",
    venue: "International Journal of Automotive Technology",
    detail: "vol. 27, no. 1, pp. 33-44",
    doi: "10.1007/s12239-025-00270-4",
    impact: "1.5",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-04",
    authors: "김유정†, 황인준, 장선주, 박민로*",
    title: "EV 구동 모터 재질 및 주행 사이클에 따른 에너지 소비 특성 분석",
    venue: "The Transactions of the Korean Institute of Electrical Engineers",
    detail: "vol. 75, no. 4, pp. 841-849",
    doi: "10.5370/KIEE.2026.75.4.841", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-04",
    authors: "Jae-Kyung Ryu†, Chan-Woo Kim, Seong-Won Jeong, Min-Ro Park*, Soo-Hwan Park*",
    title: "Efficient multi-objective design optimization of axial-flux permanent magnet machines for drone propulsion system using multi-fidelity gaussian process",
    venue: "Structural and Multidisciplinary Optimization",
    detail: "vol. 69, no. 115, pp. 1-16",
    doi: "10.1007/s00158-026-04316-8",
    impact: "4.0",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "",
    authors: "Young-Hoon Jung†, Ki-O Kim, Hye-Seong Kim, Min-Ro Park*",
    title: "Flux Linkage Decomposition-based Analysis and Harmonic Reduction Design of Induced Voltage in High-Speed Multilayer IPMSM",
    venue: "International Journal of Automotive Technology",
    detail: "Early Access",
    doi: "",
    impact: "2.1",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-07",
    authors: "Soo-Hwan Park†, Dong-Hoon Ko, Soo-Gyung Lee, Jin-Cheol Park, Min-Ro Park*",
    title: "Robust Design Optimization of SPMSM based on Manufacturing Uncertainty Analysis of Prototype",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 62, no. 7, pp. 1-6 (Art no. 8100806)",
    doi: "10.1109/TMAG.2025.3616812",
    impact: "1.9",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "2026-01",
    authors: "Doo-Young Kim†, Dae-Kee Kim, Min-Ro Park*",
    title: "Rotor eccentricity in electric machines: An analytical framework with experimental validation for fault diagnosis",
    venue: "Mechanical Systems and Signal Processing",
    detail: "vol. 244, pp. 1-19 (113776)",
    doi: "10.1016/j.ymssp.2025.113776",
    impact: "8.9",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2026,
    date: "",
    authors: "Hye-Seong Kim†, Soo-Hwan Park, Yong-Min Lee, Min-Ro Park*",
    title: "Transfer Learning-Assisted Analytical Quasi-3D Surrogate Modeling for Electromagnetic Performance Prediction of AFPMs Considering Eccentricity",
    venue: "Transactions on Magnetics",
    detail: "pp. 1-6 (Art no. ), Early Access",
    doi: "10.1109/TMAG.2026.3701418",
    impact: "1.9",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-11-20",
    authors: "이영훈†, 고동훈, 이용민, 김혜성, 박민로*",
    title: "3-Layer IPMSM 수학적 모델 기반 GA-SQP를 활용한 회전자 형상 다목적 최적 설계",
    venue: "2025년도 대한전기학회 전기기기 및 에너지변환시스템부문회 정기총회 및 추계학술대회",
    detail: "부산, 2025.11.19 ~ 11.21",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-07-17",
    authors: "이영훈†, 고동훈, 이용민, 박민로*",
    title: "3-Layer PMa-SynRM의 수학적 모델을 이용한 분산분석 기반 설계 변수 분석",
    venue: "2025년도 대한전기학회 하계학술대회 논문집",
    detail: "부산, 2025.07.16 ~ 07.19",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Dong-Hoon Ko†, Yong-Min Lee, Soo-Hwan Park, Min-Ro Park*",
    title: "Analytic Estimation and Verification of Cogging Torque in SPMSM with Manufacturing Tolerance of Segmented Core",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-05-20",
    authors: "Dong Hoon Ko†, Hye-Seong Kim, Yong-Min Lee, Dong-Hoon Ko, Min-Ro Park*",
    title: "Analytical Calculation of Detent Force in a Linear Motor Considering Stator-Induced Air-Gap Tolerance",
    venue: "15th International Symposium on Linear Drives for Industry Applications (LDIA 2025)",
    detail: "Daejeon, Republic of Korea, 2025.05.18 ~ 05.21",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-08-31",
    authors: "Kyoung-Soo Cha†, Geun-Ho Park, Min-Ro Park, Young-Hoon Jung*",
    title: "Application of Electric Transmission Using Winding Changeover for Performance Improvement of Multilayer IPMSM Using Ferrite PM",
    venue: "2025 IEEE Energy Conversion Congress & Expo Europe (ECCE Europe 2025)",
    detail: "Birmingham, UK, 2025.08.31 ~ 09.04",
    doi: "10.1109/ECCE-Europe62795.2025.11238385", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Yong-Min Lee†, Dong-Hoon Ko, Sung-An Yoon, Jeong-Ho Cho, Soo-Hwan Park, Min-Ro Park*",
    title: "Characteristics Estimation and Design of SPMSM using Analytic Method-based Transfer Learning",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Yong-Min Lee†, Dong-Hoon Ko, Sung-An Yoon, Jeong-Ho Cho, Soo-Hwan Park, Min-Ro Park*",
    title: "Comparative Study of Kriging and Deep Neural Network as Surrogate Models for Performance Prediction of PMSM",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Soo-Hwan Park†, Jun-Woo Chin, Min-Ro Park*",
    title: "Computationally Efficient Conductor Design for WFSM with Hairpin Windings Considering AC Ohmic Loss",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-26",
    authors: "Dong-Hoon Ko†, Yong-Min Lee, Soo-Hwan Park, Min-Ro Park*",
    title: "Computationally Efficient Sensitivity Analysis for robustness of Electric Motor considering Manufacturing Uncertainty",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Chan-Woo Kim†, Min-Ro Park, Kyu-Seob Kim, Soo-Hwan Park*",
    title: "Computationally Efficient Surrogate Modeling of PWM-Induced Iron Loss for Axial Flux Permanent Magnet Synchronous Motors Using Deep Transfer Learning",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-11-20",
    authors: "장선주†, 김유정, 황인준, 고동훈, 이용민, 김혜성, 박민로*",
    title: "EV 구동 모터 재질 및 주행 사이클에 따른 에너지 소비 특성 분석",
    venue: "2025년도 대한전기학회 전기기기 및 에너지변환시스템부문회 정기총회 및 추계학술대회",
    detail: "부산, 2025.11.19 ~ 11.21",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Young-Ju Seo†, Young-Hoon Jung, Chan-Woo Kim, Kyoung-Soo Cha, Min-Ro Park, Soo-Hwan Park*",
    title: "Efficient Analysis of Efficiency Map for Electrically Excited Synchronous Motors Using Equivalent Magnetic Circuit-Based Deep Transfer Learning",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-25",
    authors: "Jae-Yoon Kim†, Jae-Hyun Kim, Chan-Woo Kim, Min-Ro Park, Soo-Hwan Park*",
    title: "Efficient Prediction of Electromagnetic Excitation Force for SPMSM Using Analytical Model-Based Deep Transfer Learning Considering Axial Leakage Flux",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-26",
    authors: "Ki-O Kim†, Young-Hoon Jung, Min-Ro Park*",
    title: "Flux Linkage Decomposition-based Analysis and Harmonic Reduction Design of Induced Voltage in High-Speed Multilayer IPMSM",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-24",
    authors: "Soo-Hwan Park†, Soo-Gyung Lee, Min-Ro Park*",
    title: "Robust Design Optimization of SPMSM based on Manufacturing Uncertainty Analysis of Prototype",
    venue: "25th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2025)",
    detail: "Naples, Italy, 2025.06.22 ~ 06.26",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-05-20",
    authors: "Kyu-Seob Kim†, Hye-Seong Kim, Yong-Min Lee, Dong-Hoon Ko, Min-Ro Park*",
    title: "Vibration Characteristics in Tubular Linear Induction Motor Based on ElectromagneticMechanical Coupled Analysis",
    venue: "15th International Symposium on Linear Drives for Industry Applications (LDIA 2025)",
    detail: "Daejeon, Republic of Korea, 2025.05.18 ~ 05.21",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-07-17",
    authors: "이용민†, 윤성안, 고동훈, 김혜성, 이영훈, 박민로*",
    title: "딥 러닝 기반 특성 예측을 통한 영구자석 동기전동기 최적 설계",
    venue: "2025년도 대한전기학회 하계학술대회 논문집",
    detail: "부산, 2025.07.16 ~ 07.19",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-06-04",
    authors: "박민로†*",
    title: "연자성, 경자성 재료 기반 고속 모터 설계 연구 동향",
    venue: "2025년 한국자기학회 하계학술대회",
    detail: "제주, 2025.06.03 ~ 06.05",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-10-30",
    authors: "박민로†*",
    title: "연자성, 경자성 재료 기반 모터 설계 연구 동향",
    venue: "2025 대한금속·재료학회 추계학술대회",
    detail: "광주, 2025.10.29 ~ 10.31",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-10-17",
    authors: "박민로†*",
    title: "재료 기술을 활용한 구동 모터 설계",
    venue: "2025 제1회 대한전기자동차학회 학술대회",
    detail: "서울, 2025.10.15 ~ 10.17",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-12-12",
    authors: "김재훈†, 박민로, 정영훈*",
    title: "전기적 성능을 고려한 로봇용 고출력밀도 모터의 극 수슬롯 조합 결정",
    venue: "제5회 국방로봇학회 학술대회",
    detail: "제주, 2025.12.10 ~ 12.12",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-11-20",
    authors: "김혜성†, 고동훈, 이용민, 이영훈, 조정호, 박민로*",
    title: "전류 신호의 스펙트럼 특징을 이용한 CNN 기반 모터 베어링 고장 진단",
    venue: "2025년도 대한전기학회 전기기기 및 에너지변환시스템부문회 정기총회 및 추계학술대회",
    detail: "부산, 2025.11.19 ~ 11.21",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-11-26",
    authors: "박민로†*",
    title: "전자기력 기반 모터 소음진동 특성 분석",
    venue: "2025년도 추계 소음진동 학술대회",
    detail: "경주, 2025.11.26 ~ 11.29",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2025,
    date: "2025-07-17",
    authors: "고동훈†, 이용민, 김혜성, 이영훈, 박민로*",
    title: "해석적 방법과 유전 알고리즘을 결합한 SPMSM 최적설계",
    venue: "2025년도 대한전기학회 하계학술대회 논문집",
    detail: "부산, 2025.07.16 ~ 07.19",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2025,
    date: "2025-06",
    authors: "Kyoung-Soo Cha†, Jae-Hyun Kim†, Soo-Gyung Lee, Min-Ro Park*",
    title: "Design of a High-Efficiency External Rotor Interior Permanent Magnet Synchronous Motor Without Magnetic Leakage Flux Path",
    venue: "Mathematics",
    detail: "vol. 13, no. 11, pp. 1-17 (1865)",
    doi: "10.3390/math13111865",
    impact: "2.3",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2025,
    date: "2025-05",
    authors: "Kyoung-Soo Cha†, Young-Hoon Jung†, Soo-Hwan Park*, Min-Ro Park*",
    title: "Optimal Design Considering AC Copper Loss of Traction Motor Applied HSFF Coil for Improving Electric Bus Fuel Economy",
    venue: "Mathematics",
    detail: "vol. 13, no. 9, pp. 1-20 (1509)",
    doi: "10.3390/math13091509",
    impact: "2.3",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2025,
    date: "2025-05",
    authors: "Young-Hoon Jung†, Dong-Min Kim†, Kyoung-Soo Cha, Soo-Hwan Park*, Min-Ro Park*",
    title: "Vibration Reduction of Permanent Magnet Synchronous Motors by Four-Layer Winding: Mathematical Modeling and Experimental Validation",
    venue: "Mathematics",
    detail: "vol. 13, no. 10, pp. 1-19 (1603)",
    doi: "10.3390/math13101603",
    impact: "2.3",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2025,
    date: "2025-04",
    authors: "박민로†*",
    title: "전류 고조파가 모터의 전자기력 및 진동 특성에 미치는 영향",
    venue: "전력전자학회지 (The Transactions of the Korean Institute of Power Electronics)",
    detail: "제30권, 제2호, 31-35쪽",
    doi: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12127845", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2024,
    date: "2024-05-30",
    authors: "박민로†*",
    title: "Analysis of Magnetic and Mechanical Characteristics of Induction Motor according to Lamination Method of Electrical Steel Sheets",
    venue: "2024년 한국자기학회 하계학술대회",
    detail: "제주, 2024.05.29 ~ 05.30",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2024,
    date: "2024-04-25",
    authors: "고동훈†, 이다은, 김은서, 박민로*",
    title: "d-q축 등가회로 정수 계산방법에 따른 모터 성능 비교분석",
    venue: "2024년도 대한전기학회 전기기기 및 에너지변환시스템부문회 춘계학술대회 논문집",
    detail: "천안, 2024.04.25 ~ 04.27",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2024,
    date: "2024-04-25",
    authors: "이용민†, 홍준택, 김동현, 박민로*",
    title: "e-파워트레인 모델 기반 EV 구동용 매입 자석 동기 모터 설계",
    venue: "2024년도 대한전기학회 전기기기 및 에너지변환시스템부문회 춘계학술대회 논문집",
    detail: "천안, 2024.04.25 ~ 04.27",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2024,
    date: "2024-07-12",
    authors: "고동훈†, 박민로*",
    title: "분산 분석 기반 제작 공차의 영향에 따른 SPMSM 특성 분석",
    venue: "2024년도 대한전기학회 하계학술대회 논문집",
    detail: "제주, 2024.07.10 ~ 07.13",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2024,
    date: "2024-07-12",
    authors: "이용민†, 박민로*",
    title: "열 등가회로를 이용한 자속집중형 동기전동기의 열 특성 분석",
    venue: "2024년도 대한전기학회 하계학술대회 논문집",
    detail: "제주, 2024.07.10 ~ 07.13",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2024,
    date: "2024-09",
    authors: "Doo-Young Kim†, Young-Hoon Jung, Kyu-Seob Kim, Min-Ro Park*",
    title: "Multi-physics Analysis of Interior Permanent Magnet Synchronous Motor with Torque Ripple Reduction Using Voltage Control Method",
    venue: "Journal of Magnetics",
    detail: "vol. 29, no. 3, pp. 259-268",
    doi: "10.4283/JMAG.2024.29.3.259",
    impact: "0.6",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2023,
    date: "2023-11-23",
    authors: "박민로†*",
    title: "A Study on the Permanent Magnet Characteristics of IPMSM using Two Types of Permanent Magnets",
    venue: "2023 한국자기학회 동계학술대회",
    detail: "부산, 2023.11.22 ~ 11.24",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2023,
    date: "2023-04",
    authors: "박민로†, 정영훈, 임명섭*",
    title: "비희토류 매입형 영구자석 동기 모터의 다층 회전자 설계 기술",
    venue: "전기의세계",
    detail: "제72권, 제4호, 46186쪽",
    doi: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11337884", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "patent", year: 2023,
    date: "2023-08-22",
    authors: "서갑호, 양견모, 구재완, 박민로, 이재열, 손동섭",
    title: "수동 능동 복합형 의수",
    venue: "한국로봇융합연구원",
    detail: "등록일 2023.08.22",
    doi: "", domestic: true,
    patentNo: "10-2570991", applicationNo: "10-2021-0085854", country: "KR"
  },
  {
    type: "patent", year: 2023,
    date: "2023-03-24",
    authors: "서갑호, 양견모, 손동섭, 박민로, 이종일, 곽동기, 구재완, 이석재",
    title: "수면의 질 향상을 위한 매트리스 및 이를 포함하는 침대",
    venue: "한국로봇융합연구원",
    detail: "등록일 2023.03.24",
    doi: "", domestic: true,
    patentNo: "10-2515557", applicationNo: "10-2020-0110228", country: "KR"
  },
  {
    type: "patent", year: 2023,
    date: "2023-07-17",
    authors: "서갑호, 양견모, 손동섭, 박민로, 이종일, 곽동기, 구재완, 이석재",
    title: "압력 감지 모듈 및 이를 이용한 매트리스",
    venue: "한국로봇융합연구원",
    detail: "등록일 2023.07.17",
    doi: "", domestic: true,
    patentNo: "10-2557881", applicationNo: "10-2020-0110226", country: "KR"
  },
  {
    type: "journal", year: 2022,
    date: "2022-09",
    authors: "Jun-Yeol Ryu†, Min-Ro Park, Jae-Hyun Kim, Myung-Seop Lim*",
    title: "Analysis on Noise Source of Claw Pole Machine in Duplex Three-phase and Belt-Driven System",
    venue: "Journal of Electrical Engineering & Technology",
    detail: "vol. 17, no. 5, pp. 2779-2788",
    doi: "10.1007/s42835-022-01173-5",
    impact: "1.528",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2022,
    date: "2022-02",
    authors: "Min-Ro Park†, Dong-Min Kim, Young-Hoon Jung, Myung-Seop Lim*",
    title: "High energy efficiency oriented-control and design of WFSM based on driving condition of electric vehicle",
    venue: "Mechatronics",
    detail: "vol. 81, pp. 1-18 (102696)",
    doi: "10.1016/j.mechatronics.2021.102696",
    impact: "3.498",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2022,
    date: "2022-09",
    authors: "Min-Ro Park†, Kyu-Seob Kim*",
    title: "Prediction of Conductor Ratio for Tubular Linear Induction Motors using Finite Element Method and Response Surface Methodology",
    venue: "Journal of Magnetics",
    detail: "vol. 27, no. 3, pp. 298-302",
    doi: "10.4283/JMAG.2022.27.3.298",
    impact: "0.551",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2022,
    date: "2022-06",
    authors: "Dong-Min Kim†, Soo-Gyung Lee, Dae-Kee Kim, Min-Ro Park, Myung-Seop Lim*",
    title: "Sizing and optimization process of hybrid electric propulsion system for heavy-duty vehicle based on Gaussian process modeling considering traction motor characteristics",
    venue: "Renewable and Sustainable Energy Reviews",
    detail: "vol. 161, pp. 1-12 (112286)",
    doi: "10.1016/j.rser.2022.112286",
    impact: "16.799",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2022,
    date: "2022-01",
    authors: "노진홍†, 양견모, 박민로, 이지원, 김민규, 서갑호*",
    title: "이동로봇의 안전자율주행을 위한 실내환경에서의 LiDAR 점 데이터군 증강",
    venue: "Journal of Institute of Control, Robotics and Systems",
    detail: "vol. 28, no. 1, pp. 52-58",
    doi: "10.5302/J.ICROS.2022.21.0209", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2022,
    date: "2022-01",
    authors: "박민로†, 김규섭*",
    title: "조립 후 착자 공정을 고려한 컴프레서용 자속집중형 모터 특성 비교",
    venue: "한국자기학회지 (Journal of the Korean Magneitcs Society)",
    detail: "제32권, 제5호, 218-223쪽",
    doi: "10.4283/JKMS.2022.32.5.218", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "patent", year: 2022,
    date: "2022-07-29",
    authors: "서갑호, 양견모, 손동섭, 박민로, 이종일, 곽동기, 구재완, 이석재",
    title: "압력분포 데이터 확보 및 이에 대한 검증방법",
    venue: "한국로봇융합연구원",
    detail: "등록일 2022.07.29",
    doi: "", domestic: true,
    patentNo: "10-2428899", applicationNo: "10-2020-0110225", country: "KR"
  },
  {
    type: "patent", year: 2022,
    date: "2022-12-16",
    authors: "서갑호, 양견모, 박민로, 함제훈",
    title: "재난 현장 통합 관제 시스템",
    venue: "한국로봇융합연구원",
    detail: "등록일 2022.12.16",
    doi: "", domestic: true,
    patentNo: "10-2479676", applicationNo: "10-2021-0025669", country: "KR"
  },
  {
    type: "patent", year: 2022,
    date: "2022-10-07",
    authors: "서갑호, 양견모, 박민로, 함제훈",
    title: "재난 현장 투입용 전력 소비 저감형 로봇",
    venue: "한국로봇융합연구원",
    detail: "등록일 2022.10.07",
    doi: "", domestic: true,
    patentNo: "10-2454105", applicationNo: "10-2021-0025678", country: "KR"
  },
  {
    type: "conference", year: 2021,
    date: "2021-11-03",
    authors: "Jun-Yeol Ryu†, Min-Ro Park, Jae-Hyun Kim, Myung-Seop Lim*",
    title: "Analysis on Noise Source of Claw Pole Machine in Belt-driven System",
    venue: "2021 24th International Conference on Electrical Machines and Systems (ICEMS 2021)",
    detail: "Gyeongju, Republic of Korea, 2021.10.31 ~ 11.03",
    doi: "10.23919/ICEMS52562.2021.9634271", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2021,
    date: "2021-07-22",
    authors: "박민로†, 박진철, 신선용, 이수경, 임명섭*",
    title: "코어 조립공차에 따른 로봇용 액추에이터 특성분석",
    venue: "2021년도 한국자기학회 하계학술연구발표회",
    detail: "강릉, 2021.07.21 ~ 07.23",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-06",
    authors: "Jae-Hyun Kim†, Kyoung-Soo Cha, Sung-Woo Hwang, Soo-Gyung Lee, Min-Ro Park, Young-Doo Yoon, Myung-Seop Lim*",
    title: "Analysis of Effect of the Magnetization Distribution of Multi-Pole PM on SPMSM Performance Using Equivalent Magnetic Circuit Considering Dead Zone",
    venue: "Energies",
    detail: "vol. 14, no. 11, pp. 1-12 (3279)",
    doi: "10.3390/en14113279",
    impact: "2.702",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-01-02",
    authors: "Young-Hoon Jung†, Min-Ro Park, Ki-O Kim, Jun-Woo Chin, Jung-Pyo Hong, Myung-Seop Lim*",
    title: "Design of High-speed Multi-layer IPMSM Using Ferrite PM for EV traction Considering Mechanical and Electrical Characteristics",
    venue: "IEEE Transactions on Industry Applications",
    detail: "vol. 57, no. 1, pp. 327-339",
    doi: "10.1109/TIA.2020.3033783",
    impact: "3.488",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-02",
    authors: "Dong-Min Kim†, Jae-Hyun Kim, Soo-Gyung Lee, Min-Ro Park, Geun-Ho Lee, Myung-Seop Lim*",
    title: "Estimation Method for Rotor Eddy Current Loss in Ultra-High-Speed Surface-Mounted Permanent Magnet Synchronous Motor",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 57, no. 2, pp. 1–5 (Art. no. 8103205)",
    doi: "10.1109/TMAG.2020.3030684",
    impact: "1.626",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-06",
    authors: "Jun-Woo Chin†, Kyoung-Soo Cha, Min-Ro Park, Soo-Hwan Park, Eui-Chun Lee, Myung-Seop Lim*",
    title: "High Efficiency PMSM with High Slot Fill Factor Coil for Heavy-Duty EV Traction Considering AC Resistance",
    venue: "IEEE Transactions on Energy Conversion",
    detail: "vol. 36, no. 2, pp. 883 - 894",
    doi: "10.1109/TEC.2020.3035165",
    impact: "4.501",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-02",
    authors: "Dong-Gi Gwak†, Kyon-Mo Yang, Min-Ro Park, Jehun Hahm, Jaewan Koo, Joonwoo Lee, Kap-Ho Seo*",
    title: "Marker-Based Method for Recognition of Camera Position for Mobile Robots",
    venue: "Sensors",
    detail: "vol. 21, no. 4, pp. 1-16 (1077)",
    doi: "10.3390/s21041077",
    impact: "3.275",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-12",
    authors: "이지원†, 강민수, 박희창, 조용준, 오장석, 김민규, 서갑호, 박민로*",
    title: "다목적 농업 로봇의 농작업 환경 기반 선회 특성 연구",
    venue: "로봇학회 논문지 (The Journal of Korea Robotics Society)",
    detail: "제16권, 제4호, 319-326쪽",
    doi: "10.7746/jkros.2021.16.4.319", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-01",
    authors: "양견모†, 박민로, 구재완, 이종일, 곽동기, 이석재, 손동섭, 김민규, 서갑호*",
    title: "독립 구동형 다중 공기패드 기반 욕창 예방 매트리스 구조 연구",
    venue: "Journal of Institute of Control, Robotics and Systems",
    detail: "vol. 27, no. 10, pp. 695-702",
    doi: "10.5302/J.ICROS.2021.21.0084", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-03",
    authors: "이종일†, 구재완, 박민로, 함제훈, 손동섭, 서갑호*",
    title: "소프트 웨어러블 슈트용 액추에이터의 토크 전달 향상을 위한 기능적 설계 연구",
    venue: "Journal of Institute of Control, Robotics and Systems",
    detail: "vol. 27, no. 3, pp. 271-276",
    doi: "10.5302/J.ICROS.2021.20.0205", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-01",
    authors: "구재완†, 박민로, 양견모, 김민규, 송민걸, 장웅, 김병곤, 송준찬, 이준우, 서갑호*",
    title: "손가락 부분 절단 환자를 위한 기능 의수 설계",
    venue: "Journal of Institute of Control, Robotics and Systems",
    detail: "vol. 27, no. 10, pp. 736 - 744",
    doi: "10.5302/J.ICROS.2021.21.0085", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2021,
    date: "2021-06",
    authors: "박민로†, 서갑호, 황성우, 임명섭*",
    title: "영구자석 비선형 자기특성을 고려한 회전자 타입에 따른 모터 특성 분석",
    venue: "한국자기학회지 (Journal of the Korean Magneitcs Society)",
    detail: "제31권, 제3호, 126-130쪽",
    doi: "10.4283/JKMS.2021.31.3.126", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-08-23",
    authors: "Jun-Woo Chin†, Young-Hoon Jung, Jun-Yeol Ryu, Min-Ro Park, Myung-Seop Lim*",
    title: "Computationally Cost-efficient Characteristics Analysis of EV Traction Motor considering AC Copper Loss based on 2-D Magneto-Static Analysis",
    venue: "24th International Conference on Electrical Machines (ICEM 2020)",
    detail: "Gothenburg, Sweden, 2020.08.23 ~ 08.26",
    doi: "10.1109/ICEM49940.2020.9271053", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-11-18",
    authors: "Ki-O Kim†, Jun-Yeol Ryu, Do-Jin Kim, Min-Ro Park, Myung-Seop Lim*",
    title: "Electromechanical Dynamics Characteristics of Voice Coil Actuator for Circuit Breaker in Power Transmission Systems",
    venue: "19th Biennial IEEE Conference on Electromagnetic Field Computation (CEFC 2020)",
    detail: "Pisa, Italy, 2020.11.16 ~ 11.18",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-11-16",
    authors: "Jae-Hyun Kim†, Min-Ro Park, Soo-Gyung Lee, Kyoung-Soo Cha,Myung-Seop Lim*",
    title: "Equivalent Magnetic Circuit of External Rotor SPMSM considering Magnetization Distribution of Multi-Pole PM",
    venue: "19th Biennial IEEE Conference on Electromagnetic Field Computation (CEFC 2020)",
    detail: "Pisa, Italy, 2020.11.16 ~ 11.18",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-12-04",
    authors: "구재완†, 곽동기, 양견모, 박민로, 손동섭, 서갑호*",
    title: "단위 모듈형 욕창 방지 매트리스의 공압 제어를 위한 공압 분배기 설계",
    venue: "2020 한국생산제조학회 추계학술대회",
    detail: "제주, 2020.12.02 ~ 12.04",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-07-02",
    authors: "차창준†, 박진철, 김동민, 박민로, 임명섭*",
    title: "분할코어를 적용한 EPS용 SPMSM의 극, 슬롯 수에 따른 조립공차에 의한 코깅토크 분석",
    venue: "2020 한국자동차공학회 춘계학술대회",
    detail: "삼척, 2020.07.01 ~ 07.04",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2020,
    date: "2020-12-04",
    authors: "박민로†, 이석재, 구재완, 곽동기, 양견모, 손동섭, 서갑호*",
    title: "욕창 방지 매트리스를 위한 소프트 액츄에이터 설계",
    venue: "2020 한국생산제조학회 추계학술대회",
    detail: "제주, 2020.12.02 ~ 12.04",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2020,
    date: "2020-06",
    authors: "Young-Hoon Jung†, Min-Ro Park, Myung-Seop Lim*",
    title: "Asymmetric Rotor Design of IPMSM for Vibration Reduction Under Certain Load Condition",
    venue: "IEEE Transactions on Energy Conversion",
    detail: "vol. 35, no. 2, pp. 928-937",
    doi: "10.1109/TEC.2020.2966299",
    impact: "4.501",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2020,
    date: "2020-01",
    authors: "Min-Ro Park†, Kyoung-Soo Cha, Jae-Woo Jung, Myung-Seop Lim*",
    title: "Optimum Design of Sensorless-Oriented IPMSM Considering Torque Characteristics",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 56, no. 1, pp. 1-4 (Art. no. 750074)",
    doi: "10.1109/TMAG.2019.2949613",
    impact: "1.651",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2020,
    date: "2020-12",
    authors: "Soo-Gyung Lee†, Saekyeol Kim, Jin-Cheol Park, Min-Ro Park, Tae Hee Lee, Myung-Seop Lim*",
    title: "Robust Design Optimization of SPMSM for Robotic Actuator Considering Assembly Imperfection of Segmented Stator Core",
    venue: "IEEE Transactions on Energy Conversion",
    detail: "vol. 35, no. 4, pp. 2076-2085",
    doi: "10.1109/TEC.2020.2999127",
    impact: "4.501",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-11-21",
    authors: "Jun-Woo Chin†, Min-Ro Park, Young-Hoon Jung, Chung-Seong Lee, Myung-Seop*",
    title: "Comparison of Performance for SPMSM using Cobalt Iron and Silicon Steel",
    venue: "2019년도 한국자기학회 동계학술연구발표회",
    detail: "제주, 2019.11.20 ~ 11.22",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-05-15",
    authors: "Soo-Gyung Lee†, Min-Ro Park, Kyong-Soo Cha, Jae-Hyun Kim, Jung-Pyo Hong*",
    title: "Design of the High Efficiency IPMSM Considering the Operating Point with Different Characteristic",
    venue: "2019 IEEE International Electric Machines and Drives Conference (IEMDC 2019)",
    detail: "San Diego, CA, USA, 2019.05.12 ~ 05.15",
    doi: "10.1109/IEMDC.2019.8785175", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-05-10",
    authors: "차창준†, 박진철, 박민로, 박현진, 홍정표*",
    title: "EPS용 SPMSM의 회전자 형상에 따른 효율 및 열 특성 개선 설계",
    venue: "2019 한국자동차공학회 춘계학술대회",
    detail: "제주, 2019.05.09 ~ 05.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-05-09",
    authors: "박진철†, 박민로, 박현진, 홍정표, 박수환, 이의천*",
    title: "EV용 CFSM의 극 수, 회전자 형상에 따른 특성 분석 및 토크 밀도 향상 설계",
    venue: "2019 한국자동차공학회 춘계학술대회",
    detail: "제주, 2019.05.09 ~ 05.11",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-11-21",
    authors: "김기오†, 정영훈, 박민로, 임명섭*",
    title: "Ferrite 영구자석을 적용한 EV 구동용 IPMSM의 전기적, 기계적 특성 연구",
    venue: "2019년 한국자동차공학회 추계학술대회 및 전시회",
    detail: "경주, 2019.11.20 ~ 11.23",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-10-01",
    authors: "Min-Ro Park†, Dong-Min Kim, Young-Hoon Jung, Myung-Seop Lim, Jung-Pyo Hong*",
    title: "Modeling, Design and Control of Wound-Field Synchronous Motor for High Energy Efficiency of Electric Vehicle",
    venue: "2019 IEEE Energy Conversion Congress and Exposition (ECCE 2019)",
    detail: "Baltimore, MD, USA, 2019.09.29 ~ 10.03",
    doi: "10.1109/ECCE.2019.8912279", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-06-19",
    authors: "Soo-Gyung Lee†, Saekyeol Kim, Min-Ro Park, Tae Hee Lee, Jung-Pyo Hong*",
    title: "Sensitivity Analysis for Robust Performance of Electrical Machines Affected by Manufacturing Tolerance",
    venue: "Tenth International Conference on Computational Electromagnetics (CEM 2019)",
    detail: "Edinburgh, UK, 2019.06.19 ~ 06.20",
    doi: "10.1049/cp.2019.0114", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-07-18",
    authors: "Min-Ro Park†, Hae-Joong Kim, Ho-Young Lee, Myung-Seop Lim*",
    title: "Simple Analytical Model for Circuit Parameter Estimation of Permanent Magnet Synchronous Motor",
    venue: "22th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2019)",
    detail: "Paris, France, 2019.07.15 ~ 07.19",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-11-21",
    authors: "차창준†, 박진철, 박민로, 임명섭, 이충성*",
    title: "분할 코어를 적용한 EPS용 SPMSM의 공차에 따른 코깅 토크 분석",
    venue: "2019년 한국자동차공학회 추계학술대회 및 전시회",
    detail: "경주, 2019.11.20 ~ 11.23",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-10-17",
    authors: "조윤성†, 차창준, 박진철, 박민로, 임명섭*",
    title: "일체형 코어와 분할코어 적용에 따른 SPMSM의 제작공차를 고려한 전기적 특성 비교 분석",
    venue: "2019년도 대한전기학회 전기기기 및 에너지변환시스템 부문회 추계학술대회",
    detail: "수원, 2019.10.17 ~ 10.19",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2019,
    date: "2019-07-10",
    authors: "조윤성†, 박진철, 박민로, 박현진, 홍정표*",
    title: "재질 특성에 따른 영구자석 동기전동기의 전기적 특성 분석",
    venue: "2019년도 제50회 대한전기학회 하계학술대회",
    detail: "고성, 2019.07.10 ~ 07.12",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2019,
    date: "2019-12",
    authors: "Doo-Young Kim†, Min-Ro Park, Young-Hoon Jung, Hyeon-Jin Park, Jung-Pyo Hong, Myung-Seop Lim*",
    title: "Characteristics of Electric Motor according to the Weld-laminated Core and the Bond-laminated Core",
    venue: "Journal of Magnetics",
    detail: "vol. 24, no. 4, pp. 641-649",
    doi: "10.4283/JMAG.2019.24.4.641",
    impact: "0.837",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2019,
    date: "2019-03-04",
    authors: "Min-Ro Park†, Jae-Woo Jung, Doo-Young Kim, Jung-Pyo Hong, Myung-Seop Lim*",
    title: "Design of High Torque Density Multi-Core Concentrated Flux-Type Synchronous Motors Considering Vibration Characteristics",
    venue: "IEEE Transactions on Industry Applications",
    detail: "vol. 55, no. 2, pp. 1351-1359",
    doi: "10.1109/TIA.2018.2876329",
    impact: "2.743",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2018,
    date: "2018-10-31",
    authors: "Soo-Gyung Lee†, Saekyeol Kim, Min-Ro Park, Tae Hee Lee, Jung-Pyo Hong*",
    title: "Sensitivity Analysis Method for Robustness of Motor Performance Affected by Manufacturing Tolerance",
    venue: "18th IEEE Conference on Electromagnetic Field Computation (CEFC 2018)",
    detail: "Hangzhou, China, 2018.10.28 ~ 10.31",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2018,
    date: "2018-07-13",
    authors: "김재현†, 김두영, 박권일, 박민로, 홍정표*",
    title: "영구자석 동기전동기의 전원 주파수 6배 진동 가진원 분석",
    venue: "2018년도 대한전기학회 하계학술대회",
    detail: "용평, 2018.07.11 ~ 07.13",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2018,
    date: "2018-11-14",
    authors: "이동희†, 박민로, 차경수, 홍정표*",
    title: "전기 자동차용 견인 전동기 설계 및 극수 변화에 따른 특성 분석",
    venue: "2018년 한국자동차공학회 추계학술대회 및 전시회",
    detail: "정선, 2018.11.14 ~ 11.17",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2017,
    date: "2017-05-23",
    authors: "Min-Ro Park†, Doo-Young Kim, Jae-Woo Jung, J.P. Hong*",
    title: "Design of high torque density multi-core concentrated flux-type synchronous motors considering vibration characteristic",
    venue: "2017 IEEE International Electric Machines and Drives Conference (IEMDC 2017)",
    detail: "Miami, FL, USA, 2017.05.21 ~ 05.24",
    doi: "10.1109/IEMDC.2017.8002277", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2017,
    date: "2017-08",
    authors: "Doo-Young Kim†, Min-Ro Park, Jae-Han Sim, Jung-Pyo Hong*",
    title: "Advanced Method of Selecting Number of Poles and Slots for Low-Frequency Vibration Reduction of Traction Motor for Elevator",
    venue: "IEEE Transactions on Mechatronics",
    detail: "vol. 22, no. 4, pp. 1554-1562",
    doi: "10.1109/TMECH.2017.2695059",
    impact: "4.357",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2016,
    date: "2016-09-21",
    authors: "Kyong-Soo Cha†, Dong-Min Kim, Min-Ro Park, Myung-Hwan Yoon, Jung-Pyo Hong*",
    title: "Multipolar High-Speed IPMSM Design for EV Traction Considering Mechanical Stress",
    venue: "2016 IEEE 84th Vehicular Technology Conference (VTC-Fall 2016)",
    detail: "Montreal, QC, Canada, 2016.09.18 ~ 09.21",
    doi: "10.1109/VTCFall.2016.7881101", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2016,
    date: "2016-05-20",
    authors: "박호용†, 박민로, 윤명환, 임명섭, 홍정표*",
    title: "매입자석형 동기전동기의 회전자 응력 완화를 위한 설계",
    venue: "2016 한국자동차공학회 춘계학술대회",
    detail: "제주도, 2016.05.19 ~ 05.21",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2016,
    date: "2016-07-14",
    authors: "차경수†, 박민로, 윤명환, 홍정표*",
    title: "영구자석 배치에 따른 Multi-Layer IPMSM의 전기적, 기계적 특성 비교",
    venue: "2016년도 대한전기학회 하계학술대회",
    detail: "강원도 평창, 2016.07.13 ~ 07.15",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2016,
    date: "2016-11-18",
    authors: "김재의†, 차경수, 박민로, 임명섭, 홍정표*",
    title: "형상 변화를 통한 차량용 모터의 유기전압 저감 설계",
    venue: "2016 한국자동차공학회 추계학술대회 및 전시회",
    detail: "대구, 2016.11.16 ~ 11.18",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2016,
    date: "2016-03",
    authors: "Min-Ro Park†, Hae-Joong Kim, Yun-Yong Choi, Jung-Pyo Hong, Jeong-Jong Lee*",
    title: "Characteristics of IPMSM According to Rotor Design Considering Nonlinearity of Permanent Magnet",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 52, no. 3, pp. 1-4 (Art. no. 8101904)",
    doi: "10.1109/TMAG.2015.2482987",
    impact: "1.386",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "journal", year: 2016,
    date: "2016-03",
    authors: "Kyu-Seob Kim†, Min-Ro Park, Hae-Joong Kim, Seung-Hee Chai, Jung-Pyo Hong*",
    title: "Estimation of Rotor Type Using Ferrite Magnet Considering the Magnetization Process",
    venue: "IEEE Transactions on Magnetics",
    detail: "vol. 52, no. 3, pp. 1-4 (Art. no. 8101804)",
    doi: "10.1109/TMAG.2015.2490281",
    impact: "1.386",
    jcrTop: "", jcrRank: "", jcrQuartile: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2015,
    date: "2015-07-02",
    authors: "Min-Ro Park†, Hae-Joong Kim, Yun-Yong Choi, Jung-Pyo Hong, Jeong-Jong Lee*",
    title: "Characteristics of IPMSM According to Rotor Design Considering Nonlinearity of Permanent Magnet",
    venue: "20th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2015)",
    detail: "Montreal, Canada, 2015.06.28 ~ 07.02",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2015,
    date: "2015-05-29",
    authors: "진준우†, 박민로, 김해중, 홍정표*",
    title: "EV Traction용 매입형 영구자석 동기전동기의 집중권/분포권에 따른 특성 비교",
    venue: "2015 한국자동차공학회 춘계학술대회",
    detail: "광주, 2015.05.28 ~ 05.30",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2015,
    date: "2015-07-02",
    authors: "Kyu-Seob Kim†, Min-Ro Park, Hae-Joong Kim, Seung-Hee Chai, Jung-Pyo Hong*",
    title: "Estimation of Rotor Type Using Ferrite Magnet Considering the Magnetization Process",
    venue: "20th International Conference on the Computation of Electromagnetic Fields (COMPUMAG 2015)",
    detail: "Montreal, Canada, 2015.06.28 ~ 07.02",
    doi: "", domestic: false,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2015,
    date: "2015-07-16",
    authors: "김용범†, 박민로, 김해중, 홍정표*",
    title: "주파수에 따른 철손을 고려한 인덕턴스 예측",
    venue: "2015 대한전기학회 제46회 하계학술대회",
    detail: "무주, 2015.07.15 ~ 07.17",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  },
  {
    type: "conference", year: 2013,
    date: "2013-07-10",
    authors: "김규섭†, 정재우, 박민로, 홍정표*",
    title: "수냉식의 ISG 전동기의 열등가회로 해석",
    venue: "2013 대한전기학회 제44회 하계학술대회",
    detail: "제주, 2013.07.10 ~ 07.12",
    doi: "", domestic: true,
    patentNo: "", applicationNo: "", country: ""
  }
];

/* publications.html 필터 버튼 순서 */
const PUBLICATION_TYPES = ["journal", "conference", "patent"];
