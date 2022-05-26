import {Component} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { LoginService } from "../service/loginservice";
@Component({
    selector : "admin-login",
    templateUrl : "./admin-login.template.html",
    styleUrls : ["./admin-login.style.css"]
})
export class AdminLoginComponent{
   errormessage : String = ""
   username : String = ""
   password : String = ""
   is_ajax_loader:boolean = false;
    constructor(private _loginservie : LoginService,
        private _router : Router){

    }
    public AdminLogin(){
        
        if(this.username == "" || this.password == "")
            this.errormessage = "Please Enter Username and Password"
        else{
            this.is_ajax_loader = true;
            this.errormessage = ""
            this._loginservie.AdminLogin(this.username,this.password).subscribe((response:any)=>{
                console.log(response)
                if(response["is_login_success"] == true)
                   { let navigateExtras : NavigationExtras = {
                        queryParams :{
                            username : this.username
                        },
                        skipLocationChange : true
                    };
                    this.is_ajax_loader = false;
                    this._router.navigate(["/adminhome"],navigateExtras)
                }
                else{
                    this.errormessage = "Enter valid username and password"
                    this.username = ""
                    this.password = ""
                }
            });
        }
    }
   
}