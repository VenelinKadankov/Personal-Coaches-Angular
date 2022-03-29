import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public courseService: CourseService, private route: ActivatedRoute) { }

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
}
