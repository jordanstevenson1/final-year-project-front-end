import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
  bookmarked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  createStudent(student: any) {
    return this.http.post(`${this.API_URL}/students`, student);
  }

  createRecruiter(recruiter: any) {
    return this.http.post(`${this.API_URL}/recruiters`, recruiter);
  }

  login(username: string, password: string, userType: string): Observable<any> {
    let endpoint = userType === 'student' ? '/login/student' : '/login/recruiter';
    return this.http.post(`${this.API_URL}${endpoint}`, { username, password });
  }


addBookmark(studentId: number, jobId: number): Observable<any> {
  return this.http.post(`${this.API_URL}/bookmarks/add`, { studentid: studentId, jobid: jobId });
}

removeBookmark(studentId: number, jobId: number): Observable<any> {
  return this.http.request('DELETE', `${this.API_URL}/bookmarks/remove`, { body: { studentid: studentId, jobid: jobId } });
}

getBookmarkedJobs(studentId: number): Observable<{ jobs: Job[] }> {
  return this.http.get<{ jobs: Job[] }>(`${this.API_URL}/bookmarks`, { params: { studentid: String(studentId) } });
}

toggleBookmark(jobId: number) {
  const userId = this.authService.getUserId(); // Add this method to the AuthService
  const body = { userId, jobId };
  return this.http.post(`${this.API_URL}/toggleBookmark`, body);
}


}
