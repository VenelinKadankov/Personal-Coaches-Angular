import { Routes, RouterModule } from '@angular/router';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

const routes: Routes = [
  {
    path: 'my-courses',   //     /:id'  when I have logged user,
    component: MyCoursesComponent
    // TODO: Guard
  },
  {
    path: 'my-courses/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'course/:id/edit',
    component: CourseEditComponent,
   // canActivate: [ParamsActivate],
    // data: {
    //   paramsActivate: ['id'],
    //   paramsActivateRedirectUrl: '/user-list'
    // }
  },
  {
    path: 'course/create',
    component: CourseCreateComponent
    // TODO: Guard
  }
];

export const CoursesRoutingModule = RouterModule.forChild(routes);