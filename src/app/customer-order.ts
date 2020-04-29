import { OrderStatusEnum } from './order-status-enum.enum';
import { OrderLineItem } from './order-line-item';

export class CustomerOrder {

    orderId: number;
    isCompleted: boolean;
    orderDate: Date;
    status: OrderStatusEnum;
    totalAmount: number;
    itemCount: number = 0;

    orderLineItems: OrderLineItem[] = new Array();

    constructor(orderId: number, isCompleted: boolean, orderDate: Date, status: OrderStatusEnum, totalAmount: number) {

        this.orderId = orderId;
        this.isCompleted = isCompleted;
        this.orderDate = orderDate;
        this.status = status;
        this.totalAmount = totalAmount;

    }

}
