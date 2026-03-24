$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Set-Location $ProjectDir

Write-Host "Starting Promptplate development servers..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:3000"
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers"
Write-Host ""

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm is not installed" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command composer -ErrorAction SilentlyContinue)) {
    Write-Host "Error: composer is not installed" -ForegroundColor Red
    exit 1
}

$BackendDir = Join-Path $ProjectDir "apps\backend"
$FrontendDir = Join-Path $ProjectDir "apps\web"

if (-not (Test-Path "$BackendDir\.env")) {
    Write-Host "Warning: .env not found in apps/backend. Run .\scripts\install.ps1 first" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "$FrontendDir\package.json")) {
    Write-Host "Warning: package.json not found in apps/web. Run .\scripts\install.ps1 first" -ForegroundColor Red
    exit 1
}

$backendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    php artisan serve --port=8000
} -ArgumentList $BackendDir

$frontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    npm run dev
} -ArgumentList $FrontendDir

Write-Host "Servers started. Press Ctrl+C to stop." -ForegroundColor Green

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $frontendJob -ErrorAction SilentlyContinue
}
