import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TabQueuePageRoutingModule } from './tab-queue-routing.module';

import { TabQueuePage } from './tab-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabQueuePageRoutingModule,
    RouterModule.forChild([{ path: '', component: TabQueuePage }])
  ],
  declarations: [TabQueuePage]
})
export class TabQueuePageModule {}
