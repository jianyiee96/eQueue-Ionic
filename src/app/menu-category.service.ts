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
export class MenuCategoryService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {

    this.baseUrl = this.sessionService.getRootPath() + 'Menu';
  }

  retrieveTopCategories(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllTopMenuCategory").pipe
      (
        catchError(this.handleError)
      );
  }

  retrieveCategoryByParent(categoryId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllCategoryByParent?menuCategoryId=" + categoryId).pipe
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
