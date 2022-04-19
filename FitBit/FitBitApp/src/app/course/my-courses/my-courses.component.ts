import { Component, OnInit } from '@angular/core';

import { CourseService } from '../course.service';
import { ICourse } from '../../Interfaces/course';
import { UserService } from 'src/app/user/userService';



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

  constructor(public courseService: CourseService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = undefined;
    this.errorLoadingCourses = false;

    this.courseService.getMyCourses(this.userService.user?.userId!)
    .subscribe({
      next: (courses) => { this.courses = courses },
      error: (error) => {
        console.log(error);
        this.errorLoadingCourses = true;
      },
      complete: () => console.log('load courses stream completed')
    });
  }
}
