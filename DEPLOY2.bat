@echo off
echo ============================================
echo  SQLRiyaz - Git + Vercel Deploy
echo ============================================
echo.
cd /d "C:\Users\ExiomIN\Desktop\SQLAce\SQLAce\sqlace"

echo Fixing git...
if exist ".git\config.lock" del /f ".git\config.lock"
if exist ".git\index.lock" del /f ".git\index.lock"

echo Removing broken .git...
rd /s /q .git 2>nul

echo Re-initializing git...
git init -b main
if %errorlevel% neq 0 (
    git init
    git branch -M main
)

echo Staging all files...
git add -A

echo Committing...
git commit -m "SQLRiyaz v1.0 - SQL Interview Prep Platform"

echo.
echo Deploying to Vercel (auto-installing CLI)...
npx --yes vercel@latest --prod

echo.
echo ============================================
echo Done!
echo ============================================
pause
