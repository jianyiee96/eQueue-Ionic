import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PaymentTransaction } from './payment-transaction';
import { CustomerOrder } from './customer-order';

import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService {

  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {
    this.baseUrl = this.sessionService.getRootPath() + 'PaymentTransaction';
  }

  createNewPaymentTransaction(newPaymentTransaction: PaymentTransaction): Observable<any> {
    let createNewPaymentTransactionReq = {
      "newPaymentTransaction": newPaymentTransaction,
    }

    return this.httpClient.put<any>(this.baseUrl, createNewPaymentTransactionReq, httpOptions).pipe(
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
