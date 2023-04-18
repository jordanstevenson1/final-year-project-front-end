import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { throwError } from 'rxjs';




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
  bookmarkedText: string;
  errorMessage: string | null;
}

export interface StudentProfile {
  studentid: number;
  studentforename: string;
  studentsurname: string;
  dob: Date;
  email: string;
  courseid: number;
  coursetitle: string;
  courselevel: string;
  username: string;
  password: string;
}

export interface Application {
  applicationId: number;
  applicationDate: string;
  status: string;
  studentId: number;
  jobId: number;
  skills: string;
  experience: string;
  education: string;
  awards: string;
  recruiterComments: string;
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

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.API_URL}/students`, student)
      .pipe(
        catchError(error => {
          if (error.status === 400 && error.error.error === 'Email or username already exists') {
            return of({ errorMessage: 'Email or username already exists' });
          } else {
            return throwError(error);
          }
        })
      );
  }


  createRecruiter(recruiter: any): Observable<any> {
    return this.http.post(`${this.API_URL}/recruiters`, recruiter).pipe(
      catchError(error => {
        const errorMessage = error.error.message;
        console.error('Error creating recruiter:', errorMessage);
        return throwError(errorMessage);
      })
    );
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
    const userId = this.authService.getUserId();
    const body = { userId, jobId };
    return this.http.post(`${this.API_URL}/toggleBookmark`, body);
  }

  uploadJobsCSV(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/upload_jobs_csv`, formData);
  }

  getStudentProfile(): Observable<StudentProfile> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError('User ID not found in localStorage');
    }
    const options = { headers: headers };
    return this.http.get<StudentProfile>(`${this.API_URL}/student/${userId}`, options)
      .pipe(
        catchError(error => {
          console.error('Error getting student profile:', error);
          return throwError(error);
        })
      );
  }

  updateStudentProfile(profile: StudentProfile): Observable<any> {
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError('User ID not found in localStorage');
    }
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.put(`${this.API_URL}/student/${userId}`, profile, options)
      .pipe(
        catchError(error => {
          console.error('Error updating student profile:', error);
          return throwError(error);
        })
      );
  }

  getApplication(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/application/${id}`);
  }

  updateApplication(application: any, id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/application/${id}`, application);
  }

  updateApplicationinfo(application: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const applicationId = application.applicationid;
    const options = { headers: headers };
    return this.http.patch(`${this.API_URL}/application/${applicationId}`, application, options)
      .pipe(
        catchError(error => {
          console.error('Error updating application:', error);
          return throwError(error);
        })
      );
  }

  updateApplicationFields(id: number, fieldsToUpdate: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/application/${id}`, fieldsToUpdate);
  }

  getApplicationWithJob(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/application-with-job/${id}`);
  }

  getJob(jobId: number): Observable<{ job: Job }> {
    return this.http.get<{ job: Job }>(`${this.API_URL}/jobs/${jobId}`);
  }

  submitApplication(jobId: number, applicationData: any): Observable<{ message: string }> {
    const studentId = this.authService.getUserId();
    if (!studentId) {
      return throwError('User ID not found in localStorage');
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const payload = {
      ...applicationData,
      studentid: studentId,
      jobid: jobId,
    };

    // Update the endpoint here:
    return this.http.patch<{ message: string }>(`${this.API_URL}/submit-application`, payload, httpOptions);
  }


  checkIfApplied(studentId: number, jobId: number) {
    return this.http.get<{ message: string, hasApplied: boolean, latestApplication?: any }>(
      `${this.API_URL}/check-if-applied?studentid=${studentId}&jobid=${jobId}`
    );
  }


  getLatestApplication(studentId: number) {
    return this.http.get<{ message: string, latestApplication?: any }>(`${this.API_URL}/latest-application?studentid=${studentId}`);
  }


  getAllApplications(studentId: number): Observable<{ message: string, applications: Application[] }> {
    return this.http.get<{ message: string, applications: Application[] }>(`${this.API_URL}/all-applications?studentid=${studentId}`);
  }

  getRecruiterApplications(recruiterId: number): Observable<{ message: string, applications: Application[] }> {
    return this.http.get<{ message: string, applications: Application[] }>(`${this.API_URL}/recruiter-applications`, { params: { recruiterid: String(recruiterId) } });
  }


  getApplicationDetails(applicationId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/application/${applicationId}`);
  }


  reviewApplication(applicationId: number, status?: string, recruiterComments?: string): Observable<{ message: string }> {
    const updateData: any = { applicationid: applicationId };

    if (status) {
      updateData.status = status;
    }

    if (recruiterComments) {
      updateData.recruitercomments = recruiterComments;
    }

    return this.http.patch<{ message: string }>(`${this.API_URL}/update-application`, updateData);
  }

  sendInterviewEmail(
    studentEmail: string,
    interviewDate: string,
    interviewTime: string,
    teamsMeetingLink: string
  ): Observable<{ message: string }> {
    const payload = { email: studentEmail, interviewDate, interviewTime, teamsMeetingLink };
    return this.http.post<{ message: string }>(
      `${this.API_URL}/send_interview_email`,
      payload
    );
  }



}
