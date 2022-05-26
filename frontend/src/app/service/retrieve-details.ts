import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
@Injectable()
export class RetrieveService{
    HOSTUrl : String = "http://127.0.0.1:5000";
    constructor(private _httpclient:HttpClient){}
    public submit_student_record(data:any)
    {
        return this._httpclient.post(this.HOSTUrl+"/api/enterstudentrecord",data);
    }
    public get_all_subjects(username:string,roll_number = ''){
        return this._httpclient.post(this.HOSTUrl+ "/api/getsubjects",
        {
            "username" : username,
            "roll_number" : roll_number
        });
    }
    public get_all_students(username:string,roll_number : string){
        return this._httpclient.post(this.HOSTUrl + "/api/getstudent",{
            "username" : username,
            "subject_name" : roll_number
        })
    }
    public get_all_teachers(){
        return this._httpclient.get(this.HOSTUrl + "/api/getteachers")
    }
    public extract_attendence_details(data:any){
        return this._httpclient.post(this.HOSTUrl+ "/api/getattendecedetails",data);
    }
}