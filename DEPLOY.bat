@echo off
echo ============================================
echo  SQLRiyaz - Deploy to GitHub + Vercel
echo ============================================
echo.

cd /d "%~dp0"

REM Step 1: Install dependencies
echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (echo ERROR: npm install failed & pause & exit /b 1)

REM Step 2: Build
echo.
echo [2/5] Building project...
call npm run build
if %errorlevel% neq 0 (echo ERROR: Build failed & pause & exit /b 1)

REM Step 3: Git setup
echo.
echo [3/5] Setting up Git...
REM Remove stale lock files that prevent git from running
if exist ".git\config.lock" (
    del /f ".git\config.lock"
    echo Removed stale git lock file.
)
REM Force-remove corrupted .git and reinitialize
if exist ".git\HEAD" (
    git status >nul 2>&1
    if %errorlevel% neq 0 (
        echo Removing corrupted .git folder...
        rd /s /q .git
    )
)
git init -b main
git add -A
git commit -m "SQLRiyaz v1.0 - SQL Interview Prep Platform" 2>nul || git commit --allow-empty -m "SQLRiyaz v1.0 - SQL Interview Prep Platform"

REM Step 4: GitHub
echo.
echo [4/5] GitHub push...
git remote remove origin 2>nul
gh auth status >nul 2>&1
if %errorlevel% equ 0 (
    gh repo create sqlriyaz --public --source=. --remote=origin --push 2>nul || (
        git remote add origin https://github.com/%USERNAME%/sqlriyaz.git 2>nul
        git push -u origin main 2>nul
    )
) else (
    echo NOTE: GitHub CLI not logged in. After deploy, run:
    echo   1. Create repo at https://github.com/new named "sqlriyaz"
    echo   2. git remote add origin https://github.com/YOUR_USERNAME/sqlriyaz.git
    echo   3. git push -u origin main
)

REM Step 5: Vercel
echo.
echo [5/5] Deploying to Vercel...
call npx --yes vercel@latest --prod
if %errorlevel% neq 0 (
    echo.
    echo If Vercel needs login, run: npx vercel login
    echo Then run: npx vercel --prod
)

echo.
echo ============================================
echo  Deployment complete!
echo ============================================
pause
