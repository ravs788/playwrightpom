@echo off
REM Usage: run-tests.bat [pattern]
REM If [pattern] is provided, only tests matching that pattern (tag, name, etc.) will be run.

IF "%1"=="" (
    npx playwright test
) ELSE (
    npx playwright test --grep "%1"
)

pause
