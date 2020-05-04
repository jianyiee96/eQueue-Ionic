import { OrderLineItem } from './order-line-item';

export class Cart {

    shoppingCartId: number;
    totalAmount: number;
    orderLineItems: OrderLineItem[];

    constructor(shoppingCartId?: number, totalAmount?: number, orderLineItems?: OrderLineItem[]){
        this.shoppingCartId = shoppingCartId;
        this.totalAmount = totalAmount;
        this.orderLineItems = orderLineItems;
    }

}
