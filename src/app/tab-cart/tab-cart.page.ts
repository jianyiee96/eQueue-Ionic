import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MenuItem } from '../menu-item';
import { MenuCategory } from '../menu-category';
import { MenuCategoryService } from '../menu-category.service';
import { MenuItemService } from '../menu-item.service';

import { ModalController } from '@ionic/angular';

import { CurrencyPipe } from '@angular/common';

import { ModalItemOptionPage } from '../modal-item-option/modal-item-option.page';
import { Cart } from '../cart';

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

  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

}
