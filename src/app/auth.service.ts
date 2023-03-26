import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000';
  userSubject = new BehaviorSubject<{ username: string, userType: string } | null>(null);
  public user$ = this.userSubject.asObservable();
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { username, password }).pipe(
      tap((response: any) => {
        this.handleLoginSuccess(response);
      }),
      catchError((error: any) => {
        this.handleLoginError(error);
        throw error;
      })
    );
  }
  

  handleLoginSuccess(response: any): void {
    console.log("Successful response:", response);
    // Login successful, store user data in session storage
    const { username, userType, id } = response;
    console.log("Storing user data:", { username, userType, id }); // Add this line
    sessionStorage.setItem('user', JSON.stringify({ username, userType, id }));
    this.isLoggedIn$.next(true);
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
    // Check if the error status is 401 (Unauthorized)
    if (error.status === 401) {
      throw new Error('Invalid username or password');
    } else {
      throw new Error('An error occurred while logging in. Please try again later.');
    }
  }
  
  getUserId(): number | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }
  

  logout() {
    sessionStorage.removeItem('user');
    this.isLoggedIn$.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  checkAuth() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { username, userType } = JSON.parse(user);
      this.isLoggedIn$.next(true);
      this.userSubject.next({ username, userType });
    } else {
      this.isLoggedIn$.next(false);
      this.userSubject.next(null);
    }
  }

  getUserType(): string | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).userType : null;
  }
}
