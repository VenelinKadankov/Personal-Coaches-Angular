import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { UserListComponent } from './user-list/user-list.component';
import { CoachInfoComponent } from './coach-info/coach-info.component';



@NgModule({
  declarations: [
    DetailsComponent,
    UserListComponent,
    CoachInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
