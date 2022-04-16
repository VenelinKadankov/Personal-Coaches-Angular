import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ILoginUser } from '../Interfaces/loginUser';
import { IStorageUser } from '../Interfaces/storageUser';
import { environment } from "src/environments/environment";
import { IUser } from '../Interfaces/user';
import { tap } from 'rxjs/operators';
import { IUserToken } from '../Interfaces/userToken';

// const LocalStorage = new InjectionToken('LocalStorage');
const apiURL = environment.apiURL;

@Injectable()
export class UserService {

  jwtToken: string | any | undefined;

  storageUser: IStorageUser | undefined;
  loginUser: ILoginUser | undefined;
  user: IUserToken | undefined | null;
  errorLoadingUser = false;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      // const localStorageUser = localStorage.getItem('<USER>') || 'ERROR';
      // this.storageUser = JSON.parse(localStorageUser);

      const localStorageToken = localStorage.getItem('token') || 'ERROR';
      this.jwtToken = JSON.parse(localStorageToken);
    } catch {
      this.storageUser = undefined;
      this.jwtToken = undefined;
    }
  }

  // login(name: string, password: string) {
  //     this.loginUser = {
  //         name,
  //         password
  //     }

  //   let result = this.http.post<IUser>(`${apiURL}/user/login`, this.loginUser).subscribe({
  //       next: (res) => { this.user = res },
  //       error: (error) => {
  //         console.log(error);
  //         this.errorLoadingUser = true;
  //       },
  //       complete: () => console.log('load courses stream completed')
  //     });

  //     this.storageUser = {
  //         name : this.user?.name,
  //         email : this.user?.email
  //     }

  //   this.localStorage.setItem('<USER>', JSON.stringify(this.storageUser));

  //   return this.user;
  // }

  login(email: string, password: string) {
    if (email && password) {
      //this.getToken(email, password);

      // if (this.jwtToken == undefined) {
      //   throw 'Unsuccessfull Login';
      // }

      return this.http.post<IUserToken>(`${apiURL}/user/login`,
        { email, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(   // 'token': this.jwtToken!,
          tap((user) => {
            this.user = user;
            this.jwtToken = user.token;
            localStorage.setItem('token', user.token);
          })
        );
    } else {
      throw 'Unsuccessfull Login';
    }
  }

  logout() {
    let token = localStorage.getItem('<token>')!;

    return this.http.post<IUser>(`${apiURL}/user/logout`, {},
      {
        headers: new HttpHeaders({ 'token': token }),
        withCredentials: true
      }).pipe(
        tap(() => this.user = null)
      );
  }

  register(name: string, email: string, tel: string, password: string) {
    if (email && password) {
      return this.http.post<IUserToken>(`${apiURL}/user/register`,
        { name, password, email, isAdmin: false, role: 'user', courses: [] },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
          tap((user) => this.user = user)
        );
    } else {
      throw 'Unsuccessfull register';
    }
  }

  // getUser() {
  //   return this.http.get<IUser>(`${apiURL}/user/profile`, { withCredentials: true }).pipe(
  //     tap((user) => this.user = user)
  //   );
  // }

  // private getToken(email: string, password: string) {
  //   return this.http.post(`${apiURL}/token`, { email, password },
  //     { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(
  //       // tap((token) => 
  //       // {
  //       //   this.jwtToken = token;
  //       //   console.log(token);
  //       //   localStorage.setItem('<token>', JSON.stringify(token));
  //       // })
  //       {
  //         next: (token) => {
  //           this.jwtToken = token;
  //           localStorage.setItem('<token>', JSON.stringify(token));
  //           console.log(token);
  //         },
  //         error: (err) => console.log(err)
  //         // localStorage.setItem('<token>', JSON.stringify(token));
  //       }
  //     );
  // }

  // logout(): void {
  //   this.storageUser = undefined;
  //   this.localStorage.removeItem('<USER>');
  // }
}