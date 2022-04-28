import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  errorMessage: string;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    this.errorMessage = activatedRoute.snapshot.queryParams['error'];
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
