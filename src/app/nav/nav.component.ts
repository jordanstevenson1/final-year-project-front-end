import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  userType: string | null = null;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  routerEventsSubscription: Subscription | null = null;
  authSubscription: Subscription | null = null;
  isLoggedInSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.userType = user.userType;
        console.log('userType:', this.userType);
      } else {
        this.userType = null;
      }
    });
  
    this.routerEventsSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.authService.checkAuth();
    });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }
}
