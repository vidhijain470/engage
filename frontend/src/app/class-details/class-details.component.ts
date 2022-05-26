import { HttpEventType } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RetrieveService } from "../service/retrieve-details";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
    selector : "class-details",
    templateUrl : "./class-details.template.html",
    styleUrls : ["./class-details.style.css"]
})

export class ClassDetailsComponent implements OnInit{
    subject_name : string = ""
    class_link :string = ""
    roll_number : string = ""
    student_photo :any = ""
    message : string = ""
    teacher_name :string = ""
    message_color : string = "red";
    img_src :any = "";
    is_ajax_display :boolean = false;
    constructor(private retrieve_service : RetrieveService,
        private _activate_route : ActivatedRoute,
        private sanitizer:DomSanitizer){

    }
    public ngOnInit(): void {
        this._activate_route.queryParams.subscribe((data:any)=>{
            this.teacher_name = data["username"]
        })
    }
    public changeInFileInput(event:any){
        this.student_photo = event.target.files[0];
        this.img_src = URL.createObjectURL(this.student_photo);
        this.img_src = this.sanitizer.bypassSecurityTrustUrl(this.img_src);
    }
    public submit_student_details()
    {
        this.is_ajax_display = true;
        this.message = "";
        this.message_color = "red";
        if(this.subject_name != "" && this.class_link != "" &&
        this.roll_number != "" && this.student_photo != ""){
            const formdata = new FormData()
            formdata.append("teacher_name" , this.teacher_name);
            formdata.append("subject_name" , this.subject_name);
            formdata.append("class_link" , this.class_link);
            formdata.append("roll_number" , this.roll_number);
            formdata.append("student_photo" , this.student_photo);
            this.retrieve_service.submit_student_record(formdata).subscribe((event:any)=>{
                this.message_color = "green";
                this.message = "File upload sucessfully!"
                this.is_ajax_display = false;
                this.roll_number  = ""
                this.student_photo  = ""
                this.img_src = ""
            });
            
        }else{
            this.message_color = "red";
            this.message = "Enter All Details";
        }
    }
}