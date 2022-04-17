import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from '../../user/userService';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user: IUser | undefined | null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

}
