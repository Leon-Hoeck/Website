@echo off
echo Moving files from interactive-cv to root...

:: Move all files and directories except .git
robocopy "interactive-cv" "." /E /MOVE /XD ".git" /NFL /NDL

:: Delete the now empty interactive-cv directory
rd /s /q "interactive-cv"

:: Delete vercel.json as it's no longer needed
del /f /q "vercel.json"

echo Done! Files have been moved to root directory.
pause 