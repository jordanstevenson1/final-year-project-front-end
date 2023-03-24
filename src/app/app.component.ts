import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-year-project';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
