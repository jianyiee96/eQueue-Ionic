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
  testDisplay: String;

  constructor(
    public sessionService: SessionService,
    public queueService: QueueService,
    public diningTableService: DiningTableService) {
    this.displayOption = 0;
    this.testDisplay = "";

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
              this.testDisplay = "Dining Table(NO) Queue(NO), Waiting to join queue.";
              this.displayOption = 1;
            } 
            else if (this.diningTable == null && this.queue != null) {
              this.testDisplay = "Dining Table(NO) Queue(YES), Waiting to get allocated a table.";
              this.displayOption = 2;
            }
            else if (this.diningTable != null && this.queue != null) {
              this.testDisplay = "Dining Table(YES) Queue(YES), Waiting to get seated.";
              this.displayOption = 3;
            }
            else if (this.diningTable != null && this.queue == null) {
              this.testDisplay = "Dining Table(YES) Queue(NO), Enjoy your meal.";
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

  doRefresh(event) {
    this.currentCustomer = this.sessionService.getCurrentCustomer();

    this.queueService.getMyQueue().subscribe(
      response => {
        this.queue = response.queue;

        this.diningTableService.getMyTable().subscribe(
          response => {
            this.diningTable = response.diningTable;


            if (this.diningTable == null && this.queue == null) {
              this.testDisplay = "Dining Table(NO) Queue(NO), Waiting to join queue.";
              this.displayOption = 1;
            } 
            else if (this.diningTable == null && this.queue != null) {
              this.testDisplay = "Dining Table(NO) Queue(YES), Waiting to get allocated a table.";
              this.displayOption = 2;
            }
            else if (this.diningTable != null && this.queue != null) {
              this.testDisplay = "Dining Table(YES) Queue(YES), Waiting to get seated.";
              this.displayOption = 3;
            }
            else if (this.diningTable != null && this.queue == null) {
              this.testDisplay = "Dining Table(YES) Queue(NO), Enjoy your meal.";
              this.displayOption = 4;
            }

            setTimeout(() => {
              console.log("DOnE");
              event.target.complete();
            }, 500);

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


}
