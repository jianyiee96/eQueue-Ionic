import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NotificationService } from '../notification.service';

import { Notification } from '../notification';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: Notification[];

  constructor(private router: Router,
    public notificationService: NotificationService,
    public sessionService: SessionService) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.notifications = this.sessionService.getNotifications();
  }

}
