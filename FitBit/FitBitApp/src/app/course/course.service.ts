import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICourse } from "src/app/Interfaces/course";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  loadCourses() {
    let result = this.http.get<ICourse[]>('https://localhost:44381/api/course/all');
    result.forEach(course => console.log(course.toString()));
    return result;
  }

  loadCourse(id: string) {
    return this.http.get<ICourse>(`https://localhost:44381/api/course/chosencourse?id=${id}`);
  }
}