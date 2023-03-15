import { Component } from '@angular/core';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})




export class JobComponent {
  jobs: Job[] = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', salary: 100000 },
    { id: 2, title: 'Product Manager', company: 'Innovate Inc', location: 'San Francisco', salary: 120000},
    { id: 3, title: 'Data Scientist', company: 'Data Co', location: 'Seattle', salary: 110000 },
    { id: 4, title: 'UX Designer', company: 'Design Studio', location: 'Los Angeles', salary: 90000 }
  ];

  searchText = '';
  salaryFilter = '';

  search() {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.salaryFilter === '' || this.isJobWithinSalaryRange(job))
    );
  }

  isJobWithinSalaryRange(job: Job) {
    switch (this.salaryFilter) {
      case '1':
        return job.salary < 100000;
      case '2':
        return job.salary >= 100000 && job.salary < 120000;
      case '3':
        return job.salary >= 120000;
      default:
        return true;
    }
  }

}
