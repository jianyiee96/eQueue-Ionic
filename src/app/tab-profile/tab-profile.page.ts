import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'

import { Customer } from '../customer';
import { CustomerService } from '../customer.service'
import { SessionService } from '../session.service';
import { min } from 'rxjs/operators';


@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  currentCustomer: Customer;

  constructor(
    private sessionService: SessionService,
    private customerService: CustomerService,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
  ) {
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
  }

  async presentChangePasswordPrompt() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      message: '',
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          // handler: () => {
          //   console.log('Confirm Ok');
          //   alert.onDidDismiss().then((alertData) => {
          //     console.log(alertData.data.values.oldPassword)
          //     console.log(alertData.data.values.newPassword)
          //     this.changePassword(alertData.data.values.oldPassword, alertData.data.values.newPassword)

          //   })
          // }
          handler: data => {
            console.log(typeof (data.confirmNewPassword));
            if (data.newPassword != data.confirmNewPassword) {
              alert.message = "The two given passwords do not match";
              return false;
            } else if (data.confirmNewPassword.length < 8) {
              alert.message = "New password must be at least 8 characters";
              return false;
            } else {
              this.changePassword(data.currentPassword, data.newPassword)
            }

            // if (data.newPassword == data.confirmNewPassword) {
            //   this.changePassword(data.currentPassword, data.newPassword)
            // } else {
            //   alert.message = "The two given passwords do not match";
            //   return false;
            // }
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

}
