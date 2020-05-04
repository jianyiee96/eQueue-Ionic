import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalItemOptionPage } from './modal-item-option.page';

const routes: Routes = [
  {
    path: '',
    component: ModalItemOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalItemOptionPageRoutingModule {}
