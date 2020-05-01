import { Component, OnInit, Input } from '@angular/core';

import { CustomerOrder } from '../customer-order';
import { OrderLineItem } from '../order-line-item';

import { PaymentTransactionService } from '../payment-transaction.service';
import { CustomerOrderService } from '../customer-order.service';
import { SessionService } from '../session.service';

import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-view-transaction-details',
  templateUrl: './modal-view-transaction-details.page.html',
  styleUrls: ['./modal-view-transaction-details.page.scss'],
})
export class ModalViewTransactionDetailsPage implements OnInit {

  @Input() transactionId: string;

  customerOrders: CustomerOrder[];

  totalAmount: number;

  retrievedTransactionId: number;

  constructor(
    navParams: NavParams,
    private customerOrderService: CustomerOrderService,
    private paymentTransactionService: PaymentTransactionService,
    private sessionService: SessionService) {

    this.retrievedTransactionId = navParams.get('transactionId');
    this.totalAmount = 0;

  }

  ngOnInit() {
  };

  ionViewWillEnter() {
    this.processPaymentTransactionPage();
    console.log(this.customerOrders); // HOW COME UNDEFINED?
  }

  processPaymentTransactionPage() {
    this.customerOrderService.retrieveCustomerOrdersByTransactionId(this.retrievedTransactionId).subscribe(
      response => {
        this.customerOrders = response.customerOrders;
        this.customerOrders.forEach((order) => {
          this.totalAmount += order.totalAmount;
          this.retrieveOrderLineItemsByOrder(order, this.setOrderLineItems);
        })
        this.customerOrders.sort((o1, o2) => o1.orderId - o2.orderId);
      },
      error => {
        console.log("Error: " + error);
      }
    )
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

  parseDate(d: Date): string {
    return d.toString().replace('[UTC]', '');
  }

}
