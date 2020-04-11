import { MenuItem } from './menu-item';

export class MenuCategory {

    categoryName: string;
    menuCategoryId: number;
    menuItems: MenuItem[];

    constructor(categoryName?: string, menuCategoryId?: number) {
        this.menuCategoryId = menuCategoryId;
        this.categoryName = categoryName;

    }

}
