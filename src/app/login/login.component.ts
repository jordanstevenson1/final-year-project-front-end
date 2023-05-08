import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Perform login using AuthService
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {}, 
      error: (error) => {
        console.log("Error response:", error);
        this.errorMessage = error.message;
      }
    });
  }

    // Toggle password visibility on the UI
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit() {
  }
}
