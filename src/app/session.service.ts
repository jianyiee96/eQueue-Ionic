import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Customer } from './customer';
import { Store } from './store';
import { Notification } from './notification';

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
      return "/api/";
    }
  }

  getImageResourcePath(): string {

    if (this.platform.is('hybrid')) {
      return "http://192.168.137.1:8080/eQueue-war/resources/images/food/";
    }
    else {
      return "http://localhost:8080/eQueue-war/resources/images/food/";
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
    if (sessionStorage.currentCustomer != null) {
      return JSON.parse(sessionStorage.currentCustomer);
    } else {
      return null;
    }
  }

  setCurrentCustomer(currentCustomer: Customer): void {
    sessionStorage.currentCustomer = JSON.stringify(currentCustomer);
  }

  getNotifications(): Notification[] {
    if (sessionStorage.notifications != null) {
      return JSON.parse(sessionStorage.notifications);
    } else {
      return new Notification[0];
    }
  }

  setNotifications(notifications: Notification[]): void {
    sessionStorage.notifications = JSON.stringify(notifications);
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
