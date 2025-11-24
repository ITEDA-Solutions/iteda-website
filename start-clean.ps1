# ITEDA Website Startup Script
# This script ensures clean startup of both CMS and Frontend

Write-Host "`n🚀 ITEDA Website Startup Script`n" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Step 1: Kill all existing Node.js processes
Write-Host "🛑 Step 1: Stopping all existing Node.js processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null
Start-Sleep -Seconds 3
Write-Host "✅ All Node.js processes stopped`n" -ForegroundColor Green

# Step 2: Verify ports are free
Write-Host "🔍 Step 2: Checking if ports are free..." -ForegroundColor Yellow
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue

if ($port3000) {
    Write-Host "⚠️  Port 3000 still in use! Killing process..." -ForegroundColor Red
    $pid = $port3000[0].OwningProcess
    taskkill /F /PID $pid
    Start-Sleep -Seconds 2
}

if ($port3001) {
    Write-Host "⚠️  Port 3001 still in use! Killing process..." -ForegroundColor Red
    $pid = $port3001[0].OwningProcess
    taskkill /F /PID $pid
    Start-Sleep -Seconds 2
}

Write-Host "✅ Ports 3000 and 3001 are now free`n" -ForegroundColor Green

# Step 3: Instructions for manual startup
Write-Host "📋 Step 3: Manual Startup Instructions`n" -ForegroundColor Yellow
Write-Host "Please open TWO separate PowerShell windows and run these commands:`n" -ForegroundColor White

Write-Host "Terminal 1 (CMS Backend):" -ForegroundColor Cyan
Write-Host "-------------------------" -ForegroundColor Cyan
Write-Host "cd c:\Apache24\htdocs\iteda-website\cms\cms-poc" -ForegroundColor White
Write-Host "npm run dev`n" -ForegroundColor White

Write-Host "Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "---------------------" -ForegroundColor Cyan
Write-Host "cd c:\Apache24\htdocs\iteda-website" -ForegroundColor White
Write-Host "npm run dev`n" -ForegroundColor White

Write-Host "⏳ Wait for both to show: ✓ Ready in X.Xs`n" -ForegroundColor Yellow

Write-Host "🌐 Then open your browser to:" -ForegroundColor Green
Write-Host "   Website: http://localhost:3000" -ForegroundColor White
Write-Host "   CMS Admin: http://localhost:3001/admin`n" -ForegroundColor White

Write-Host "✨ All done! Ports are cleared and ready.`n" -ForegroundColor Green
