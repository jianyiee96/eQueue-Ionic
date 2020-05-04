import { MenuItemAvailabilityEnum } from './menu-item-availability-enum.enum';

export class MenuItem {

    availability: MenuItemAvailabilityEnum;
    imagePath: string;
    menuItemCode: string;
    menuItemId: number;
    menuItemName: string;
    menuItemPrice: number;
    waitingTimeMinutes: number;
    menuItemDescription: string;

    constructor(availability?: MenuItemAvailabilityEnum, imagePath?: string, menuItemCode?: string, menuItemId?: number, menuItemName?: string, menuItemPrice?: number, waitingTimeMinutes?: number, menuItemDescription?: string) {
        this.availability = availability;
        this.imagePath = imagePath;
        this.menuItemCode = menuItemCode;
        this.menuItemName = menuItemName;
        this.menuItemId = menuItemId;
        this.menuItemPrice = menuItemPrice;
        this.waitingTimeMinutes = waitingTimeMinutes;
        this.menuItemDescription = menuItemDescription;
    }

}
