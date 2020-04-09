import { MenuItem } from './menu-item';
import { OrderLineItemStatusEnum } from './order-line-item-status-enum.enum';

export class OrderLineItem {

    orderLineItemId: number;
    menuItem: MenuItem;
    remarks: string;
    quantity: number;
    status: OrderLineItemStatusEnum;
    isEdited: boolean;

    constructor(orderLineItemId?: number,
        menuItem?: MenuItem,
        remarks?: string,
        quantity?: number,
        status?: OrderLineItemStatusEnum,
        isEdited?: boolean) {

        this.orderLineItemId = orderLineItemId;
        this.menuItem = menuItem;
        this.remarks = remarks;
        this.quantity = quantity;
        this.status = status;
        this.isEdited = isEdited;

    }

}
