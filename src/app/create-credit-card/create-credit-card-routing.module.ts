import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCreditCardPage } from './create-credit-card.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCreditCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCreditCardPageRoutingModule {}
