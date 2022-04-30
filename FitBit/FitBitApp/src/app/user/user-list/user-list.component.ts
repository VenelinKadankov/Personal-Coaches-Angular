import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  coaches: IUser[] | undefined | null;

  errorLoadingCoaches = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.errorLoadingCoaches = false;

    this.userService.getCoaches().subscribe({
      next: (coaches) => {
        this.coaches = coaches;
      },
      error: (err) => {
        this.errorLoadingCoaches = true;
        this.router.navigate(['**', { 'status': err.status }]);
      }
    });
  }

}
