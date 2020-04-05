import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Customer } from './customer';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private platform: Platform) { }

  getRootPath(): string {

    if (this.platform.is('hybrid')) {
      return "http://192.168.137.1:8080/eQueue-rws/Resources/";
    }
    else {
      return "http://localhost:8080/eQueue-rws/Resources/";
    }
  }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    }
    else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getEmail(): string {
    return sessionStorage.email;
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(sessionStorage.currentCustomer);
  }

  setCurrentCustomer(currentCustomer: Customer): void {
    sessionStorage.currentCustomer = JSON.stringify(currentCustomer);
  }

  setEmail(email: string): void {
    sessionStorage.email = email;
  }

  getPassword(): string {
    return sessionStorage.password;
  }

  setPassword(password: string): void {
    sessionStorage.password = password;
  }

  setStore(store: Store): void {
    sessionStorage.store = JSON.stringify(store);
  }

  getStore(): Store {
    return JSON.parse(sessionStorage.store);
  }

}
