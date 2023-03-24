import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onStudentSubmit() {
    console.log('Submitting student form...');
    this.http.post('http://localhost:5000/students', this.student)
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

  onRecruiterSubmit() {
    console.log('Submitting recruiter form...');
    this.http.post('http://localhost:5000/recruiters', this.recruiter)
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
