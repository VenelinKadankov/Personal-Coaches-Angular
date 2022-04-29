import { Component, OnInit } from '@angular/core';

import { CourseService } from '../course.service';
import { ICourse } from '../../Interfaces/course';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: ICourse[] | undefined;
  errorLoadingCourses = false;

  constructor(public courseService: CourseService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = undefined;
    this.errorLoadingCourses = false;

    this.courseService.getAllCourses()
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




// reloadButtonHandler() {
//   this.loadUsers();
// }

// searchButtonHandler(searchInput: HTMLInputElement): void {
//   const { value } = searchInput;
//   this.loadUsers(value);
// }
