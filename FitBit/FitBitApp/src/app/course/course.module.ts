import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseService } from './course.service';
import { CoursesRoutingModule } from './course-routing.module';



@NgModule({
  declarations: [
    MyCoursesComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent,
    CourseListItemComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
