import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router'

import { Customer } from '../customer';
import { PaymentTransaction } from '../payment-transaction';

import { CustomerService } from '../customer.service'
import { SessionService } from '../session.service';
import { PaymentTransactionService } from '../payment-transaction.service';

import { ModalViewTransactionDetailsPage } from '../modal-view-transaction-details/modal-view-transaction-details.page';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  currentCustomer: Customer;

  isShown: boolean;

  paymentTransactions: PaymentTransaction[];
  paymentTransactionsToShow: PaymentTransaction[];

  constructor(
    private router: Router,
    public ngZone: NgZone,
    public alertController: AlertController,
    public toastController: ToastController,
    public modalController: ModalController,
    private sessionService: SessionService,
    private customerService: CustomerService,
    private paymentTransactionService: PaymentTransactionService
  ) {
  }

  ngOnInit() {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
  }

  ionViewWillEnter() {
    this.ngOnInit();
    this.isShown = true;

    this.paymentTransactionService.retrievePaymentTransactions(this.currentCustomer.customerId).subscribe(
      response => {
        this.paymentTransactionsToShow = new Array;
        this.paymentTransactions = response.paymentTransactions;
        this.loadTransactions();
      },
      error => {
        console.log("Error received: " + error);
      }
    )
  }

  loadTransactions() {
    var index = this.paymentTransactionsToShow.length;
    for (var i = index; i < index + 5; i++) {
      if (this.paymentTransactions[i] != null) {
        this.paymentTransactionsToShow.push(this.paymentTransactions[i]);
      } else {
        break;
      }
    }
  }

  async viewTransactionModal(transactionId: number) {
    const modal = await this.modalController.create({
      component: ModalViewTransactionDetailsPage,
      backdropDismiss: false,
      componentProps: {
        'transactionId': transactionId
      }
    });
    return await modal.present();
  }

  loadMoreTransactions(event) {
    setTimeout(() => {
      this.loadTransactions();
      event.target.complete();
    }, 1000)
  }

  scrollHandler(event) {
    // console.log(`ScrollEvent: ${event}`)
    this.ngZone.run(() => {
      this.isShown = false;
    })
  }

  scrollStop(event) {
    this.ngZone.run(() => {
      this.isShown = true;
    })
  }

  async presentChangePasswordPrompt() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current Password'
        },
        ,
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'confirmNewPassword',
          type: 'password',
          placeholder: 'Confirm New Password'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (data.newPassword != data.confirmNewPassword) {
              this.presentFailedToast("The two given passwords do not match");
              // alert.message = "The two given passwords do not match";
              return false;
            } else if (data.confirmNewPassword.length < 8) {
              this.presentFailedToast("New password must be at least 8 characters");
              // alert.message = "New password must be at least 8 characters";
              return false;
            } else if (data.currentPassword == data.newPassword) {
              this.presentFailedToast("New password cannot be same as current password");
              return false;
            } else {
              this.changePassword(data.currentPassword, data.newPassword)
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  changePassword(oldPassword: String, newPassword: String) {
    this.customerService.changePassword(oldPassword, newPassword).subscribe(
      response => {
        console.log("Response received");
        this.presentPassedToast("Password changed successfully");
      }, error => {
        console.log("Error received: " + error);
        this.presentFailedToast("Incorrect current password");
      }
    );
  }

  viewCreditCardDetails() {
    this.router.navigate(["/view-credit-card"]);
  }

  async presentFailedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 2500,
      color: "danger",
      position: "top"
    });
    toast.present();
  }

  async presentPassedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 2500,
      color: "success",
      position: "top"
    });
    toast.present();
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(["/login"]);
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
