import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalOrderItemOptionPage } from './modal-order-item-option.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOrderItemOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOrderItemOptionPageRoutingModule {}
