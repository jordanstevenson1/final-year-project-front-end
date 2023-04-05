import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NavComponent } from './nav/nav.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { JobComponent } from './job/job.component';
import { FormsModule } from '@angular/forms';
import { WebService } from './web.service';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { AuthService } from './auth.service';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';
import { StudentBookmarksComponent } from './student-bookmarks/student-bookmarks.component';
import { UploadJobsComponent } from './upload-jobs/upload-jobs.component';
import { InterviewTipsComponent } from './interview-tips/interview-tips.component';
import { CommonModule } from '@angular/common';
import { StudentApplyJobComponent } from './student-apply-job/student-apply-job.component';
import { StudentApplicationsComponent } from './student-applications/student-applications.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studentProfile',
    component: StudentProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studentDashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studentHome',
    component: StudentHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs',
    component: JobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'SignUp',
    component: UserSignupComponent
  },
  {
    path: 'recruiterDashboard',
    component: RecruiterDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookmarks',
    component: StudentBookmarksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uploadJobs',
    component: UploadJobsComponent
  },
  {
    path: 'interviewTips',
    component: InterviewTipsComponent
  },
  {
    path: 'applyJob/:jobId',
    component: StudentApplyJobComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentDashboardComponent,
    NavComponent,
    StudentProfileComponent,
    StudentHomeComponent,
    JobComponent,
    RecruiterDashboardComponent,
    UserSignupComponent,
    FooterComponent,
    StudentBookmarksComponent,
    UploadJobsComponent,
    InterviewTipsComponent,
    StudentApplyJobComponent,
    StudentApplicationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule
    
  ],
  providers: [
    WebService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
