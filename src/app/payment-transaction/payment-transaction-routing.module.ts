import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentTransactionPage } from './payment-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentTransactionPageRoutingModule {}
