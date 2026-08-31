#!/usr/bin/env bash
# =============================================================================
#  히어로 영상 만들기  —  클립 7개 → hero.mp4 (약 17초, 이음새 없는 무한 반복)
#
#  쓰는 법
#    bash build.sh v2      ← v2 폴더의 클립으로 만든다
#    bash build.sh         ← 폴더를 안 적으면 v1
#
#    소스 폴더 안에 clip1.mp4 ~ clip7.mp4 가 있어야 한다.
#    결과물 hero.mp4 · hero-poster.jpg 는 이 폴더(hero\) 에 생긴다.
#
#  하는 일
#    - 클립마다 3초씩만 사용 (클립 1은 앞부분, 나머지는 뒤쪽 클로즈업 구간)
#    - 클립 사이를 0.6초 크로스페이드로 잇는다
#    - 마지막↔처음도 크로스페이드해 반복 이음새를 없앨다
#    - 음성 트랙 제거, 5MB 이하로 압축
# =============================================================================
set -e

FF="/c/Users/user/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin"
FFMPEG="$FF/ffmpeg"
FFPROBE="$FF/ffprobe"

SRC="${1:-v1}"                 # 소스 폴더 (v1 · v2 · v3 …)
ALT="${2:-}"                   # 보충 폴더. SRC 에 없는 클립은 여기서 가져온다
[ -d "$SRC" ] || { echo "폴더가 없습니다: $SRC"; exit 1; }

# 클립 한 개의 실제 경로를 찾는다
pick() {
  if   [ -f "$SRC/clip$1.mp4" ]; then echo "$SRC/clip$1.mp4"
  elif [ -n "$ALT" ] && [ -f "$ALT/clip$1.mp4" ]; then echo "$ALT/clip$1.mp4"
  else echo ""; fi
}

W=1920         # 공통 가로 (클립마다 달라도 여기에 맞춘다)
H=1080         # 공통 세로
SEG=3.0        # (구) 기본 길이 — 지금은 LEN 배열을 쓴다
FADE=0.6       # 크로스페이드 길이(초)
FPS=24

# 화면에 나올 순서 — 파일 번호가 곧 순서다
# 1 인트로 / 2 자동차 / 3 휴머노이드 / 4 항공 / 5 선박 / 6 가전 / 7 로봇팔
ORDER=(1 2 3 4 5 6 7)

# 클립마다 [시작초]와 [쓸 길이]를 따로 준다
#   v4(유료본) 기준. 리빌이 대부분 3~4초에 시작한다
#   clip1 도입부 2초 / clip6 은 실내에 들어와 가전이 켜지는 구간
#   START+LEN 이 원본 길이(6.04초)를 넘지 않게 할 것
declare -A START=( [1]=0.0 [2]=3.0 [3]=3.0 [4]=2.8 [5]=0.8 [6]=2.6 [7]=2.2 )
declare -A LEN=(   [1]=2.0 [2]=3.0 [3]=3.0 [4]=3.0 [5]=3.0 [6]=3.0 [7]=3.0 )

# --- 전처리: clip2 후반(리빌)을 0.5배속으로 늘린다 ------------------------
PREP="_prep"
mkdir -p "$PREP"
SLOWMO2=0      # 1 이면 clip2 후반을 늘린다. 무료본 전용
C2=$(pick 2)
if [ "$SLOWMO2" = "1" ] && [ -n "$C2" ]; then
  echo "== 0단계: clip2 후반 리빌 늘리기 =="
  "$FFMPEG" -y -hide_banner -loglevel error -i "$C2" -filter_complex     "[0]trim=3.0:5.0,setpts=PTS-STARTPTS[a];     [0]trim=5.0:6.04,setpts=(PTS-STARTPTS)/0.9[b];     [a][b]concat=n=2:v=1,fps=${FPS}[v]"     -map "[v]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -an "$PREP/clip2.mp4"
  echo "  clip2  3.0~5.0 정속 + 5.0~6.04 를 0.9배속  →  $("$FFPROBE" -v error         -show_entries format=duration -of csv=p=0 "$PREP/clip2.mp4")s"
fi

# --- 전처리: clip5 리빌 (A: 구동계 없음 → B: 구동계 보임) ----------------
#     같은 원본이므로 B 도 REVEAL_AT 지점부터 잘라야 배 위치가 맞는다
#     clip5a.mp4 · clip5b.mp4 가 둘 다 있을 때만 동작한다
C5A=""; C5B=""
for d in "$SRC" "$ALT"; do
  [ -n "$d" ] || continue
  [ -z "$C5A" ] && [ -f "$d/clip5a.mp4" ] && C5A="$d/clip5a.mp4"
  [ -z "$C5B" ] && [ -f "$d/clip5b.mp4" ] && C5B="$d/clip5b.mp4"
done
REVEAL_AT=1.2      # 리빌이 시작되는 시점(초)
REVEAL_LEN=1.0     # 켜지는 데 걸리는 시간(초)
if [ -n "$C5A" ] && [ -n "$C5B" ]; then
  echo "== 0단계: clip5 리빌 만들기 =="
  aEnd=$(awk "BEGIN{print $REVEAL_AT+$REVEAL_LEN}")
  "$FFMPEG" -y -hide_banner -loglevel error -i "$C5A" -i "$C5B" -filter_complex \
    "[0]trim=0:${aEnd},setpts=PTS-STARTPTS,fps=${FPS}[a]; \
     [1]trim=${REVEAL_AT}:3.0,setpts=PTS-STARTPTS,fps=${FPS}[b]; \
     [a][b]xfade=transition=fade:duration=${REVEAL_LEN}:offset=${REVEAL_AT}[v]" \
    -map "[v]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -an "$PREP/clip5.mp4"
  echo "  clip5  A 0~${REVEAL_AT}s → ${REVEAL_LEN}s 동안 B 로 전환  →  $("$FFPROBE" -v error \
        -show_entries format=duration -of csv=p=0 "$PREP/clip5.mp4")s"
fi

echo "== 1단계: 클립 이어 붙이기 =="

INPUTS=()
FILTER=""
i=0
for c in "${ORDER[@]}"; do
  p=$(pick "$c")
  if [ "$c" = "2" ] && [ -f "$PREP/clip2.mp4" ]; then p="$PREP/clip2.mp4"; fi
  if [ "$c" = "5" ] && [ -f "$PREP/clip5.mp4" ]; then p="$PREP/clip5.mp4"; fi
  [ -n "$p" ] || { echo "clip${c}.mp4 을 찾을 수 없습니다"; exit 1; }
  echo "  clip${c}  <-  $p"
  INPUTS+=(-i "$p")
  s="${START[$c]}"
  e=$(awk "BEGIN{print $s+${LEN[$c]}}")
  FILTER+="[${i}:v]trim=${s}:${e},setpts=PTS-STARTPTS,fps=${FPS},scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black,setsar=1,format=yuv420p[v${i}];"
  i=$((i+1))
done

# xfade 를 사슬처럼 잇는다. 이어 붙일 때마다 (SEG - FADE) 만큼 길이가 는다
PREV="[v0]"
acc="${LEN[${ORDER[0]}]}"                 # 지금까지 이어붙인 길이
for ((n=1; n<${#ORDER[@]}; n++)); do
  OUT="[x${n}]"
  off=$(awk "BEGIN{print $acc-$FADE}")
  FILTER+="${PREV}[v${n}]xfade=transition=fade:duration=${FADE}:offset=${off}${OUT};"
  PREV="$OUT"
  acc=$(awk "BEGIN{print $acc+${LEN[${ORDER[$n]}]}-$FADE}")
done
FILTER="${FILTER%;}"

"$FFMPEG" -y -hide_banner -loglevel error "${INPUTS[@]}" \
  -filter_complex "$FILTER" -map "$PREV" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -an body.mp4

BODY_DUR=$("$FF/ffprobe" -v error -show_entries format=duration -of csv=p=0 body.mp4)
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

DUR=$("$FF/ffprobe" -v error -show_entries format=duration -of csv=p=0 hero.mp4)
SIZE=$(du -k hero.mp4 | cut -f1)
echo ""
echo "완료:  hero.mp4  ${DUR}s  ${SIZE} KB   (소스: $SRC)"
