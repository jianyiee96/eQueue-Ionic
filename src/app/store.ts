
export class Store {

    storeId: number;
    storeName: string;
    messageOfTheDay: string;
    storeAddress: string;
    storeContact: string;
    storeEmail: string;
    allocationGraceWaitingMinutes: number;
    estimatedQueueUnitWaitingMinutes: number;


    constructor(storeId?: number, storeName?: string, messageOTheDay?: string, storeAddress?: string, storeContact?: string, storeEmail?: string, allocationGraceWaitingMinutes?: number, estimatedQueueUnitWaitingMinutes?: number ){
        this.storeId = storeId;
        this.storeName = storeName;
        this.messageOfTheDay = messageOTheDay;
        this.storeAddress = storeAddress;
        this.storeContact = storeContact;
        this.storeEmail = storeEmail;
        this.allocationGraceWaitingMinutes = allocationGraceWaitingMinutes;
        this.estimatedQueueUnitWaitingMinutes = estimatedQueueUnitWaitingMinutes;
    }
    
}
