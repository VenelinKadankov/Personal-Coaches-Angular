import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course/course.service';
import { ICourse } from 'src/app/Interfaces/course';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user: IUser | undefined | null;
  myCourses:  ICourse[] | undefined | null;

  get userId(): string {
    return this.userService.user?.userId!;
  }

  constructor(private userService: UserService, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.courseService.getMyCourses(this.user!.userId).subscribe(
      {
        next: (courses) => this.myCourses = courses,
        error: () => this.router.navigate(['/login'])
      }
    )
  }

}
