import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SessionService } from '../../session.service';
import { CustomerService } from '../../customer.service';
import { StoreService } from '../../store.service';
import { Customer } from '../../customer';
import { ToastController } from '@ionic/angular';

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

  constructor(
    public toastController: ToastController,
    private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService) {

    this.submitted = false;

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clear();
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
            this.sessionService.setShoppingCart(response.customer.shoppingCart);
            this.loginError = false;
            this.router.navigate(['/home']);

          }
          else {
            this.loginError = true;
          }
        },
        error => {
          this.presentFailedToast("Email does not exist or invalid password")
        }
      );
    }
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

  async presentFailedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 3000,
      color: "danger",
      position: "top"
    });
    toast.present();
  }

}