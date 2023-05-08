import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WebService } from '../web.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  student: any = {};
  recruiter: any = {};
  isStudentForm = true;
  signupSuccess = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private webService: WebService) {}

  // Submit student form and create a student user
  onStudentSubmit() {
    console.log('Submitting student form...');
    this.webService.createStudent(this.student).subscribe({
      next: (data) => {
        if (data.errorMessage) {
          this.errorMessage = data.errorMessage;
        } else {
          console.log('Success!', data);
          this.signupSuccess = true;
        }
      },
      error: (error) => {
        console.log('Error!', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    });
  }  
  
  // Submit recruiter form and create a recruiter user
  onRecruiterSubmit() {
    console.log('Submitting recruiter form...');
    this.http.post('http://localhost:5000/recruiters', this.recruiter)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Username or password already exists - Try again.';
          return throwError(error);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Success!', data);
          this.signupSuccess = true;
        },
        error: (error) => {
          console.log('Error!', error);
        }
      });
  }

  showStudentForm() {
    this.isStudentForm = true;
  }

  showRecruiterForm() {
    this.isStudentForm = false;
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
