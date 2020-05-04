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
export class NotificationService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {

    this.baseUrl = this.sessionService.getRootPath() + 'Notification';
  }

  retrieveCustomerNotifications(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveCustomerNotifications?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }


  readNotification(notificationId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/readNotification?notificationId=" + notificationId).pipe
      (
        catchError(this.handleError)
      );
  }

  readAllNotification(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/readAllNotification?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/deleteNotification?notificationId=" + notificationId).pipe
      (
        catchError(this.handleError)
      );
  }

  deleteAllNotification(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/deleteAllNotification?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
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
