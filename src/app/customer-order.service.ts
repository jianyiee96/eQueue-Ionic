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
export class CustomerOrderService {

  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {

    this.baseUrl = this.sessionService.getRootPath() + 'CustomerOrder';
  }


  retrieveCustomerOrders(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveCustomerOrders?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }
  
  retrieveOrderLineItemsByOrderId(orderId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveOrderLineItemsByOrderId?orderId=" + orderId).pipe
      (
        catchError(this.handleError)
      );
  }

  submitCustomerOrder(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/submitCustomerOrder?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe
      (
        catchError(this.handleError)
      );
  }

  cancelOrderLineItem(orderLineItemId: number, customerOrderId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/cancelOrderLineItem?orderLineItemId="+orderLineItemId+"&customerOrderId="+customerOrderId).pipe
      (
        catchError(this.handleError)
      );
  }

  updateOrderLineItem(orderLineItemId: number, newQuantity: number, newComment: string, customerOrderId: number): Observable<any> {

    let updateOrderlineItemReq = {
			"orderLineItemId": orderLineItemId,
			"newQuantity": newQuantity,
      "newComment": newComment,
      "customerOrderId": customerOrderId
		};

    return this.httpClient.post<any>(this.baseUrl, updateOrderlineItemReq, httpOptions).pipe
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
