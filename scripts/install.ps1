$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Write-Host "Installing Promptplate dependencies..." -ForegroundColor Cyan

$BackendDir = Join-Path $ProjectDir "apps\backend"
$FrontendDir = Join-Path $ProjectDir "apps\web"

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
if (Test-Path "$BackendDir\composer.json") {
    Set-Location $BackendDir
    composer install
    if (Test-Path "$BackendDir\.env.example") {
        Copy-Item "$BackendDir\.env.example" "$BackendDir\.env" -Force
    }
    php artisan key:generate
    php artisan migrate
} else {
    Write-Host "Warning: composer.json not found in apps/backend" -ForegroundColor Yellow
}

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "$FrontendDir\package.json") {
    Set-Location $FrontendDir
    npm install
} else {
    Write-Host "Warning: package.json not found in apps/web" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run the development servers:"
Write-Host "  .\scripts\dev.ps1"
Write-Host ""
Write-Host "Or manually:"
Write-Host "  cd apps\backend; php artisan serve"
Write-Host "  cd apps\web; npm run dev"
