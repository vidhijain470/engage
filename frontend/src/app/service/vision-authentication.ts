import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
@Injectable()
export class AuthenticationService{
    HOSTUrl : String = "http://127.0.0.1:5000";
    constructor(private _httpclient:HttpClient){}
    public do_authentication(data:any){
        return this._httpclient.post(this.HOSTUrl+ "/api/doauthentication",data);
    }

    public save_joining_time(data:any){
        return this._httpclient.post(this.HOSTUrl+ "/api/savejoiningtime",data)
    }
    public extract_attendence_details(data:any){
        return this._httpclient.post(this.HOSTUrl+ "/api/getattendecedetails",data);
    }
}