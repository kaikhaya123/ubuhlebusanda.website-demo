<<<<<<< HEAD
# Quick rebuild and restart production server
# Usage: .\rebuild.ps1

Write-Host "🛑 Stopping server..." -ForegroundColor Yellow
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

Write-Host "🔨 Building production..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "🚀 Starting production server..." -ForegroundColor Cyan
    npm start
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
=======
# Quick rebuild and restart production server
# Usage: .\rebuild.ps1

Write-Host "🛑 Stopping server..." -ForegroundColor Yellow
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

Write-Host "🔨 Building production..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "🚀 Starting production server..." -ForegroundColor Cyan
    npm start
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
>>>>>>> 139fe18 (Initial commit with pages folder)
