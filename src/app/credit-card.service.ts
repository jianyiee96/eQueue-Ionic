import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { CreditCard } from './credit-card';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CreditCardService {

  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {
    this.baseUrl = this.sessionService.getRootPath() + 'CreditCard';
  }

  createNewCreditCard(newCreditCard: CreditCard): Observable<any> {
    let createCreditCardReq = {
      "email": this.sessionService.getEmail(),
      "creditCard": newCreditCard
    };

    return this.httpClient.put<any>(this.baseUrl, createCreditCardReq, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }

  retrieveCreditCard(email: String): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveCreditCard?email=" + email).pipe
      (
        catchError(this.handleError)
      );
  }

  deleteCreditCard(creditCardId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + creditCardId).pipe
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
