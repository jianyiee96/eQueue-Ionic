import { OrderStatusEnum } from './order-status-enum.enum';

export class CustomerOrder {

    orderId: number;
    isCompleted: boolean;
    orderDate: Date;
    status: OrderStatusEnum;
    totalAmount: number;
    itemCount: number = 0;

    constructor(orderId: number, isCompleted: boolean, orderDate: Date, status: OrderStatusEnum, totalAmount: number){

        this.orderId = orderId;
        this.isCompleted = isCompleted;
        this.orderDate = orderDate;
        this.status = status;
        this.totalAmount = totalAmount;
        
    }

}
