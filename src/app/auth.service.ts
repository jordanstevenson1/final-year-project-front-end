import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000';
  userSubject = new BehaviorSubject<{ username: string, userType: string } | null>(null);
  public user$ = this.userSubject.asObservable();
  public isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { username, password });
  }

  handleLoginSuccess(response: any): void {
    console.log("Successful response:", response);
    // Login successful, store user data in session storage
    const { username, userType } = response;
    sessionStorage.setItem('user', JSON.stringify({ username, userType }));
    this.isLoggedIn = true;
    this.userSubject.next({ username, userType });
    // Navigate to the appropriate dashboard
    if (userType === 'student') {
      this.router.navigate(['/studentDashboard']);
    } else if (userType === 'recruiter') {
      this.router.navigate(['/recruiterDashboard']);
    }
  }

  handleLoginError(error: any): void {
    console.log("Error response:", error);
    this.isLoggedIn = false;
    this.userSubject.next(null);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  checkAuth() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { username, userType } = JSON.parse(user);
      this.isLoggedIn = true;
      this.userSubject.next({ username, userType });
    } else {
      this.isLoggedIn = false;
      this.userSubject.next(null);
    }
  }
}
