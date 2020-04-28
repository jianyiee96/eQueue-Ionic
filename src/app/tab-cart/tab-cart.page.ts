import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MenuItem } from '../menu-item';
import { MenuCategory } from '../menu-category';
import { MenuCategoryService } from '../menu-category.service';
import { MenuItemService } from '../menu-item.service';


import { ModalController, ToastController, AlertController } from '@ionic/angular';

import { CurrencyPipe } from '@angular/common';

import { ModalItemOptionPage } from '../modal-item-option/modal-item-option.page';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { DiningTableService } from '../dining-table.service';
import { DiningTable } from '../dining-table';
import { TableStatusEnum } from '../table-status-enum.enum';
import { CustomerOrderService } from '../customer-order.service';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-cart',
  templateUrl: './tab-cart.page.html',
  styleUrls: ['./tab-cart.page.scss'],
})
export class TabCartPage implements OnInit {

  cart: Cart;

  resourcePath: string;

  constructor(public sessionService: SessionService,
    public menuItemService: MenuItemService,
    public modalController: ModalController,
    public cartService: CartService,
    public diningTableService: DiningTableService,
    public customerOrderService: CustomerOrderService,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router,
    private currencyPipe: CurrencyPipe) {


  }


  ngOnInit() {

    this.cart = this.sessionService.getShoppingCart();
    this.resourcePath = this.sessionService.getImageResourcePath();
  }


  ionViewDidEnter() {
    this.cart = this.sessionService.getShoppingCart();
  }

  async itemOptions(item: MenuItem) {
    const modal = await this.modalController.create({
      component: ModalItemOptionPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        input: item
      }
    });

    modal.onDidDismiss().then(
      (data) => {
        this.cart = this.sessionService.getShoppingCart();
      }
    );
    return await modal.present();

  }

  submitOrder() {

    if (this.cart.orderLineItems.length == 0) {
      this.toast("Cart Is Empty!");
      return;
    }

    this.diningTableService.getMyTable().subscribe(
      response => {
        let currTable: DiningTable = response.diningTable;
        if (currTable != null) {
          if (currTable.tableStatus.valueOf() == TableStatusEnum.FROZEN_OCCUPIED.valueOf() || currTable.tableStatus.valueOf() == TableStatusEnum.UNFROZEN_OCCUPIED.valueOf()) {
            this.orderConfirmation();
          } else {
            this.orderDisallowed();
          }
        } else {
          this.orderDisallowed();
        }

      }, error => {
        console.log("Error in retrieving table. " + error);
      });


  }

  saveCart(hideToast: boolean) {
    this.cartService.saveCart().subscribe(
      response => {

        if (!hideToast) {
          this.toast("Saved Cart in System!");
        }


      }, error => {
        console.log("Error received: " + error);
      }
    );
  }

  clearCart() {

    this.cart.orderLineItems = [];
    this.cart.totalAmount = 0;
    this.sessionService.setShoppingCart(this.cart);
    this.saveCart(true);
    this.toast("Shopping Cart Cleared!");
  }

  async orderConfirmation() {

    const alert = await this.alertController.create({

      header: "Order Confirmation",
      message: "Would you like to to confirm and submit your order?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.confirmationYes();
          }
        }, {
          text: 'No'
        }
      ]
    });
    await alert.present();
  }

  async clearConfirmation() {

    const alert = await this.alertController.create({

      header: "Clear Cart",
      message: "Are you sure you want to clear your cart?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.clearCart();
          }
        }, {
          text: 'No'
        }
      ]
    });
    await alert.present();
  }

  async orderDisallowed() {
    console.log("Order disallowed");
    const alert = await this.alertController.create({

      header: "Unable to order",
      message: "You can only order once you have checked-in to an allocated table.",
      buttons: [
        {
          text: 'Ok'
        }
      ]

    });
    await alert.present();
  }

  confirmationYes() {

    this.cartService.saveCart().subscribe(
      response => {

        this.customerOrderService.submitCustomerOrder().subscribe(
          response => {
            this.cart.totalAmount = 0;
            this.cart.orderLineItems = [];
            this.sessionService.setShoppingCart(this.cart);
            this.toast("Order submitted successfully!");

            this.router.navigate(["/tabs/tab-order"]);
          }, error => {
            this.toast("Failed to submit order.\n" + error);
          }
        );

      }, error => {
        console.log("Error received: " + error);
      }
    );

  }

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

}
