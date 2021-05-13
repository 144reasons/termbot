@echo off && color 3 && title First Time Only Time
if exist ./config.json (echo: You already have a Config File You don't need more than one!) else (call)
if exist ./config.json (choice /d y /t 5 > nul) else (call)
if exist ./config.json (EXIT) else (call)
echo You Only got to do this once, After it is finished You may run start.bat
npm run first
PAUSE
