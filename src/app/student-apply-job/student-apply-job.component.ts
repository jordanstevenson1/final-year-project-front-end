import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService, Job } from '../web.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-apply-job',
  templateUrl: './student-apply-job.component.html',
  styleUrls: ['./student-apply-job.component.css']
})
export class StudentApplyJobComponent implements OnInit {
  job: Job | null = null;
  jobId: number = 0;
  hasApplied: boolean = false;

  application = {
    skills: '',
    experience: '',
    education: '',
    awards: ''
  };

  constructor(
    private route: ActivatedRoute,
    private webService: WebService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = parseInt(params['jobId'], 10);
      this.fetchJob(this.jobId);
    });
    const studentId = this.authService.getUserId();
    if (studentId) {
      this.fetchLatestApplication(studentId);
    }
  }
  
  fetchJob(jobId: number): void {
    this.webService.getJob(jobId).subscribe((response) => {
      this.job = response.job;
      const studentId = this.authService.getUserId();
      if (studentId) {
        this.checkIfApplied(studentId, jobId);
      }
    }, (error) => {
      console.log(error);
    });
  }

  checkIfApplied(studentId: number, jobId: number): void {
    this.webService.checkIfApplied(studentId, jobId).subscribe(response => {
      this.hasApplied = response.hasApplied;
      if (response.latestApplication) {
        this.application = {
          skills: response.latestApplication.skills,
          experience: response.latestApplication.experience,
          education: response.latestApplication.education,
          awards: response.latestApplication.awards,
        };
      }
    });
  }
  

  submitApplication(): void {
    const studentId = this.authService.getUserId();
    if (!studentId) {
      // Show a message to the user that they need to log in to submit an application
      return;
    }

    const applicationData = {
      ...this.application,
      studentId,
      jobId: this.jobId
    };

    this.webService.submitApplication(this.jobId, applicationData).subscribe((response) => {
      // Handle success, e.g., show a success message or redirect to another page
    }, (error) => {
      console.log(error);
      // Handle error, e.g., show an error message
    });
  }


  fetchLatestApplication(studentId: number): void {
    this.webService.getLatestApplication(studentId).subscribe(response => {
      console.log(response)
      if (response.latestApplication) {
        this.application = {
          skills: response.latestApplication.skills,
          experience: response.latestApplication.experience,
          education: response.latestApplication.education,
          awards: response.latestApplication.awards,
        };
      }
    });
  }
  
}
