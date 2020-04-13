import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './session.service';
import { NotificationService } from './notification.service';
import { interval, Subscription } from 'rxjs';

import { Notification } from './notification';
import { OrderLineItem } from './order-line-item';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  subscription: Subscription;
  pollInterval: number;
  unreadNotification: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public sessionService: SessionService,
    public notificationService: NotificationService
  ) {
    this.initializeApp();
  }


  ngOnInit() {

    this.pollInterval = 1000;
    this.unreadNotification = false;

    interval(this.pollInterval).subscribe(x => {
      this.updateNotifications();
    });

  }

  

  updateNotifications() {
    
    if (this.sessionService.getIsLogin()) {
      this.notificationService.retrieveCustomerNotifications().subscribe(
        response => {
          let notifications: Notification[] = response.notifications;

          let allRead: boolean = true;
          notifications.forEach(x => {
            if (!x.isRead) {
              allRead = false;
            }
          });

          if (allRead) {
            this.unreadNotification = false;
          } else {
            this.unreadNotification = true;
          }

          this.sessionService.setNotifications(notifications);

        }, error => { }
      );

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  navigateHome() {
    this.router.navigate(["home"]);
  }

  navigateTab() {
    this.router.navigate(["welcome"]);
  }

  navigateNotification() {
    this.router.navigate(["notification"]);
  }

}
