import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ILoginUser } from '../Interfaces/loginUser';
import { IStorageUser } from '../Interfaces/storageUser';
import { environment } from "src/environments/environment";
import { IUser } from '../Interfaces/user';
import { Observable } from 'rxjs';

const LocalStorage = new InjectionToken('LocalStorage');
const apiURL = environment.apiURL;

@Injectable()
export class UserService {

  storageUser: IStorageUser | undefined;
  loginUser: ILoginUser | undefined;
  user: IUser | undefined;
  errorLoadingUser = false;

  get isLogged(): boolean {
    return !!this.storageUser;
  }

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage'], private http: HttpClient) {
    try {
      const localStorageUser = this.localStorage.getItem('<USER>') || 'ERROR';
      this.storageUser = JSON.parse(localStorageUser);
    } catch {
      this.storageUser = undefined;
    }
  }

  login(name: string, password: string): void | IUser {
      this.loginUser = {
          name,
          password
      }
      
    let result = this.http.post<IUser>(`${apiURL}/user/login`, this.loginUser).subscribe({
        next: (res) => { this.user = res },
        error: (error) => {
          console.log(error);
          this.errorLoadingUser = true;
        },
        complete: () => console.log('load courses stream completed')
      });

      this.storageUser = {
          name : this.user?.name,
          email : this.user?.email
      }

    this.localStorage.setItem('<USER>', JSON.stringify(this.storageUser));

    return this.user;
  }

  logout(): void {
    this.storageUser = undefined;
    this.localStorage.removeItem('<USER>');
  }
}