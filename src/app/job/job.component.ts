import { Component, OnInit } from '@angular/core';
import { WebService, Job } from '../web.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  pageSize: number = 4; // number of jobs present on screen
  pagesArray: number[] = [];
  selectedJob: Job | null = null;
  location: string = '';
  jobTitle: string = '';
  industry: string = '';
  company: string = '';
  errorMessage: string | null = null;


  constructor(private webService: WebService) {}

  ngOnInit() {
    this.loadJobs(this.currentPage, this.pageSize);
  }

  loadJobs(page: number, pageSize: number) {
    this.webService.getJobs(page, pageSize).subscribe((response) => {
      this.jobs = response.jobs;
      this.totalPages = response.totalPages;
      this.currentPage = page;
      this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
    }, (error) => {
      console.log(error);
    });
  }

  searchJobs(location: string, jobTitle: string, industry: string, company: string) {
    this.errorMessage = null;
    this.webService.searchJobs(location, jobTitle, industry, company).subscribe(
      (response) => {
        this.jobs = response.jobs;
        if (this.jobs.length === 0) {
          this.errorMessage = 'No jobs found for the given search criteria. Please try again.';
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'An error occurred while searching for jobs. Please try again.';
      }
    );
  }
  

  resetSearch() {
    this.location = '';
    this.jobTitle = '';
    this.industry = '';
    this.company = '';
    this.errorMessage = null;
    this.loadJobs(this.currentPage, this.pageSize);
  }
  
  goToPage(page: number) {
    this.loadJobs(page, this.pageSize);
    this.selectedJob = null;
  }

  showJobDetails(job: Job) {
    if (this.selectedJob === job) {
      this.selectedJob = null;
    } else {
      this.selectedJob = job;
    }
  }

  hideJobDetails() {
    this.selectedJob = null;
  }
}
