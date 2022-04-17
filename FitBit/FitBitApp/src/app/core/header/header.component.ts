import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/user/userService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faHearth = faHeart;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.userWithToken?.user.name || '';
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () =>  this.router.navigate(['/']),
      error: (e) => window.alert(e.message)
    });
  }
}
