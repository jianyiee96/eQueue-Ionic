import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { CustomerOrder } from '../customer-order';
import { CustomerOrderService } from '../customer-order.service';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.page.html',
  styleUrls: ['./tab-order.page.scss'],
})
export class TabOrderPage implements OnInit {

  customerOrders: CustomerOrder[] = [];
  customerActiveOrders: CustomerOrder[] = [];
  customerPastOrders: CustomerOrder[] = [];

  constructor(public sessionService: SessionService,
    public customerOrderService: CustomerOrderService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.customerOrderService.retrieveCustomerOrders().subscribe(
      response => {
        this.customerOrders = response.customerOrders;
        this.populateListByOrderStatus();
        

      }, error => {
        console.log(error);
      }
    );

  }

  populateListByOrderStatus(){

    this.customerActiveOrders = [];
    this.customerPastOrders = [];

    for(let c of this.customerOrders){
      if(!c.isCompleted) {
        this.customerActiveOrders.push(c);
      } else {
        this.customerPastOrders.push(c);
      }

    }

  }



  parseDate(d: Date) {
    return d.toString().replace('[UTC]', '');
  }

}
