@echo off
setlocal
cd /d "%~dp0"
echo Starting JohnMac's Hospital dev server...
echo Open http://localhost:5173 in your browser.
node "scripts\dev-server.js"
endlocal
