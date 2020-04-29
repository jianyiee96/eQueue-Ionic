import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { Store } from '../store';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  store: Store;

  constructor(private router: Router,
    public sessionService: SessionService,
    private storeService: StoreService,
    private customerService: CustomerService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {

    this.storeService.retrieveStoreInformation().subscribe(
      response => {

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

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(["/login"]);
  }

}
