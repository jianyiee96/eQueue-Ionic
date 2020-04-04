export class Queue {

    queueId: number;
    numberOfPax: number;
    startDateTime: Date;

    constructor(queueId?: number, numberOfPax?: number, startDateTime?: Date){

        this.queueId = queueId;
        this.numberOfPax = numberOfPax;
        this.startDateTime = startDateTime;

    }



}
