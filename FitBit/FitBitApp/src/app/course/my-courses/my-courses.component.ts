import { Component, OnInit } from '@angular/core';

import { CourseService } from '../course.service';
import { ICourse } from '../../Interfaces/course';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';



// reloadButtonHandler() {
//   this.loadUsers();
// }

// searchButtonHandler(searchInput: HTMLInputElement): void {
//   const { value } = searchInput;
//   this.loadUsers(value);
// }


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: ICourse[] | undefined;
  errorLoadingCourses = false;

  constructor(public courseService: CourseService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = undefined;
    this.errorLoadingCourses = false;

    this.courseService.getMyCourses(this.userService.user?.userId!)
    .subscribe({
      next: (courses) => { this.courses = courses },
      error: (err) => {
        this.errorLoadingCourses = true;
        this.router.navigate(['**', { 'status': err.status }]);
      },
      complete: () => console.log('load courses stream completed')
    });
  }
}
