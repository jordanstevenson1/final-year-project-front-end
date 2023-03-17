import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getJobs(page: number, pageSize: number): Observable<{ jobs: Job[], totalPages: number }> {
    return this.http.get<{ jobs: Job[], totalPages: number }>(`${this.API_URL}/jobs?page=${page}&pageSize=${pageSize}`);
  }
}
