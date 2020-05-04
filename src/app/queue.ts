export class Queue {

    queueId: number;
    numberOfPax: number;
    startDateTime: Date;
    allocatedDateTime: Date;

    constructor(queueId?: number, numberOfPax?: number, startDateTime?: Date, allocatedDateTime?: Date){

        this.queueId = queueId;
        this.numberOfPax = numberOfPax;
        this.startDateTime = startDateTime;
        this.allocatedDateTime = allocatedDateTime;

    }
    
}
