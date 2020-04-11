import { NotificationTypeEnum } from "./notification-type-enum.enum"

export class Notification {

    notificationId: number;
    isRead: boolean;
    title: string;
    message: string;
    notificationDate: Date;
    notificationType: NotificationTypeEnum;

    constructor(notificationId?: number, isRead?: boolean, title?: string, message?: string, notificationDate?: Date, notificationType?: NotificationTypeEnum){
        this.notificationId = notificationId;
        this.isRead = isRead;
        this.title = title;
        this.message = message;
        this.notificationDate = notificationDate;
        this.notificationType = notificationType;

    }

}
