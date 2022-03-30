import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesRoutingModule } from './course/course-routing.module';
import { CourseModule } from './course/course.module';
import { MessageModule } from './message/message.module';
import { SharedModule } from './shared/shared.module';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserRoutingModule,
    CoursesRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
    CourseModule,
    MessageModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
