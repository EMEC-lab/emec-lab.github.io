<#
=============================================================================
 images/resize.ps1  —  홈페이지에 올릴 사진 줄이기

 원본 사진을 그대로 커밋하지 않는다. 이 스크립트가 긴 변 1600px 이하로
 줄이고 JPG 로 다시 저장한다. (CLAUDE.md 8번)

 ── 쓰는 법 ─────────────────────────────────────────────────────────────
  1. 줄일 사진을  images\_raw\  폴더에 모아 둔다.
  2. images 폴더에서 마우스 오른쪽 → "PowerShell 창 여기서 열기"
     (또는 PowerShell 을 열고  cd 로 images 폴더까지 이동)
  3. 아래 한 줄을 붙여넣고 Enter

       powershell -ExecutionPolicy Bypass -File .\resize.ps1

  4. 끝나면  images\gallery\  안에 줄어든 사진이 생긴다.
     그 파일 이름을 data\gallery.js 에 적으면 된다.

 ── 다른 폴더로 보내고 싶을 때 ──────────────────────────────────────────
   powershell -ExecutionPolicy Bypass -File .\resize.ps1 -Out members
   powershell -ExecutionPolicy Bypass -File .\resize.ps1 -Out research

 ── 썸네일도 같이 만들고 싶을 때 (갤러리용, 400px) ──────────────────────
   powershell -ExecutionPolicy Bypass -File .\resize.ps1 -Thumb

 설치할 프로그램은 없다. 윈도우에 들어 있는 기능만 쓴다.
=============================================================================
#>

param(
    [string] $In   = "_raw",     # 원본이 들어 있는 폴더
    [string] $Out  = "gallery",  # 결과를 저장할 폴더
    [int]    $Max  = 1600,       # 긴 변 최대 픽셀
    [int]    $Quality = 82,      # JPG 품질 (1~100)
    [switch] $Thumb              # 400px 썸네일도 함께 생성
)

Add-Type -AssemblyName System.Drawing

$root    = Split-Path -Parent $MyInvocation.MyCommand.Definition
$inDir   = Join-Path $root $In
$outDir  = Join-Path $root $Out
$thumbDir = Join-Path $outDir "thumb"

if (-not (Test-Path $inDir)) {
    New-Item -ItemType Directory -Path $inDir | Out-Null
    Write-Host ""
    Write-Host "  '$In' 폴더를 만들었습니다." -ForegroundColor Yellow
    Write-Host "  줄일 사진을 이 폴더에 넣고 다시 실행하세요:" -ForegroundColor Yellow
    Write-Host "  $inDir"
    Write-Host ""
    exit
}

if (-not (Test-Path $outDir))   { New-Item -ItemType Directory -Path $outDir | Out-Null }
if ($Thumb -and -not (Test-Path $thumbDir)) { New-Item -ItemType Directory -Path $thumbDir | Out-Null }

# JPG 인코더와 품질 설정
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq 'image/jpeg' }
$params  = New-Object System.Drawing.Imaging.EncoderParameters 1

function Save-Resized {
    param($SourceImage, [string] $Path, [int] $MaxEdge, [int] $Q)

    $w = $SourceImage.Width
    $h = $SourceImage.Height
    $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($w, $h))
    $nw = [int][Math]::Round($w * $scale)
    $nh = [int][Math]::Round($h * $scale)

    $bmp = New-Object System.Drawing.Bitmap $nw, $nh
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($SourceImage, 0, 0, $nw, $nh)

    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]$Q)
    $bmp.Save($Path, $encoder, $params)

    $g.Dispose()
    $bmp.Dispose()
    return "$nw x $nh"
}

$files = Get-ChildItem -Path $inDir -File |
         Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|bmp|tif|tiff)$' }

if ($files.Count -eq 0) {
    Write-Host ""
    Write-Host "  '$In' 폴더에 사진이 없습니다." -ForegroundColor Yellow
    Write-Host "  $inDir"
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "  사진 $($files.Count) 장을 줄입니다  ->  $Out" -ForegroundColor Cyan
Write-Host ""

$done = 0
foreach ($f in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($f.FullName)

        $name = [IO.Path]::GetFileNameWithoutExtension($f.Name).ToLower()
        $name = $name -replace '[^a-z0-9\-]', '-' -replace '-+', '-'
        $name = $name.Trim('-')
        if ([string]::IsNullOrWhiteSpace($name)) { $name = "photo" }

        $target = Join-Path $outDir "$name.jpg"
        $i = 2
        while (Test-Path $target) { $target = Join-Path $outDir "$name-$i.jpg"; $i++ }

        $size = Save-Resized $img $target $Max $Quality

        if ($Thumb) {
            $tname = [IO.Path]::GetFileNameWithoutExtension($target)
            Save-Resized $img (Join-Path $thumbDir "$tname.jpg") 400 78 | Out-Null
        }

        $img.Dispose()
        $done++

        $kb = [int]((Get-Item $target).Length / 1KB)
        Write-Host ("   OK  {0,-40} {1,-12} {2} KB" -f (Split-Path $target -Leaf), $size, $kb)
    }
    catch {
        Write-Host ("   실패 {0}  ({1})" -f $f.Name, $_.Exception.Message) -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "  완료: $done 장" -ForegroundColor Green
Write-Host "  저장 위치: $outDir"
Write-Host ""
Write-Host "  이제 data\gallery.js 에 파일 이름을 적으세요. 예:" -ForegroundColor Cyan
Write-Host '     { src: "images/gallery/파일이름.jpg", caption: "" }'
Write-Host ""
