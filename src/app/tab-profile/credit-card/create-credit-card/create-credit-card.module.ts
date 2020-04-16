import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCreditCardPageRoutingModule } from './create-credit-card-routing.module';

import { CreateCreditCardPage } from './create-credit-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCreditCardPageRoutingModule
  ],
  declarations: [CreateCreditCardPage]
})
export class CreateCreditCardPageModule {}
