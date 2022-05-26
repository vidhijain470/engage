import sqlite3 
import os 

class SaveAttendeceRecord(object):

    def __init__(self):
        self.conn = sqlite3.connect(os.path.join("../database/sqldb.db"))
        self.create_table()
    def create_table(self):
        cursor = self.conn.execute("SELECT name from sqlite_master WHERE type = 'table' AND name = 'AttendenceRecord'")
        result = cursor.fetchall()
        if len(result) ==  0:
            self.conn.execute("CREATE TABLE AttendenceRecord(TeacherName TEXT NOT NULL,SubjectName TEXT NOT NULL,RollNumber TEXT NOT NULL , JointTime TEXT NOT NULL)")
            self.conn.commit()
    
    def insert_record(self,data):
        try:
            self.conn.execute("INSERT INTO AttendenceRecord(TeacherName,SubjectName,RollNumber,JointTime) VALUES (?,?,?,?)",(data["teacher_name"],data["subject_name"],data["roll_number"],data["joining_time"]))
            self.conn.commit()
            return True
        except Exception as e:
            print(e)
            return False

    def extract_details(self,teacher_name,subject_name,roll_number):
        cursor = self.conn.execute("SELECT * FROM AttendenceRecord WHERE TeacherName = '{0}' AND SubjectName = '{1}' AND RollNumber = '{2}'".format(teacher_name,subject_name,roll_number))
        result = cursor.fetchall()
        return result