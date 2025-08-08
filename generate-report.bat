@echo off
REM Usage: generate-report.bat [pattern]
REM Runs Playwright tests (optionally filtered) and opens the HTML report.

IF "%1"=="" (
    npx playwright test
) ELSE (
    npx playwright test --grep "%1"
)

npx playwright show-report

pause
