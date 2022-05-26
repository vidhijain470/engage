import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RetrieveService } from "../service/retrieve-details";

@Component({
    selector : "attendence-details",
    templateUrl : "./attendence-details.template.html",
    styleUrls : ["./attendence-details.style.css"]
})

export class AttendenceDetailsComponent implements OnInit{
    username : string = ""
    subject_name : string = ""
    list_of_subjcets = new Array()
    list_of_students = new Array()
    attendece_record = new Array()
    is_ajax_display : boolean = false;
    constructor(private _activate_route :ActivatedRoute,
        private _retrieve_details : RetrieveService){}
    public ngOnInit(): void {
        this.is_ajax_display = true;
        this.list_of_subjcets = new Array()
        this.list_of_students = new Array()
        this._activate_route.queryParams.subscribe((data:any)=>{
            this.username = data["username"]
            this._retrieve_details.get_all_subjects(this.username).subscribe((response:any)=>{
                console.log(response)
                for(let i=0;i<response["data"].length ; i++)
                {
                    this.list_of_subjcets.push(response["data"][i]);
                }
                this.is_ajax_display = false;
            });
        })
        
    }

    public on_select_subject(event :any)
    {
        this.is_ajax_display = true;
        this.subject_name = ""
        this.list_of_students = new Array()
        this.subject_name = event.target.value
        this._retrieve_details.get_all_students(this.username,event.target.value).subscribe((response:any)=>{
            console.log(response)
            for(let i=0;i<response["data"].length ; i++)
                {
                    this.list_of_students.push(response["data"][i]);
                }
                this.is_ajax_display = false;
        });
    }

    public on_select_roll(event:any){
        this.is_ajax_display = true;
        this.attendece_record = new Array()
        let data = {
            "teacher_name" : this.username,
            "subject_name" : this.subject_name,
            "roll_number" : event.target.value
        }
        this._retrieve_details.extract_attendence_details(data).subscribe((response:any)=>{
            for(let i =0;i<response["data"].length ; i++)
                this.attendece_record.push(response["data"][i])
            this.is_ajax_display = false;
        })
    }
    
}