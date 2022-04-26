import { Component, Input, OnInit } from '@angular/core';

import { ICourse } from 'src/app/Interfaces/course';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course: ICourse | undefined;
  userId: string | undefined;
  user: IUser | undefined | null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userId = this.userService.user?.userId;
  }

}
