import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

import { Location, CurrencyPipe } from '@angular/common';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { OrderLineItem } from '../order-line-item';
import { SessionService } from '../session.service';
import { OrderLineItemStatusEnum } from '../order-line-item-status-enum.enum';
import { OrderStatusEnum } from '../order-status-enum.enum';
import { ModalController } from '@ionic/angular';
import { ModalOrderItemOptionPage } from '../modal-order-item-option/modal-order-item-option.page';

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
    public modalController: ModalController,
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
    this.processPage();

  }

  processPage() {
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

  async orderItemOptions(orderItem: OrderLineItem) {
    const modal = await this.modalController.create({
      component: ModalOrderItemOptionPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        input: orderItem,
        orderCompletion: this.order.isCompleted
      }
    });

    modal.onDidDismiss().then(
      (data) => {
        this.processPage();
      }
    );
    return await modal.present();

  }


  displayStatus(display: OrderLineItemStatusEnum): number {
    if (display == OrderLineItemStatusEnum.ORDERED) {
      //return "Order submitted";
      return 1;
    } else if (display == OrderLineItemStatusEnum.PREPARING) {
      //return "Preparing";
      return 2;
    } else if (display == OrderLineItemStatusEnum.SERVED) {
      //return "Served";
      return 3;
    } else if (display == OrderLineItemStatusEnum.CANCELLED) {
      //return "Cancelled";
      return 4;
    }
  }

  isCancelled() {
    return (this.order.status == OrderStatusEnum.CANCELLED);
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

  back() {
    this.location.back();
  }

}
