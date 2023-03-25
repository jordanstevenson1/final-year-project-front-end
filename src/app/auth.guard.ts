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
