import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CustomerOrder } from '../customer-order';
import { OrderLineItem } from '../order-line-item';
import { CustomerOrderService } from '../customer-order.service';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.page.html',
  styleUrls: ['./payment-transaction.page.scss'],
})
export class PaymentTransactionPage implements OnInit {

  customerActiveOrders: CustomerOrder[];

  totalAmount: number = 0;

  constructor(
    private router: Router,
    private location: Location,
    private customerOrderService: CustomerOrderService
  ) {

  }

  ngOnInit(): void {
    if (this.router.getCurrentNavigation().extras.state) {
      this.totalAmount = 0;

      this.customerActiveOrders = this.router.getCurrentNavigation().extras.state.customerActiveOrders;
      this.customerActiveOrders.forEach((order) => {
        this.totalAmount += order.totalAmount;
        this.retrieveOrderLineItemsByOrder(order, this.setOrderLineItems);
      });

      this.customerActiveOrders.sort((o1, o2) => o1.orderId - o2.orderId);
      // console.log(this.customerActiveOrders);
    } else {
      this.back();
    }
  }

  retrieveOrderLineItemsByOrder(order: CustomerOrder, setOrderLineItems): any {
    this.customerOrderService.retrieveOrderLineItemsByOrderId(order.orderId).subscribe(
      response => {
        return setOrderLineItems(order, response.orderLineItems);
      },
      error => {
        console.log("Error has occurred while retrieving OrderLineItems: ", error);
      }
    )
  }

  setOrderLineItems(order: CustomerOrder, orderLineItems: OrderLineItem[]): void {
    order.orderLineItems = orderLineItems;
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

  back() {
    this.location.back();
  }

}
