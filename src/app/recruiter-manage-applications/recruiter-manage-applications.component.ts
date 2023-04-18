import { Component, OnInit } from '@angular/core';
import { WebService, Application } from '../web.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-manage-applications',
  templateUrl: './recruiter-manage-applications.component.html',
  styleUrls: ['./recruiter-manage-applications.component.css']
})
export class RecruiterManageApplicationsComponent implements OnInit {
  applications: Application[] = [];

  constructor(private webService: WebService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadRecruiterApplications();
  }

  loadRecruiterApplications() {
    const recruiterId = this.authService.getUserId();
    if (!recruiterId) {
      console.error('Recruiter ID not found in localStorage');
      return;
    }

    this.webService.getRecruiterApplications(recruiterId).subscribe(response => {
      this.applications = response.applications;
    }, error => {
      console.error('Error loading recruiter applications:', error);
    });
  }

  onRowClick(applicationId: number) {
    // Handle the row click event here, e.g., navigate to a detailed view of the application.
    this.router.navigate(['/reviewApplication', applicationId]);
  }
  
}
