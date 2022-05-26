import  {Component, OnInit} from "@angular/core";
import { ActivatedRoute, NavigationExtras, NavigationStart, Router } from "@angular/router";

@Component({
    selector : "admin-home",
    templateUrl : "./admin-home.template.html",
    styleUrls : ["./admin-home.style.css"]
})

export class AdminHomeComponent implements OnInit{
    username : string = ""
    constructor(private _router : Router,
        private _activate_route : ActivatedRoute){
        
    }
    public ngOnInit(): void {
        this._activate_route.queryParams.subscribe((data:any)=>{
            this.username = data["username"]
        })
    }
    public go_to_class_entry_page()
    {
        let navigate_extracts:NavigationExtras = {
            queryParams :{
                username : this.username
            },
            skipLocationChange :true
        }
        this._router.navigate(["/adminhome/classdetails"],navigate_extracts)
    }
    public go_to_attendence_details_page()
    {
        let navigate_extracts:NavigationExtras = {
            queryParams :{
                username : this.username
            },
            skipLocationChange :true
        }
        this._router.navigate(["/adminhome/attendencedetails"],navigate_extracts)
    }
}