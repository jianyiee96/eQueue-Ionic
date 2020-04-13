import { TableStatusEnum } from './table-status-enum.enum';

export class DiningTable {

    diningTableId: number;
    seatingCapacity: number;
    tableStatus: TableStatusEnum;

    constructor(diningTableId?: number, seatingCapacity?: number, tableStatus?: TableStatusEnum){

        this.diningTableId = diningTableId;
        this.seatingCapacity = seatingCapacity;
        this.tableStatus = tableStatus;

    }
}
