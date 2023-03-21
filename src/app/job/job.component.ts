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
  pageSize: number = 2;
  pagesArray: number[] = [];
  selectedJob: Job | null = null;

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
    });
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
