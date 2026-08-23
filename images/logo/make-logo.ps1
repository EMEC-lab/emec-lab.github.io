<#
=============================================================================
 images/logo/make-logo.ps1  —  연구실 심볼 파일 만들기

 원본(투명 배경 PNG)에서 바깥 여백을 잘라내고, 홈페이지·문서에서 쓸
 크기별 파일을 만든다. 가로세로 비율은 그대로 유지된다.

 ── 쓰는 법 ─────────────────────────────────────────────────────────────
   powershell -ExecutionPolicy Bypass -File .\make-logo.ps1 -Src "원본경로.png"

   원본을 바꾸지 않으면 기존 emec-logo.png 를 다시 처리한다.

 결과물
   emec-logo.png        여백 없는 원본 해상도 (인쇄·발표자료용)
   emec-logo-800.png    가로 800px  (웹 기본, 고해상도 화면 대응)
   emec-logo-400.png    가로 400px  (모바일)
   emec-wordmark.png    EMEC 글자 부분만 잘라낸 것 (좁은 자리용)

 설치할 프로그램은 없다. 윈도우에 들어 있는 기능만 쓴다.
=============================================================================
#>

param(
    [string] $Src = "",
    [int]    $AlphaThreshold = 8      # 이 값보다 진한 픽셀을 "그림"으로 본다
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
if ([string]::IsNullOrWhiteSpace($Src)) { $Src = Join-Path $root "emec-logo.png" }

if (-not (Test-Path $Src)) {
    Write-Host ""
    Write-Host "  원본을 찾을 수 없습니다: $Src" -ForegroundColor Red
    Write-Host "  -Src 로 경로를 지정하세요." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

$img = [System.Drawing.Image]::FromFile($Src)
$bmp = New-Object System.Drawing.Bitmap $img
$img.Dispose()

Write-Host ""
Write-Host "  원본: $($bmp.Width) x $($bmp.Height)" -ForegroundColor Cyan

# ── 픽셀을 한 번에 읽어 알파 값 분석 ───────────────────────────────────
$rect = New-Object System.Drawing.Rectangle 0, 0, $bmp.Width, $bmp.Height
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
                      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bytes = New-Object byte[] ($data.Stride * $bmp.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$bmp.UnlockBits($data)

$W = $bmp.Width; $H = $bmp.Height; $stride = $data.Stride

$colHas = New-Object bool[] $W          # 열마다 그림이 있는지
$minX = $W; $maxX = -1; $minY = $H; $maxY = -1

for ($y = 0; $y -lt $H; $y++) {
    $rowBase = $y * $stride
    for ($x = 0; $x -lt $W; $x++) {
        # BGRA 순서, 알파는 네 번째
        if ($bytes[$rowBase + $x * 4 + 3] -gt $AlphaThreshold) {
            $colHas[$x] = $true
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

if ($maxX -lt 0) {
    Write-Host "  그림이 없습니다 (전부 투명)." -ForegroundColor Red
    $bmp.Dispose(); exit 1
}

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
Write-Host "  여백 제거: $cropW x $cropH  (좌 $minX / 상 $minY / 우 $($W-1-$maxX) / 하 $($H-1-$maxY) 잘림)"

# ── EMEC 글자와 부제 사이의 빈 세로줄 찾기 ─────────────────────────────
# 가장 넓은 빈 구간을 경계로 본다
$bestGapStart = -1; $bestGapLen = 0
$runStart = -1
for ($x = $minX; $x -le $maxX; $x++) {
    if (-not $colHas[$x]) {
        if ($runStart -lt 0) { $runStart = $x }
    } else {
        if ($runStart -ge 0) {
            $len = $x - $runStart
            if ($len -gt $bestGapLen) { $bestGapLen = $len; $bestGapStart = $runStart }
            $runStart = -1
        }
    }
}

# ── 저장 도우미 ─────────────────────────────────────────────────────────
function Save-Crop {
    param([int]$X, [int]$Y, [int]$Cw, [int]$Ch, [int]$OutW, [string]$Name)

    $ratio = $Ch / $Cw
    $ow = if ($OutW -gt 0) { $OutW } else { $Cw }
    $oh = [int][Math]::Round($ow * $ratio)

    $out = New-Object System.Drawing.Bitmap $ow, $oh,
           ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle $X, $Y, $Cw, $Ch
    $dstRect = New-Object System.Drawing.Rectangle 0, 0, $ow, $oh
    $g.DrawImage($bmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $path = Join-Path $root $Name
    $out.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $out.Dispose()

    $kb = [int]((Get-Item $path).Length / 1KB)
    Write-Host ("   OK  {0,-24} {1,5} x {2,-5} {3,5} KB" -f $Name, $ow, $oh, $kb)
}

Write-Host ""

# 전체 락업
Save-Crop $minX $minY $cropW $cropH 0    "emec-logo.png"
Save-Crop $minX $minY $cropW $cropH 800  "emec-logo-800.png"
Save-Crop $minX $minY $cropW $cropH 400  "emec-logo-400.png"

# EMEC 글자 부분만
if ($bestGapStart -gt 0 -and $bestGapLen -ge 20) {
    $wmW = $bestGapStart - $minX
    Save-Crop $minX $minY $wmW $cropH 0   "emec-wordmark.png"
    Save-Crop $minX $minY $wmW $cropH 400 "emec-wordmark-400.png"
    Write-Host ""
    Write-Host "  EMEC 글자 / 부제 경계: x = $bestGapStart (빈 구간 $bestGapLen px)" -ForegroundColor DarkGray
} else {
    Write-Host "  글자와 부제를 나눌 만한 빈 구간을 찾지 못했습니다." -ForegroundColor Yellow
}

$bmp.Dispose()

Write-Host ""
Write-Host "  완료. 저장 위치: $root" -ForegroundColor Green
Write-Host ""
