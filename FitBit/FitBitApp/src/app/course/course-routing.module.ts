import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivate } from '../core/guard/auth.activate';
import { AllCoursesComponent } from './all-courses/all-courses.component';
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
    path: 'my-courses/:id/edit',
    component: CourseEditComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '',
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
    path: 'course/create',
    component: CourseCreateComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'all-courses',
    component: AllCoursesComponent,
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    }
  }
  ,
  {
    path: 'all-courses/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/register',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
// export const CoursesRoutingModule = RouterModule.forChild(routes);