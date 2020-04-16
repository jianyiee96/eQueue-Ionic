import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../../customer.service';
import { Customer } from 'src/app/customer';
import { ToastController } from '@ionic/angular';
import { delay } from 'rxjs/operators';

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
    private customerService: CustomerService,
    public toastController: ToastController) {

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

    if (customerRegistrationForm.valid && this.newCustomer.password == this.newCustomer.confirmPassword) {
      this.customerService.registerCustomer(this.newCustomer).subscribe(
        response => {
          let newCustomerId: number = response.customerId;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New customer " + newCustomerId + " created successfully";
          this.presentPassedToast("Account ID[" + newCustomerId + "] created!");
          this.router.navigate(['/login']);
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new customer: " + error;
          this.presentFailedToast(error);
        }
      )
    } else if (this.newCustomer.password != this.newCustomer.confirmPassword) {
      this.resultError = true;
      this.resultSuccess = false;
      this.message = "Passwords do not match."
      this.presentFailedToast(this.message);
    }
  }

  async presentFailedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 2000,
      color: "danger",
      position: "top"
    });
    toast.present();
  }

  async presentPassedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 2000,
      color: "success",
      position: "top"
    });
    toast.present();
  }

  back() {
    this.location.back();
  }

}