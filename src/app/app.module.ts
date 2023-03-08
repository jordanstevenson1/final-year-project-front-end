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

  ];

@NgModule({
  declarations: [
    AppComponent, LoginComponent,StudentDashboardComponent, NavComponent, StudentProfileComponent, StudentHomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule, RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
