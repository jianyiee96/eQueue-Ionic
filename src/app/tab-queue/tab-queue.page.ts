import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { SessionService } from '../session.service';
import { QueueService } from '../queue.service';
import { DiningTableService } from '../dining-table.service';
import { StoreService } from '../store.service';

import { Customer } from '../customer';
import { Queue } from '../queue'
import { DiningTable } from '../dining-table'
import { Store } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab-queue',
  templateUrl: './tab-queue.page.html',
  styleUrls: ['./tab-queue.page.scss'],
})
export class TabQueuePage implements OnInit {

  store: Store;
  currentCustomer: Customer;

  queue: Queue;
  diningTable: DiningTable;

  displayOption: number;
  refreshTimeout: number;

  paxCount: number;
  code: string;
  queueStartTime: Date;
  queueAllocatedDateTime: Date;
  expiryDateTime: Date;
  queueWaitingTime: number;
  queuePosition: number;

  constructor(
    public sessionService: SessionService,
    public queueService: QueueService,
    public diningTableService: DiningTableService,
    public storeService: StoreService,
    public toastController: ToastController) {

    this.displayOption = 0;
    this.refreshTimeout = 1000;

  }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.store = this.sessionService.getStore();
    this.queue = new Queue();
    this.queue.numberOfPax = 0;
    this.queue.startDateTime = new Date();
    this.queue.allocatedDateTime = new Date();
    this.queue.queueId = 0;

    this.diningTable = new DiningTable();
    this.diningTable.seatingCapacity = 0;
    this.diningTable.diningTableId = 0;

    this.paxCount = 0;
    this.code = "";
    this.queueStartTime = new Date();
    this.queueAllocatedDateTime = new Date();
    this.expiryDateTime = new Date();
    this.queueWaitingTime = 0;
    this.queuePosition = 0;

    this.processSituation();
  }

  processSituation() {

    this.paxCount = 0;
    this.code = "";
    this.currentCustomer = this.sessionService.getCurrentCustomer();

    this.queueService.getMyQueue().subscribe(
      response => {
        this.queue = response.queue;

        if (this.queue != null) {
          this.queueStartTime = this.queue.startDateTime;
          this.queueAllocatedDateTime = this.queue.allocatedDateTime;
        } else {
          this.queueStartTime = new Date();
          this.queueAllocatedDateTime = new Date();
        }

        this.queuePosition = response.position;

        this.diningTableService.getMyTable().subscribe(
          response => {
            this.diningTable = response.diningTable;


            if (this.diningTable == null && this.queue == null) {
              this.displayOption = 1;
            }
            else if (this.diningTable == null && this.queue != null) {
              this.displayOption = 2;

              this.queueWaitingTime = this.queuePosition * this.store.estimatedQueueUnitWaitingMinutes;
            }
            else if (this.diningTable != null && this.queue != null) {
              this.displayOption = 3;

              let allocatedDateString = this.parseDate(this.queueAllocatedDateTime);
              this.expiryDateTime = new Date(allocatedDateString);
              this.expiryDateTime.setMinutes(this.expiryDateTime.getMinutes() + this.store.allocationGraceWaitingMinutes);

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

    this.storeService.retrieveStoreInformation().subscribe(
      response => {

        let store: Store = response.store;

        if (store != null) {
          this.sessionService.setStore(store);
        }
        else {
          console.log("Unable to retrieve store [null]");
        }
      },
      error => {
        console.log("Unable to retrieve store [" + error + "]");
      }
    );



  }

  joinQueue() {

    if (this.paxCount == null || this.paxCount < 1 || this.paxCount > 8) {
      console.log("Invalid pax count");
      this.toast("Invalid Pax Count");
      return;
    }

    this.queueService.joinQueue(this.paxCount).subscribe(
      response => {
        this.toast("Join Queue Sucess!");
        this.processSituation();
      },
      error => {
        this.toast("Join Queue Failed!");
        this.processSituation();
      }
    );


  }

  checkIn() {

    if (this.code == null || this.code == "") {
      this.toast("Empty Code");
    }

    this.diningTableService.checkIn(this.code).subscribe(
      response => {

        if (response.result) {
          this.toast("Check in success!");
        } else {
          this.toast("Check in failed: Wrong code");
        }
        this.processSituation();
      },
      error => {
        this.processSituation();
      }
    );

  }

  checkInQr() {

    this.toast("Function in unavailable atm.");
  }

  doRefresh(event) {
    this.processSituation();
    setTimeout(() => {
      event.target.complete();
    }, this.refreshTimeout);
  }

  async toast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
