import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../../customer.service';
import { Customer } from 'src/app/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newCustomer: Customer;

  submitted: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService) {

    this.newCustomer = new Customer();

    this.submitted = false;
    this.resultSuccess = false;
    this.resultError = false;
  }



  ngOnInit() {
  }

  clear() {
    this.submitted = false;
    this.newCustomer = new Customer();
  }

  register(customerRegistrationForm: NgForm) {

    if (customerRegistrationForm.valid && this.newCustomer.initialPassword == this.newCustomer.password) {
      this.customerService.registerCustomer(this.newCustomer).subscribe(
        response => {
          let newCustomerId: number = response.customerId;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New customer " + newCustomerId + " created successfully";
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new customer: " + error;
        }
      )
    } else if (this.newCustomer.initialPassword != this.newCustomer.password) {
      this.resultError = true;
      this.resultSuccess = false;
      this.message = "Passwords do not match."
    }
  }

  back() {
    this.location.back();
  }

}