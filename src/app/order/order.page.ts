import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

import { Location, CurrencyPipe } from '@angular/common';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';
import { OrderLineItem } from '../order-line-item';
import { SessionService } from '../session.service';
import { OrderLineItemStatusEnum } from '../order-line-item-status-enum.enum';
import { OrderStatusEnum } from '../order-status-enum.enum';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ModalOrderItemOptionPage } from '../modal-order-item-option/modal-order-item-option.page';
import { Cart } from '../cart';

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
    public alertController: AlertController,
    public sessionService: SessionService,
    public toastController: ToastController,
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

  updateOrder() {

    this.customerOrderService.retrieveCustomerOrders().subscribe(
      response => {
        let customerOrders: CustomerOrder[] = response.customerOrders;
        let itemCount: number[] = response.itemCount;

        customerOrders.forEach((item, index) => {
          if (item.orderId == this.order.orderId) {
            this.order = item;
            this.order.itemCount = itemCount[index];
          }
        })
      }, error => {
        console.log("Unable to update: " + error);
      }
    );


  }

  async copyToCart() {

    const alert = await this.alertController.create({

      header: "Copy to Cart",
      message: "Your current cart items will be overwritten, are you sure you want to proceed?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.confirmCopyToCart();
          }
        }, {
          text: 'No'
        }
      ]
    });
    await alert.present();
  }

  confirmCopyToCart() {

    let cart = this.sessionService.getShoppingCart();

    cart.totalAmount = 0;
    cart.orderLineItems = [];

    for (let item of this.orderLineItems) {
      cart.orderLineItems.push(new OrderLineItem(null, item.menuItem, item.remarks, item.quantity, null, false));
      cart.totalAmount += (item.quantity * item.menuItem.menuItemPrice);
    }

    this.sessionService.setShoppingCart(cart);
    this.toast("Copied order items into cart!");

  }


  async orderItemOptions(orderItem: OrderLineItem) {
    const modal = await this.modalController.create({
      component: ModalOrderItemOptionPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        orderItem: orderItem,
        parentOrderId: this.order.orderId,
        orderCompletion: this.order.isCompleted
      }
    });

    modal.onDidDismiss().then(
      (data) => {
        this.updateOrder();
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

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
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
