import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabQueuePage } from './tab-queue.page';

const routes: Routes = [
  {
    path: '',
    component: TabQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabQueuePageRoutingModule {}
