$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Set-Location $ProjectDir

Write-Host "Starting Promptplate with Docker..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API: http://localhost:8000"
Write-Host "Frontend: http://localhost:3000"
Write-Host "MySQL: localhost:3306"
Write-Host ""

docker-compose -f docker\docker-compose.yml up -d

Write-Host ""
Write-Host "Services started!" -ForegroundColor Green
Write-Host ""
Write-Host "To view logs:"
Write-Host "  docker-compose -f docker\docker-compose.yml logs -f"
Write-Host ""
Write-Host "To stop:"
Write-Host "  docker-compose -f docker\docker-compose.yml down"
