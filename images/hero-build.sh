#!/usr/bin/env bash
# =============================================================================
#  히어로 영상 만들기  —  클립 8개 → hero.mp4 (약 19초, 이음새 없는 무한 반복)
#
#  쓰는 법
#    1. clip1.mp4 ~ clip8.mp4 를 이 폴더에 둔다
#    2. Git Bash 에서:  bash build.sh
#    3. 결과: hero.mp4 · hero-poster.jpg
#
#  하는 일
#    - 클립마다 3초씩만 사용 (클립 1은 앞부분, 나머지는 뒤쪽 클로즈업 구간)
#    - 클립 사이를 0.6초 크로스페이드로 잇는다
#    - 마지막↔처음도 크로스페이드해 반복 이음새를 없앤다
#    - 음성 트랙 제거, 5MB 이하로 압축
# =============================================================================
set -e

# ffmpeg 이 PATH 에 없으면 아래 FF 를 설치 경로로 바꿔 주세요
# (winget install --id Gyan.FFmpeg -e 로 설치했다면 셀 을 다시 열면 PATH 에 잡힙니다)
FF=""
FFMPEG="${FF:+$FF/}ffmpeg"
FFPROBE="${FF:+$FF/}ffprobe"

SEG=3.0        # 클립당 사용할 길이(초)
FADE=0.6       # 크로스페이드 길이(초)
FPS=24

# 화면에 나올 순서. clip3(드론)과 clip6(에어택시)은 생성 결과가 뒤바뀌어
# 여기서 순서를 맞춘다: 자동차 → 에어택시 → 선박 → 휴머노이드 → 드론 → 가전 → 로봇팔
ORDER=(1 2 6 4 5 3 7 8)

# 각 클립에서 잘라낼 시작 지점. 클립 1만 도입부를 살리고 나머지는 뒤쪽을 쓴다
declare -A START=( [1]=0.0 [2]=3.0 [3]=3.0 [4]=3.0 [5]=3.0 [6]=3.0 [7]=3.0 [8]=3.0 )

echo "== 1단계: 클립 이어 붙이기 =="

INPUTS=()
FILTER=""
i=0
for c in "${ORDER[@]}"; do
  INPUTS+=(-i "clip${c}.mp4")
  s="${START[$c]}"
  e=$(awk "BEGIN{print $s+$SEG}")
  FILTER+="[${i}:v]trim=${s}:${e},setpts=PTS-STARTPTS,fps=${FPS},format=yuv420p[v${i}];"
  i=$((i+1))
done

# xfade 를 사슬처럼 잇는다. 이어 붙일 때마다 (SEG - FADE) 만큼 길이가 는다
PREV="[v0]"
off=$(awk "BEGIN{print $SEG-$FADE}")
for ((n=1; n<${#ORDER[@]}; n++)); do
  OUT="[x${n}]"
  FILTER+="${PREV}[v${n}]xfade=transition=fade:duration=${FADE}:offset=${off}${OUT};"
  PREV="$OUT"
  off=$(awk "BEGIN{print $off+$SEG-$FADE}")
done
FILTER="${FILTER%;}"

"$FFMPEG" -y -hide_banner -loglevel error "${INPUTS[@]}" \
  -filter_complex "$FILTER" -map "$PREV" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -an body.mp4

BODY_DUR=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 body.mp4)
echo "  body.mp4  ${BODY_DUR}s"

echo "== 2단계: 반복 이음새 없애기 =="
# 앞머리 FADE 초를 떼어 두었다가 꼬리에 겹쳐 넣는다.
# 그 뒤 앞머리를 잘라내면 첫 프레임과 끝 프레임이 같은 그림이 되어 매끄럽게 돈다.
"$FFMPEG" -y -hide_banner -loglevel error -i body.mp4 -t "$FADE" -c copy head.mp4

XOFF=$(awk "BEGIN{print $BODY_DUR-$FADE}")
"$FFMPEG" -y -hide_banner -loglevel error -i body.mp4 -i head.mp4 \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=${FADE}:offset=${XOFF}[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -an looped.mp4

echo "== 3단계: 앞머리 잘라내고 최종 압축 =="
"$FFMPEG" -y -hide_banner -loglevel error -ss "$FADE" -i looped.mp4 \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -an \
  -movflags +faststart hero.mp4

echo "== 4단계: 포스터 이미지 =="
"$FFMPEG" -y -hide_banner -loglevel error -i hero.mp4 -vframes 1 -q:v 3 hero-poster.jpg

rm -f body.mp4 head.mp4 looped.mp4

DUR=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 hero.mp4)
SIZE=$(du -k hero.mp4 | cut -f1)
echo ""
echo "완료:  hero.mp4  ${DUR}s  ${SIZE} KB"
