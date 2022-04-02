import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IStorageUser } from '../Interfaces/storageUser';

const LocalStorage = new InjectionToken('LocalStorage');

@Injectable()
export class UserService {

  user: IStorageUser | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    try {
      const localStorageUser = this.localStorage.getItem('<USER>') || 'ERROR';
      this.user = JSON.parse(localStorageUser);
    } catch {
      this.user = undefined;
    }
  }

  login(email: string, password: string): void {
    this.user = {
      email,
      name: 'Temp Name' // TODO: take real name
    }

    this.localStorage.setItem('<USER>', JSON.stringify(this.user));
  }

  logout(): void {
    this.user = undefined;
    this.localStorage.removeItem('<USER>');
  }
}