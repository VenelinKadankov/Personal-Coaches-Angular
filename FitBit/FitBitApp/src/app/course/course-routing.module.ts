import { Routes, RouterModule } from '@angular/router';
import { AuthActivate } from '../core/guard/auth.activate';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

const routes: Routes = [
  {
    path: 'my-courses',
    component: MyCoursesComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'my-courses/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'my-courses/:id/edit',
    component: CourseEditComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'course/create',
    component: CourseCreateComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  }
];

export const CoursesRoutingModule = RouterModule.forChild(routes);