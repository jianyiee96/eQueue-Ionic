import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { CustomerOrder } from '../customer-order';
import { OrderLineItem } from '../order-line-item';
import { CreditCard } from '../credit-card';
import { PaymentTransaction } from '../payment-transaction';

import { CustomerOrderService } from '../customer-order.service';
import { CreditCardService } from '../credit-card.service';
import { SessionService } from '../session.service';
import { PaymentTransactionService } from '../payment-transaction.service';
import { OrderLineItemStatusEnum } from '../order-line-item-status-enum.enum';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.page.html',
  styleUrls: ['./payment-transaction.page.scss'],
})
export class PaymentTransactionPage implements OnInit {

  customerServedOrders: CustomerOrder[];

  refreshTimeout: number;

  totalAmount: number;
  hasCreditCard: boolean;
  creditCard: CreditCard;

  newPaymentTransaction: PaymentTransaction;

  constructor(
    private router: Router,
    private location: Location,
    private alertController: AlertController,
    private customerOrderService: CustomerOrderService,
    private creditCardService: CreditCardService,
    private paymentTransactionService: PaymentTransactionService,
    private toastController: ToastController,
    private sessionService: SessionService
  ) {
    this.refreshTimeout = 1000;

    this.totalAmount = 0;

    this.hasCreditCard = false;
    this.creditCard = new CreditCard();
    this.newPaymentTransaction = new PaymentTransaction();
  }

  ngOnInit(): void {
    this.processPaymentTransactionPage();
  }

  processPaymentTransactionPage(): void {
    if (this.router.getCurrentNavigation().extras.state) {
      this.totalAmount = 0;

      this.customerServedOrders = this.router.getCurrentNavigation().extras.state.customerServedOrders;

      

      this.customerServedOrders.forEach((order) => {
        this.totalAmount += order.totalAmount;
        this.retrieveOrderLineItemsByOrder(order, this.setOrderLineItems);
      });

      this.customerServedOrders.sort((o1, o2) => o1.orderId - o2.orderId);

      this.getCreditCard();
    } else {
      this.back();
    }
  }

  retrieveOrderLineItemsByOrder(order: CustomerOrder, setOrderLineItems): any {
    this.customerOrderService.retrieveOrderLineItemsByOrderId(order.orderId).subscribe(
      response => {

        let activeItems: OrderLineItem[] = [];

        response.orderLineItems.forEach(o => {
          if(o.status.valueOf() != OrderLineItemStatusEnum.CANCELLED.valueOf()){
            activeItems.push(o);
          }
        });

        return setOrderLineItems(order, activeItems);
      },
      error => {
        console.log("Error has occurred while retrieving OrderLineItems: ", error);
      }
    )
  }

  setOrderLineItems(order: CustomerOrder, orderLineItems: OrderLineItem[]): void {
    order.orderLineItems = orderLineItems;
  }

  parseDate(d: Date): string {
    return d.toString().replace('[UTC]', '');
  }

  async confirmAlert() {

    if (this.hasCreditCard == true) {

      const maskedCCNum = this.creditCard.creditCardNumber.substring(0, 4) + " - xxxx - xxxx - " + this.creditCard.creditCardNumber.substring(15, 19);

      const alert = await this.alertController.create({
        header: "Confirm Payment",
        message:
          "<p>Total Amount: $ " + this.totalAmount.toFixed(2) + "</p>" +
          "<p>Payment using credit card</p>" +
          "<P>" + maskedCCNum + " ?</p>",
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              this.confirmPayment();
            }
          },
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      });

      await alert.present();

    } else {

      const alert = await this.alertController.create({
        header: "Confirm Payment",
        message:
          "<p>You have not saved any credit card for payment.</p>" +
          "<p>Please proceed to save a credit card for payment.</p>"
        ,
        buttons: [
          {
            text: 'Proceed',
            handler: () => {
              this.navigateToCreateCreditCardPage();
            }
          },
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      });

      await alert.present();

    }
  }

  confirmPayment(): void {
    this.newPaymentTransaction.paymentType = "Credit Card";
    this.newPaymentTransaction.transactionDate = new Date();
    this.newPaymentTransaction.transactionValue = this.totalAmount;
    this.newPaymentTransaction.gst = parseFloat((this.totalAmount - (this.totalAmount / 1.07)).toFixed(2));

    this.customerServedOrders.forEach(order => {
      this.newPaymentTransaction.customerOrders.push(order);
    });

    this.paymentTransactionService.createNewPaymentTransaction(this.newPaymentTransaction).subscribe(
      response => {
        this.toast("Payment has been successfully processed!");

        this.router.navigate(['/tabs/tab-order'])
      }, error => {
        console.log("******************* PaymentTransactionPage: ", error);
      }
    )
  }

  getCreditCard(): void {
    this.creditCardService.retrieveCreditCard(this.sessionService.getEmail()).subscribe(
      response => {
        console.log("Confirm payment using credit card")

        this.hasCreditCard = true;
        this.creditCard = response.creditCard;
      },
      error => {
        console.log(error)

        this.hasCreditCard = false;
      }
    );
  }

  navigateToCreateCreditCardPage(): void {
    this.router.navigate(["/create-credit-card"]);
  }

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  doRefresh(event) {
    this.processPaymentTransactionPage();
    setTimeout(() => {
      event.target.complete();
    }, this.refreshTimeout);
  }

  back(): void {
    this.location.back();
  }

}
