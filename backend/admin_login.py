import sqlite3 
import os

class AdminLogin(object):
    
    def __init__(self):
        self.conn = sqlite3.connect(os.path.join("../database/sqldb.db"))
        self.create_table()
    def create_table(self):
        cursor = self.conn.execute("SELECT name FROM sqlite_master WHERE type = 'table' and name = 'AdminLogin'")
        result = cursor.fetchall()
        if len(result) == 0:
            self.conn.execute("CREATE TABLE AdminLogin(username TEXT NOT NULL , password NON NULL)")
            self.conn.commit()
    
    def insert_admin(self):
        username = input("Enter username : ")
        password = input("Enter password : ")
        self.conn.execute('INSERT INTO AdminLogin(username,password) VALUES (?,?)',(username,password))
        self.conn.commit()   

    def display_record(self):
        cursor = self.conn.execute("SELECT * FROM AdminLogin")
        result = cursor.fetchall()
        print(result)

    def validate_admin(self,username,password):
        cursor = self.conn.execute("SELECT * FROM AdminLogin WHERE username = '{0}' AND password = '{1}'".format(username,password))
        result = cursor.fetchall()
        if len(result) == 0:
            return False 
        else:
            return True

# adminlogin = AdminLogin()
# adminlogin.insert_admin()
# print(adminlogin.validate_admin("admin","admin"))