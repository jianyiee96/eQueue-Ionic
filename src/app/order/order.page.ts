import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

import { Location, CurrencyPipe } from '@angular/common';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { OrderLineItem } from '../order-line-item';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  resourcePath: string;

  order: CustomerOrder;

  orderLineItems: OrderLineItem[] = [];

  constructor(public activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public router: Router,
    public currencyPipe: CurrencyPipe,
    public customerOrderService: CustomerOrderService,
    public location: Location) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.order = this.router.getCurrentNavigation().extras.state.order;
      }
    });

    this.resourcePath = sessionService.getImageResourcePath();

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.order == null) {
      this.back();
    } else {

      this.customerOrderService.retrieveOrderLineItemsByOrderId(this.order.orderId).subscribe(
        response => {
          this.orderLineItems = response.orderLineItems;
        }, error => {
          this.back();
        }
      );

    }

  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

  back() {
    this.location.back();
  }

}
