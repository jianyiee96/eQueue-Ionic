import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MenuItem } from '../menu-item';
import { MenuCategory } from '../menu-category';
import { MenuCategoryService } from '../menu-category.service';
import { MenuItemService } from '../menu-item.service';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.page.html',
  styleUrls: ['./tab-menu.page.scss'],
})
export class TabMenuPage implements OnInit {

  topCategories: MenuCategory[];
  selectedTopCategory: MenuCategory;
  subCategories: MenuCategory[];


  resourcePath: string;

  constructor(public sessionService: SessionService,
    public menuCategoryService: MenuCategoryService,
    public menuItemService: MenuItemService,
    private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.resourcePath = this.sessionService.getImageResourcePath();
  }


  ionViewDidEnter() {

    this.processMenu();

  }

  processMenu() {
    this.menuCategoryService.retrieveTopCategories().subscribe(
      response => {
        this.topCategories = response.menuCategories;
      }, error => {
        console.log("Error in retrieving top categories.");
      }
    )
  }

  categorySelection(selected: MenuCategory) {

    this.selectedTopCategory = selected;
    this.menuCategoryService.retrieveCategoryByParent(this.selectedTopCategory.menuCategoryId).subscribe(
      response => {
        this.subCategories = response.menuCategories;

        for (let menuCategory of this.subCategories) {

          this.menuItemService.retrieveAllMenuItemByCategory(menuCategory.menuCategoryId).subscribe(
            response => {
              menuCategory.menuItems = response.menuItems;
            }, error => {
              console.log("Error in retrieving menu items for: " + menuCategory.categoryName);
            }
          )
        }

      }, error => {
        console.log("Error in retrieving categories.");
      }
    )


  }


  getCurrency(amount: number): string {
    return this.currencyPipe.transform(amount);
  }

}
