/* =========================================================================
 * js/theme.js  — 색상 정의 (Tailwind config)
 * Tailwind CDN 스크립트 바로 뒤에 동기 로드한다.
 *
 * ⚠ 파생 색상은 메인 색상에서 계산된 값이다. 메인 변경 시 함께 조정할 것.
 *     dark  : 명도를 낮춘 값   (hover, 강조, 진한 배경)
 *     light : 아주 옅은 배경 톤 (섹션 배경, 뱃지)
 *     mid   : 중간 톤          (보조 요소, 구분선)
 *
 * 색상을 바꿀 때는 여기와 css/custom.css 의 :root 두 곳만 수정한다.
 * ========================================================================= */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26539C',   // 메인 색상 (RGB 38, 83, 156)
          dark:    '#1B3C71',   // hover, 강조
          light:   '#E8EEF7',   // 배경 톤
          mid:     '#5C81BC'    // 보조
        },
        /* 강조용 보조색. 메인 남색과 겹치지 않게 초록 계열로 잡았다.
           저널 지표(Q1·Q2)처럼 '눈으로 짚어야 하는' 값에만 쓴다 */
        accent: {
          DEFAULT: '#047857',   // emerald 700
          dark:    '#065F46'
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'system-ui', '-apple-system',
               'Segoe UI', 'Roboto', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif']
      },
      letterSpacing: {
        wider2: '0.18em'
      }
    }
  }
};
