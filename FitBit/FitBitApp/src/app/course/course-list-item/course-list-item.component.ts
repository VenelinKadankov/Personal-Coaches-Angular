import { Component, Input, OnInit } from '@angular/core';

import { ICourse } from 'src/app/Interfaces/course';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/user/user.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course: ICourse | undefined;
  userId: string | undefined;
  user: IUser | undefined | null;
  coaches: IUser[] | undefined | null;
  coachName: string | undefined | null;

  constructor(private userService: UserService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userId = this.userService.user?.userId;

    this.userService.getCoaches().subscribe({
      next: (coaches) => {
        this.coaches = coaches;
        this.coachName = coaches.find(c => c.userId == this.course?.createdBy)?.name;
      },
      error: (err) => {
        // TODO 
      }
    })
  }

  subscribe(courseId: string) {
    this.course?.subscribers.push(this.userId!);

    this.updateUser();
  }

  unsubscribe(courseId: string) {
    let userIndex = this.course?.subscribers.indexOf(this.userId!)
    this.course?.subscribers.splice(userIndex!, 1);

    this.updateUser();
  }

  private updateUser() {
    this.courseService.update(
      this.course!.id,
      this.course!.title,
      this.course!.content,
      this.course!.images,
      this.course!.subscribers,
      this.course!.createdBy
    ).subscribe();
  }
}
