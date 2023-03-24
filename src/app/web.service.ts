import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  jobid: number;
  companyid: number;
  industry: string;
  location: string;
  jobtitle: string;
  jobtype: string;
  description: string;
  salary: number;
  requiredskills: string;
  requiredqualifications: string;
  responsibilities: string;
  applicationdeadline: Date;
  recruiterid: number;
  dateposted: Date;
  companyname: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getJobs(page: number, pageSize: number): Observable<{ jobs: Job[], totalPages: number }> {
    return this.http.get<{ jobs: Job[], totalPages: number }>(`${this.API_URL}/jobs?page=${page}&pageSize=${pageSize}`);
  }



  searchJobs(location: string, jobTitle: string, industry: string, company: string): Observable<{ jobs: Job[] }> {
    let params = new HttpParams();
    if (location) {
      params = params.set('location', location);
    }
    if (jobTitle) {
      params = params.set('job_title', jobTitle);
    }
    if (industry) {
      params = params.set('industry', industry);
    }
    if (company) {
      params = params.set('company', company);
    }
    return this.http.get<{ jobs: Job[] }>(`${this.API_URL}/jobs/search`, { params });
  }
  
  getStudents() {
    return this.http.get('/students');
  }
  
   
}
