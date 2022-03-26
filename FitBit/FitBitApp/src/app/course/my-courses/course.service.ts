import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICourse } from "src/app/Interfaces/course";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  loadCourses() {
    return this.http.get<ICourse[]>('https://localhost:44381/api/course/get');
  }

  loadCourse(id: string) {
    return this.http.get<ICourse>(`https://localhost:44381/api/course/get?id=${id}`);
  }
}