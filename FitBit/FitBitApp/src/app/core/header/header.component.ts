import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faHearth = faHeart;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?.userId!;
  }

  get isCoach(): boolean {
    return this.userService.user?.role == 'Coach';
  }

  get username(): string {
    return this.userService.userWithToken?.user.name || '';
  }

  constructor(private userService: UserService, private router: Router) { }

  logout(): void {
    this.userService.logout().subscribe({
      next: () =>  this.router.navigate(['/']),
      error: (e) => window.alert(e.message)
    });
  }
}
