import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { Router, NavigationExtras } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusEnum } from '../order-status-enum.enum';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.page.html',
  styleUrls: ['./tab-order.page.scss'],
})
export class TabOrderPage implements OnInit {

  refreshTimeout: number;

  customerOrders: CustomerOrder[] = [];
  customerActiveOrders: CustomerOrder[] = [];
  customerPastOrders: CustomerOrder[] = [];
  itemCount: number[] = [];

  constructor(public sessionService: SessionService,
    public currencyPipe: CurrencyPipe,
    public customerOrderService: CustomerOrderService,
    public router: Router) { 

      this.refreshTimeout = 1000;

    }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.processPage();
  }

  processPage(){

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
    this.customerPastOrders = [];
    
    let counter: number = 0;

    for (let c of this.customerOrders) {

      c.itemCount = this.itemCount[counter++];

      if (!c.isCompleted) {
        this.customerActiveOrders.unshift(c);
      } else {
        this.customerPastOrders.unshift(c);
      }

      // if (c.status.valueOf() == OrderStatusEnum.UNPAID.valueOf()) {
      //   this.customerActiveOrders.unshift(c);
      // } else {
      //   this.customerPastOrders.unshift(c);
      // }

    }

  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

  displayOrder(order: CustomerOrder) {


    let navigationExtras: NavigationExtras = {
      state: {
        order: order
      }
    };
    this.router.navigate(["order"],navigationExtras);
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
