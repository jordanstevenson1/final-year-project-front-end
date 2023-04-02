import { Component, OnInit } from '@angular/core';
import { WebService, Job } from '../web.service';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-student-bookmarks',
  templateUrl: './student-bookmarks.component.html',
  styleUrls: ['./student-bookmarks.component.css']
})
export class StudentBookmarksComponent implements OnInit {
  bookmarkedJobs: Job[] = [];
  errorMessage: string = '';

  constructor(private webService: WebService, private authService: AuthService) {}

  ngOnInit(): void {
    const studentId = this.authService.getUserId();
    if (studentId) {
      this.webService.getBookmarkedJobs(+studentId).subscribe( // Cast studentId to number using '+' operator
        (data) => {
          this.bookmarkedJobs = data.jobs;
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching bookmarked jobs';
        }
      );
    }
  }

  onViewJobDetails(job: Job): void {
    // Implement code to show the job details page for the selected job
  }
}
