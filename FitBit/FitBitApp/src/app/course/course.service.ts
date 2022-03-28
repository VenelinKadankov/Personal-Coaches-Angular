import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { ICourse } from "src/app/Interfaces/course";

// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  loadCourses() {
    let result = this.http.get<any>('https://localhost:44381/api/course/all');
    return result;
  }

  loadCourse(id: string) {
    return this.http.get<ICourse>(`https://localhost:44381/api/course/chosencourse?id=${id}`);
  }
}