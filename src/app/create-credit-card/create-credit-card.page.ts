import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CreditCard } from '../credit-card';
import { CreditCardService } from '../credit-card.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-create-credit-card',
  templateUrl: './create-credit-card.page.html',
  styleUrls: ['./create-credit-card.page.scss'],
})
export class CreateCreditCardPage implements OnInit {

  submitted: boolean;
  newCreditCard: CreditCard;
  haveCreditCard: boolean;
  currentCustomer: Customer;

  expDate: string;
  currentPeriod: string = new Date().toISOString().substring(0, 7);

  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  constructor(
    private creditCardService: CreditCardService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.submitted = false;
    this.newCreditCard = new CreditCard();

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit() {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.getCreditCard();
  }

  getCreditCard() {
    this.creditCardService.retrieveCreditCard(this.sessionService.getEmail()).subscribe(
      response => {
        if (response.creditCard != null) {
          this.haveCreditCard = true;
          this.back()
        } else {
          console.log("Customer does not have credit card associated with his account!")
          this.haveCreditCard = false;
        }
      },
      error => {
        this.haveCreditCard = false;
        // console.log("Errore received: " + error);
      }
    )
  }

  clear() {
    this.submitted = false;
    this.newCreditCard = new CreditCard();
  }

  create(createCreditCardForm: NgForm) {
    this.submitted = true;

    if (createCreditCardForm.valid) {

      let expMonth = this.expDate.substring(5, 7);
      let expYear = this.expDate.substring(0, 4);
      this.newCreditCard.expiryMonth = +expMonth;
      this.newCreditCard.expiryYear = +expYear;

      this.creditCardService.createNewCreditCard(this.newCreditCard).subscribe(
        response => {
          let newCreditCardId: number = response.creditCardId;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New credit card " + newCreditCardId + " created successfully";

          this.newCreditCard = new CreditCard();
          this.submitted = false;
          // createCreditCardForm.reset();
          this.router.navigate(['/view-credit-card']);
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new credit card: " + error;

          console.log('********** CreateCreditCardPage.ts: ' + error);
        }
      )
    }
  }

  mychange(event: string) {
    let chIbn = event.split('-').join('');
    if (chIbn.length > 0) {
      chIbn = chIbn.match(new RegExp('.{1,4}', 'g')).join('-');
    }
    this.newCreditCard.creditCardNumber = chIbn;
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  back() {
    this.router.navigate(["view-credit-card"]);
  }

}
