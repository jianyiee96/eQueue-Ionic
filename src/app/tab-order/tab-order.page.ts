import { Component, OnInit, Injectable } from '@angular/core';
import { SessionService } from '../session.service';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { Router, NavigationExtras } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusEnum } from '../order-status-enum.enum';
import { TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.page.html',
  styleUrls: ['./tab-order.page.scss'],
})
export class TabOrderPage implements OnInit {

  refreshTimeout: number;

  customerOrders: CustomerOrder[] = [];

  customerActiveOrders: CustomerOrder[] = [];

  // Orders that are active, but being prepared
  customerPreparingOrders: CustomerOrder[] = [];

  // Orders that are active, but served
  customerServedOrders: CustomerOrder[] = [];

  customerPastOrders: CustomerOrder[] = [];
  customerPastOrdersDisplay: CustomerOrder[] = [];

  itemCount: number[] = [];


  constructor(public sessionService: SessionService,
    public currencyPipe: CurrencyPipe,
    public customerOrderService: CustomerOrderService,
    public router: Router) {

    this.refreshTimeout = 1000;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.processPage();
  }

  processPage() {
    this.customerOrderService.retrieveCustomerOrders().subscribe(
      response => {
        this.customerOrders = response.customerOrders;
        this.itemCount = response.itemCount;

        this.populateListByOrderStatus();

      }, error => {
        console.log(error);
      }
    );
  }

  populateListByOrderStatus() {

    this.customerActiveOrders = [];
    this.customerPreparingOrders = [];
    this.customerServedOrders = [];

    this.customerPastOrders = [];

    let counter: number = 0;

    for (let c of this.customerOrders) {
      c.itemCount = this.itemCount[counter++];

      if (c.status.valueOf() == OrderStatusEnum.UNPAID.valueOf()) {

        this.customerActiveOrders.unshift(c);

        if (!c.isCompleted) {
          this.customerPreparingOrders.unshift(c);
        } else {
          this.customerServedOrders.unshift(c);
        }

      } else {
        this.customerPastOrders.unshift(c);
      }
    }
  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

  displayPaymentTransaction(customerServedOrders: CustomerOrder[]): void {
    let navigationExtras: NavigationExtras = {
      state: {
        customerServedOrders: customerServedOrders
      }
    };
    this.router.navigate(["payment-transaction"], navigationExtras);
  }

  displayOrder(order: CustomerOrder) {
    let navigationExtras: NavigationExtras = {
      state: {
        order: order
      }
    };
    this.router.navigate(["order"], navigationExtras);
  }


  doRefresh(event) {
    this.processPage();
    setTimeout(() => {
      event.target.complete();
    }, this.refreshTimeout);
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
