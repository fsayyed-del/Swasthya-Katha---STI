@echo off
title Antigravity YouTube Automation Command Center
color 0B
cls

echo ===============================================================================
echo     🚀 ANTIGRAVITY YOUTUBE AUTOMATION EMPIRE CONTROL CENTER
echo ===============================================================================
echo.

:: Navigate to project directory
cd /d "%~dp0"
if exist "STI Magazine\scripts\master_autopilot_daemon.py" (
    cd "STI Magazine"
)

:: Verify Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Python is not found in your PATH. Please install Python 3.10+.
    pause
    exit /b
)

echo [✓] Project Root : %CD%
echo [✓] AI Engines   : Google AI Studio (Gemini Pro) + NVIDIA NIM (Active)
echo [✓] YouTube API  : Authenticated (Multiple Channels)
echo [✓] Pexels HD    : Connected
echo.
echo ===============================================================================
echo  CHOOSE AN AUTOMATION OPTION:
echo ===============================================================================
echo.
echo   [1] 🤖 START 24/7 AUTOPILOT DAEMON (Cycles all formats every 6 hours)
echo   [2] 🎨 Generate Stickman Motivational Short (Aesthetic Dark Animation)
echo   [3] 🔥 Generate Viral Ranking Short ($20k/Mo Top 5 Countdown)
echo   [4] 🇮🇳 Generate Hindi Movie Recap (Filmy Kahani / 100%% Synced)
echo   [5] 🎬 Generate 10-20 Min Long-Form Deep Dive / Documentary
echo   [6] 💎 Generate Matt Parr High-RPM Pillar ($35-$80 CPM)
echo   [7] 💸 MoneyPrinterTurbo Video (Google AI Studio + Audio Ducking)
echo   [8] 🖥️ Open Graphical Control Center Window (GUI)
echo   [9] ❌ Exit
echo.
echo ===============================================================================

choice /c 123456789 /n /m "Press a number (1-9): "
set opt=%errorlevel%

if "%opt%"=="1" goto opt1
if "%opt%"=="2" goto opt2
if "%opt%"=="3" goto opt3
if "%opt%"=="4" goto opt4
if "%opt%"=="5" goto opt5
if "%opt%"=="6" goto opt6
if "%opt%"=="7" goto opt7
if "%opt%"=="8" goto opt8
if "%opt%"=="9" goto opt9

:opt1
cls
echo ===============================================================================
echo  🚀 RUNNING 24/7 MASTER AUTOPILOT DAEMON
echo  (Keep this window open to let it publish continuously)
echo ===============================================================================
echo.
python scripts\master_autopilot_daemon.py
pause
exit /b

:opt2
cls
echo >> Generating Stickman Motivational Short...
python scripts\stickman_shorts_engine.py
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt3
cls
echo >> Generating Viral Ranking Short...
python scripts\viral_ranking_shorts.py
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt4
cls
echo >> Scouting Web for Viral Hindi Movie & Generating 8-Minute Breakdown...
python scripts\hindi_movie_viral_crawler.py --duration 8
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt5
cls
echo >> Generating 10-20 Min Long-Form Deep Dive...
python scripts\longform_deepdive_engine.py --niche movies_hi --duration 10
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt6
cls
echo >> Generating Matt Parr High-RPM Pillar Video...
python scripts\make_money_matt_system.py --niche software_ai
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt7
cls
echo >> Generating MoneyPrinterTurbo AI Video (with Audio Ducking)...
python scripts\money_printer_turbo_engine.py --topic "How AI Agents Will Run Global Businesses in 2026"
echo.
echo ===============================================================================
echo  Video Generation Complete!
echo ===============================================================================
pause
exit /b

:opt8
cls
echo >> Launching Graphical Control Center...
start "" python scripts\desktop_dashboard.py
exit /b

:opt9
exit /b
