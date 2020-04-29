import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

import { Customer } from '../../../customer';
import { CreditCard } from '../../../credit-card';
import { CustomerService } from '../../../customer.service'
import { SessionService } from '../../../session.service';
import { CreditCardService } from '../../../credit-card.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-credit-card',
  templateUrl: './view-credit-card.page.html',
  styleUrls: ['./view-credit-card.page.scss'],
})
export class ViewCreditCardPage implements OnInit {

  currentCustomer: Customer;
  creditCard: CreditCard;
  haveCreditCard: boolean;
  maskedCCNum: string;

  isVisa: boolean;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private customerService: CustomerService,
    private creditCardService: CreditCardService,
    private alertController: AlertController,
    private location: Location
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getCreditCard();
    this.currentCustomer = this.sessionService.getCurrentCustomer();
  }

  getCreditCard() {
    this.creditCardService.retrieveCreditCard(this.sessionService.getEmail()).subscribe(
      response => {
        this.creditCard = response.creditCard

        this.haveCreditCard = true;
        this.maskedCCNum = this.creditCard.creditCardNumber.toString();
        if (Number(this.maskedCCNum[0]) < 5) {
          this.isVisa = true;
        } else {
          this.isVisa = false;
        }
        this.maskedCCNum = this.maskedCCNum.substring(0, 4) + this.maskedCCNum.substring(6, 7) + "xxxxxx" + this.maskedCCNum.substring(15, 19);
      },
      error => {
        this.haveCreditCard = false;
        // console.log("Error received: " + error);
      }
    )
  }

  createCreditCardView() {
    this.router.navigate(["/create-credit-card"]);
  }

  async deleteCreditCard() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this card?',
      message: "You wont be able to use it for eQueue services anymore.",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            this.creditCardService.deleteCreditCard(this.creditCard.creditCardId).subscribe(
              response => {
                this.creditCard = null;
                this.haveCreditCard = false;
                this.getCreditCard();
              }, error => {
                console.log("Error received: " + error);
              }
            )
              ;
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  back() {
    this.router.navigate(["tabs/tab-profile"]);
  }

}
