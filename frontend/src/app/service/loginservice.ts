import { Injectable } from "@angular/core"
import {HttpClient} from "@angular/common/http"
@Injectable()
export class LoginService{

        HOSTUrl : String = "http://127.0.0.1:5000"
        constructor(private _http : HttpClient){

        }
        public AdminLogin(username:String,password :String)
        {
            return this._http.post(this.HOSTUrl+"/api/adminlogin",{
                "username":username,
                "password" : password
            });
        }
}