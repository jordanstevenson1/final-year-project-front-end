import { Component, OnInit } from '@angular/core';
import { WebService, Application } from '../web.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.css']
})
export class StudentApplicationsComponent implements OnInit {
  applications: Application[] = [];

  constructor(
    private webService: WebService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const studentId = this.authService.getUserId();
    if (studentId) {
      this.fetchAllApplications(studentId);
    }
  }

  fetchAllApplications(studentId: number): void {
    this.webService.getAllApplications(studentId).subscribe(response => {
      this.applications = response.applications;
    }, (error) => {
      console.log(error);
    });
  }
}
