import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { Router, NavigationExtras } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.page.html',
  styleUrls: ['./tab-order.page.scss'],
})
export class TabOrderPage implements OnInit {

  customerOrders: CustomerOrder[] = [];
  customerActiveOrders: CustomerOrder[] = [];
  customerPastOrders: CustomerOrder[] = [];
  itemCount: number[] = [];

  constructor(public sessionService: SessionService,
    public currencyPipe: CurrencyPipe,
    public customerOrderService: CustomerOrderService,
    public router: Router) { }

  ngOnInit() {

  }

  ionViewDidEnter() {

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
        this.customerActiveOrders.push(c);
      } else {
        this.customerPastOrders.push(c);
      }

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

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
