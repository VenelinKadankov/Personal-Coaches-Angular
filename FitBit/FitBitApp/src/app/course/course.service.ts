import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ICourse } from "src/app/Interfaces/course";
import { environment } from "src/environments/environment";

const apiURL = environment.apiURL;

// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  loadCourses() {
    let result = this.http.get<any>(`${apiURL}/course/all`);
    return result;
  }

  loadCourse(id: string) {
    return this.http.get<ICourse>(`${apiURL}/course/chosencourse?id=${id}`);
  }

  deleteCourse(id: string){
    return this.http.delete<boolean>(`${apiURL}/course/delete?id=${id}`);
  }
}