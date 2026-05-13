@echo off
echo ========================================
echo   BTL Insight Hub - Deploy to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Building project...
call npm run build
if errorlevel 1 (
    echo BUILD FAILED!
    pause
    exit /b 1
)
echo Build OK!
echo.

echo [2/4] Initializing git...
git add -A
git commit -m "BTL Insight Hub - deploy"
echo.

echo [3/4] Creating GitHub repo and pushing...
gh repo create btl-insight-hub --public --source=. --push 2>nul || git push -u origin main
echo.

echo [4/4] Done!
echo.
echo ========================================
echo   Next step:
echo   Go to GitHub repo Settings - Pages
echo   Source: GitHub Actions
echo   Wait 1 minute for deploy
echo.
echo   Your URL will be:
echo   https://YOUR-USERNAME.github.io/btl-insight-hub/
echo ========================================
pause
