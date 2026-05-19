@echo off
echo ==========================================
echo   Anatomy Course - Project Setup
echo ==========================================
echo.

cd /d "%~dp0"
echo Current directory: %cd%
echo.

echo Step 1: Running setup-project.js...
node setup-project.js
if %errorlevel% neq 0 (
  echo ERROR: Could not run node. Make sure Node.js is installed.
  pause
  exit /b 1
)

echo.
echo Step 2: Installing npm packages (this may take a few minutes)...
npm install
if %errorlevel% neq 0 (
  echo ERROR: npm install failed.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo   Done! Project is ready.
echo ==========================================
echo.
echo Next: Create .env.local with your Supabase keys
echo Then run: npm run dev
echo.
pause
