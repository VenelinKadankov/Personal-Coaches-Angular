import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
//import { CoursesRoutingModule } from './course/course-routing.module';
import { CourseModule } from './course/course.module';
import { MessageModule } from './message/message.module';
import { SharedModule } from './shared/shared.module';
//import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    CourseModule,
    MessageModule,
    BrowserAnimationsModule,
   // UserRoutingModule,
   // CoursesRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
