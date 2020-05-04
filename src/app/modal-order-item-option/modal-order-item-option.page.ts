import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { SessionService } from '../session.service';
import { CurrencyPipe } from '@angular/common';
import { OrderLineItem } from '../order-line-item';
import { OrderLineItemStatusEnum } from '../order-line-item-status-enum.enum';
import { CustomerOrderService } from '../customer-order.service';

@Component({
  selector: 'app-modal-order-item-option',
  templateUrl: './modal-order-item-option.page.html',
  styleUrls: ['./modal-order-item-option.page.scss'],
})
export class ModalOrderItemOptionPage {

  resourcePath: string;
  currentOrderItem: OrderLineItem;
  parentOrderId: number;
  currentComments: string;
  currentQuantity: number;
  editable: boolean;

  constructor(public modalController: ModalController,
    public navParams: NavParams,
    public sessionService: SessionService,
    public currencyPipe: CurrencyPipe,
    public alertController: AlertController,
    public toastController: ToastController,
    public customerOrderService: CustomerOrderService) {

    this.currentOrderItem = navParams.get('orderItem');
    this.parentOrderId = navParams.get('parentOrderId');
    let orderCompletion = navParams.get('orderCompletion');

    if (orderCompletion) {
      this.editable = false;
    } else {
      if (this.currentOrderItem.status == OrderLineItemStatusEnum.ORDERED) {
        this.editable = true;
      } else {
        this.editable = false;
      }
    }
    this.resourcePath = this.sessionService.getImageResourcePath();
    this.currentComments = this.currentOrderItem.remarks;
    this.currentQuantity = this.currentOrderItem.quantity;

  }

  async cancelOrderItem() {

    const alert = await this.alertController.create({

      header: "Confirm cancellation",
      message: "Are you sure you want to cancel this order item?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.confirmCancellation();

          }
        }, {
          text: 'No'
        }
      ]
    });
    await alert.present();
  }


  async updateOrderItem() {

    if (this.currentQuantity == 0) {
      this.cancelOrderItem();
      return;
    }

    if (this.currentComments == this.currentOrderItem.remarks && this.currentQuantity == this.currentOrderItem.quantity) {
      this.toast("Nothing to update.");
    } else {

      const alert = await this.alertController.create({

        header: "Confirm changes",
        message: "Are you sure you want to update this order item?",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.confirmUpdateOrderItem();
            }
          }, {
            text: 'No'
          }
        ]
      });
      await alert.present();
    }
  }


  confirmCancellation() {
    this.customerOrderService.cancelOrderLineItem(this.currentOrderItem.orderLineItemId, this.parentOrderId).subscribe(
      response => {
        this.toast("Order Item Cancelled!");
        this.dismissModal();
      }, error => {
        this.toast("Cancellation failed. Please refresh status.");
      }
    );
  }

  confirmUpdateOrderItem() {
    this.customerOrderService.updateOrderLineItem(this.currentOrderItem.orderLineItemId, this.currentQuantity, this.currentComments, this.parentOrderId).subscribe(
      response => {
        this.toast("Order Item updated!");
        this.dismissModal();
      }, error => {
        this.toast("Update failed. Please refresh status.");
      }
    );
  }


  displayStatus(display: OrderLineItemStatusEnum): number {
    if (display == OrderLineItemStatusEnum.ORDERED) {
      return 1;
    } else if (display == OrderLineItemStatusEnum.PREPARING) {
      return 2;
    } else if (display == OrderLineItemStatusEnum.SERVED) {
      return 3;
    } else if (display == OrderLineItemStatusEnum.CANCELLED) {
      return 4;
    }
  }

  addItemQuantity() {
    if (this.currentQuantity < 99 && this.editable) {
      this.currentQuantity++;
    }
  }

  reduceItemQuantity() {
    if (this.currentQuantity > 0 && this.editable) {
      this.currentQuantity--;
    }
  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 1000,
      position: 'middle',
    });
    toast.present();
  }

}
