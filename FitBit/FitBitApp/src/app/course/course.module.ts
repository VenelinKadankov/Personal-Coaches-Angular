import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';



@NgModule({
  declarations: [
    MyCoursesComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CourseModule { }
