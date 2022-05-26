import {Component} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector : "home-page",
    templateUrl : "./home.template.html",
    styleUrls : ["./home.style.css"]
})
export class HomePageComponent{
    constructor(private _router : Router){

    }
    public go_admin_login_page()
    {
        let navigateExtras : NavigationExtras = {
            skipLocationChange:true
        }
        this._router.navigate(["/adminlogin"],navigateExtras)
    }
    public go_to_student_validate(){
        let navigateExtras : NavigationExtras = {
            skipLocationChange:true
        }
        this._router.navigate(["/studentvalidate"],navigateExtras)
    }
}