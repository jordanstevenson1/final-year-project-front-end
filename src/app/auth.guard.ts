import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn$.value;
      // If the user is not logged in and trying to access a protected route, redirect them to the root ('/')
    if (!isLoggedIn && state.url !== '/') {
      this.router.navigate(['/']);
      return false;
    }
      // If the user is logged in and trying to access the root ('/'), redirect them to their respective dashboard
    if (isLoggedIn && state.url === '/') {
      const userType = this.authService.getUserType();
      if (userType === 'student') {
        this.router.navigate(['/studentDashboard']);
      } else if (userType === 'recruiter') {
        this.router.navigate(['/recruiterDashboard']);
      }
      return false;
    }
  
    return true;
  }
}
