import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-year-project';
  isLoggedIn$: Observable<boolean>;
  userType: string | null;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.checkAuth();
    this.userType = this.authService.getUserType();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
