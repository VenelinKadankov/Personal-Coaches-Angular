import { Component, Input, OnInit } from '@angular/core';

import { ICourse } from 'src/app/Interfaces/course';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course: ICourse | undefined;
  userId: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.user?.userId;
  }

}
