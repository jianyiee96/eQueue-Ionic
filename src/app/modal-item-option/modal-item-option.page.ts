import { Component, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { MenuItem } from '../menu-item';
import { SessionService } from '../session.service';

import { CurrencyPipe } from '@angular/common';
import { Cart } from '../cart';
import { OrderLineItem } from '../order-line-item';
import { OrderLineItemStatusEnum } from '../order-line-item-status-enum.enum';

@Component({
  selector: 'app-modal-item-option',
  templateUrl: './modal-item-option.page.html',
  styleUrls: ['./modal-item-option.page.scss'],
})

export class ModalItemOptionPage {

  resourcePath: string;

  currentItem: MenuItem;

  currentComments: string;
  currentQuantity: number;

  exist: boolean;
  cart: Cart;

  constructor(public modalController: ModalController, navParams: NavParams, public sessionService: SessionService, public currencyPipe: CurrencyPipe, public toastController: ToastController) {
    this.currentItem = navParams.get('input');

    this.resourcePath = this.sessionService.getImageResourcePath();
  }

  ionViewDidEnter() {

    this.cart = this.sessionService.getShoppingCart();

    this.exist = false;

    for (let orderItems of this.cart.orderLineItems) {
      if (orderItems.menuItem.menuItemId == this.currentItem.menuItemId) {
        this.exist = true;
        this.currentQuantity = orderItems.quantity;
        this.currentComments = orderItems.remarks;

        break;
      }
    }

    if (!this.exist) {
      this.currentComments = "";
      this.currentQuantity = 0;
    }

    if (this.currentComments == null) {
      this.currentComments = "";
    }

  }

  addItemQuantity() {
    if (this.currentQuantity < 99) {
      this.currentQuantity++;
    }
  }

  reduceItemQuantity() {
    if (this.currentQuantity > 0) {
      this.currentQuantity--;
    }
  }

  displayPrice() : String {

    if(this.currentQuantity == 0){
      return "";
    }

    return " - Total: "+(this.getCurrency(this.currentQuantity * this.currentItem.menuItemPrice))+"";
  }

  saveAndDismiss() {

    //new item into cart
    if (!this.exist && this.currentQuantity > 0) {
      this.cart.orderLineItems.push(new OrderLineItem(null, this.currentItem, this.currentComments, this.currentQuantity, null, false));
      this.cart.totalAmount += (this.currentQuantity * this.currentItem.menuItemPrice);

      this.toast("Added Item Into Cart!");
    }

    //adjusting item value in cart
    if (this.exist && this.currentQuantity > 0) {
      for (let orderItems of this.cart.orderLineItems) {
        if (orderItems.menuItem.menuItemId == this.currentItem.menuItemId) {
          orderItems.remarks = this.currentComments;
          this.cart.totalAmount += (this.currentQuantity - orderItems.quantity) * this.currentItem.menuItemPrice;
          orderItems.quantity = this.currentQuantity;
          break;
        }
      }

      this.toast("Updated Item!");

    }

    //removing item from cart
    if (this.exist && this.currentQuantity == 0) {

      if (this.cart.orderLineItems.length == 1) {
        this.cart.totalAmount = 0;
        this.cart.orderLineItems.pop();
      } else {

        var newCartItems: OrderLineItem[] = [];
        for (let orderItems of this.cart.orderLineItems) {
          if (orderItems.menuItem.menuItemId == this.currentItem.menuItemId) {
            this.cart.totalAmount -= (orderItems.quantity) * this.currentItem.menuItemPrice;
          } else {
            newCartItems.push(orderItems);
          }
        }

        this.cart.orderLineItems = newCartItems;

      }

      this.toast("Removed Item From Cart!");

    }

    this.sessionService.setShoppingCart(this.cart);


    this.dismissModal();

  }

  removeAndDismiss() {
    this.currentQuantity = 0;
    this.saveAndDismiss();

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

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

}
