import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './session.service';
import { NotificationService } from './notification.service';
import { DiningTableService } from './dining-table.service';
import { interval, Subscription } from 'rxjs';

import { Notification } from './notification';
import { OrderLineItem } from './order-line-item';
import { DiningTable } from './dining-table';
import { TableStatusEnum } from './table-status-enum.enum';
import { AlertService } from './alert.service';
import { Alert } from './alert';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  subscription: Subscription;
  pollInterval: number;
  unreadNotification: boolean;
  seatedTableId: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController,
    public sessionService: SessionService,
    private diningTableService: DiningTableService,
    public notificationService: NotificationService,
    public alertService: AlertService
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

  callStaff() {
    this.diningTableService.getMyTable().subscribe(
      response => {
        let currTable: DiningTable = response.diningTable;
        if (currTable != null) {
          if (currTable.tableStatus.valueOf() == TableStatusEnum.FROZEN_OCCUPIED.valueOf() || currTable.tableStatus.valueOf() == TableStatusEnum.UNFROZEN_OCCUPIED.valueOf()) {
            this.seatedTableId = currTable.diningTableId;
            this.presentCallStaffAlert();
          } else {
            this.toast("Please be seated first!");
          }
        } else {
          this.toast("Please be seated first!");
        }

      }, error => {
        console.log("Error in retrieving table. " + error);
      });
  }

  async presentCallStaffAlert() {
    const alert = await this.alertController.create({
      header: 'Request Server!',
      inputs: [
        {
          name: 'message',
          type: 'text',
          placeholder: 'E.g. Bring cutlery'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            alert.onDidDismiss().then((alertData) => {
              this.alertService.createAlert(new Alert(this.seatedTableId, alertData.data.values.message)).subscribe(
                response => {
                },
                error => {
                }
              )
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
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
