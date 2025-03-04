import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabMenuPageRoutingModule } from './tab-menu-routing.module';
import { TabMenuPage } from './tab-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMenuPageRoutingModule,
    RouterModule.forChild([{ path: '', component: TabMenuPage }])
  ],
  declarations: [
    TabMenuPage
  ]
})
export class TabMenuPageModule {}
