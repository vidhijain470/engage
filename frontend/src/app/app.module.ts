import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component"
import {HomePageComponent} from "./home/home.component"
import {AdminLoginComponent} from "./admin-login/admin-login.component"
import { LoginService } from './service/loginservice';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { AttendenceDetailsComponent } from './attendence-details/attendence-details.component';
import { RetrieveService } from './service/retrieve-details';
import {StudentValidateComponent} from "./student-validate/student-validate.component"
import {WebcamModule} from "ngx-webcam"
import { AuthenticationService } from './service/vision-authentication';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    ClassDetailsComponent,
    AttendenceDetailsComponent,
    StudentValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule
  ],
  providers: [LoginService,RetrieveService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
