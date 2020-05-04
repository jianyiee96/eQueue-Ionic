import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalItemOptionPageRoutingModule } from './modal-item-option-routing.module';
import { ModalItemOptionPage } from './modal-item-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalItemOptionPageRoutingModule
  ],
  declarations: [ModalItemOptionPage]
})
export class ModalItemOptionPageModule {}
