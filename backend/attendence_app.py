from asyncio import Handle
import json
from flask import Flask,request,jsonify,session,make_response
from flask_cors import CORS
from admin_login import AdminLogin
from handle_details import HandleDetails
from authentication import VisionAuthentication
from save_attendence_record import SaveAttendeceRecord
import os
import datetime as dt
app = Flask(__name__)
CORS(app)

@app.route("/api/adminlogin" , methods = ["POST"])
def admin_login():
    data = request.get_json()
    admin_login = AdminLogin()
    login_result = admin_login.validate_admin(data["username"],data["password"])
    return jsonify({"is_login_success" : login_result})


@app.route("/api/enterstudentrecord" , methods = ["POST"])
def enter_student_record():
    form_data = dict()
    form_data["teacher_name"] = request.form["teacher_name"]
    form_data["subject_name"] = request.form["subject_name"]
    form_data['class_link'] = request.form["class_link"]
    form_data["roll_number"] = request.form["roll_number"]
    save_dir = os.path.join("../database" ,form_data["teacher_name"],form_data["subject_name"],form_data["roll_number"])
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    image_path = os.path.join(save_dir,f"{form_data['roll_number']}.jpeg")
    file = request.files["student_photo"]
    file.save(image_path)
    form_data["image_path"] = image_path
    handle_details = HandleDetails()
    is_success = handle_details.insert_record(form_data)
    return make_response(jsonify({"response" : is_success}))

@app.route("/api/getsubjects" , methods = ["POST"])
def getsubjects():
    data = request.get_json()
    handle_details = HandleDetails()
    if data["roll_number"] == '':
        result = handle_details.get_all_subjects(data["username"])
    else:
        result = handle_details.get_all_subjects(data["username"],data['roll_number'])
    return make_response(jsonify({"data" : result}))


@app.route("/api/getstudent" , methods = ["POST"])
def getstudents():
    data = request.get_json()
    handle_details = HandleDetails()
    result = handle_details.get_all_students(data["username"],data["subject_name"])
    return make_response(jsonify({"data" : result}))

@app.route("/api/getteachers" , methods = ["GET"])
def getteachers():
    handle_details = HandleDetails()
    result = handle_details.get_all_teachers()
    return make_response(jsonify({"data" : result}))


@app.route("/api/doauthentication",methods = ["POST"])
def do_test():
    teacher_name = request.form["teacher_name"]
    roll_number = request.form["roll_number"]
    subject_name = request.form["subject_name"]
    file = request.files["uploaded_image"]
    uploaded_image_path = os.path.join("../database",teacher_name,subject_name,roll_number,"query.jpeg")
    file.save(uploaded_image_path)
    vision_authentication = VisionAuthentication(teacher_name,subject_name,roll_number)
    result = vision_authentication.do_authentication(uploaded_image_path)
    if result[0] :
        handle_details = HandleDetails()
        class_link = handle_details.get_class_link(teacher_name,subject_name,roll_number)
    else:
        class_link = ""
    return make_response(jsonify({"success" : result[0] , "similarity_score" : result[1],"class_link" : class_link}))    


@app.route("/api/savejoiningtime" , methods = ["POST"])
def save_joining_time():
    data = request.get_json()
    dt_India = dt.datetime.utcnow() + dt.timedelta(hours=5, minutes=30)
    Indian_time = dt_India.strftime('%d-%b-%y %H:%M:%S')
    data["joining_time"] = Indian_time
    save_attendence = SaveAttendeceRecord()
    result = save_attendence.insert_record(data)
    return make_response(jsonify({"response" : result}))

@app.route("/api/getattendecedetails" , methods = ["POST"])
def get_attendece_details():
    data = request.get_json()
    save_attendence = SaveAttendeceRecord()
    result = save_attendence.extract_details(data["teacher_name"],data["subject_name"],data["roll_number"])
    return make_response(jsonify({"data" : result}))


if __name__ == "__main__":
    app.run(debug = True)