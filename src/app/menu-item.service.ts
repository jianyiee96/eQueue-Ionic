import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {

    this.baseUrl = this.sessionService.getRootPath() + 'Menu';
  }

  retrievePopularMenuItem(max: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrievePopularMenuItem?maxItem="+max).pipe
      (
        catchError(this.handleError)
      );
  }

  retrieveAllMenuItem(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllMenuItem").pipe
      (
        catchError(this.handleError)
      );
  }

  retrieveAllMenuItemByCategory(categoryId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllMenuItemByCategory?menuCategoryId=" + categoryId).pipe
      (
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error.message;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }

}
