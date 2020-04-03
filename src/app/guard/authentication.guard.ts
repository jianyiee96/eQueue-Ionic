import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../session.service';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
    private sessionService: SessionService) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    try {

      console.log("AuthenticateGuard: " + next.url[0]);

      if (next.url[0].path == "register" || next.url[0].path == "login") {

        if (this.sessionService.getIsLogin()) {
          this.router.navigate(['/home']);
        } else {
          return true;
        }

      } else {

        if (this.sessionService.getIsLogin()) {
          return true;
        } else {
          this.router.navigate(['/login']);
        }


      }

    } catch (error) {
      if (this.sessionService.getIsLogin()) {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    }

    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
