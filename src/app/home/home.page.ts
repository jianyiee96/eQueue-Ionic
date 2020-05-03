import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { Store } from '../store';
import { StoreService } from '../store.service';
import { MenuItem } from '../menu-item';
import { MenuItemService } from '../menu-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  resourcePath: String;

  store: Store;

  popular: MenuItem[] = [];

  loadedItemsCount: number = 4;
  maxLoadedItems: number = 20;

  constructor(private router: Router,
    public sessionService: SessionService,
    private storeService: StoreService,
    private menuItemService: MenuItemService,
    private customerService: CustomerService) {

      this.resourcePath = sessionService.getImageResourcePath();

  }

  ionViewWillEnter() {

    this.storeService.retrieveStoreInformation().subscribe(
      response => {

        this.retrievePopularAvailableMenuItem();
        let store: Store = response.store;

        if (store != null) {
          this.sessionService.setStore(store);
          this.store = store;
        }
        else {
          console.log("Unable to retrieve store [null]");
        }
      },
      error => {
        console.log("Unable to retrieve store [" + error + "]");
      }
    );

  }

  retrievePopularAvailableMenuItem() {

    this.menuItemService.retrievePopularMenuItem(this.loadedItemsCount).subscribe(
      response => {
        this.popular = response.menuItems;

      }, error => {
        this.popular = [];

      });

  }

  loadMore(event) {
    this.loadedItemsCount += 4;

    setTimeout(() => {
      this.menuItemService.retrievePopularMenuItem(this.loadedItemsCount).subscribe(
        response => {
          this.popular = response.menuItems;
  
        }, error => {
          this.popular = [];
  
        });
      event.target.complete();
    }, 1000)
  }

  redirectMenu(): void {
    this.router.navigate(["/tabs/tab-menu"]);
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(["/login"]);
  }

}
