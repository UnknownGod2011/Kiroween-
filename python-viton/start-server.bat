@echo off
echo ========================================
echo Starting Python VITON Server
echo ========================================
echo.

call venv\Scripts\activate.bat

echo Starting Flask server on http://localhost:5001
echo Press Ctrl+C to stop the server
echo.

python app.py
