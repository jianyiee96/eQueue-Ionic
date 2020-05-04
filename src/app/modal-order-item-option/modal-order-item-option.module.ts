import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalOrderItemOptionPageRoutingModule } from './modal-order-item-option-routing.module';
import { ModalOrderItemOptionPage } from './modal-order-item-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOrderItemOptionPageRoutingModule
  ],
  declarations: [ModalOrderItemOptionPage]
})
export class ModalOrderItemOptionPageModule {}
