import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course/course.service';
import { ICourse } from 'src/app/Interfaces/course';
import { IUser } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.component.html',
  styleUrls: ['./coach-info.component.css']
})
export class CoachInfoComponent implements OnInit {
  @Input() coach: IUser | undefined;
  courses: ICourse[] | undefined | null;
  coursesCount: number = 0;

  constructor( private coursesService: CourseService) { }

  ngOnInit(): void {
    
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.coursesCount = courses.filter(c => c.createdBy == this.coach?.userId).length;
      },
      error: (err) => {
        // TODO: 
      }
    })
  }

}
