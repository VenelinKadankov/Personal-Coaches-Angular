import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CourseService } from '../course.service';
import { ICourse } from 'src/app/Interfaces/course';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | undefined;
  userId: string | undefined;

  course: ICourse | undefined;
  errorLoadingCourse = false;
  deleteSuccess = false;

  constructor(public courseService: CourseService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.userId = this.userService.user!.userId;
    this.loadCourse();
  }

  loadCourse(): void{
    this.course = undefined;
    this.errorLoadingCourse = false;

    this.courseService.getSingleCourse(this.courseId!)
    .subscribe({
      next: (course) => { this.course = course },
      error: (error) => {
        console.error(error);
        this.errorLoadingCourse = true;
      },
      complete: () => console.log('load courses stream completed')
    });
  }

  onDelete(): void {
    if(this.courseId){
      this.courseService.deleteCourse(this.courseId!).subscribe({
        next: (result) => { this.deleteSuccess = result },
        error: (error) => {
          console.error(error);
        },
        complete: () => this.router.navigate(['/my-courses'])
      });
    }
  }
}
