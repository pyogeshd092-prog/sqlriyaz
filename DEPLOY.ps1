# SQLRiyaz - One-Click Deploy Script
# Run this in PowerShell: Right-click -> "Run with PowerShell"
# Or open PowerShell in the project folder and type: .\DEPLOY.ps1

$ErrorActionPreference = "Stop"
$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectDir

function Write-Step($n, $msg) { Write-Host "`n[$n] $msg" -ForegroundColor Cyan }
function Write-OK($msg)       { Write-Host "    ✓ $msg" -ForegroundColor Green }
function Write-Err($msg)      { Write-Host "    ✗ $msg" -ForegroundColor Red }

Write-Host "`n==========================================" -ForegroundColor Magenta
Write-Host "   SQLRiyaz — Deploy to GitHub + Vercel   " -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# ── Step 1: Check prerequisites ──────────────────────────────────────────────
Write-Step "1/7" "Checking prerequisites..."

$hasGit = Get-Command git -ErrorAction SilentlyContinue
if (-not $hasGit) {
    Write-Host "  Git not found. Installing via winget..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget --silent
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}
Write-OK "Git: $(git --version)"

$hasGh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $hasGh) {
    Write-Host "  GitHub CLI not found. Installing via winget..." -ForegroundColor Yellow
    winget install --id GitHub.cli -e --source winget --silent
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}
Write-OK "GitHub CLI: $(gh --version | Select-Object -First 1)"

# ── Step 2: npm install ───────────────────────────────────────────────────────
Write-Step "2/7" "Installing npm packages..."
npm install
Write-OK "Dependencies installed"

# ── Step 3: Build ────────────────────────────────────────────────────────────
Write-Step "3/7" "Building project (TypeScript + Vite)..."
npm run build
Write-OK "Build successful → dist/"

# ── Step 4: Git init & commit ────────────────────────────────────────────────
Write-Step "4/7" "Setting up Git repository..."

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
    Write-OK "Git initialized"
} else {
    Write-OK "Git already initialized"
}

git add -A
$commitMsg = "feat: SQLRiyaz v1.0 - 250 SQL interview questions, playground, XP system"
git commit -m $commitMsg 2>&1 | Out-Null
Write-OK "Committed all files"

# ── Step 5: Create GitHub repo & push ────────────────────────────────────────
Write-Step "5/7" "Creating GitHub repo and pushing..."

# Login if needed
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Please log in to GitHub..." -ForegroundColor Yellow
    gh auth login
}

# Create public repo named sqlriyaz (won't fail if already exists)
gh repo create sqlriyaz --public --source=. --remote=origin --push 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Repo may already exist, trying push..." -ForegroundColor Yellow
    git remote remove origin 2>&1 | Out-Null
    $ghUser = gh api user --jq '.login'
    git remote add origin "https://github.com/$ghUser/sqlriyaz.git"
    git push -u origin main --force
}
Write-OK "Code pushed to GitHub"

# ── Step 6: Deploy to Vercel ─────────────────────────────────────────────────
Write-Step "6/7" "Deploying to Vercel..."

$hasVercel = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $hasVercel) {
    Write-Host "  Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login if needed
vercel whoami 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Please log in to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Deploy
$vercelOutput = vercel --prod --yes 2>&1 | Tee-Object -Variable vercelOut
$liveUrl = ($vercelOut | Select-String "https://sqlriyaz" | Select-Object -Last 1)?.ToString().Trim()
if (-not $liveUrl) {
    $liveUrl = ($vercelOut | Select-String "https://" | Select-Object -Last 1)?.ToString().Trim()
}
Write-OK "Deployed to Vercel!"

# ── Step 7: Final summary ─────────────────────────────────────────────────────
Write-Step "7/7" "Done! Here are your links:"

Write-Host "`n  🌐 Live site:    https://sqlriyaz.vercel.app" -ForegroundColor Green
if ($liveUrl) {
    Write-Host "  🔗 Preview URL:  $liveUrl" -ForegroundColor Green
}
$ghUser2 = gh api user --jq '.login' 2>/dev/null
if ($ghUser2) {
    Write-Host "  📦 GitHub repo:  https://github.com/$ghUser2/sqlriyaz" -ForegroundColor Green
}
Write-Host "`n  📊 Vercel dashboard: https://vercel.com/dashboard" -ForegroundColor Yellow
Write-Host "  🔍 Google Search Console: https://search.google.com/search-console" -ForegroundColor Yellow
Write-Host "`n  Next steps:" -ForegroundColor White
Write-Host "  1. Go to Google Search Console → Add property → URL prefix" -ForegroundColor Gray
Write-Host "     → https://sqlriyaz.vercel.app" -ForegroundColor Gray
Write-Host "  2. Choose 'HTML tag' verification → copy the content= value" -ForegroundColor Gray
Write-Host "  3. Add it to index.html <meta name='google-site-verification' ...>" -ForegroundColor Gray
Write-Host "  4. Submit https://sqlriyaz.vercel.app/sitemap.xml in GSC" -ForegroundColor Gray
Write-Host "`n==========================================" -ForegroundColor Magenta
Write-Host " SQLRiyaz is LIVE! Happy practicing! 🚀   " -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

Read-Host "`nPress Enter to close"
