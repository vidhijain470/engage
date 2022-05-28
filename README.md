# Face Recognition Attandance and Login System ✨
I have built a valuable attendance and login service for both teachers and students. Reduce manual process errors by this automated and a reliable attendance and login system which marks the attendance of students and redirects them to the online classroom using face recognition technology. 
##### Demo video link : https://www.youtube.com/watch?v=rqz4XCJieOs

## How To Use? :pencil:
----------------------
Test teacher login username : `teacher`


Test teacher login password : `123`
#### Install a module
* Download or clone the repository
* Download the module from https://drive.google.com/file/d/1RxvBRRExA2fiIfZow6MpqfoRDtIs4C6Y/view?usp=sharing and move this file to the backend folder.
* Import the project to your favourit IDE
#### Set up the frotend
Open a terminal and enter the frontend folder:

    cd frontend
    
Install the packages:

    npm install

Start the frontend:

    ng serve
    
#### Set up the backend
Open another terminal to create and activate a virtual enviroment:

    python3 -m venv env
    source env/bin/activate

Enter the backend folder:

    cd backend
    
Install the requirements:

    pip install -r requirement.txt
    
Start the app:

    python attendence_app.py   
    
##### Follow the local path in the first terminal to use the web app.

## Tech Used :computer:
--------------------------
Build With - 
* Python 3.10

Module Used -

All The Module are Latest Version.
* OpenCV
* Pillow
* Numpy
* Flask
* PyTorch

Face Recognition Algorithms -
* MTCNN
* ResNet50 

Software Used -
* VS CODE 
* Git
 
Database -
* SQL lite

Frontend -
* HTML
* CSS
* Angular
* Bootstrap


## 📖 Usage guide/ Application flow


Test teacher username: `teacher`

Test teacher password: `123`

### Landing Page 
Continue Signing Up/In by clicking the highlighted buttons.

All links except those of Sign In and Sign Up lead to the original Microsoft Teams website (these have been added just for information purposes, no copyright infringement is intended).
<img width="1440" alt="Screenshot 2022-05-28 at 10 36 38 PM" src="https://user-images.githubusercontent.com/79098805/170835710-5170ee13-06a8-47a1-bdb9-299091bf4eb8.png">

### Teacher Signup & Registering Students
Use the username, password provided by the admin to signup
<img width="1258" alt="Screenshot 2022-05-28 at 10 44 01 PM" src="https://user-images.githubusercontent.com/79098805/170835844-1e3200b6-7291-4e9b-8201-7e7850a916e3.png">
<img width="1085" alt="Screenshot 2022-05-28 at 10 46 35 PM" src="https://user-images.githubusercontent.com/79098805/170836177-e272b73b-1a9f-48a7-a3dc-7ce37c2b0dc1.png">

Enter student details, class link and student's picture and submit. Similarly register all the students

<img width="1440" alt="Screenshot 2022-05-28 at 10 52 48 PM" src="https://user-images.githubusercontent.com/79098805/170836220-457e728d-4622-4b9b-84b6-debf5d0046cb.png">

### Student Login
Head to the student's login page
<img width="1440" alt="Screenshot 2022-05-28 at 10 57 50 PM" src="https://user-images.githubusercontent.com/79098805/170836345-de6be984-fbcc-4767-b765-ce9dfeb8b04f.png">

Enter the required details and give access to the camera

<img width="1367" alt="Screenshot 2022-05-28 at 10 59 44 PM" src="https://user-images.githubusercontent.com/79098805/170836539-e1cb6d0e-0de9-4890-9487-45097043439e.png">

Click a clear image and validate it to receive the class link and past attendance records
<img width="1330" alt="Screenshot 2022-05-28 at 11 01 51 PM" src="https://user-images.githubusercontent.com/79098805/170836592-ca7471e3-c2dd-494a-93f9-edb5c01d9932.png">
<img width="1077" alt="Screenshot 2022-05-28 at 11 02 34 PM" src="https://user-images.githubusercontent.com/79098805/170836624-67c1e9bd-c495-4e0a-abbc-b809eff6ff48.png">

### Teacher's attendance records
Login to the teacher's portal and select check attendance records
<img width="664" alt="Screenshot 2022-05-28 at 11 02 50 PM" src="https://user-images.githubusercontent.com/79098805/170836679-ce922dd1-0feb-45ee-aa0c-75fe0048f241.png">

The teacher can view attendance records for any particular roll number
<img width="1354" alt="Screenshot 2022-05-28 at 11 03 14 PM" src="https://user-images.githubusercontent.com/79098805/170836828-d549b092-70c5-4eff-a33c-c78a2f270f67.png">
