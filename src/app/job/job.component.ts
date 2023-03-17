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
  pageSize: number = 10;

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.loadJobs(this.currentPage, this.pageSize);
  }

  loadJobs(page: number, pageSize: number) {
    this.webService.getJobs(page, pageSize).subscribe((response) => {
      this.jobs = response.jobs;
      this.totalPages = response.totalPages;
      this.currentPage = page;
    });
  }

  goToPage(page: number) {
    this.loadJobs(page, this.pageSize);
  }
}
