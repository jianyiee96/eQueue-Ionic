import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.page.html',
  styleUrls: ['./tab-menu.page.scss'],
})
export class TabMenuPage implements OnInit {

  topCategories: String[];
  subCategories: String[];
  menuItems: String[];

  constructor(public sessionService: SessionService) { }

  ngOnInit() {


  }

  ionViewDidEnter() {

    this.topCategories = ["Food", "Drinks", "Desserts","Recom","Ohhh"];

  }

  processMenu(){

  }

}
