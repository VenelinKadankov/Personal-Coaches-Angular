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
    component: UserListComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'coach/:name',
    component: CoachInfoComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    }
  },
  {
    path: 'profile/:userId',
    component: DetailsComponent,
   canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      paramsActivateRedirectUrl: '/login',
      authenticationFailureRedirectUrl: '/',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }