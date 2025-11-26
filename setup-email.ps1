# 🚀 Email Service Quick Setup Script

Write-Host "`n📧 ITEDA Email Service Setup`n" -ForegroundColor Cyan
Write-Host "==============================`n" -ForegroundColor Cyan

# Check if .env.local exists
$envFile = ".env.local"
$envExists = Test-Path $envFile

if ($envExists) {
    Write-Host "✅ .env.local file exists`n" -ForegroundColor Green
} else {
    Write-Host "❌ .env.local file not found`n" -ForegroundColor Red
    Write-Host "Creating .env.local from template..." -ForegroundColor Yellow
    
    # Create .env.local from template
    Copy-Item "env-template.txt" ".env.local"
    
    Write-Host "✅ .env.local created!`n" -ForegroundColor Green
}

# Guide user through setup
Write-Host "📋 Email Service Setup Checklist:`n" -ForegroundColor Cyan

Write-Host "1. Create Resend Account" -ForegroundColor White
Write-Host "   → Go to: https://resend.com" -ForegroundColor Gray
Write-Host "   → Sign up (free tier: 100 emails/day)`n" -ForegroundColor Gray

Write-Host "2. Get API Key" -ForegroundColor White
Write-Host "   → Go to: https://resend.com/api-keys" -ForegroundColor Gray
Write-Host "   → Click 'Create API Key'" -ForegroundColor Gray
Write-Host "   → Copy the key (starts with 're_')`n" -ForegroundColor Gray

Write-Host "3. Update .env.local" -ForegroundColor White
Write-Host "   → Open: .env.local in your editor" -ForegroundColor Gray
Write-Host "   → Replace 're_your_api_key_here' with your actual key" -ForegroundColor Gray
Write-Host "   → Update COMPANY_EMAIL and FROM_EMAIL`n" -ForegroundColor Gray

Write-Host "4. Restart Dev Server" -ForegroundColor White
Write-Host "   → Stop current server (Ctrl+C)" -ForegroundColor Gray
Write-Host "   → Run: npm run dev`n" -ForegroundColor Gray

Write-Host "5. Test Email Sending" -ForegroundColor White
Write-Host "   → Go to: http://localhost:3000#contact" -ForegroundColor Gray
Write-Host "   → Fill out the form and submit" -ForegroundColor Gray
Write-Host "   → Check your inbox!`n" -ForegroundColor Gray

Write-Host "`n💡 Quick Actions:`n" -ForegroundColor Yellow

Write-Host "1. Open Resend" -ForegroundColor White
Write-Host "2. Open env file" -ForegroundColor White
Write-Host "3. View setup guide" -ForegroundColor White
Write-Host "4. Exit`n" -ForegroundColor White

$choice = Read-Host "Enter choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🌐 Opening Resend in browser..." -ForegroundColor Cyan
        Start-Process "https://resend.com/api-keys"
    }
    
    "2" {
        Write-Host "`n📝 Opening .env.local..." -ForegroundColor Cyan
        if (Test-Path ".env.local") {
            code ".env.local"
        } else {
            notepad ".env.local"
        }
    }
    
    "3" {
        Write-Host "`n📖 Opening setup guide..." -ForegroundColor Cyan
        if (Test-Path "EMAIL-SERVICE-SETUP.md") {
            code "EMAIL-SERVICE-SETUP.md"
        } else {
            notepad "EMAIL-SERVICE-SETUP.md"
        }
    }
    
    "4" {
        Write-Host "`n👋 Goodbye!`n" -ForegroundColor Yellow
        exit
    }
    
    default {
        Write-Host "`n❌ Invalid choice!`n" -ForegroundColor Red
    }
}

Write-Host "`n📚 Resources:`n" -ForegroundColor Cyan
Write-Host "  • Setup Guide: EMAIL-SERVICE-SETUP.md" -ForegroundColor Gray
Write-Host "  • Resend Dashboard: https://resend.com/emails" -ForegroundColor Gray
Write-Host "  • React Email Docs: https://react.email`n" -ForegroundColor Gray

Write-Host "✨ Setup complete! Follow the checklist above.`n" -ForegroundColor Green
