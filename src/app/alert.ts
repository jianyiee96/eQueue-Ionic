export class Alert {

    tableId: number;
    message: String;

    constructor(tableId?: number, message?: String) {
        this.tableId = tableId;
        this.message = message;
    }

}
