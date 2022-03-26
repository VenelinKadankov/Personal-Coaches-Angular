import { Routes, RouterModule } from '@angular/router';
import { CoachInfoComponent } from './coach-info/coach-info.component';
import { DetailsComponent } from './details/details.component';
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
    path: 'profile',     //      /:id' when I have logged user,
    component: DetailsComponent,
   // canActivate: [ParamsActivate],
    // data: {
    //   paramsActivate: ['id'],
    //   paramsActivateRedirectUrl: '/user-list'
    // }
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);