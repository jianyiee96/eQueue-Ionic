import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe, CurrencyPipe } from '@angular/common';
import { ModalItemOptionPage } from './modal-item-option/modal-item-option.page';
import { ModalOrderItemOptionPage } from './modal-order-item-option/modal-order-item-option.page';

@NgModule({
  declarations: [
    AppComponent,
    ModalItemOptionPage,
    ModalOrderItemOptionPage
  ],
  entryComponents: [ 
    ModalItemOptionPage,
    ModalOrderItemOptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ModalItemOptionPage,
    ModalOrderItemOptionPage
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

