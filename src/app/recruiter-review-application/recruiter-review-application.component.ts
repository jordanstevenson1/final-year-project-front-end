import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-recruiter-review-application',
  templateUrl: './recruiter-review-application.component.html',
  styleUrls: ['./recruiter-review-application.component.css']
})
export class RecruiterReviewApplicationComponent implements OnInit {
  applicationId: number | null = null;
  applicationDetails: any;
  application: any;
  job: any;
  student: any;
  course: any;
  updatedStatus: string = '';
  updatedRecruiterComments: string = '';
  availableStatuses: string[] = ['Applied', 'In Review', 'Interview', 'Offered', 'Rejected'];
  interviewDate: string = '';
  interviewTime: string = '';
  teamsMeetingLink: string = '';
  
  constructor(private route: ActivatedRoute, private webService: WebService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = +params.get('applicationId')!;
      this.loadApplicationDetails();
    });
  }

  loadApplicationDetails() {
    if (this.applicationId === null) {
      console.error('Application ID not provided in the route.');
      return;
    }

    this.webService.getApplicationDetails(this.applicationId).subscribe(response => {
      this.applicationDetails = response;
      
      //response object contains the properties 'application', 'job', 'student', and 'course'
      this.application = this.applicationDetails.application;
      this.job = this.applicationDetails.job;
      this.student = this.applicationDetails.student;
      this.course = this.applicationDetails.course;
    }, error => {
      console.error('Error loading application details:', error);
    });
  }

  reviewApplication(): void {
    if (this.applicationId === null) {
      console.error('Application ID not provided in the route.');
      return;
    }
  
    this.webService.reviewApplication(this.applicationId, this.updatedStatus, this.updatedRecruiterComments).subscribe(response => {
      alert('Application updated successfully');
      this.loadApplicationDetails();
    }, error => {
      console.error('Error updating application:', error);
      alert('Failed to update the application. Please try again.');
    });
  }
  

  sendInterviewEmail(): void {
    if (!this.student || !this.student.email) {
      console.error('Student email not available.');
      return;
    }
    
    this.webService.sendInterviewEmail(
      this.student.email, 
      this.interviewDate, 
      this.interviewTime, 
      this.teamsMeetingLink
    ).subscribe(response => {
      alert('Interview invitation email sent successfully');
    }, error => {
      console.error('Error sending interview invitation email:', error);
      alert('Failed to send the interview invitation email. Please try again.');
    });
  }
  



}
