import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { Store } from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  store: Store;

  constructor(private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.store = this.sessionService.getStore();
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(["/login"]);
  }

}
