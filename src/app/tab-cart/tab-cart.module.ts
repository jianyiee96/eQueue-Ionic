import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCartPageRoutingModule } from './tab-cart-routing.module';

import { TabCartPage } from './tab-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCartPageRoutingModule
  ],
  declarations: [TabCartPage]
})
export class TabCartPageModule {}
