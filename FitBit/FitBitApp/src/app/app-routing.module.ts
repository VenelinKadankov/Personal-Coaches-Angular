import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AllCoursesComponent } from './course/all-courses/all-courses.component';
import { ErrorComponent } from './error/error/error.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    // component: HomeComponent
    component: AllCoursesComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
