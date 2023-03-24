import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userType: string | null = null;

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }

  isStudentDashboard(): boolean {
    return window.location.pathname.includes('/studentDashboard');
  }

  isRecruiterDashboard(): boolean {
    return window.location.pathname.includes('/recruiterDashboard');
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userType = user.userType;
      } else {
        this.userType = null;
      }
    });
  }
}
