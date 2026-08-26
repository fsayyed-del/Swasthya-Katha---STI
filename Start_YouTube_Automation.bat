@echo off
setlocal enabledelayedexpansion
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
echo [✓] NVIDIA NIM   : meta/llama-3.1-70b-instruct (Active)
echo [✓] YouTube API  : Authenticated (Multiple Channels)
echo [✓] Pexels HD    : Connected
echo.
echo ===============================================================================
echo  CHOOSE AN AUTOMATION OPTION (Type number and press Enter):
echo ===============================================================================
echo.
echo   [1] 🤖 START 24/7 AUTOPILOT DAEMON (Cycles all formats every 6 hours)
echo   [2] 🎨 Generate Stickman Motivational Short (Aesthetic Dark Animation)
echo   [3] 🔥 Generate Viral Ranking Short ($20k/Mo Top 5 Countdown)
echo   [4] 🇮🇳 Generate Hindi Movie Recap (Filmy Kahani / 100%% Synced)
echo   [5] 🎬 Generate 10-20 Min Long-Form Deep Dive / Documentary
echo   [6] 💎 Generate Matt Parr High-RPM Pillar ($35-$80 CPM)
echo   [7] 🖥️ Open Graphical Control Center Window (GUI)
echo   [8] ❌ Exit
echo.
echo ===============================================================================
set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" (
    cls
    echo ===============================================================================
    echo  🚀 RUNNING 24/7 MASTER AUTOPILOT DAEMON
    echo  (Keep this window open to let it publish continuously)
    echo ===============================================================================
    echo.
    python scripts\master_autopilot_daemon.py
    pause
) else if "%choice%"=="2" (
    cls
    echo >> Generating Stickman Motivational Short...
    python scripts\stickman_shorts_engine.py
    echo.
    echo ===============================================================================
    echo  Video Generation Complete!
    echo ===============================================================================
    pause
) else if "%choice%"=="3" (
    cls
    echo >> Generating Viral Ranking Short...
    python scripts\viral_ranking_shorts.py
    echo.
    echo ===============================================================================
    echo  Video Generation Complete!
    echo ===============================================================================
    pause
) else if "%choice%"=="4" (
    cls
    echo >> Generating Hindi Movie Recap (Filmy Kahani)...
    python scripts\multi_channel_engine.py --channel movies_hi
    echo.
    echo ===============================================================================
    echo  Video Generation Complete!
    echo ===============================================================================
    pause
) else if "%choice%"=="5" (
    cls
    echo >> Generating 10-20 Min Long-Form Deep Dive...
    python scripts\longform_deepdive_engine.py --niche movies_hi --duration 10
    echo.
    echo ===============================================================================
    echo  Video Generation Complete!
    echo ===============================================================================
    pause
) else if "%choice%"=="6" (
    cls
    echo >> Generating Matt Parr High-RPM Pillar Video...
    python scripts\make_money_matt_system.py --niche software_ai
    echo.
    echo ===============================================================================
    echo  Video Generation Complete!
    echo ===============================================================================
    pause
) else if "%choice%"=="7" (
    cls
    echo >> Launching Graphical Control Center...
    start "" python scripts\desktop_dashboard.py
) else (
    exit /b
)
