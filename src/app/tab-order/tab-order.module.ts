import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabOrderPageRoutingModule } from './tab-order-routing.module';
import { TabOrderPage } from './tab-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabOrderPageRoutingModule,
    RouterModule.forChild([{ path: '', component: TabOrderPage }])
  ],
  declarations: [TabOrderPage]
})
export class TabOrderPageModule { }
