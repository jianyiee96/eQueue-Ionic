import { Component, OnInit } from '@angular/core';

import { SessionService } from '../session.service';
import { QueueService } from '../queue.service';
import { DiningTableService } from '../dining-table.service';

import { Customer } from '../customer';
import { Queue } from '../queue'
import { DiningTable } from '../dining-table'

@Component({
  selector: 'app-tab-queue',
  templateUrl: './tab-queue.page.html',
  styleUrls: ['./tab-queue.page.scss'],
})
export class TabQueuePage implements OnInit {

  currentCustomer: Customer;
  queue: Queue;
  diningTable: DiningTable;

  displayOption: number;
  refreshTimeout: number;
  paxCount: number;

  constructor(
    public sessionService: SessionService,
    public queueService: QueueService,
    public diningTableService: DiningTableService) {

    this.displayOption = 0;
    this.refreshTimeout = 1000;

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.processSituation();
  }

  processSituation() {
    this.currentCustomer = this.sessionService.getCurrentCustomer();

    this.queueService.getMyQueue().subscribe(
      response => {
        this.queue = response.queue;

        this.diningTableService.getMyTable().subscribe(
          response => {
            this.diningTable = response.diningTable;


            if (this.diningTable == null && this.queue == null) {
              this.displayOption = 1;
            }
            else if (this.diningTable == null && this.queue != null) {
              this.displayOption = 2;
            }
            else if (this.diningTable != null && this.queue != null) {
              this.displayOption = 3;
            }
            else if (this.diningTable != null && this.queue == null) {
              this.displayOption = 4;
            }

          },
          error => {
            console.log('********** tab-queue:ionViewDidEnter error: ' + error);
          }
        );


      },
      error => {
        console.log('********** tab-queue:ionViewDidEnter error: ' + error);
      }
    );


  }

  joinQueue() {

    if (this.paxCount == null || this.paxCount < 1 || this.paxCount > 12) {
      console.log("Invalid pax count");
      return;
    }

    this.queueService.joinQueue(this.paxCount).subscribe(
      response => {
        this.processSituation();
      },
      error => {

        this.processSituation();
      }
    );


  }

  doRefresh(event) {
    this.processSituation();
    setTimeout(() => {
      event.target.complete();
    }, this.refreshTimeout);
  }


}
