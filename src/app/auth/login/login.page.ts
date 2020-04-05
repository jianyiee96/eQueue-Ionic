import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../../session.service';
import { CustomerService } from '../../customer.service';
import { StoreService } from '../../store.service';
import { Store } from '../../store';
import { Customer } from '../../customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted: boolean;
  email: string;
  password: string;
  loginError: boolean;
  errorMessage: string;

  constructor(private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService,
    private storeService: StoreService) {

    this.submitted = false;

  }

  ngOnInit() {

    this.storeService.retrieveStoreInformation().subscribe(
      response => {

        let store: Store = response.store;

        if (store != null) {
          this.sessionService.setStore(store);
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

  clear() {
    this.email = "";
    this.password = "";
    this.errorMessage = "";
    this.loginError = false;
  }

  customerLogin(customerLoginForm: NgForm) {

    this.submitted = true;

    if (customerLoginForm.valid) {
      this.sessionService.setEmail(this.email);
      this.sessionService.setPassword(this.password);

      this.customerService.customerLogin(this.email, this.password).subscribe(
        response => {
          let customer: Customer = response.customer;



          if (customer != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentCustomer(customer);
            this.loginError = false;
            this.router.navigate(['/home']);

          }
          else {
            this.loginError = true;
          }
        },
        error => {
          this.loginError = true;
          this.errorMessage = error
        }
      );

    }


  }

}