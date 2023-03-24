import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log("Successful response:", response);
        // Login successful, navigate to the appropriate dashboard
        const { userType } = response;
        if (userType === 'student') {
          this.router.navigate(['/studentDashboard']);
        } else if (userType === 'recruiter') {
          this.router.navigate(['/recruiterDashboard']);
        }
      },
      error: (error) => {
        console.log("Error response:", error);
        this.errorMessage = error.message;
      }
    });
  }
  
}
