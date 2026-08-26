@echo off
title Antigravity YouTube Automation Launcher
color 0A
cls
echo ================================================================
echo    🚀 ANTIGRAVITY YOUTUBE AUTOMATION CONTROL CENTER
echo ================================================================
echo.
echo [1] Launching Interactive Desktop Dashboard...
cd /d "%~dp0"
start "" python scripts\desktop_dashboard.py
exit
