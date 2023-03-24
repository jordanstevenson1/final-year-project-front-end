import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent {
  student: any = {};

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Submitting form...');
    this.http.post('http://localhost:5000/students', this.student)
      .subscribe({
        next: (data) => {
          console.log('Success!', data);
          this.student = {};
        },
        error: (error) => {
          console.log('Error!', error);
        }
      });
  }  
}