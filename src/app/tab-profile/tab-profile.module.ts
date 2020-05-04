import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabProfilePageRoutingModule } from './tab-profile-routing.module';
import { TabProfilePage } from './tab-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabProfilePageRoutingModule,
    RouterModule.forChild([{ path: '', component: TabProfilePage }])
    
  ],
  declarations: [TabProfilePage]
})
export class TabProfilePageModule {}
