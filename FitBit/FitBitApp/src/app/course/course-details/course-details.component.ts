import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CourseService } from '../course.service';
import { ICourse } from 'src/app/Interfaces/course';
import { UserService } from 'src/app/core/services/user.service';

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
    this.userId = this.userService.user?.userId;
    this.loadCourse();
  }

  loadCourse(): void{
    this.course = undefined;
    this.errorLoadingCourse = false;

    this.courseService.getSingleCourse(this.courseId!)
    .subscribe({
      next: (course) => { this.course = course },
      error: (err) => {
        this.errorLoadingCourse = true;
        this.router.navigate(['**', { 'status': err.status }]);
      },
      complete: () => console.log('load courses stream completed')
    });
  }

  deleteCourse(): void {
    if(!confirm("Are you sure you want to delete that course?")){
      return;
    }

    if(this.courseId){
      this.courseService.deleteCourse(this.courseId!).subscribe({
        next: (result) => { this.deleteSuccess = result },
        error: (err) => {
          this.router.navigate(['**', { 'status': err.status }]);
        },
        complete: () => this.router.navigate(['/my-courses'])
      });
    }
  }
}
