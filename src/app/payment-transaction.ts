import { CustomerOrder } from './customer-order';

export class PaymentTransaction {

    paymentTransactionId: number;
    transactionDate: Date;
    paymentType: string;
    gst: number;
    transactionValue: number;

    customerOrders: CustomerOrder[] = new Array();

    constructor(paymentTransactionId?: number, transactionDate?: Date, paymentType?: string, gst?: number, transactionValue?: number) {
        this.paymentTransactionId = paymentTransactionId;
        this.transactionDate = transactionDate;
        this.paymentType = paymentType;
        this.gst = gst;
        this.transactionValue = transactionValue;
    }

}
