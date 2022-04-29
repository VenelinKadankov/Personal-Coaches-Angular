import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course/course.service';
import { ICourse } from 'src/app/Interfaces/course';
import { IUser } from 'src/app/Interfaces/user';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.component.html',
  styleUrls: ['./coach-info.component.css']
})
export class CoachInfoComponent implements OnInit {
  @Input() coach: IUser | undefined;
  courses: ICourse[] | undefined | null;
  user: IUser | undefined | null;
  coursesCount: number = 0;

  constructor(private coursesService: CourseService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.coursesCount = courses.filter(c => c.createdBy == this.coach?.userId).length;
      },
      error: (err) => {
        this.router.navigate(['**', { 'status': err.status }]);
      }
    })

    this.userService.getUser().subscribe({
      next: (user) => this.user = user,
      error: (err) => this.router.navigate(['**', { 'status': err.status }])
    })
  }
}
