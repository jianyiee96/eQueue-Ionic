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
export class DiningTableService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {

    this.baseUrl = this.sessionService.getRootPath() + 'DiningTable';
  }

  getMyTable(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveDiningTableByCustomerId?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }

  checkIn(code: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/checkIn?customerId=" + this.sessionService.getCurrentCustomer().customerId + "&code=" + code).pipe
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
