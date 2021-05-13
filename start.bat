@echo off && color 1 && title Starting Up
echo:
if exist ./config.json (echo: Starting) else (echo: Hey, You don't seem to have a config file. If you want to run the bot please run Firsttime.bat)
if exist ./config.json (call) else (choice /d y /t 5 > nul)
if exist ./config.json (call) else (EXIT)
echo:
pause
node index.js
PAUSE
