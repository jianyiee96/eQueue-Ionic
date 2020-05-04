import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentTransactionPageRoutingModule } from './payment-transaction-routing.module';
import { PaymentTransactionPage } from './payment-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentTransactionPageRoutingModule
  ],
  declarations: [PaymentTransactionPage]
})
export class PaymentTransactionPageModule {}
