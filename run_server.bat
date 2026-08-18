@echo off
title Sabnam Handlooms & Arts - Local Server
echo ============================================================
echo   Sabnam Handlooms & Arts - Server Launcher
echo ============================================================
echo.

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" server.py
    goto end
)

python server.py
if errorlevel 1 (
    echo.
    echo Trying with py launcher...
    py server.py
)

:end
pause
