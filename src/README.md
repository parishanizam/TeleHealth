# Project Name Source Code

The folders and files for this project are as follows:

POC: TeleHealth - Gesture and Face Detection
This project is a TeleHealth application that uses Express.js for the backend, Python (with MediaPipe and OpenCV) for face and gesture detection, and React for the frontend. The app can detect gestures like pointing and recognize multiple faces in real-time.

Have two terminals open

Instructions for terminal 1:
cd to backend folder in src folder
create python virtual enviroment with: 
        python -m venv venv
        source venv\Scripts\activate #Windows
        source venv/bin/activate #macOS
Install dependices with:
        pip install -r requirements.txt
        npm install

run the server by:
        node server.js

Instructions for terminal 2:
cd to frontend/poc in src folder
install react dependices wih:
        npm install
run frontend with:
        npm run dev
in the terminal 2 after npm run dev a localhost link will come up..crtl click on that to open the frontend
...
