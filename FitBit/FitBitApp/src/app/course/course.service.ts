import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

import { ICourse } from "src/app/Interfaces/course";
import { environment } from "src/environments/environment";
import { UserService } from "../user/userService";

const apiURL = environment.apiURL;

@Injectable()
export class CourseService {

  course: ICourse | undefined | null;
  allCourses: ICourse[] | undefined | null;
  myCourses: ICourse[] | undefined | null;
  isEditted: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) { }
  
  update(title: string, content: string, imgs: string[], subscribers: string[]){
    let token = this.GetToken();

    if(!this.userService.user || !this.userService.user.userId){
      throw new Error("No user currenty logged!");
      ;
    }

    if (title && content && imgs && subscribers) {
      return this.http.put<boolean>(`${apiURL}/course/edit`,
        {  },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 'uid': this.userService.user?.userId! }) }).pipe(
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
        'Authorization': `Bearer ${token}`})
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
        'uid': id})
     }).pipe(
      tap((courses) => this.myCourses = courses)
    );
  }

  getSingeCourse(id: string) {
    return this.http.get<ICourse>(`${apiURL}/course/chosencourse?id=${id}`);
  }

 
  deleteCourse(id: string){
    let token = this.GetToken();

    return this.http.delete<boolean>(`${apiURL}/course/delete?id=${id}`,{ 
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'uid': id})
     }).pipe(
      tap(() => this.allCourses = [])
    );
  }

  private GetToken(){
    return localStorage.getItem('token')!;
  }
}