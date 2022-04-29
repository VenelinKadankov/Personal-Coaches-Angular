import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { IUser } from '../../Interfaces/user';
import { tap } from 'rxjs/operators';
import { IUserToken } from '../../Interfaces/userToken';

const apiURL = environment.apiURL;

@Injectable()
export class UserService{

  jwtToken: string | any | undefined;

  userWithToken: IUserToken | undefined | null;
  user: IUser | undefined | null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const localStorageToken = localStorage.getItem('token') || 'ERROR';
      this.jwtToken = JSON.parse(localStorageToken);
    } catch {
      this.jwtToken = undefined;
    }
  }

  login(email: string, password: string) {
    if (email && password) {
      return this.http.post<IUserToken>(`${apiURL}/user/login`,
        { email, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(   // 'token': this.jwtToken!,
          tap((user) => {
            this.userWithToken = user;
            this.user = user.user;
            this.jwtToken = user.token;
            localStorage.setItem('token', user.token);
          })
        );
    } else {
      throw 'Unsuccessfull Login';
    }
  }

  logout() {
    let token = this.GetToken();

    if(!this.user || !this.user.userId){
      throw new Error("No user currenty logged!");
      ;
    }
    
    return this.http.post<IUser>(`${apiURL}/user/logout`, {},
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'uid': this.user?.userId! 
        })
      }).pipe(
        tap(() => 
        {
          this.user = null;
          localStorage.removeItem('token');
        })
      );
  }

  register(name: string, email: string, tel: string, profileImg: string, password: string) {
    if (email && password) {
      return this.http.post<IUserToken>(`${apiURL}/user/register`,
        { name, password, email, tel, profileImg, isAdmin: false, role: 'user', courses: [] },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
          tap((user) => this.userWithToken = user)
        );
    } else {
      throw 'Unsuccessfull register';
    }
  }

  update(name: string, email: string, tel: string, profileImg: string){
    let token = this.GetToken();

    if(!this.user || !this.user.userId){
      throw new Error("No user currenty logged!");
      ;
    }

    if (email && name) {
      return this.http.put<IUser>(`${apiURL}/user/edit`,
        { 'id': this.user.userId, name, email, tel, profileImg },
        { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'uid': this.user?.userId! 
        }) 
        }).pipe(
          tap((user) => this.user = user)
        );
    } else {
      throw 'Unsuccessfull edit';
    }
  }

  getUser() {
    let token = this.GetToken();

    return this.http.get<IUser>(`${apiURL}/user/profile`, { 
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}`})//, 'uid': this.user?.userId! 
     }).pipe(
      tap((user) => this.user = user)
    );
  }

  getCoaches() {
    return this.http.get<IUser[]>(`${apiURL}/user/coaches`, {});
  }

  GetToken(){
    return localStorage.getItem('token')!;
  }
}