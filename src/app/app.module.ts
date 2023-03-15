import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { WebService } from './web.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NavComponent } from './nav/nav.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { JobComponent } from './job/job.component';
import { FormsModule } from '@angular/forms';

var routes: any = [
  {
    path: 'studentProfile',
    component: StudentProfileComponent
  },

  {
    path: 'studentDashboard',
    component: StudentDashboardComponent
  },

  {
    path: 'studentHome',
    component: StudentHomeComponent
  },
  {
    path: 'jobs',
    component: JobComponent
  }

  ];

@NgModule({
  declarations: [
    AppComponent, LoginComponent,StudentDashboardComponent, NavComponent, StudentProfileComponent, StudentHomeComponent, JobComponent],
  imports: [
    BrowserModule,
    HttpClientModule, RouterModule.forRoot(routes), FormsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
