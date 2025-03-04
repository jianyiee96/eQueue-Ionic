import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Customer';
  }

  customerLogin(email: string, password: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/customerLogin?email=" + email + "&password=" + password).pipe
      (
        catchError(this.handleError)
      );
  }

  registerCustomer(newCustomer: Customer): Observable<any> {
    let registerCustomerReq = {
      "customer": newCustomer
    };

    return this.httpClient.put<any>(this.baseUrl + "/registerCustomer", registerCustomerReq, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }

  changePassword(oldPassword: String, newPassword: String): Observable<any> {
    let changePasswordReq = {
      "email": this.sessionService.getEmail(),
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }

    return this.httpClient.post<any>(this.baseUrl, changePasswordReq, httpOptions).pipe
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
