import {Component, OnInit} from "@angular/core";
import {WebcamImage} from 'ngx-webcam'
import { Observable, Subject } from "rxjs";
import { RetrieveService } from "../service/retrieve-details";
import { AuthenticationService } from "../service/vision-authentication";
declare var $: any;
declare var jQuery: any;
@Component({
    selector : "student-validate",
    templateUrl : "./student-validate.template.html",
    styleUrls : ["./student-validate.style.css"]
})
export class StudentValidateComponent implements OnInit{
    is_ajax_display :boolean = false
    attendece_record = new Array()
    constructor(private _retrieve_details : RetrieveService,
        private _auth : AuthenticationService){}
    rollnumber :string = ""
    teacher_name :string = ""
    subject_name :string = ""
    class_link :string = ""
    message :string = ""
    list_of_teachers = new Array()
    list_of_subjects = new Array()
    ngOnInit(): void {
        this.is_ajax_display = true;
        this.list_of_teachers = new Array()
        this.list_of_subjects = new Array()
        this._retrieve_details.get_all_teachers().subscribe((response:any)=>{
            console.log(response);
            for(let i = 0;i<response["data"].length;i++)
            {
                this.list_of_teachers.push(response["data"][i]);
            }
            this.is_ajax_display = false;
        });
    }
    webcamimage:any = ""
    private trigger:Subject<void> = new Subject<void>();

    public triggerSnapshot():void{
        this.trigger.next()
    }
    public handleImage(webcamImage: WebcamImage): void {
        console.info('Saved webcam image', webcamImage);
        this.webcamimage = webcamImage;
       }
        
       public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
       }
    public get_subjects(event:any){
        this.is_ajax_display = true;
        this.teacher_name = event.target.value;
        this.list_of_subjects = new Array()
        this._retrieve_details.get_all_subjects(this.teacher_name,this.rollnumber).subscribe((response:any)=>{
            console.log(response);
            for(let i=0;i<response["data"].length;i++)
                this.list_of_subjects.push(response["data"][i]);
            this.is_ajax_display = false;
        });
    }
    public display_camera(event:any){
        this.subject_name = event.target.value;
    }

    public do_validation(){
        
        this.message = ""
        this.class_link = ""
        if(this.teacher_name != "" && this.subject_name != "" && this.rollnumber != "" && this.webcamimage != "")
        {
            this.is_ajax_display = true;
            var blob = this.dataURItoBlob(this.webcamimage.imageAsDataUrl);
            let data = new FormData()
            data.append("teacher_name" , this.teacher_name)
            data.append("roll_number" , this.rollnumber)
            data.append("subject_name" , this.subject_name)
            data.append("uploaded_image" , blob)
            this._auth.do_authentication(data).subscribe((response:any)=>{
                if(response["success"]){
                    this.message = "Face Match( "
                    this.class_link = response["class_link"]
                }else{
                    this.message = "Face did not match,capture more clear picture( "
                }
                this.message += " match score :  " + response["similarity_score"]+")";
                this.is_ajax_display = false;
            });
        }else{
            this.message = "Enter All required Details"
        }   
    }
    public join_link()
    {
        let data = {
            "teacher_name" : this.teacher_name,
            "subject_name" : this.subject_name,
            "roll_number" : this.rollnumber
        }
        this.is_ajax_display = true;
        this._auth.save_joining_time(data).subscribe((response:any)=>{
            
            console.log(response)
            this.is_ajax_display = false;
            window.open(this.class_link,"_blank")

        })
    }

    public get_attendence_details()
    {
        this.is_ajax_display = true;
        this.attendece_record = new Array()
        let data = {
            "teacher_name" : this.teacher_name,
            "subject_name" : this.subject_name,
            "roll_number" : this.rollnumber
        }
        this._retrieve_details.extract_attendence_details(data).subscribe((response:any)=>{
            for(let i =0;i<response["data"].length ; i++)
                this.attendece_record.push(response["data"][i])
            this.is_ajax_display = false;
            console.log(this.attendece_record)
            jQuery("#exampleModal").modal('show');
        })
    }
    public dataURItoBlob(dataURI:any) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);
    
        //New Code
        return new Blob([ab], {type: mimeString});
    
    
    }

}
