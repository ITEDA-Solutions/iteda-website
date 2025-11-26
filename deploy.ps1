# 🚀 Quick Deployment Script for ITEDA Website

Write-Host "`n🚀 ITEDA Website - Production Deployment`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if Vercel CLI is installed
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "✅ Vercel CLI ready`n" -ForegroundColor Green

# Display deployment options
Write-Host "📋 Deployment Options:`n" -ForegroundColor Cyan
Write-Host "1. Deploy CMS to Vercel (Recommended)" -ForegroundColor White
Write-Host "2. Deploy Frontend only (CMS already deployed)" -ForegroundColor White
Write-Host "3. Deploy both CMS and Frontend" -ForegroundColor White
Write-Host "4. Exit`n" -ForegroundColor White

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Deploying CMS to Vercel...`n" -ForegroundColor Cyan
        
        # Navigate to CMS directory
        Set-Location "cms\cms-poc"
        
        # Deploy
        Write-Host "📦 Deploying CMS..." -ForegroundColor Yellow
        vercel --prod
        
        Write-Host "`n✅ CMS Deployment Complete!`n" -ForegroundColor Green
        Write-Host "📝 Next Steps:" -ForegroundColor Cyan
        Write-Host "1. Copy the CMS URL from above" -ForegroundColor White
        Write-Host "2. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables" -ForegroundColor White
        Write-Host "3. Add: NEXT_PUBLIC_PAYLOAD_URL = <your-cms-url>" -ForegroundColor White
        Write-Host "4. Redeploy frontend`n" -ForegroundColor White
        
        Set-Location "..\..\"
    }
    
    "2" {
        Write-Host "`n🚀 Deploying Frontend to Vercel...`n" -ForegroundColor Cyan
        
        # Deploy frontend
        Write-Host "📦 Deploying Frontend..." -ForegroundColor Yellow
        vercel --prod
        
        Write-Host "`n✅ Frontend Deployment Complete!`n" -ForegroundColor Green
    }
    
    "3" {
        Write-Host "`n🚀 Deploying Both CMS and Frontend...`n" -ForegroundColor Cyan
        
        # Deploy CMS first
        Write-Host "📦 Step 1: Deploying CMS..." -ForegroundColor Yellow
        Set-Location "cms\cms-poc"
        vercel --prod
        
        Write-Host "`n⏸️  CMS Deployed!`n" -ForegroundColor Green
        Write-Host "📝 Copy the CMS URL from above" -ForegroundColor Yellow
        $cmsUrl = Read-Host "Enter CMS URL (e.g., https://your-cms.vercel.app)"
        
        # Go back to root
        Set-Location "..\..\"
        
        # Add environment variable to frontend
        Write-Host "`n🔧 Adding environment variable to frontend..." -ForegroundColor Yellow
        Write-Host "When prompted, enter: $cmsUrl" -ForegroundColor Cyan
        vercel env add NEXT_PUBLIC_PAYLOAD_URL production
        
        # Deploy frontend
        Write-Host "`n📦 Step 2: Deploying Frontend..." -ForegroundColor Yellow
        vercel --prod
        
        Write-Host "`n✅ Both Deployments Complete!`n" -ForegroundColor Green
        Write-Host "🌐 Frontend: https://iteda-website.vercel.app" -ForegroundColor Cyan
        Write-Host "🔧 CMS Admin: $cmsUrl/admin`n" -ForegroundColor Cyan
    }
    
    "4" {
        Write-Host "`n👋 Goodbye!`n" -ForegroundColor Yellow
        exit
    }
    
    default {
        Write-Host "`n❌ Invalid choice!`n" -ForegroundColor Red
        exit
    }
}

Write-Host "`n📋 Post-Deployment Checklist:`n" -ForegroundColor Cyan
Write-Host "[ ] CMS deployed and accessible" -ForegroundColor White
Write-Host "[ ] Frontend deployed" -ForegroundColor White
Write-Host "[ ] Environment variables configured" -ForegroundColor White
Write-Host "[ ] Test CMS admin login" -ForegroundColor White
Write-Host "[ ] Test frontend loads CMS content" -ForegroundColor White
Write-Host "[ ] No CORS errors in browser console`n" -ForegroundColor White

Write-Host "✨ Deployment script complete!`n" -ForegroundColor Green
