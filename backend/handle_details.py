import sqlite3 
import os
class HandleDetails(object):
    
    def __init__(self):
        self.conn = sqlite3.connect(os.path.join("../database/sqldb.db"))
        self.create_table()
    def create_table(self):
        cursor = self.conn.execute("SELECT name FROM sqlite_master WHERE type = 'table' and name = 'StudentDetails'")
        result = cursor.fetchall()
        if len(result) == 0:
            self.conn.execute('''CREATE TABLE StudentDetails
                                    (TeacherName TEXT NOT NULL,
                                    SubjectName TEXT NOT NULL ,
                                    ClassLink TEXT NOT NULL,
                                    RollNumber TEXT NOT NULL,
                                    ImagePath TEXT NOT NULL)''')
            self.conn.commit()
    
    def insert_record(self,data):
        try:
            self.conn.execute('''INSERT INTO StudentDetails
                            (TeacherName,SubjectName,ClassLink,RollNumber,ImagePath)
                            VALUES(?,?,?,?,?)''',
                            (data["teacher_name"],data["subject_name"],data["class_link"],data["roll_number"],data["image_path"]))
            self.conn.commit()
            return True
        except Exception as e:
            print(e)
            return False
    
    def get_all_subjects(self,teacher_name,roll_number = None):
        if roll_number == None:
            cursor = self.conn.execute("SELECT DISTINCT SubjectName FROM StudentDetails WHERE TeacherName = '{0}'".format(teacher_name))
        else:
            cursor = self.conn.execute("SELECT DISTINCT SubjectName FROM StudentDetails WHERE TeacherName = '{0}' AND RollNumber = '{1}'".format(teacher_name,roll_number))
        result = cursor.fetchall()
        result = [item[0] for item in result]
        return result

    
    def get_all_students(self,teacher_name,subject_name):
        cursor = self.conn.execute("SELECT DISTINCT RollNumber FROM StudentDetails WHERE TeacherName = '{0}' AND SubjectName = '{1}'".format(teacher_name,subject_name))
        result = cursor.fetchall()
        result = list([item[0] for item in result])
        return result

    def get_all_teachers(self):
        cursor = self.conn.execute("SELECT DISTINCT TeacherName FROM StudentDetails ")
        result = cursor.fetchall()
        result = list([item[0] for item in result])
        return result
    
    def get_class_link(self,teacher_name,subject_name,roll_number):
        cursor = self.conn.execute("SELECT ClassLink FROM StudentDetails WHERE TeacherName = '{0}' AND SubjectName = '{1}' AND RollNumber = '{2}'".format(teacher_name,subject_name,roll_number))
        result = cursor.fetchall()
        return result[0]



# handle_details = HandleDetails()
# handle_details.get_all_subjects("admin")
# print(handle_details.get_all_students("admin","test-subject"))