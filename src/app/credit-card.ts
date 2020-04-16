export class CreditCard {

    creditCardId: number;
    creditCardName: string;
    creditCardNumber: string;
    cvv: string;
    expiryMonth: number;
    expiryYear: number;

    constructor(creditCardId?: number, creditCardName?: string, creditCardNumber?: string, cvv?: string, expiryMonth?: number, expiryYear?: number) {
        this.creditCardId = creditCardId;
        this.creditCardName = creditCardName;
        this.creditCardNumber = creditCardNumber;
        this.cvv = cvv;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
    }

}
