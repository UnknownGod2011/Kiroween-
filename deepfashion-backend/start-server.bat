@echo off
echo ========================================
echo   DeepFashion Try-On Backend
echo   CVPR 2020 - Photo-Realistic Try-On
echo ========================================
echo.

REM Check if virtual environment exists
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start the server
echo.
echo Starting FastAPI server on http://localhost:8000
echo.
echo NOTE: This requires checkpoints to be downloaded!
echo Download from: https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing
echo Extract to: ../DeepFashion_Try_On/ACGPN_inference/checkpoints/
echo.
python main.py

pause
