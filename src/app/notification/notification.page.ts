import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NotificationService } from '../notification.service';

import { Notification } from '../notification';
import { SessionService } from '../session.service';
import { AlertController, NumericValueAccessor } from '@ionic/angular';

import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: Notification[];
  refreshTimeout: number;

  constructor(private router: Router,
    public notificationService: NotificationService,
    public sessionService: SessionService,
    public alertController: AlertController,
    public datepipe: DatePipe) {

      this.refreshTimeout = 1000;

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.notifications = this.sessionService.getNotifications();
  }

  async read(notification: Notification) {

    const alert = await this.alertController.create({

      header: notification.title,
      subHeader: this.datepipe.transform(new Date(this.parseDate(notification.notificationDate)), 'dd-MM-yyyy hh:mm'),
      message: notification.message,
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: (blah) => {
            this.deleteNotification(notification);
          }
        }, {
          text: 'Close',
          handler: () => {

            this.closeNotification(notification);

            
          }
        }
      ]
    });

    await alert.present();

    
  }

  closeNotification(notification: Notification) {
    this.notificationService.readNotification(notification.notificationId).subscribe(
      response => {
        if (response.change) {

          this.reloadList();

        } else {
        }
      }, error => {
      }
    );
  }

  deleteNotification(notification: Notification) {
    this.notificationService.deleteNotification(notification.notificationId).subscribe(
      response => {
        if (response.change) {
          this.reloadList();
        } else {
        }
      }, error => {
      }
    );
  }

  reloadList() {

    this.notificationService.retrieveCustomerNotifications().subscribe(
      response => {
        this.notifications = response.notifications;
      }, error => {
      }
    );

  }

  async delete(notification: Notification) {

    

  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

  doRefresh(event) {
    this.reloadList();
    setTimeout(() => {
      event.target.complete();
    }, this.refreshTimeout);
  }

}
