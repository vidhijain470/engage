import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AttendenceDetailsComponent } from './attendence-details/attendence-details.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { HomePageComponent } from './home/home.component';
import { StudentValidateComponent } from './student-validate/student-validate.component';

const routes: Routes = [
  {path : "home" , component : HomePageComponent},
  {path : "adminlogin" , component : AdminLoginComponent},
  {path : "adminhome" , component : AdminHomeComponent,children:[
    {path :"classdetails" , component : ClassDetailsComponent},
  {path : "attendencedetails" , component : AttendenceDetailsComponent},
  ]},
  {path : "studentvalidate" , component : StudentValidateComponent},
  {path : '' , redirectTo : '/home' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
