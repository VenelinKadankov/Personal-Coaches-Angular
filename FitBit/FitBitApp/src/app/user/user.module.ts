import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { UserListComponent } from './user-list/user-list.component';
import { CoachInfoComponent } from './coach-info/coach-info.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserService } from './userService';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DetailsComponent,
    UserListComponent,
    CoachInfoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
