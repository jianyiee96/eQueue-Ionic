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
export class QueueService {

  baseUrl: string;
  myId: number;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Queue';
  }

  getMyQueue(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveQueueByCustomerId?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }

  joinQueue(pax: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/joinQueue?customerId=" + this.sessionService.getCurrentCustomer().customerId + "&pax=" + pax).pipe
      (
        catchError(this.handleError)
      );

  }

  leaveQueue(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/leaveQueue?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
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
