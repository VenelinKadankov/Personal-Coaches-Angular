import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CourseService } from '../course.service';
import { ICourse } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  id: string | undefined;

  course: ICourse | undefined;
  errorLoadingCourse = false;
  deleteSuccess = false;

  constructor(public courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  loadCourse(): void{
    this.course = undefined;
    this.errorLoadingCourse = false;

    this.courseService.loadCourse(this.id!)
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
    if(this.id){
      this.courseService.deleteCourse(this.id!).subscribe({
        next: (result) => { this.deleteSuccess = result },
        error: (error) => {
          console.error(error);
        },
        complete: () => this.router.navigate(['/my-courses'])
      });
    }
  }
}
