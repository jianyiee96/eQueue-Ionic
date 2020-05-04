import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalViewTransactionDetailsPage } from './modal-view-transaction-details.page';

const routes: Routes = [
  {
    path: '',
    component: ModalViewTransactionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalViewTransactionDetailsPageRoutingModule {}
