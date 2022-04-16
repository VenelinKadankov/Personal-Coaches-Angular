import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivate } from '../core/guard/auth.activate';
import { CoachInfoComponent } from './coach-info/coach-info.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'our-coaches',
    component: UserListComponent
    // TODO: there should be filtering if the user is logged-in
  },
  {
    path: 'my-coaches',
    component: UserListComponent
    // TODO: Guard
  },
  {
    path: 'coach/:name',
    component: CoachInfoComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',     //      /:id' when I have logged user,
    component: DetailsComponent,
   canActivate: [AuthActivate],
    data: {
      paramsActivate: ['id'],
      paramsActivateRedirectUrl: '/user-list'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }