import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { ILoginUser } from '../Interfaces/loginUser';
import { IStorageUser } from '../Interfaces/storageUser';
import { environment } from "src/environments/environment";
import { IUser } from '../Interfaces/user';
import { tap } from 'rxjs/operators';
import { IUserToken } from '../Interfaces/userToken';

// const LocalStorage = new InjectionToken('LocalStorage');
const apiURL = environment.apiURL;

@Injectable()
export class UserService implements OnInit{

  jwtToken: string | any | undefined;

  storageUser: IStorageUser | undefined;
  loginUser: ILoginUser | undefined;
  userWithToken: IUserToken | undefined | null;
  user: IUser | undefined | null;
  errorLoadingUser = false;

  get isLogged(): boolean {
   // this.getUser().subscribe();
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const localStorageToken = localStorage.getItem('token') || 'ERROR';
      this.jwtToken = JSON.parse(localStorageToken);
    } catch {
      this.storageUser = undefined;
      this.jwtToken = undefined;
    }
  }

  ngOnInit(): void {
   // this.getUser().subscribe();
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
    let token = localStorage.getItem('token')!;

    if(!this.user || !this.user.userId){
      throw new Error("No user currenty logged!");
      ;
    }
    
    return this.http.post<IUser>(`${apiURL}/user/logout`, {},
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'uid': this.user?.userId! })
      }).pipe(
        tap(() => this.userWithToken = null)
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

  getUser() {
    let token = localStorage.getItem('token')!;

    // if(!this.user || !this.user.userId){
    //   throw new Error("No user currenty logged!");
    //   ;
    // }
    
    return this.http.get<IUser>(`${apiURL}/user/profile`, { 
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}`})//, 'uid': this.user?.userId! 
     }).pipe(
      tap((user) => this.user = user)
    );
  }
}