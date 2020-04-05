import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NotificationService } from '../notification.service';

import { Notification } from '../notification';
import { SessionService } from '../session.service';
import { AlertController } from '@ionic/angular';

import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: Notification[];

  constructor(private router: Router,
    public notificationService: NotificationService,
    public sessionService: SessionService,
    public alertController: AlertController,
    public datepipe: DatePipe) {

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
      buttons: ['OK']
    });

    await alert.present();
    this.notificationService.readNotification(notification.notificationId).subscribe(
      response => {
        if (response.change) {

          this.notificationService.retrieveCustomerNotifications().subscribe(
            response => {
              this.notifications = response.notifications;
            }, error => {
            }
          );

        } else {
        }
      }, error => {
      }


    );
  }

  delete(notification: Notification) {
    console.log("Delete: " + notification.notificationId);
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
