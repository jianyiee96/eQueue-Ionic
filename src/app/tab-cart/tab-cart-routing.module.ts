import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCartPage } from './tab-cart.page';

const routes: Routes = [
  {
    path: '',
    component: TabCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCartPageRoutingModule {}
