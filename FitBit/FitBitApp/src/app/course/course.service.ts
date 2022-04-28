import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnInit } from "@angular/core";
import { tap } from "rxjs";

import { ICourse } from "src/app/Interfaces/course";
import { environment } from "src/environments/environment";
import { UserService } from "../user/user.service";

const apiURL = environment.apiURL;

@Injectable()
export class CourseService {

  course: ICourse | undefined | null;

  allCourses: ICourse[] | undefined | null;
  myCourses: ICourse[] | undefined | null;
  isEditted: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {
    this.course = null;
  }

  //  ngOnInit(): void {
  //    let courseId = this.route.snapshot.paramMap.get('id')!;
  //   this.getSingleCourse(courseId);
  //  }

  update(id: string, title: string, content: string, imgs: string[], subscribers: string[], creatorId: string = '') {
    let token = this.GetToken();
    let creator = this.userService!.user!.userId;

    if(creatorId !== ''){
      creator = creatorId;
    }

    if (!this.userService.user || !this.userService.user.userId) {
      throw new Error("No user currenty logged!");
      ;
    }

    if (title && content && imgs && subscribers) {
      return this.http.put<boolean>(`${apiURL}/course/edit`,
        { id, title, content, 'images': imgs, creator, 'subscribers': subscribers || [] },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 'uid': this.userService.user?.userId!
          })
        }).pipe(
          tap((res) => this.isEditted = res)
        );
    } else {
      throw 'Unsuccessfull edit';
    }
  }

  getAllCourses() {
    let token = this.GetToken();

    return this.http.get<ICourse[]>(`${apiURL}/course/all`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap((courses) => this.allCourses = courses)
    );
  }

  getMyCourses(id: string) {
    let token = this.GetToken();

    return this.http.get<ICourse[]>(`${apiURL}/course/myCourses`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'uid': id
      })
    }).pipe(
      tap((courses) => this.myCourses = courses)
    );
  }

  getSingleCourse(id: string) {
    return this.http.get<ICourse>(`${apiURL}/course/chosencourse?id=${id}`).pipe(
      tap((course) => {
        this.course = course;
        localStorage.setItem('currentCourse', JSON.stringify(course))
      })
    );
  }


  deleteCourse(id: string) {
    let token = this.GetToken();

    return this.http.delete<boolean>(`${apiURL}/course/delete`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'uid': id
      })
    }).pipe(
      tap(() => this.allCourses = [])
    );
  }

  private GetToken() {
    return localStorage.getItem('token')!;
  }
}